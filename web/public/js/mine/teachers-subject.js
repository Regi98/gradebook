"use strict";
var selectedFile;

$(document).ready(function() {
  $("#uploadFirebaseA").hide();
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
  var database = firebase.database();

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
          //SELECT TEACHER
          const refTeacher = firebase.database().ref('Teachers/');
          refTeacher.on("child_added", function(snapshot) {
            var TID = snapshot.child("TID").val();
            var fullName = snapshot.child("fullname").val();
            $('#selectTeacher').append('<option value="' + TID + " | " + fullName + '">' + TID + " | " + fullName + '</option>');
          });
          //SELECT SUBJECT
          const refSections = firebase.database().ref("Sections/");
          refSections.on("child_added", function(snap) {
            var secGrade = snap.child("secGrade").val();
            var secCode = snap.child("sectionCode").val();
            var secName = snap.child("secName").val();
            console.log("Grade: " + secGrade);
            const refSubjects = firebase.database().ref('Subjects/');
            refSubjects.orderByChild("sectionCode").equalTo(secCode).on("child_added", function(snap) {
              //REMOVE OPTIOM IN SELECT
              var subjectKey = snap.key;
              var subCode = snap.child("subjectCode").val();
              var subName = snap.child("subjectName").val();
              var subTID = snap.child("subjectTeacherID").val();
              console.log(subTID);
              //APPEND TO SELECT UPLOAD (SECTION)
              if (secGrade == "7" && subTID === false) {
                $('#optGrade7').append('<option value="' + subjectKey + " | " + secCode + " | " + subCode + " | " + subName + '">' + secName + " | " + subName + '</option>');
              } else if (secGrade == "8" && subTID === false) {
                $('#optGrade8').append('<option value="' + subjectKey + " | " + secCode + " | " + subCode + " | " + subName + '">' + secName + " | " + subName + '</option>');
              } else if (secGrade == "9" && subTID === false) {
                $('#optGrade9').append('<option value="' + subjectKey + " | " + secCode + " | " + subCode + " | " + subName + '">' + secName + " | " + subName + '</option>');
              } else if (secGrade == "10" && subTID === false) {
                $('#optGrade10').append('<option value="' + subjectKey + " | " + secCode + " | " + subCode + " | " + subName + '">' + secName + " | " + subName + '</option>');
              } else {
                console.log("No equivalent Section");
              }
            });
        });
          //HIDE ALERT WHEN CHANGE
          $('#selectTeacher').on('change', function() {
            $('#alert-success').addClass('hide');
          });
          $('#selectSubject').on('change', function() {
            $('#alert-success').addClass('hide');
          });
          //END SELECT
          //SUBMIT TO DATABASE
          const submitSubjTeacher = document.getElementById('uploadFirebase');
          submitSubjTeacher.addEventListener('click', e => {
            const refSections = firebase.database().ref("Sections/");

            var selectTeacher = $("#selectTeacher").val();

            var arr = selectTeacher.split('|');
            const TID = $.trim(arr[0]);
            const fullName = $.trim(arr[1]);


            var selectSubject = $("#selectSubject").val();
            var arr = selectSubject.split('|');
            const subID = $.trim(arr[0]);
            const sectionCode = $.trim(arr[1]);
            const subjectCode = $.trim(arr[2]);
            const subjectName = $.trim(arr[3]);
            console.log(selectSubject + subID + subjectCode);
            $("#selectSubject option:selected").remove();
            const refSubjects = firebase.database().ref().child("Subjects/" + subID);
            const refSectionsHandled = firebase.database().ref().child("sectionsHandled/" + TID);
            //Update in database
            refSubjects.update({
              subjectTeacherID: TID
            }).then(function() {
              $('#alert-success').removeClass('hide');
            }).catch(function(error) {
              $('#alert-danger').removeClass('hide');
            });
            refSectionsHandled.push({
              SectionCode: sectionCode,
              Subject: subjectName,
              subjectCode: subjectCode
            }).then(function() {
              $('#alert-success').removeClass('hide');
            }).catch(function(error) {
              $('#alert-danger').removeClass('hide');
            });
            //, function(error) {
            // // The Promise was rejected.
            // $('#alert-danger').removeClass('hide');
            // console.error(error);
            // });
          });
          //END SELECT
          //END SUBMIT
          //DATA START! ==============
          //INSERT DATA
          refTeacher.on("child_added", snap => {
            var TID = snap.child("TID").val();
            var fullName = snap.child("fullname").val();
            const refSectionsHandled = firebase.database().ref().child('sectionsHandled/' + TID);
            //Get the parent key of editing row
            refSectionsHandled.on("child_added", function(snapshot) {
              var dataa = snapshot.val();
              var parentKey = snapshot.key;
              var subjectCode = snapshot.child("subjectCode").val();
              var sectionCode = snapshot.child("SectionCode").val();
              var subject = snapshot.child("Subject").val();
              const refSections = firebase.database().ref('Sections/');
              refSections.orderByChild("sectionCode").equalTo(sectionCode).on("child_added", function(snapshot) {
                var section = snapshot.child("secName").val();
                $("#datatable-buttons").DataTable().row.add([TID, fullName, subjectCode, subject, section, '<td><i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
              });
            });
          });
          refTeacher.on("child_changed", snap => {
            var TID = snap.child("TID").val();
            var fullName = snap.child("fullname").val();
            const refSectionsHandled = firebase.database().ref().child('sectionsHandled/' + TID);
            //Get the parent key of editing row
            refSectionsHandled.on("child_added", function(snapshot) {
              var dataa = snapshot.val();
              var parentKey = snapshot.key;
              var subjectCode = snapshot.child("subjectCode").val();
              var sectionCode = snapshot.child("SectionCode").val();
              var subject = snapshot.child("Subject").val();
              const refSections = firebase.database().ref('Sections/');
              refSections.orderByChild("sectionCode").equalTo(sectionCode).on("child_added", function(snapshot) {
                var section = snapshot.child("secName").val();
                $("#datatable-buttons").DataTable().row.data([TID, fullName, subjectCode, subject, section, '<td><i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
              });
            });
          });
          refTeacher.on("child_removed", snap => {
            var TID = snap.child("TID").val();
            var fullName = snap.child("fullname").val();
            const refSectionsHandled = firebase.database().ref().child('sectionsHandled/' + TID);
            //Get the parent key of editing row
            refSectionsHandled.on("child_added", function(snapshot) {
              var dataa = snapshot.val();
              var parentKey = snapshot.key;
              var subjectCode = snapshot.child("subjectCode").val();
              var sectionCode = snapshot.child("SectionCode").val();
              var subject = snapshot.child("Subject").val();
              const refSections = firebase.database().ref('Sections/');
              refSections.orderByChild("sectionCode").equalTo(sectionCode).on("child_added", function(snapshot) {
                var section = snapshot.child("secName").val();
                $("#datatable-buttons").DataTable().row.remove([TID, fullName, subjectCode, subject, section, '<td><i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
              });
            });
          });
          //DATA END! ==============
          //ACTION START! ==============
          //DELETE
          $("#datatable-buttons").on("mousedown", "td .fa.fa-minus-square", function(e) {
            const refSubjects = firebase.database().ref('Subjects/');
            const refSectionsHandled = firebase.database().ref('sectionsHandled/');
            //clicked row
            var $row = $(this).closest("tr");
            //get first value in td (TID)
            var subCode = $row.find("td:nth-child(3)").html();
            var TID = $row.find("td:nth-child(1)").html();
            //get the subCode in db of clicked row
            refSubjects.orderByChild("subjectCode").equalTo(subCode).on("child_added", function(snapshot) {
              //Update in database
              var snapshotKey = snapshot.key;
              const refSubjectsUpdate = firebase.database().ref().child("Subjects/" + snapshotKey);
              refSubjectsUpdate.update({
                subjectTeacherID: false
              }).then(function() {
                refSectionsHandled.child(TID).on("child_added", function(snapshot) {
                  refSectionsHandled.child(TID).orderByChild("subjectCode").equalTo(subCode).on("child_added", function(snapshot) {
                    //Update in database
                    var snapshotKey = snapshot.key;
                    refSectionsHandled.child(TID + "/" + snapshotKey).remove().then(function() {
                      $('#selectSubject')
                        .find('option')
                        .remove()
                        .end();
                      //SELECT SUBJECT
                      const refSections = firebase.database().ref("Sections/");
                        refSections.on("child_added", function(snap) {
                        var secGrade = snap.child("secGrade").val();
                        var secCode = snap.child("sectionCode").val();
                        var secName = snapshot.child("secName").val();
                        console.log("Grade: "+secGrade);
                        const refSubjects = firebase.database().ref('Subjects/');
                          refSubjects.orderByChild("sectionCode").equalTo(secCode).on("child_added", function(snapshot) {
                                  var subjectKey = snapshot.key;
                                  var subCode = snapshot.child("subjectCode").val();
                                  var subName = snapshot.child("subjectName").val();
                                  var subTID = snapshot.child("subjectTeacherID").val();
                                  //APPEND TO SELECT UPLOAD (SECTION)
                                    if (secGrade == "7" && subTID == false) {
                                          $('#optGrade7').append('<option value="' + subjectKey + " | " + secCode + " | " + subCode + " | " + subName + '">' + secName + " | " + subName + '</option>');
                                    }
                                    else if (secGrade == "8" && subTID == false) {
                                          $('#optGrade8').append('<option value="' + subjectKey + " | " + secCode + " | " + subCode + " | " + subName + '">' + secName + " | " + subName + '</option>');
                                    }
                                    else if (secGrade == "9" && subTID == false) {
                                          $('#optGrade9').append('<option value="' + subjectKey + " | " + secCode + " | " + subCode + " | " + subName + '">' + secName + " | " + subName + '</option>');
                                    }
                                    else if (secGrade == "10" && subTID == false) {
                                          $('#optGrade10').append('<option value="' + subjectKey + " | " + secCode + " | " + subCode + " | " + subName + '">' + secName + " | " + subName + '</option>');
                                    }
                                    else{
                                      console.log("No equivalent Section");
                                    }
                          });
                      });
                      $('#alert-danger-remove').addClass('hide');
                      $('#alert-success-remove').removeClass('hide');
                    }).catch(function(error) {
                      $('#alert-success-remove').addClass('hide');
                      $('#alert-danger-remove').removeClass('hide');
                    });
                  });
                });
              }).catch(function(error) {
                $('#alert-success-remove').addClass('hide');
                $('#alert-danger-remove').removeClass('hide');
              });
            });
            $('#datatable-buttons').DataTable().row($(this).closest("tr")).remove().draw();
          });

          //ACTION END! ==============
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
