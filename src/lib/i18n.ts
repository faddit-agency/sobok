export type Locale = "ko" | "en" | "ja" | "zh" | "es"

export const locales: { id: Locale; label: string; native: string }[] = [
  { id: "ko", label: "Korean", native: "한국어" },
  { id: "en", label: "English", native: "English" },
  { id: "ja", label: "Japanese", native: "日本語" },
  { id: "zh", label: "Chinese", native: "中文" },
  { id: "es", label: "Spanish", native: "Español" },
]

export const defaultLocale: Locale = "ko"
const STORAGE_KEY = "gbb.locale.v1"

type Dict = Record<string, string>

const dictionaries: Record<Locale, Dict> = {
  ko: {
    "nav.about": "ABOUT",
    "nav.studio": "STUDIO",
    "nav.project": "PROJECT",
    "nav.inquiries": "INQUIRIES",
    "nav.login": "LOGIN",
    "nav.logout": "LOGOUT",
    "nav.myInquiries": "MY INQUIRIES",
    "nav.menu": "메뉴",
    "nav.close": "닫기",
    "lang.label": "언어",
    "hero.scroll": "SCROLL DOWN",
    "home.eyebrow": "THE FINAL MOVE",
    "home.title": "시안을 직접 입혀보고,\n채팅으로 상담까지.",
    "home.f1.title": "보자기 시안 스튜디오",
    "home.f1.body": "이미지·색·로고를 보자기에 미리 올려보고 내용을 작성한 뒤 문의합니다.",
    "home.f2.title": "담당자 채팅 상담",
    "home.f2.body": "문의 후 웹에서 채팅처럼 견적, 링크, 이미지를 주고받습니다.",
    "home.f3.title": "문의 내역 보관",
    "home.f3.body": "시안과 대화 기록이 문의내역에 남아 언제든 이어서 확인할 수 있습니다.",
    "home.openStudio": "OPEN STUDIO",
    "footer.blurb": "브랜드의 마지막 승부를 함께 디자인하는 커스텀 보자기 스튜디오.",
    "tagline": "Not rock, not scissors. We play Bojagi.",
    "intro.line": "다음 판엔 무슨 색 보자기를 낼까요?",
  },
  en: {
    "nav.about": "ABOUT",
    "nav.studio": "STUDIO",
    "nav.project": "PROJECT",
    "nav.inquiries": "INQUIRIES",
    "nav.login": "LOGIN",
    "nav.logout": "LOGOUT",
    "nav.myInquiries": "MY INQUIRIES",
    "nav.menu": "Menu",
    "nav.close": "Close",
    "lang.label": "Language",
    "hero.scroll": "SCROLL DOWN",
    "home.eyebrow": "THE FINAL MOVE",
    "home.title": "Preview your bojagi,\nthen consult in chat.",
    "home.f1.title": "Bojagi design studio",
    "home.f1.body": "Apply image, color, and logo to a bojagi, write your note, then send an inquiry.",
    "home.f2.title": "Chat with our team",
    "home.f2.body": "After inquiry, exchange quotes, links, and images in a chat-like thread.",
    "home.f3.title": "Inquiry history",
    "home.f3.body": "Drafts and conversations stay in your inquiry history for follow-up anytime.",
    "home.openStudio": "OPEN STUDIO",
    "footer.blurb": "A custom bojagi studio designing the brand’s final move together.",
    "tagline": "Not rock, not scissors. We play Bojagi.",
    "intro.line": "What color bojagi for the next round?",
  },
  ja: {
    "nav.about": "ABOUT",
    "nav.studio": "STUDIO",
    "nav.project": "PROJECT",
    "nav.inquiries": "INQUIRIES",
    "nav.login": "LOGIN",
    "nav.logout": "LOGOUT",
    "nav.myInquiries": "MY INQUIRIES",
    "nav.menu": "メニュー",
    "nav.close": "閉じる",
    "lang.label": "言語",
    "hero.scroll": "SCROLL DOWN",
    "home.eyebrow": "THE FINAL MOVE",
    "home.title": "ボジャギに直接デザインし、\nチャットで相談まで。",
    "home.f1.title": "ボジャギデザインスタジオ",
    "home.f1.body": "画像・色・ロゴをボジャギに仮当てし、内容を書いて問い合わせます。",
    "home.f2.title": "担当者チャット相談",
    "home.f2.body": "問い合わせ後、見積・リンク・画像をチャットのようにやり取りできます。",
    "home.f3.title": "問い合わせ履歴",
    "home.f3.body": "デザイン案と会話は履歴に残り、いつでも続きから確認できます。",
    "home.openStudio": "OPEN STUDIO",
    "footer.blurb": "ブランドの最後の勝負をともにデザインするカスタムボジャギスタジオ。",
    "tagline": "Not rock, not scissors. We play Bojagi.",
    "intro.line": "次の番は、何色のボジャギを出しますか",
  },
  zh: {
    "nav.about": "ABOUT",
    "nav.studio": "STUDIO",
    "nav.project": "PROJECT",
    "nav.inquiries": "INQUIRIES",
    "nav.login": "LOGIN",
    "nav.logout": "LOGOUT",
    "nav.myInquiries": "MY INQUIRIES",
    "nav.menu": "菜单",
    "nav.close": "关闭",
    "lang.label": "语言",
    "hero.scroll": "SCROLL DOWN",
    "home.eyebrow": "THE FINAL MOVE",
    "home.title": "直接预览包袱布设计，\n并通过聊天完成咨询。",
    "home.f1.title": "包袱布设计工作室",
    "home.f1.body": "先把图片、颜色和标志套到包袱布上，写好内容后再提交询价。",
    "home.f2.title": "与负责人在线沟通",
    "home.f2.body": "询价后可像聊天一样交换报价、链接与图片。",
    "home.f3.title": "询价记录保存",
    "home.f3.body": "设计稿与对话都会留在询价记录中，随时可继续查看。",
    "home.openStudio": "OPEN STUDIO",
    "footer.blurb": "与品牌一起设计最后一局的定制包袱布工作室。",
    "tagline": "Not rock, not scissors. We play Bojagi.",
    "intro.line": "下一局要出什么颜色的包袱布呢",
  },
  es: {
    "nav.about": "ABOUT",
    "nav.studio": "STUDIO",
    "nav.project": "PROJECT",
    "nav.inquiries": "INQUIRIES",
    "nav.login": "LOGIN",
    "nav.logout": "LOGOUT",
    "nav.myInquiries": "MY INQUIRIES",
    "nav.menu": "Menú",
    "nav.close": "Cerrar",
    "lang.label": "Idioma",
    "hero.scroll": "SCROLL DOWN",
    "home.eyebrow": "THE FINAL MOVE",
    "home.title": "Prueba tu bojagi\ny consulta por chat.",
    "home.f1.title": "Estudio de bojagi",
    "home.f1.body": "Aplica imagen, color y logo al bojagi, escribe tu mensaje y envía la consulta.",
    "home.f2.title": "Chat con el equipo",
    "home.f2.body": "Tras la consulta, intercambia presupuestos, enlaces e imágenes como en un chat.",
    "home.f3.title": "Historial de consultas",
    "home.f3.body": "Los borradores y conversaciones quedan guardados para continuar cuando quieras.",
    "home.openStudio": "OPEN STUDIO",
    "footer.blurb": "Un estudio de bojagi a medida que diseña la jugada final de la marca.",
    "tagline": "Not rock, not scissors. We play Bojagi.",
    "intro.line": "¿De qué color será el bojagi de la próxima ronda?",
  },
}

export function readStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw && locales.some((l) => l.id === raw)) return raw as Locale
  return defaultLocale
}

export function writeStoredLocale(locale: Locale) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, locale)
}

export function translate(locale: Locale, key: string) {
  return dictionaries[locale][key] ?? dictionaries.ko[key] ?? key
}
