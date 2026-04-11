
const FEATURES = [
  { icon:'🛣️', title:'Route Intelligence', desc:'Automatically identifies every toll plaza on your route using precise geospatial matching — not just highway codes.' },
  { icon:'🚛', title:'8 Vehicle Classes', desc:'From bikes to oversized trucks. Accurate rates per NHAI classification — bikes exempt, commercial vehicles calculated precisely.' },
  { icon:'📊', title:'Cost Comparison', desc:'Compare toll costs across all vehicle types side by side. Find the optimal vehicle class for your cargo and route.' },
  { icon:'📍', title:'1,033 Plazas', desc:'Complete NHAI database covering all 22 states with verified coordinates, rates, and payment method support.' },
  { icon:'🔄', title:'Return Journey', desc:'Same-day return at 1.5× rate. Multi-day return at 2× rate. Automatically applied per NHAI rules.' },
  { icon:'📋', title:'Trip History', desc:'Every calculation saved. Review past routes, compare costs over time, and export data for accounting.' },
]

export default function Features() {
  return (
    <section id="features" style={{background:'black', padding:'6rem 4rem', borderTop:'1px solid #111'}}>
      <div style={{fontSize:'0.72rem', fontWeight:600, color:'#6B6B6B', textTransform:'uppercase', letterSpacing:2, marginBottom:'1rem'}}>What we offer</div>
      <h2 style={{fontFamily:'Barlow Condensed', fontWeight:800, fontSize:'clamp(2rem,4vw,3.5rem)', textTransform:'uppercase', letterSpacing:-0.5, marginBottom:'3rem', lineHeight:1}}>
        Built for<br/>the road.
      </h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'#1A1A1A', borderRadius:12, overflow:'hidden'}}>
        {FEATURES.map(f => (
          <div key={f.title} style={{background:'#111', padding:'2rem', transition:'background 0.2s'}}>
            <div style={{width:40, height:40, background:'#1A1A1A', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', marginBottom:'1.25rem'}}>{f.icon}</div>
            <div style={{fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1.1rem', textTransform:'uppercase', letterSpacing:0.5, marginBottom:'0.5rem'}}>{f.title}</div>
            <p style={{fontSize:'0.85rem', color:'#6B6B6B', lineHeight:1.6, fontWeight:300}}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
