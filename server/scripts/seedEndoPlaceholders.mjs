import 'dotenv/config';
import mongoose from 'mongoose';
import Content from '../models/Content.js';
import fs from 'fs';
import path from 'path';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/medknowledge';
await mongoose.connect(uri);

// JSON dosyasını oku
const filePath = path.resolve('./server/scripts/data/endo.placeholders.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Her item için slug’a göre upsert
for (const item of data.items) {
  await Content.findOneAndUpdate(
    { slug: item.slug },
    { $set: item },
    { upsert: true, new: true }
  );
}

console.log('Endokrin placeholder seed tamamlandı');
process.exit(0);
