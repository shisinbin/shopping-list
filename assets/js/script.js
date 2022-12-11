var shoppingFormEl = $('#shopping-form');
var shoppingListEl = $('#shopping-list');

// this is a global variable that keeps track of the order
var shoppingListItemsArr = [];

// remove all button
var removeAllBtn = $('#remove-all');

// helper function for storing array into local storage
function updateStorage(arr) {
  localStorage.setItem('shopping_list', JSON.stringify(arr));
}

// helper function for checking if there are multiple items
function displayRemoveAllButtonCorrectly() {
  if (shoppingListItemsArr.length > 1) {
    removeAllBtn.css('display', '');
  } else {
    removeAllBtn.css('display', 'none');
  }
}

// make shopping list sortable
shoppingListEl.sortable({
  // every time list is updated
  update: function (event, ui) {
    // get an array of the value of the custom attribute for each list item
    shoppingListItemsArr = $(this).sortable('toArray', {
      attribute: 'data-custom',
    });

    updateStorage(shoppingListItemsArr);
  },
});

// a function to add an item. it assumes item is valid
function addItem(item) {
  // add a new list element
  var shoppingListItemEl = $(
    '<li class="flex-row justify-space-between align-center p-2 bg-light text-dark">'
  );

  // set the text of the list item to argument
  shoppingListItemEl.text(item);

  // create a custom attr which basically carries the name
  // this is important for keeping order
  shoppingListItemEl.attr('data-custom', item);

  // add delete button to remove shopping list item
  shoppingListItemEl.append(
    '<button class="btn btn-danger btn-small delete-item-btn">Remove</button>'
  );

  // print to the page (it will go to the bottom of current list)
  shoppingListEl.append(shoppingListItemEl);

  // so this bit of code gets an array of the custom attribute value
  // for each list item. used chatgpt to work out how to do this
  shoppingListItemsArr = shoppingListEl
    .children()
    .map(function () {
      return $(this).attr('data-custom');
    })
    .get();

  updateStorage(shoppingListItemsArr);

  displayRemoveAllButtonCorrectly();
}

// function that checks entry is valid, and if so adds it, and clears text entry
function handleFormSubmit(event) {
  event.preventDefault();

  // grab the value in the input box
  var shoppingItem = $('input[name="shopping-input"]').val();

  // if no value, then exit function
  if (!shoppingItem) {
    // console.log('No shopping item filled out in form!');
    return;
  }

  // add the item
  addItem(shoppingItem);

  // clear the form input element
  $('input[name="shopping-input"]').val('');
}

//
// Event listeners
//
// for when submit is clicked
shoppingFormEl.on('submit', handleFormSubmit);

// for when item is removed
shoppingListEl.on('click', 'button', function () {
  // remove the parent, in this case the list item is the parent of button
  $(this).parent().remove();

  // if there are still some remaining children
  if (shoppingListEl.children().length > 0) {
    // update tracker array
    shoppingListItemsArr = shoppingListEl
      .children()
      .map(function () {
        return $(this).attr('data-custom');
      })
      .get();

    // and update storage
    updateStorage(shoppingListItemsArr);
  } else {
    // otherwise remove key from local storage
    localStorage.removeItem('shopping_list');
  }

  displayRemoveAllButtonCorrectly();
});

// for when all items are removed
removeAllBtn.on('click', function () {
  var deleteItems = confirm(
    'Woah there, are you sure you want to delete the entire list?'
  );

  if (deleteItems) {
    // remove items from local storage
    localStorage.removeItem('shopping_list');

    // set tracking array to empty, maybe not necessary
    shoppingListItemsArr = [];

    // set innerhtml of list to empty
    shoppingListEl.empty();

    // hide remove all button, if not already
    removeAllBtn.css('display', 'none');
  }
});

// function to call on first load
function init() {
  // get a shopping list
  var anArr = JSON.parse(localStorage.getItem('shopping_list'));
  if (anArr !== null) {
    shoppingListItemsArr = anArr;
    shoppingListItemsArr.forEach((item) => {
      addItem(item);
    });
  }
}

init();
