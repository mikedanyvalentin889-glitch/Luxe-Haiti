// Gestion du panier avec localStorage
const PANIER_KEY = 'panier';

function getPanier() {
    try {
        return JSON.parse(localStorage.getItem(PANIER_KEY)) || [];
    } catch {
        return [];
    }
}

function sauvegarderPanier(panier) {
    localStorage.setItem(PANIER_KEY, JSON.stringify(panier));
    updateCartCount();
}

function ajouterAuPanier(produitId) {
    const panier = getPanier();
    const produit = produits.find(p => p.id == produitId);
    if (!produit) return;
    
    panier.push({
        id: produit.id,
        nom: produit.nom,
        prix: produit.prix,
        categorie: produit.categorie,
        timestamp: Date.now()
    });
    
    sauvegarderPanier(panier);
    
    // Animation feedback
    const btn = event?.target?.closest('.btn-primary');
    if (btn) {
        btn.innerHTML = '✓ Ajouté';
        setTimeout(() => {
            btn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                    <path d="M3 6h18"></path>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                Ajouter au panier
            `;
        }, 1500);
    }
}

function retirerDuPanier(produitId) {
    const panier = getPanier();
    const index = panier.findIndex(item => item.id == produitId);
    if (index > -1) {
        panier.splice(index, 1);
        sauvegarderPanier(panier);
    }
}

function viderPanier() {
    localStorage.removeItem(PANIER_KEY);
    updateCartCount();
}

function getTotalPanier() {
    const panier = getPanier();
    return panier.reduce((total, item) => total + item.prix, 0);
}

function getNombreArticles() {
    return getPanier().length;
}

function updateCartCount() {
    const countElements = document.querySelectorAll('#cartCount');
    const count = getNombreArticles();
    countElements.forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', updateCartCount);
