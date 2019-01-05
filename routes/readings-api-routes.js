var db = require("../models");

module.exports = function(app) {
    
    app.get("/", function(req, res) {
        res.json(path.join(__dirname, "../public/home.html"));
      });
    
    app.post("/api/readings", function(req, res) {
       db.Reading.create({
           place:  req.body.place,
           address: req.body.address,
           gallons: req.body.gallons,
           price: req.body.total,
           perGallon: req.body.perGallon
       }).then(function(result) {
           res.json(result);
       });
    });

    app.get("/api/recent", function(req, res) {
        db.Reading.findAll({
           ////look to order in descend
           limit: 6,
           order: [['createdAt', 'DESC']]
        }).then(function(data) {
           console.log(data);
           res.render("index", { readings: data });
            
        });
    });

    app.get("/database", function(req, res) {
        db.Reading.findAll({
           ////look to order in descend
        }).then(function(data) {
           console.log(data);
           res.json(data);
            
        });
    });

    app.delete("/api/delete/:id", function(req, res) {
        db.Reading.destroy({
          where: {
              id: req.params.id
          }
        }).then(function(dbReadings){
          res.json(dbReadings)
        });
    });

    app.get("/api/find/:id", function(req, res) {
        db.Reading.findOne({
        where: {
            id: req.params.id
        }
      }).then(function(dbReadings) {
        res.json(dbReadings);
      });
    });
    
    app.put("/api/update/:id", function(req, res) {
        db.Reading.update({
          place: req.body.place,
          address: req.body.address,
          gallons: req.body.gallons,
          price: req.body.total,
          perGallon: req.body.perGallon
        }, 
    { where: { id: req.params.id }
            
        }).then(function(result) {
            res.json(result);
        });
    });

    app.get("/api/lowest", function(req, res) {
        db.Reading.findAll({
           ////look to order in descend
           limit: 6,
           order: [['perGallon', 'ASC']]
        }).then(function(data) {
           console.log(data);
           res.render("lowest", { readings: data });
            
        });
    });

    app.get("/api/store", function(req, res) {
        db.Reading.findAll({
           ////look to order in descend
           limit: 6,
           order: [['place', 'ASC']]
        }).then(function(data) {
           console.log(data);
           res.render("store", { readings: data });
            
        });
    });

    app.post("/api/image", function(req, res) {
        res.json({
          id: 0,
          place: "Joe's Gas @ 123 Fake St",
          date: "2019-01-03",
          gallons: 9.142,
          price: 26.32,
          perGallon: 2.879
        });
      });
};