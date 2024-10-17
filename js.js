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
                <p>${product.price}</p>
                <p>Quantity : ${product.quantity}</p>
                <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            </div>
        `
        findDiv.appendChild(newElement)
    }    
})

