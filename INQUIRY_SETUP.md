# 문의 제출 기능 설정 가이드

## 1. Supabase 테이블 생성

Supabase 대시보드에서 SQL Editor를 열고 다음 SQL을 실행하세요:

```sql
-- inquiries 테이블 생성
CREATE TABLE inquiries (
  id BIGSERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  website VARCHAR(255),
  country VARCHAR(100),
  industry VARCHAR(100),
  custom_industry VARCHAR(255),
  existing_products TEXT,
  bojagi_type VARCHAR(50),
  material VARCHAR(50),
  size_width VARCHAR(50),
  size_height VARCHAR(50),
  quantity VARCHAR(50),
  deadline DATE,
  budget VARCHAR(100),
  contact_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  details TEXT,
  design_files_count INTEGER DEFAULT 0,
  design_files_urls TEXT[],
  privacy_consent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_email ON inquiries(email);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert access" ON inquiries
  FOR INSERT WITH CHECK (true);

-- 관리자만 조회 가능하도록 설정 (선택사항)
-- CREATE POLICY "Allow admin read access" ON inquiries
--   FOR SELECT USING (auth.role() = 'authenticated');
```

## 2. 이메일 발송 설정

### Gmail SMTP 사용 (권장)

1. Gmail 계정에서 "앱 비밀번호" 생성:
   - Google 계정 > 보안 > 2단계 인증 활성화
   - 앱 비밀번호 생성

2. 환경 변수 설정:

**로컬 개발 (.env.local):**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
```

**Vercel 배포:**
Vercel 대시보드에서 프로젝트 설정 > Environment Variables에 추가:
- `SMTP_HOST`: `smtp.gmail.com`
- `SMTP_PORT`: `587`
- `SMTP_USER`: Gmail 주소
- `SMTP_PASS`: Gmail 앱 비밀번호
- `SMTP_FROM`: 발신자 이메일 주소

### 다른 SMTP 서비스 사용

다른 이메일 서비스(SendGrid, Mailgun, AWS SES 등)를 사용하려면 `api/inquiry/submit.ts`의 `createTransporter` 함수를 수정하세요.

## 3. 테스트

문의 폼을 제출하면:
1. Supabase DB에 저장됨
2. jay@faddit.co.kr로 이메일 발송됨

## 4. 확인

- Supabase 대시보드의 Table Editor에서 `inquiries` 테이블 확인
- jay@faddit.co.kr 메일함에서 이메일 확인

