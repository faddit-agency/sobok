import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://unsvjfkkzqzqftdhkpef.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuc3ZqZmtrenF6cWZ0ZGhrcGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MzU5NDAsImV4cCI6MjA3OTUxMTk0MH0.rAiKKEvelAdXOGvAsFgM1D5CUqmrXp6-NeNLsXsJoa0'
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const { id } = req.query
  const noticeId = parseInt(id as string, 10)

  if (isNaN(noticeId)) {
    return res.status(400).json({ error: 'Invalid notice ID' })
  }

  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'GET') {
    try {
      // Supabase에서 조회수 조회
      const { data, error } = await supabase
        .from('notice_views')
        .select('views')
        .eq('notice_id', noticeId)
        .single()
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching views:', error)
        return res.status(500).json({ error: error.message })
      }
      
      const views = data?.views || 0
      return res.status(200).json({ noticeId, views })
    } catch (error) {
      console.error('Unexpected error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  if (req.method === 'POST') {
    try {
      // 기존 조회수 조회
      const { data: existing, error: fetchError } = await supabase
        .from('notice_views')
        .select('views')
        .eq('notice_id', noticeId)
        .single()
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching existing views:', fetchError)
        return res.status(500).json({ error: fetchError.message })
      }
      
      if (existing) {
        // 기존 레코드가 있으면 조회수 증가
        const { data: updated, error: updateError } = await supabase
          .from('notice_views')
          .update({ views: existing.views + 1, updated_at: new Date().toISOString() })
          .eq('notice_id', noticeId)
          .select()
          .single()
        
        if (updateError) {
          console.error('Error updating views:', updateError)
          return res.status(500).json({ error: updateError.message })
        }
        return res.status(200).json({ noticeId, views: updated.views })
      } else {
        // 기존 레코드가 없으면 새로 생성
        const { data: inserted, error: insertError } = await supabase
          .from('notice_views')
          .insert({ notice_id: noticeId, views: 1 })
          .select()
          .single()
        
        if (insertError) {
          console.error('Error inserting views:', insertError)
          return res.status(500).json({ error: insertError.message })
        }
        return res.status(200).json({ noticeId, views: inserted.views })
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

