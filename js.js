fetch('products.json')
.then(response => response.json())
.then((data) => {
    for (const product of data.products){
        const findDiv = document.getElementById("product-box")
        const newElement = document.createElement("div")
        newElement.innerHTML = `
            <div class="product">
                <img src="${product.image}">
                <h3>${product.name}</h3><hr>
                <h4>${product.description}<h4><hr>
                <p>Price : €${product.price}</p>
                <p>Quantity : ${product.quantity}</p>
                <button onclick="window.location.href='productDetails.html?id=${product.id}'">Product Detail</button>
                <button onclick="addToCart('${product.name}', ${product.price})"">Add to Cart</button>
            </div>
        `
            findDiv.appendChild(newElement)
    }    
});


const localItems = JSON.parse(localStorage.getItem("quantity"));
let Items = [];



/*
const cartElement = document.getElementById('cart-items');
    const cartElementTotal = document.getElementById('cart-items-total');
    cartElement.innerHTML = '';
    localItems.forEach((key, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <span>${key.name} - €${(key.price*key.quantity).toFixed(2)}
            <div class="quantity">
                <button onclick="updateQuantity(${index},${key.quantity - 1})">-</button>
                <input type="number" value="${key.quantity}" min="0" max="10" onchange="updateQuantity(${index}, this.value)">
                <button onclick="updateQuantity(${index}, ${key.quantity + 1})">+</button>
            </div>
            </span>
            <button onclick="deleteFromCart(${index})">Delete</button>
        `;
        let totalPrice = 0;
        Items.forEach(item => {
        totalPrice += item.price * item.quantity;
        cartElementTotal.innerHTML = `<strong>Total<strong> : €${totalPrice.toFixed(2)}`
    });
        cartElement.appendChild(li);        
});*/


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
};


function deleteFromCart(index) {
    Items.splice(index, 1);
    updateCartDisplay();
};

function updateQuantity(index, quantity) {
    Items[index].quantity = quantity;
    updateCartDisplay();
};

function checkout() {
    let totalPrice = 0;
    Items.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
   // window.location.pathname = "/form.html";
};


function updateCartDisplay() {
    const cartElement = document.getElementById('cart-items');
    const cartElementTotal = document.getElementById('cart-items-total');
    cartElement.innerHTML = '';
    Items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <span>${item.name} - €${(item.price*item.quantity).toFixed(2)}
            <div class="quantity">
                <button onclick="updateQuantity(${index},${item.quantity - 1})">-</button>
                <input type="number" value="${item.quantity}" min="0" max="10" onchange="updateQuantity(${index}, this.value)">
                <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
            </div>
            </span>
            <button onclick="deleteFromCart(${index})">Delete</button>
        `;
        let totalPrice = 0;
        Items.forEach(item => {
        totalPrice += item.price * item.quantity;
        cartElementTotal.innerHTML = `<strong>Total Price<strong> : €${totalPrice.toFixed(2)}`
    });
        cartElement.appendChild(li);        
    });
};

