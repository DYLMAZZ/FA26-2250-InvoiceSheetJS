/*function processRow(e) {
  let clickedElement = e.target;
  console.log(clickedElement.getAttribute('name'));
  // using a CSS selector, we can find the 
  // ancestor element. In our case, we want to 
  // locate tr because we know all the elements
  // we need to recalculate a line item are 
  // children of the row.
  let rowElement = clickedElement.closest('tr');
  let rowId = rowElement.getAttribute('id');
  console.log(rowId);
  let rowTotalElement = rowElement.querySelector('input[name="itemTotal"]');
  rowTotalElement.value = 52.35;
}

function main() {
  // find all input elements that will trigger a recalculation of the 
  // sheet.
  const calcList = document.querySelectorAll('input.calc');
  // ad an event listener to each element
  console.log(calcList.length);
  for (let i = 0; i < calcList.length; i++) {
    calcList[i].addEventListener('change', function(e) { 
      // The parameter represents an event object.
      // It contains information about the event including
      // the element that triggered the event
      processRow(e);
    });
  }
}

main();

*/

function processRow(e) {
  // make clickedElement the thing you clicked on
  let clickedElement = e.target;

  // find row containing the input that changed
  let rowElement = clickedElement.closest('tr');

  // get quantity and cost from row
  let quantity = parseFloat(rowElement.querySelector('input[name="quantity"]').value) || 0;
  let cost = parseFloat(rowElement.querySelector('input[name="cost"]').value) || 0;

  // calculate the total for the item
  let rowTotalElement = rowElement.querySelector('input[name="itemTotal"]');
  rowTotalElement.value = (quantity * cost).toFixed(2);

  // recalculate the invoice totals
  calculateTotals();
}

// calculating all the values to be in the "Total" column
function calculateTotals() {
    let itemTotals = document.querySelectorAll('input[name="itemTotal"]');
    let subTotal = 0

    // Add all item totals together and put that in subTotal
    for (let c = 0; c< itemTotals.length; c++) {
        subTotal += parseFloat(itemTotals[c].value) || 0;
    }
    
    document.querySelector('#subTotal').value = subTotal.toFixed(2);

    // calculate Tax
    let tax = parseFloat(document.querySelector('#tax').value) || 0;
    let taxTotal = subTotal * (tax / 100);

    document.querySelector('#taxTotal').value = taxTotal.toFixed(2);

    // calculate Total
    let total = subTotal + taxTotal;
    document.querySelector('#total').value = total.toFixed(2);
}

// adding another row to the table
function addRow(){
    let tbody = document.querySelector('#sheet0 tbody');
    let rows = tbody.querySelectorAll('tr');
    let newRow = document.createElement('tr');
    // giving row name like the others and setting it up with the same HTML
    newRow.id = 'item' + rows.length;
    newRow.innerHTML = `
        <td><input name="item" type="text" value=""></td>
        <td><input class="calc" name="quantity" type="number" value="0.00" size="10"></td>
        <td><input class="calc" name="cost" type="number" value="0.00" size="10"></td>
        <td><input name="itemTotal" type="number" value="0.00" size="10" readonly></td>
    `;
    tbody.appendChild(newRow);

    // add calulation listeners to the new row
    let calcInputs = newRow.querySelectorAll('input.calc');
    for (let c = 0; c < calcInputs.length; c++){
        calcInputs[c].addEventListener('change', function(e){
            processRow(e);
        });
    }
}

function main(){
    //find all inputs that trigger recalculation
    const calcList = document.querySelectorAll('input.calc');

    for (let c = 0; c < calcList.length; c++){
        calcList[c].addEventListener('change', function(e){
            //tax input needs to recalculate the whole sheet
            if (e.target.id === 'tax'){
                calculateTotals();
            } else {
                processRow(e);
            }
        });
    }

    //add the button to the fitrst cell of the subtotal row
    let subTotalRow = document.querySelector('#subTotal').closest('tr');
    let firstCell = subTotalRow.querySelector('td');

    let button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Add Row';
    button.addEventListener('click', addRow);

    firstCell.appendChild(button);
}

main();