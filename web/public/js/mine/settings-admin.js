"use strict";
var selectedFile;

$(document).ready(function() {
    $("#uploadFirebaseA").hide();
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


    //create references
    var database = firebase.database();

    const section = document.getElementById("section");
    const txtEmail = document.getElementById('txtEmail');
    const btnLogin = document.getElementById('btnLogin');
    const btnLogout = document.getElementById('btnLogout');
    const btnLogout2 = document.getElementById('btnLogout2');


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
            console.log("You are now logged in. \n UID: " + currentUser.uid + "\n Name: " + currentUser.displayName);

            const refUsers = firebase.database().ref().child('users/'+currentUser.uid);
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
              //Display the details in input
              var currentName = currentUser.displayName;
              $('#fullname').val(currentName);
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
                    minlength: "Your password must be at least 6 characters long"
                  },
                  confirm_password: {
                    minlength: "Your password must be at least 6 characters long",
                    equalTo: "Please enter the same password as above"
                  },
                  email: "Please enter a valid email address"
                },
                submitHandler: function(form) {
                  var newFullname = $("#fullname").val();
                  var newEmail = $("#email").val();
                  var emailCount = $("#email").val().length;
                  var newPassword = $("#password").val();
                  var passwordCount = $("#password").val().length;
                  alert(passwordCount);
                  if (currentName != newFullname) {
                    currentUser.updateProfile({
                      displayName: newFullname
                    }).then(function() {
                      // Update successful auth.
                      var updateName = {};
                      updateName = {
                        fullname: newFullname
                      };
                      refTeachers.update(updateName).then(function() {
                        $('#alert-success-name').removeClass('hide');
                      }).catch(function(error) {
                        $('#alert-danger-name').removeClass('hide');
                      });
                    }).catch(function(error) {
                      // An error happened.
                      $('#alert-danger-name').removeClass('hide');
                    });
                  } else {
                    console.log("No change in name");
                  }
                  if (passwordCount >= 6) {
                    currentUser.updatePassword(newPassword).then(function() {
                      // Update successful.
                      $("#alert-success-password").fadeIn("slow", function() {
                        $(this).removeClass("hide");
                      });
                    }).catch(function(error) {
                      // An error happened.
                      var errorMsgPass = error.message;
                      $('#alert-danger-password').removeClass('hide');
                      $('#passwordError').html(errorMsgPass);
                    });
                  } else {
                    console.log("No change in password");
                  }
                  if (emailCount != 0) {
                    currentUser.updateEmail(newEmail).then(function() {
                      // Update successful.
                      $('#alert-success-email').removeClass('hide');
                    }).catch(function(error) {
                      // An error happened.
                      var errorMsgEmail = error.message;
                      $('#alert-danger-email').removeClass('hide').fadeIn;
                      $('#emailError').html(errorMsgEmail);
                    });
                  } else {
                    console.log("No change in email");
                  }
                }
              });
              $('.alert .close').click(function() {
                $(this).parent().addClass('hide');
              });
            } else if (role == "Teacher") {
              window.location = 'upload-grades.html';
              console.log("Makalogin ya soy");
            }
            else{
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
