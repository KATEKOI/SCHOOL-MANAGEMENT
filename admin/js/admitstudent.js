
firebase.auth().onAuthStateChanged((user) => {
    if(user){
        var db = firebase.firestore();

        // db.collection("users").doc(user.uid)
        // .get().then((doc) => {
        //     let userType = doc.data().userType;

            // if(userType == 'admin'){

                document.getElementById("admitstudent").onclick = () => {
                    // get html elements

                    let studentName = document.getElementById("studentName").value;
                    let studentAdmnNo = document.getElementById("studentAdmnNo").value;
                    let email = document.getElementById("email").value;
                    let stream = document.getElementById("stream").value;
                    let hostel = document.getElementById("hostel").value;
                    let password = document.getElementById("password").value;
                    let timeStamp = firebase.firestore.Timestamp.fromDate(new Date());

                    if(studentName == ''){
                        alert(' name required')
                    }
                    else if(studentAdmnNo == ''){
                        alert("admn no required")
                    }
                    else if(stream == ''){
                        alert("Stream required")
                    }
                    else if(password == ''){
                        alert("password required")
                    }
                    else if(hostel == ''){
                        alert("hostel required")
                    }
                    else if (email == ''){
                        alert("email required")
                    }
                    else{
                        // invoke firebase
                        firebase.auth().createUserWithEmailAndPassword(email,password)
                        .then((userCredentials) => {
                
                            let user = userCredentials.user;
                            let uid = user.uid;
                            alert('user created')

                            // create collection
                            db.collection("users").doc(uid)
                            .set({
                                // name:studentName,
                                userId:uid,
                                userType:"student",
                                // Email:studentEmail
                            }).then(() => {
                                alert("user collection updated")
                                // create student collection
                                let studentDoc = db.collection("students").doc(); 
                                studentDoc.set({
                                    name:studentName,
                                    admnNo:studentAdmnNo,
                                    stream:stream,
                                    hostel:hostel,
                                    timeStamp:timeStamp,
                                    studentUserId:uid,
                                    studentDocId:studentDoc.id
                                }).then(() => {
                                    alert("student collection created")
                                    window.location.href = "/student/allstudents.html"
                                }).catch((error) => {
                                    console.log(error.message)
                                })
                            
                            }).catch((error) => {
                                console.log(error.message)
                            })

                        }).catch((error) => {
                            console.log(error.message)
                        })
                    }
                }
        //     // }
        //     else{

        //     }
        // })
    }
})