"use strict";

$(document).ready(function () {

  // Initialize Firebase
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


  const txtEmail = document.getElementById('txtEmail');
  const txtPass = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnGmail = document.getElementById('btnGmail');
  const btnLogout = document.getElementById('btnLogout');


// SUBMIT LOGIN EVENT
$(document).keypress(function (e) {
//LOGIN USING ENTER KEY
if (e.which == 13) {
  $('#btnLogin').click();
  event.preventDefault();
  //Get Email and Pass
  const uname = txtEmail.value;
  const email = uname+"@jcfc-gradebook.com";
  const pass = txtPass.value;
  const auth = firebase.auth();

  // Sign In
  const promise = auth.signInWithEmailAndPassword(email, pass);
  console.log("Logging in!");

  promise.catch(e =>  console.log(e.message));
}

});

// LOGIN USING BUTTON
btnLogin.addEventListener('click', e  => {


  event.preventDefault();
  //Get Email and Pass
  const uname = txtEmail.value;
  const email = uname+"@jcfc-gradebook.com";
  const pass = txtPass.value;
  const auth = firebase.auth();

  // Sign In
  const promise = auth.signInWithEmailAndPassword(email, pass);
  console.log("Logging in!");

   // Realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {

    if(firebaseUser){
      $("#status").fadeIn(); // will first fade out the loading animation
      $("#preloader").delay(500).fadeIn("slow"); // will fade out the white DIV that covers the website.
      const refUsers = firebase.database().ref().child('users/'+firebaseUser.uid);
          refUsers.once("value", function(snapshot) {
          var data = snapshot.val();
          var userID = snapshot.key;
          var role = snapshot.child("role").val();
          if (role == "Admin") {
              window.location = '/home-admin';
              console.log("You are now logged in.");
          }
          else if (role == "Teacher") {
              window.location = '/home';
              console.log("You are now logged in.");
          }
          else{
            window.location = '/login';
            console.log("Not a user");
          }
        });
    } else {
      console.log("Not logged in");
    }
  });

  //IF THERE IS AN ERROR IN LOGINS
  promise.catch(error => {
    console.log(error.message);
    $( "#alert-boxes-login" ).append( "<div class='alert alert-danger alert-dismissable'>"+ error.message + "</div>");
    $('.alert-danger').delay(3000).fadeOut('slow');
  }

  );
});

});
