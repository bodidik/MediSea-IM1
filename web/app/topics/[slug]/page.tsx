/** GET /api/topics/:slug */
async function detail(req, res) {
  try {
    const slug = String(req.params.slug || "");
    const doc = await Topic.findOne({ slug }).lean();
    if (!doc) return res.status(404).json({ ok: false, error: "not_found" });

    // 🔁 Fallback: sections yoksa content'i tek blok section'a çevir
    const hasSections = Array.isArray(doc.sections);
    const itemOut = {
      ...doc,
      sections: hasSections
        ? doc.sections
        : [
            {
              title: "Özet",
              visibility: "V",
              html:
                (doc.content && doc.content.trim()) ||
                "<p>Sayfa içeriği yakında burada.</p>",
            },
          ],
    };

    res.json({ ok: true, item: itemOut });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

