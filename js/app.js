// TechZone endterm interactions. The catalog data stays separate from its markup.
const products = [
    { id: 1, name: "iPhone 15", category: "Phones", description: "Latest Apple smartphone with A16 chip", price: 799, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80", sale: false },
    { id: 2, name: "Samsung Galaxy S24", category: "Phones", description: "Powerful Android phone with AI features", price: 699, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80", sale: true },
    { id: 3, name: "MacBook Air M3", category: "Computers", description: "Ultra-thin laptop with Apple M3 chip", price: 1099, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", sale: false },
    { id: 4, name: "AirPods Pro 2", category: "Audio", description: "Wireless earbuds with noise cancellation", price: 249, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80", sale: false },
    { id: 5, name: "iPad Air", category: "Tablets", description: "Versatile tablet for work and play", price: 599, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80", sale: true },
    { id: 6, name: "Apple Watch SE", category: "Wearables", description: "Smartwatch with health tracking", price: 249, image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&q=80", sale: false }
];
const cart = [];
const favorites = new Set(JSON.parse(localStorage.getItem("techzone-favorites") || "[]"));

function formatPrice(amount) { return `$${amount.toLocaleString("en-US")}`; }

function getVisibleProducts() {
    const query = (document.querySelector("#product-search")?.value || "").trim().toLowerCase();
    const category = document.querySelector("#category-filter")?.value || "all";
    const favoriteOnly = document.querySelector("#favorites-filter")?.getAttribute("aria-pressed") === "true";
    const sort = document.querySelector("#sort-products")?.value || "featured";
    let visible = products.filter((product) => {
        const matchesText = `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query);
        return matchesText && (category === "all" || product.category === category) && (!favoriteOnly || favorites.has(product.id));
    });
    if (sort === "price-low") visible.sort((a, b) => a.price - b.price);
    if (sort === "price-high") visible.sort((a, b) => b.price - a.price);
    return visible;
}

function renderProducts(items) {
    const list = document.querySelector("#product-list");
    if (!list) return;
    list.replaceChildren();
    for (const product of items) {
        const column = document.createElement("div");
        column.className = "col-md-4 col-sm-6";
        const card = document.createElement("article");
        card.className = "product-card h-100";
        card.dataset.productId = product.id;
        card.innerHTML = `${product.sale ? '<span class="sale-badge">SALE</span>' : ""}<img src="${product.image}" alt="${product.name}" loading="lazy"><p class="product-category">${product.category}</p><h3>${product.name}</h3><p>${product.description}</p><p class="price">${formatPrice(product.price)}</p><div class="d-flex gap-2 justify-content-center"><button class="btn btn-primary add-to-cart" type="button">Add to cart</button><button class="btn btn-outline-danger favorite-button" type="button" aria-pressed="${favorites.has(product.id)}" aria-label="${favorites.has(product.id) ? "Remove from" : "Add to"} favorites">${favorites.has(product.id) ? "♥ Saved" : "♡ Save"}</button></div>`;
        column.append(card);
        list.append(column);
    }
    document.querySelector("#catalog-status").textContent = `${items.length} product${items.length === 1 ? "" : "s"} found`;
    document.querySelector("#favorite-count").textContent = favorites.size;
}

function renderCart() {
    const list = document.querySelector("#cart-items");
    if (!list) return;
    list.replaceChildren();
    let total = 0;
    for (const item of cart) {
        total += item.price * item.quantity;
        const row = document.createElement("li");
        row.className = "list-group-item d-flex justify-content-between align-items-center";
        row.innerHTML = `<span>${item.name} × ${item.quantity}</span><button type="button" class="btn btn-sm btn-outline-secondary remove-cart-item" data-id="${item.id}" aria-label="Remove ${item.name}">Remove</button><strong>${formatPrice(item.price * item.quantity)}</strong>`;
        list.append(row);
    }
    document.querySelector("#cart-count").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector("#cart-total").textContent = `Total: ${formatPrice(total)}`;
}

function showFieldError(field, message) {
    const error = document.querySelector(`#${field.id}-error`);
    error.textContent = message;
    field.classList.toggle("is-invalid", Boolean(message));
    field.setAttribute("aria-invalid", String(Boolean(message)));
    return !message;
}

function validateContactForm() {
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const subject = document.querySelector("#subject");
    const message = document.querySelector("#message");
    const validName = showFieldError(name, name.value.trim().length < 2 ? "Enter at least 2 characters for your name." : "");
    const validEmail = showFieldError(email, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? "Enter a valid email address, such as name@example.com." : "");
    const validSubject = showFieldError(subject, !subject.value ? "Choose a topic for your message." : "");
    const validMessage = showFieldError(message, message.value.trim().length < 20 ? "Write at least 20 characters so we can help you." : "");
    return validName && validEmail && validSubject && validMessage;
}

document.addEventListener("DOMContentLoaded", () => {
    const navContainer = document.querySelector(".navbar .container");
    if (navContainer) {
        const themeButton = document.createElement("button");
        themeButton.id = "theme-toggle";
        themeButton.type = "button";
        themeButton.className = "btn btn-sm btn-outline-light ms-lg-3 mt-2 mt-lg-0";
        themeButton.textContent = "Toggle theme";
        themeButton.setAttribute("aria-pressed", String(localStorage.getItem("techzone-theme") === "dark"));
        navContainer.append(themeButton);
    }
    const productList = document.querySelector("#product-list");
    if (productList) {
        renderProducts(getVisibleProducts());
        ["#product-search", "#category-filter", "#sort-products"].forEach((selector) => {
            document.querySelector(selector).addEventListener(selector === "#product-search" ? "input" : "change", () => renderProducts(getVisibleProducts()));
        });
        document.querySelector("#favorites-filter").addEventListener("click", (event) => {
            const button = event.currentTarget;
            button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
            renderProducts(getVisibleProducts());
        });
        productList.addEventListener("click", (event) => {
            const card = event.target.closest(".product-card");
            if (!card) return;
            const product = products.find((item) => item.id === Number(card.dataset.productId));
            if (event.target.closest(".add-to-cart")) {
                const existing = cart.find((item) => item.id === product.id);
                if (existing) existing.quantity += 1;
                else cart.push({ ...product, quantity: 1 });
                renderCart();
                document.querySelector("#cart-title").classList.add("cart-updated");
            } else if (event.target.closest(".favorite-button")) {
                if (favorites.has(product.id)) favorites.delete(product.id);
                else favorites.add(product.id);
                localStorage.setItem("techzone-favorites", JSON.stringify([...favorites]));
                renderProducts(getVisibleProducts());
            }
        });
        document.querySelector("#cart-items").addEventListener("click", (event) => {
            const button = event.target.closest(".remove-cart-item");
            if (!button) return;
            const index = cart.findIndex((item) => item.id === Number(button.dataset.id));
            if (index !== -1) cart.splice(index, 1);
            renderCart();
        });
    }

    const form = document.querySelector("#contact-form");
    if (form) {
        const fields = [...form.querySelectorAll("input, select, textarea")];
        fields.forEach((field) => field.addEventListener("blur", validateContactForm));
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const success = document.querySelector("#form-success");
            success.hidden = true;
            if (!validateContactForm()) {
                form.querySelector("[aria-invalid='true']")?.focus();
                return;
            }
            success.textContent = `Thank you, ${document.querySelector("#name").value.trim()}! Your message is ready. This demo does not send data to a server.`;
            success.hidden = false;
            if (window.jQuery) $(success).hide().fadeIn(250);
            form.reset();
            fields.forEach((field) => showFieldError(field, ""));
        });
    }

    const themeButton = document.querySelector("#theme-toggle");
    if (themeButton) {
        document.body.classList.toggle("dark-theme", localStorage.getItem("techzone-theme") === "dark");
        themeButton.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            localStorage.setItem("techzone-theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
            themeButton.setAttribute("aria-pressed", String(document.body.classList.contains("dark-theme")));
        });
    }
});

// jQuery: event delegation, traversal, live character guidance, and helpful slide effects.
if (window.jQuery) {
    $(document).on("click", ".jquery-help-toggle", function () {
        const panel = $(this).parent().find(".jquery-help");
        $(this).attr("aria-expanded", panel.is(":hidden") ? "true" : "false");
        panel.stop(true, true).slideToggle(180);
    });
    $(document).on("input", "#message", function () {
        const count = this.value.trim().length;
        $(this).closest(".field-wrap").children("#message-counter").text(`${count} / 20 characters minimum`).toggleClass("text-success", count >= 20);
    });
}
