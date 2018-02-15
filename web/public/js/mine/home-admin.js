"use strict";
var selectedFile;

$(document).ready(function() {
  $("#status").fadeOut(); // will first fade out the loading animation
  $("#preloader").delay(500).fadeOut("slow"); // will fade out the white DIV that covers the website.
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

    console.log("Sign-out successful.");
    gathering.leave();
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
        if (role == "Admin") {
          console.log("Admin is logged in.");
          //Display the name of user temp
          $('#user-fullname').html(currentUser.displayName);
          $('#user-role').html(role);

          var studRef = firebase.database().ref("Students");
          studRef.on('value', function(snap) {
            document.getElementById("numStudents").innerHTML = snap.numChildren();
          });
          var teacherRef = firebase.database().ref("Teachers");
          teacherRef.on('value', function(snap) {
            document.getElementById("numTeachers").innerHTML = snap.numChildren();
          });
          var sectionRef = firebase.database().ref("Sections");
          sectionRef.on('value', function(snap) {
            document.getElementById("numSections").innerHTML = snap.numChildren();
          });


        const deleteAllStudents = document.getElementById('deleteAllStudents');
        deleteAllStudents.addEventListener('click', e  => {
            const rootRef = firebase.database().ref('Students');

              $.confirm({
                title: 'DELETE ALL STUDENT!',
                content: 'Are you sure you proceed?',
                type: 'orange',
                closeIcon: true,
                buttons: {
                  confirm: {
                    btnClass: 'btn-green',
                    action: function() {
                      var self = this;
                      return $.post("/deleteAllStudent", {
                          user: "user"
                      }).done(function(response) {
                        $.alert({
                          icon: 'fa fa-success',
                          title: 'Success!',
                          content: 'All student accounts has been removed',
                          type: 'green'
                        });
                      }).fail(function() {
                        $.alert({
                          icon: 'fa fa-warning',
                          title: 'Error',
                          content: 'Something went wrong!',
                          type: 'red'
                        });
                      });
                    }
                  },
                  cancel: {
                    btnClass: 'btn-red',
                    type: 'yellow',
                    action: function() {
                      $.alert('Canceled!');
                    }
                  }
                }
              });
            });

          //RANDOM CODE
          function gidGenerator() {
            var S4 = function() {
              return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return ("ID" + S4());
          }
          // END ADD ROW STUDENT
        } else if (role == "Teacher") {
          window.location = 'home.html';
          console.log("Not an admin. Redirecting to upload-grades page.");
        } else {
          console.log("Not a user");
          firebase.auth().signOut();
        }
      });

    } else {
      console.log("Not logged in");
      window.location = 'index.html';
    }
  })

});
