import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

const INQUIRY_EMAIL_TO = ['sunny@faddit.co.kr', 'seok@faddit.co.kr']

const supabaseUrl = process.env.SUPABASE_URL || 'https://unsvjfkkzqzqftdhkpef.supabase.co'
// 서비스 역할 키를 우선 사용 (RLS 우회), 없으면 ANON_KEY 사용
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuc3ZqZmtrenF6cWZ0ZGhrcGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MzU5NDAsImV4cCI6MjA3OTUxMTk0MH0.rAiKKEvelAdXOGvAsFgM1D5CUqmrXp6-NeNLsXsJoa0'
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const formData = req.body

    // 필수 필드 검증
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: {
          companyName: !formData.companyName,
          contactName: !formData.contactName,
          email: !formData.email,
          phone: !formData.phone
        }
      })
    }

    const sanitizeText = (value: any) => {
      if (typeof value === "string") {
        const trimmed = value.trim()
        return trimmed.length > 0 ? trimmed : null
      }
      return value ?? null
    }

    // 날짜 형식 변환 (YYYY-MM-DD 형식으로 변환)
    let deadline: string | null = null
    if (formData.deadline) {
      // 날짜가 이미 YYYY-MM-DD 형식이면 그대로 사용
      if (typeof formData.deadline === 'string' && formData.deadline.match(/^\d{4}-\d{2}-\d{2}$/)) {
        deadline = formData.deadline
      } else {
        // 다른 형식이면 Date 객체로 변환 시도
        try {
          const date = new Date(formData.deadline)
          if (!isNaN(date.getTime())) {
            deadline = date.toISOString().split('T')[0]
          }
        } catch (e) {
          console.warn('Invalid date format:', formData.deadline)
        }
      }
    }

    // 이미지 파일을 Supabase Storage에 업로드
    const uploadedImageUrls: string[] = []
    const uploadErrors: string[] = []
    
    if (formData.designFiles && formData.designFiles.length > 0) {
      console.log(`Processing ${formData.designFiles.length} file(s) for upload`)
      
      // Storage bucket 존재 확인 및 생성 시도
      const bucketName = 'inquiry-files'
      const { data: buckets, error: listError } = await supabase.storage.listBuckets()
      
      if (listError) {
        console.error('Error listing buckets:', listError)
      } else {
        const bucketExists = buckets?.some(b => b.name === bucketName)
        console.log(`Bucket '${bucketName}' exists:`, bucketExists)
        
        if (!bucketExists) {
          console.log(`Attempting to create bucket '${bucketName}'`)
          const { data: newBucket, error: createError } = await supabase.storage.createBucket(bucketName, {
            public: true,
            fileSizeLimit: 52428800, // 50MB
            allowedMimeTypes: ['image/*', 'application/pdf', 'application/postscript', 'image/vnd.adobe.photoshop']
          })
          
          if (createError) {
            console.error(`Error creating bucket '${bucketName}':`, createError)
            uploadErrors.push(`Bucket creation failed: ${createError.message}`)
          } else {
            console.log(`Bucket '${bucketName}' created successfully:`, newBucket)
          }
        }
      }
      
      for (let i = 0; i < formData.designFiles.length; i++) {
        const fileData = formData.designFiles[i]
        console.log(`Processing file ${i + 1}/${formData.designFiles.length}: ${fileData.name}`)
        
        if (!fileData.base64) {
          console.warn(`File ${fileData.name} has no base64 data`)
          uploadErrors.push(`${fileData.name}: No base64 data`)
          continue
        }
        
        try {
          // base64를 Buffer로 변환
          const fileBuffer = Buffer.from(fileData.base64, 'base64')
          console.log(`File ${fileData.name} converted to buffer, size: ${fileBuffer.length} bytes`)
          
          // 파일명 생성 (타임스탬프 + 원본 파일명)
          const timestamp = Date.now()
          const randomSuffix = Math.random().toString(36).substring(2, 9)
          const sanitizedFileName = fileData.name.replace(/[^a-zA-Z0-9.-]/g, '_')
          const filePath = `inquiries/${timestamp}_${randomSuffix}_${sanitizedFileName}`
          
          console.log(`Uploading to path: ${filePath}`)
          
          // Supabase Storage에 업로드
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(filePath, fileBuffer, {
              contentType: fileData.type || 'application/octet-stream',
              upsert: false
            })
          
          if (uploadError) {
            console.error(`File upload error for ${fileData.name}:`, JSON.stringify(uploadError, null, 2))
            uploadErrors.push(`${fileData.name}: ${uploadError.message || 'Upload failed'}`)
          } else {
            console.log(`File ${fileData.name} uploaded successfully:`, uploadData)
            
            // 공개 URL 가져오기
            const { data: urlData } = supabase.storage
              .from(bucketName)
              .getPublicUrl(filePath)
            
            console.log(`Public URL for ${fileData.name}:`, urlData?.publicUrl)
            
            if (urlData?.publicUrl) {
              uploadedImageUrls.push(urlData.publicUrl)
              console.log(`Successfully added URL for ${fileData.name}`)
            } else {
              console.warn(`No public URL returned for ${fileData.name}`)
              uploadErrors.push(`${fileData.name}: No public URL returned`)
            }
          }
        } catch (fileError: any) {
          console.error(`Error processing file ${fileData.name}:`, fileError)
          uploadErrors.push(`${fileData.name}: ${fileError?.message || 'Processing error'}`)
        }
      }
      
      console.log(`Upload summary: ${uploadedImageUrls.length} successful, ${uploadErrors.length} failed`)
      if (uploadErrors.length > 0) {
        console.error('Upload errors:', uploadErrors)
      }
    }

    // DB에 저장
    const insertData: Record<string, any> = {
      company_name: formData.companyName,
      country: sanitizeText(formData.country),
      industry: sanitizeText(formData.industry),
      custom_industry: sanitizeText(formData.customIndustry),
      bojagi_type: formData.bojagiType || null,
      material: formData.material || null,
      size_width: sanitizeText(formData.sizeWidth),
      size_height: sanitizeText(formData.sizeHeight),
      size_depth: sanitizeText(formData.sizeDepth),
      calculated_bojagi_size: sanitizeText(formData.calculatedBojagiSize),
      quantity: formData.quantity ? String(formData.quantity) : null,
      deadline: deadline,
      contact_name: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      details: formData.details || null,
      design_files_count: formData.designFiles?.length || 0,
      design_files_urls: uploadedImageUrls.length > 0 ? uploadedImageUrls : null,
      privacy_consent: formData.privacyConsent || false,
    }

    console.log('Inserting data:', JSON.stringify(insertData, null, 2))
    console.log(`Uploaded ${uploadedImageUrls.length} image(s), URLs:`, uploadedImageUrls)

    const { data: dbData, error: dbError } = await supabase
      .from('inquiries')
      .insert(insertData)
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', JSON.stringify(dbError, null, 2))
      return res.status(500).json({ 
        error: 'Failed to save inquiry to database',
        details: dbError.message || 'Unknown database error',
        code: dbError.code,
        hint: dbError.hint,
        uploadErrors: uploadErrors.length > 0 ? uploadErrors : undefined
      })
    }

    // 문의 내용 메일 발송 (sunny@faddit.co.kr, seok@faddit.co.kr)
    const mailFrom = process.env.MAIL_FROM || process.env.SMTP_USER || 'noreply@sobok.co.kr'
    const hasSmtp = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
    if (hasSmtp) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })
        const lines = [
          `[회사/담당자] ${formData.companyName} / ${formData.contactName}`,
          `[이메일] ${formData.email}`,
          `[연락처] ${formData.phone}`,
          `[국가] ${formData.country || '-'}`,
          `[산업군] ${formData.industry || '-'}${formData.customIndustry ? ` (${formData.customIndustry})` : ''}`,
          `[기존 판매 제품] ${formData.existingProducts || '-'}`,
          `[보자기 종류] ${formData.bojagiType || '-'} / ${formData.material || '-'}`,
          `[사이즈] 가로 ${formData.sizeWidth || '-'} / 세로 ${formData.sizeHeight || '-'} / 높이 ${formData.sizeDepth || '-'} cm`,
          `[보자기 대각선 길이] ${formData.calculatedBojagiSize || '-'} cm`,
          `[필요 수량] ${formData.quantity || '-'}`,
          `[납기 희망일] ${formData.deadline || '-'}`,
          `[희망 사이즈] 가로 ${formData.orderSizeWidth || '-'} / 세로 ${formData.orderSizeHeight || '-'} cm`,
          `[상세 요청사항] ${formData.details || '-'}`,
        ]
        if (uploadedImageUrls.length > 0) {
          lines.push('[첨부 파일 링크]')
          uploadedImageUrls.forEach((url, i) => lines.push(`  ${i + 1}. ${url}`))
        }
        const textBody = lines.join('\n')
        const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')
        const htmlBody = lines.map((line) => `<p style="margin:0 0 6px 0;">${escapeHtml(line)}</p>`).join('')

        await transporter.sendMail({
          from: mailFrom,
          to: INQUIRY_EMAIL_TO,
          subject: `[소복] 상담·견적 문의 - ${formData.companyName} / ${formData.contactName}`,
          text: textBody,
          html: `<div style="font-family:sans-serif; max-width:600px;">${htmlBody}</div>`,
        })
        console.log('Inquiry notification email sent to', INQUIRY_EMAIL_TO.join(', '))
      } catch (mailError: any) {
        console.error('Failed to send inquiry email:', mailError?.message || mailError)
        // 메일 실패해도 문의는 DB에 저장되었으므로 200 유지
      }
    } else {
      console.warn('SMTP not configured (SMTP_HOST, SMTP_USER, SMTP_PASS). Skipping inquiry email.')
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry submitted successfully',
      id: dbData?.id,
      uploadedFiles: uploadedImageUrls.length,
      uploadedUrls: uploadedImageUrls,
      uploadErrors: uploadErrors.length > 0 ? uploadErrors : undefined
    })
  } catch (error: any) {
    console.error('Unexpected error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error?.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    })
  }
}

