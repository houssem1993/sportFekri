// import express module
const express = require("express");
// import bcrypt module
const bcrypt = require("bcrypt");
// import body-parser module
const bodyParser = require("body-parser")
// import axios module
const axios = require("axios")
// import JSONWEBTOKEN module
const jwt = require("jsonwebtoken")
// import authenticate module
const authenticate = require("./middelware/authenticate");

// import path module
const path = require("path")
// import multer module
const multer = require("multer")
// import mongoose module
const mongoose = require("mongoose")
// sportFekriDB =>DB name
mongoose.connect('mongodb://127.0.0.1:27017/sportFekriDB');
// create an express application
const app = express();

// configure body-parser
// Send JSON responses
app.use(bodyParser.json());
// Get objects from Request
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

// backend/images => original path
app.use('/avatars', express.static(path.join('backend/images')));

const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, 'backend/images')
  },


  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
      extension;
    cb(null, imgName);
  }
})

// import match model
const Match = require("./models/match")
const Player = require("./models/player")
const User = require("./models/user")
const Team = require("./models/team")


// simulate DB
// let matchesTab = [
//   { id: 1, scoreOne: 2, scoreTwo: 0, teamOne: "RMD", teamTwo: "EST" },
//   { id: 2, scoreOne: 7, scoreTwo: 0, teamOne: "LIV", teamTwo: "MAN" },
//   { id: 3, scoreOne: 10, scoreTwo: 1, teamOne: "RMD", teamTwo: "EST" }
// ];

// Business Logic : Add Match
app.post("/matches", (req, res) => {
  console.log("Here BL :Add Match");
  // Save object to database
  let match = new Match({
    scoreOne: req.body.scoreOne,
    scoreTwo: req.body.scoreTwo,
    teamOne: req.body.teamOne,
    teamTwo: req.body.teamTwo
  });
  console.log("Here match", match);
  match.save();
  res.json({ message: "added with success", isAdded: true })

});



// Business Logic : match search
app.post("/matches/search", (req, res) => {
  console.log("Here BL :Add Search Match");
  // Save object to database
  let matchS = req.body;
  console.log("Here match", matchS);

  let findMatches = [];

  for (let i = 0; i < matchesTab.length; i++) {
    if (matchesTab[i].scoreOne == matchS.scoreOne && matchesTab[i].scoreTwo == matchS.scoreTwo) {

      findMatches.push(matchesTab[i]);

    }


  }

  res.json({ matches: findMatches })

});



// Business Logic : GET All Matches
app.get("/matches", authenticate, (req, res) => {
  console.log("Here BL :Get All  Matches");
  Match.find().then((data) => {
    res.json({ matches: data, message: "ok!" });
  })


});

// Business Logic : Edit Match
app.put("/matches", (req, res) => {
  console.log("Here BL :Edit Match");

  let newMatch = req.body;

  Match.updateOne({ _id: newMatch._id }, newMatch).then(
    (editResponse) => {
      console.log("edit response", editResponse);
      if (editResponse.nModified == 1) {

        res.json({ message: "Match edited with success" })

      }
    }
  )


  // res.json({ message: "match edited with success" })



});

// Business Logic : Get  Match By Id
app.get("/matches/:id", (req, res) => {
  console.log("Here BL :Get  Match By Id");
  let id = req.params.id;

  // for (let i = 0; i < matchesTab.length; i++) {
  //   if (matchesTab[i].id == id) {

  //     match = matchesTab[i];
  //     break;

  //   }

  // }

  Match.findOne({ _id: id }).then((doc) => {

    res.json({ findedMatch: doc })

  })

});

// Business Logic : Delete Match By Id
app.delete("/matches/:id", (req, res) => {
  console.log("Here BL : Delete Match By Id ");

  let id = req.params.id;

  Match.deleteOne({ _id: id }).then(
    (resDelete) => {

      console.log(resDelete);
      if (resDelete.deletedCount == 1) {

        res.json({ message: `Match N ${id} is deleted with succces ` });

      }

    }
  )

});

// Business Logic : Add Player
app.post("/players", (req, res) => {
  console.log("Here BL :Add Player");

  let player = new Player({

    name: req.body.name,

    age: req.body.age,

    position: req.body.position,

    nbre: req.body.nbre
  })

  console.log("Here player", player);

  player.save();

  res.json({ message: "Added player with success", isAdded: true })

});


