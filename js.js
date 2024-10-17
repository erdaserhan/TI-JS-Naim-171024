let retString = localStorage.getItem("quantity");
let retArray = JSON.parse(retString)

fetch('products.json')
.then(response => response.json())
.then((data) => {
    for (const product of data.products){
        const findDiv = document.getElementById("product-box")
        const newElement = document.createElement("div")
        newElement.innerHTML = `
            <div class="product">
                <img src="${product.image}">
                <h3>${product.name}</h3>
                <h4>${product.description}<h4>
                <p>${product.price} ${retArray.name}</p>
                <p>Quantity : ${product.quantity}</p>
                <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            </div>
        `
        findDiv.appendChild(newElement)
    }    
})



let Items = [];

console.log(Items);

function addToCart(name, price) {
    const index = Items.findIndex(item => item.name === name);
    if (index !== -1) {
        Items[index].quantity += 1;
    } else {
        const item = {
            name: name,
            price: price,
            quantity: 1
        };
        Items.push(item);
    }
    updateCartDisplay();
    localStorage.setItem("quantity", JSON.stringify(Items));
}


function deleteFromCart(index) {
    Items.splice(index, 1);
    updateCartDisplay();
}

function updateQuantity(index, quantity) {
    Items[index].quantity = quantity;
    updateCartDisplay();
}

