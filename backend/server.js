'use strict';

const path = require('path');
const app = require('./app');
const { PORT } = require('./config/config');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catchall" handler: for any request that doesn't match API routes, send back React's index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start the server
app.listen(PORT, function () {
    console.log(`Started on http://localhost:${PORT}`);
});
