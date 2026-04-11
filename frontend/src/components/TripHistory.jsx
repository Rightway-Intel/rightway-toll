
const TRIPS = [
  { from:'New Delhi', to:'Mumbai', vehicle:'🚛 Truck 3-Axle', dist:'1,415 km', plazas:14, toll:'₹4,340', date:'Apr 11, 2026', status:'done' },
  { from:'Bengaluru', to:'Chennai', vehicle:'🚗 Car/Van', dist:'346 km', plazas:4, toll:'₹340', date:'Apr 10, 2026', status:'done' },
  { from:'Mumbai', to:'Pune', vehicle:'🚌 Bus 2-Axle', dist:'148 km', plazas:3, toll:'₹870', date:'Apr 10, 2026', status:'done' },
  { from:'Delhi', to:'Jaipur', vehicle:'🚛 MAV 5-Axle', dist:'282 km', plazas:6, toll:'₹2,100', date:'Apr 09, 2026', status:'pending' },
  { from:'Hyderabad', to:'Bengaluru', vehicle:'🚚 Truck 4-Axle', dist:'568 km', plazas:8, toll:'₹3,520', date:'Apr 09, 2026', status:'done' },
]

export default function TripHistory() {
  return (
    <section id="history" style={{background:'#111', padding:'6rem 4rem', borderTop:'1px solid #1A1A1A'}}>
      <div style={{fontSize:'0.72rem', fontWeight:600, color:'#6B6B6B', textTransform:'uppercase', letterSpacing:2, marginBottom:'1rem'}}>Recent activity</div>
      <h2 style={{fontFamily:'Barlow Condensed', fontWeight:800, fontSize:'clamp(2rem,4vw,3.5rem)', textTransform:'uppercase', letterSpacing:-0.5, lineHeight:1, marginBottom:'2rem'}}>
        Trip<br/>history.
      </h2>
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr>
            {['Route','Vehicle','Distance','Plazas','Total Toll','Date','Status'].map(h => (
              <th key={h} style={{textAlign:'left', fontSize:'0.68rem', fontWeight:600, color:'#6B6B6B', textTransform:'uppercase', letterSpacing:1.5, padding:'0.75rem 1rem', borderBottom:'1px solid #1A1A1A'}}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TRIPS.map((t,i) => (
            <tr key={i}>
              <td style={{padding:'1rem', borderBottom:'1px solid #1A1A1A'}}>
                <div style={{fontWeight:500, color:'white', fontSize:'0.875rem'}}>{t.from}</div>
                <div style={{fontSize:'0.78rem', color:'#6B6B6B'}}>→ {t.to}</div>
              </td>
              <td style={{padding:'1rem', borderBottom:'1px solid #1A1A1A'}}>
                <span style={{background:'#1A1A1A', padding:'3px 10px', borderRadius:4, fontSize:'0.72rem', fontWeight:600, color:'#D3D3D3'}}>{t.vehicle}</span>
              </td>
              <td style={{padding:'1rem', borderBottom:'1px solid #1A1A1A', fontSize:'0.875rem', color:'#9E9E9E'}}>{t.dist}</td>
              <td style={{padding:'1rem', borderBottom:'1px solid #1A1A1A', fontSize:'0.875rem', color:'#9E9E9E'}}>{t.plazas}</td>
              <td style={{padding:'1rem', borderBottom:'1px solid #1A1A1A', fontFamily:'Barlow Condensed', fontSize:'1.1rem', fontWeight:700, color:'white'}}>{t.toll}</td>
              <td style={{padding:'1rem', borderBottom:'1px solid #1A1A1A', fontSize:'0.875rem', color:'#9E9E9E'}}>{t.date}</td>
              <td style={{padding:'1rem', borderBottom:'1px solid #1A1A1A'}}>
                <span style={{
                  padding:'3px 10px', borderRadius:4, fontSize:'0.68rem', fontWeight:600, textTransform:'uppercase', letterSpacing:0.5,
                  background: t.status==='done' ? 'rgba(6,193,103,0.15)' : 'rgba(255,255,255,0.08)',
                  color: t.status==='done' ? '#06C167' : '#9E9E9E'
                }}>
                  {t.status==='done' ? 'Completed' : 'Pending'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
