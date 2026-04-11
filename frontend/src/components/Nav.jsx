
export default function Nav() {
  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      background:'rgba(0,0,0,0.92)', backdropFilter:'blur(20px)',
      borderBottom:'1px solid #1A1A1A', height:64,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 2rem'
    }}>
      <a href="/" style={{display:'flex', alignItems:'center', gap:10, textDecoration:'none'}}>
        <div style={{width:32, height:32, background:'white', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <svg viewBox="0 0 18 18" width="18" height="18" fill="none">
            <rect x="2" y="2" width="6" height="6" fill="black"/>
            <rect x="10" y="2" width="6" height="6" fill="black"/>
            <rect x="2" y="10" width="6" height="6" fill="black"/>
            <rect x="10" y="10" width="6" height="6" fill="black" opacity="0.4"/>
          </svg>
        </div>
        <span style={{fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1.2rem', color:'white', letterSpacing:1, textTransform:'uppercase'}}>TollWise</span>
      </a>
      <div style={{display:'flex', alignItems:'center', gap:'2rem'}}>
        {['Features','History','Compare'].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{fontSize:'0.85rem', fontWeight:500, color:'#9E9E9E', textDecoration:'none'}}>{l}</a>
        ))}
        <button style={{background:'white', color:'black', border:'none', padding:'8px 20px', borderRadius:6, fontFamily:'Barlow', fontSize:'0.85rem', fontWeight:600, cursor:'pointer'}}>
          Sign In
        </button>
      </div>
    </nav>
  )
}
