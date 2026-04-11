
import { useState } from 'react'
import { calculateToll } from '../services/api'
import MapView from './MapView'

const VEHICLES = [
  { key:'bike', label:'Bike', icon:'🏍️' },
  { key:'car',  label:'Car',  icon:'🚗' },
  { key:'lcv',  label:'LCV',  icon:'🚐' },
  { key:'bus',  label:'Bus',  icon:'🚌' },
  { key:'truck3', label:'3-Axle', icon:'🚛' },
  { key:'truck4', label:'4-Axle', icon:'🚚' },
  { key:'mav',  label:'MAV',  icon:'🚜' },
  { key:'over', label:'Over', icon:'⚙️'  },
]

const DEMO_RESULT = {
  origin:'New Delhi', destination:'Mumbai',
  distanceKm:1415, durationMin:876,
  plazaCount:14, totalTollInr:1420, returnTrip:false,
  plazas:[
    {plazaName:'Kherki Daula', state:'Haryana', highwayCode:'48', tollInr:105},
    {plazaName:'Manesar', state:'Haryana', highwayCode:'48', tollInr:90},
    {plazaName:'Shahjahanpur', state:'Rajasthan', highwayCode:'48', tollInr:75},
    {plazaName:'Kishangarh', state:'Rajasthan', highwayCode:'48', tollInr:85},
    {plazaName:'Choryasi', state:'Gujarat', highwayCode:'48', tollInr:150},
  ]
}

