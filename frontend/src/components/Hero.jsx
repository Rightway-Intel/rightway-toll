
import Calculator from './Calculator'

export default function Hero() {
  return (
    <section style={{minHeight:'100vh', display:'grid', gridTemplateColumns:'1fr 1fr', paddingTop:64}}>
      {/* Left */}
      <div style={{display:'flex', flexDirection:'column', justifyContent:'center', padding:'4rem 3rem 4rem 4rem', position:'relative'}}>
        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:'2rem'}}>
          <div style={{width:8, height:8, background:'#06C167', borderRadius:'50%'}}/>
          <span style={{fontSize:'0.75rem', fontWeight:600, color:'#9E9E9E', textTransform:'uppercase', letterSpacing:2}}>Fleet Toll Intelligence · India</span>
        </div>
        <h1 style={{fontFamily:'Barlow Condensed', fontWeight:800, fontSize:'clamp(3rem,6vw,5.5rem)', lineHeight:0.95, textTransform:'uppercase', letterSpacing:-1, marginBottom:'1.5rem'}}>
          Know every<br/>toll before<br/><span style={{color:'#6B6B6B'}}>you move.</span>
        </h1>
        <p style={{fontSize:'1rem', fontWeight:300, color:'#9E9E9E', lineHeight:1.7, maxWidth:400, marginBottom:'3rem'}}>
          Real-time toll calculation across 1,033 NHAI plazas. Built for fleet managers who move India's goods.
        </p>
        <div style={{display:'flex', gap:12}}>
          <button onClick={()=>document.getElementById('features').scrollIntoView({behavior:'smooth'})}
            style={{background:'transparent', color:'white', border:'1px solid #2D2D2D', padding:'14px 32px', borderRadius:8, fontFamily:'Barlow', fontSize:'0.95rem', fontWeight:500, cursor:'pointer'}}>
            See Features
          </button>
        </div>
        <div style={{display:'flex', gap:'2.5rem', marginTop:'4rem', paddingTop:'2rem', borderTop:'1px solid #1A1A1A'}}>
          {[['1,033','Toll Plazas'],['22','States'],['8','Vehicle Classes'],['264','Highways']].map(([n,l]) => (
            <div key={l}>
              <div style={{fontFamily:'Barlow Condensed', fontSize:'2rem', fontWeight:700, lineHeight:1}}>{n}</div>
              <div style={{fontSize:'0.72rem', color:'#6B6B6B', textTransform:'uppercase', letterSpacing:1, marginTop:4}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Calculator */}
      <div style={{background:'#111111', borderLeft:'1px solid #1A1A1A', display:'flex', flexDirection:'column', justifyContent:'center', padding:'3rem', overflowY:'auto'}}>
        <div style={{fontSize:'0.72rem', fontWeight:600, color:'#6B6B6B', textTransform:'uppercase', letterSpacing:2, marginBottom:'1.5rem'}}>Calculate toll cost</div>
        <Calculator />
      </div>
    </section>
  )
}
