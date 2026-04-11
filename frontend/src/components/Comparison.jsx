
const COMPARE = [
  { icon:'🏍️', label:'Bike', toll:0, note:'Exempt on NHs', best:false },
  { icon:'🚗', label:'Car / Van', toll:1420, note:'14 plazas · 1,415 km', best:true },
  { icon:'🚐', label:'LCV / Mini', toll:2272, note:'14 plazas · 1,415 km', best:false },
  { icon:'🚌', label:'Bus 2-Axle', toll:4189, note:'14 plazas · 1,415 km', best:false },
  { icon:'🚛', label:'Truck 3-Axle', toll:4757, note:'14 plazas · 1,415 km', best:false },
  { icon:'🚚', label:'Truck 4-Axle', toll:7029, note:'14 plazas · 1,415 km', best:false },
  { icon:'🚜', label:'MAV 5-6 Axle', toll:9656, note:'14 plazas · 1,415 km', best:false },
  { icon:'⚙️',  label:'Oversized 7+', toll:11218, note:'14 plazas · 1,415 km', best:false },
]

export default function Comparison() {
  return (
    <section id="compare" style={{background:'black', padding:'6rem 4rem', borderTop:'1px solid #1A1A1A'}}>
      <div style={{fontSize:'0.72rem', fontWeight:600, color:'#6B6B6B', textTransform:'uppercase', letterSpacing:2, marginBottom:'1rem'}}>Vehicle comparison</div>
      <h2 style={{fontFamily:'Barlow Condensed', fontWeight:800, fontSize:'clamp(2rem,4vw,3.5rem)', textTransform:'uppercase', letterSpacing:-0.5, lineHeight:1, marginBottom:'2rem'}}>
        Delhi →<br/>Mumbai.
      </h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'#1A1A1A', borderRadius:12, overflow:'hidden'}}>
        {COMPARE.map(c => (
          <div key={c.label} style={{background: c.best ? 'white' : '#111', padding:'1.5rem', textAlign:'center', position:'relative'}}>
            {c.best && <div style={{position:'absolute', top:10, right:10, background:'#06C167', color:'black', fontSize:'0.6rem', fontWeight:700, padding:'2px 8px', borderRadius:4, textTransform:'uppercase', letterSpacing:0.5}}>Best</div>}
            <div style={{fontSize:'1.8rem', marginBottom:'0.5rem'}}>{c.icon}</div>
            <div style={{fontFamily:'Barlow Condensed', fontSize:'0.8rem', fontWeight:700, textTransform:'uppercase', letterSpacing:1, color: c.best ? '#444' : '#9E9E9E', marginBottom:'0.75rem'}}>{c.label}</div>
            <div style={{fontFamily:'Barlow Condensed', fontSize:'2.2rem', fontWeight:800, color: c.best ? 'black' : 'white', lineHeight:1}}>
              {c.toll === 0 ? '₹0' : `₹${c.toll.toLocaleString()}`}
            </div>
            <div style={{fontSize:'0.65rem', color: c.best ? '#666' : '#444', textTransform:'uppercase', letterSpacing:1, marginTop:2}}>Total Toll</div>
            <div style={{fontSize:'0.72rem', color: c.best ? '#666' : '#444', marginTop:'0.75rem'}}>{c.note}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
