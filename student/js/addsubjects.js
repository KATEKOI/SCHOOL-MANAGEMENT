firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        var db = firebase.firestore();

        // check usertype

        db.collection("users").doc(user.uid)
        .get().then((doc) => {
            let userType = doc.data().userType;
            let name =doc.data().name;

            document.getElementById("studentname").innerHTML = name;
            if(userType === 'student'){
                //  add subjects
                document.getElementById("addsubjects").onclick = function () {
                    // get html elements
                    let maths = document.getElementById("maths");
                    let english = document.getElementById("english");
                    let kiswahili = document.getElementById("kiswahili");
                    
                    let humanities = document.getElementById("humanities").value
                    let technicals = document.getElementById("technicals").value
                    
                    // check selections
                    if(maths.checked == true) {
                        var mathSubject = 'true'
                    }
                    else {
                        var mathSubject = 'false'
                    }
                    if(english.checked == true){
                        var englishSubject = 'English'
                    }
                    if(kiswahili.checked == true){
                        var kiswahiliSubject = 'Kiswahili'
                    }
                

                    // invoke firebase creating subjects collection
                    let studentSubjectDoc = db.collection("studentssubjects").doc();
                    studentSubjectDoc.set({
                        studentUserId:user.uid,
                        studentSubjectDoc:studentSubjectDoc,
                        subjects:['Maths' , 'English' , 'Kiswahili' , technicals , humanities],
                        marks:['pending','pending','pending','pending','pending']
                    }).then(() => {
                        alert("collection created")
                        window.location.href = "/student/marks.html"
                    }).catch((error) => {
                        console.log(error.message)
                    })
                }
            }
            else {
                window.location.href = "/admin/login.html"
            }
        })
    }
})