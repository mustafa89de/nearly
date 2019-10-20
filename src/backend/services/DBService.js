const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

class DBService {
    async init() {
        try {
            await mongoose.connect(DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Successfully established database connection');
        } catch (err) {
            console.error('Failed to established database connection: ' + err.message);
            process.exit(1);
        }
    }
}

module.exports = new DBService();