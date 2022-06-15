// document.getElementById("resetbtn").onclick = () => {
//     alert("clicked")
//     // get the email address
//     let email = document.getElementById("resetemail").value;
//     // invoke firebase
//     firebase.auth().sendPasswordResetEmail(email)
//     .then(() => {
//         document.getElementById("success").style.display = "block"
//         document.getElementById("success").innerHTML = error.message
  

//     }).catch((error) => {
//         document.getElementById("erroralert").style.display = "block"
//         document.getElementById("erroralert").innerHTML = error.message

//         setTimeout(() => {
//             document.getElementById("erroralert").style.display = "none"
//             , 15000});
//     })
// }