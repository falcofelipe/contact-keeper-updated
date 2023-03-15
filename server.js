const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static assets (REACT) in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static(path.join(__dirname, './client/build')));

	// Loads the home page when accessing routes that are not described above
	app.get('*', (req, res) =>
		res.sendFile(
			path.join(__dirname, './client/build/index.html'),
			function (err) {
				res.status(500).send(err);
			}
		)
	);
}

/* LISTEN */

const PORT = process.env.PORT || 5000; //To account for deployment and development

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
