# SEO · 검색 등록 안내

## 환경 변수

| 변수 | 용도 |
|------|------|
| `NEXT_PUBLIC_SITE_URL` | canonical, OG, sitemap, robots의 기준 도메인 (예: `https://sobok.example`) |
| `NEXT_PUBLIC_DEMO_MODE` | `true`면 상담 폼이 시연 모드(실제 접수 안 함) |

도메인이 확정되면 Vercel Project Settings → Environment Variables에 `NEXT_PUBLIC_SITE_URL`을 설정하세요.

## 자동 생성 파일

- `/sitemap.xml` — `app/sitemap.ts`
- `/robots.txt` — `app/robots.ts`
- 페이지별 `title`, `description`, `canonical`, Open Graph — `src/lib/seo.ts` + 각 `page.tsx`의 `generateMetadata`

## Google Search Console

1. [Google Search Console](https://search.google.com/search-console)에서 속성 추가 (도메인 또는 URL 접두어)
2. 소유권 확인: DNS TXT 또는 HTML 파일/`<meta>` 태그
3. HTML 메타 검증을 쓸 경우 `app/layout.tsx`의 `<head>`에 verification 메타를 추가하거나, Next `metadata.verification.google`에 값을 넣습니다.
4. 사이트맵 제출: `https://{도메인}/sitemap.xml`

## 네이버 서치어드바이저

1. [네이버 서치어드바이저](https://searchadvisor.naver.com/) 사이트 등록
2. 소유 확인: HTML 파일 업로드(`public/`) 또는 메타 태그
3. 사이트맵 제출: `https://{도메인}/sitemap.xml`
4. robots.txt 수집 요청으로 `/robots.txt` 확인

## 구조화 데이터

- Organization JSON-LD는 `app/layout.tsx`에서 출력합니다.
- 사업자·전화·주소는 `siteSettings`에 확정값이 있을 때만 포함됩니다.
- 가짜 리뷰·평점·FAQ 스키마는 사용하지 않습니다.

## 주의

색인 등록이나 검색 순위를 보장하는 표현은 쓰지 마세요. 본문·사례·사양은 HTML 텍스트로 제공되며, 각 URL은 직접 접속해도 열립니다.
