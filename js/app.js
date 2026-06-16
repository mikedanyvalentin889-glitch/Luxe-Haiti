    // Render featured products on homepage
    const featuredGrid = document.getElementById('featuredProducts');
    if (featuredGrid && typeof produits !== 'undefined') {
        const featured = produits
            .filter(p => p.badge === 'popular' || p.badge === 'new')
            .slice(0, 4);
        
        featuredGrid.innerHTML = featured.map(p => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${p.image}" alt="${p.nom}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="product-placeholder" style="display: none; background: ${p.categorie === 'vetements' ? 'linear-gradient(135deg, #1e3a5f, #0a1628)' : 'linear-gradient(135deg, #2d3748, #1a202c)'}">
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
