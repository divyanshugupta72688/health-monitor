const express = require('express');
const os = require('os');
const app = express();

app.get('/', (req, res) => res.send('Health Monitor running'));

app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    uptime: process.uptime(),
    memoryFreeMB: Math.round(os.freemem() / 1024 / 1024),
    cpuLoad: os.loadavg()[0],
    time: new Date()
  });
});

app.listen(3000, () => console.log('Running on 3000'));