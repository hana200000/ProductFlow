const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signInbtn = document.getElementById("signInbtn");

signInbtn.addEventListener("click" , function(){
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password){
    alert("please Enter all the required inputs!");
    return;
}

let users = JSON.parse(localStorage.getItem("users")) || [];

const user = users.find(function(user){
    return user.email === email && user.password === password;
});

if(!user){
    alert("invalid email or password!");
    return;
}
localStorage.setItem("LoggedInUser", JSON.stringify(user));
alert("you are successfully loggedin");
window.location.href="index.html";
})