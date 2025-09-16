// ESM
// Basit, çalışan stub; sonradan gerçek DB ile değiştirebiliriz.

export async function list(_req, res) {
  res.json({ ok: true, items: [] });
}

export async function detail(req, res) {
  const { id } = req.params || {};
  res.json({ ok: true, item: { id, title: "dummy question", section: "genel" } });
}

export async function create(req, res) {
  res.status(201).json({ ok: true, created: req.body || {} });
}

export async function update(req, res) {
  res.json({ ok: true, id: req.params?.id, updated: req.body || {} });
}

export async function remove(req, res) {
  res.json({ ok: true, id: req.params?.id, removed: true });
}
