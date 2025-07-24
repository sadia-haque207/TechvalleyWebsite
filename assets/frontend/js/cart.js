document.addEventListener('DOMContentLoaded', function() {
    // User Dropdown
    const userWrapper = document.querySelector('.user-dropdown-wrapper');
    const userDropdown = document.querySelector('.user-dropdown');
    let userDropdownTimeout;

    userWrapper.addEventListener('mouseenter', function() {
        clearTimeout(userDropdownTimeout);
        userDropdown.classList.add('show');
    });
    userWrapper.addEventListener('mouseleave', function() {
        userDropdownTimeout = setTimeout(() => {
            userDropdown.classList.remove('show');
        }, 150);
    });

    //  Cart Dropdown
    const cartBtns = document.querySelectorAll('.cart-btn');
    const cartDropdown = document.querySelector('.cart-dropdown');
    let dropdownTimeout;

    // on hover show
    cartBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            clearTimeout(dropdownTimeout);
            cartDropdown.classList.add('show');
        });
        btn.addEventListener('mouseleave', function() {
            dropdownTimeout = setTimeout(() => {
                cartDropdown.classList.remove('show');
            }, 150); 
        });
    });

    // on dropdown mouse enter hide will not happen
    cartDropdown.addEventListener('mouseenter', function() {
        clearTimeout(dropdownTimeout);
        cartDropdown.classList.add('show');
    });
    cartDropdown.addEventListener('mouseleave', function() {
        cartDropdown.classList.remove('show');
    });

    document.querySelector('.cart-dropdown-list')?.addEventListener('click', function(e) {
        // Plus button
        if (e.target.classList.contains('qty-plus')) {
            const qtyBox = e.target.closest('.cart-item-qty');
            const qtySpan = qtyBox.querySelector('span');
            let qty = parseInt(qtySpan.textContent);
            qty = isNaN(qty) ? 1 : qty;
            qtySpan.textContent = qty + 1;

            // Show minus, hide delete
            if(qtyBox.querySelector('.qty-minus')) qtyBox.querySelector('.qty-minus').style.display = '';
            if(qtyBox.querySelector('.cart-item-remove')) qtyBox.querySelector('.cart-item-remove').style.display = 'none';

            // Update quantity and price in cart-item-qty-price
            updateQtyPrice(qtyBox, qty + 1);
            updateSubtotal();
        }
        // Minus button
        if (e.target.classList.contains('qty-minus')) {
            const qtyBox = e.target.closest('.cart-item-qty');
            const qtySpan = qtyBox.querySelector('span');
            let qty = parseInt(qtySpan.textContent);
            qty = isNaN(qty) ? 1 : qty;
            if (qty > 1) {
                qtySpan.textContent = qty - 1;
                if (qty - 1 === 1) {
                    // Show delete, hide minus
                    if(qtyBox.querySelector('.qty-minus')) qtyBox.querySelector('.qty-minus').style.display = 'none';
                    if(qtyBox.querySelector('.cart-item-remove')) qtyBox.querySelector('.cart-item-remove').style.display = '';
                }
                // Update quantity and price in cart-item-qty-price
                updateQtyPrice(qtyBox, qty - 1);
                updateSubtotal();
            }
        }
        // Delete button (optional: remove item from DOM)
        if (e.target.closest('.cart-item-remove')) {
            const cartItem = e.target.closest('.cart-item');
            cartItem.remove();
            updateSubtotal();
        }
    });

    // Initial state: show/hide minus/delete based on qty, and update price
    document.querySelectorAll('.cart-item-qty').forEach(function(qtyBox) {
        const qtySpan = qtyBox.querySelector('span');
        const minusBtn = qtyBox.querySelector('.qty-minus');
        const removeBtn = qtyBox.querySelector('.cart-item-remove');
        let qty = parseInt(qtySpan.textContent);
        qty = isNaN(qty) ? 1 : qty;
        if (qty > 1) {
            if(minusBtn) minusBtn.style.display = '';
            if(removeBtn) removeBtn.style.display = 'none';
        } else {
            if(minusBtn) minusBtn.style.display = 'none';
            if(removeBtn) removeBtn.style.display = '';
        }
        // Update price and qty label
        updateQtyPrice(qtyBox, qty);
    });
    updateSubtotal();

    // Helper function to update quantity and price
    function updateQtyPrice(qtyBox, qty) {
        const cartItem = qtyBox.closest('.cart-item');
        if (!cartItem) return;
        const qtyLabel = cartItem.querySelector('.item-qty');
        const priceSpan = cartItem.querySelector('.item-unit-price');
        if (qtyLabel) qtyLabel.textContent = qty;
        if (priceSpan) {
            const unit = parseFloat(priceSpan.getAttribute('data-unit'));
            priceSpan.textContent = '$' + (unit * qty).toFixed(2);
        }
    }

    // Helper function to update subtotal
    function updateSubtotal() {
        let subtotal = 0;
        document.querySelectorAll('.cart-item .item-unit-price').forEach(function(priceSpan) {
            let price = parseFloat(priceSpan.textContent.replace('$',''));
            subtotal += isNaN(price) ? 0 : price;
        });
        // Find the subtotal element and update
        const subtotalElem = document.querySelector('.cart-subtotal');
        if (subtotalElem) {
            // Try to find a span or just update the text
            let subtotalSpan = subtotalElem.querySelector('span');
            if (subtotalSpan) {
                subtotalSpan.textContent = 'Subtotal: $' + subtotal.toFixed(2);
            } else {
                subtotalElem.textContent = 'Subtotal: $' + subtotal.toFixed(2);
            }
        }
    }
});