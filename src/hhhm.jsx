const input = document.getElementById('itemInput')

let items = [];

// Add item function
function addItem() {
  const itemText = input.value.trim();

  if (itemText !== '') {
    // Add the item to the array
    items.push(itemText);

    // Clear the input field
    input.value = '';
  }
}