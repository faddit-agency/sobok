# 실사·정보 교체 및 외부 연동 목록

## 이미지 교체 권장

| 위치 | 현재 | 교체 방향 |
|------|------|-----------|
| 홈 히어로 | `/brand/bojagi-diptych.png` (제작 예시) | 같은 그래픽의 포스터(벽) + 보자기 선물(테이블) 실사 |
| 패브릭 포스터 대표 | 패널/스카프 샘플 컷 | 벽걸이·공간 연출 실사 |
| 이중 쓰임 비교 | 보자기 샘플 2컷 | 동일 그래픽 적용 제품 |
| 원단 디테일 | `public/brand/fabrics/*` | 제공 원단 실물 클로즈업 |

`PlaceholderBadge`(제작 예시)는 시안 이미지에 표시됩니다. 실사 교체 후 `homeContent.hero.heroIsPlaceholder`와 사례 `caseKind`/`isPlaceholderVisual`을 업데이트하세요.

## 운영 데이터 (`src/data/`)

- `siteSettings.ts` — 도메인, 연락처, 사업자(확정 전 `null` 유지)
- `products.ts` — 원단·크기·인쇄·마감·FAQ (실제 제공 목록으로 교체)
- `worksCatalog.ts` — 사례. `caseKind: "real"`은 공개 동의·실사 확보 후
- `content/home.ts`, `process.ts`, `about.ts` — 브랜드 카피

미확정 수치(MOQ·단가·납기·샘플비)는 UI에서 「사양과 수량에 따라 상담 후 안내」로 표시됩니다. 확정 시 제품/사례 필드에만 넣으세요.

## 외부 연동

| 기능 | 필요 환경 변수 |
|------|----------------|
| 상담 저장 | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (또는 ANON) |
| 상담 메일 | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` |
| 시연 모드 | `NEXT_PUBLIC_DEMO_MODE=true` |
| SEO 기준 URL | `NEXT_PUBLIC_SITE_URL` |

관리자 원가 계산기: `/admin/calculator` (기존 로직 최소 이전). 문의 CMS·캘린더는 미구현 placeholder입니다.

## 분석

- Vercel Analytics / Speed Insights: 레이아웃에 연결됨
- 커스텀 이벤트(`src/lib/analytics.ts`): `product_view`, `work_view`, `consult_click`, `consult_start`, `consult_success` — 개인정보 미포함
