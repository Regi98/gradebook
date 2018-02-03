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
  const btnLogout = document.getElementById('btnLogout');

  console.log("jcfc_admin");
  console.log("!WebJCFCAdmin1994");

  console.log("\n\n001");
  console.log("123456");

 
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
  
  $("#status").fadeIn(); // will first fade out the loading animation
  $("#preloader").delay(500).fadeIn("slow"); // will fade out the white DIV that covers the website.
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
      const refUsers = firebase.database().ref().child('users/'+firebaseUser.uid);  
          refUsers.once("value", function(snapshot) {
          var data = snapshot.val();
          console.log(data);
          var userID = snapshot.key;
          var role = snapshot.child("role").val();
          console.log(role);
          if (role == "Admin") {
              window.location = 'upload-students.html';
              console.log("Makalogin ya soy");
          }
          else if (role == "Teacher") {
              window.location = 'upload-grades.html';
              console.log("Makalogin ya soy");
          }
          else{
            console.log("Not a user");
          }
        });
    } else {
      console.log("Not logged in");
    }
  });

  //IF THERE IS AN ERROR IN LOGINS
  promise.catch(e =>  console.log(e.message));
});


  // Realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      const refUsers = firebase.database().ref().child('users/'+firebaseUser.uid);  
          refUsers.once("value", function(snapshot) {
          var data = snapshot.val();
          console.log(data);
          var userID = snapshot.key;
          var role = snapshot.child("role").val();
          console.log(role);
          if (role == "Admin") {
              window.location = 'upload-students.html';
              console.log("Makalogin ya soy");
          }
          else if (role == "Teacher") {
              window.location = 'upload-grades.html';
              console.log("Makalogin ya soy");
          }
          else{
            console.log("Not a user");
          }
        });
    } else {
      console.log("Not logged in");
    }
  });

});