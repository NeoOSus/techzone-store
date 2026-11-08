# TechZone Endterm Project

https://tranquil-chaja-1bcaf4.netlify.app/

## Project overview

TechZone is a responsive multi-page electronics store website continued from the midterm project. The endterm version keeps the original topic, Bootstrap layout, navigation, product comparison table, gallery, about page, and contact page while adding JavaScript and jQuery interactions.

## Group members

Niyalov Yerkebulan

## Pages

- `index.html` — home page and popular products
- `about.html` — store information and services
- `products.html` — searchable product catalog, filters, favorites, sorting, and cart
- `gallery.html` — store photo gallery
- `contact.html` — validated contact form and form guidance

## Endterm features

- A product data array is searched, filtered, sorted, and rendered into product cards. Loops process catalog items and cart items.
- Reusable functions format prices, calculate visible products, render the catalog and cart, and validate contact fields.
- Search, category filter, price sorting, favorites saved in local storage, add-to-cart, remove-from-cart, quantity totals, and a site-wide light/dark theme.
- Contact form validation checks name length, email format, selected topic, and message length. Field-specific errors appear beside controls. Valid submissions show an on-page demo success message; the form does not send data to a server.
- jQuery handles the contact-help panel and live message counter. The help panel uses `parent()` and `find()` traversal with `slideToggle()`; the counter uses `closest()` and `children()`. A valid form success message uses `fadeIn()`.
- Product and theme preferences work in the browser. The cart is a front-end demonstration and is not stored or connected to a payment service.

## Run and try the interactions

Open `index.html` in a browser, then use the navigation to visit the other pages. An internet connection is needed for the Bootstrap, jQuery, and Unsplash CDN assets. On `Products`, search for an item, choose a category, sort by price, save a favorite, and add or remove items from the cart. Use **Toggle theme** on any page. On `Contact`, submit empty fields to see validation, then enter a name of at least 2 characters, a valid email, a topic, and a message of at least 20 characters. The form displays confirmation locally and does not transmit personal information.

## Technologies

- HTML5, CSS3, Bootstrap 5
- Vanilla JavaScript (`js/app.js`)
- jQuery 3.7.1
s
