const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

if (productId) {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            // Check if data is an array or if it contains a 'products' array
            let products = Array.isArray(data) ? data : data.products;

            if (products && Array.isArray(products)) {
                const product = products.find(item => item.id == productId);

                if (product) {
                    afficherDetailProduit(product);
                } else {
                    console.error('Produit non trouvé');
                    document.getElementById("product-detail").innerHTML = `<p>Product not found.</p>`;
                }
            } else {
                console.error('Invalid product data format');
                document.getElementById("product-detail").innerHTML = `<p>Product data format is incorrect.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching the product data:', error);
            document.getElementById("product-detail").innerHTML = `<p>Error loading product details.</p>`;
        });
} else {
    document.getElementById("product-detail").innerHTML = `<p>No product ID provided.</p>`;
}

function afficherDetailProduit(product) {
    const findDiv = document.getElementById("product-detail");
    const newElement = document.createElement("div")
    newElement.innerHTML = `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <h4>${product.description}</h4>
            <p>Price: ${product.price}</p>
            <p>Quantity: ${product.quantity}</p>
            <button type="submit"><a href="./" class="text-primary">Return Homepage</a></button>
        </div>
    `;
    findDiv.appendChild(newElement)
}
