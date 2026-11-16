import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://knijwgqdwtnpufipduuo.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'GET') {
    try {
      // 모든 공지사항 조회수 조회
      const { data, error } = await supabase
        .from('notice_views')
        .select('notice_id, views')
      
      if (error) {
        console.error('Error fetching all views:', error)
        return res.status(500).json({ error: error.message })
      }
      
      // 객체 형태로 변환 { noticeId: views }
      const viewsMap: Record<number, number> = {}
      if (data) {
        data.forEach((item) => {
          viewsMap[item.notice_id] = item.views
        })
      }
      
      return res.status(200).json(viewsMap)
    } catch (error) {
      console.error('Unexpected error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

