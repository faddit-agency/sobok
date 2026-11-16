# SOBOK 플랫폼 구현 보고

브랜치: `feature/sobok-platform`

## 기존 코드 확인 결과

- `AGENTS.md` 없음
- 명세의 기존 원가 계산기 파일(`src/calculations.js`, `costItems.js`, `productModel.js`, `CalendarPage.jsx`, `supabaseStorage.js`)은 **이 저장소에 없음**
- 기존 공개 사이트(React+Vite+TS), `api/inquiry/submit.ts`(Supabase 저장+메일), `works` 데이터는 존재
- 따라서 원가 규칙은 명세 §17을 **신규 구현**했고, 기존 계산 결과를 “보존했다”고 주장하지 않음

## 1. 구현한 공개 화면

| 경로 | 상태 |
|------|------|
| `/` | 홈 (히어로·선정 샘플·맞춤 포인트·흐름·문의 유도) |
| `/works` | 제작 샘플 목록 + usage 필터(URL) |
| `/works/:slug` | 상세·사양·관련 샘플·참고 문의 연결 |
| `/materials` | 소재·맞춤 범위 |
| `/process` | 제작 안내·FAQ |
| `/inquiry` | A/B/C 한 페이지 문의 (샘플 연결/해제, 파일 검증, honeypot, idempotency key) |
| `/inquiry/complete` | 성공 state가 있을 때만 표시 (URL에 개인정보 없음) |
| `/privacy` | 미확정 정책을 완성본처럼 쓰지 않는 안내 |
| `/faq`, `/products`, `/design` | 새 경로로 리다이렉트 |

디자인 토큰: `#F6F5F1 / #20201D / #74746E / #DDDDD5 / #ECECE5`  
샘플 이미지는 **개발용 플레이스홀더 SVG** (배포 전 실교체 필요)

## 2. 구현한 관리자 기능

| 경로 | 상태 |
|------|------|
| `/admin/signin` | Supabase email/password (공개 가입 UI 없음) |
| `/admin` | 대시보드 |
| `/admin/*` | 레이아웃 + **admin_memberships.active** 권한 검사 |
| `/admin/calculator` | 명세 기반 원가 계산 UI |
| 문의/프로젝트/캘린더/콘텐츠 | 골격(Placeholder) — DB 연동 전 완료로 표시하지 않음 |

## 3. 기존 데이터·계산 호환

- 공개 샘플은 `src/data/worksCatalog.ts` 신규 모델 (`proposal_sample` 등)
- 구 `works.ts`(설아래 등)는 라우트에서 분리됨. 납품 공개는 동의·권한 확인 후 이관
- 원가: `src/lib/cost/calculations.ts` (1yd=90cm, 수율 max(정/회), 100원 올림 등)
- localStorage 고객 개인정보 저장 없음

## 4. 환경변수

공개/클라이언트:

- `VITE_DEMO_MODE=true` → 문의 실제 접수 차단 + 데모 안내
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

서버(Vercel):

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (브라우저 노출 금지)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`

## 5. DB·RLS

`supabase/SOBOK_PLATFORM_SCHEMA.sql` 참고  
관리자 계정은 초대/사전 승인 후 `admin_memberships`에 insert

## 6. 검증

- `npm run build`로 타입·번들 확인 권장
- 공개: 홈→샘플→상세→문의 연결, 필터, 완료 화면 state 가드
- 관리자: 미설정 시 차단 메시지 / membership 없으면 접근 불가
- 데모 모드에서 가짜 문의번호 출력하지 않음

## 7. 운영 전 입력 항목

- 실제 제품 사진·대체 텍스트
- 연락처·사업자 정보 (`siteSettings`)
- 개인정보 보유기간 확정 문구
- 관리자 초대·membership
- private storage bucket 정책
- SMTP 앱 비밀번호

## 8. 아직 실제 연동되지 않은 기능

- 관리자 문의 목록/상세/상태 이력 API
- 프로젝트·견적 버전·승인·입금 기록
- 생산 캘린더 7단계 UI
- 공개 콘텐츠 CMS
- 자동 확인 메일 (SMTP가 설정된 기존 submit 메일과 별개로 고객 확인메일 미구현)
- React 19 업그레이드 (현재 React 18 유지)
