import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

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
    if (formData.designFiles && formData.designFiles.length > 0) {
      for (const fileData of formData.designFiles) {
        if (fileData.base64) {
          try {
            // base64를 Buffer로 변환
            const fileBuffer = Buffer.from(fileData.base64, 'base64')
            
            // 파일명 생성 (타임스탬프 + 원본 파일명)
            const timestamp = Date.now()
            const sanitizedFileName = fileData.name.replace(/[^a-zA-Z0-9.-]/g, '_')
            const filePath = `inquiries/${timestamp}_${sanitizedFileName}`
            
            // Supabase Storage에 업로드
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('inquiry-files')
              .upload(filePath, fileBuffer, {
                contentType: fileData.type || 'application/octet-stream',
                upsert: false
              })
            
            if (uploadError) {
              console.error('File upload error:', uploadError)
              // 업로드 실패해도 계속 진행
            } else {
              // 공개 URL 가져오기
              const { data: urlData } = supabase.storage
                .from('inquiry-files')
                .getPublicUrl(filePath)
              
              if (urlData?.publicUrl) {
                uploadedImageUrls.push(urlData.publicUrl)
              }
            }
          } catch (fileError) {
            console.error('Error processing file:', fileError)
            // 파일 처리 실패해도 계속 진행
          }
        }
      }
    }

    // DB에 저장
    // website는 선택사항이므로 빈 문자열이면 null로 처리
    const website = formData.website && formData.website.trim() ? formData.website.trim() : null
    
    const insertData: Record<string, any> = {
      company_name: formData.companyName,
      website: website,
      bojagi_type: formData.bojagiType || null,
      material: formData.material || null,
      quantity: formData.quantity ? String(formData.quantity) : null,
      deadline: deadline,
      budget: formData.budget || null,
      contact_name: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      details: formData.details || null,
      design_files_count: formData.designFiles?.length || 0,
      design_files_urls: uploadedImageUrls.length > 0 ? uploadedImageUrls : null,
      privacy_consent: formData.privacyConsent || false,
    }

    console.log('Inserting data:', JSON.stringify(insertData, null, 2))

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
        hint: dbError.hint
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry submitted successfully',
      id: dbData?.id,
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

