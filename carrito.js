let cart = [];
let originalValue;
const cartContent = document.getElementById('cartContent');
const total = document.getElementById('total')

document.getElementById("btnCaja").addEventListener("click", () => {
  const RUT = document.getElementById("RUT");
  const name = document.getElementById("name");
  if (RUT.value !== "") {
    if (name.value !== "") {
      alert("Compra realizada con éxito por " + name.value + " - " + RUT.value);
    } else {
      alert("Compra realizada con éxito por " + RUT.value);
    }
  } else {
    if (name.value !== "") {
      alert(`Compra realizada con éxito por ${name.value} (CONSUMIDOR FINAL)`);
    } else {
      alert("Compra realizada con éxito por CONSUMIDOR FINAL");
    }
  }

  name.value = '';
  RUT.value = '';
  cart = [];
  cartContent.innerHTML = '';
  total.textContent = 0;
});

function displayCosts() {
  let totalSum = 0;
  cart.forEach(article => totalSum += article.count * article.unitCost);
  total.textContent = totalSum;
}

function updateOriginalValue(value) {
  originalValue = value;
}

function updateSubtotal(inputElement, name, cost) { // Función para recalcular el subtotal de un artículo.
  if (inputElement.value < 1)
    inputElement.value = originalValue;
  else {
    const value = inputElement.value
    document.getElementById(`subtotal-${name}`).textContent = cost * value;

    let index = 0;

    while (index < cart.length && name !== cart[index].name)
      index++;

    cart[index].count = value;
  }

  displayCosts(cart);
}

function addToCart(name, price, photo) {
  let index = 0;

  while (index < cart.length && name !== cart[index].name)
    index++;

  if (index >= cart.length) {
    cart.push({
      name: name,
      count: 1,
      unitCost: price,
      photo: photo
    });

    cartContent.innerHTML += `                        
          <div class="row d-flex align-items-center flex-nowrap">
              <div class="col col-lg-2 me-lg-3 me-xl-4 me-xxl-5" id="colImage">
                  <img src="${photo}" alt="Producto" class="img-thumbnail">
              </div>
              <div class="col rowImage">
                  <span>${name}</span>
              </div>
              <div class="col rowImage">
                  <span>USD ${price}</span>
              </div>
              <div class="col rowImage">
                  <input id="count-${name}" type="number" value="1" min="1" style="width: 51px;" onclick="updateOriginalValue(this.value)" onchange="updateSubtotal(this, '${name}', ${price})">
              </div>
              <div class="col rowImage">
                  <strong>USD <span id="subtotal-${name}">${price}</span></strong>
              </div>
          </div>

          <hr style="opacity: 1;">
      `;
  } else {
    cart[index].count++;
    document.getElementById(`count-${name}`).value = cart[index].count;
  }

  displayCosts(cart);
}