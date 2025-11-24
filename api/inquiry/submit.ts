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
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // DB에 저장
    const { data: dbData, error: dbError } = await supabase
      .from('inquiries')
      .insert({
        company_name: formData.companyName,
        website: formData.website || null,
        bojagi_type: formData.bojagiType || null,
        material: formData.material || null,
        quantity: formData.quantity || null,
        deadline: formData.deadline || null,
        budget: formData.budget || null,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        details: formData.details || null,
        design_files_count: formData.designFiles?.length || 0,
        privacy_consent: formData.privacyConsent || false,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return res.status(500).json({ error: 'Failed to save inquiry to database' })
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry submitted successfully',
      id: dbData?.id,
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

