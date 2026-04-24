import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, OverlayView, InfoWindow, Circle, Autocomplete } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Shield, Zap, Volume2, Navigation, MapPin, List, X } from 'lucide-react';
import api from '../services/api';

const mockHospitals = [
  // Ahmedabad hospitals
  { id: 'h1', lat: 23.0200, lng: 72.5800, name: 'Apollo Hospital Ahmedabad' },
  { id: 'h2', lat: 23.0450, lng: 72.5200, name: 'Sterling Hospital Bopal' },
  // Junagadh hospitals
  { id: 'h3', lat: 21.5260, lng: 70.4500, name: 'Junagadh Civil Hospital' },
];

const mockGardens = [
  // Ahmedabad gardens
  { id: 'g1', lat: 23.0270, lng: 72.5650, name: 'Law Garden' },
  { id: 'g2', lat: 23.0500, lng: 72.5100, name: 'Thaltej Tekra Garden' },
  // Junagadh gardens
  { id: 'g3', lat: 21.5200, lng: 70.4620, name: 'Girnar Foothills Park' },
];

// ==================== MAP CONFIG ====================

const GOOGLE_MAPS_API_KEY = ''; // Add your key here or leave blank for dev mode

const mapContainerStyle = { width: '100%', height: '100%' };

const defaultCenter = { lat: 22.3072, lng: 71.1924 }; // Gujarat center

