"use strict";
var selectedFile;

$(document).ready(function() {
  $("#uploadFirebaseA").hide();
  $("#alert-success").hide();
  $("#tableCSVaccounts").hide();
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

          //DATA START! ==============
          //INSERT HEADER
          const rootRef = firebase.database().ref().child('Teachers');
          //INSERT DATA
          rootRef.on("child_added", snap => {
            var TID = snap.child("TID").val();
            var name = snap.child("fullname").val();
            //Get the parent key of editing row
            rootRef.orderByChild("TID").equalTo(TID).on("child_added", function(snapshot) {
              var parentKey = snapshot.key;
              $("#datatable-buttons").DataTable().row.add([parentKey, TID, name, '<button id="btnResetPw" type="button" class="btn btn-sm btn-secondary mr-2">Reset Password</button>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
            });
          });
          rootRef.on("child_changed", snap => {
            var TID = snap.child("TID").val();
            var name = snap.child("fullname").val();
            //Get the parent key of editing row
            rootRef.orderByChild("TID").equalTo(TID).on("child_added", function(snapshot) {
              var parentKey = snapshot.key;
              $("#datatable-buttons").DataTable().row.data([parentKey, TID, name, '<button id="btnResetPw" type="button" class="btn btn-sm btn-secondary mr-2">Reset Password</button>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
            });
          });
          rootRef.on("child_removed", snap => {
            var TID = snap.child("TID").val();
            var name = snap.child("fullname").val();
            //Get the parent key of editing row
            rootRef.orderByChild("TID").equalTo(TID).on("child_added", function(snapshot) {
              var parentKey = snapshot.key;
              $("#datatable-buttons").DataTable().row.remove([parentKey, TID, name, '<button id="btnResetPw" type="button" class="btn btn-sm btn-secondary mr-2">Reset Password</button>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
            });
          });

          //CSV TO TEXTBOX
          const uploadCSV = document.getElementById('uploadCSVaccounts');
          uploadCSV.addEventListener('click', e => {
            alert("click");
            var fileUpload = document.getElementById("fileUploadAccounts");
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
            if (regex.test(fileUpload.value.toLowerCase())) {
              if (typeof(FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function(e) {
                  var table = document.createElement("table");
                  table.setAttribute("id", "tableCSVaccounts");
                  var rows = e.target.result.split("\n");
                  for (var i = 0; i < 1; i++) {
                    var row = table.insertRow(-1);
                    var cells = rows[i].split(",");
                    for (var j = 0; j < cells.length; j++) {
                      var cell = row.insertCell(-1);
                      cell.innerHTML = '<input type="text" id="row' + i + 'cell' + j + '" class="row' + i + '" value="' + $.trim(cells[j]) + '" disabled="disabled">';
                    }
                  }
                  for (var i = 1; i < rows.length - 1; i++) {
                    var row = table.insertRow(-1);
                    var cells = rows[i].split(",");
                    for (var j = 0; j < cells.length; j++) {
                      var cell = row.insertCell(-1);
                      cell.innerHTML = '<input type="text" id="row' + i + 'cell' + j + '" class="row' + i + '" value="' + $.trim(cells[j]) + '" disabled="disabled">';
                    }
                  }
                  var dvCSV = document.getElementById("tableCSV");
                  dvCSV.innerHTML = "";
                  dvCSV.appendChild(table);
                }
                reader.readAsText(fileUpload.files[0]);
                $("#uploadFirebaseA").show();
              } else {
                alert("This browser does not support HTML5.");
              }
            } else {
              alert("Please upload a valid CSV file.");
            }
          });



          //upload to db firebase
          const btnUploadFirebase = document.getElementById('uploadFirebaseA');
          btnUploadFirebase.addEventListener('click', e => {
            console.log("Upload");
            var $rowData = $('#tableCSVaccounts').find('> tbody > tr').not(':last');
            $.each($rowData, function(i, el) {
              var x = i + 1;
              var teacherID = $('#row' + x + 'cell0').val();
              var password = $('#row' + x + 'cell2').val();
              var fname = $('#row' + x + 'cell1').val();
              var email = teacherID + "@jcfc-gradebook.com";


              secondaryApp.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
                console.log(email + password);
                //Add to users table
                var pushedUser = firebase.database().ref('users/' + user.uid).set({
                  role: "Teacher",
                  fullname: fname
                });
                //Add name and default dp to the Autherization table
                user.updateProfile({
                  displayName: fname,
                  photoURL: "default_dp",
                  disabled: true
                });
                var $rowFirst = $("table:first").find("tr:first");
                var $rowNext = $('#tableCSVaccounts tr').eq(x);
                //get all td's in row
                var $tdsFirst = $rowFirst.find("td");
                // loop all td
                $.each($tdsFirst, function(i, el) {
                  //get value of each td
                  var txtEntity = $(this).find("input").val();
                  var $rowNext = $('#tableCSVaccounts tr').eq(x);
                  var $tdsNext = $rowNext.find("td:eq(" + i + ")");

                  $.each($tdsNext, function(i, el) {
                    //get value of each td
                    var txtValue = $(this).find("input").val();
                    //Update in database
                    const mySection = $('#sectionUpload').val();
                    var pushedRef = firebase.database().ref('Teachers/' + user.uid).update({
                      [txtEntity]: txtValue
                    });
                    $('#alert-success').show();
                  });
                });
                secondaryApp.auth().signOut();
              }, function(error) {
                // An error happened.
                var errorCode = error.code;
                var errorMessage = error.message;
              });
            });
          });

          // START ADD ROW Teacher
          const btnAddTeacher = document.getElementById('btnAddTeacher');
          var t = $('#datatable-buttons').DataTable();
          btnAddTeacher.addEventListener('click', e => {
            t.row.add([
              "",
              '<input id="txtTID" type="text" class="form-control" width="100%">',
              '<input id="txtfName" type="text" class="form-control" width="100%">',
              '<input id="txtPassword" type="text" class="form-control" width="100%">',
              '<i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i>'
            ]).draw(false);
          });
          //START SAVE ADDED Teacher ROW
          $("#datatable-buttons").on('mousedown.add', "i.fa.fa-plus", function(e) {
            $(this).removeClass().addClass("fa fa-pencil-square");
            //get value of each td
            var txtTID = $('#txtTID').val();
            var txtfName = $('#txtfName').val();
            var txtPassword = $('#txtPassword').val();
            // Firebase Authentication
            var email = txtTID + "@jcfc-gradebook.com"
            var password = txtPassword;
            console.log(email + password);

            secondaryApp.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
              //Add to users table
              var pushedUser = firebase.database().ref('users/' + user.uid).set({
                role: "Teacher",
                fullname: txtfName
              });
              //Add name and default dp to the Autherization table
              user.updateProfile({
                displayName: txtfName,
                photoURL: "default_dp",
                disabled: true
              });
              //Array of entities
              var entity = ["TID", "fullname", "password"];
              var pushedRef = firebase.database().ref('Teachers/' + user.uid).update({
                [entity[0]]: txtTID,
                [entity[1]]: txtfName,
                [entity[2]]: txtPassword
              });
              $('#alert-success').removeClass('hide');
              secondaryApp.auth().signOut();
            }, function(error) {
              // An error happened.
              var errorCode = error.code;
              var errorMessage = error.message;
            });

            $('#datatable-buttons').DataTable().row($(this).closest("tr")).remove().draw();
          });
          //END SAVE ADDED Teacher ROW
          // END ADD ROW Teacher


          //DELETE STUDENT
          $("#datatable-buttons").on("mousedown", "td .fa.fa-minus-square", function(e) {
            //clicked row
            var $row = $(this).closest("tr");
            //get first value in td (SN)
            var firsttd = $row.find("td:nth-child(2)").html();
            //get the key in db of clicked row
            rootRef.orderByChild("SN").equalTo(firsttd).on("child_added", function(snapshot) {
              //Update in database
              rootRef.child(snapshot.key).remove();
              firebase.database().ref('users').child(snapshot.key).remove();
            });
            $('#datatable-buttons').DataTable().row($(this).closest("tr")).remove().draw();
          });
        } else if (role == "Teacher") {
          window.location = 'upload-grades.html';
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

});
