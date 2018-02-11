"use strict";
var selectedFile;

$(document).ready(function() {
  $("#btnAddSubject").hide();
  $("#sel").change(function() {
    if ($(this).val() == "Custom") {
      $("#subjects-div").hide();

      $("#custom-subjects").fadeIn();
    } else {
      $("#custom-subjects").fadeOut();
      $("#subjects-div").fadeIn();


    }
  });
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
  const database = firebase.database();
  const refSections = database.ref('Sections');
  const refSubjects = database.ref('Subjects');
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
      var currentUser = firebaseUser;
      console.log("Logged in " + currentUser.uid + " Name: " + currentUser.displayName);
      const refUsers = database.ref().child('users/' + currentUser.uid);
      refUsers.once("value", function(snapshot) {
        var data = snapshot.val();
        console.log(data);
        var userID = snapshot.key;
        var role = snapshot.child("role").val();
        console.log(role);
        if (role == "Admin") {
          console.log("Logged in");
          //Display the name of user temp
          $('#user-fullname').html(currentUser.displayName);
          $('#user-role').html(role);
          $("#status").fadeOut(); // will first fade out the loading animation
          $("#preloader").delay(500).fadeOut("slow"); // will fade out the white DIV that covers the website.
          //DATA START! ==============
          //INSERT DATA
          refSections.on("child_added", snap => {
            var grade = snap.child("secGrade").val();
            var name = snap.child("secName").val();
            var code = snap.child("sectionCode").val();
            //Get the parent key of editing row
            refSections.orderByChild("sectionCode").equalTo(code).on("child_added", function(snapshot) {
              var parentKey = snapshot.key;
              $("#datatable-buttons").DataTable().row.add([parentKey, code, name, grade, '<a href="#0" class="cd-popup-trigger">View Subjects</a>', '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
            });
          });
          refSections.on("child_changed", snap => {
            var grade = snap.child("secGrade").val();
            var name = snap.child("secName").val();
            var code = snap.child("sectionCode").val();
            //Get the parent key of editing row
            refSections.orderByChild("sectionCode").equalTo(code).on("child_added", function(snapshot) {
              var parentKey = snapshot.key;
              $("#datatable-buttons").DataTable().row(0).data([parentKey, code, name, grade, '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
            });
          });
          refSections.on("child_removed", snap => {
            var grade = snap.child("secGrade").val();
            var name = snap.child("secName").val();
            var code = snap.child("sectionCode").val();
            //Get the parent key of editing row
            refSections.orderByChild("sectionCode").equalTo(code).on("child_added", function(snapshot) {
              var parentKey = snapshot.key;
              $("#datatable-buttons").DataTable().row.remove([parentKey, code, name, grade, '<td><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-minus-square" aria-hidden="true"></i></td>']).draw();
            });
          });
          //POPUP
          $("#datatable-buttons").on('mousedown', "a.cd-popup-trigger", function(e) {
            $("#subjectTable tbody tr").empty();
            var $row = $(this).closest("tr").off("mousedown");
            var $tds = $row.find("td").not(':first').not(':last').not('td:nth-child(2)');
            var sectionName = $row.find("td:nth-child(3)").html();
            var sectionCode = $row.find("td:nth-child(2)").html();
            $("#sectionName").html(sectionName);
            $("#sectionCode").html(sectionCode);
            refSections.orderByChild("sectionCode").equalTo(sectionCode).once("child_added", function(snapshot) {
              var secGrade = snapshot.child("secGrade").val();
              $("#sectionGrade").html(secGrade);
            });
            event.preventDefault();
            $('.cd-popup').addClass('is-visible');
            refSubjects.orderByChild("sectionCode").equalTo(sectionCode).on("child_added", function(snapshot) {
              var parentKey = snapshot.key;
              var chk = gidGenerator();
              var input = gidGenerator();
              var subjectTeacher = gidGenerator();
              var selectTeacher = gidGenerator();
              var subjectName = snapshot.child('subjectName').val();
              var subjectCode = snapshot.child('subjectCode').val();
              $("#subjectTable tbody").append('<tr><td>' + parentKey + '</td><td>' + subjectCode + '</td><td><input type="checkbox" id="' + chk + '" class="chk" onclick="var input = document.getElementById(\'' + input + '\'); if(this.checked){ var txtVal =  $(\'#' + input + '\').val(); $(this).val(txtVal); input.disabled=false;}else{var txtVal =  $(\'#' + input + '\').val(); $(this).val(txtVal); input.disabled=true;}" />&nbsp;<input id="' + input + '"  class="chk" style="width: 85%" disabled value="' + subjectName + '"/></td>&nbsp;<td><h6 id="' + subjectTeacher + '"></h6><select id="' + selectTeacher + '" class="form-control"><option selected value="false">None</option></select></td><td><button id="btnSaveSubject" type="button" class="btn btn-sm btn-success subject" style="display: inline-block;">Save</button></td><td><button id="btnAddSubject" type="button" class="btn btn-sm btn-danger subject-set" >Remove</button></td></tr>');
              //SELECT TEACHER
              const refTeacher = database.ref('Teachers/');
              refTeacher.on("child_added", function(snapshot) {
                var TID = snapshot.child("TID").val();
                var fullName = snapshot.child("fullname").val();
                $('#' + selectTeacher + '').append('<option value="' + TID + " | " + fullName + '">' + TID + " | " + fullName + '</option>');
              });
              //SELECT TEACHER
              refTeacher.on("child_added", snap => {
                var TID = snap.child("TID").val();
                var fullName = snap.child("fullname").val();

                const refSectionsHandled = database.ref().child('sectionsHandled/' + TID);
                refSectionsHandled.orderByChild("subjectCode").equalTo(subjectCode).once("child_added", function(snapshot) {
                  $('#' + subjectTeacher + '').append(TID + " | " + fullName);
                  $('#' + selectTeacher + '').val("" + TID + " | " + fullName + "");
                });
              });
            });
          });
          //SAVE EDIT SUBJECT POPUP
          $("#subjectTable").on('mousedown', "button.btn.btn-sm.btn-success.subject", function(e) {
            var $row = $(this).closest("tr").off("mousedown");
            var parentKey = $row.find("td:nth-child(1)").html();
            var subjectCode = $row.find("td:nth-child(2)").html();
            var subjName = $row.find("input:nth-child(2)").val();
            var replaced = subjName.replace(/[^a-z0-9\s]/gi, '');
            var subjectName = $.trim(replaced);
            var sectionCode = $("#sectionCode").text();
            var currSubjectTeacher = $row.find("td:nth-child(4) h6").text();
            var arr1 = currSubjectTeacher.split('|');
            const currTID = $.trim(arr1[0]);
            const currFullName = $.trim(arr1[1]);
            var selectTeacher = $row.find("td:nth-child(4) select").val();
            var arr = selectTeacher.split('|');
            const newTID = $.trim(arr[0]);
            const newFullName = $.trim(arr[1]);
            const refSubject = database.ref('Subjects/' + parentKey);

            //EDIT SUBJECT NAME
            var updateSubject = {};
            updateSubject = {
              subjectName: subjectName
            };
            refSubject.update(updateSubject).then(function() {
              $('#alert-success-edit-subject').removeClass('hide');
            }).catch(function(error) {
              $('#alert-danger-edit-subject').removeClass('hide');
            });
            //SEE IF THERE IS AN EXISTING TEACHER
            var count = $.trim($row.find("td:nth-child(4) h6").html()).length;
            if (count == 0) {
              //EDIT subjectTeacherID
              var updateSubject = {};
              updateSubject = {
                subjectTeacherID: newTID
              };
              //EDIT SECTIONSHANDLED
              refSubject.update(updateSubject).then(function() {
                const refSectionsHandled = database.ref().child('sectionsHandled/' + newTID);
                var updateTeacherSubj = {};
                updateTeacherSubj = {
                  SectionCode: sectionCode,
                  Subject: subjectName,
                  subjectCode: subjectCode
                };
                refSectionsHandled.push(updateTeacherSubj).then(function() {
                  $('#alert-success-edit-teacher').removeClass('hide');
                }).catch(function(error) {
                  $('#alert-danger-edit-teacher').removeClass('hide');
                });
              }).catch(function(error) {
                $('#alert-danger-edit-teacher').removeClass('hide');
              });
            } else if (count != 0 && currFullName != newFullName) {
              $row.find("td:nth-child(4) h6").empty();
              //EDIT subjectTeacherID
              var updateSubject = {};
              updateSubject = {
                subjectTeacherID: newTID
              };
              refSubject.update(updateSubject).then(function() {
                $('#alert-success-edit-subject').removeClass('hide');
              }).catch(function(error) {
                $('#alert-danger-edit-subject').removeClass('hide');
              });
              $row.find("td:nth-child(4) h6").empty();
              //Dalete sectionsHandled
              const refSectionsHandledDel = database.ref().child('sectionsHandled/' + currTID + "/");
              refSectionsHandledDel.orderByChild("subjectCode").equalTo(subjectCode).once("child_added", function(snapshot) {
                var subjecttt = snapshot.child("subjectCode").val();
                //Update in database
                refSectionsHandledDel.child(snapshot.key).remove().then(function() {
                  $('#alert-danger-remove-teacher').addClass('hide');
                  $('#alert-success-remove-teacher').removeClass('hide');
                }).catch(function(error) {
                  $('#alert-success-remove-teacher').addClass('hide');
                  $('#alert-danger-remove-teacher').removeClass('hide');
                });

              });
              const refSectionsHandledNew = database.ref().child('sectionsHandled/' + newTID);
              var updateTeacherSubj = {};
              updateTeacherSubj = {
                SectionCode: sectionCode,
                Subject: subjectName,
                subjectCode: subjectCode
              };
              refSectionsHandledNew.push(updateTeacherSubj).then(function() {
                $('#alert-success-edit-subject').removeClass('hide');
              }).catch(function(error) {
                console.log("Error2 " + error);
                $('#alert-danger-edit-subject').removeClass('hide');
              });
            } else {
              console.log("NONE!");
            }
          });
          //REMOVE SUBJECT IN POPUP
          $("#subjectTable").on('mousedown', "button.btn.btn-sm.btn-danger.subject-set", function(e) {
            var $row = $(this).closest("tr").off("mousedown");
            var parentKey = $row.find("td:nth-child(1)").html();
            var secGrade = $("#sectionGrade").html();
            var subjectCode = $row.find("td:nth-child(2)").html();
            var subjectName = $row.find("input:nth-child(2)").val();
            var currSubjectTeacher = $row.find("td:nth-child(4) h6").text();
            var arr1 = currSubjectTeacher.split('|');
            const currTID = $.trim(arr1[0]);
            const currFullName = $.trim(arr1[1]);
            const refSubject = database.ref('Subjects/' + parentKey);
            //SEE IF THERE IS AN EXISTING TEACHER
            var count = $.trim($row.find("td:nth-child(4) h6").html()).length;
            if (count == 0) {
              alert(secGrade);
              //Dalete in database
                refSections.orderByChild("secGrade").equalTo(secGrade).on("child_added", function(snapshot) {
                  var sectionCode = snapshot.child("sectionCode").val();
                  alert("sectionCode "+ sectionCode);
                    refSubjects.orderByChild("sectionCode").equalTo(sectionCode).on("child_added", function(snapshot) {
                      var subName = snapshot.child("subjectName").val();
                      if (subjectName == subName) {
                        var parentKey = snapshot.key;
                        alert(parentKey);
                        refSubjects.child(parentKey).remove();
                        $(this).closest("tr").remove();
                      }
                      else{
                        console.log("Different subject");
                      }
                      $('#alert-danger-remove-subject').addClass('hide');
                      $('#alert-success-remove-subject').removeClass('hide');
                    }).catch(function(error) {
                      $('#alert-success-remove-subject').addClass('hide');
                      $('#alert-danger-remove-subject').removeClass('hide');
                    });
                });
            } else {}
            $(this).closest("tr").remove();
          });
          //close popup
          $('.cd-popup').on('click', function(event) {
            if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup-close-no') || $(event.target).is('.cd-popup')) {
              event.preventDefault();
              $(this).removeClass('is-visible');

              $('#alert-success-edit-subject').addClass('hide');
              $('#alert-danger-edit-subject').addClass('hide');
              $('#alert-success-remove-subject').addClass('hide');
              $('#alert-danger-remove-subject').addClass('hide');
            }
          });
          //close popup when clicking the esc keyboard button
          $(document).keyup(function(event) {
            if (event.which == '27') {
              $('.cd-popup').removeClass('is-visible');
            }
          });
          //ADD MORE SUBJECT
          $('#btnAddMoreSubject').on('click', function(event) {
            var $row = $(this).closest("tr").off("mousedown");
            var subjectTeacher = gidGenerator();
            var selectTeacher = gidGenerator();
            var subjectCode = guidGenerator();
            $("#subjectTable tbody").append('<tr><td>New</td><td></td><td><input id="txtNewSubjectName"  class="chkNew" style="width: 85%"/></td>&nbsp;<td><select id="' + selectTeacher + '" class="form-control"><option selected value="false">None</option></select></td><td><button id="btnAddNewSubject" type="button" class="btn btn-sm btn-success new-subject" style="display: inline-block;">Save</button></td><td><button id="btnRemoveNewSubject" type="button" class="btn btn-sm btn-danger subject" >Remove</button></td></tr>');
            //SELECT TEACHER
            const refTeacher = database.ref('Teachers/');
            refTeacher.on("child_added", function(snapshot) {
              var TID = snapshot.child("TID").val();
              var fullName = snapshot.child("fullname").val();
              $('#' + selectTeacher + '').append('<option value="' + TID + " | " + fullName + '">' + TID + " | " + fullName + '</option>');
            });
          });
          //SAVE NEW SUBJECT IN POPUP
          $("#subjectTable").on('mousedown', "button.btn.btn-sm.btn-success.new-subject", function(e) {
            var $row = $(this).closest("tr").off("mousedown");
            var sectionGrade = $("#sectionGrade").html();
            var sectionCode = $("#sectionCode").html();
            // var newSubjectCode = $row.find("td:nth-child(2)").html();
            var newSubjName = $row.find("#txtNewSubjectName").val();
            var replaced = newSubjName.replace(/[^a-z0-9\s]/gi, '');
            var newSubjectName = $.trim(replaced);
            var selectTeacher = $row.find("td:nth-child(4) select").val();
            var arr = selectTeacher.split('|');
            const newTID = $.trim(arr[0]);
            const newFullName = $.trim(arr[1]);
            if (selectTeacher == 'false') {

              //ADD TO OTHER SECTION SAME GRADE
              refSections.orderByChild("secGrade").equalTo(sectionGrade).on("child_added", function(snapshot) {
                var sectionCodeThis = snapshot.child("sectionCode").val();
                var subjectCode = guidGenerator();
                var pushSubjectNew = {};
                pushSubjectNew = {
                  sectionCode: sectionCodeThis,
                  subjectCode: subjectCode,
                  subjectName: newSubjectName,
                  subjectTeacherID: false
                };
                refSubjects.push(pushSubjectNew).then(function() {
                  $('#alert-success-new-subject').removeClass('hide');
                  $row.remove();
                }).catch(function(error) {
                  $('#alert-danger-new-subject').removeClass('hide');
                });
              });

            } else {
              //ADD TO OTHER SECTION SAME GRADE

              refSections.orderByChild("secGrade").equalTo(sectionGrade).on("child_added", function(snapshot) {
                var sectionCodeThis = snapshot.child("sectionCode").val();
                var subjectCode = guidGenerator();
                if (sectionCodeThis != sectionCode) {
                  var pushSubjectNew = {};
                  pushSubjectNew = {
                    sectionCode: sectionCodeThis,
                    subjectCode: subjectCode,
                    subjectName: newSubjectName,
                    subjectTeacherID: newTID
                  };
                  refSubjects.push(pushSubjectNew);
                  const refSectionsHandled = database.ref().child('sectionsHandled/' + newTID);
                  var updateTeacherSubj = {};
                  updateTeacherSubj = {
                    SectionCode: sectionCodeThis,
                    Subject: newSubjectName,
                    subjectCode: subjectCode,
                    subjectTeacherID: newTID
                  };
                  refSectionsHandled.push(updateTeacherSubj)
                } else {
                  console.log("Already have.");
                }
              });
              //NEW SUBJECT NAME
              var pushSubject = {};
              pushSubject = {
                sectionCode: sectionCode,
                subjectCode: newSubjectCode,
                subjectName: newSubjectName,
                subjectTeacherID: newTID
              };
              refSubjects.push(pushSubject).then(function() {
                $('#alert-success-new-subject').removeClass('hide');
                $row.remove();
              }).catch(function(error) {
                $('#alert-danger-new-subject').removeClass('hide');
              });
              //NEW SECTIONSHANDLED
              const refSectionsHandled = database.ref().child('sectionsHandled/' + newTID);
              var updateTeacherSubj = {};
              updateTeacherSubj = {
                SectionCode: sectionCode,
                Subject: newSubjectName,
                subjectCode: newSubjectCode
              }
              refSectionsHandled.push(updateTeacherSubj).then(function() {
                $('#alert-success-new-subject').removeClass('hide');
                $row.remove();
              }).catch(function(error) {
                $('#alert-danger-new-subject').removeClass('hide');
              });
            }
          });
          //REMOVE ADD MORE SUBJECT
          $("#subjectTable").on('mousedown', "button.btn.btn-sm.btn-danger.subject", function(e) {
            $(this).closest("tr").remove();
          });
          refSubjects.on("child_added", snapshot => {
            var parentKey = snapshot.key;
            var chk = gidGenerator();
            var input = gidGenerator();
            var subjectTeacher = gidGenerator();
            var selectTeacher = gidGenerator();
            var subjectName = snapshot.child('subjectName').val();
            var subjectCode = snapshot.child('subjectCode').val();
            $("#subjectTable tbody").append('<tr><td>' + parentKey + '</td><td>' + subjectCode + '</td><td><input type="checkbox" id="' + chk + '" class="chk" onclick="var input = document.getElementById(\'' + input + '\'); if(this.checked){ var txtVal =  $(\'#' + input + '\').val(); $(this).val(txtVal); input.disabled=false;}else{var txtVal =  $(\'#' + input + '\').val(); $(this).val(txtVal); input.disabled=true;}" />&nbsp;<input id="' + input + '"  class="chk" style="width: 85%" disabled value="' + subjectName + '"/></td>&nbsp;<td><h6 id="' + subjectTeacher + '"></h6><select id="' + selectTeacher + '" class="form-control"><option selected value="false">None</option></select></td><td><button id="btnSaveSubject" type="button" class="btn btn-sm btn-success subject" style="display: inline-block;">Save</button></td><td><button id="btnAddSubject" type="button" class="btn btn-sm btn-danger subject" >Remove</button></td></tr>');
            //SELECT TEACHER
            const refTeacher = database.ref('Teachers/');
            refTeacher.on("child_added", function(snapshot) {
              var TID = snapshot.child("TID").val();
              var fullName = snapshot.child("fullname").val();
              $('#' + selectTeacher + '').append('<option value="' + TID + " | " + fullName + '">' + TID + " | " + fullName + '</option>');
            });
            //SELECT TEACHER
            refTeacher.on("child_added", snap => {
              var TID = snap.child("TID").val();
              var fullName = snap.child("fullname").val();

              const refSectionsHandled = database.ref().child('sectionsHandled/' + TID);
              refSectionsHandled.orderByChild("subjectCode").equalTo(subjectCode).once("child_added", function(snapshot) {
                $('#' + subjectTeacher + '').append(TID + " | " + fullName);
                $('#' + selectTeacher + '').val("" + TID + " | " + fullName + "");
              });
            });
          });
          //ADD NEW SECTION
          const btnCreateSection = document.getElementById('uploadFirebase');
          btnCreateSection.addEventListener('click', e => {
            var gradeLevel = $('#gradeLevel').val();
            var sectName = $('#txtSectionName').val().toUpperCase();
            var sectionName = gradeLevel + sectName;
            alert(sectionName);
            checkIfSectionExists(sectionName);
          });
          //Analysis
          function sectionExistsCallback(sectionName, exists) {
            console.log(exists);
            if (exists == true) {
              $('#alert-danger-section-exists').removeClass('hide');
            } else {
              var subjects = getValueUsingClass();
              console.log(subjects);
              var gradeLevel = $('#gradeLevel').val();
              var sectionCodeOnce = guidGenerator();
              var sectionCodeGen = sectionCodeOnce;
              /* check if the selected in dropdown is 7,8,9,or 10 */
              if ($('#sel').val() == "7") {
                refSections.once("child_added", snap => {
                  var secGrade = snap.child("secGrade").val();
                  var sectionCode = snap.child("sectionCode").val();
                  if (secGrade.includes("7")) {
                    var pushSection = {};
                    pushSection = {
                      secGrade: gradeLevel,
                      secName: sectionName,
                      sectionCode: sectionCodeGen
                    };
                    refSections.push(pushSection).then(function() {
                      $('#alert-success').removeClass('hide');
                    }).catch(function(error) {
                      $('#alert-danger').removeClass('hide');
                    });
                    refSubjects.orderByChild("sectionCode").equalTo(sectionCode).on("child_added", function(snapshot) {
                      var subjectCode = guidGenerator();
                      var subjectName = snapshot.child("subjectName").val();
                      var pushSubjects = {};
                      pushSubjects = {
                        sectionCode: sectionCodeGen,
                        subjectCode: subjectCode,
                        subjectName: subjectName,
                        subjectTeacherID: false
                      };
                      refSubjects.push(pushSubjects).then(function() {
                        $('#alert-success').removeClass('hide');
                      }).catch(function(error) {
                        $('#alert-danger').removeClass('hide');
                      });
                    });
                  } else {
                    $('#alert-danger-no-subject').removeClass('hide');
                  }
                });
              } else if ($('#sel').val() == "8") {
                refSections.once("child_added", snap => {
                  var secGrade = snap.child("secGrade").val();
                  var sectionCode = snap.child("sectionCode").val();
                  if (secGrade.includes("8")) {
                    var pushSection = {};
                    pushSection = {
                      secGrade: gradeLevel,
                      secName: sectionName,
                      sectionCode: sectionCodeGen
                    };
                    refSections.push(pushSection).then(function() {
                      $('#alert-success').removeClass('hide');
                    }).catch(function(error) {
                      $('#alert-danger').removeClass('hide');
                    });
                    refSubjects.orderByChild("sectionCode").equalTo(sectionCode).on("child_added", function(snapshot) {
                      var subjectCode = guidGenerator();
                      var subjectName = snapshot.child("subjectName").val();
                      var pushSubjects = {};
                      pushSubjects = {
                        sectionCode: sectionCodeGen,
                        subjectCode: subjectCode,
                        subjectName: subjectName,
                        subjectTeacherID: false
                      };
                      refSubjects.push(pushSubjects).then(function() {
                        $('#alert-success').removeClass('hide');
                      }).catch(function(error) {
                        $('#alert-danger').removeClass('hide');
                      });
                    });
                  } else {
                    $('#alert-danger-no-subject').removeClass('hide');
                  }
                });
              } else if ($('#sel').val() == "9") {
                refSections.once("child_added", snap => {
                  var secGrade = snap.child("secGrade").val();
                  var sectionCode = snap.child("sectionCode").val();
                  if (secGrade.includes("9")) {
                    var pushSection = {};
                    pushSection = {
                      secGrade: gradeLevel,
                      secName: sectionName,
                      sectionCode: sectionCodeGen
                    };
                    refSections.push(pushSection).then(function() {
                      $('#alert-success').removeClass('hide');
                    }).catch(function(error) {
                      $('#alert-danger').removeClass('hide');
                    });
                    refSubjects.orderByChild("sectionCode").equalTo(sectionCode).on("child_added", function(snapshot) {
                      var subjectCode = guidGenerator();
                      var subjectName = snapshot.child("subjectName").val();
                      var pushSubjects = {};
                      pushSubjects = {
                        sectionCode: sectionCodeGen,
                        subjectCode: subjectCode,
                        subjectName: subjectName,
                        subjectTeacherID: false
                      };
                      refSubjects.push(pushSubjects).then(function() {
                        $('#alert-success').removeClass('hide');
                      }).catch(function(error) {
                        $('#alert-danger').removeClass('hide');
                      });
                    });
                  } else {
                    $('#alert-danger-no-subject').removeClass('hide');
                  }
                });
              } else if ($('#sel').val() == "10") {
                refSections.once("child_added", snap => {
                  var secGrade = snap.child("secGrade").val();
                  var sectionCode = snap.child("sectionCode").val();
                  if (secGrade.includes("10")) {
                    var pushSection = {};
                    pushSection = {
                      secGrade: gradeLevel,
                      secName: sectionName,
                      sectionCode: sectionCodeGen
                    };
                    refSections.push(pushSection).then(function() {
                      $('#alert-success').removeClass('hide');
                    }).catch(function(error) {
                      $('#alert-danger').removeClass('hide');
                    });
                    refSubjects.orderByChild("sectionCode").equalTo(sectionCode).on("child_added", function(snapshot) {
                      var subjectCode = guidGenerator();
                      var subjectName = snapshot.child("subjectName").val();
                      var pushSubjects = {};
                      pushSubjects = {
                        sectionCode: sectionCodeGen,
                        subjectCode: subjectCode,
                        subjectName: subjectName,
                        subjectTeacherID: false
                      };
                      refSubjects.push(pushSubjects).then(function() {
                        $('#alert-success').removeClass('hide');
                      }).catch(function(error) {
                        $('#alert-danger').removeClass('hide');
                      });
                    });
                  } else {
                    $('#alert-danger-no-subject').removeClass('hide');
                  }
                });
              } else if ($('#sel').val() == "Custom") {
                var pushSection = {};
                pushSection = {
                  secGrade: gradeLevel,
                  secName: sectionName,
                  sectionCode: sectionCodeGen
                };
                for (var i = 0; i < subjects.length; i++) {
                  var subjectCode = guidGenerator();
                  var pushSubjects = {};
                  pushSubjects = {
                    sectionCode: sectionCodeGen,
                    subjectCode: subjectCode,
                    subjectName: subjects[i],
                    subjectTeacherID: false
                  };
                  refSubjects.push(pushSubjects).then(function() {
                    $('#alert-success').removeClass('hide');
                  }).catch(function(error) {
                    $('#alert-danger').removeClass('hide');
                  });
                }
                refSections.push(pushSection).then(function() {
                  $('#alert-success').removeClass('hide');
                }).catch(function(error) {
                  $('#alert-danger').removeClass('hide');
                });
              } else {
                console.log("Unknown grade level!");
              }
            }
          }
          // Tests to see if /sections/ has any data.
          function checkIfSectionExists(sectionName) {
            refSections.orderByChild("secName").equalTo(sectionName).once("value", function(snapshot) {
              var exists = (snapshot.val() !== null);
              console.log(exists);
              sectionExistsCallback(sectionName, exists);
            });
          }

          function getValueUsingClass(chkArray) {
            /* declare an checkbox array */
            var chkArray = [];

            /* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
            $(".chk:checked").each(function() {
              chkArray.push($(this).val());
            });

            /* we join the array separated by the comma */
            var selected;
            selected = chkArray.join(',');

            /* check if there is selected checkboxes, by default the length is 1 as it contains one single comma */
            if ($('#sel').val() == "Custom") {
              if (selected.length > 1) {
                console.log("You have selected " + selected);
              } else {
                alert("Please at least one of the checkbox");
              }
            }

            return chkArray;
          }


          // START DATA EDIT
          $("#datatable-buttons").on("mousedown", "td .fa.fa-minus-square", function(e) {
            //clicked row
            var $row = $(this).closest("tr");
            //get first value in td (SN)
            var code = $row.find("td:nth-child(2)").html();
            //REMOVE SECTION
            refSections.orderByChild("sectionCode").equalTo(code).on("child_added", function(snapshot) {
              var sectionName = snapshot.child('secName').val();
              //Update in database
              refSections.child(snapshot.key).remove().then(function() {
                var subjectCount = 0
                refSubjects.orderByChild("sectionCode").equalTo(code).on("child_added", function(snapshot) {
                  //REMOVE SUBJECTS
                  subjectCount = subjectCount + 1;
                  //remove subjects in database
                  refSubjects.child(snapshot.key).remove().then(function() {
                    $('#alert-danger-remove').addClass('hide');
                    $('#alert-success-remove').removeClass('hide');
                    $('#nameOfSection').html(sectionName);
                    $('#numberOfSubj').html(subjectCount);
                  }).catch(function(error) {
                    $('#alert-success-remove').addClass('hide');
                    $('#alert-danger-remove').removeClass('hide');
                  });
                });
              }).catch(function(error) {
                $('#alert-success-remove').addClass('hide');
                $('#alert-danger-remove').removeClass('hide');
              });
            });

            $('#datatable-buttons').DataTable().row($row).remove().draw();
          });
          //EDIT
          $("#datatable-buttons").on('mousedown.edit', "i.fa.fa-pencil-square", function(e) {

            $(this).removeClass().addClass("fa fa-envelope-o");
            var $row = $(this).closest("tr").off("mousedown");
            var $tds = $row.find("td").not(':first').not(':last').not('td:nth-child(2)').not('td:nth-child(5)');

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

            $(this).removeClass().addClass("fa fa-pencil-square");
            //clicked row
            var $row = $(this).closest("tr");
            //get all td's in row
            var $tds = $row.find("td").not(':first').not(':last').not('td:nth-child(2)').not('td:nth-child(5)');
            //get first value in td (parentKey (hidden))
            var parentKey = $row.find(".sorting_1").html();
            //Array of entities
            var entity = ["secName", "secGrade"];
            // loop all td
            $.each($tds, function(i, el) {
              //get value of each td
              var txt = $(this).find("input").val();
              $(this).html(txt);

              //Update in database
              const refSectionEdit = database.ref().child('Sections/' + parentKey);
              refSectionEdit.update({
                [entity[i]]: txt
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

          //DISABLE ENABLE CHECKBOX
          $('#sel').change(function() {
            if ($(this).val() == "Custom") {
              $(':checkbox').each(function() {
                $(this).prop('disabled', false);
                $("#btnAddSubject").show();
              });

              // Select all
              $("A[href='#select_all']").click(function() {
                $("#" + $(this).attr('rel') + " INPUT[type='checkbox']").attr('checked', true);
                return false;
              });
              // Select none
              $("A[href='#select_none']").click(function() {
                $("#" + $(this).attr('rel') + " INPUT[type='checkbox']").attr('checked', false);
                return false;
              });
              // Invert selection
              $("A[href='#invert_selection']").click(function() {
                $("#" + $(this).attr('rel') + " INPUT[type='checkbox']").each(function() {
                  $(this).attr('checked', !$(this).attr('checked'));
                });
                return false;
              });
            } else {
              $(':checkbox').each(function() {
                $(this).prop('disabled', true);
                $(this).prop('checked', false);
                $("#btnAddSubject").hide();
              });
              $("#sectionSubjects").empty();
              var gradeLevel = $('#sel').val();
              refSections.orderByChild("secGrade").equalTo(gradeLevel).once("child_added", function(snapshot) {
                var sectionCode = snapshot.child("sectionCode").val();
                refSubjects.orderByChild("sectionCode").equalTo(sectionCode).on("child_added", function(snap) {
                  // var data = snap.val();
                  // console.log(snap);
                  var subjectName = snap.child("subjectName").val();
                  $("#sectionSubjects").append("&#9733; " + subjectName + "<br> ");

                });
              });
              $("#sSubjectsHeader").empty();
              $("#sSubjectsHeader").append("Subjects registered: <hr>");
            }
          });
          //           //CHECK IF DATATABLE HAS NO DATA
          //           if($('#datatable-buttons tbody tr').length < 1){
          //             $('#datatable-buttons').DataTable().clear().draw();
          //           }
          //HIDE ALERTS WHEN CLOSE BUTTON PRESSED
          $('.alert .close').click(function() {
            $(this).parent().addClass('hide');
          });
          //APPEND
          var input = [gidGenerator(), gidGenerator(), gidGenerator(), gidGenerator(), gidGenerator(), gidGenerator(), gidGenerator(), gidGenerator(), gidGenerator()],
            counterInput = 0;
          var inputChk = [gidGenerator(), gidGenerator(), gidGenerator(), gidGenerator(), gidGenerator(), gidGenerator(), gidGenerator(), gidGenerator(), gidGenerator()],
            counterChk = 0;
          const btnAddSubject = document.getElementById('btnAddSubject');
          var t = $('#datatable-buttons').DataTable();
          btnAddSubject.addEventListener('click', e => {
            var $btn = $("#btnAddSubject");
            counterInput = (counterInput + 1) % input.length; // increment your counter
            counterChk = (counterChk + 1) % input.length; // increment your counter
            // the modulus (%) operator resets the counter to 0
            // when it reaches the length of the array
            $("#optSubjects").append('<br><input type="checkbox" id="' + inputChk[counterChk] + '" class="chk" name="subjects[]" onclick="var input = document.getElementById(\'' + input[counterInput] + '\'); if(this.checked){ var txtVal =  $(\'#' + input[counterInput] + '\').val(); $(this).val(txtVal); input.disabled=true;}else{input.disabled=false}" />&nbsp;<input id="' + input[counterInput] + '"  class="chk"  name="subjects[]" />&nbsp;<button id="btnAddSubject" type="button" class="btn btn-sm btn-danger" onclick="$(\'#' + inputChk[counterChk] + '\').remove(); $(\'#' + input[counterInput] + '\').remove(); $(this).remove();" style="display: inline-block;">Remove</button>');
            if (counterInput == 0) {
              return !$btn.attr('disabled', 'disabled');
            }
          });
          //RANDOM CODE
          function gidGenerator() {
            var S4 = function() {
              return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return ("ID" + S4());
          }

          function guidGenerator() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (var i = 0; i < 5; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
            return ("SB" + text);
          }

        } else if (role == "Teacher") {
          window.location = 'upload-grades.html';
          console.log("Makalogin ya soy");
        } else {
          console.log("Not a user");
        }

      });

    } else {
      console.log("Not logged in");
      window.location = 'index.html';
    }
  })
});
