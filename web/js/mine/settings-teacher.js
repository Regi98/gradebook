"use strict";
var selectedFile;

$(document).ready(function() {
  $("#uploadFirebase").hide();
  // $("#tableCSV").hide();
});
$(window).on('load', function() {
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


  //create references
  const btnLogout = document.getElementById('btnLogout');


  // SUBMIT LOGOUT EVENT
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    console.log("Sign-out successful.");
  });

  // Realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      var currentUser = firebaseUser;
      console.log(currentUser);
      console.log("You are now logged in as a teacher. \n UID: " + currentUser.uid + "\n Name: " + currentUser.displayName);

      const refUsers = firebase.database().ref().child('users/' + currentUser.uid);
      refUsers.once("value", function(snapshot) {
        var data = snapshot.val();
        console.log(data);
        var userID = snapshot.key;
        var role = snapshot.child("role").val();
        console.log(role);
        if (role == "Teacher") {
          console.log("Teacher is logged in.");

          //THIS ACCOUNT
          const refTeachers = firebase.database().ref('Teachers/').child(currentUser.uid);
          refTeachers.once("value", function(snap) {
            var data = snap.val();
            var grade = data['Grade'];
            var TID = data['TID'];
            var fullname = data['fullname'];
            //Display the name of user temp
            $('#user-fullname').html(currentUser.displayName);
            $('#user-role').html(role);
            //Display the details in input
            $('#fullname').val(currentUser.displayName);
            var currentName = currentUser.displayName;
            // validate signup form on keyup and submit
            $("#validate-form").validate({
              rules: {
                fullname: {
                  required: true,
                  minlength: 2
                },
                password: {
                  minlength: 6
                },
                confirm_password: {
                  minlength: 5,
                  equalTo: "#password"
                },
                email: {
                  email: true
                }
              },
              messages: {
                fullname: {
                  required: "Please enter your fullname",
                  minlength: "Your fullname must consist of at least 2 characters"
                },
                password: {
                  required: "Please provide a password",
                  minlength: "Your password must be at least 6 characters long"
                },
                confirm_password: {
                  required: "Please provide a password",
                  minlength: "Your password must be at least 6 characters long",
                  equalTo: "Please enter the same password as above"
                },
                email: "Please enter a valid email address"
              },
              submitHandler: function(form){
                var newFullname = $("#fullname").val();
                var email = $("#email").val();
                var password = $("#password").val();
                console.log(currentName+newFullname);
                if(currentName != newFullname){
                  currentUser.updateProfile({
                    displayName: newFullname
                  }).then(function() {
                    // Update successful.
                    $('#alert-success-name').removeClass('hide');
                  }).catch(function(error) {
                    // An error happened.
                    $('#alert-danger-name').removeClass('hide');
                  });
                }
              }
            });
          });
          $('.alert .close').click(function(){
            $(this).parent().addClass('hide');
          });
        } else if (role == "Admin") {
          window.location = 'upload-students.html';
          console.log("Makalogin ya soy");
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
  $("#status").fadeOut(); // will first fade out the loading animation
  $("#preloader").delay(500).fadeOut("slow"); // will fade out the white DIV that covers the website.
});
