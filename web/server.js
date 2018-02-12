'use strict';
/*******************************************************
          NODE MODULES
*******************************************************/
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require("body-parser");
var admin = require('firebase-admin');
var app = express();
var server = http.createServer(app);
/*******************************************************
          FIREBASE ADMIN
*******************************************************/
var serviceAccount = require('./public/js/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gradebook-9320d.firebaseio.com"
});
/*******************************************************
          MIDDLEWARES
*******************************************************/
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(sendViewMiddleware);
app.use('/lib', express.static(path.join(__dirname, 'node_modules')));
app.use('/vendors', express.static(path.join(__dirname, 'vendors')));
app.use(function(err, req, res, next) {
  res.status(422).send({
    error: err.message
  });
});

function sendViewMiddleware(req, res, next) {
  res.sendView = function(view) {
    return res.sendFile(__dirname + "/public/" + view);
  }
  next();
}
/*******************************************************
          APP GET
*******************************************************/
app.get('/', function(req, res, next) {
  res.sendFile('public/index.html');
  //  res.send('Ola Mundo!');
});
app.get('/upload-students', function(req, res, next) {
  res.sendView('upload-students.html');
});
app.get('/list-students', function(req, res, next) {
  res.sendView('list-students.html');
});
app.get('/list-teachers', function(req, res, next) {
  res.sendView('list-teachers.html');
});
app.get('/upload-teachers', function(req, res, next) {
  res.sendView('upload-teachers.html');
});
app.get('/teachers-subject', function(req, res, next) {
  res.sendView('teachers-subject.html');
});
app.get('/add-section', function(req, res, next) {
  res.sendView('add-section.html');
});
app.get('/settings-admin', function(req, res, next) {
  res.sendView('settings-admin.html');
});
app.get('/home', function(req, res, next) {
  res.sendView('home.html');
});
app.get('/home-admin', function(req, res, next) {
  res.sendView('home-admin.html');
});
app.get('/upload-grades', function(req, res, next) {
  res.sendView('upload-grades.html');
});
app.get('/display-grades', function(req, res, next) {
  res.sendView('display-grades.html');
});
app.get('/settings-teacher', function(req, res, next) {
  res.sendView('settings-teacher.html');
});
app.get('/index-email', function(req, res, next) {
  res.sendView('index-email.html');
});
/*******************************************************
          APP POST STUDENT
*******************************************************/
app.post('/createUserStudent', function(req, res, next) {
  //create references
  var database = admin.database();
  const refStudents = database.ref().child('Students/');
  const refSections = database.ref().child('Sections/');

  var user_name = req.body.user;
  var password = req.body.password;
  var name = req.body.name;
  var section = req.body.section;
  var grLevel = req.body.grLevel;

  var email = user_name + "@jcfc-gradebook.com";

  admin.auth().createUser({
    email: email,
    password: password,
    displayName: name,
    disabled: false
  }).then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    //Update in database
    const refStudentsUp = database.ref().child('Students/' + userRecord.uid);
    refStudentsUp.update({
      SN: user_name,
      fullName: name,
      grade: grLevel,
      sectionCode: section,
      email: ""
    }).then(function() {
      console.log("Uploaded in database");
      res.end("Submitted");
    }).catch(function(error) {
      res.end(error.message);
      console.log(error.message);
      console.log("User not Created!");
    });
    console.log("Uploaded in auth");
    console.log("Successfully created new user:", userRecord.uid);
  }).catch(function(error) {
    res.end(error.message);
    console.log(error.message);
  });
});
app.post('/updateUserStudent', function(req, res, next) {
  //create references
  var database = admin.database();
  const refStudents = database.ref().child('Students/');
  const refSections = database.ref().child('Sections/');

  var user_name = req.body.user;
  var name = req.body.name;
  var section = req.body.section;
  var grLevel = req.body.grLevel;
  refStudents.orderByChild("SN").equalTo(user_name).once("child_added", function(snapshot) {
    var uid = snapshot.key;
    admin.auth().updateUser(uid, {
        displayName: name
      })
      .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        //Update in database
        console.log("Successfully updated user", userRecord.toJSON());
        //Update in database
        //Update in database
        const refStudentEdit = database.ref().child('Students/' + uid);
        refStudentEdit.update({
          fullName: name,
          grade: grLevel,
          sectionCode: section
        }).then(function() {
          res.end("Submitted");
        }).catch(function(error) {
          res.end(error.message);
          console.log(error.message);
          console.log("User not Created!");
        });
        console.log("Successfully updated new user:", userRecord.uid);
      }).catch(function(error) {
        res.end(error.message);
        console.log(error.message);
      });

    console.log("Updated : " + name);
  });
});
app.post('/updateUserPwStudent', function(req, res, next) {
  //create references
  var database = admin.database();
  const refStudents = database.ref().child('Students/');
  const refSections = database.ref().child('Sections/');

  var user_name = req.body.user;
  var name = req.body.name;
  var password = req.body.password;

  refStudents.orderByChild("SN")
    .equalTo(user_name)
    .once("child_added", function(snapshot) {
      var uid = snapshot.key;
      admin.auth().updateUser(uid, {
          password: password
        })
        .then(function(userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          //Update in database
          console.log(password);
          console.log("Successfully updated user's password", userRecord.toJSON());
          console.log("Successfully updated new user:", user_name);
          console.log("Updated Pass: " + password);
          res.end(user_name + " " + name);
        }).catch(function(error) {
          res.end(error.message);
          console.log(error.message);
        });
    });
});
app.post('/deleteUserStudent', function(req, res, next) {
  //create references
  var database = admin.database();
  const refStudents = database.ref().child('Students/');
  const refSections = database.ref().child('Sections/');

  var user_name = req.body.user;
  var section = req.body.section;
  var grLevel = req.body.grLevel;
  refStudents.orderByChild("SN").equalTo(user_name).once("child_added", function(snapshot) {
    var uid = snapshot.key;
    admin.auth().deleteUser(uid).then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      //Delete in database
      refStudents.child(uid).remove().then(function() {
        res.end("Submitted");
        console.log("Successfully deleted user " + user_name);
      }).catch(function(error) {
        res.end(error.message);
        console.log(error.message);
        console.log("User not deleted!");
      });
    }).catch(function(error) {
      res.end(error.message);
      console.log(error.message);
    });
  });
});
/*******************************************************
          APP POST TEACHER
*******************************************************/
app.post('/createUserTeacher', function(req, res, next) {
  //create references
  var database = admin.database();
  const refSections = database.ref().child('Sections/');

  var user_name = req.body.TID;
  var password = req.body.password;
  var name = req.body.name;
  var role = "Teacher";
  var email = user_name + "@jcfc-gradebook.com";

  admin.auth().createUser({
      email: email,
      displayName: name,
      password: password,
      disabled: false
    })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      //Update in database
      const refTeachersUp = database.ref().child('Teachers/' + userRecord.uid);
      refTeachersUp.update({
        TID: user_name,
        fullname: name,
        email: ""
      }).then(function() {
        //Add to users table
        var pushedUser = database.ref('users/' + userRecord.uid).update({
          role: "Teacher",
          fullname: name
        });
        res.end("Submitted");
      }).catch(function(error) {
        res.end(error.message);
        console.log(error.message);
        console.log("User not Created!");
      });
      res.end("Submitted");
      console.log("Successfully created new user:", userRecord.uid);
    }).catch(function(error) {
      res.end(error.message);
      console.log(error.message);
    });
  console.log("User name: " + user_name + ", password is " + password);
});
app.post('/updateUserTeacher', function(req, res, next) {
  //create references
  var database = admin.database();
  const refTeachers = database.ref().child('Teachers/');

  var user_name = req.body.user;
  var name = req.body.name;
  refTeachers.orderByChild("TID").equalTo(user_name).once("child_added", function(snapshot) {
    var uid = snapshot.key;
    admin.auth().updateUser(uid, {
        displayName: name
      })
      .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        //Update in database
        const refTeacherEdit = database.ref().child('Teachers/' + uid);
        refTeacherEdit.update({
          fullname: name
        }).then(function() {
          console.log("Successfully updated user", userRecord.toJSON());
        }).catch(function(error) {
          res.end(error.message);
          console.log(error.message);
          console.log("User not Created!");
        });
        const refUsersEdit = database.ref().child('users/' + uid);
        refUsersEdit.update({
          fullname: name
        }).then(function() {
          console.log("Successfully updated user", userRecord.toJSON());
        }).catch(function(error) {
          res.end(error.message);
          console.log(error.message);
          console.log("User not Created!");
        });
        res.end("Submitted");
        console.log("Successfully updated new user:", userRecord.uid);
      }).catch(function(error) {
        res.end(error.message);
        console.log(error.message);
      });
    console.log("Updated : " + name);
  });
});
app.post('/updateUserPwTeacher', function(req, res, next) {
  //create references
  var database = admin.database();
  const refTeachers = database.ref().child('Teachers/');
  const refSections = database.ref().child('Sections/');

  var user_name = req.body.user;
  var name = req.body.name;
  var password = req.body.password;

  refTeachers.orderByChild("TID")
    .equalTo(user_name)
    .once("child_added", function(snapshot) {
      var uid = snapshot.key;
      admin.auth().updateUser(uid, {
          password: password
        })
        .then(function(userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          //Update in database
          console.log(password);
          console.log("Successfully updated user's password", userRecord.toJSON());
          console.log("Successfully updated user's Password:", userRecord.uid);
          res.end(user_name + " " + name);
        }).catch(function(error) {
          res.end(error.message);
          console.log(error.message);
        });
      console.log("Updated ID: " + user_name);
    });
});
app.post('/deleteUserTeacher', function(req, res, next) {
  //create references
  var database = admin.database();
  const refTeachers = database.ref().child('Teachers/');
  const refSubjects = database.ref().child('Subjects/');
  const refUsers = database.ref().child('users/');

  var user_name = req.body.user;
  var name = req.body.name;
  refTeachers.orderByChild("TID").equalTo(user_name).once("child_added", function(snapshot) {
    var uid = snapshot.key;
    console.log(uid);
    admin.auth().deleteUser(uid).then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      //Delete in database
      refTeachers.child(uid).remove().then(function() {
        refSubjects.orderByChild("subjectTeacherID").equalTo(user_name).on("child_added", function(snap) {
          snap.forEach(function(child) {
            child.ref.update({
              subjectTeacherID: false
            });
          });
          console.log("Successfully remove teacher's subjects");
          //Delete in database
          res.end("Submitted");
        }).catch(function(error) {
          res.end(error.message);
          console.log(error.message);
          console.log("Subject not deleted!");
        });
        console.log("Successfully deleted user " + user_name);
        //Delete in database
        refUsers.child(uid).remove();
        database.ref('sectionsHandled').child(user_name).remove();
        res.end("Submitted");
      }).catch(function(error) {
        res.end(error.message);
        console.log(error.message);
        console.log("User not deleted!");
      });
    }).catch(function(error) {
      res.end(error.message);
      console.log(error.message);
    });
  }).catch(function(error) {
    res.end(error.message);
    console.log(error.message);
  });
});
/*******************************************************
          APP POST SECTION & SUBJCTS
*******************************************************/
// app.post('/addSection', function(req, res, next) {
//   //create references
//   var database = admin.database();
//   const refSections = database.ref().child('Sections/');
//
//   var user_name = req.body.TID;
//   var password = req.body.password;
//   var name = req.body.name;
//   var role = "Teacher";
//   var email = user_name + "@jcfc-gradebook.com";
//
//   admin.auth().createUser({
//       email: email,
//       displayName: name,
//       password: password,
//       disabled: false
//     })
//     .then(function(userRecord) {
//       // See the UserRecord reference doc for the contents of userRecord.
//       //Update in database
//       const refTeachersUp = database.ref().child('Teachers/' + userRecord.uid);
//       refTeachersUp.update({
//         TID: user_name,
//         fullname: name,
//         email: ""
//       }).then(function() {
//         //Add to users table
//         var pushedUser = database.ref('users/' + userRecord.uid).update({
//           role: "Teacher",
//           fullname: name
//         });
//         res.end("Submitted");
//       }).catch(function(error) {
//         res.end(error.message);
//         console.log(error.message);
//         console.log("User not Created!");
//       });
//       res.end("Submitted");
//       console.log("Successfully created new user:", userRecord.uid);
//     }).catch(function(error) {
//       res.end(error.message);
//       console.log(error.message);
//     });
//   console.log("User name: " + user_name + ", password is " + password);
// });
/*******************************************************
          LISTEN TO PORT
*******************************************************/
server.listen(3000, 'localhost');
server.on('listening', function() {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
