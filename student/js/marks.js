firebase.auth().onAuthStateChanged((user) => {
    if(user) {

        // check usertype
        var db = firebase.firestore();
        db.collection("users").doc(user.uid)
        .get().then((doc) => {
            let userType = doc.data().userType;

            if(userType === 'student'){
                // pull all subjects

                db.collection("studentssubjects")
                .where("studentUserId" , "==" , user.uid)
                .get().then((querSnapshot) => {
                    querSnapshot.forEach((doc) => {

                        let subjects = doc.data().subjects
                        console.log(subjects)
                        let marks = doc.data().marks;

                        const singleSubject = subjects.map((subject) => {
                            return subject
                        })
                        const singleMark = marks.map((mark, index) => {
                            return mark
                        })

                        
                            let content = '';

                            content += `<tr>`
                            content +=  `<td>${singleSubject[0]}</td>`
                            content += `<td>${singleMark[0]}</td>`
                            content+= `</tr>`

                            content += `<tr>`
                            content +=  `<td>${singleSubject[1]}</td>`
                            content += `<td>${singleMark[1]}</td>`
                            content+= `</tr>`

                            content += `<tr>`
                            content +=  `<td>${singleSubject[2]}</td>`
                            content += `<td>${singleMark[2]}</td>`
                            content+= `</tr>`

                            content += `<tr>`
                            content +=  `<td>${singleSubject[3]}</td>`
                            content += `<td>${singleMark[3]}</td>`
                            content+= `</tr>`

                            content += `<tr>`
                            content +=  `<td>${singleSubject[4]}</td>`
                            content += `<td>${singleMark[4]}</td>`
                            content+= `</tr>`
                            
                            $("#stugrades").append(content)
                       
                    })
                })
            }
        })
    }
    else{
        // window.location .href = "login.html"
    }
})