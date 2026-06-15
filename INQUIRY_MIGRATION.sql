-- inquiries 테이블 생성 (새 Supabase 프로젝트용)
-- Supabase SQL Editor에서 실행하세요

CREATE TABLE IF NOT EXISTS inquiries (
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
  size_depth VARCHAR(50),
  calculated_bojagi_size VARCHAR(50),
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

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert access" ON inquiries;
CREATE POLICY "Allow public insert access" ON inquiries
  FOR INSERT WITH CHECK (true);

-- notice_views 테이블 (공지 조회수)
CREATE TABLE IF NOT EXISTS notice_views (
  notice_id INTEGER PRIMARY KEY,
  views INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE notice_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON notice_views;
CREATE POLICY "Allow public read access" ON notice_views
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert access" ON notice_views;
CREATE POLICY "Allow public insert access" ON notice_views
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access" ON notice_views;
CREATE POLICY "Allow public update access" ON notice_views
  FOR UPDATE USING (true);

-- Storage bucket (문의 첨부파일)
INSERT INTO storage.buckets (id, name, public)
VALUES ('inquiry-files', 'inquiry-files', true)
ON CONFLICT (id) DO NOTHING;
