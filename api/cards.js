export default async function handler(req, res) {
  const API_KEY = 'Pokeprice_free_88f3a794ecdc4c626b6f1f279a718fa30c59f25830948f57';
  const API_BASE = 'https://www.pokemonpricetracker.com/api/v2';

  try {
    const { set = 'blk', limit = 100 } = req.query;
    
    const url = `${API_BASE}/cards?set=${set}&limit=${limit}`;
    
    console.log('Proxying request to:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');
    
    res.status(200).json(data);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch cards',
      message: error.message 
    });
  }
}
