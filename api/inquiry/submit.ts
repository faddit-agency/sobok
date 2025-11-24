import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://unsvjfkkzqzqftdhkpef.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuc3ZqZmtrenF6cWZ0ZGhrcGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MzU5NDAsImV4cCI6MjA3OTUxMTk0MH0.rAiKKEvelAdXOGvAsFgM1D5CUqmrXp6-NeNLsXsJoa0'
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

    // DB에 저장
    const insertData: Record<string, any> = {
      company_name: formData.companyName,
      website: formData.website || null,
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

