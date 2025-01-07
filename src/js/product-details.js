document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productDetailsParam = urlParams.get('productDetails');

    try {
        if (!productDetailsParam) {
            throw new Error('Detalhes do produto não encontrados na URL');
        }
        const product = JSON.parse(decodeURIComponent(productDetailsParam));
        displayProductDetails(product);
    } catch (error) {
        displayError(error.message);
    }

    function displayProductDetails(product) {
        const productImage = document.querySelector('.product-image-detail');
        productImage.src = product.imageUrl;
        productImage.alt = product.name;

        const productName = document.querySelector('.product-name-detail');
        productName.textContent = product.name;

        const productPrice = document.querySelector('.product-price');
        productPrice.textContent = `R$ ${product.price.toFixed(2)}`;
        document.title = product.name;
    }

    function displayError(errorMessage) {
        window.location.href = './products.html';
    }

    let animationSpeed = 600;
    let currentPosition = 0;
    function animateTitle() {
        let titleText = document.title;
        document.title = titleText.substring(currentPosition) + titleText.substring(0, currentPosition);
        currentPosition = (currentPosition + 1) % titleText.length;
        setTimeout(animateTitle, animationSpeed);
    }

    animateTitle();

    document.querySelector('.back-button').addEventListener('click', () => {
        window.history.back();
    });
});
