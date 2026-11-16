import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowDown, ArrowUpRight, MoveHorizontal } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export function Hero() {
  const { language } = useLanguage()
  const ko = language === 'ko'
  const [reveal, setReveal] = useState(0)
  return <section className="rebrand-hero">

    <div className="hero-title-row"><h1>{ko ? <>마음을 감싸는,<br/><strong>한 겹의 차이.</strong></> : <>A simple wrap.<br/><strong>A lasting impression.</strong></>}</h1><div className="hero-intro"><p>{ko ? <>같은 제품도 보자기로 싸면 선물이 됩니다.<br/>브랜드에 꼭 맞는 보자기를 만들어 드려요.</> : <>From an object to a meaningful gift.<br/>Wrap your brand’s story in Korean bojagi.</>}</p><Link to="/design" className="text-link">{ko ? '보자기 디자인해 보기' : 'Design with a prompt'} <ArrowUpRight size={17}/></Link></div></div>
    <div className="comparison">
      <img className="comparison-original" src="/brand/bojagi-hero-logo.png" width="1536" height="1024" alt={ko ? '왼쪽의 심플한 제품 박스와 오른쪽의 진주빛 실크 보자기로 정성스럽게 포장한 선물' : 'A simple box on the left and an elegantly wrapped pearl-white silk bojagi gift on the right'} fetchPriority="high" />
      <div className="comparison-mist" aria-hidden="true"><img src="/brand/bojagi-hero-logo.png" alt="" /></div>
      <div className="comparison-revealed" aria-hidden="true" style={{clipPath:`inset(0 ${50-reveal*.5}% 0 50%)`}}><img src="/brand/bojagi-hero-logo.png" alt="" /></div>



      <div className="reveal-line" style={{left:`${50+reveal*.47}%`}}><span><MoveHorizontal size={20}/></span></div>
      <input className="reveal-range" type="range" min="0" max="100" value={reveal} onChange={e=>setReveal(Number(e.target.value))} aria-label={ko ? '오른쪽으로 밀어 보자기 포장을 선명하게 보기' : 'Slide right to reveal the wrapped gift'} aria-valuetext={`${reveal}%`} />
      <div className="drag-caption">{reveal > 90 ? (ko ? '한 장 감쌌을 뿐인데 이렇게 달라져요' : 'A little wrapping. A world of difference.') : (ko ? '가운데 선을 오른쪽으로 밀어보세요' : 'Slide the centre line to the right')} <span>→</span></div>
    </div>
    <div className="hero-bottom"><a href="#who-we-are">{ko ? '소복 알아보기' : 'Discover the difference'} <ArrowDown size={14}/></a></div>
  </section>
}
