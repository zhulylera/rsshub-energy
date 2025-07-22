export default async function handler(req, res) {
  const { channel } = req.query;

  if (!channel || !channel.startsWith("@")) {
    res.status(400).json({ error: "Missing or invalid 'channel' parameter. Use format: @channelname" });
    return;
  }

  const url = `https://rsshub.app/telegram/channel/${channel}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`RSSHub error: ${response.status}`);
    const xml = await response.text();

    res.setHeader("Content-Type", "application/rss+xml");
    res.status(200).send(xml);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
