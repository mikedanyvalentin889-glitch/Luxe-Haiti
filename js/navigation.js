// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('mobile-open');
    });
    
    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('mobile-open');
        });
    });
}

// Search modal
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', () => {
        searchModal.classList.add('active');
        searchInput.focus();
    });
    
    searchOverlay.addEventListener('click', () => {
        searchModal.classList.remove('active');
    });
    
    searchClose.addEventListener('click', () => {
        searchModal.classList.remove('active');
    });
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const results = produits.filter(p => 
            p.nom.toLowerCase().includes(query) ||
            p.categorie.toLowerCase().includes(query) ||
            p.sousCategorie.toLowerCase().includes(query)
        ).slice(0, 5);
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item"><p style="padding: 20px; color: var(--color-text-muted);">Aucun produit trouvé</p></div>';
            return;
        }
        
        searchResults.innerHTML = results.map(p => `
            <a href="produit-detail.html?id=${p.id}" class="search-result-item">
                <div class="result-placeholder" style="background: ${p.categorie === 'vetements' ? 'linear-gradient(135deg, #1e3a5f, #0a1628)' : 'linear-gradient(135deg, #2d3748, #1a202c)'}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--color-text-muted)">
                        ${p.categorie === 'vetements' 
                            ? '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23Z"></path>'
                            : '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>'}
                    </svg>
                </div>
                <div class="result-info">
                    <div class="result-name">${p.nom}</div>
                    <div class="result-price">${p.prix.toLocaleString()} HTG</div>
                </div>
            </a>
        `).join('');
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchModal.classList.remove('active');
        }
    });
}
