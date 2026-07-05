// supervisor stub: simple express app to accept items into review queue
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let reviewQueue = [];

app.post('/supervisor/enqueue', (req, res) => {
  const item = req.body;
  item.id = Date.now();
  item.status = 'pending';
  reviewQueue.push(item);
  res.json({ ok: true, id: item.id });
});

app.get('/supervisor/queue', (req, res) => {
  res.json(reviewQueue.filter(i => i.status === 'pending'));
});

app.post('/supervisor/approve/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const it = reviewQueue.find(x => x.id === id);
  if (!it) return res.status(404).json({ error: 'not found' });
  it.status = 'approved';
  res.json({ ok: true });
});

app.post('/supervisor/reject/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const it = reviewQueue.find(x => x.id === id);
  if (!it) return res.status(404).json({ error: 'not found' });
  it.status = 'rejected';
  res.json({ ok: true });
});

const PORT = process.env.SUPERVISOR_PORT || 9000;
app.listen(PORT, () => console.log('Supervisor stub listening on', PORT));
