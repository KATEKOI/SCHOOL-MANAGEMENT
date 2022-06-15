firebase.auth().onAuthStateChanged((user) => {
    if(user){
        
        // get the usertype
        var db = firebase.firestore()
        db.collection("users").doc(user.uid)
        .get().then((doc) => {

            let userType = doc.data().userType;
            let teachername = doc.data().name;
            document.getElementById("teachername").innerHTML = teachername;
            if(userType === "teacher") {
                // lets add subjects
                document.getElementById("addsubjects").onclick = () => {

                    // get all subjects

                    let humanities = document.getElementById("humanities").value;
                    let technicals = document.getElementById("technicals").value;

                    // invoke firebase

                    let teacherSubDoc = db.collection("teachersSubjects").doc();
                    teacherSubDoc.set({
                        teacherUserId:user.uid,
                        teacherSubDocId:teacherSubDoc.id,
                        subjecjs:['Maths' , 'English' , 'Kiswahili' , technicals , humanities]
                    }).then(() => {
                        alert("subjects added")
                    }).catch((error) => {
                        console.log(error.message)
                    })
                }
            }

        })
    }else{
        window.location.href = "teacher/teachdash.tml"
    }
})