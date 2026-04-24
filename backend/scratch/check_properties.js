require('dotenv').config();
const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    title: String,
    address: String,
    rent: Number
});

const Property = mongoose.model('Property', PropertySchema);

async function checkProperties() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const properties = await Property.find({});
        console.log('Total Properties:', properties.length);
        properties.forEach(p => console.log(`- ${p.title} (${p.address})`));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkProperties();
