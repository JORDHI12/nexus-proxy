export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(200).json({ message: "✅ Nexus Proxy Ready" });
  }

  try {
    const body = req.body;

    const response = await fetch("https://api.nexusggr.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ status: 0, msg: "Proxy Error: " + err.message });
  }
}
