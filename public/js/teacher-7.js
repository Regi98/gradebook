"use strict";
var selectedFile;

$(document).ready(function() {
  $("#uploadFirebase").hide();
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
  const subject = document.getElementById("subject").innerHTML;
  const section = document.getElementById("section").innerHTML;

  const rootRef = firebase.database().ref().child(subject+'-Grades/' + section);
  const rootRefRetrieve = firebase.database().ref().child(subject+'-Grades/');
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
      console.log("Makalogin ya soy " + firebaseUser.uid +" Name: " + firebaseUser.displayName);
      
      var currentUser = firebaseUser;

//NAV
  const ref = firebase.database().ref('teachers/7/').child(currentUser.uid);
    console.log("curreeenntt"+currentUser.uid);
  ref.once('value').then(function(snapshot) {
    var TID = snapshot.child("TID").val();
    console.log("TID"+snapshot.key);

    var subjects = ["-Kz-SF-sub7001","-Kz-SF-sub7002","-Kz-SF-sub7003","-Kz-SF-sub7004","-Kz-SF-sub7005","-Kz-SF-sub7006"];
    for (var x = 0; x < 5; x++) {
    
    //Get the parent key of editing row
    /*firebase.database().ref().child('subjects/7/'+ subjects[x]).orderByChild("subjectTeacherID").equalTo(TID).once('value').then(function(snapshot) {
      var subjectName = snapshot.child("subjectName").val();
      console.log("kuwa"+subjectName);
      var parentKey = snapshot.key;
      var ul = $('ul#grade-7');
      ul.append('<li><a href="7a.html">'+subjectName+'</a></li>');
    });*/
  }

  });
//DATA START! ==============
//INSERT HEADER
  rootRef.on("child_added", function(snap) {
    var data = snap.val();
    var keys = Object.keys(data);
    var count = Object.keys(data).length;

    var titleArray = [];
    for (var j = 0; j < count; j++) {
    var temp = {};
    temp['title'] = Object.keys(data)[j];
    titleArray.push(temp);
    };

    $('table').DataTable({ 
      destroy: true,
      searching: false,
      "columns": titleArray,
      "aaSorting": []
    });
  });
//INSERT DATA
  rootRef.on("child_added", function(snap) {
    var data = snap.val();
    var arr = Object.values(data);
    console.log(arr);
    console.log(Object.keys(data));

    // Add new row to table
      $("table").DataTable().row.add(arr).draw();
    

});
//CSV TO TEXTBOX
  const uploadCSV = document.getElementById('uploadCSV');
  uploadCSV.addEventListener('click', e  => {
  var fileUpload = document.getElementById("fileUpload");
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
    if (typeof(FileReader) != "undefined") {
      var reader = new FileReader();
      reader.onload = function(e) {
        var table = document.createElement("table");
        table.setAttribute("id", "tblCSV");
        var rows = e.target.result.split("\n");
        for (var i = 0; i < 1; i++) {
          var row = table.insertRow(-1);
          var cells = rows[i].split(",");
          for (var j = 0; j < cells.length-1; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = '<input type="text" id="row'+i+'cell'+j+'" class="row'+i+'" value="'+cells[j]+'" disabled="disabled">';
          }
        }
        for (var i = 1; i < rows.length-1; i++) {
          var row = table.insertRow(-1);
          var cells = rows[i].split(",");
          for (var j = 0; j < cells.length-1; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = '<input type="text" id="row'+i+'cell'+j+'" class="row'+i+'" value="'+cells[j]+'" disabled="disabled">';
          }
        }
        var dvCSV = document.getElementById("dvCSV");
        dvCSV.innerHTML = "";
        dvCSV.appendChild(table);
      }
      reader.readAsText(fileUpload.files[0]);
      $("#uploadFirebase").show();
    } else {
      alert("This browser does not support HTML5.");
    }
  } else {
    alert("Please upload a valid CSV file.");
  }
});



  //upload to db firebase
  const btnUploadFirebase = document.getElementById('uploadFirebase');
  
  btnUploadFirebase.addEventListener('click', e  => {
        var $rowData =  $('#tblCSV').find('> tbody > tr').not(':last');
        $.each($rowData, function(i, el) {
        var x = i + 1;
        var studentID = $('#row'+x+'cell0').val();
        var $rowFirst = $("table:first").find("tr:first");
        var $rowNext = $('#tblCSV tr').eq(x);
        //get all td's in row
        var $tdsFirst = $rowFirst.find("td");

        // loop all td    
        $.each($tdsFirst, function(i, el) {
        //get value of each td
          var txtEntity = $(this).find("input").val();
          var $rowNext = $('#tblCSV tr').eq(x);
          var $tdsNext = $rowNext.find("td:eq("+i+")");

            $.each($tdsNext, function(i, el) {
            //get value of each td
              var txtValue = $(this).find("input").val();

            //Update in database
              var pushedRef = firebase.database().ref(subject+'-Grades/' + section+'/' + studentID).update({ [txtEntity]: txtValue }); 
              });

            });
        });
  });

    } else {
      console.log("Not logged in");
      window.location = 'index.html';
    }
  })

});