require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    console.log("📊 Collection-wise Storage Breakdown:\n");
    console.log("Collection\t\tData Size (MB)\tStorage Size (MB)\tIndex Size (MB)");

    for (const coll of collections) {
      const stats = await db.command({ collStats: coll.name });
      console.log(
        `${coll.name.padEnd(16)}\t${(stats.size / 1024 / 1024).toFixed(2)}\t\t${(stats.storageSize / 1024 / 1024).toFixed(2)}\t\t${(stats.totalIndexSize / 1024 / 1024).toFixed(2)}`
      );
    }

    await mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();
