var fs = require('fs');
var express  = require("express");
var router   = express.Router();


router.get("/add",function(req, res){
        res.render('add-player.ejs', {
            title: "Add Player"
            ,message: ''
        });
    },
  );
router.post("/add",function(req, res){
  if (!req.files) {
      return res.status(400).send("파일이 업로드 되지 않았습니다");
  }

  var message = '';
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var position = req.body.position;
  var number = req.body.number;
  var username = req.body.username;
  var uploadedFile = req.files.image;
  var image_name = uploadedFile.name;
  var fileExtension = uploadedFile.mimetype.split('/')[1];
  image_name = username + '.' + fileExtension;

  var usernameQuery = "SELECT * FROM `players` WHERE user_name = '" + username + "'";

    db.query(usernameQuery, function(err, result){
      if (err) {
          return res.status(500).send(err);
      }
      if (result.length > 0) {
          message = '이미 존재하는 유저 이름 입니다.';
          res.render('add-player.ejs', {
              message,
              title: "Add Player"
          });
      } else {
          // 파일 타입 검사
          if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
              // 업로드 경로
              uploadedFile.mv(`public/playerimg/${image_name}`,    function(err, result){
          if (err) {
            return res.status(500).send(err);
          }
            var query = "INSERT INTO `players` (first_name, last_name, position, number, image, user_name) VALUES ('" + first_name + "', '" + last_name + "', '" + position + "', '" + number + "', '" + image_name + "', '" + username + "')";
            db.query(query, function(err, result){
              if (err) {
                return res.status(500).send(err);
              }
            res.redirect('/home');
            });
      });
        } else {
              message = "지원가능한 형식 gif png jpg";
              res.render('add-player.ejs', {
              message, title: "Add Player"
              });
          }
        }
    });
  },
);
    router.get('/edit/:id',function(req, res) {
        var playerId = req.params.id;
        var query = "SELECT * FROM `players` WHERE id = '" + playerId + "' ";
        db.query(query, function(err, result){
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-player.ejs', {
                title: "Edit  Player"
                ,player: result[0]
                ,message: ''
            });
        });
    },
  );
    router.post('/edit/:id',function(req, res) {
        var playerId = req.params.id;
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var position = req.body.position;
        var number = req.body.number;
        var query = "UPDATE `players` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `players`.`id` = '" + playerId + "'";
        db.query(query, function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/home');
        });
    },
  );
    router.get('/delete/:id',function(req, res) {
        var playerId = req.params.id;
        var getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
        var deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';

        db.query(getImageQuery,function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }

            var image = result[0].image;

            fs.unlink(`public/playerimg/${image}`,function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery,function (err, result) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/home');
                });
            });
        });
    },
);



module.exports = router;
