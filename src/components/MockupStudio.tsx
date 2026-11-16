import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export function MockupStudio() {
  const { language } = useLanguage()
  const ko = language === 'ko'
  const examples = [
    { title: ko ? '차 브랜드 선물 세트' : 'A thoughtful tea gift', prompt: ko ? '차 선물 세트를 아이보리색 슬라브 보자기로 싸고 싶어요. 매듭은 너무 화려하지 않게요.' : 'Wrap a tea gift set in ivory slub bojagi, with natural texture and a simple knot.', image: '/brand/concept-tea-slab.jpg', material: '슬라브' },
    { title: ko ? '화장품 브랜드 패키지' : 'A delicate beauty package', prompt: ko ? '화장품 세트를 연분홍 오간자로 포장하고 싶어요. 가볍고 살짝 비치는 느낌으로요.' : 'Design pale pink organza wrapping for a beauty brand, with a light and sheer feel.', image: '/brand/concept-beauty-organza.jpg', material: '오간자' },
    { title: ko ? '거래처 명절 선물' : 'A gift for a special occasion', prompt: ko ? '거래처에 보낼 명절 선물이에요. 광택 있는 크리스탈 원단에 매듭은 풍성하게 해주세요.' : 'Create premium corporate gift wrapping with luminous crystal fabric and a generous knot.', image: '/brand/concept-premium-crystal.jpg', material: '크리스탈' },
  ]
  return <section id="studio" className="studio-section section-pad">
    <h2>{ko ? <>이런 포장은<br/><strong>어떠세요?</strong></> : <>Start with a thought.<br/><strong>Imagine the gift.</strong></>}</h2>
    <p className="section-description">{ko ? '마음에 드는 걸 하나 골라 보세요. 디자인 스튜디오에서 이야기 나누면서 원하는 대로 바꿔 드려요.' : 'Choose an example, then continue the conversation on the design page to explore your own wrapping concept.'}</p>
    <div className="design-examples">{examples.map(example=><Link className="design-example" key={example.material} to="/design" state={{example}}><div className="example-image"><img src={example.image} alt={example.title} loading="lazy"/></div><div className="example-copy"><h3>{example.title}</h3><p>“{example.prompt}”</p><span className="text-link">{ko ? '이 내용으로 시작하기' : 'Design with this prompt'}<ArrowUpRight size={16}/></span></div></Link>)}</div>
    <p className="demo-note">{ko ? '예시 문장과 샘플 이미지예요. 직접 이미지를 만들어 주는 기능은 준비하고 있어요.' : 'Illustrative prompts and sample images. Live image generation is coming later.'}</p>
  </section>
}
