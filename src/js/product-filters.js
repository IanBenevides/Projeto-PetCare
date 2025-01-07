
document.getElementById('priceRange').addEventListener('input', function () {
    document.getElementById('priceValue').innerText = this.value;
    filterProducts();
});

document.querySelectorAll('.form-check-input').forEach(input => {
    input.addEventListener('change', function () {
        filterProducts();
    });
});

document.getElementById('nameSearch').addEventListener('input', function () {
    filterProducts();
});

function filterProducts() {
    const maxPrice = document.getElementById('priceRange').value;
    const searchTerm = document.getElementById('nameSearch').value.toLowerCase();
    const selectedCategories = Array.from(document.querySelectorAll('.form-check-input[type=checkbox]:checked')).map(checkbox => checkbox.value);

    const products = document.querySelectorAll('.product-card');
    let visibleCount = 0;

    products.forEach(product => {
        const productCol = product.closest('.col');
        const productPrice = parseInt(productCol.getAttribute('data-price'));
        const productCategory = productCol.getAttribute('data-category');
        const productName = product.querySelector('.product-name').textContent.toLowerCase();

        const isPriceMatch = productPrice <= maxPrice;
        const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(productCategory);
        const isNameMatch = productName.includes(searchTerm);

        if (isPriceMatch && isCategoryMatch && isNameMatch) {
            productCol.classList.add('product-visible');
            productCol.classList.remove('product-hidden');
            visibleCount++;
        } else {
            productCol.classList.add('product-hidden');
            productCol.classList.remove('product-visible');
        }
    });

    document.getElementById('resultsCount').innerText = `Exibindo ${visibleCount} resultados encontrados`;
}
filterProducts();
