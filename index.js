const express = require('express');
const app = express();

app.get('/telegram/channel/:channel', (req, res) => {
  const channel = req.params.channel;
  res.set('Content-Type', 'application/rss+xml');
  res.send(\`<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Telegram channel: \${channel}</title>
      <link>https://t.me/\${channel}</link>
      <description>RSS feed for Telegram channel \${channel}</description>
      <item>
        <title>Mock post from \${channel}</title>
        <link>https://t.me/\${channel}/1</link>
        <pubDate>\${new Date().toUTCString()}</pubDate>
        <description>This is a sample post from Telegram channel \${channel}</description>
      </item>
    </channel>
  </rss>\`);
});

app.get('/', (req, res) => {
  res.send('RSSHub Telegram Minimal Instance');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(\`RSSHub running on port \${port}\`);
});