const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to check if the request is within working hours
function checkWorkingHours(req, res, next) {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours(); // 24-hour format

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Within working hours
    } else {
        res.status(403).send('The application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
    }
}

app.use(checkWorkingHours);

// Set view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
