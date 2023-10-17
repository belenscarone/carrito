const cart = [];

document.getElementById("btnCaja").addEventListener("click", () => {
  const RUT = document.getElementById("RUT").value;
  const name = document.getElementById("name").value;
  if (RUT !== "")
    if (name !== "")
      alert("Compra realizada con éxito por " + name + " - " + RUT);
    else alert("Compra realizada con éxito por " + RUT);
  else if (name !== "")
    alert(`Compra realizada con éxito por ${name} (CONSUMIDOR FINAL)`);
  else alert("Compra realizada con éxito por CONSUMIDOR FINAL");
});

function addToCart(name, price) {
  let index = 0;

  while (index < cart.length && name !== cart[index].name)
    index++;

  if (index >= cart.length)
    cart.push({
      name: name,
      count: 1,
      unitCost: price,
    });
  else
    cart[index].count++;
}