document.getElementById("login").onclick = function() {
    
    document.getElementById("loggingin").style.display = "block"
    // get email and password

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;


    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((userCredentials) => {
        let user = userCredentials.user;
        let uid = user.uid;

        // check the usertype
        firebase.firestore().collection("users")
        .doc(uid).get().then((doc) => {

            let userType = doc.data().userType;


            if(userType == "admin"){
                window.location.href = "/admin/dashboard.html"
            }
            else if(userType == 'student') {
                window.location.href = "/student/studash.html"
            }
            else {
                window.location.href = "/teacher/teachdash.html"
            }
        })

        // alert("hey am signing in")
    })
    .catch ((error) => {
        document.getElementById("erroralert").innerHTML = "check your email and password"  
        // document.getElementById("erroralert").innerHTML = error.message  
        document.getElementById("erroralert").style.display = "block"
        document.getElementById("loggingin").style.display = "none"
        document.getElementById("login").style.display = "block"
        // console.log(errorMessage)
})
}
