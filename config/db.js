const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect(db);
		// The following are options that should be passed so the connection works as intended; he didn't really explain what each of them does.

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		process.exit(1); //Terminates Node with a code 1 - Uncaught Fatal Exception
	}
};

module.exports = connectDB;
