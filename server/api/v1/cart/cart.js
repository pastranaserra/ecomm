const defaultCart = {
  items: [],
  totalQtty: 0,
  totalPrice: 0,
};

const ttlPrice = (itemsList) => {
  let finalPrice = 0;
  itemsList.forEach((item) => {
    finalPrice += item.price;
  });
  return finalPrice;
};

function Cart(items) {
  this.items = items; // array of objects
  this.totalQtty = items.length;
  this.totalPrice = ttlPrice(items);
}

module.exports = { defaultCart, Cart };
