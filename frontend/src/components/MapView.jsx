import { useEffect, useRef } from 'react'

const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY

let mapsPromise = null
function loadGoogleMaps() {
  if (!mapsPromise) {
    mapsPromise = new Promise((resolve) => {
      if (window.google?.maps) return resolve(window.google.maps)
      window.__googleMapsCallback = () => resolve(window.google.maps)
      const s = document.createElement('script')
      s.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&callback=__googleMapsCallback`
      s.async = true
      document.head.appendChild(s)
    })
  }
  return mapsPromise
}

function decodePolyline(encoded) {
  const points = []
  let index = 0, lat = 0, lng = 0
  while (index < encoded.length) {
    let b, shift = 0, result = 0
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5 } while (b >= 0x20)
    lat += (result & 1) ? ~(result >> 1) : (result >> 1)
    shift = 0; result = 0
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5 } while (b >= 0x20)
    lng += (result & 1) ? ~(result >> 1) : (result >> 1)
    points.push({ lat: lat / 1e5, lng: lng / 1e5 })
  }
  return points
}

const MAP_STYLES = [
  { elementType: 'geometry', stylers: [{ color: '#1a1a1a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#9E9E9E' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#000000' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#2D2D2D' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#444' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0F1B2D' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
]

export default function MapView({ result }) {
  const mapRef = useRef(null)
  const mapObj = useRef(null)
  const overlays = useRef([])

  useEffect(() => {
    if (!result?.polyline) return

    loadGoogleMaps().then((maps) => {
      // Init map once
      if (!mapObj.current) {
        mapObj.current = new maps.Map(mapRef.current, {
          zoom: 5,
          center: { lat: 22, lng: 78 },
          disableDefaultUI: true,
          zoomControl: true,
          styles: MAP_STYLES,
        })
      }

      // Clear previous overlays
      overlays.current.forEach(o => o.setMap(null))
      overlays.current = []

      const path = decodePolyline(result.polyline)
      const bounds = new maps.LatLngBounds()
      path.forEach(p => bounds.extend(p))

      // Draw route
      const poly = new maps.Polyline({
        path,
        strokeColor: '#FFFFFF',
        strokeOpacity: 0.85,
        strokeWeight: 4,
        map: mapObj.current,
      })
      overlays.current.push(poly)

      // Plaza markers
      ;(result.plazas || []).forEach((p, i) => {
        const pos = { lat: p.latitude, lng: p.longitude }
        const marker = new maps.Marker({
          position: pos,
          map: mapObj.current,
          label: { text: String(i + 1), color: '#000', fontSize: '10px', fontWeight: '700' },
          icon: {
            path: maps.SymbolPath.CIRCLE,
            scale: 13,
            fillColor: '#FFF',
            fillOpacity: 1,
            strokeColor: '#000',
            strokeWeight: 2,
          },
        })

        const infoContent = `
          <div style="font-family:sans-serif;background:#111;color:#fff;padding:12px 14px;border-radius:8px;min-width:190px;border:1px solid #333">
            <div style="font-size:13px;font-weight:600;margin-bottom:3px">${p.plazaName}</div>
            <div style="font-size:11px;color:#9E9E9E;margin-bottom:10px">NH-${p.highwayCode} · ${p.district}, ${p.state}</div>
            <div style="display:flex;justify-content:space-between">
              <div>
                <div style="font-size:9px;color:#666;text-transform:uppercase;letter-spacing:1px">Toll</div>
                <div style="font-size:22px;font-weight:800">₹${p.tollInr}</div>
              </div>
              <div style="text-align:right">
                <div style="font-size:9px;color:#666;text-transform:uppercase;letter-spacing:1px">Stop #</div>
                <div style="font-size:22px;font-weight:800;color:#9E9E9E">${i + 1}</div>
              </div>
            </div>
            <div style="margin-top:8px;padding-top:8px;border-top:1px solid #222;font-size:10px;color:#666">${p.distFromRouteKm} km from route centerline</div>
          </div>`

        const info = new maps.InfoWindow({ content: infoContent })
        marker.addListener('click', () => {
          info.open(mapObj.current, marker)
        })
        bounds.extend(pos)
        overlays.current.push(marker)
      })

      mapObj.current.fitBounds(bounds, { padding: 50 })
    })
  }, [result])

  return (
    <div style={{ width: '100%', height: 380, borderRadius: 12, overflow: 'hidden', border: '1px solid #2D2D2D', marginTop: 16 }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
