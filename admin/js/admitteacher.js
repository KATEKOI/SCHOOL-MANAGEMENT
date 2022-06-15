firebase.auth().onAuthStateChanged((user) => {
    if(user){
        var db = firebase.firestore();

        // db.collection("users").doc(user.uid)
        // .get().then((doc) => {
        //     let userType = doc.data().userType;

            // if(userType == 'admin'){

                document.getElementById("addteacher").onclick = () => {
                    // get html elements

                    let teacherName = document.getElementById("teacherName").value;
                    let staffno = document.getElementById("staffno").value;
                    let placeofresidence = document.getElementById("placeofresidence").value;
                    let email = document.getElementById("teacheremail").value;
                    let password = document.getElementById("teacherpassword").value;
                    let teacherphonenum = document.getElementById("teacherphonenum").value;
                    let timeStamp = firebase.firestore.Timestamp.fromDate(new Date());

                    if(teacherName === ''){
                        alert('teachers name required')
                    }
                    else if(staffno == ''){
                        alert("staffno required")
                    }
                    else if(teacherphonenum == ''){
                        alert("phonenum required required")
                    }
                    else if(placeofresidence == ''){
                        alert("placeofresidence required")
                    }
                    else{
                        // invoke firebase
                        firebase.auth().createUserWithEmailAndPassword(email,password)
                        .then((userCredentials) => {
                
                            let user = userCredentials.user;
                            let uid =user.uid;
                            alert('user created')
                            // create collection
                            db.collection("users").doc(uid)
                            .set({
                                // name:teacherName,
                                userId:uid,
                                userType:"teacher",
                                // email:email
                            }).then(() => {
                                alert("user collection updated")
                                // create teacher collection
                                let teacherDoc = db.collection("teachers").doc();
                                teacherDoc.set({
                                    staffno:staffno,
                                    phoneNum:teacherphonenum,
                                    residence:placeofresidence,
                                    timeStamp:timeStamp,
                                    name:teacherName,
                                    teacherUserId:uid,
                                    teacherDocId:teacherDoc.id
                                }).then(() => {
                                    alert("teachers collection created")
                                    window.location.href = "/teacher/allteachers.html"
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
            // }
            // else{

            // }
        // })
    }
})