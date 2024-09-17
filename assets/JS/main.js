// #region
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}
//#endregion
 // Define categories and mapping of product categories to subcategories
const categories = {
    beauty: [],
    fashion: [],
    electronics: [],
    sport: [],
    home: []
};

// Function to fetch data from API and categorize products
async function fetchAndCategorizeProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();

        // Categorizing products
        data.products.forEach(product => {
            if (product.category.includes('skincare') || product.category.includes('fragrance')) {
                categories.beauty.push(product);
            } else if (product.category.includes('menswear') || product.category.includes('womenswear')) {
                categories.fashion.push(product);
            } else if (product.category.includes('electronics')) {
                categories.electronics.push(product);
            } else if (product.category.includes('sports')) {
                categories.sport.push(product);
            } else if (product.category.includes('home') || product.category.includes('furniture')) {
                categories.home.push(product);
            }
        });

        // Generate navbar after fetching and categorizing
        generateNavbar();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to generate navbar
function generateNavbar() {
    const navbar = document.getElementById('navbar');

    const navContent = `
        <nav class="navbar">
            ${generateDropdown('Beauty', categories.beauty)}
            ${generateDropdown('Fashion', categories.fashion)}
            ${generateDropdown('Electronics', categories.electronics)}
            ${generateDropdown('Sport', categories.sport)}
            ${generateDropdown('Home', categories.home)}
        </nav>
    `;

    navbar.innerHTML = navContent;
}

// Function to generate dropdown for each category
function generateDropdown(categoryName, products) {
    const subCategories = products.map(product => `<a href="#">${product.brand}</a>`).join('');
    return `
        <div class="dropdown">
            <a href="#">${categoryName}</a>
            <div class="dropdown-content">
                ${subCategories || '<a href="#">No products</a>'}
            </div>
        </div>
    `;
}

// Initialize the process
fetchAndCategorizeProducts();
