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



  //create references
  const year = document.getElementById("year").innerHTML;
  const yearChild = year.charAt(6);

  const rootRef = firebase.database().ref().child('Subjects/' + yearChild);

  const txtEmail = document.getElementById('txtEmail');
  const btnLogin = document.getElementById('btnLogin');
  const btnLogout = document.getElementById('btnLogout');
  const btnLogout2 = document.getElementById('btnLogout2');
  



  // SUBMIT LOGOUT EVENT
  btnLogout.addEventListener('click', e  => {
    firebase.auth().signOut();
    console.log("Sign-out successful.");
});
  // SUBMIT LOGOUT EVENT
  btnLogout2.addEventListener('click', e  => {
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
      window.location = 'index.html';
    }
  });

//Upload Files here
const btnUpload = document.getElementById('uploadButton');

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


  rootRef.on("child_added", snap => {
     
    var subCode = snap.child("subjectCode").val();
    var subName = snap.child("subjectName").val();
    var subTeacherID = snap.child("subjectTeacherID").val();
    //Get the parent key of editing row
    rootRef.orderByChild("subjectCode").equalTo(subCode).on("child_added", function(snapshot) {
      var parentKey = snapshot.key;
    $("#datatable-buttons").DataTable().row.add([parentKey,subCode, subName, subTeacherID, '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
    });
  });

  rootRef.on("child_changed", snap => {
     
    var subCode = snap.child("subjectCode").val();
    var subName = snap.child("subjectName").val();
    var subTeacherID = snap.child("subjectTeacherID").val();
    //Get the parent key of editing row
    rootRef.orderByChild("subjectCode").equalTo(subCode).on("child_added", function(snapshot) {
      var parentKey = snapshot.key;
    $("#datatable-buttons").DataTable().row.data([parentKey,subCode, subName, subTeacherID, '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
    });
  });


  rootRef.on("child_removed", snap => {
     
    var subCode = snap.child("subjectCode").val();
    var subName = snap.child("subjectName").val();
    var subTeacherID = snap.child("subjectTeacherID").val();
    //Get the parent key of editing row
    rootRef.orderByChild("subjectCode").equalTo(subCode).on("child_added", function(snapshot) {
    var parentKey = snapshot.key;
    $("#datatable-buttons").DataTable().row.remove([parentKey,subCode, subName, subTeacherID, '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
    });
  });


// START ADD ROW STUDENT
    const btnAddSubject = document.getElementById('btnAddSubject');

    var t = $('#datatable-buttons').DataTable();
 
    btnAddSubject.addEventListener('click', e  => {
        t.row.add( [
            "",
            '<input id="txtsubCode" type="text" class="form-control" width="100%">',
            '<input id="txtsubName" type="text" class="form-control" width="100%">',
            '<input id="txtsubTeacher" type="text" class="form-control" width="100%">',
            '<i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i>'
        ] ).draw( false );
    } );
    //START SAVE ADDED STUDENT ROW
    $("#datatable-buttons").on('mousedown.add', "i.fa.fa-plus", function(e) {
        $(this).removeClass().addClass("fa fa-pencil-square");
        //get value of each td
          var txtsubCode = $('#txtsubCode').val();
          var txtsubName = $('#txtsubName').val();
          var txtsubTeacher = $('#txtsubTeacher').val();
        //Array of entities 
          var entity = ["subjectCode","subjectName", "subjectTeacherID"];
        //Update in database
          rootRef.push({
              [entity[0]]: txtsubCode,
              [entity[1]]: txtsubName,
              [entity[2]]: txtsubTeacher
           }); 

     $('#datatable-buttons').DataTable().row($(this).closest("tr")).remove().draw();
      });   
    //END SAVE ADDED STUDENT ROW

// END ADD ROW STUDENT

// START DATA EDIT
      //DELETE TeacherID
      $("#datatable-buttons").on("mousedown", "td .fa.fa-minus-square", function(e) {

        //clicked row
        var $row = $(this).closest("tr");
        //get first value in td (TID)
        var firsttd = $row.find("td:nth-child(2)").html();
        //get the key in db of clicked row
          rootRef.orderByChild("subjectCode").equalTo(firsttd).on("child_added", function(snapshot) {
        //Update in database
          rootRef.child(snapshot.key).remove();

        });


        $('#datatable-buttons').DataTable().row($(this).closest("tr")).remove().draw();
      });
      //EDIT Teacher
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
      //SAVE Teacher
      $("#datatable-buttons").on('mousedown.save', "i.fa.fa-envelope-o", function(e) {
        
        $(this).removeClass().addClass("fa fa-pencil-square");
        //clicked row
        var $row = $(this).closest("tr");
        //get all td's in row
        var $tds = $row.find("td").not(':first').not(':last');
        //get first value in td (parentKey (hidden))
        var parentKey = $row.find(".sorting_1").html();
        // loop all td    
        $.each($tds, function(i, el) {
        //get value of each td
          var txt = $(this).find("input").val();
          $(this).html(txt);
        //Array of entities
          var entity = ["subjectCode","subjectName", "subjectTeacherID"];
        //Update in database
          var pushedRef = firebase.database().ref('Subjects/' + yearChild + '/' + parentKey).update({ [entity[i]]: txt }); 

          });
      });     

});