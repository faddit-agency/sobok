import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUp, ArrowUpRight, Plus } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { buildBojagiPrompt } from '../lib/bojagiPrompt'
import { useMetaTags } from '../hooks/useMetaTags'

type Concept = { prompt: string; material: string; image?: string }
type Message = { role: 'user' | 'assistant'; text: string; concept?: Concept }
type Fabric = {
  name: string; nameEn: string; image?: string; swatch?: string
  zoom?: { size: string; position: string }
  summary: string; summaryEn: string
  traits: { label: string; labelEn: string; value: string; valueEn: string }[]
}
const fabrics: Fabric[] = [
  { name:'슬라브', nameEn:'Slab', image:'/brand/concept-tea-slab.jpg', swatch:'slab', zoom:{ size:'278%', position:'98% 45%' },
    summary:'실크처럼 은은하게 윤이 나고, 가로로 빗살 같은 결이 살짝 보여요. 힘이 있어서 매듭이 잘 잡혀요.', summaryEn:'A soft silky sheen with fine horizontal slubs. Its crisp body holds knots well.',
    traits:[
      { label:'질감', labelEn:'Texture', value:'가로 빗살 결', valueEn:'Horizontal slub grain' },
      { label:'광택', labelEn:'Sheen', value:'은은한 실크 광택', valueEn:'Soft silky sheen' },
      { label:'촉감', labelEn:'Hand', value:'살짝 빳빳해 매듭이 잘 잡힘', valueEn:'Slightly crisp, holds knots' },
      { label:'추천', labelEn:'Best for', value:'차 · 식품 · 리빙 선물', valueEn:'Tea, food, living gifts' },
    ] },
  { name:'오간자', nameEn:'Organza', image:'/brand/concept-beauty-organza.jpg', swatch:'organza', zoom:{ size:'278%', position:'91% 34%' },
    summary:'얇고 살짝 비쳐요. 겹치면 색이 진해지고, 매듭이 가볍게 잘 서요.', summaryEn:'Sheer and crisp — colors deepen as layers overlap and knots stand up lightly.',
    traits:[
      { label:'질감', labelEn:'Texture', value:'얇고 빳빳함', valueEn:'Thin and crisp' },
      { label:'비침', labelEn:'Sheerness', value:'반투명', valueEn:'Translucent' },
      { label:'무게', labelEn:'Weight', value:'아주 가벼움', valueEn:'Very light' },
      { label:'추천', labelEn:'Best for', value:'뷰티 · 향수 · 화사한 선물', valueEn:'Beauty, fragrance, bright gifts' },
    ] },
  { name:'크리스탈', nameEn:'Crystal', image:'/brand/concept-premium-crystal.jpg', swatch:'crystal', zoom:{ size:'278%', position:'91% 37%' },
    summary:'아주 얇고 비치는 노방 원단이에요. 실 자체가 반짝여서 하늘하늘하고, 겹칠수록 색이 깊어져요.', summaryEn:'An ultra-thin, sheer nobang fabric. Shimmering yarns make it airy, and colors deepen as layers overlap.',
    traits:[
      { label:'질감', labelEn:'Texture', value:'아주 얇고 매끄러움', valueEn:'Ultra-thin and smooth' },
      { label:'비침', labelEn:'Sheerness', value:'속이 비치는 투명감', valueEn:'See-through' },
      { label:'광택', labelEn:'Sheen', value:'반짝이는 실 광택', valueEn:'Shimmering yarn luster' },
      { label:'추천', labelEn:'Best for', value:'프리미엄 · 기업 선물', valueEn:'Premium, corporate gifts' },
    ] },
  { name:'기타', nameEn:'Other',
    summary:'면, 린넨, 실크, 자카드 등 생각해 둔 원단이 있으면 말씀해 주세요.', summaryEn:'Have another fabric in mind, like cotton, linen, silk or jacquard? Tell us in the chat.',
    traits:[
      { label:'소재', labelEn:'Materials', value:'면 · 린넨 · 실크 · 자카드 등', valueEn:'Cotton, linen, silk, jacquard…' },
      { label:'진행', labelEn:'Process', value:'상담 때 샘플을 보여 드려요', valueEn:'We source and propose samples' },
    ] },
]

