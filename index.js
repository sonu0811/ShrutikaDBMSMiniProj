// 🔎 Query selectors
const addItems = document.querySelector(".add-items");
const itemsList = document.getElementById("itemsList");
const items = JSON.parse(localStorage.getItem("items")) || []; // sets value as localStorage, if available, or an empty array if there is no localStorage
const selectAll = document.getElementById("selectAll");
const clearList = document.getElementById("clearList");

// ⚙️ Functions
function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector("[name=item]")).value; //looks inside the form tag for something with a name attribute of item; narrows the search on the page to elements with the listed attribute
  const item = {
    text, // an ES6 shorthand - if the key & value have the same name, can use this shorthand instead of listing out text: text / key: value
    done: false
  };
  items.push(item);   // add the item to the items array
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items)); // set items to localStorage
  this.reset(); // resets the form
}

function populateList( things = [], thingsList ) {
 // needs the list of items to populate; argument creates an empty array as placeholder for data, and thingsList is the 
 thingsList.innerHTML = things.map((thing, i) => {
   return `
    <li>
      <input type="checkbox" data-index=${i} id="item${i}" ${thing.done ? "checked" : ""} /> 
      <label for="item${i}">${thing.text}</label>
    </li>
   `;
 }).join(""); // .join creates one string, rather than an array of strings
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;  // skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function toggleSelect() {
  // look at the items
  // if the item is not selected, select it
  if (selectAll.innerText === "Select all") {
    items.map(item => item.done = true);
    selectAll.innerText = "Deselect all";
  } else {
    items.map(item => item.done = false);
    selectAll.innerText = "Select all";
  }
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function clearAllFromList() {
  items.splice(0);
  localStorage.clear();
  populateList(items, itemsList);
}

// 👂 Event listeners
window.addEventListener("load", populateList(items, itemsList));
addItems.addEventListener("submit", addItem); // want to listen for a submit event on a form - a click event doesn't necessarily pick up all needed info (?)
itemsList.addEventListener("click", toggleDone); // listen for a click on the parent element to target a child element that doesn't yet exist on the page
selectAll.addEventListener("click", toggleSelect);
clearList.addEventListener("click", clearAllFromList);