// Business Logic : Edit Player
app.put("/players", (req, res) => {
  console.log("Here BL :Edit Player");

});

// Business Logic : Get All Player
app.get("/players", (req, res) => {
  console.log("Here BL :Get All  Player");

  Player.find().then((docs) => {
    res.json({ players: docs })

  });

});

// Business Logic : Get  Player By Id
app.get("/player/:id", (req, res) => {
  console.log("Here BL :Get  Player By Id");

});

// Business Logic : Delete Player 
app.delete("/player/:id", (req, res) => {
  console.log("Here BL : Delete Player By Id ");

});

// Business Logic : login user 
app.post("/users/signin", (req, res) => {

  let user = req.body;

  let findUser;

  User.findOne({ email: user.email }).then(
    (doc) => {
      findUser = doc;
      console.log("Here serarched object By email", doc);
      if (!doc) {

        res.json({ message: "0" })
      }

      return bcrypt.compare(user.pwd, doc.pwd);
    })
    .then(
      (pwdResult) => {
        if (!pwdResult) {

          res.json({ message: "1" })

        } else {

          const token = jwt.sign(
            {
              email: findUser.email,
              userId: findUser._id,
              userRole: findUser.role,
            },
            "Testing",
            { expiresIn: "1min" }
          );
          let userToSend = {
            id: findUser._id,
            firstName: findUser.firstName,
            lastName: findUser.lastName,
            role: findUser.role,
            jwt: token,
            expiresIn: 60,
          }

          res.json({ message: "2", user: userToSend })

        }

      })

});

// Business Logic : Signup user
app.post("/users/subscription", multer({ storage: storageConfig }).single('img'), (req, res) => {
  console.log("Here BL Signup user", req.body);

  bcrypt.hash(req.body.pwd, 8).then(
    (cryptedPwd) => {
      let user = new User({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        pwd: cryptedPwd,
        role: req.body.role,
        avatar: `http://localhost:3000/avatars/${req.file.filename}`

      });

      user.save((error, doc) => {
        console.log("Here error", error);
        console.log("Here doc", doc);

        if (doc) {

          res.json({ message: "added with success" });

        } else {

          res.json({ message: "error" });

        }
      });

    });


});

// Business Logic : Edit user
app.put("/users", (req, res) => {
  console.log("Here BL :Edit user");

});


// add team

app.post("/teams", (req, res) => {
  console.log("Here into BL:ADD TEAM", req.body);

  let teamObject = new Team({
    teamName: req.body.name,
    teamOwner: req.body.owner,
    teamStaduim: req.body.staduim,
    teamFoundation: req.body.fondation
  });

  teamObject.save((err, doc) => {
    err ? res.json({ message: "NOK" }) : res.json({ message: "OK" });

  });


})

// getallTeams

app.get("/teams", (req, res) => {
  console.log("Here into BL:Get all teams");

  Team.find().then(
    (docs) => {
      res.json({ teams: docs });
    }
  )
});

// delete team by id

app.delete("/teams/:id", (req, res) => {
  let teamId = req.params.id;

  console.log("Here into delete by id", teamId);

  Team.deleteOne({ _id: teamId }).then(
    (deleteResponse) => {
      console.log("deleteResponse", deleteResponse);
      if (deleteResponse.deletedCount == 1) {

        res.json({ message: "DELETE WITH SUCCES " })

      }

    }
  )

})


// get team by id

app.get("/teams/:id", (req, res) => {
  console.log("Here GET TEAM  BY ID", req.params.id);

  Team.findOne({ _id: req.params.id }).then(
    (response) => {
      res.json({ teamFind: response })
    }
  );


}


)

app.post("/weather", (req, res) => {

  console.log(req.body);

  let city = req.body.city;

  let key = "62ee756a34835483299877a61961cafb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

  axios.get(apiUrl).then(
    (apiResponse) => {
      console.log("HERE API RESPONSE", apiResponse.data);

      let result = {


        city: apiResponse.data.name,
        temperature: apiResponse.data.main.temp,
        pressure: apiResponse.data.main.pressure,
        humidity: apiResponse.data.main.humidity,
        sunrise: apiResponse.data.sys.sunrise,
        sunset: apiResponse.data.sys.sunset,
        icone: `http://openweathermap.org/img/w/${apiResponse.data.weather[0].icon}.png`,
      };

      res.json({ data: result })

    }
  );
})

//make app importable from another files
module.exports = app;