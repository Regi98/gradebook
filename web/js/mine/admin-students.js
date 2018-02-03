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
  const sec = document.getElementById("section").innerHTML;
  const sectionChild = sec.charAt(18);

  const rootRef = firebase.database().ref().child('Students/Section-7' + sectionChild);

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


//DATA START! ==============
//DATA RETRIEVAL w/ Jquery


  rootRef.on("child_added", snap => {
     
    var sn = snap.child("SN").val();
    var name = snap.child("fullname").val();
    var lvl = snap.child("Grade").val();
    var section = snap.child("Section").val();
    
    //Get the parent key of editing row
    rootRef.orderByChild("SN").equalTo(sn).on("child_added", function(snapshot) {
    var parentKey = snapshot.key;
    $("#datatable-buttons").DataTable().row.add([parentKey, sn, name, lvl, section, '<button id="btnResetPw" type="button" class="btn btn-danger">Reset Password</button>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
    });
  });

  rootRef.on("child_changed", snap => {
     
    var sn = snap.child("SN").val();
    var name = snap.child("fName").val();
    var lvl = snap.child("grLevel").val();
    var section = snap.child("section").val();
    
    //Get the parent key of editing row
    rootRef.orderByChild("SN").equalTo(sn).on("child_changed", function(snapshot) {
      var parentKey = snapshot.key;
    $("#datatable-buttons").DataTable().row.data([parentKey, sn, name, lvl, section, '<button id="btnResetPw" type="button" class="btn btn-danger">Reset Password</button>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
    });
  });


  rootRef.on("child_removed", snap => {
     
    var sn = snap.child("SN").val();
    var name = snap.child("fName").val();
    var lvl = snap.child("grLevel").val();
    var section = snap.child("section").val();
    
    //Get the parent key of editing row
    rootRef.orderByChild("SN").equalTo(sn).on("child_added", function(snapshot) {
      var parentKey = snapshot.key;
    $("#datatable-buttons").DataTable().row.remove([parentKey,sn, name, lvl, section, '<button id="btnResetPw" type="button" class="btn btn-danger">Reset Password</button>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
    });
  });


// START ADD ROW STUDENT
    const btnAddStud = document.getElementById('btnAddStud');
    var t = $('#datatable-buttons').DataTable();
    btnAddStud.addEventListener('click', e  => {
        t.row.add( [
            "",
            '<input id="txtSN" type="text" class="form-control" width="100%">',
            '<input id="txtfName" type="text" class="form-control" width="100%">',
            '<input id="txtGrlevel" type="text" class="form-control" width="100%">',
            '<select id="selectSection" class="form-control"><option value="A">A</option><option value="B">B</option><option value="C">C</option></select>',
            '<input id="txtPassword" type="text" class="form-control" width="100%">',
            '<i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i>'
        ] ).draw( false );
    } );
    //START SAVE ADDED STUDENT ROW
    $("#datatable-buttons").on('mousedown.add', "i.fa.fa-plus", function(e) {
        $(this).removeClass().addClass("fa fa-pencil-square");
        //get value of each td
          var txtSN = $('#txtSN').val();
          var txtfName = $('#txtfName').val();
          var txtGrlevel = $('#txtGrlevel').val();
          var selectedSection = $('#selectSection').find(":selected").text();
          var txtPassword = $('#txtPassword').val();
        //Array of entities
          var entity = ["SN","fullname","Grade", "Section","Password" ];
        //Update in database
          rootRef.push({
              [entity[0]]: txtSN,
              [entity[1]]: txtfName,
              [entity[2]]: txtGrlevel,
              [entity[3]]: selectedSection,
              [entity[4]]: txtPassword
           }); 
    // Firebase Authentication
    var email = txtSN + "@gmail.com"
    var password = txtPassword;
    console.log(email + password);

    firebase.auth().createUserWithEmailAndPassword(email, txtPassword).catch(function(error) {
    console.log("error!");
    var errorCode = error.code;
    var errorMessage = error.message;
  });


     $('#datatable-buttons').DataTable().row($(this).closest("tr")).remove().draw();
      });   
    //END SAVE ADDED STUDENT ROW

// END ADD ROW STUDENT

// START DATA EDIT
      //RESET PASSWORD
      $("#datatable-buttons").on("mousedown", "td #btnResetPw", function(e) {
        var $row = $(this).closest("tr");
        //get first value in td (SN)
        var firsttd = $row.find("td:nth-child(2)").html();
        //get the key in db of clicked row
          rootRef.orderByChild("SN").equalTo(firsttd).on("child_added", function(snapshot) {
        //Update in database
        var pushedRef = firebase.database().ref('Students/Section-7' + sectionChild +'/' + snapshot.key).update({ password: "" }); 
        //Auth Change pass
        var email = firsttd + "gmail.com"
        var user = firebase.auth().email;
        var newPassword = "1234546";

        admin.auth().getUser(email).updatePassword(newPassword)
  .then(function(userRecord) {
    // See the tables below for the contents of userRecord
    console.log("Successfully fetched user data:", userRecord.toJSON());
  })
  .catch(function(error) {
    console.log("Error fetching user data:", error);
    })

        });
      });
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
        });
        $('#datatable-buttons').DataTable().row($(this).closest("tr")).remove().draw();
      });
      //EDIT STUDENT
      $("#datatable-buttons").on('mousedown.edit', "i.fa.fa-pencil-square", function(e) {

        $(this).removeClass().addClass("fa fa-envelope-o");
        var $row = $(this).closest("tr").off("mousedown");
        var $tds = $row.find("td").not(':first').not(':last').not('td:nth-child(5)').not('td:nth-child(6)');
        $.each($tds, function(i, el) {
          var txt = $(this).text();
          $(this).html("").append("<input type='text' class='form-control' size='15' value=\""+txt+"\">");
        });
        var selectedSection = $row.find('td:nth-child(5)').html();
         $row.find('td:nth-child(5)').html("").append('<select id="selectSection" class="form-control"><option value="A">A</option><option value="B">B</option><option value="C">C</option></select>');
         $('#selectSection').find('option[value='+selectedSection+']').attr('selected','selected');
      });
      $("#datatable-buttons").on('mousedown', "input", function(e) {
        e.stopPropagation();
      });

      //SAVE EDTIED
      $("#datatable-buttons").on('mousedown.save', "i.fa.fa-envelope-o", function(e) {
        
        $(this).removeClass().addClass("fa fa-pencil-square");
        //clicked row
        var $row = $(this).closest("tr");
        //get all td's in row
        var $tds = $row.find("td").not(':first').not(':last').not('td:nth-child(5)').not('td:nth-child(6)');
        //get first value in td (parentKey (hidden))
        var parentKey = $row.find(".sorting_1").html();
        //Array of entities
        var entity = ["SN","fullname","Grade", "Section"];  
        // loop all td    
        $.each($tds, function(i, el) {
        //get value of each td
          var txt = $(this).find("input").val();
          $(this).html(txt);
        //Update in database
          var pushedRef = firebase.database().ref('Students/Section-7' + sectionChild +'/' + parentKey).update({ [entity[i]]: txt }); 
          });
          var selectedSection = $('#selectSection').find(":selected").text();
          var pushedRef = firebase.database().ref('Students/Section-7' + sectionChild +'/' + parentKey).update({ section: selectedSection }); 
          $row.find('td:nth-child(5)').html(selectedSection);

          if(selectedSection != sectionChild) {
            //get value of each td
              var tdSN = $row.find('td:nth-child(2)').html();
              var tdfName = $row.find('td:nth-child(3)').html();
              var tdGrlevel = $row.find('td:nth-child(4)').html();
              var tdSection = $row.find('td:nth-child(5)').html();             
            //Array of entities
              var entity = ["SN","fullname","Grade", "Section"];
            //Update in database
              firebase.database().ref('Students/Section-7' + tdSection).push({
                  [entity[0]]: tdSN,
                  [entity[1]]: tdfName,
                  [entity[2]]: tdGrlevel,
                  [entity[3]]: tdSection
               }); 

              var sections = ["Section-7A1","Section-7A2","Section-7A3"];
              for (var x = 0; x < 5; x++) {              
              var tdKey = $row.find('td:nth-child(1)').html();
              
              if (tdKey != undefined) {
              firebase.database().ref('Students/Section-7' + sections[x]).child(tdKey).remove();
            $row.remove();
            }
          }
          }
      });     

});