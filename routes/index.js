var User     = require("../models/user"),
    passport = require("passport"),
    express  = require("express"),
    router   = express.Router();

//=============
// ROOT ROUTE
//=============
router.get("/", function(req, res){
    res.render("landing");
});

//=============
// AUTH ROUTES
//=============

//REGISTER NEW USER
router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
           
           req.flash("error", err.message);
           return res.render("register");
       } 
       passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to YelpCamp" + user.username);
           res.redirect("/campgrounds");
       });
   });
});

//LOGIN ROUTES
router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

//LOGOUT ROUTES
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;