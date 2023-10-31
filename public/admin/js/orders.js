window.addEventListener('load', function () {
    const searchOrders = document.getElementById('searchOrders');
    const searchProducts = document.getElementById('searchProducts');

    const filterSarche = document.getElementById('filterSarche');
    
    searchOrders.addEventListener('focus', function () {
        searchOrders.parentNode.style.border = '1px solid var(--cardHover-color)';
    });

    searchOrders.addEventListener('blur', function () {
        searchOrders.parentNode.style.border = '1px solid var(--placeholder-color)';
    });

    searchProducts.addEventListener('focus', function () {
        searchProducts.parentNode.style.border = '1px solid var(--cardHover-color)';
    });

    searchProducts.addEventListener('blur', function () {
        searchProducts.parentNode.style.border = '1px solid var(--placeholder-color)';
    });

    filterSarche.addEventListener('focus', function () {
        filterSarche.style.border = '1px solid var(--cardHover-color)';
    });

    filterSarche.addEventListener('blur', function () {
        filterSarche.style.border = '1px solid var(--placeholder-color)';
    });
});

