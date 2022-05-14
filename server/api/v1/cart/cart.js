function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQtty = oldCart.totalQtty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  this.add = function add(item, id) {
    let storedItem = this.items[id];
    if (!storedItem) {
      this.items[id] = { item, quantity: 0, price: 0 };
      storedItem = this.items[id];
    }
    storedItem.quantity += 1;
    storedItem.price = storedItem.item.price * storedItem.item.quantity;
    this.totalQtty += 1;
    this.totalPrice += storedItem.item.price;
  };
  this.remove = function remove(item, id) {
    const storedItem = this.items[id];
    for (let i = 0; i < this.items.length; i + 1) {
      if (this.items[i] === storedItem) {
        this.items.splice(i, 1);
      }
    }
    this.totalQtty -= 1;
    this.totalPrice -= storedItem.item.price;
  };
  this.generateArray = function generateArray() {
    const userCart = [];
    for (const id in this.items) {
      userCart.push(this.items[id]);
    }
    return userCart;
  };
}
