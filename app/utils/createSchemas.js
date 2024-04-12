const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

(async () => {
	try {
		await mongoose.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to MongoDB');

		// Check if schema exists, create if not
		const User = mongoose.model('User', userSchema, 'DentalGo');
		const users = await User.find();
		if (users.length === 0) {
			// Populate UserSchema with 3 emails
			await User.create([
				{ name: 'User 1', email: 'user1@example.com', password: 'password1' },
				{ name: 'User 2', email: 'user2@example.com', password: 'password2' },
				{ name: 'User 3', email: 'user3@example.com', password: 'password3' },
			]);
		}

		mongoose.disconnect();
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		process.exit(1);
	}
})();
