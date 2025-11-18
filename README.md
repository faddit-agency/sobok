# SOBOK

SOBOK 웹사이트를 React, Tailwind CSS, shadcn/ui로 구현한 프로젝트입니다.

## 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **shadcn/ui** - UI 컴포넌트
- **Lucide React** - 아이콘

## 설치 및 실행

### 의존성 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버는 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── ui/             # shadcn/ui 컴포넌트
│   ├── Header.tsx      # 헤더 컴포넌트
│   ├── Hero.tsx        # 히어로 섹션
│   ├── ImageSlider.tsx # 이미지 슬라이더
│   ├── WhoWeAreSection.tsx
│   ├── ServicesFeatureSection.tsx
│   ├── ProcessSection.tsx
│   ├── CTASection.tsx
│   └── Footer.tsx
├── pages/              # 페이지 컴포넌트
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Inquiry.tsx
│   ├── Works.tsx
│   └── FAQ.tsx
├── contexts/           # React Context
│   └── LanguageContext.tsx
├── hooks/              # Custom Hooks
│   └── useScrollAnimation.ts
├── lib/                # 유틸리티 함수
├── App.tsx             # 메인 앱 컴포넌트
├── main.tsx            # 진입점
└── index.css           # 글로벌 스타일
```

## 주요 기능

- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 다국어 지원 (한국어/영어)
- 이미지 슬라이더
- 스크롤 애니메이션
- 모바일 메뉴
- 문의 폼

## 라이선스

Copyright © SOBOK All rights reserved.
