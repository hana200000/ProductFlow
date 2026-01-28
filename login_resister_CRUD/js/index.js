let products = JSON.parse(localStorage.getItem("products")) || [];
let editindex = -1;

function saveToLocalStorage(){
    localStorage.setItem("products", JSON.stringify(products));
}

const welcomeName = document.getElementById("welcomeName");
const logoutBTN = document.getElementById("logoutBTN");
const user = JSON.parse(localStorage.getItem("LoggedInUser"));
welcomeName.textContent = "Welcome Back ," + user.name;

function addProduct(){
    let productImage= document.getElementById("productImage").files[0];
    let productName= document.getElementById("productName").value;
    let productDescription= document.getElementById("productDescription").value;
    let productPrice= document.getElementById("productPrice").value;
    
    if (!productName || !productPrice ){
        alert("Please Enter both Product Name and Price");
        return;
    }
    if (productImage){
        let reader = new FileReader();
        reader.onload = function(e){
        let imgURL = e.target.result;
        saveProduct(imgURL , productName , productDescription , productPrice);
        }
        reader.readAsDataURL(productImage)
    }
    else{
    saveProduct(" ", productName, productDescription, productPrice );
}}

function saveProduct( productImage, productName, productDescription, productPrice ){
    products.push({productImage, productName, productDescription, productPrice});
    saveToLocalStorage();
    showProduct();
    clearForm();
}

function showProduct(){
    let cards =document.getElementById("cardContainer");
    cards.innerHTML= " ";
    products.forEach((product , index) => {
        cards.innerHTML += ` 
        <div class="card">
        <div> ${ product. productImage ? ` <img src="${product.productImage}"> ` : "no Product Image" }</div>
        <h3> Product Name: ${ product. productName}</h3>
        <p>  Product Description: ${ product. productDescription}<p>
        <p> Product Price: ${ product. productPrice} $<p>
        <div class="btnContainer ">
        <p> <button onclick="deleteProduct(${index})" > Delete</button></p>
        <p> <button onclick="editProduct(${index})" > Edit</button></p>
        </div>
        `
    }
)}

function clearForm(){
    document.getElementById("productImage").value="";
    document.getElementById("productName").value="";
    document.getElementById("productDescription").value="";
    document.getElementById("productPrice").value="";
}

function deleteProduct(index){
products.splice(index , 1);
saveToLocalStorage();
showProduct();
}

function editProduct(index){
    let product = products[index];
    document.getElementById("productName").value= product.productName;
    document.getElementById("productDescription").value=product.productDescription;
    document.getElementById("productPrice").value= product.productPrice;
    document.getElementById("updateBTN").style.display="inline";
    document.getElementById("addBTN").style.display="none";
    editindex = index;

}

function updateProduct(){
    let productImage= document.getElementById("productImage").files[0];
    let productName= document.getElementById("productName").value;
    let productDescription= document.getElementById("productDescription").value;
    let productPrice= document.getElementById("productPrice").value;

    if (!productName || !productPrice ){
        alert("Please Enter both Product Name and Price");
        return;
    }

    if(productImage){
        let reader = new FileReader();
        reader.onload= function(e){
            products[editindex].productImage = e.target.result;
            products[editindex].productName = productName ;
            products[editindex].productDescription = productDescription;
            products[editindex].productPrice = productPrice ;
            finishUpdate()
        }
        reader.readAsDataURL(productImage);
    }
    else{
        products[editindex].productName = productName ;
        products[editindex].productDescription = productDescription;
        products[editindex].productPrice = productPrice ;
        finishUpdate();
    }
}

function finishUpdate(){
    saveToLocalStorage();
    showProduct();
    clearForm();
    document.getElementById("updateBTN").style.display="none";
    document.getElementById("addBTN").style.display="inline";
}

logoutBTN.addEventListener("click", function(){
    localStorage.removeItem("loggedInuser");
    window.location.href="signIn.html"
})

showProduct();
