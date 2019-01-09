var passportLocalMongoose   = require("passport-local-mongoose"),
    Campground              = require("./models/campground"),
    Comment                 = require("./models/comment"),
    methodOverride          = require("method-override"),
    LocalStrategy           = require("passport-local"),
    flash                   = require("connect-flash"),
    User                    = require("./models/user"),
    bodyParser              = require("body-parser"),
    passport                = require("passport"),
    express                 = require("express"),
    seedDB                  = require("./seeds"),
    app                     = express();

// REQUIRING ROUTES
var campgroundRoutes        = require("./routes/campgrounds"),
    commentRoutes           = require("./routes/comments"),
    indexRoutes             = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp12";
console.log(process.env.DATABASEURL);
//APP CONFIG    
const mongoose = require('mongoose');
mongoose.connect(url, {useNewUrlParser: true});
// mongoose.connect("mongodb://chrisjohnson1:Castiel15973@ds159273.mlab.com:59273/yelpcamp_chrisjohnson1");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Harvey is the better of the two cats",
    resave: false,
    saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//ROUTE CONFIG
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use(indexRoutes);


//===============================================================
//ONLY TURN ON TO SEED NEW INFO INTO DATABASE!!!!!!!!          ||
//SERIOUSLY DO NOT TOUCH OR THERE WILL BE MAJOR DATA LOSS!     ||
//seedDB();                                                    ||
//===============================================================

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
});