firebase.auth().onAuthStateChanged((user) => {
    if (user){
        var db = firebase.firestore();
        db.collection("users").doc(user.uid)
        .get().then((doc) =>{
            let userType = doc.data().userType;

            if(userType == 'admin'){
                // pull all teachers

                db.collection("teachers").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                        let phoneNum = doc.data().phoneNum;
                        let name = doc.data().name;
                        let staffno = doc.data().staffno;
                        let teacherUserId = doc.data().teacherUserId;
                        let teacherDocId = doc.data().teacherDocId;

                        let carriedId = teacherDocId + "?" + teacherUserId
                        
                        let content = '';
                        content += `<tr>` 
                        content += `<td>${name}</td>`
                        content += `<td>${phoneNum}</td>`
                        content += `<td>${staffno}</td>`
                        content += `<div style="display: flex;">`
                        content += `<td><button onClick="editTeacher(\`${carriedId}\`)"data-bs-toggle="modal" data-bs-target="#editinfo" class="btn btn-outline-primary">update</button></td>`    
                        content += `<td><button onClick="deleteTeacher(\`${carriedId}\`)" class="btn btn-outline-danger"  data-bs-target="#deleteteachermodal">delete</button></td>` 
                        content += `<td><button onClick="viewMore(\`${teacherDocId}\`)" data-bs-toggle="modal" data-bs-target="#moreinfoteachermodal" class="btn btn-outline-primary>view more</button></td>`   
                        content += `</div>`
                        content += `</tr>`

                        $("#teachers").append(content);
                    })
                    
                })
            
                 // view more details
                window.viewMore = (value) => {
                    // db.collection("teachers").doc(value)
                    // .get().then((doc) => {
                    //     let phoneNum = doc.data().phoneNum;
                    //     let name = doc.data().name;
                    //     let staffno = doc.data().staffno;
                    //     let residence = doc.data().residence

                    //     document.getElementById("name").innerHTML = name;
                    //     document.getElementById("number").innerHTML = phoneNum;
                    //     document.getElementById("staffno").innerHTML = staffno;
                    //     document.getElementById("residence").innerHTML = residence;
                    // })
                    db.collection("teachers")
                    .where("teacherDocId", "==", value)
                    .get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            let phoneNum = doc.data().phoneNum;
                            let name = doc.data().name;
                            let staffno = doc.data().staffno;
                            let residence = doc.data().residence

                        document.getElementById("name").innerHTML = name;
                        document.getElementById("number").innerHTML = phoneNum;
                        document.getElementById("staffno").innerHTML = staffno;
                        document.getElementById("residence").innerHTML = residence;
                        })
                        
                    })
                
                }
               

                    // edit teacher
                    window.editTeacher = (value) => {

                        let result = value.split("?")
                        let teacherDocId = result[0]
                        let teacherUserId = result[1]

                        // invoke firbase
                        db.collection("teachers").doc(teacherDocId)
                        .get().then((doc) => {
                            let phoneNum = doc.data().phoneNum;
                        let name = doc.data().name;
                        let staffno = doc.data().staffno;
                        let residence = doc.data().residence

                        document.getElementById("teacherName").value = name;
                        document.getElementById("staffno").value = staffno;
                        document.getElementById("teacherphonenum").value = phoneNum;
                        document.getElementById("placeofresidence").value = residence;
                        })
        
                        // update teacher info
                        document.getElementById("updatebtn").onclick = () => {
                            // get new details
                            let name =document.getElementById("teacherName").value;
                            let staffno =document.getElementById("teacherstaffno").value;
                            let phoneNum =document.getElementById("teacherphonenum").value;
                            let residence =document.getElementById("placeofresidence").value;
                            let timeStamp = firebase.firestore.Timestamp.fromDate(new Date());
                            // invoke firebase
                            db.collection("teachers").doc(teacherDocId)
                            .update({
                                name:name,
                                staffno:staffno,
                                phoneNum:phoneNum,
                                residence:residence,
                                updateTimeStamp:timeStamp
                            }).then(() => {
                                alert("details edited")
                                // update users collection
                                db.collection("users").doc(teacherUserId)
                                .update({
                                    name:name
                                })
                                .then(() => {
                                    alert("user successfully updated")
                                    window.location.href = "/allteacher.html"
                                }).catch((error) => {
                                    console.log(error.message)
                                })
                            }).catch((error) => {
                                console.log(error.message)
                        })
                        }
                    }
                    // delete teachers
                    window.deleteTeacher = (value) => {
                        let teacherDocId = value.split('?')[0];
                        let teacherUserId = value.split('?')[1]
                        document.getElementById("deleteteacherbtn").onclick = function(){
                            // invoke firebaase
                            db.collection("teachers").doc(teacherDocId)
                            .delete().then(() => {
                                alert("teacher deleted")

                            }).then(() => {
                                db.collection("users").doc(teacherUserId)
                                .delete().then(() => {
                                    alert("teacher deleted")
                                }).catch((error) => {
                                    console.log(error.message)
                                })
                            }).catch((error) => {
                                console.log(error.message)
                            })
                        }

                    }
                
            }
            else{
                // window.location.href= "/admin/login.html"
            }
        })
    }else {
        window.location.href= "login.html"
    }
})