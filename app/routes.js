

module.exports = function(app, passport) {
    
    // home page
    app.get('/', (req, res) => {
        res.render('index.ejs');
    });

    // shop list
    app.get('/shops', (req, res) => {
        res.render('shops.ejs');
    });

    // login page GET request
    app.get('/login', (req, res) => {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // login page POST request
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/shops', // redirect to shops page
        failureRedirect: '/login', // redirect to login page
        failureFlash: true // allow flash messages
    }));

    // signup page GET request
    app.get('/signup', (req, res) => {
        res.render('signup.ejs', { message: req.flash('signupMessage')});
    });

    // signup page POST request
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/shops', // redirect to shops page
        failureRedirect: '/signup', // redirect to signup page
        failureFlash: true // allow flash messages
    }));
};