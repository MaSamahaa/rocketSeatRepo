const form = document.querySelector("form");
const input = document.getElementById("addItem");
const itemList = document.getElementById("itemList");

let items = JSON.parse(localStorage.getItem("items")) || [];

// renderiza os salvos
items.forEach((item) => createItemElement(item));

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const value = input.value.trim();
  if (value !== "") {
    const item = { text: value};
    items.push(item);
    saveItems();
    createItemElement(item);
    input.value = "";
  }
});

function createItemElement(item) {
  const div = document.createElement("div");
  div.classList.add("item-row");

  const label = document.createElement("label");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

   const span = document.createElement("span");
  span.textContent = item.text;

  label.appendChild(checkbox);
  label.appendChild(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");

  const img = document.createElement("img");
  img.src = "./img/button.svg";
  img.alt = "Excluir";
  deleteBtn.appendChild(img);

  // Remover item
  deleteBtn.addEventListener("click", () => {
    itemList.removeChild(div);
    items = items.filter((i) => i.text !== item.text);
    saveItems();
  });

  div.appendChild(label);
  div.appendChild(deleteBtn);
  itemList.appendChild(div);
}

// Salva no localStorage
function saveItems() {
  localStorage.setItem("items", JSON.stringify(items));
}
