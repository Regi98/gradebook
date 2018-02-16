"use strict";
var selectedFile;

$(document).ready(function() {
  $("#uploadFirebaseA").hide();
  $("#tableCSV").hide();
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

  var configg = {
    apiKey: "AIzaSyA7FJGZU2bmSehOqRB7imV-0pzOTb0U2c8",
    authDomain: "gradebook-9320d.firebaseapp.com",
    databaseURL: "https://gradebook-9320d.firebaseio.com"
  };
  var secondaryApp = firebase.initializeApp(configg, "Secondary");

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

        const refUsers = firebase.database().ref().child('users/'+firebaseUser.uid);
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
          $("#status").fadeOut(); // will first fade out the loading animation
          $("#preloader").delay(500).fadeOut("slow"); // will fade out the white DIV that covers the website.
          $("#createParent").click(function() {

            //Parent Creation
            var parentID = guidGenerator();
            var parentName = $('#parentName').val();
            var parentUser = $('#parentUser').val();
            var email = parentUser + "@jcfc-gradebook.com";
            var password = "123456";
            alert(parentID + parentUser);
            console.log(email + password);

            secondaryApp.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
              console.log(email + password);
              //Add to users table
              //Array of entities
              var entity = ["PID", "userName", "fullName", "password"];
              var pushedRef = firebase.database().ref('Parents/' + user.uid).set({
                [entity[0]]: parentID,
                [entity[1]]: parentUser,
                [entity[2]]: parentName,
                [entity[3]]: password
              });
              $('#alert-success').removeClass('hide');
              $('#parentName').val('');
              secondaryApp.auth().signOut();
            }, function(error) {
              // An error happened.
              var errorCode = error.code;
              var errorMessage = error.message;
            });
          });

          //AUTOCOMPLETE FORM PARENT
          $("#parentNames").keydown(function() {

            database.ref('Parents').on('value', snap => {
              var data1 = [];
              var key1 = [];
              snap.forEach(ss => {
                key1.push(ss.child('PID').val());
                data1.push(ss.child('fullName').val());
              });
              $("#parentNames").autocomplete({
                source: data1
              });

              console.log(data1);
            });
          });
          $('#parentNames').on('autocompletechange change', function() {
            var parentPID = "";
            var parentName = this.value;
            var selectedRef = database.ref().child('Parents').orderByChild('fullName').equalTo(this.value).once('value').then(function(snapshot) {
              snapshot.forEach(function(userSnapshot) {
                var username = userSnapshot.val();
                console.log(username.PID);
                parentPID = username.PID;
                $('#tagsName').append('<strong>Selected Parent:</strong><p id="parentPID">' + parentPID + '</parentPID> | ' + parentName + '');
              });
            });
          });

          //AUTOCOMPLETE FORM STUDENT
          $("#childrenNames").keydown(function() {

            database.ref('Students').on('value', snap => {
              var data2 = [];
              var key2 = [];
              snap.forEach(ss => {
                data2.push(ss.child('fullName').val());
              });
              $("#childrenNames").autocomplete({
                source: data2
              });
              console.log(data2);
            });
          });
          $('#childrenNames').on('autocompletechange change', function() {
            var childPID = "";
            var childName = this.value;
            var selectedRef = database.ref().child('Students').orderByChild('fullName').equalTo(this.value).once('value').then(function(snapshot) {
              snapshot.forEach(function(userSnapshot) {
                var username = userSnapshot.val();
                console.log(username.SN);
                childPID = username.SN;
                $('#tagsName').append('<strong>Selected Child:</strong> <p id="childPID">' + childPID + '</childPID> | ' + childName);
              });
            });
          }).change();

          // ::: TAGS BOX
          $("#tags input").on({
            focusout: function() {
              var txt = this.value.replace(/[^a-z0-9\+\-\.\#]/ig, ''); // allowed characters
              if (txt) $("<span/>", {
                text: txt.toLowerCase(),
                insertBefore: this
              });
              this.value = "";
            },
            keyup: function(ev) {
              // if: comma|enter (delimit more keyCodes with | pipe)
              if (/(188|13)/.test(ev.which)) $(this).focusout();
            }
          });
          $('#tags').on('click', 'span', function() {
            if (confirm("Remove " + $(this).text() + "?")) $(this).remove();
          });

          //DATA START! ==============
          //INSERT HEADER
          $('#sectionData').on('change', function() {
            $('#tableCSV').remove();
            $('table');
            const rootRef = database.ref('Students').orderByChild('Section').equalTo(this.value);


            rootRef.on("child_added", snap => {
              var SN = snap.child("SN").val();
              var name = snap.child("fullname").val();
              var section = snap.child("Section").val();
              var grade = snap.child("Grade").val();
              //Get the parent key of editing row

              $("#datatable-buttons").DataTable().row.add([SN, name, grade, section, '<button id="btnResetPw" type="button" class="btn btn-sm btn-secondary mr-2">Reset Password</button>']).draw();

            });
            rootRef.on("child_changed", snap => {
              var SN = snap.child("SN").val();
              var name = snap.child("fullname").val();
              var section = snap.child("Section").val();
              var grade = snap.child("Grade").val();
              //Get the parent key of editing row

              $("#datatable-buttons").DataTable().row.data([SN, name, grade, section, '<button id="btnResetPw" type="button" class="btn btn-sm btn-secondary mr-2">Reset Password</button>']).draw();

            });
            rootRef.on("child_removed", snap => {
              var SN = snap.child("SN").val();
              var name = snap.child("fullname").val();
              var section = snap.child("Section").val();
              var grade = snap.child("Grade").val();
              //Get the parent key of editing row

              $("#datatable-buttons").DataTable().row.remove([SN, name, grade, section, '<button id="btnResetPw" type="button" class="btn btn-sm btn-secondary mr-2">Reset Password</button>']).draw();

            });
          });

          function guidGenerator() {
            var S4 = function() {
              return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return (S4() + S4());
          }
        } else if (role == "Teacher") {
          window.location = 'upload-grades.html';
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
