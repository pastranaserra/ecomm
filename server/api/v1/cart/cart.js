const defaultCart = {
  items: [],
  totalQtty: 0,
  totalPrice: 0,
};

function ttlPrice(list) {
  let finalPrice = 0;
  if (list) {
    list.forEach((item) => {
      finalPrice += item.price;
    });
  }
  return finalPrice;
}

function ttlQtty(list) {
  let finalQtty = 0;
  list.forEach((item) => {
    finalQtty += item.qtity;
  });
  return finalQtty;
}
function Cart(cartList = []) {
  this.items = cartList; // array of objects
  this.totalQtty = ttlQtty(cartList) || 0; // this.items.storedItem.qtity
  this.totalPrice = ttlPrice(cartList) || 0;

  this.add = function add(item) {
    let storedItem = this.items.find(
      (element) => element.item.name === item.name,
    );
    if (!storedItem) {
      storedItem = { item, qtity: 1, price: item.price };
      this.items.push(storedItem);
    } else {
      storedItem.qtity += 1;
      storedItem.price += item.price;
    }
    this.totalQtty = ttlQtty(this.items);
    this.totalPrice = ttlPrice(this.items);
  };

  this.remove = function remove(item) {
    if (item.qtity >= 1) {
      item.qtity -= 1;
      item.price -= item.item.price;
    } else {
      this.items.splice(this.items[item], 1);
    }

    this.totalQtty = ttlQtty(this.items);
    this.totalPrice = ttlPrice(this.items);
  };
}

module.exports = { defaultCart, Cart };
