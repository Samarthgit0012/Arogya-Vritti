import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;

console.log(GEOAPIFY_API_KEY)

// Get hospitals near a location
const getHospitals = async (req, res) => {
    try {
        const { lat, lon } = req.query;
        
        if (!lat || !lon) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        const response = await axios.get(
            `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=20&apiKey=${GEOAPIFY_API_KEY}&format=json&lang=en&name=hospital&details=contact_info,website,phone`
        );

        // Transform the response to include distance
        const hospitals = response.data.features.map(hospital => {
            const hospitalLon = hospital.geometry.coordinates[0];
            const hospitalLat = hospital.geometry.coordinates[1];
            const distance = getDistanceFromLatLonInKm(lat, lon, hospitalLat, hospitalLon);
            
            return {
                ...hospital,
                properties: {
                    ...hospital.properties,
                    distance: distance
                }
            };
        });

        // Sort by distance
        hospitals.sort((a, b) => a.properties.distance - b.properties.distance);

        res.json({
            ...response.data,
            features: hospitals
        });
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        res.status(500).json({ error: 'Failed to fetch hospitals' });
    }
};

// Helper function to calculate distance between two points
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

// Get location from IP
const getIPLocation = async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.geoapify.com/v1/ipinfo?apiKey=${GEOAPIFY_API_KEY}`
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching IP location:', error);
        res.status(500).json({ error: 'Failed to fetch location' });
    }
};

// Reverse geocoding
const reverseGeocode = async (req, res) => {
    try {
        const { lat, lon } = req.query;
        
        if (!lat || !lon) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        const response = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`
        );

        res.json(response.data);
    } catch (error) {
        console.error('Error in reverse geocoding:', error);
        res.status(500).json({ error: 'Failed to reverse geocode' });
    }
};

export { getHospitals, getIPLocation, reverseGeocode };
