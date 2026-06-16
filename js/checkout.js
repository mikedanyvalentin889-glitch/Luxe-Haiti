// Render order summary
function renderOrderSummary() {
    const cart = getPanier();
    const itemsContainer = document.getElementById('orderItems');
    const subtotalEl = document.getElementById('orderSubtotal');
    const shippingEl = document.getElementById('orderShipping');
    const totalEl = document.getElementById('orderTotal');
    
    if (!itemsContainer) return;
    
    const grouped = cart.reduce((acc, item) => {
        acc[item.id] = (acc[item.id] || 0) + 1;
        return acc;
    }, {});
    
    let html = '';
    let subtotal = 0;
    
    for (const [id, qty] of Object.entries(grouped)) {
        const product = produits.find(p => p.id == id);
        if (!product) continue;
        
        const itemTotal = product.prix * qty;
        subtotal += itemTotal;
        
        html += `
            <div class="order-item">
                <span class="order-item-name">${qty} × ${product.nom}</span>
                <span class="order-item-price">${itemTotal.toLocaleString()} HTG</span>
            </div>
        `;
    }
    
    itemsContainer.innerHTML = html;
    subtotalEl.textContent = subtotal.toLocaleString() + ' HTG';
    
    // Calculate shipping based on zone
    const zone = document.getElementById('zone');
    let shipping = 0;
    
    if (zone) {
        zone.addEventListener('change', () => {
            const zoneValue = zone.value;
            switch(zoneValue) {
                case 'delmas': shipping = 0; break;
                case 'petion': shipping = 200; break;
                case 'paup': shipping = 300; break;
                case 'carrefour': shipping = 400; break;
                case 'tabarre': shipping = 350; break;
                default: shipping = 0;
            }
            
            shippingEl.textContent = shipping === 0 ? 'Gratuit' : shipping.toLocaleString() + ' HTG';
            totalEl.textContent = (subtotal + shipping).toLocaleString() + ' HTG';
        });
    }
    
    totalEl.textContent = subtotal.toLocaleString() + ' HTG';
}

// Form submission
document.addEventListener('DOMContentLoaded', () => {
    renderOrderSummary();
    
    const form = document.getElementById('checkoutForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simulate order processing
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.innerHTML = 'Traitement...';
            btn.disabled = true;
            
            setTimeout(() => {
                // Clear cart
                viderPanier();
                
                // Show success
                alert(`Commande confirmée !\n\nMerci ${data.prenom} ${data.nom}.\nNous vous contacterons au ${data.telephone} pour confirmer la livraison.\n\nMode de paiement: ${data.payment === 'moncash' ? 'MonCash' : data.payment === 'natcash' ? 'NatCash' : 'Cash à la livraison'}`);
                
                window.location.href = 'index.html';
            }, 1500);
        });
    }
});