const mapThemes = {
  retro: {
    label: 'Retro', emoji: '🗺️',
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
      { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#c9b2a6' }] },
      { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#f8c967' }] },
      { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#e9bc62' }] },
      { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#f5f1e6' }] },
      { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#b9d3c2' }] },
      { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#dde6cc' }] },
    ],
  },
  satellite: {
    label: 'Satellite', emoji: '🛰️',
    styles: [], // empty = standard Google Maps style; mapTypeId will be set to 'hybrid'
  },
};

// ==================== CUSTOM MARKERS ====================

const HouseMarker = ({ home, onClick }) => {
  const riskColor = home.risk === 'low' ? '#22C55E' : home.risk === 'medium' ? '#F97316' : '#EF4444';
  return (
    <div
      onClick={onClick}
      style={{ cursor: 'pointer', transform: 'translate(-50%, -100%)', position: 'relative' }}
    >
      <div style={{
        background: 'linear-gradient(135deg, #F5A623, #E8941A)',
        color: '#000',
        padding: '5px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        boxShadow: '0 0 16px rgba(245,166,35,0.7)',
        border: '2px solid rgba(255,255,255,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: riskColor, boxShadow: `0 0 6px ${riskColor}` }} />
        ₹{(home.rent / 1000).toFixed(0)}k
      </div>
      <div style={{
        width: 0, height: 0,
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: '8px solid #F5A623',
        margin: '0 auto',
      }} />
    </div>
  );
};

const HospitalMarker = () => (
  <div style={{ transform: 'translate(-50%, -50%)', cursor: 'default' }}>
    <div style={{
      width: 30, height: 30,
      background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
      borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontWeight: 'bold', fontSize: '18px',
      boxShadow: '0 0 14px rgba(239,68,68,0.7)',
      border: '2px solid rgba(255,255,255,0.4)',
      lineHeight: 1,
    }}>
      +
    </div>
  </div>
);

const GardenMarker = () => (
  <div style={{ transform: 'translate(-50%, -50%)', cursor: 'default' }}>
    <div style={{
      width: 28, height: 28,
      background: 'linear-gradient(135deg, #22c55e, #15803d)',
      borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '16px',
      boxShadow: '0 0 14px rgba(34,197,94,0.7)',
      border: '2px solid rgba(255,255,255,0.4)',
    }}>
      🌳
    </div>
  </div>
);

const TempleMarker = () => (
  <div style={{ transform: 'translate(-50%, -50%)', cursor: 'default' }}>
    <div style={{
      width: 28, height: 28,
      background: 'linear-gradient(135deg, #f59e0b, #b45309)',
      borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '16px',
      boxShadow: '0 0 14px rgba(245,158,11,0.7)',
      border: '2px solid rgba(255,255,255,0.4)',
    }}>
      🛕
    </div>
  </div>
);

// ==================== MAIN PAGE ====================

const MapPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [homes, setHomes] = useState([]);
  const [selectedHome, setSelectedHome] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [nearbyGardens, setNearbyGardens] = useState([]);
  const [nearbyTemples, setNearbyTemples] = useState([]);

  // Fetch properties from MongoDB that have lat/lng
  useEffect(() => {
    api.get('/properties').then(res => {
      const raw = res.data?.data?.properties || [];
      const mapped = raw
        .filter((p) => (p.lat && p.lng) || (p.location?.lat && p.location?.lng))
        .map((p) => ({
          id: p._id,
          lat: p.lat || p.location?.lat,
          lng: p.lng || p.location?.lng,
          title: p.title || 'Property',
          address: p.address || '',
          rent: p.price || p.rent || 0,
          score: p.healthScore || 75,
          risk: p.riskLevel || 'low',
          beds: p.bedrooms || p.beds || 0,
          type: p.propertyType || p.type || 'Property',
        }));
      setHomes(mapped);

      // Collect all nearby places with lat/lng from all properties
      const hospitals = [];
      const gardens = [];
      const temples = [];
      raw.forEach((p) => {
        const nearby = p.nearbyPlaces;
        if (!nearby) return;
        (nearby.hospitals || []).forEach((h, i) => {
          if (h.lat && h.lng) hospitals.push({ id: `h-${p._id}-${i}`, lat: h.lat, lng: h.lng, name: h.name });
        });
        (nearby.gardens || []).forEach((g, i) => {
          if (g.lat && g.lng) gardens.push({ id: `g-${p._id}-${i}`, lat: g.lat, lng: g.lng, name: g.name });
        });
        (nearby.temples || []).forEach((t, i) => {
          if (t.lat && t.lng) temples.push({ id: `t-${p._id}-${i}`, lat: t.lat, lng: t.lng, name: t.name });
        });
      });
      setNearbyHospitals(hospitals);
      setNearbyGardens(gardens);
      setNearbyTemples(temples);
    }).catch(() => {});
  }, []);
  const [showFilters, setShowFilters] = useState(false);
  const [showLegend, setShowLegend] = useState(true);
  const [showList, setShowList] = useState(false);
  const [showHospitals, setShowHospitals] = useState(true);
  const [showGardens, setShowGardens] = useState(true);
  const [showTemples, setShowTemples] = useState(true);
  const [activeLayer, setActiveLayer] = useState(null);
  const [mapTheme, setMapTheme] = useState('retro');
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    id: 'google-map-script',
    libraries: ['places'],
  });

  const onAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        map?.panTo(place.geometry.location);
        map?.setZoom(15);
      }
    }
  };

  const filteredProperties = homes.filter(home => 
    home.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    home.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePropertySelect = (home) => {
    setSelectedHome(home);
    map?.panTo({ lat: home.lat, lng: home.lng });
    map?.setZoom(16);
    setIsSearchFocused(false);
    setSearchQuery('');
  };

  const resetAllLayers = useCallback(() => {
    setActiveLayer(null);
    setShowLegend(false);
    setResetKey(prev => prev + 1);
  }, []);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  // Auto-focus on a property from URL params (e.g., ?lat=12.9&lng=77.6)
  useEffect(() => {
    const lat = parseFloat(searchParams.get('lat') || '');
    const lng = parseFloat(searchParams.get('lng') || '');
    const focusId = searchParams.get('id') || '';
    if (map && lat && lng) {
      map.panTo({ lat, lng });
      map.setZoom(16);
    }
    if (focusId) {
      const home = homes.find(h => h.id === focusId);
      if (home) setSelectedHome(home);
    }
  }, [map, searchParams, homes]);

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-dark-bg text-white">
        <div className="text-center glass-card p-8">
          <p className="text-xl font-bold text-critical mb-2">Map Load Error</p>
          <p className="text-gray-400">Please add a valid Google Maps API key to `MapPage.jsx`.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-dark-bg">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-[1000] p-3 rounded-xl backdrop-blur-md shadow-2xl border border-white/10 bg-black/60 text-white hover:border-amber-primary/50 transition-all flex items-center gap-2 text-sm font-semibold"
        title="Go Back"
      >
        ← Back
      </button>

      {/* Search Bar & Property Dropdown */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1100] w-full max-w-lg px-4">
        <div className="bg-black/90 backdrop-blur-xl flex items-center p-2 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-amber-primary/40 ring-1 ring-white/10">
          <MapPin className="ml-4 text-amber-primary flex-shrink-0" size={20} />
          {isLoaded && (
            <Autocomplete
              onLoad={onAutocompleteLoad}
              onPlaceChanged={onPlaceChanged}
              className="flex-grow"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search for a city, area or street..."
                className="w-full bg-transparent border-none outline-none px-4 py-3 text-sm text-white placeholder-gray-500 font-medium"
              />
            </Autocomplete>
          )}
          <button className="bg-amber-primary hover:bg-amber-500 text-black rounded-full p-3 mr-1 flex-shrink-0 transition-colors shadow-lg">
            <Navigation size={18} fill="currentColor" />
          </button>
        </div>

        {/* Property Search Results Dropdown */}
        <AnimatePresence>
          {isSearchFocused && (searchQuery.length > 0 || filteredProperties.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 bg-black/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-h-80 overflow-y-auto"
            >
              <div className="p-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Verified Properties</span>
                <span className="text-[10px] text-amber-primary font-mono">{filteredProperties.length} found</span>
              </div>
              {filteredProperties.length > 0 ? (
                filteredProperties.map(home => (
                  <button
                    key={home.id}
                    onClick={() => handlePropertySelect(home)}
                    className="w-full p-4 flex items-start gap-3 hover:bg-white/5 transition-colors border-b border-white/5 text-left"
                  >
                    <div className="bg-amber-primary/10 p-2 rounded-lg text-amber-primary">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{home.title}</p>
                      <p className="text-xs text-gray-500">{home.address}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-mono text-amber-primary">₹{(home.rent/1000).toFixed(0)}k/mo</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${home.risk === 'low' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                          {home.risk} risk
                        </span>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500 text-sm">
                  No matching properties found
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Controls */}
      <div className="absolute right-6 top-6 z-[1000] flex flex-col gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-3 rounded-xl backdrop-blur-md shadow-2xl border transition-all ${showFilters ? 'bg-amber-primary text-black border-amber-primary' : 'bg-black/60 text-white border-white/10 hover:border-amber-primary/50'}`}
          title="Map Layers"
        >
          <Layers size={20} />
        </button>
        <button
          onClick={() => setShowList(!showList)}
          className={`p-3 rounded-xl backdrop-blur-md shadow-2xl border transition-all ${showList ? 'bg-amber-primary text-black border-amber-primary' : 'bg-black/60 text-white border-white/10 hover:border-amber-primary/50'}`}
          title="Property List"
        >
          <List size={20} />
        </button>
        {/* Theme Picker Button */}
        <div className="relative">
          <button
            onClick={() => setShowThemePicker(!showThemePicker)}
            className={`p-3 rounded-xl backdrop-blur-md shadow-2xl border transition-all ${showThemePicker ? 'bg-amber-primary text-black border-amber-primary' : 'bg-black/60 text-white border-white/10 hover:border-amber-primary/50'}`}
            title="Map Theme"
          >
            <span className="text-lg leading-none">{mapThemes[mapTheme].emoji}</span>
          </button>
          <AnimatePresence>
            {showThemePicker && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                className="absolute right-14 top-0 bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-2xl"
              >
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 whitespace-nowrap">Map Theme</h4>
                <div className="space-y-1">
                  {Object.entries(mapThemes).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => { setMapTheme(key); setShowThemePicker(false); if(map && key === 'satellite') { map.setMapTypeId('hybrid'); } else if(map) { map.setMapTypeId('roadmap'); } }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                        mapTheme === key ? 'bg-amber-primary/20 text-amber-primary border border-amber-primary/50' : 'hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      <span>{theme.emoji}</span> {theme.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="absolute right-14 top-0 bg-black/80 backdrop-blur-md p-4 rounded-2xl w-52 space-y-3 border border-white/10 shadow-2xl"
            >
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Map Layers</h4>
              {[
                { id: 'safety', label: 'Safety Zones', icon: <Shield size={14} /> },
                { id: 'water', label: 'Water Reliability', icon: <Zap size={14} /> },
                { id: 'noise', label: 'Noise Levels', icon: <Volume2 size={14} /> },
              ].map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => {
                    if (activeLayer === layer.id) {
                      resetAllLayers();
                    } else {
                      setActiveLayer(layer.id);
                    }
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${activeLayer === layer.id ? 'bg-amber-primary/20 text-amber-primary border border-amber-primary/50' : 'hover:bg-white/5 text-gray-300'}`}
                >
                  {layer.icon} {layer.label}
                </button>
              ))}
              
              {activeLayer && (
                <button
                  onClick={resetAllLayers}
                  className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/30 transition-all"
                >
                  <X size={12} /> Turn Off Map Zones
                </button>
              )}

              <div className="border-t border-white/10 pt-3 space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nearby</h4>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={showHospitals} onChange={e => setShowHospitals(e.target.checked)} className="accent-red-500" />
                  <span className="text-red-400 font-bold">+</span> Hospitals
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={showGardens} onChange={e => setShowGardens(e.target.checked)} className="accent-green-500" />
                  <span>🌳</span> Gardens
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={showTemples} onChange={e => setShowTemples(e.target.checked)} className="accent-amber-500" />
                  <span>🛕</span> Temples
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Property List Panel */}
      <AnimatePresence>
        {showList && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="absolute left-4 top-24 z-[1000] bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl w-72 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-bold text-white">{homes.length} Properties on Map</h3>
              <button onClick={() => setShowList(false)} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
              {homes.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-sm">
                  No properties with map location found.<br/>
                  <span className="text-xs text-gray-600">Add lat & lng to your MongoDB properties to show them here.</span>
                </div>
              ) : homes.map(home => (
                <div
                  key={home.id}
                  onClick={() => {
                    setSelectedHome(home);
                    map?.panTo({ lat: home.lat, lng: home.lng });
                    map?.setZoom(16);
                  }}
                  className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${selectedHome?.id === home.id ? 'bg-amber-primary/10 border-l-2 border-l-amber-primary' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-sm text-white leading-tight">{home.title}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${home.risk === 'low' ? 'bg-green-500/20 text-green-400' : home.risk === 'medium' ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'}`}>
                      {home.risk}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{home.address}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-amber-primary text-sm">₹{home.rent.toLocaleString()}/mo</span>
                    <span className="text-xs text-gray-500">Score: {home.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map */}
      {isLoaded ? (
        <GoogleMap
          key={resetKey}
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={7}
          onLoad={onLoad}
          options={{
            styles: mapThemes[mapTheme].styles,
            mapTypeId: mapTheme === 'satellite' ? 'hybrid' : 'roadmap',
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: { position: window.google?.maps?.ControlPosition?.RIGHT_BOTTOM },
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            scrollwheel: true,
            gestureHandling: 'greedy',
          }}
          onClick={() => setSelectedHome(null)}
        >
          {/* House Markers */}
          {homes.map(home => (
            <OverlayView
              key={home.id}
              position={{ lat: home.lat, lng: home.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <HouseMarker home={home} onClick={() => setSelectedHome(selectedHome?.id === home.id ? null : home)} />
            </OverlayView>
          ))}

          {/* Layer Visualizations */}
          {activeLayer === 'safety' && homes.map(home => (
            <Circle
              key={`safety-${home.id}`}
              center={{ lat: home.lat, lng: home.lng }}
              radius={2000}
              options={{
                fillColor: home.risk === 'low' ? '#22c55e' : home.risk === 'medium' ? '#f97316' : '#ef4444',
                fillOpacity: 0.15,
                strokeColor: home.risk === 'low' ? '#22c55e' : home.risk === 'medium' ? '#f97316' : '#ef4444',
                strokeOpacity: 0.8,
                strokeWeight: 1,
              }}
            />
          ))}

          {activeLayer === 'water' && homes.map(home => (
            <Circle
              key={`water-${home.id}`}
              center={{ lat: home.lat, lng: home.lng }}
              radius={1500}
              options={{
                fillColor: '#3b82f6',
                fillOpacity: 0.2,
                strokeColor: '#2563eb',
                strokeOpacity: 0.8,
                strokeWeight: 1,
              }}
            />
          ))}

          {activeLayer === 'noise' && homes.map(home => (
            <Circle
              key={`noise-${home.id}`}
              center={{ lat: home.lat, lng: home.lng }}
              radius={1000}
              options={{
                fillColor: home.score > 80 ? '#fbbf24' : '#ef4444',
                fillOpacity: 0.2,
                strokeColor: home.score > 80 ? '#d97706' : '#dc2626',
                strokeOpacity: 0.8,
                strokeWeight: 1,
              }}
            />
          ))}

          {/* Hospital Markers (from nearbyPlaces in DB) */}
          {showHospitals && nearbyHospitals.map(h => (
            <OverlayView
              key={h.id}
              position={{ lat: h.lat, lng: h.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div title={h.name}>
                <HospitalMarker />
              </div>
            </OverlayView>
          ))}

          {/* Garden Markers (from nearbyPlaces in DB) */}
          {showGardens && nearbyGardens.map(g => (
            <OverlayView
              key={g.id}
              position={{ lat: g.lat, lng: g.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div title={g.name}>
                <GardenMarker />
              </div>
            </OverlayView>
          ))}

          {/* Temple Markers (from nearbyPlaces in DB) */}
          {showTemples && nearbyTemples.map(t => (
            <OverlayView
              key={t.id}
              position={{ lat: t.lat, lng: t.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div title={t.name}>
                <TempleMarker />
              </div>
            </OverlayView>
          ))}

          {/* Info Window for selected home */}
          {selectedHome && (
            <InfoWindow
              position={{ lat: selectedHome.lat, lng: selectedHome.lng }}
              onCloseClick={() => setSelectedHome(null)}
              options={{ pixelOffset: new window.google.maps.Size(0, -20) }}
            >
              <div style={{ background: '#0a0a1a', border: '1px solid rgba(245,166,35,0.3)', borderRadius: '12px', padding: '16px', minWidth: '220px', color: 'white', fontFamily: 'sans-serif' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F5A623', fontWeight: 'bold' }}>{selectedHome.type}</span>
                  <span style={{
                    fontSize: '10px', padding: '2px 8px', borderRadius: '99px', fontWeight: 'bold',
                    background: selectedHome.risk === 'low' ? 'rgba(34,197,94,0.15)' : selectedHome.risk === 'medium' ? 'rgba(249,115,22,0.15)' : 'rgba(239,68,68,0.15)',
                    color: selectedHome.risk === 'low' ? '#22c55e' : selectedHome.risk === 'medium' ? '#f97316' : '#ef4444',
                  }}>
                    {selectedHome.risk} risk
                  </span>
                </div>
                <h4 style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '4px', color: 'white' }}>{selectedHome.title}</h4>
                <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '10px' }}>{selectedHome.address}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div>
                    <p style={{ fontSize: '10px', color: '#6b7280' }}>Monthly Rent</p>
                    <p style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#F5A623', fontSize: '18px' }}>₹{selectedHome.rent.toLocaleString()}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '10px', color: '#6b7280' }}>Health Score</p>
                    <p style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'white', fontSize: '18px' }}>{selectedHome.score}/100</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/home/${selectedHome.id}`)}
                  style={{ width: '100%', padding: '8px', background: 'linear-gradient(135deg, #F5A623, #E8941A)', color: '#000', fontWeight: 'bold', fontSize: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                >
                  View Full Report →
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-dark-bg">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-amber-primary/20 border-t-amber-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading Google Maps...</p>
          </div>
        </div>
      )}

      {/* Floating Reset Button - Always visible when any map zone is active */}
      <AnimatePresence>
        {activeLayer && (
          <motion.div
            initial={{ y: 100, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            exit={{ y: 100, x: '-50%', opacity: 0 }}
            className="absolute bottom-10 left-1/2 z-[1001]"
          >
            <button
              onClick={resetAllLayers}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-black shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all flex items-center gap-3 border-2 border-white/30 uppercase tracking-widest text-sm"
            >
              <X size={20} strokeWidth={3} /> Turn Off Map Zones
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <AnimatePresence>
        {showLegend && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 left-6 z-[1000] bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Legend</h4>
              <button onClick={() => setShowLegend(false)} className="p-0.5 rounded hover:bg-white/10 transition-colors">
                <X size={12} className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]" />
                <span className="text-gray-300">Low Risk Property</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316]" />
                <span className="text-gray-300">Medium Risk Property</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
                <span className="text-gray-300">High Risk Property</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold shadow-[0_0_6px_#ef4444]">+</div>
                <span className="text-gray-300">Hospital</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🌳</span>
                <span className="text-gray-300">Garden / Park</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🛕</span>
                <span className="text-gray-300">Temple</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MapPage;
