const TABLE_NAME = "Products";

const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

fetch(url, {
  headers: {
    Authorization: `Bearer ${AIRTABLE_TOKEN}`
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });