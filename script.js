//1. Load first the DOM - before executing the script
document.addEventListener('DOMContentLoaded', () => {
  const shoppingBasket = []; // 2. Initialize an Empty Shopping Basket to store items the user wants

  // 3. Fetch product data from product.json
  //fetch keyword is used to retrieve data from .json file
  fetch('product.json')
    .then(response => response.json())
    .then(data => {
      console.log(data); // Check if data is fetched correctly
      const products = data.products;

      // 4. Map product data to existing cards
      //Select all elements with the class "card" and update their content with the fectched product data.
      const cards = document.querySelectorAll('.card');
      cards.forEach((card, index) => {
        if (products[index]) {
          const productName = products[index].name;
          const productPrice = products[index].price;
          // Update card content with product data
          const productNameElement = card.querySelector('.product-name');
          const productPriceElement = card.querySelector('.product-price');
          //This if statement checks if productNameElement is not null or undefined to make sure that element exist in DOM
          if (productNameElement) {
            productNameElement.textContent = productName;
          }
          //This if statement checks if productPriceElement is not null or undefined to make sure that element exist in DOM
          if (productPriceElement) {
            productPriceElement.textContent = `Price: ${productPrice}`;
          }
        }
      });
       //5. Attach event listeners to purchase buttons
      document.querySelectorAll('.purchase-btn').forEach(button => {
        //select all button and if click, it will the closest ancestor element card
        button.addEventListener('click', event => {
          const card = event.target.closest('.card');
          const productName = card.querySelector('.product-name').textContent;
          const productPrice = card.querySelector('.product-price').textContent;
          const productImage = card.querySelector('.card-image').src;

          // Add the product to the shopping basket
          shoppingBasket.push({
            name: productName,
            price: productPrice,
            image: productImage
          });

          // Display an alert message
          alert(`${productName} added to the basket.`);
        });
      });

      //Last Part: Attach event listener to basket image
      document.getElementById('basket-img').addEventListener('click', () => {
        showBasketModal();
      });

      function showBasketModal() {
        //selects HTML element with the ID "custom-alert" and assigns to variable modal
        const modal = document.getElementById('custom-alert'); //custom-alert is the modal
        const alertMessage = document.getElementById('alert-message'); //alert-message is the messages in the modal
        const basketItems = document.getElementById('basket-items'); 
        const closeBtn = document.querySelector('.close-btn');

        // Clear previous basket items
        basketItems.innerHTML = '';
        // Check if the basket is empty
        if (shoppingBasket.length === 0) {
          alertMessage.textContent = 'No items in the basket. Number of items: 0';
        } else {
          alertMessage.textContent = `Number of items in the basket: ${shoppingBasket.length}`;
          shoppingBasket.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
              <img src="${item.image}" alt="Product Image" class="modal-image">
              <span>${item.name}</span>
              <span>Price: ${item.price}</span>
            `;
            basketItems.appendChild(li);
          });
        }

        modal.style.display = 'block';
        //use to close the modal when clicking close button
        closeBtn.onclick = function() {
          modal.style.display = 'none';
        };
        //use to close the modal when clicking outside modal
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = 'none';
          }
        };
      }
    })
    //will handle and catch any errors during fetching execution
    .catch(error => console.error('Error fetching product data:', error));
});