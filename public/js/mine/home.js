"use strict";
var selectedFile;

$(document).ready(function() {
  $("#status").fadeOut(); // will first fade out the loading animation
  $("#preloader").delay(500).fadeOut("slow"); // will fade out the white DIV that covers the website
});

$(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA7FJGZU2bmSehOqRB7imV-0pzOTb0U2c8",
    authDomain: "gradebook-9320d.firebaseapp.com",
    databaseURL: "https://gradebook-9320d.firebaseio.com",
    projectId: "gradebook-9320d",
    storageBucket: "gradebook-9320d.appspot.com",
    messagingSenderId: "943972164291"
  };
  firebase.initializeApp(config);

  // SUBMIT LOGOUT EVENT
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    gathering.leave();
    console.log("Sign-out successful.");
  });

  // Realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      var currentUser = firebaseUser;
      console.log(currentUser);
      console.log("You are now logged in. \n UID: " + currentUser.uid + "\n Name: " + currentUser.displayName);

      const refUsers = firebase.database().ref().child('users/' + firebaseUser.uid);
      refUsers.once("value", function(snapshot) {
        var data = snapshot.val();
        console.log(data);
        var userID = snapshot.key;
        var role = snapshot.child("role").val();
        console.log(role);
        if (role == "Teacher") {
          console.log("Teacher is logged in.");
          //Display the name of user temp
          $('#user-fullname').html(currentUser.displayName);
          $('#user-role').html(role);

      firebase.database().ref("Teachers/" + firebase.auth().currentUser.uid).child("TID").on('value', function(snapshot) {
        var TIDs = snapshot.val();
          firebase.database().ref("sectionsHandled/" + TIDs).on('value', function(snap) {
            document.getElementById("numSections").innerHTML = snap.numChildren();
            firebase.database().ref("sectionsHandled/" + TIDs).on('child_added', function(snap) {
              var section = snap.child("SectionCode").val();
              firebase.database().ref("Students").orderByChild("sectionCode").equalTo(section).on('value', function(snaps) {
                document.getElementById("numStudents").innerHTML = snaps.numChildren();

              });
            });
          });
      });


          // default/global gathering
          var gathering = new Gathering(firebase.database());

          // Or join with a beautiful name
          gathering.join(firebase.auth().currentUser.uid);

          //RANDOM CODE
          function gidGenerator() {
            var S4 = function() {
              return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return ("ID" + S4());
          }
          // END ADD ROW STUDENT
        } else if (role == "Admin") {
          window.location = 'home-admin.html';
          console.log("Not an admin. Redirecting to upload-grades page.");
        } else {
          console.log("Not a user");
          firebase.auth().signOut();
        }
      });

    } else {
      console.log("Not logged in");
      window.location = '/login';
    }
  })

});
