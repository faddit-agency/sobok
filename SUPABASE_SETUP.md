# Supabase 설정 가이드

## 1. Supabase 테이블 생성

Supabase 대시보드에서 SQL Editor를 열고 다음 SQL을 실행하세요:

```sql
-- notice_views 테이블 생성
CREATE TABLE notice_views (
  notice_id INTEGER PRIMARY KEY,
  views INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 향상)
CREATE INDEX idx_notice_views_notice_id ON notice_views(notice_id);

-- RLS (Row Level Security) 정책 설정 (선택사항)
-- 모든 사용자가 읽기/쓰기 가능하도록 설정
ALTER TABLE notice_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON notice_views
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON notice_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON notice_views
  FOR UPDATE USING (true);
```

## 2. 환경 변수 설정

### 로컬 개발

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```
SUPABASE_URL=https://unsvjfkkzqzqftdhkpef.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuc3ZqZmtrenF6cWZ0ZGhrcGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MzU5NDAsImV4cCI6MjA3OTUxMTk0MH0.rAiKKEvelAdXOGvAsFgM1D5CUqmrXp6-NeNLsXsJoa0
```

### Vercel 배포

Vercel 대시보드에서 프로젝트 설정 > Environment Variables에 다음을 추가하세요:

- `SUPABASE_URL`: `https://unsvjfkkzqzqftdhkpef.supabase.co`
- `SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuc3ZqZmtrenF6cWZ0ZGhrcGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MzU5NDAsImV4cCI6MjA3OTUxMTk0MH0.rAiKKEvelAdXOGvAsFgM1D5CUqmrXp6-NeNLsXsJoa0`

## 3. 테스트

로컬에서 테스트하려면:

```bash
# Vercel CLI 설치 (아직 설치하지 않은 경우)
npm install -g vercel

# 로컬 개발 서버 실행
vercel dev
```

이제 API 엔드포인트가 Supabase와 연결되어 조회수가 DB에 저장됩니다.

## 4. 확인

Supabase 대시보드의 Table Editor에서 `notice_views` 테이블을 확인하여 조회수가 저장되는지 확인할 수 있습니다.

