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

                $("#datatable-buttons").DataTable().row(0).data([SN, name, grade, sectionName, email, '<button id="btnResetPw" type="button" class="btn btn-sm btn-secondary mr-2">Reset Password</button>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();

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
          //SELECT SECTION
          refSections.on("child_added", function(snapshot) {
            var secName = snapshot.child("secName").val();
            var sectionCode = snapshot.child("sectionCode").val();
            $('#sectionData').append('<option value="' + secName + '">' + sectionCode + " | " + secName + '</option>');
          });
          // START ADD ROW STUDENT
          var t = $('#datatable-buttons').DataTable();
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
                $('#alert-boxes').append('<div class="alert alert-success alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success!</strong> Account has been uploaded.</div>').fadeIn('slow').delay(5000).queue(function(next) {
                  $('.alert.alert-dismissable').fadeOut('slow').remove();
                });
              } else {
                $('#alert-boxes').append('<div class="alert alert-danger alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Error!</strong>&nbsp;' + data + '</div>').fadeIn('slow').delay(5000).queue(function(next) {
                  $('.alert.alert-dismissable').fadeOut('slow').remove();
                });

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
              $('#selectSection').find('option[value=' + section + ']').attr('selected', 'selected');
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
                $('#alert-boxes').append('<div class="alert alert-success alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success!</strong> Account has been updated.</div>').fadeIn('slow').delay(5000).fadeOut('slow');
              } else {
                $('#alert-boxes').append('<div class="alert alert-danger alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Error!</strong>&nbsp;' + data + '</div>').fadeIn('slow').delay(5000).fadeOut('slow');
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
                $('#alert-boxes').append('<div class="alert alert-success alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success!</strong> Account has been deleted.</div>').fadeIn('slow').delay(5000).queue(function(next) {
                  $('.alert.alert-dismissable').fadeOut('slow').remove();
                });
              } else {
                $('#alert-boxes').append('<div class="alert alert-danger alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Error!</strong>&nbsp;' + data + '</div>').fadeIn('slow').delay(5000).queue(function(next) {
                  $('.alert.alert-dismissable').fadeOut('slow').remove();
                });
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
      window.location = 'index.html';
    }
  })

});
