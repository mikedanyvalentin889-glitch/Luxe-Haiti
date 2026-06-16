// Render products
function renderProducts(productsToRender = produits) {
    const grid = document.getElementById('productsGrid');
    const countEl = document.getElementById('resultsCount');
    
    if (!grid) return;
    
    countEl.textContent = `${productsToRender.length} produit${productsToRender.length > 1 ? 's' : ''}`;
    
    if (productsToRender.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--color-text-muted);">Aucun produit trouvé</div>';
        return;
    }
    
    grid.innerHTML = productsToRender.map(p => `
        <div class="product-card" data-category="${p.categorie}">
            <div class="product-image">
                <div class="product-placeholder" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: ${p.categorie === 'vetements' ? 'linear-gradient(135deg, #1e3a5f, #0a1628)' : 'linear-gradient(135deg, #2d3748, #1a202c)'}">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        ${p.categorie === 'vetements' 
                            ? '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23Z"></path>'
                            : '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>'}
                    </svg>
                </div>
                ${p.badge ? `<span class="product-badge ${p.badge}">${p.badge === 'sale' ? '-20%' : p.badge === 'new' ? 'Nouveau' : 'Populaire'}</span>` : ''}
                <div class="product-actions">
                    <button class="product-action-btn" onclick="ajouterAuPanier(${p.id})" title="Ajouter au panier">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                            <path d="M3 6h18"></path>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                    </button>
                    <a href="produit-detail.html?id=${p.id}" class="product-action-btn" title="Voir détails">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${p.sousCategorie}</span>
                <h3 class="product-name"><a href="produit-detail.html?id=${p.id}">${p.nom}</a></h3>
                <div class="product-price">
                    <span class="current-price">${p.prix.toLocaleString()} HTG</span>
                    ${p.ancienPrix ? `<span class="old-price">${p.ancienPrix.toLocaleString()} HTG</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Filters
let currentFilter = 'all';
let currentSort = 'newest';
let maxPrice = 10000;

function filterProducts() {
    let filtered = [...produits];
    
    // Category filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.categorie === currentFilter);
    }
    
    // Price filter
    filtered = filtered.filter(p => p.prix <= maxPrice);
    
    // Stock filter
    const stockOnly = document.getElementById('stockFilter');
    if (stockOnly && stockOnly.checked) {
        filtered = filtered.filter(p => p.enStock);
    }
    
    // Sort
    switch(currentSort) {
        case 'price-asc':
            filtered.sort((a, b) => a.prix - b.prix);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.prix - a.prix);
            break;
        case 'popular':
            filtered.sort((a, b) => (b.avis || 0) - (a.avis || 0));
            break;
        default:
            filtered.sort((a, b) => b.id - a.id);
    }
    
    renderProducts(filtered);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check URL params for category
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    
    if (catParam) {
        currentFilter = catParam;
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            pageTitle.textContent = catParam === 'vetements' ? 'Vêtements' : 
                                    catParam === 'mecanique' ? 'Outils Mécaniques' : 'Nos Produits';
        }
        
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === catParam);
        });
    }
    
    // Category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            filterProducts();
        });
    });
    
    // Price range
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', (e) => {
            maxPrice = parseInt(e.target.value);
            priceValue.textContent = maxPrice.toLocaleString() + ' HTG';
            filterProducts();
        });
    }
    
    // Stock filter
    const stockFilter = document.getElementById('stockFilter');
    if (stockFilter) {
        stockFilter.addEventListener('change', filterProducts);
    }
    
    // Sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            filterProducts();
        });
    }
    
    // Initial render
    filterProducts();
});
