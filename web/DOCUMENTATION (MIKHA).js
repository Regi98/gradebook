// FOR PUSHING WITH ALERTS
const refSections = firebase.database().ref().child('Sections/');  

var push = {};
                push = {
                    secGrade: gradeLevel,
                    secName: sectionName,
                    sectionCode: sectionCode
                };
                refSections.push(push).then(function(){
                    $('#alert-success').removeClass('hide');
                }).catch(function(error){
                    $('#alert-danger').removeClass('hide');
                }); 


// FOR UPDATE WITH ALERTS
const refSections = firebase.database().ref().child('Sections/');  

var key = refSections.push().key;
                var push = {};
                push[key] = {
                    secGrade: gradeLevel,
                    secName: sectionName,
                    sectionCode: sectionCode
                };
                refSections.push(push).then(function(){
                    $('#alert-success').removeClass('hide');
                }).catch(function(error){
                    $('#alert-danger').removeClass('hide');
                }); 
//CATCH
/* FOR NEW*/
.then(function(){
                    $('#alert-success').removeClass('hide');
                }).catch(function(error){
                    $('#alert-danger').removeClass('hide');
                }); 
/*FOR REMOVE*/
.then(function(){
                    $('#alert-danger-remove').addClass('hide');
                    $('#alert-success-remove').removeClass('hide');
                }).catch(function(error){
                    $('#alert-success-remove').addClass('hide');
                    $('#alert-danger-remove').removeClass('hide');
                }); 

//ALERT WITH CLOSE BUTTON

/*CLASS*/ alert-dismissable

<a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>

//VALIDITY CHECK
document.getElementById('your_input_id').validity.valid


//EXIST
//ADD NEW SECTION
        const btnCreateSection = document.getElementById('uploadFirebase');
            btnCreateSection.addEventListener('click', e => {
                var sectionName = $('#txtSectionName').val();
                checkIfSectionExists(sectionName);
                
            });
        function sectionExistsCallback(sectionName, exists) {
              if (exists) {
                alert('section ' + sectionName + ' exists!');
              } else {
                
              }
        }

            // Tests to see if /sections/<sectionId> has any data. 
        function checkIfSectionExists(sectionName) {
              refSections.orderByChild("secName").equalTo(sectionName).once("child_added", function(snapshot) {
                var exists = (snapshot.val() !== null);
                sectionExistsCallback(sectionName, exists);
              });
        }


















