require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: String,
    password: { type: String, select: false }
});

const User = mongoose.model('User', UserSchema);

async function reset() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const hashedPassword = await bcrypt.hash('123456', 12);
        await User.updateOne({ email: 'kamlesh@gmail.com' }, { password: hashedPassword });
        console.log('Password reset to 123456 for kamlesh@gmail.com');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

reset();
