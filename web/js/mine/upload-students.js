"use strict";
var selectedFile;

$(document).ready(function() {
  $("#uploadFirebaseA").hide();
  $("#alert-success").hide();
  $("#tableCSV").hide();
  $("#status").fadeOut(); // will first fade out the loading animation
  $("#preloader").delay(500).fadeOut("slow"); // will fade out the white DIV that covers the website.
          //DATA START! ==============
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
  const refStudents = database.ref().child('Students/');
  const refSections = database.ref().child('Sections/');

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
      console.log(firebaseUser);
      console.log("You are now logged in. \n UID: " + firebaseUser.uid + "\n Name: " + firebaseUser.displayName);

      var currentUser = firebaseUser;

      const refUsers = database.ref().child('users/' + firebaseUser.uid);
      refUsers.once("value", function(snapshot) {
        var data = snapshot.val();
        console.log(data);
        var userID = snapshot.key;
        var role = snapshot.child("role").val();
        console.log(role);
        // IF THE USER IS AN ADMIN, USE THIS
        if (role == "Admin") {


          
          //INSERT HEADER
          $('#sectionData').on('change', function() {
            $('#tableCSV').remove();
            $('#datatable-buttons').DataTable().clear().draw();
            var sectionName = $('#sectionData').val();
            refSections.orderByChild("secName").equalTo(sectionName).once("child_added", function(snapshot) {
              var sectionCode = snapshot.child("sectionCode").val();

              const rootRef = database.ref('Students').orderByChild("sectionCode").equalTo(sectionCode);


              rootRef.on("child_added", snap => {
                var SN = snap.child("SN").val();
                var name = snap.child("fullName").val();
                var grade = snap.child("grade").val();
                //Get the parent key of editing row

                $("#datatable-buttons").DataTable().row.add([SN, name, grade, sectionName, '<button id="btnResetPw" type="button" class="btn btn-sm btn-secondary mr-2">Reset Password</button>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();

              });

              rootRef.on("child_changed", snap => {
                var SN = snap.child("SN").val();
                var name = snap.child("fullName").val();
                var grade = snap.child("grade").val();
                //Get the parent key of editing row

                $("#datatable-buttons").DataTable().row.data([SN, name, grade, sectionName, '<button id="btnResetPw" type="button" class="btn btn-sm btn-secondary mr-2">Reset Password</button>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();

              });
              rootRef.on("child_removed", snap => {
                var SN = snap.child("SN").val();
                var name = snap.child("fullName").val();
                var grade = snap.child("grade").val();
                //Get the parent key of editing row

                $("#datatable-buttons").DataTable().row.remove([SN, name, grade, sectionName, '<button id="btnResetPw" type="button" class="btn btn-sm btn-secondary mr-2">Reset Password</button>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();

              });
            });
//             // Wrap the colspan'ing header cells with a span so they can be positioned
//             // absolutely - filling the available space, and no more.
//             $('#datatable-buttons thead th[colspan]').wrapInner('<span/>').append('&nbsp;');

//             // Standard initialisation
//             $('#datatable-buttons').DataTable({
//               responsive: true,
//               paging: false
//             });
          });
          /* rootRef.on("child_added", function(snap) {
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
                    searching: true,
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
         
 */
          //CSV TO TEXTBOX
          const uploadCSV = document.getElementById('uploadCSVaccounts');
          uploadCSV.addEventListener('click', e => {
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
                    for (var j = 0; j < cells.length - 1; j++) {
                      var cell = row.insertCell(-1);
                      cell.innerHTML = '<input type="text" id="row' + i + 'cell' + j + '" class="row' + i + '" value="' + cells[j] + '" disabled="disabled">';
                    }
                  }
                  for (var i = 1; i < rows.length - 1; i++) {
                    var row = table.insertRow(-1);
                    var cells = rows[i].split(",");
                    for (var j = 0; j < cells.length - 1; j++) {
                      var cell = row.insertCell(-1);
                      cell.innerHTML = '<input type="text" id="row' + i + 'cell' + j + '" class="row' + i + '" value="' + cells[j] + '" disabled="disabled">';
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
            var $rowData = $('#tableCSVaccounts').find('> tbody > tr').not(':last');
            var entity = ["SN", "fullName", "grade", "sectionCode", "password"];
            $.each($rowData, function(i, el) {
              var x = i + 1;
              var studentID = $('#row' + x + 'cell0').val();
              var fullName = $('#row' + x + 'cell1').val();
              var gradeLevel = $('#row' + x + 'cell2').val();
              var section = $('#row' + x + 'cell3').val();
              var password = $('#row' + x + 'cell4').val();
              var email = studentID + "@jcfc-gradebook.com";
              console.log(email + password);

              secondaryApp.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
                refSections.orderByChild("secName").equalTo(section).once("child_added", function(snapshot) {
                  var sectionCode = snapshot.child("sectionCode").val();
                  //Update in database
                  const refStudentsUp = database.ref().child('Students/' + user.uid);
                  refStudentsUp.update({
                    [entity[0]]: studentID,
                    [entity[1]]: fullName,
                    [entity[2]]: gradeLevel,
                    [entity[3]]: sectionCode,
                    [entity[4]]: password
                  }).then(function() {
                    $('#alert-success').removeClass('hide');
                  }).catch(function(error) {
                    $('#alert-danger').removeClass('hide');
                  });
                });
              });
            });
          });
          //SELECT SECTION
          refSections.on("child_added", function(snapshot) {
            var secName = snapshot.child("secName").val();
            $('#sectionData').append('<option value="' + secName + '">' + secName + '</option>');
          });
          // START ADD ROW STUDENT
          const btnAddStud = document.getElementById('btnAddStud');
          var t = $('#datatable-buttons').DataTable();
          btnAddStud.addEventListener('click', e => {
            var selectSection = gidGenerator();
            t.row.add([
              '<input id="txtSN" type="text" class="form-control" width="100%">',
              '<input id="txtfName" type="text" class="form-control" width="100%">',
              '<input id="txtGrlevel" type="text" class="form-control" width="100%">',
              '<select id="' + selectSection + '" class="form-control"></select>',
              '<i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i>'
            ]).draw(false);

            //SELECT SECTION
            refSections.on("child_added", function(snapshot) {
              var secName = snapshot.child("secName").val();
              var sectionCode = snapshot.child("sectionCode").val();
              $("#datatable-buttons td:nth-child(4) select").append('<option value="' + sectionCode + " | " + secName + '">' + sectionCode + " | " + secName + '</option>');
            });
          });
          //START SAVE ADDED STUDENT ROW
          $("#datatable-buttons").on('mousedown.add', "i.fa.fa-plus", function(e) {
            var $row = $(this).closest("tr").off("mousedown");
            //get value of each td
            var txtSN = $row.find("#txtSN").val();
            var txtfName = $row.find("#txtfName").val();
            var txtGrlevel = $row.find("#txtGrlevel").val();
            var selectSection = $row.find("td:nth-child(4) select").val();
            var arr = selectSection.split('|');
            const sectionCode = $.trim(arr[0]);
            var password = '123456';
            var email = txtSN + "@jcfc-gradebook.com";
            //Array of entities
            var entity = ["SN", "fName", "grLevel", "sectionCode", "password"];
            secondaryApp.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
              var user = secondaryApp.auth().currentUser;
              //  logUser(user); // Optional
              //Add name and default dp to the Autherization table
              user.updateProfile({
                displayName: txtfName,
                photoURL: "default_dp",
                disabled: true
              });
              //Array
              //Update in database
              const refStudents = database.ref().child('Students/' + user.uid);
              var pushStudent = {};
              pushStudent = {
                [entity[0]]: txtSN,
                [entity[1]]: txtfName,
                [entity[2]]: txtGrlevel,
                [entity[3]]: sectionCode,
                [entity[4]]: password
              };
              refStudents.update(pushStudent).then(function() {
                $('#alert-success-add-student').removeClass('hide');
              }).catch(function(error) {
                $('#alert-danger-add-student').removeClass('hide');
              });
              $(this).removeClass().addClass("fa fa-pencil-square");
              $('#datatable-buttons').DataTable().row($(this).closest("tr")).remove().draw();
            });
          });
          // START DATA EDIT
          $("#datatable-buttons").on("mousedown", "td .fa.fa-minus-square", function(e) {
            //clicked row
            var $row = $(this).closest("tr");
            var SN = $row.find("td:nth-child(1)").html();
            var fullName = $row.find("td:nth-child(2)").html();
            //REMOVE SECTION
            refStudents.orderByChild("SN").equalTo(SN).on("child_added", function(snapshot) {
              //Update in database
              refStudents.child(snapshot.key).remove().then(function() {
                    $('#alert-danger-remove-student').addClass('hide');
                    $('#alert-success-remove-student').removeClass('hide');
                    $('#nameOfStudent').html(fullName);
                  }).catch(function(error) {
                    $('#alert-success-remove-student').addClass('hide');
                    $('#alert-danger-remove-student').removeClass('hide');
                  });
                });

            $('#datatable-buttons').DataTable().row($row).remove().draw();
          });
          //EDIT
          $("#datatable-buttons").on('mousedown.edit', "i.fa.fa-pencil-square", function(e) {

            $(this).removeClass().addClass("fa fa-envelope-o");
            var $row = $(this).closest("tr").off("mousedown");
            var $tds = $row.find("td").not(':first').not(':last').not('td:nth-child(3)').not('td:nth-child(4)').not('td:nth-child(5)');
            var section = $row.find('td:nth-child(4)').text();
            var gradeLevel = $row.find('td:nth-child(3)').text();
            //INPUTS
            $.each($tds, function(i, el) {
              var txt = $(this).text();
              $(this).html("").append("<input type='text' class='form-control' size='15' value=\"" + txt + "\">");
            });
            //SECTIONS
            $row.find('td:nth-child(4)').html("").append('<select id="selectSection" class="form-control" width="30%"></select>');
            refSections.on("child_added", function(snapshot) {
            var secName = snapshot.child("secName").val();
            $('#selectSection').append('<option value="' + secName + '">'+secName+'</option>');
            $('#selectSection').find('option[value='+section+']').attr('selected','selected');
            });
            //GRADE LEVEL
            $row.find('td:nth-child(3)').html("").append('<select id="selectGradeLevel" class="form-control" width="30%"></select>');
            var grades = [];
            refSections.on('child_added', snap => {
              var secGrade = snap.child("secGrade").val();
              console.log(snap.val());
                if (grades.includes(secGrade)) {
                  console.log("Grade level exists already.");
                }
                else{
                  $('#selectGradeLevel').append('<option value="' + secGrade + '">'+secGrade+'</option>');
                  grades.push(secGrade);
                }
            });
            $('#selectGradeLevel').find('option[value='+gradeLevel+']').attr('selected','selected');
          });

          $("#datatable-buttons").on('mousedown', "input", function(e) {
            e.stopPropagation();
          });

          //SAVE EDIT
          $("#datatable-buttons").on('mousedown.save', "i.fa.fa-envelope-o", function(e) {

            $(this).removeClass().addClass("fa fa-pencil-square");
            //clicked row
            var $row = $(this).closest("tr");
            //get values
            var parentKey = $row.find(".sorting_1").html();
            var fullName = $row.find("td input").val();
            var gradeLevel = $('#selectGradeLevel').val();
            var section = $('#selectSection').val();
            alert(fullName);
            //Array of entities
            var entity = ["fullName", "grade", "sectionCode"];
            refSections.orderByChild("secName").equalTo(section).once("child_added", function(snapshot) {
              var sectionCode = snapshot.child("sectionCode").val();
               //Update in database
              const refSectionEdit = database.ref().child('Sections/' + parentKey);
              refSectionEdit.update({
                [entity[0]]: fullName,
                [entity[1]]: gradeLevel,
                [entity[2]]: sectionCode
              }).then(function() {
                $('#alert-danger-edit').addClass('hide');
                $('#alert-success-edit').removeClass('hide');
              }).catch(function(error) {
                $('#alert-success-edit').addClass('hide');
                $('#alert-danger-edit').removeClass('hide');
              });
            });
          });
          //END EDIT
          //END SAVE ADDED STUDENT ROW
          //HIDE ALERTS WHEN CLOSE BUTTON PRESSED
          $('.alert .close').click(function() {
            $(this).parent().addClass('hide');
          });
          //RANDOM CODE
          function gidGenerator() {
            var S4 = function() {
              return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return ("ID" + S4());
          }
          // END ADD ROW STUDENT
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
      window.location = 'index.html';
    }
  })

});