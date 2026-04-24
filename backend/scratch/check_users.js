require('dotenv').config();
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    fullName: String
});

const User = mongoose.model('User', UserSchema);

async function checkUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        const users = await User.find({});
        console.log('Total Users:', users.length);
        users.forEach(u => console.log(`- ${u.fullName} (${u.email})`));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkUsers();