function formatDuration(mins) {
  const h = Math.floor(mins/60), m = Math.round(mins%60)
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

export default function Calculator() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [vehicle, setVehicle] = useState('car')
  const [returnTrip, setReturnTrip] = useState(false)
  const [avoidTolls, setAvoidTolls] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const calculate = async () => {
    if (!origin || !destination) return
    setLoading(true)
    try {
      const res = await calculateToll({ origin, destination, vehicle, returnTrip, avoidTolls })
      setResult(res.data)
    } catch {
      setResult({ ...DEMO_RESULT, origin, destination, returnTrip })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{display:'flex', flexDirection:'column', gap:0}}>

      {/* From/To */}
      <div style={{display:'flex', flexDirection:'column', gap:1, background:'#2D2D2D', borderRadius:12, overflow:'hidden', marginBottom:12}}>
        <div style={{background:'#111111', padding:'1rem 1.25rem', display:'flex', alignItems:'center', gap:12}}>
          <div style={{width:10, height:10, border:'2px solid white', borderRadius:'50%', flexShrink:0}}/>
          <input value={origin} onChange={e=>setOrigin(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&calculate()}
            placeholder="From — pickup location"
            style={{background:'transparent', border:'none', outline:'none', fontFamily:'Barlow', fontSize:'0.95rem', color:'white', width:'100%'}}/>
          <span style={{fontSize:'0.65rem', color:'#444', textTransform:'uppercase', letterSpacing:1, whiteSpace:'nowrap'}}>From</span>
        </div>
        <div style={{background:'#111111', padding:'0 1.25rem', display:'flex', alignItems:'center'}}>
          <div style={{width:20, display:'flex', justifyContent:'center'}}>
            <div style={{width:1, height:20, background:'#2D2D2D'}}/>
          </div>
        </div>
        <div style={{background:'#111111', padding:'1rem 1.25rem', display:'flex', alignItems:'center', gap:12}}>
          <div style={{width:10, height:10, background:'white', borderRadius:2, flexShrink:0}}/>
          <input value={destination} onChange={e=>setDestination(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&calculate()}
            placeholder="To — dropoff location"
            style={{background:'transparent', border:'none', outline:'none', fontFamily:'Barlow', fontSize:'0.95rem', color:'white', width:'100%'}}/>
          <span style={{fontSize:'0.65rem', color:'#444', textTransform:'uppercase', letterSpacing:1, whiteSpace:'nowrap'}}>To</span>
        </div>
      </div>

      {/* Vehicles */}
      <div style={{display:'flex', gap:8, overflowX:'auto', paddingBottom:4, marginBottom:12, scrollbarWidth:'none'}}>
        {VEHICLES.map(v => (
          <div key={v.key} onClick={()=>setVehicle(v.key)}
            style={{
              flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', gap:4,
              padding:'10px 14px', minWidth:70, borderRadius:10, cursor:'pointer',
              border: v.key===vehicle ? '1px solid white' : '1px solid #1A1A1A',
              background: v.key===vehicle ? 'white' : '#111111',
              transition:'all 0.15s'
            }}>
            <span style={{fontSize:'1.3rem'}}>{v.icon}</span>
            <span style={{fontSize:'0.65rem', fontWeight:600, textTransform:'uppercase', letterSpacing:0.5, color: v.key===vehicle ? 'black' : '#9E9E9E'}}>{v.label}</span>
          </div>
        ))}
      </div>

      {/* Return toggle */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16}}>
        <span style={{fontSize:'0.82rem', color:'#9E9E9E'}}>Return journey (1.5×)</span>
        <label style={{position:'relative', width:40, height:22, cursor:'pointer'}}>
          <input type="checkbox" checked={returnTrip} onChange={e=>setReturnTrip(e.target.checked)} style={{opacity:0, width:0, height:0}}/>
          <div style={{
            position:'absolute', inset:0, borderRadius:22,
            background: returnTrip ? '#06C167' : '#2D2D2D',
            transition:'0.2s'
          }}>
            <div style={{
              position:'absolute', width:16, height:16, top:3,
              left: returnTrip ? 21 : 3,
              background:'white', borderRadius:'50%', transition:'0.2s'
            }}/>
          </div>
        </label>
      </div>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16}}>
        <span style={{fontSize:'0.82rem', color:'#9E9E9E'}}>Avoid tolls (longer route)</span>
        <label style={{position:'relative', width:40, height:22, cursor:'pointer'}}>
          <input type="checkbox" checked={avoidTolls} onChange={e=>setAvoidTolls(e.target.checked)} style={{opacity:0, width:0, height:0}}/>
          <div style={{
            position:'absolute', inset:0, borderRadius:22,
            background: avoidTolls ? '#E53935' : '#2D2D2D',
            transition:'0.2s'
          }}>
            <div style={{
              position:'absolute', width:16, height:16, top:3,
              left: avoidTolls ? 21 : 3,
              background:'white', borderRadius:'50%', transition:'0.2s'
            }}/>
          </div>
        </label>
      </div>

      {/* Button */}
      <button onClick={calculate} disabled={loading}
        style={{
          width:'100%', padding:'1rem', background:'white', color:'black',
          border:'none', borderRadius:10, fontFamily:'Barlow', fontSize:'1rem',
          fontWeight:700, cursor:'pointer', letterSpacing:0.5,
          opacity: loading ? 0.7 : 1
        }}>
        {loading ? 'Calculating...' : 'Calculate Toll →'}
      </button>

      {/* Result */}
      {result && (
        <div style={{marginTop:16, border:'1px solid #1A1A1A', borderRadius:12, overflow:'hidden'}}>
          <div style={{background:'white', color:'black', padding:'1.25rem', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{fontFamily:'Barlow Condensed', fontSize:'1.1rem', fontWeight:700, textTransform:'uppercase'}}>
              {result.origin.split(',')[0]} → {result.destination.split(',')[0]}
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontFamily:'Barlow Condensed', fontSize:'2rem', fontWeight:800, lineHeight:1}}>₹{result.totalTollInr.toLocaleString()}</div>
              <div style={{fontSize:'0.65rem', color:'#666', textTransform:'uppercase', letterSpacing:1}}>{result.returnTrip ? 'Return Toll' : 'One-way Toll'}</div>
            </div>
          </div>
          <div style={{background:'#111', padding:'1rem 1.25rem', display:'flex', gap:'1.5rem'}}>
            {[
              {val:`${result.distanceKm} km`, key:'Distance'},
              {val:formatDuration(result.durationMin), key:'Drive Time'},
              {val:`${result.plazaCount} plazas`, key:'Plazas'},
              {val:`₹${Math.round(result.totalTollInr/(result.plazaCount||1))}`, key:'Avg/Plaza'},
            ].map(m => (
              <div key={m.key}>
                <div style={{fontWeight:600, fontSize:'0.9rem', color:'white'}}>{m.val}</div>
                <div style={{fontSize:'0.65rem', color:'#6B6B6B', textTransform:'uppercase', letterSpacing:1}}>{m.key}</div>
              </div>
            ))}
          </div>
          <div style={{maxHeight:200, overflowY:'auto'}}>
            {(result.plazas||[]).map((p,i) => (
              <div key={i} style={{display:'flex', alignItems:'center', padding:'0.75rem 1.25rem', borderBottom:'1px solid #111', background:'#000'}}>
                <div style={{width:24, height:24, background:'#1A1A1A', borderRadius:4, fontSize:'0.7rem', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', color:'#9E9E9E', marginRight:10, flexShrink:0}}>{i+1}</div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:'0.82rem', fontWeight:500, color:'white', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{p.plazaName}</div>
                  <div style={{fontSize:'0.68rem', color:'#6B6B6B'}}>NH-{p.highwayCode} · {p.state}</div>
                </div>
                <div style={{fontFamily:'Barlow Condensed', fontSize:'1rem', fontWeight:700, color:'white', flexShrink:0}}>₹{p.tollInr}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result && <MapView result={result} />}

    </div>
  )
}