console.log("WORKPLS");
                var subjects = getValueUsingClass();
                console.log(subjects);
                var gradeLevel = $('#gradeLevel').val();
                var sectionCodeOnce = guidGenerator();
                var sectionCodeGen = sectionCodeOnce;
                var subjectCode = guidGenerator();
                /* check if the selected in dropdown is 7,8,9,or 10 */
                if ($('#sel').val() == "7") {
                    refSections.once("child_added", snap => {
                     var secGrade = snap.child("secGrade").val();
                     var sectionCode = snap.child("sectionCode").val();
                     alert(sectionCode);
                        if (secGrade.includes("7")) {
                            var pushSection = {};
                                pushSection = {
                                    secGrade: gradeLevel,
                                    secName: sectionName,
                                    sectionCode: sectionCodeGen
                                };
                                refSections.push(pushSection).then(function(){
                                    $('#alert-success').removeClass('hide');
                                }).catch(function(error){
                                    $('#alert-danger').removeClass('hide');
                                });
                            refSubjects.orderByChild("sectionCode").equalTo(sectionCode).on("child_added", function(snapshot) {
                                var subjectName = snapshot.child("subjectName").val();
                                var pushSubjects = {};
                                pushSubjects = {
                                    sectionCode: sectionCodeGen,
                                    subjectCode: subjectCode,
                                    subjectName: subjectName,
                                    subjectTeacherID: false
                                };
                                refSubjects.push(pushSubjects).then(function(){
                                        $('#alert-success').removeClass('hide');
                                    }).catch(function(error){
                                        $('#alert-danger').removeClass('hide');
                                    });  
                            });
                        }else{
                            $('#alert-danger-no-subject').removeClass('hide');
                        }
                    });
                }
                else if ($('#sel').val() == "8") {
                    refSections.once("child_added", snap => {
                     var secGrade = snap.child("secGrade").val();
                     var sectionCode = snap.child("sectionCode").val();
                     alert(sectionCode);
                        if (secGrade.includes("8")) {
                            var pushSection = {};
                                pushSection = {
                                    secGrade: gradeLevel,
                                    secName: sectionName,
                                    sectionCode: sectionCodeGen
                                };
                                refSections.push(pushSection).then(function(){
                                    $('#alert-success').removeClass('hide');
                                }).catch(function(error){
                                    $('#alert-danger').removeClass('hide');
                                });
                            refSubjects.orderByChild("sectionCode").equalTo(sectionCode).on("child_added", function(snapshot) {
                                var subjectName = snapshot.child("subjectName").val();
                                var pushSubjects = {};
                                pushSubjects = {
                                    sectionCode: sectionCodeGen,
                                    subjectCode: subjectCode,
                                    subjectName: subjectName,
                                    subjectTeacherID: false
                                };
                                refSubjects.push(pushSubjects).then(function(){
                                        $('#alert-success').removeClass('hide');
                                    }).catch(function(error){
                                        $('#alert-danger').removeClass('hide');
                                    });  
                            });
                        }else{
                            $('#alert-danger-no-subject').removeClass('hide');
                        }
                    });
                }
                else if ($('#sel').val() == "9") {
                    refSections.once("child_added", snap => {
                     var secGrade = snap.child("secGrade").val();
                     var sectionCode = snap.child("sectionCode").val();
                     alert(sectionCode);
                        if (secGrade.includes("9")) {
                            var pushSection = {};
                                pushSection = {
                                    secGrade: gradeLevel,
                                    secName: sectionName,
                                    sectionCode: sectionCodeGen
                                };
                                refSections.push(pushSection).then(function(){
                                    $('#alert-success').removeClass('hide');
                                }).catch(function(error){
                                    $('#alert-danger').removeClass('hide');
                                });
                            refSubjects.orderByChild("sectionCode").equalTo(sectionCode).on("child_added", function(snapshot) {
                                var subjectName = snapshot.child("subjectName").val();
                                var pushSubjects = {};
                                pushSubjects = {
                                    sectionCode: sectionCodeGen,
                                    subjectCode: subjectCode,
                                    subjectName: subjectName,
                                    subjectTeacherID: false
                                };
                                refSubjects.push(pushSubjects).then(function(){
                                        $('#alert-success').removeClass('hide');
                                    }).catch(function(error){
                                        $('#alert-danger').removeClass('hide');
                                    });  
                            });
                        }else{
                            $('#alert-danger-no-subject').removeClass('hide');
                        }
                    });
                }
                else if ($('#sel').val() == "10") {
                    refSections.once("child_added", snap => {
                     var secGrade = snap.child("secGrade").val();
                     var sectionCode = snap.child("sectionCode").val();
                     alert(sectionCode);
                        if (secGrade.includes("10")) {
                            var pushSection = {};
                                pushSection = {
                                    secGrade: gradeLevel,
                                    secName: sectionName,
                                    sectionCode: sectionCodeGen
                                };
                                refSections.push(pushSection).then(function(){
                                    $('#alert-success').removeClass('hide');
                                }).catch(function(error){
                                    $('#alert-danger').removeClass('hide');
                                });
                            refSubjects.orderByChild("sectionCode").equalTo(sectionCode).on("child_added", function(snapshot) {
                                var subjectName = snapshot.child("subjectName").val();
                                var pushSubjects = {};
                                pushSubjects = {
                                    sectionCode: sectionCodeGen,
                                    subjectCode: subjectCode,
                                    subjectName: subjectName,
                                    subjectTeacherID: false
                                };
                                refSubjects.push(pushSubjects).then(function(){
                                        $('#alert-success').removeClass('hide');
                                    }).catch(function(error){
                                        $('#alert-danger').removeClass('hide');
                                    });  
                            });
                        }else{
                            $('#alert-danger-no-subject').removeClass('hide');
                        }
                    });
                }
                else if ($('#sel').val() == "Custom") {
                    var pushSection = {};
                    pushSection = {
                        secGrade: gradeLevel,
                        secName: sectionName,
                        sectionCode: sectionCodeGen
                    };
                    alert(subjects.length);
                    for (var i = 0; i < subjects.length; i++) {
                    var pushSubjects = {};
                    pushSubjects = {
                        sectionCode: sectionCodeGen,
                        subjectCode: subjectCode,
                        subjectName: subjects[i],
                        subjectTeacherID: false
                    };
                        refSubjects.push(pushSubjects).then(function(){
                            $('#alert-success').removeClass('hide');
                        }).catch(function(error){
                            $('#alert-danger').removeClass('hide');
                        }); 
                    }
                    refSections.push(pushSection).then(function(){
                        $('#alert-success').removeClass('hide');
                    }).catch(function(error){
                        $('#alert-danger').removeClass('hide');
                    }); 
                    }
                else{
                    console.log("Unknown grade level!");
                }