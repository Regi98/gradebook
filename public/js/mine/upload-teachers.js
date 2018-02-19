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

  //create references
  const section = document.getElementById("section");
  const txtEmail = document.getElementById('txtEmail');
  const btnLogin = document.getElementById('btnLogin');
  const btnLogout = document.getElementById('btnLogout');

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

          //DATA START! ==============
          //INSERT HEADER
          const rootRef = firebase.database().ref('Teachers');
          //INSERT DATA
          rootRef.on("child_added", snap => {
            var TID = snap.child("TID").val();
            var name = snap.child("fullname").val();
            var email = snap.child("email").val();
            //Get the parent key of editing row
              $("#datatable-buttons").DataTable().row.add([TID, name, email, '<button id="btnResetPw" type="button" class="btn btn-sm btn-secondary mr-2">Reset Password</button>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw()
          });
          rootRef.on("child_changed", snap => {
            var TID = snap.child("TID").val();
            var name = snap.child("fullname").val();
            var email = snap.child("email").val();
            //Get the parent key of editing row
            //Get the parent key of editing row
              $("#datatable-buttons").DataTable().row().data([TID, name, email, '<button id="btnResetPw" type="button" class="btn btn-sm btn-secondary mr-2">Reset Password</button>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();

          });
          rootRef.on("child_removed", snap => {
            var TID = snap.child("TID").val();
            var name = snap.child("fullname").val();
            var email = snap.child("email").val();
            //Get the parent key of editing row
              $("#datatable-buttons").DataTable().row().remove([TID, name, email, '<button id="btnResetPw" type="button" class="btn btn-sm btn-secondary mr-2">Reset Password</button>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
          });

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
                  for (var i = 1; i < rows.length; i++) {
                    var row = table.insertRow(-1);
                    var cells = rows[i].split(",");
                    for (var j = 0; j < cells.length; j++) {
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
                  // dvCSV.innerHTML = "";
                  dvCSV.appendChild(table);
                  $('#alert-boxes').append('<div class="alert alert-info alert-dismissable">CSV file has been loaded.</div>');
                  $('.alert-info').delay(4000).fadeOut('slow');
                }
                reader.readAsText(fileUpload.files[0]);
                $("#uploadFirebaseA").show();
              } else {
                $('#alert-boxes').append('<div class="alert alert-danger alert-dismissable">This browser doesn\'t support HTML5</div>');
                $('.alert-info').delay(4000).fadeOut('slow');
              }
            } else {
              $('#alert-boxes').append('<div class="alert alert-danger alert-dismissable">Please upload a valid CSV file. </div>');
              $('.alert-info').delay(4000).fadeOut('slow');
            }
          });

          //upload to db firebase
          const btnUploadFirebase = document.getElementById('uploadFirebaseA');
          btnUploadFirebase.addEventListener('click', e => {
            var $rowData = $('#tableCSVaccounts').find('> tbody > tr').not(':last');
            var rowCount = $('#tableCSVaccounts').find('> tbody > tr').not(':last').length;
            var teacherCount = 0;
            $.each($rowData, function(i, el) {
              var x = i + 1;
              var teacherID = $('#row' + x + 'cell0').val();
              var fname = $('#row' + x + 'cell1').val();

              $.post("/createUserTeacher", {
                TID: teacherID,
                name: fname
              }, function(data) {
                if (data === 'Submitted') {
                  var x = i+1;
                  alert("x "+x);
                  alert("rowcount "+rowCount);
                  teacherCount = teacherCount + 1;
                  if(x  == rowCount) {
                  $('#alert-boxes').append('<div class="alert alert-success alert-dismissable teacher"><strong>Success!</strong> '+teacherCount+' Teacher Accounts has been uploaded.</div>');
                  $('.alert-success.teacher').delay(4000).fadeOut('slow');
                }
                } else {
                  $('#alert-boxes').append('<div class="alert alert-danger alert-dismissable">' + data + '</div>');
                  $('.alert-danger').delay(4000).fadeOut('slow');
                }
              });
            });

          });

          // START ADD ROW Teacher
          const btnAddTeacher = document.getElementById('btnAddTeacher');
          var t = $('#datatable-buttons').DataTable();
          btnAddTeacher.addEventListener('click', e => {
            t.row.add([
              '<input id="txtTID" type="number" class="form-control" width="100%" placeholder="Teacher ID">',
              '<input id="txtfName" type="text" class="form-control" width="100%" placeholder="Fullname">',
              '<input id="txtEmail" type="email" class="form-control" width="100%" disabled>',
              '<input id="txtPassword" type="text" class="form-control" width="100%" placeholder="Six (6) or more char.">',
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
            var password = txtPassword;

            $.post("/createUserTeacher", {
              TID: txtTID,
              password: password,
              name: txtfName,
            }, function(data) {
              if (data === 'Submitted') {
                $('#alert-boxes').append('<div class="alert alert-success alert-dismissable"><strong>Success!</strong> 1 Teacher Account has been uploaded.</div>');
                $('.alert-success').delay(4000).fadeOut('slow');
              } else {
                $('#alert-boxes').append('<div class="alert alert-danger alert-dismissable">&nbsp;' + data + '</div>');
                $('.alert-danger').delay(4000).fadeOut('slow');
              }
            });


            $('#datatable-buttons').DataTable().row($(this).closest("tr")).remove().draw();
          });
          //END SAVE ADDED Teacher ROW
          // END ADD ROW Teacher
          //RESET PASS
          $("#datatable-buttons").on('mousedown', "button.btn.btn-sm.btn-secondary.mr-2", function(e) {
            var $row = $(this).closest("tr").off("mousedown");
            var TeacherID = $row.find("td:nth-child(1)").html();
            var fullName = $row.find("td:nth-child(2)").html();
            var randomPass = passGenerator();
            $.confirm({
              title: 'Password Reset!',
              content: 'Are you sure you want to reset <br>' + TeacherID + " | " + fullName + '\'s password?',
              type: 'orange',
              closeIcon: true,
              buttons: {
                confirm: {
                  btnClass: 'btn-green',
                  action: function() {
                  var self = this;
                  return $.post("/updateUserPwTeacher", {
                    user: TeacherID,
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
                  btnClass: 'btn-blue',
                  action: function() {
                  $.alert('NEW PASSWORD: <strong>'+ randomPass+"</strong>");
                  return false; // you shall not pass
                }
              },
                cancel: {
                  btnClass: 'btn-red',
                  action: function() {
                  $.alert('Canceled!');
                }
              }
              }
            });
          });
          //EDIT
          $("#datatable-buttons").on('mousedown.edit', "i.fa.fa-pencil-square", function(e) {

            $(this).removeClass().addClass("fa fa-envelope-o");
            var $row = $(this).closest("tr").off("mousedown");
            var $tds = $row.find("td").not(':first').not(':last').not('td:nth-child(3)').not('td:nth-child(4)');
            //INPUTS
            $.each($tds, function(i, el) {
              var txt = $(this).text();
              $(this).html("").append("<input type='text' class='form-control' size='15' value=\"" + txt + "\">");
            });
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
            $.post("/updateUserTeacher", {
              user: SN,
              name: fullName
            }, function(data) {
              if (data === 'Submitted') {
                $('#alert-boxes').append('<div class="alert alert-success alert-dismissable">Account has been updated.</div>');
                $('.alert-success').delay(4000).fadeOut('slow');
              } else {
                $('#alert-boxes').append('<div class="alert alert-danger alert-dismissable">&nbsp;' + data + '</div>');
                $('.alert-danger').delay(4000).fadeOut('slow');
              }
            });
            $(this).removeClass().addClass("fa fa-pencil-square");
          });
          //END EDIT
          //REMOVE TEACHER
          $("#datatable-buttons").on("mousedown", "td .fa.fa-minus-square", function(e) {
            //clicked row
            var $row = $(this).closest("tr");
            var TID = $row.find("td:nth-child(1)").html();
            //REMOVE TEACHE
            $.post("/deleteUserTeacher", {
              user: TID
            }, function(data) {
              if (data === 'Submitted') {
                $('#alert-boxes').append('<div class="alert alert-success alert-dismissable">Account has been deleted.</div>');
                $('.alert-success').delay(4000).fadeOut('slow');
              } else {
                $('#alert-boxes').append('<div class="alert alert-danger alert-dismissable">&nbsp;' + data + '</div>')
                $('.alert-danger').delay(4000).fadeOut('slow');
              }
              $('#datatable-buttons').DataTable().row($row).remove().draw();
            });
          });

          function passGenerator() {
            var S4 = function() {
              return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return ("Pw" + S4());
          }
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
      window.location = '/login';
    }
  })

});
