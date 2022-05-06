exports.add = () => {
  console.log('Adding an item to your cart');
};

exports.read = (req, res) => {
  res.json({
    title: 'Stamp black hoodie',
    type: 'Hoodie',
    Color: 'Black',
  });
};

exports.modify = () => {
  console.log('Updating an item from your cart');
};

exports.delete = () => {
  console.log('Removing an item from your cart');
};
