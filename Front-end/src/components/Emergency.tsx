import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 🔧 Fix Leaflet marker icons
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface HospitalProperties {
  name: string;
  street: string;
  housenumber: string;
  city: string;
  postcode: string;
  website: string;
  phone: string;
  distance: number;
}

interface Hospital {
  properties: HospitalProperties;
  geometry: {
    coordinates: [number, number];
  };
}

interface LocationOption {
  name: string;
  lat: number;
  lon: number;
}

const locationOptions: LocationOption[] = [
  { name: "Delhi", lat: 28.6139, lon: 77.209 },
  { name: "Mumbai", lat: 19.076, lon: 72.8777 },
  { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { name: "Hyderabad", lat: 17.3854, lon: 78.4867 },
  { name: "Pune", lat: 18.5204, lon: 73.8567 },
  { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
  { name: "Jaipur", lat: 26.9124, lon: 75.7873 },
  { name: "Lucknow", lat: 26.8467, lon: 80.9462 },
  { name: "Bhopal", lat: 23.2599, lon: 77.4126 },
  { name: "Chandigarh", lat: 30.7333, lon: 76.7794 },
  { name: "Patna", lat: 25.5941, lon: 85.1376 },
  { name: "Indore", lat: 22.7196, lon: 75.8577 },
  { name: "Nagpur", lat: 21.1458, lon: 79.0882 },
  { name: "Kanpur", lat: 26.4499, lon: 80.3319 },
  { name: "Coimbatore", lat: 11.0168, lon: 76.9558 },
  { name: "Visakhapatnam", lat: 17.6868, lon: 83.2185 },
  { name: "Thiruvananthapuram", lat: 8.5241, lon: 76.9366 },
  { name: "Vijayawada", lat: 16.5062, lon: 80.648 },
];

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const EmergencyServices: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [usedIPFallback, setUsedIPFallback] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);
  const [nearbyHospitals, setNearbyHospitals] = useState<Hospital[]>([]);
  const [selectedHospitals, setSelectedHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHospitals = async (lat: number, lon: number, type: "nearby" | "selected") => {
    try {
      setLoading(true);
      const url = `${BACKEND_URL}/api/geoapify/hospitals?lat=${lat}&lon=${lon}`;
      console.log('Fetching hospitals from:', url);
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server response:', errorText);
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }
      
      const data = await res.json();
      console.log('Received data:', data);
      
      if (!data || !data.features) {
        throw new Error('Invalid response format from server');
      }

      // Transform the data to match our interface
      const transformedHospitals = data.features.map((hospital: any) => ({
        properties: {
          name: hospital.properties.name || 'Unnamed Hospital',
          street: hospital.properties.street || '',
          housenumber: hospital.properties.housenumber || '',
          city: hospital.properties.city || '',
          postcode: hospital.properties.postcode || '',
          website: hospital.properties.website || '',
          phone: hospital.properties.phone || '',
          distance: hospital.properties.distance || 0
        },
        geometry: hospital.geometry
      }));

      if (type === "nearby") {
        setNearbyHospitals(transformedHospitals);
      } else {
        setSelectedHospitals(transformedHospitals);
      }
    } catch (err) {
      console.error('Error details:', err);
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError('Unable to connect to the server. Please check if the backend server is running.');
      } else {
        setError(err instanceof Error ? err.message : "Failed to fetch hospitals. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/geoapify/reverse-geocode?lat=${lat}&lon=${lon}`);
      const data = await res.json();
      if (data && data.address) {
        const { suburb, city, town, village, state } = data.address;
        const name = suburb || city || town || village || state || "Unknown location";
        setLocationName(name);
      }
    } catch {
      setLocationName("Unknown location");
    }
  };

  const fetchLocationByIP = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/geoapify/ip-location`);
      const data = await response.json();
      if (data && data.location) {
        const loc = { lat: data.location.latitude, lon: data.location.longitude };
        setUsedIPFallback(true);
        setLocation(loc);
        fetchHospitals(loc.lat, loc.lon, "nearby");
        reverseGeocode(loc.lat, loc.lon);
      } else {
        setError("Failed to retrieve location via IP.");
        setLoading(false);
      }
    } catch {
      setError("Error fetching location via IP.");
      setLoading(false);
    }
  };

  useEffect(() => {
    let watchId: number;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const loc = { lat: latitude, lon: longitude };
          setLocation(loc);
          fetchHospitals(loc.lat, loc.lon, "nearby");
          reverseGeocode(loc.lat, loc.lon);
        },
        (error) => {
          console.warn("Geolocation failed:", error.message);
          fetchLocationByIP();
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    } else {
      fetchLocationByIP();
    }
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const loc = locationOptions.find((loc) => loc.name === e.target.value);
    if (loc) {
      setSelectedLocation(loc);
      setLoading(true);
      fetchHospitals(loc.lat, loc.lon, "selected");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
            <ArrowLeft size={20} />
            <span className="ml-1">Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold text-blue-700">Emergency Services</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col items-center space-y-6">

          {/* Emergency Contact */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Emergency Ambulance Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="mb-4 text-lg font-semibold">In case of emergency, contact an ambulance immediately.</p>
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-full text-xl hover:bg-red-700 transition duration-300"
                  onClick={() => alert("Dialing Emergency Ambulance...")}
                >
                  Call Ambulance
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Nearby Hospitals */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Nearby Hospitals (Live Location)</CardTitle>
            </CardHeader>
            <CardContent>
              {locationName && (
                <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-blue-700 rounded">
                  📍 <strong>Your current location:</strong> {locationName}
                  {usedIPFallback && <p className="text-sm text-yellow-600 mt-1">* Location estimated via IP</p>}
                </div>
              )}
              {loading && <p>Loading hospitals...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {!loading && !error && nearbyHospitals.length > 0 && location && (
                <>
                  <MapContainer center={[location.lat, location.lon]} zoom={13} style={{ height: "400px", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[location.lat, location.lon]}>
                      <Popup>Your Location</Popup>
                    </Marker>
                    {nearbyHospitals.map((hospital, index) => {
                      const [lon, lat] = hospital.geometry.coordinates;
                      const dist = getDistanceFromLatLonInKm(location.lat, location.lon, lat, lon).toFixed(2);
                      return (
                        <React.Fragment key={index}>
                          <Marker position={[lat, lon]}>
                            <Popup>
                              <div className="p-2">
                                <p className="font-semibold text-lg">{hospital.properties.name}</p>
                                <p className="text-sm">
                                  {hospital.properties.housenumber} {hospital.properties.street}
                                </p>
                                <p className="text-sm">
                                  {hospital.properties.city}, {hospital.properties.postcode}
                                </p>
                                <p className="text-sm">🚗 Distance: {dist} km</p>
                                {hospital.properties.phone && (
                                  <p className="text-sm">📞 {hospital.properties.phone}</p>
                                )}
                                {hospital.properties.website && (
                                  <a 
                                    href={hospital.properties.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-500 hover:text-blue-700 text-sm block mt-1"
                                  >
                                    Visit Website
                                  </a>
                                )}
                              </div>
                            </Popup>
                          </Marker>
                          <Polyline 
                            positions={[[location.lat, location.lon], [lat, lon]]} 
                            pathOptions={{ color: 'blue' }}
                          />
                        </React.Fragment>
                      );
                    })}
                  </MapContainer>

                  {/* Hospital List View */}
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Nearby Hospitals</h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {nearbyHospitals.map((hospital, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                          <h4 className="font-bold text-lg mb-2">{hospital.properties.name}</h4>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p>
                              {hospital.properties.housenumber} {hospital.properties.street}
                            </p>
                            <p>
                              {hospital.properties.city}, {hospital.properties.postcode}
                            </p>
                            <p className="text-blue-600 font-medium">
                              🚗 {hospital.properties.distance.toFixed(2)} km away
                            </p>
                            {hospital.properties.phone && (
                              <p className="flex items-center gap-2">
                                <span>📞</span>
                                <a href={`tel:${hospital.properties.phone}`} className="text-blue-600 hover:text-blue-800">
                                  {hospital.properties.phone}
                                </a>
                              </p>
                            )}
                            {hospital.properties.website && (
                              <a 
                                href={hospital.properties.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-2 text-blue-600 hover:text-blue-800"
                              >
                                Visit Website →
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Search by City */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Search by Location</CardTitle>
            </CardHeader>
            <CardContent>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleLocationChange}
                value={selectedLocation?.name || ""}
              >
                <option value="">Select a Location</option>
                {locationOptions.map((loc) => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
              {selectedLocation && !loading && selectedHospitals.length > 0 && (
                <div className="mt-4">
                  <MapContainer center={[selectedLocation.lat, selectedLocation.lon]} zoom={13} style={{ height: "400px", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[selectedLocation.lat, selectedLocation.lon]}>
                      <Popup>Selected Location</Popup>
                    </Marker>
                    {selectedHospitals.map((hospital, index) => {
                      const [lon, lat] = hospital.geometry.coordinates;
                      const dist = getDistanceFromLatLonInKm(selectedLocation.lat, selectedLocation.lon, lat, lon).toFixed(2);
                      return (
                        <React.Fragment key={index}>
                          <Marker position={[lat, lon]}>
                            <Popup>
                              <div className="p-2">
                                <p className="font-semibold text-lg">{hospital.properties.name}</p>
                                <p className="text-sm">
                                  {hospital.properties.housenumber} {hospital.properties.street}
                                </p>
                                <p className="text-sm">
                                  {hospital.properties.city}, {hospital.properties.postcode}
                                </p>
                                <p className="text-sm">🚗 Distance: {dist} km</p>
                                {hospital.properties.phone && (
                                  <p className="text-sm">📞 {hospital.properties.phone}</p>
                                )}
                                {hospital.properties.website && (
                                  <a 
                                    href={hospital.properties.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-500 hover:text-blue-700 text-sm block mt-1"
                                  >
                                    Visit Website
                                  </a>
                                )}
                              </div>
                            </Popup>
                          </Marker>
                          <Polyline 
                            positions={[[selectedLocation.lat, selectedLocation.lon], [lat, lon]]} 
                            pathOptions={{ color: 'blue' }}
                          />
                        </React.Fragment>
                      );
                    })}
                  </MapContainer>

                  {/* Hospital List View for Selected Location */}
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Hospitals in {selectedLocation.name}</h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {selectedHospitals.map((hospital, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                          <h4 className="font-bold text-lg mb-2">{hospital.properties.name}</h4>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p>
                              {hospital.properties.housenumber} {hospital.properties.street}
                            </p>
                            <p>
                              {hospital.properties.city}, {hospital.properties.postcode}
                            </p>
                            <p className="text-blue-600 font-medium">
                              🚗 {hospital.properties.distance.toFixed(2)} km away
                            </p>
                            {hospital.properties.phone && (
                              <p className="flex items-center gap-2">
                                <span>📞</span>
                                <a href={`tel:${hospital.properties.phone}`} className="text-blue-600 hover:text-blue-800">
                                  {hospital.properties.phone}
                                </a>
                              </p>
                            )}
                            {hospital.properties.website && (
                              <a 
                                href={hospital.properties.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-2 text-blue-600 hover:text-blue-800"
                              >
                                Visit Website →
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EmergencyServices;