const suggestions = [
  { label:'차 선물 세트', labelEn:'Tea gift set', prompt:'차 선물 세트를 아이보리색 슬라브 보자기로 싸고 싶어요. 매듭은 단정하게, 로고 택도 달아 주세요.', promptEn:'An ivory slab bojagi for a tea gift set, with a neat knot and a logo tag.', material:'슬라브' },
  { label:'화장품 패키지', labelEn:'Beauty package', prompt:'화장품 세트를 연분홍 오간자로 포장하고 싶어요. 가볍고 살짝 비치는 느낌으로요.', promptEn:'A pale pink organza wrap for a beauty brand, light and sheer.', material:'오간자' },
  { label:'거래처 명절 선물', labelEn:'Premium corporate gift', prompt:'거래처에 보낼 명절 선물이에요. 광택 있는 크리스탈 원단에 매듭은 풍성하게 해주세요.', promptEn:'A premium corporate gift wrap in softly lustrous crystal fabric with a full knot.', material:'크리스탈' },
]

function Avatar() {
  return <span className="chat-avatar" aria-hidden="true"><img src="/Sobok_black.svg" alt=""/></span>
}

export function Design() {
  const { language } = useLanguage()
  const ko = language === 'ko'
  const location = useLocation()
  const example = location.state?.example as { prompt?:string; material?:string } | undefined
  const [draft, setDraft] = useState(example?.prompt || '')
  const [material, setMaterial] = useState(example?.material || '슬라브')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const history = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)
  useMetaTags({title:ko?'디자인 스튜디오 | 소복':'Design your bojagi | SOBOK',description:ko?'원하는 포장을 이야기하면서 보자기를 디자인하고, 바로 제작까지 의뢰할 수 있어요.':'Explore a bojagi design through conversation and request production.',url:'/design',type:'website'})
  useEffect(()=>()=>{if(timer.current) clearTimeout(timer.current)},[])
  const scrollToEnd = () => { if(history.current) history.current.scrollTop=history.current.scrollHeight }
  useEffect(scrollToEnd,[messages,loading])
  useEffect(()=>{
    const el=input.current
    if(!el) return
    el.style.height='auto'
    el.style.height=`${Math.min(el.scrollHeight,160)}px`
  },[draft])

  const submit = (event?:FormEvent) => {
    event?.preventDefault()
    if(!draft.trim() || timer.current) return
    const text=draft.trim()
    const next=[...messages,{role:'user' as const,text}]
    const brief=next.filter(m=>m.role==='user').map(m=>m.text).join('\n\n')
    const selected=fabrics.find(f=>f.name===material) || fabrics[0]
    const fabricName=ko?selected.name:selected.nameEn
    setMessages(next); setDraft(''); setLoading(true)
    timer.current=setTimeout(()=>{
      setMessages([...next,{
        role:'assistant',
        text:selected.image
          ? (ko ? `${fabricName}로 이렇게 잡아 봤어요. 색이나 매듭, 로고 같은 걸 더 말씀해 주시면 계속 맞춰 볼게요.` : `I've shaped your brief around ${fabricName} fabric. Tell me more about colors, knots or brand details and we'll keep refining.`)
          : (ko ? '네, 알겠어요. 원단은 상담하면서 샘플 보고 같이 정해요.' : 'Your brief is ready. We’ll source samples of the fabric you have in mind during the production consultation.'),
        concept:{prompt:brief,material:selected.name,image:selected.image},
      }])
      setLoading(false); timer.current=null
    },2200)
  }
  const onKeyDown = (event:KeyboardEvent<HTMLTextAreaElement>) => {
    if(event.key==='Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      submit()
    }
  }

  return <div className="brand-page design-page"><div className="container">
    <section className="chat-window" aria-label={ko?'디자인 대화':'Design conversation'}>
      <header className="chat-window-header">
        <Avatar/>
        <div>
          <strong>{ko?'소복 디자인 스튜디오':'SOBOK Design Studio'}</strong>
          <span><i aria-hidden="true"/>{ko?'원하는 포장을 같이 찾아봐요':'Let’s shape your bojagi together'}</span>
        </div>
      </header>

      <div className="chat-history" ref={history} role="log" aria-live="polite">
        <div className="chat-row assistant">
          <Avatar/>
          <div className="chat-stack">
            <div className="chat-bubble">{ko?'안녕하세요, 소복입니다. 어떤 선물을 포장하시려고요?':'Hello, this is SOBOK. What would you like to wrap?'}</div>
            <div className="chat-bubble">{ko?'원단은 아래에서 고르시면 되고요, 제품이랑 원하는 색이나 분위기를 편하게 적어 주세요.':'Pick a fabric below and tell us about your product, colors and mood.'}</div>
            {!messages.length && <div className="chat-suggestions">
              {suggestions.map(s=><button type="button" key={s.label} onClick={()=>{setDraft(ko?s.prompt:s.promptEn); setMaterial(s.material); input.current?.focus()}}>{ko?s.label:s.labelEn}</button>)}
            </div>}
          </div>
        </div>

        {messages.map((m,i)=>m.role==='user'
          ? <div key={i} className="chat-row user"><div className="chat-bubble">{m.text}</div></div>
          : <div key={i} className="chat-row assistant">
              <Avatar/>
              <div className="chat-stack">
                <div className="chat-bubble">{m.text}</div>
                {m.concept && <div className="chat-concept">
                  {m.concept.image && <img src={m.concept.image} alt={ko?`${m.concept.material} 보자기 포장 콘셉트`:'Bojagi wrapping concept'} onLoad={scrollToEnd}/>}
                  <Link className="chat-concept-link" to="/inquiry" state={{mockup:{...m.concept,generationPrompt:buildBojagiPrompt(m.concept)}}}>{ko?'이대로 제작 의뢰하기':'Request production'}<ArrowUpRight size={15}/></Link>
                </div>}
              </div>
            </div>)}

        {loading && <div className="chat-row assistant" role="status">
          <Avatar/>
          <div className="chat-bubble chat-typing" aria-label={ko?'답장을 쓰고 있어요':'Preparing your concept'}><span/><span/><span/></div>
        </div>}
      </div>

      <form onSubmit={submit} className="chat-composer">
        <fieldset className="chat-fabrics" disabled={loading}>
          <legend>{ko?'원단':'Fabric'}</legend>
          {fabrics.map(f=><div className="chat-fabric" key={f.name}>
            <button type="button" aria-pressed={material===f.name} aria-describedby={`fabric-${f.nameEn}`} className={material===f.name?'selected':''} onClick={()=>setMaterial(f.name)}>
              {f.swatch ? <img src={`/products/${f.swatch}.png`} alt=""/> : <span className="chat-fabric-other" aria-hidden="true"><Plus size={13}/></span>}
              {ko?f.name:f.nameEn}
            </button>
            <div className="chat-fabric-detail" id={`fabric-${f.nameEn}`} role="tooltip">
              {f.image && f.zoom && <div className="chat-fabric-zoom">
                <div style={{ backgroundImage:`url(${f.image})`, backgroundSize:`${f.zoom.size} auto`, backgroundPosition:f.zoom.position }}/>
                <span>{ko?'원단 확대':'Close-up'}</span>
              </div>}
              <div className="chat-fabric-info">
                <strong>{ko?f.name:f.nameEn}</strong>
                <p>{ko?f.summary:f.summaryEn}</p>
                <dl>{f.traits.map(t=><div key={t.label}><dt>{ko?t.label:t.labelEn}</dt><dd>{ko?t.value:t.valueEn}</dd></div>)}</dl>
              </div>
            </div>
          </div>)}
        </fieldset>
        <div className="chat-input">
          <label htmlFor="chat-prompt" className="sr-only">{messages.length ? (ko?'어떻게 다듬어볼까요?':'What would you like to refine?') : (ko?'어떤 포장을 상상하시나요?':'Describe your wrapping idea')}</label>
          <textarea id="chat-prompt" ref={input} rows={1} value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={onKeyDown} required maxLength={1500} disabled={loading} placeholder={messages.length ? (ko?'더 다듬고 싶은 점을 알려주세요':'What should we refine?') : (ko?'어떤 포장을 원하세요?':'Describe your wrapping idea')}/>
          <button className="chat-send" disabled={loading || !draft.trim()} type="submit" aria-label={ko?'보내기':'Send'}><ArrowUp size={18}/></button>
        </div>
        <p className="chat-hint">{ko?'Enter로 보내기 · Shift + Enter로 줄바꿈':'Enter to send · Shift + Enter for a new line'}</p>
      </form>
    </section>
  </div></div>
}
