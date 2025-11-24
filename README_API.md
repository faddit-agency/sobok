# 공지사항 조회수 API

공지사항 조회수를 DB에 저장하기 위한 API 엔드포인트입니다.

## 현재 구현

현재는 인메모리 DB를 사용하고 있어 서버 재시작 시 데이터가 초기화됩니다. 프로덕션 환경에서는 실제 데이터베이스를 사용해야 합니다.

## API 엔드포인트

### GET `/api/notice-views/:id`
특정 공지사항의 조회수를 조회합니다.

**응답:**
```json
{
  "noticeId": 1,
  "views": 42
}
```

### POST `/api/notice-views/:id`
특정 공지사항의 조회수를 1 증가시킵니다.

**응답:**
```json
{
  "noticeId": 1,
  "views": 43
}
```

### GET `/api/notice-views`
모든 공지사항의 조회수를 조회합니다.

**응답:**
```json
{
  "1": 42,
  "2": 15,
  "3": 8
}
```

## 실제 DB 연결 방법

### Supabase 사용 (권장)

1. Supabase 프로젝트 생성 및 테이블 생성:
```sql
CREATE TABLE notice_views (
  notice_id INTEGER PRIMARY KEY,
  views INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notice_views_notice_id ON notice_views(notice_id);
```

2. 환경 변수 설정 (Vercel):
   - `SUPABASE_URL`: Supabase 프로젝트 URL
   - `SUPABASE_ANON_KEY`: Supabase Anon Key

3. 패키지 설치:
```bash
npm install @supabase/supabase-js
```

4. `api/notice-views/[id].supabase.example.ts` 파일을 참고하여 `[id].ts` 파일 수정

### 다른 DB 사용

- PostgreSQL: `pg` 패키지 사용
- MySQL: `mysql2` 패키지 사용
- MongoDB: `mongodb` 패키지 사용
- Vercel KV (Redis): `@vercel/kv` 패키지 사용

## 로컬 개발

로컬에서 개발할 때는 Vercel CLI를 사용하여 서버리스 함수를 테스트할 수 있습니다:

```bash
npm install -g vercel
vercel dev
```

또는 프록시를 설정하여 개발 서버에서 API를 호출할 수 있습니다.

