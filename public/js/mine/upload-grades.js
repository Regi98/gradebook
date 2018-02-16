"use strict";
var selectedFile;

$(document).ready(function() {
  $("#uploadFirebase").hide();
   $("#dvCSV").hide();
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

  const txtEmail = document.getElementById('txtEmail');
  const btnLogin = document.getElementById('btnLogin');
  const btnLogout = document.getElementById('btnLogout');
  const btnLogout2 = document.getElementById('btnLogout2');


  // SUBMIT LOGOUT EVENT
  btnLogout.addEventListener('click', e  => {
    firebase.auth().signOut();
    console.log("Sign-out successful.");
});

  // Realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      var currentUser = firebaseUser;
      console.log(currentUser);
      console.log("You are now logged in as a teacher. \n UID: " + currentUser.uid + "\n Name: " + currentUser.displayName);

      const refUsers = firebase.database().ref().child('users/'+currentUser.uid);
            refUsers.once("value", function(snapshot) {
            var data = snapshot.val();
            console.log(data);
            var userID = snapshot.key;
            var role = snapshot.child("role").val();
            console.log(role);
            if (role == "Teacher") {
              console.log("Teacher is logged in.");

              //SELECT
              const refNavTeacher = firebase.database().ref('Teachers/').child(currentUser.uid);
              refNavTeacher.once("value", function(snap) {
              var data = snap.val();
              var grade = data['Grade'];
              var TID = data['TID'];
              var fullname = data['fullname'];
              //Display the name of user temp
              $('#user-fullname').html(fullname);
              $('#user-role').html(role);


                  const refNavSecHandled = firebase.database().ref('sectionsHandled/').child(TID);
                  refNavSecHandled.on("child_added", function(snapshot) {
                          var datasecHandled = snapshot.val();
                          var sectionCode = snapshot.child("SectionCode").val();
                          var subject = snapshot.child("Subject").val();
                          var subjectCode = snapshot.child("subjectCode").val();
                        // var address = TIDValue.address;
                        //  var users = TIDValue.users;
                          const refSections = firebase.database().ref('Sections/');
                    refSections.orderByChild("sectionCode").equalTo(sectionCode).on("child_added", function(snapshot) {
                          var section= snapshot.child("secName").val();


                          var count = Object.keys(datasecHandled).length;

                          //APPEND TO SELECT UPLOAD (SECTION)
                            if (section.includes("7")) {
                                if ($("#optGrade7 option").val() != section+" | "+subject) {
                                  $('#optGrade7').append('<option value="'+section+" | "+subject+'">'+section+" | "+subject+'</option>');
                                }
                            }
                            else if (section.includes("8")) {
                                if ($("#optGrade8 option").val() != section+" | "+subject) {
                                  $('#optGrade8').append('<option value="'+section+" | "+subject+'">'+section+" | "+subject+'</option>');
                                }
                            }
                            else if (section.includes("9")) {
                                if ($("#optGrade9 option").val() != section+" | "+subject) {
                                  $('#optGrade9').append('<option value="'+section+" | "+subject+'">'+section+" | "+subject+'</option>');
                                }
                            }
                            else if (section.includes("10")) {
                                if ($("#optGrade10 option").val() != section+" | "+subject) {
                                  $('#optGrade10').append('<option value="'+section+" | "+subject+'">'+section+" | "+subject+'</option>');
                                }
                            }
                            else{
                              console.log("No equivalent Section");
                            }


                          //APPEND TO SELECT DISPLAY (SECTION)
                            if (section.includes("7")) {
                                if ($("#optDGrade7 option").val() != section+" | "+subject) {
                                  $('#optDGrade7').append('<option value="'+section+" | "+subject+'">'+section+" | "+subject+'</option>');
                                }
                            }
                            else if (section.includes("8")) {
                                if ($("#optDGrade8 option").val() != section+" | "+subject) {
                                  $('#optDGrade8').append('<option value="'+section+" | "+subject+'">'+section+" | "+subject+'</option>');
                                }
                            }
                            else if (section.includes("9")) {
                                if ($("#optDGrade9 option").val() != section+" | "+subject) {
                                  $('#optDGrade9').append('<option value="'+section+" | "+subject+'">'+section+" | "+subject+'</option>');
                                }
                            }
                            else if (section.includes("10")) {
                                if ($("#optDGrade10 option").val() != section+" | "+subject) {
                                  $('#optDGrade10').append('<option value="'+section+" | "+subject+'">'+section+" | "+subject+'</option>');
                                }
                            }
                            else{
                              console.log("No equivalent Section");
                            }
                      });
                  });
              });

          //DATA START! ==============
          //INSERT HEADER
          //SELECT DISPLAY 1
            $('#selectQuarterDisplay').on('change', function() {
              $('#tableCSV').remove();
              $('table').empty();
              var quarter = $("#selectQuarterDisplay").val();
              var data = $("#sectionGradeDisplay").val();
              var arr = data.split('|');
              const mySection = $.trim(arr[0]);
              const mySubject = $.trim(arr[1]);
              const rootRef = firebase.database().ref().child(mySubject+'/' +mySection+'/' +quarter);
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

              $('table').not('#tableCSV').DataTable({
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

              // Add new row to table
                $("table").DataTable().row.add(arr).draw();

            });
          });
          //SELECT DISPLAY 2
            $('#sectionGradeDisplay').on('change', function() {
              $('#tableCSV').remove();
              $('table').empty();
              var quarter = $("#selectQuarterDisplay").val();
              var data = $("#sectionGradeDisplay").val();
              var arr = data.split('|');
              const mySection = $.trim(arr[0]);
              const mySubject = $.trim(arr[1]);
              const rootRef = firebase.database().ref().child(mySubject+'/' +mySection+'/' +quarter);
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

              $('table').not('#tableCSV').DataTable({
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

              // Add new row to table
                $("table").DataTable().row.add(arr).draw();

            });
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
                  table.setAttribute("id", "tableCSV");
                  var rows = e.target.result.split("\n");
                  for (var i = 0; i < 1; i++) {
                    var row = table.insertRow(-1);
                    var cells = rows[i].split(",");
                    for (var j = 0; j < cells.length; j++) {
                      var cell = row.insertCell(-1);
                      cell.innerHTML = '<input type="text" id="row'+i+'cell'+j+'" class="row'+i+'" value="'+cells[j]+'" disabled="disabled">';
                    }
                  }
                  for (var i = 1; i < rows.length; i++) {
                    var row = table.insertRow(-1);
                    var cells = rows[i].split(",");
                    for (var j = 0; j < cells.length; j++) {
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
                  var $rowData =  $('#tableCSV').find('> tbody > tr').not(':last');
                  $.each($rowData, function(i, el) {
                  var x = i + 1;
                  var studentID = $('#row'+x+'cell0').val();
                  var $rowFirst = $("table:first").find("tr:first");
                  var $rowNext = $('#tableCSV tr').eq(x);
                  //get all td's in row
                  var $tdsFirst = $rowFirst.find("td");
                  // loop all td
                  $.each($tdsFirst, function(i, el) {
                  //get value of each td
                    var txtEntity = $(this).find("input").val();
                    var $rowNext = $('#tableCSV tr').eq(x);
                    var $tdsNext = $rowNext.find("td:eq("+i+")");
                    var data = $("#sectionGradeUpload").val();
                        var arr = data.split('|');
                        const section = $.trim(arr[0]);
                    const refStudents = firebase.database().ref().child('Students/');
                    refStudents.orderByChild("SN").equalTo(studentID).on("child_added", function(snapshot) {
                    var data = snapshot.val();
                    var studentAuthID = snapshot.key;
                      $.each($tdsNext, function(i, el) {
                      //get value of each td
                        var txtValue = $(this).find("input").val();
                      //Update in database
                        var quarter = $("#selectQuarterUpload").val();
                        var data = $("#sectionGradeUpload").val();
                        var arr = data.split('|');
                        const mySection = $.trim(arr[0]);
                        const mySubject = $.trim(arr[1]);
                        const refSubjectGrades = firebase.database().ref(mySubject+'/' +mySection+'/'+ quarter+'/'+ studentAuthID)
                        var updateTeacherSubj = {};
                            updateTeacherSubj = {
                                [txtEntity]: txtValue
                            };
                            refSubjectGrades.update(updateTeacherSubj).then(function(){
                                $('#alert-success-upload-grades').removeClass('hide');
                                $("#uploadFirebase").hide();
                            }).catch(function(error){
                                $('#alert-danger-upload-grades').removeClass('hide');
                            });
                        });
                    });
                  });
                });
            });
            }
            else if (role == "Admin") {
              window.location = 'home-admin.html';
              console.log("Makalogin ya soy");
            }
            else{
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
