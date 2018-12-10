var express  = require("express");
var router   = express.Router();


router.get("/", function(req, res){
  res.redirect("/intro");
});

// Intro
router.get("/intro", function(req, res){
  res.render("intro");
});

router.get("/about", function(req, res){
  res.render("about");
});

module.exports = router;
