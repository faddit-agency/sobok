-- inquiries 테이블에 누락된 컬럼 추가
-- Supabase SQL Editor에서 실행하세요

-- country 컬럼 추가
ALTER TABLE inquiries 
ADD COLUMN IF NOT EXISTS country VARCHAR(100);

-- industry 컬럼 추가
ALTER TABLE inquiries 
ADD COLUMN IF NOT EXISTS industry VARCHAR(100);

-- custom_industry 컬럼 추가
ALTER TABLE inquiries 
ADD COLUMN IF NOT EXISTS custom_industry VARCHAR(255);

-- existing_products 컬럼 추가
ALTER TABLE inquiries 
ADD COLUMN IF NOT EXISTS existing_products TEXT;

-- size_width 컬럼 추가
ALTER TABLE inquiries 
ADD COLUMN IF NOT EXISTS size_width VARCHAR(50);

-- size_height 컬럼 추가
ALTER TABLE inquiries 
ADD COLUMN IF NOT EXISTS size_height VARCHAR(50);

-- design_files_urls 컬럼 추가 (이미 있으면 스킵)
ALTER TABLE inquiries 
ADD COLUMN IF NOT EXISTS design_files_urls TEXT[];



