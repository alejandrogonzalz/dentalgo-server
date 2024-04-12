const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

(async () => {
	try {
		await mongoose.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to MongoDB');

		// Check if collection exists, create if not
		const collectionExists = await mongoose.connection.db
			.listCollections({ name: 'DentalGo' })
			.next();
		if (!collectionExists) {
			await mongoose.connection.createCollection('DentalGo');
			console.log('Collection created');
		}

		mongoose.disconnect();
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		process.exit(1);
	}
})();
