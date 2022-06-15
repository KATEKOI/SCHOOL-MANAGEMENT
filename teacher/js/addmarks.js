firebase.auth().onAuthStateChanged((user) => {
    if(user){
        // query the database
        var db = firebase.firestore();

        db.collection("users").doc(user.uid)
        .get().then((doc) => {
            let userType = doc.data().userType;

            if(userType === "teacher") {
                // pullsubjects taught by teacher

                db.collection("teachersSubjects")
                .where("teacherUserId", "==" , user.uid)
                .get().then((querySnapshot) => {
                    let subjects = doc.data().subjects

                    subjects.forEach((subject) => {

                        let content = '';

                        content += `<li>${subject}</li>`
                        content += ``
                        $("#teachersubjects").append(content)
                    })
                })
            }
        })
        
        // pull all students
        db.collection("students").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let name = doc.data().name;
                let studentUserId = doc.data().studentUserId;

                let content = '';
                content += `<option value="" </option>`
                $("#").append(content)

                // pull subjects of students;
                db.collection('studentssubjects')
                .where("studentUserId","==",studentUserId)
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let subjects = doc.data().subjects

                        subjects.forEach((subject) => {
                            let content = '';
                        })
                    })
                })
            })
        })
    
    }
    else {
        window.location.href = "login.html"
    }
})
firebase.auth().onAuthStateChanged((user) => {
    if(user){
        // query the database
        var db = firebase.firestore();

        db.collection("users").doc(user.uid)
        .get().then((doc) => {
            let userType = doc.data().userType;

            if(userType === "teacher") {
                 // pullsubjects taught by teacher
                 db.collection("teachersSubjects")
                 .where("teacherUserId", "==" , user.uid)
                 .get().then((querySnapshot) => {

                    let subjects = doc.data().subjects

                    subjects.forEach((subject) => {

                        let content = '';

                        content += `<li>${subject}</li>`
                        content += ``
                        $("#teachersubjects").append(content)
                    })
                 })

                //  pull all students;
                db.collection('students').get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let name = doc.data().name;
                        let studentUserId = doc.data().studentUserId
                        let content = '';

                        content += `<tr>`
                        content += `<td>${name}</td>`
                        content += `<td><button onClick="displaySubjects(\`${studentUserId}\`)" data-bs-target="#studentsmarksmodal" data-bs-toggle="modal" class ="btn btn-outline-primary">ADD MARKS</button></td>`
                        content += `</tr>`

                        $("#studentsmarks").append(content)
                    })
                })
                // display student subjects
                window.displaySubjects = (value) => {
                   db.collection("studentssubjects")
                   .where("studentUserId","==",value)
                   .get().then((querySnapshot) => {
                       querySnapshot.forEach((doc) => {
                           let subjects = doc.data().subjects;
                           let studentSubjectDocId = doc.data().studentSubjectDocId

                           subjects.forEach((subject) => {
                            let content = ''
                            content += `<tr>` 
                            content += `<td>${subject}</td>`
                            content +=`<td><input id="studentsMarks" type="text"></td>`
                            content +=`</tr>`
                            $("#tobeaddedmarks").append(content);
                           })
                             //    update marks
                document.getElementById('addstudentmarksbtn').onclick = () => {

                    $('input[id^="studentsMarks"]').each(function(index,item){
                        var value = $(item).val();
                        // var id = $('input[id^="studentsMarks"]').alert('id')
                        // const marks = [];
                        //  marks.push(value);

                        //  console.log(marks);
                         // update marks
                    db.collection("studentssubjects")
                    .doc(studentSubjectDocId).update({
                        marks:value
                    }).then(() => {
                        alert("marks added")
                    }).catch((error) => {
                        console.log(error.message);
                    })
                   
                    })
                }
                       })
                   })
              
                }
            }
            else {
                window.location.href = "/admin/login.html"
            }
        })
    }
    else {
        window.location.href = "/admin/login.html"
    }
})