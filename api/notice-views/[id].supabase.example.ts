// Supabase를 사용하는 예제 (실제 사용 시 이 파일을 [id].ts로 교체)
// npm install @supabase/supabase-js 필요

import type { VercelRequest, VercelResponse } from '@vercel/node'
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.SUPABASE_URL!
// const supabaseKey = process.env.SUPABASE_ANON_KEY!
// const supabase = createClient(supabaseUrl, supabaseKey)

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
    // Supabase에서 조회수 조회
    // const { data, error } = await supabase
    //   .from('notice_views')
    //   .select('views')
    //   .eq('notice_id', noticeId)
    //   .single()
    
    // if (error && error.code !== 'PGRST116') {
    //   return res.status(500).json({ error: error.message })
    // }
    
    // const views = data?.views || 0
    // return res.status(200).json({ noticeId, views })
    
    // 임시 응답
    return res.status(200).json({ noticeId, views: 0 })
  }

  if (req.method === 'POST') {
    // Supabase에서 조회수 증가 (UPSERT 사용)
    // const { data, error } = await supabase
    //   .from('notice_views')
    //   .upsert(
    //     { notice_id: noticeId, views: 1 },
    //     { onConflict: 'notice_id', ignoreDuplicates: false }
    //   )
    //   .select()
    //   .single()
    
    // if (error) {
    //   // 조회수가 없으면 INSERT, 있으면 UPDATE
    //   const { data: existing } = await supabase
    //     .from('notice_views')
    //     .select('views')
    //     .eq('notice_id', noticeId)
    //     .single()
      
    //   if (existing) {
    //     const { data: updated, error: updateError } = await supabase
    //       .from('notice_views')
    //       .update({ views: existing.views + 1 })
    //       .eq('notice_id', noticeId)
    //       .select()
    //       .single()
        
    //     if (updateError) {
    //       return res.status(500).json({ error: updateError.message })
    //     }
    //     return res.status(200).json({ noticeId, views: updated.views })
    //   }
    // }
    
    // return res.status(200).json({ noticeId, views: data?.views || 1 })
    
    // 임시 응답
    return res.status(200).json({ noticeId, views: 1 })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

/*
Supabase 테이블 생성 SQL:

CREATE TABLE notice_views (
  notice_id INTEGER PRIMARY KEY,
  views INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notice_views_notice_id ON notice_views(notice_id);
*/

