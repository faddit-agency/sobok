import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Hero } from '../components/Hero'
import { BrandLogos } from '../components/BrandLogos'
import { MockupStudio } from '../components/MockupStudio'
import { useLanguage } from '../contexts/LanguageContext'
import { useMetaTags } from '../hooks/useMetaTags'

export function Home() {
 const { language } = useLanguage()
 const ko = language === 'ko'
 useMetaTags({title:ko?'소복 | 마음을 감싸는 한 겹의 차이':'SOBOK | The art of Korean gift wrapping',description:ko?'브랜드에 맞는 보자기를 디자인하고 만들어 드려요. 포장 아이디어부터 제작까지 함께합니다.':'Korean bojagi for thoughtful brands. Explore wrapping concepts and bespoke production.',url:'/',type:'website'})
 return <div className="rebrand"><Hero/><BrandLogos/><MockupStudio/>
 <section className="philosophy section-pad" id="who-we-are"><div><h2>{ko ? <>풀고 나서도<br/><strong>버리지 않는 포장.</strong></> : <>More than wrapping.<br/><strong>A gesture of care.</strong></>}</h2><p>{ko ? '보자기는 예전부터 선물을 싸서 주고받을 때 써 온 우리 천이에요. 소복은 이 보자기를 브랜드에 맞게 새로 디자인하고 만듭니다. 선물을 풀고 나서도 다시 쓸 수 있어서, 받는 분 곁에 오래 남아요.' : 'For generations, Korean bojagi has carried both objects and the care behind them. SOBOK brings this tradition into a contemporary brand language: a wrap to keep, and a first impression to remember.'}</p></div>
 <ul className="reuse-examples">{[
  { image:'/brand/reuse-bag-scarf.jpg', title:ko?'가방에 스카프처럼':'As a bag scarf', desc:ko?'손잡이에 묶기만 해도 포인트가 돼요.':'Tie it on a handle for an easy accent.' },
  { image:'/brand/reuse-tea-mat.jpg', title:ko?'찻상 매트로':'As a tea mat', desc:ko?'식탁에 툭 펼쳐 두면 찻상이 돼요.':'Lay it flat under your teaware.' },
 ].map(item=><li key={item.image}><figure><img src={item.image} alt={item.title} loading="lazy"/><figcaption><strong>{item.title}</strong><span>{item.desc}</span></figcaption></figure></li>)}</ul></section>
 <section className="process-new section-pad"><h2>{ko?<>이렇게 <strong>진행돼요.</strong></>:<>From a first thought to <strong>a finished gift.</strong></>}</h2><ol className="process-grid process-steps">{(ko?[['원하는 포장 이야기하기','어떤 제품인지, 어떤 색과 분위기를 원하는지 편하게 말씀해 주세요.'],['샘플 이미지 보기','펼친 보자기와 포장한 모습을 같이 보면서 방향을 정해요.'],['제작 의뢰하기','마음에 드는 안으로 의뢰서를 보내 주시면 원단, 수량, 일정을 상의해 드려요.']]:[['Write a prompt','Describe your product, brand, colors and the mood you have in mind.'],['Review the mockup','Explore the unfolded bojagi and wrapped gift together.'],['Request production','Carry your concept into an inquiry and discuss fabric, quantity and timing.']]).map(([title,desc],index)=><li key={title}><div className="step-marker" aria-hidden="true"><span>{String(index+1).padStart(2, '0')}</span><span className="step-connector">→</span></div><h3>{title}</h3><p>{desc}</p></li>)}</ol></section>
 <section className="closing section-pad"><h2>{ko?<>생각해 둔 포장이<br/><strong>있으신가요?</strong></>:<>From a simple prompt<br/><strong>to a thoughtful gift.</strong></>}</h2><Link className="solid-link" to="/design">{ko?'디자인 시작하기':'Start with a prompt'}<ArrowUpRight size={18}/></Link></section>
 </div>
}
