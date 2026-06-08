const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080; 

app.use(cors()); 
app.use(express.json());

const mockData = {
    asteroids: [
        { name: "2026 RX1 (Apophis-Class)", diameterMeters: 345.2, velocityKmph: 45600, approachDate: "2026-06-03", hazardous: true },
        { name: "2026 XL", diameterMeters: 12.4, velocityKmph: 18000, approachDate: "2026-06-04", hazardous: false },
        { name: "1999 RQ36 (Bennu)", diameterMeters: 490.0, velocityKmph: 101200, approachDate: "2026-06-08", hazardous: true },
        { name: "2026 ZX9", diameterMeters: 5.1, velocityKmph: 12000, approachDate: "2026-06-09", hazardous: false }
    ],
    ligo: [
        { eventId: "GW260601_144211", eventType: "Binary Black Hole Merger", totalMass: 65.4, gpsTime: "1401234567" },
        { eventId: "GW260528_091120", eventType: "Neutron Star Collision", totalMass: 2.8, gpsTime: "1401111111" },
        { eventId: "GW260515_224000", eventType: "Black Hole-Neutron Star", totalMass: 12.1, gpsTime: "1400000000" }
    ]
};

// Route 1: Used when the page first loads
app.get('/api/space/:view/all', (req, res) => {
    const { view } = req.params;
    
    if (view === 'overview') return res.json([]);

    const data = mockData[view] || [];
    res.json(data);
});

// Route 2: THE FIX - Used when you click the "Re-Sync" button
app.get('/api/space/:view/fetch', (req, res) => {
    const { view } = req.params;
    
    // Simulating a 1.2 second network delay so you can see your frontend loading states!
    setTimeout(() => {
        console.log(`[SYNC] Frontend requested fresh sync for: ${view}`);
        
        // In a real app, you would fetch real NASA data here. 
        // For now, we just send a success signal back to the frontend.
        res.status(200).json({ 
            success: true, 
            message: `Successfully synchronized ${view} telemetry.` 
        });
    }, 1200); 
});

// Route 3: Base health check
app.get('/', (req, res) => {
    res.json({
        status: "Online",
        message: "Event Horizon Telemetry Server is active.",
        endpoints: [
            "/api/space/asteroids/all",
            "/api/space/ligo/all",
            "/api/space/asteroids/fetch",
            "/api/space/ligo/fetch"
        ]
    });
});

app.listen(PORT, () => {
    console.log(`\n🌌 Event Horizon Server Online`);
    console.log(`📡 Listening for telemetry on http://localhost:${PORT}\n`);
});