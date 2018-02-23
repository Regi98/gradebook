"use strict";
var selectedFile;

$(document).ready(function() {
  $("#uploadFirebaseA").hide();
  $("#alert-success").hide();
  $("#tableCSV").hide();
  $("#status").fadeOut(); // will first fade out the loading animation
  $("#preloader").delay(500).fadeOut(1000, function() {
    $(this).remove()
  }); // will fade out the white DIV that covers the website.

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
      var currentUser = firebaseUser;
      console.log(currentUser);
      console.log("You are now logged in. \n UID: " + currentUser.uid + "\n Name: " + currentUser.displayName);

      const refUsers = firebase.database().ref().child('users/' + currentUser.uid);
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

          //SELECT DISPLAY STUDENTS
          $('#sectionData').on('change', function() {
            $('#tableCSV').remove();
            $('#datatable-buttons').DataTable().clear().draw();
            var sectionName = $('#sectionData').val();
            refSections.orderByChild("secName").equalTo(sectionName).once("child_added", function(snapshot) {
              var sectionCode = snapshot.child("sectionCode").val();

              const rootRef = database.ref('Students').orderByChild("sectionCode").equalTo(sectionCode);

              rootRef.on("child_added", snap => {
                var SN = snap.child("SN").val();
                var email = snap.child("email").val();
                var name = snap.child("fullName").val();
                var grade = snap.child("grade").val();
                //Get the parent key of editing row

                $("#datatable-buttons").DataTable().row.add([SN, name, grade, sectionName, email, '<button id="btnResetPw" type="button" class="btn btn-sm btn-secondary mr-2">Reset Password</button>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();

              });

              rootRef.on("child_changed", snap => {
                var SN = snap.child("SN").val();
                var email = snap.child("email").val();
                var name = snap.child("fullName").val();
                var grade = snap.child("grade").val();
                //Get the parent key of editing row

                $("#datatable-buttons").DataTable().row().data([SN, name, grade, sectionName, email, '<button id="btnResetPw" type="button" class="btn btn-sm btn-secondary mr-2">Reset Password</button>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();

              });
              rootRef.on("child_removed", snap => {
                var SN = snap.child("SN").val();
                var email = snap.child("email").val();
                var name = snap.child("fullName").val();
                var grade = snap.child("grade").val();
                //Get the parent key of editing row

                $("#datatable-buttons").DataTable().row().remove([SN, name, grade, sectionName, email, '<button id="btnResetPw" type="button" class="btn btn-sm btn-secondary mr-2">Reset Password</button>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();

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
          //SELECT SECTION UPLOAD
          $('#sectionDataUp').on('change', function() {
            $("#uploadFirebaseA").hide();
          });
          //SELECT SECTION
          refSections.on("child_added", function(snapshot) {
            var secName = snapshot.child("secName").val();
            var sectionCode = snapshot.child("sectionCode").val();
            var sectionGrade = snapshot.child("secGrade").val();
            $('#sectionDataUp').append('<option value="' + sectionCode + " | " + sectionGrade + '">' + sectionCode + " | " + secName + '</option>');
          });
          //CSV TO TEXTBOX
          const uploadCSV = document.getElementById('uploadCSVaccounts');
          uploadCSV.addEventListener('click', e => {
            var selectSection = $('#sectionDataUp').val();
            var fileUpload = document.getElementById("fileUploadAccounts");
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv)$/;
            if (selectSection != null) {
              if (regex.test(fileUpload.value.toLowerCase())) {
                if (typeof(FileReader) != "undefined") {
                  var reader = new FileReader();
                  reader.onload = function(e) {
                    var table = document.createElement("table");
                    table.setAttribute("id", "tableCSVaccounts");
                    var rows = e.target.result.split("\n");
                    // for (var i = 0; i < 1; i++) {
                    //   var row = table.insertRow(-1);
                    //   var cells = rows[i].split(",");
                    //   for (var j = 0; j < cells.length - 1; j++) {
                      //     var cell = row.insertCell(-1);
                    //     var replaced = cells[j].replace(/[^a-z0-9\s]/gi, '');
                    //     var value = $.trim(replaced);
                    //     cell.innerHTML = '<input type="text" id="row' + i + 'cell' + j + '" class="row' + i + '" value="' + value + '" disabled="disabled">';
                    //   }
                    // }
                    for (var i = 1; i < rows.length - 1; i++) {
                      var row = table.insertRow(-1);
                      var cells = rows[i].split(",");
                      for (var j = 0; j < cells.length - 1; j++) {
                        var cell = row.insertCell(-1);
                        var replaced = cells[j].replace(/[^a-z0-9\s]/gi, '');
                        var value = $.trim(replaced);
                        if (value.length == 0) {
                          $(this).remove();
                        } else {
                          cell.innerHTML = '<input type="text" id="row' + i + 'cell' + j + '" class="row' + i + '" value="' + value + '" disabled="disabled">';
                        }
                      }
                    }
                    var dvCSV = document.getElementById("tableCSV");
                    dvCSV.innerHTML = "";
                    dvCSV.appendChild(table);
                    $('#alert-boxes').append('<div class="alert alert-info alert-dismissable"> CSV file has been loaded.</div>');
                    $('.alert-info').delay(4000).fadeOut('slow');
                  }
                  reader.readAsText(fileUpload.files[0]);
                  $("#uploadFirebaseA").show();
                } else {
                  $('#alert-boxes').append('<div class="alert alert-danger alert-dismissable">  This browser doesn\'t support HTML5</div>');
                  $('.alert-danger').delay(4000).fadeOut('slow');
                }
              } else {
                $('#alert-boxes').append('<div class="alert alert-danger alert-dismissable">  Please upload a valid CSV file. </div>');
                $('.alert-danger').delay(4000).fadeOut('slow');
              }
            } else {
              $('#alert-boxes').append('<div class="alert alert-danger alert-dismissable">  Please select a section. </div>');
              $('.alert-danger').delay(4000).fadeOut('slow');
            }
          });
          //upload to db firebase
          const btnUploadFirebase = document.getElementById('uploadFirebaseA');
          btnUploadFirebase.addEventListener('click', e => {
            var selectSection = $('#sectionDataUp').val();
            var arr = selectSection.split('|');
            const sectionCode = $.trim(arr[0]);
            const secGrade = $.trim(arr[1]);
            var $rowData = $('#tableCSVaccounts').find('> tbody > tr');
            var rowCount = $('#tableCSVaccounts').find('> tbody > tr').length;
            $.each($rowData, function(i, el) {
              var x = i + 1;
              var studentID = $('#row' + x + 'cell0').val();
              var fullName = $('#row' + x + 'cell1').val();
              var section = sectionCode;
              $.post("/createUserStudent", {
                user: studentID,
                name: fullName,
                section: sectionCode,
                grLevel: secGrade
              }, function(data) {
                if (data === 'Submitted') {
                  var x = i+1;
                  if(x  == rowCount) {
                    $('#alert-boxes').append('<div class="alert alert-success alert-dismissable student"><strong>Success!</strong> '+x+' Student Accounts has been uploaded.</div>');
                     $('.alert-success.student').delay(4000).fadeOut('slow');
                  }
                } else {
                  $('#alert-boxes').append('<div class="alert alert-danger alert-dismissable"> &nbsp;' + data + '</div>');
                  $('.alert-danger').delay(4000).fadeOut('slow');

                }
              });
            });
          });
          //SELECT SECTION
          refSections.on("child_added", function(snapshot) {
            var secName = snapshot.child("secName").val();
            var sectionCode = snapshot.child("sectionCode").val();
            $('#sectionData').append('<option value="' + secName + '">' + sectionCode + " | " + secName + '</option>');
          });
          // START ADD ROW STUDENT
          const btnAddStud = document.getElementById('btnAddStud');
          var t = $('#datatable-buttons').DataTable();
          btnAddStud.addEventListener('click', e => {
            var selectSection = gidGenerator();
            t.row.add([
              '<input id="txtSN" type="number" class="form-control" placeholder="Student ID">',
              '<input id="txtfName" type="text" class="form-control" placeholder="Fullname">',
              '<input id="txtGrlevel" type="number" class="form-control" placeholder="Grade Level" disabled>',
              '<select id="' + selectSection + '" class="form-control"></select>',
              '<input id="email" type="number" class="form-control" disabled>',
              '<input id="password" type="text" class="form-control" disabled>',
              '<i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i>'
            ]).draw(false);
            //SELECT SECTION
            refSections.on("child_added", function(snapshot) {
              var secName = snapshot.child("secName").val();
              var sectionCode = snapshot.child("sectionCode").val();
              var secGrade = snapshot.child("secGrade").val();
              $("#datatable-buttons td:nth-child(4) select").append('<option value="' + sectionCode + " | " + secGrade + '">' + sectionCode + " | " + secName + '</option>');
            });
          });
          //START SAVE ADDED STUDENT ROW
          $("#datatable-buttons").on('mousedown.add', "i.fa.fa-plus", function(e) {
            var $row = $(this).closest("tr").off("mousedown");
            //get value of each td
            var txtSN = $row.find("#txtSN").val();
            var txtfName = $row.find("#txtfName").val();
            var selectSection = $row.find("td:nth-child(4) select").val();
            var arr = selectSection.split('|');
            const sectionCode = $.trim(arr[0]);
            const grLevel = $.trim(arr[1]);
            var password = '123456';
            var email = txtSN + "@jcfc-gradebook.com";
            //Array of entities
            $.post("/createUserStudent", {
              user: txtSN,
              password: password,
              name: txtfName,
              section: sectionCode,
              grLevel: grLevel
            }, function(data) {
              if (data === 'Submitted') {
                $('#alert-boxes').append('<div class="alert alert-success alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success!</strong> 1 Student Account has been uploaded.</div>');
                $('.alert-success').delay(4000).fadeOut('slow');
              } else {
                $('#alert-boxes').append('<div class="alert alert-danger alert-dismissable"> &nbsp;' + data + '</div>');
                $('.alert-danger').delay(4000).fadeOut('slow');
              }
            });
            //Array

            $(this).removeClass().addClass("fa fa-pencil-square");
            $('#datatable-buttons').DataTable().row($(this).closest("tr")).remove().draw();

          });
          //RESET PASS
          $("#datatable-buttons").on('mousedown', "button.btn.btn-sm.btn-secondary.mr-2", function(e) {
            var $row = $(this).closest("tr").off("mousedown");
            var studentID = $row.find("td:nth-child(1)").html();
            var fullName = $row.find("td:nth-child(2)").html();
            var randomPass = passGenerator();
            $.confirm({
              title: 'Password Reset!',
              content: 'Are you sure you want to reset <br>' + studentID + " | " + fullName + '\'s password?',
              type: 'orange',
              closeIcon: true,
              buttons: {
                confirm: {
                  btnClass: 'btn-green',
                  action: function() {
                    var self = this;
                    return $.post("/updateUserPwStudent", {
                      user: studentID,
                      name: fullName,
                      password: randomPass
                    }).done(function(response) {
                      $.alert({
                        icon: 'fa fa-success',
                        title: 'Success!',
                        content: response + '\'s Password has been reset!',
                        type: 'green'
                      });
                    }).fail(function() {
                      $.alert({
                        icon: 'fa fa-warning',
                        title: 'Error',
                        content: 'Something went wrong!',
                        type: 'red'
                      });
                    });
                  }
                },
                NewPass: {
                  type: 'blue',
                  btnClass: 'btn-blue',
                  action: function() {
                    $.alert('NEW PASSWORD: <strong>' + randomPass + "</strong>");
                    return false; // you shall not pass
                  }
                },
                cancel: {
                  btnClass: 'btn-red',
                  type: 'yellow',
                  action: function() {
                    $.alert('Canceled!');
                  }
                }
              }
            });
          });
          // START DATA EDIT
          //EDIT
          $("#datatable-buttons").on('mousedown.edit', "i.fa.fa-pencil-square", function(e) {

            $(this).removeClass().addClass("fa fa-envelope-o");
            var $row = $(this).closest("tr").off("mousedown");
            var $tds = $row.find("td").not(':first').not(':last').not('td:nth-child(3)').not('td:nth-child(4)').not('td:nth-child(5)').not('td:nth-child(6)');
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
              var sectionCode = snapshot.child("sectionCode").val();
              var secName = snapshot.child("secName").val();
              $('#selectSection').append('<option value="' + sectionCode + " | " + secName + '">' + sectionCode + " | " + secName + '</option>');
              $('#selectSection').find('option[value=' + sectionCode + " | " + secName + ']').attr('selected', 'selected');
            });
            //GRADE LEVEL
            $row.find('td:nth-child(3)').html("").append('<select id="selectGradeLevel" class="form-control" width="30%"></select>');
            var grades = [];
            refSections.on('child_added', snap => {
              var secGrade = snap.child("secGrade").val();
              console.log(snap.val());
              if (grades.includes(secGrade)) {
                console.log("Grade level exists already.");
              } else {
                $('#selectGradeLevel').append('<option value="' + secGrade + '">' + secGrade + '</option>');
                grades.push(secGrade);
              }
            });
            $('#selectGradeLevel').find('option[value=' + gradeLevel + ']').attr('selected', 'selected');
          });
          $("#datatable-buttons").on('mousedown', "input", function(e) {
            e.stopPropagation();
          });
          //SAVE EDIT
          $("#datatable-buttons").on('mousedown.save', "i.fa.fa-envelope-o", function(e) {
            //clicked row
            var $row = $(this).closest("tr");
            //get values
            var SN = $row.find("td:nth-child(1)").html();
            var fullName = $row.find("td:nth-child(2) input").val();
            var gradeLevel = $row.find("#selectGradeLevel").val();
            var selectSection = $row.find("td:nth-child(4) select").val();
            var arr = selectSection.split('|');
            const sectionCode = $.trim(arr[0]);
            const section = $.trim(arr[1]);
            $.post("/updateUserStudent", {
              user: SN,
              name: fullName,
              section: sectionCode,
              grLevel: gradeLevel
            }, function(data) {
              if (data === 'Submitted') {
                $('#alert-boxes').append('<div class="alert alert-success alert-dismissable">Account has been updated.</div>');
                $('.alert-success').delay(4000).fadeOut('slow');
              } else {
                $('#alert-boxes').append('<div class="alert alert-danger alert-dismissable"> &nbsp;' + data + '</div>');
                $('.alert-danger').delay(4000).fadeOut('slow');
              }
            });
            $(this).removeClass().addClass("fa fa-pencil-square");
          });
          //REMOVE STUDENT
          $("#datatable-buttons").on("mousedown", "td .fa.fa-minus-square", function(e) {
            //clicked row
            var $row = $(this).closest("tr");
            var SN = $row.find("td:nth-child(1)").html();
            //REMOVE STUDENT
            $.post("/deleteUserStudent", {
              user: SN
            }, function(data) {
              if (data === 'Submitted') {
                $('#alert-boxes').append('<div class="alert alert-success alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success!</strong> Account has been deleted.</div>');
                $('.alert-success').delay(4000).fadeOut('slow');
              } else {
                $('#alert-boxes').append('<div class="alert alert-danger alert-dismissable"> &nbsp;' + data + '</div>');
                $('.alert-danger').delay(4000).fadeOut('slow');
              }
              $('#datatable-buttons').DataTable().row($row).remove().draw();
            });
          });
          //END EDIT
          //END SAVE ADDED STUDENT ROW
          // //HIDE ALERTS WHEN CLOSE BUTTON PRESSED
          // $('.alert .close').click(function() {
          //   $(this).parent().addClass('hide');
          // });
          //RANDOM CODE
          function gidGenerator() {
            var S4 = function() {
              return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return ("ID" + S4());
          }
          function passGenerator() {
            var S4 = function() {
              return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return ("Pw" + S4());
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
      window.location = '/login';
    }
  })

});
