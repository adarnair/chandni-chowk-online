let allProducts = [];

const url = `https://api.airtable.com/v0/${BASE_ID}/Products`;

fetch(url, {
  headers: {
    Authorization: `Bearer ${AIRTABLE_TOKEN}`
  }
})
  .then(response => response.json())
  .then(data => {
    allProducts = data.records;
    renderProducts(allProducts);
  });

function renderProducts(records) {
  const grid = document.querySelector(".product-grid");
  grid.innerHTML = "";

  records.forEach(record => {
    const fields = record.fields;

    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${fields.image_url || 'images/placeholder.jpg'}" alt="${fields.product_name}">
      <h2>${fields.product_name}</h2>
      <p class="price">₹${fields.price_min} ${fields.price_unit || ''}</p>
      <a href="https://wa.me/918810307647?text=Hi! I am interested in the ${encodeURIComponent(fields.product_name)}" class="whatsapp-btn">
        Message on WhatsApp
      </a>
    `;

    grid.appendChild(card);
  });
}

function filterByCategory(category) {
  if (category === "all") {
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter(record => record.fields.category === category);
    renderProducts(filtered);
  }
}

const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const category = link.getAttribute("data-category");
    filterByCategory(category);
  });
});