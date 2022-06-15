firebase.auth().onAuthStateChanged((user) => {
    if (user){
        var db = firebase.firestore();
        db.collection("users").doc(user.uid)
        .get().then((doc) =>{
            let userType = doc.data().userType;

            if(userType == 'admin'){
                // pull all students

                db.collection("students").get().then((querySnapshot) => {
                    
                    querySnapshot.forEach((doc) => {
                        let admnNo = doc.data().admnNo;
                        let name = doc.data().name;
                        let stream = doc.data().stream;
                        let studentUserId = doc.data().studentUserId;
                        let studentDocId = doc.data().studentDocId;
                        let carrieId = studentDocId + "?" + studentUserId
                        console.log (name)
                        let content = '';
                        content += `<tr>` 
                        content += `<td>${name}</td>`
                        content += `<td>${admnNo}</td>`
                        content += `<td>${stream}</td>`
                        content += `<div style="display: flex;">`
                        content += `<td><button onClick="editStudent(\`${carrieId}\`)"data-bs-toggle="modal" data-bs-target="#editinfo">update</button></td>`    
                        content += `<td><button onClick="deletestudent" class="btn btn-outline-danger">delete</button></td>` 
                        content += `<td><button onClick="viewMore(\`${studentDocId}\`)" data-bs-toggle="modal" data-bs-target="#moreinfoteachermodal">view more</button></td>`   
                        content += `</div>`
                        content += `</tr>`

                        $("#allstudents").append(content)
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

                    db.collection("students")
                    .where("studentDocId", "==", value)
                    .get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            let admnNo = doc.data().adminNo;
                            let name = doc.data().name;
                            let stream = doc.data().stream;
                            let hostel = doc.data().hostel

                        document.getElementById("name").innerHTML = name;
                        document.getElementById("stream").innerHTML = stream;
                        document.getElementById("hostel").innerHTML = hostel;
                        document.getElementById("admnNo").innerHTML = admnNo;
                        })
                        
                    })
                }

                    // edit student
                    window.editStudent = (value) => {

                        let result = value.split("?")
                        let studentDocId = result[0]
                        let studentUserId = result[1]

                        // invoke firbase
                        db.collection("students").doc(studentDocId)
                        .get().then((doc) => {
                        
                        let name = doc.data().name;
                        let stream = doc.data().stream;
                        let hostel = doc.data().hostel;
                        let admnNo = doc.data().admnNo

                        document.getElementById("studentName").value = name;
                        document.getElementById("stream").value = stream;
                        document.getElementById("admnNo").value = admnNo;
                        document.getElementById("hostel").value = hostel;
                        })
        
                        // update student info
                        document.getElementById("updatebtn").onclick = () => {
                            // get new details
                            let name =document.getElementById("name").value;
                            let admnNo =document.getElementById("admnNo").value;
                            let stream =document.getElementById("stream").value;
                            let hostel =document.getElementById("hostel").value;
                            let timeStamp = firebase.firestore.Timestamp.fromDate(new Date());
                            // invoke firebase
                            db.collection("students").doc(studentDocId)
                            .update({
                                name:name,
                                admnNo:admnNo,
                                stream:stream,
                                hostel:hostel,
                                updateTimeStamp:timeStamp
                            }).then(() => {
                                alert("details edited")
                                // update users collection
                                db.collection("users").doc(studentUserId)
                                .update({
                                    name:name
                                })
                                .then(() => {
                                    alert("user successfully updated")
                                    window.location.href = "/allstudents.html"
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
        // window.location.href= "login.html"
    }
})