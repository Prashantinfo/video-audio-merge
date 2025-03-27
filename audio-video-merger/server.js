const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Serve static files from an "output" directory
app.use('/output', express.static(path.join(__dirname, 'output')));

// Endpoint to save the video (must come before proxy middleware)
app.post('/save-video', express.raw({ type: 'video/mp4', limit: '100mb' }), (req, res) => {
  const filePath = path.join(__dirname, 'output', 'merged-video.mp4');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFile(filePath, req.body, (err) => {
    if (err) {
      console.error('Error saving video:', err);
      res.status(500).send('Error saving video');
    } else {
      const videoUrl = 'http://localhost:3000/output/merged-video.mp4';
      console.log('Video saved successfully:', videoUrl);
      res.send({ url: videoUrl });
    }
  });
});

// Proxy to Angular dev server (must come after specific routes)
app.use(
  '/',
  createProxyMiddleware({
    target: 'http://localhost:4200',
    changeOrigin: true,
    ws: true,
  })
);

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});