var Shop = require('../app/models/shop.js');
var User = require('../app/models/user.js');
var ObjectId = require('mongodb').ObjectId;

module.exports = function(app, passport) {
    
    // home page
    app.get('/', (req, res) => {
       // res.render('index.ejs');
       res.redirect('/login');
    });

    // login page GET request
    app.get('/login', (req, res) => {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // login page POST request
    app.post('/login', passport.authenticate('local-login', {   
        successRedirect: '/shops' , // redirect to shops page
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

    app.get('/logout', (req, res) => {
        req.logout(); // logout the user from the session
        res.redirect('/login'); // redirect to the login page
    });

    // shop list
    app.get('/shops', (req, res) => {
        var nearbyShops; // entirety of nearby shops including preferred shops of the user
        var toRemove; // preferred shops list of the user
        Shop.find({}, (err, shops) => {
            nearbyShops = shops;
            User.find({ 'local.username': req.user.local.username }, (err, user) => {
                toRemove = user[0].prefShop;

                // filtering the nearby shops to remove the preferred shops from the list
                nearbyShops = nearbyShops.filter((el) => {
                    return JSON.stringify(toRemove).indexOf(JSON.stringify(el)) < 0;
                });
                res.render('shops.ejs', {Shops: nearbyShops});
            });
        });
    });

    // like a shop post request
    app.post('/like/:shopId', (req, res) => {
         // find the shop with its id in the database
        Shop.find({_id: new ObjectId(req.params.shopId)}, (err, shop) => {
            // push the id of the shop to the prefShop array in database to keep track of the user's preferred shops
            User.update({ "local.username": req.user.local.username }, {$push: { "prefShop": shop[0]}}, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });

        // if its an ajax request
        if(req.xhr || req.accepts('json, html') === json) {
            res.send({message: 'Shop liked!'});
        }
    });

    // preferred shop GET request
    app.get('/prefShops', (req, res) => {
        // query the preferred shops of the user from the database
        User.find({"local.username": req.user.local.username}, (err, user) => {
            //console.log('Preferred shops for current user => ', user[0].prefShop);
            res.render('prefShops.ejs', {prefShops: user[0].prefShop});
        });
    });

    // removing a shop from preferred shops page POST request
    app.post('/removeShop/:shopId', (req, res) => {
        var objectId = new ObjectId(req.params.shopId); // id passed from AJAX call in the front-end
    
        // check if request is ajax
        if(req.xhr || req.accepts('json, html') === json){
            res.send({message: "Shop removed from preferred shops!"});
        }
        // find the user in the database and update prefShop array
        User.update({'local.username': req.user.local.username}, {$pull: {prefShop: {_id: objectId}}}, (err) => {
            if(err) {
                console.log(err);
            }
        });
    });

    // sort shops GET request
    app.get('/sortShops', (req, res) => {
        var nearbyShops; // entirety of nearby shops including preferred shops of the user
        var toRemove; // preferred shops list of the user
        Shop.find({}, (err, shops) => {
            nearbyShops = shops;
            User.find({ 'local.username': req.user.local.username }, (err, user) => {
                toRemove = user[0].prefShop;

                // filtering the nearby shops to remove the preferred shops from the list
                nearbyShops = nearbyShops.filter((el) => {
                    return JSON.stringify(toRemove).indexOf(JSON.stringify(el)) < 0;
                });

                // sort the nearby shops
                nearbyShops.sort((a, b) => {
                    distance1 = Math.sqrt(Math.pow(a.location.coordinates[0], 2) + Math.pow(a.location.coordinates[1], 2));
                    distance2 = Math.sqrt(Math.pow(b.location.coordinates[0], 2) + Math.pow(a.location.coordinates[1], 2));
                    if (distance1 < distance2) return 1;
                    if (distance1 > distance2) return -1;
                    return 0;
                });

                res.send({message: 'Shops sorted by distance.', shops: nearbyShops});
            });
        });
    });
};