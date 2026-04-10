export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const nexusResponse = await fetch('https://api.nexusggr.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await nexusResponse.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Proxy Error:", error);
    return res.status(500).json({ 
      status: 0, 
      msg: "SERVER_OFFLINE",
      detail: error.message 
    });
  }
}
