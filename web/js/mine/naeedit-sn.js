"use strict";
var selectedFile;

$(document).ready(function() {
  $("#uploadButton").hide();
});

$(function () {
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
  const btnUpload = document.getElementById('uploadButton');


  // SUBMIT LOGOUT EVENT
  btnLogout.addEventListener('click', e  => {
    firebase.auth().signOut();
    console.log("Sign-out successful.");
});

  // Realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
      console.log("Makalogin ya soy");
    } else {
      console.log("Not logged in");
      window.location = 'login.html';
    }
  });

//Upload Files here
$("#file").on("change", function(event) {
  selectedFile = event.target.files[0];
  $("#uploadButton").show();
});



btnUpload.addEventListener('click', e  => {

  var filename = selectedFile.name;
  //Create a root reference
  var storageRef = firebase.storage().ref('/jsonFiles/' + filename);
  var uploadTask = storageRef.put(selectedFile);

  //Register three observers
  // 1. 'state_changed' observer, called anytime the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', function(snapshot) {
    // Observe state change events such as progress, pause, and resume
  }, function(error) {
    // Handle unsucessful uploads
  }, function() {
    // On complete
    var downloadURL = uploadTask.snapshot.downloadURL;
    console.log(downloadURL);
  });

});

//DATA START! ==============
//DATA RETRIEVAL w/ Jquery

//create references
  const rootRef = firebase.database().ref().child('Students/Section-7A');

  rootRef.on("child_added", snap => {
    var sn = snap.child("SN").val();
    var name = snap.child("fullname").val();
    var lvl = snap.child("Grade").val();
    var pass = snap.child("Password").val();
    var section = snap.child("Section").val();

    $("#datatable-buttons").DataTable().row.add([sn, name, pass, lvl, section, '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
  });

  rootRef.on("child_added", snap => {
    var sn = snap.child("SN").val();
    var name = snap.child("fullname").val();
    var lvl = snap.child("Grade").val();
    var pass = snap.child("Password").val();
    var section = snap.child("Section").val();

    $("#datatable-buttons").DataTable().row([sn, name, pass, lvl, section, '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
  });

  rootRef.on("child_removed", snap => {
    var sn = snap.child("SN").val();
    var name = snap.child("fullname").val();
    var lvl = snap.child("Grade").val();
    var pass = snap.child("Password").val();
    var section = snap.child("Section").val();    
    $("#datatable-buttons").DataTable().row().remove([sn, name, pass, lvl, section,'<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
  });


// START DATA EDIT
var table;

      $("#datatable-buttons").on("mousedown", "td .fa.fa-minus-square", function(e) {

        //clicked row
        var $row = $(this).closest("tr");
        //get first value in td (SN)
        var firsttd = $row.find(".sorting_1").html();
        //get the key in db of clicked row
          rootRef.orderByChild("SN").equalTo(firsttd).on("child_added", function(snapshot) {
        //Update in database
          rootRef.child(snapshot.key).remove();

        });


        table.row($(this).closest("tr")).remove().draw();
      })

      $("#datatable-buttons").on('mousedown.edit', "i.fa.fa-pencil-square", function(e) {

        $(this).removeClass().addClass("fa fa-envelope-o");
        var $row = $(this).closest("tr").off("mousedown");
        var $tds = $row.find("td").not(':first').not(':last');

        $.each($tds, function(i, el) {
          var txt = $(this).text();
          $(this).html("").append("<input type='text' class='form-control' size='15' value=\""+txt+"\">");
        });

      });

      $("#datatable-buttons").on('mousedown', "input", function(e) {
        e.stopPropagation();
      });

      $("#datatable-buttons").on('mousedown.save', "i.fa.fa-envelope-o", function(e) {
        
        $(this).removeClass().addClass("fa fa-pencil-square");
        //clicked row
        var $row = $(this).closest("tr");
        //get all td's in row
        var $tds = $row.find("td").not(':first').not(':last');
        //get first value in td (SN)
        var firsttd = $row.find(".sorting_1").html();
        //get the key in db of clicked row
          rootRef.orderByChild("SN").equalTo(firsttd).on("child_added", function(snapshot) {
        // loop all td    
        $.each($tds, function(i, el) {
        //get value of each td
          var txt = $(this).find("input").val();
          $(this).html(txt);
        //Array of entities
          var entity = ["fName", "password", "grLevel", "section", "genAve"];
        //Update in database
          var pushedRef = firebase.database().ref('Students/Section-7A/' + snapshot.key).update({ [entity[i]]: txt }); 

          });
        });
      });

// END DATA EDIT
      

});
