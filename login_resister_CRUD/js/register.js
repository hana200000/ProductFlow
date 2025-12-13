const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmedPasswordInput = document.getElementById("confirmedPassword");
const loginbtn = document.getElementById("loginbtn");


loginbtn.addEventListener("click", function(){
    const name= nameInput.value.trim();
    const email= emailInput.value.trim();
    const password= passwordInput.value.trim();
    const confirmedPassword= confirmedPasswordInput.value.trim();

    if(!name || !email || !password || !confirmedPassword){
        alert("please Enter all the required inputs!");
        return;
    }

    let users=JSON.parse(localStorage.getItem("users")) || [];
     const existUser = users.find(function(user){
        return user.email === email;
     });

     if(existUser){
        alert("This email is already in use!");
        return;
     }
    
     if(password !== confirmedPassword){
    alert("passwords do not match! please try again!");
            passwordInput.value="";
            confirmedPasswordInput.value="";
            return;
    }
    
     users.push({name , email , password ,confirmedPassword});
     localStorage.setItem("users", JSON.stringify(users));
     alert("you have registered successfully!");
     window.location.href="signIn.html";

})