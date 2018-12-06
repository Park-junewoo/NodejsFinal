var express  = require("express");
var router   = express.Router();

router.get("/home",function (req, res){
    var query = "SELECT * FROM `players` ORDER BY id ASC"; //id 오름차순
    db.query(query, function(err, result) {
          if (err) {
              res.redirect('/home');
          }
          res.render('index.ejs', {
          title: "WelCome Soccer Player"
          ,players: result
          });
    });
  },
);

module.exports = router;
