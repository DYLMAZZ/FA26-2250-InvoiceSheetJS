function processRow(e) {
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

