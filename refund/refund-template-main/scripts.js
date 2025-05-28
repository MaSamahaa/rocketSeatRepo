// Selecionar os elementos do formulário
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');
const form = document.querySelector('form');

const expenseList = document.querySelector('ul');
const expenseQuantity = document.querySelector('aside header p span');
const expenseTotal = document.querySelector("aside header h2")

// Capturar o evento de entrada no campo de valor
amount.oninput = () => {
  // Remover todos os caracteres que não sejam dígitos
  let value = amount.value.replace(/\D/g, "");

  // transforma o valor em centavos
  value = Number(value) / 100;


  //Atualiza valor do input
  amount.value = formatCurrencyBRL(value);

}

// Formatar o valor como moeda brasileira (BRL)
function formatCurrencyBRL(value) {
  value = value.toLocaleString('pt-BR', {
    style: "currency",
    currency: 'BRL',
  });
  return value
}

// Capturar o evento de envio do formulário
form.onsubmit = (event) => {
  // Evitar o comportamento padrão do formulário de recarregar a página
  event.preventDefault();

  // Cria um objeto com os dados do formulário
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    create_at: new Date(),
  }

  console.log(newExpense);

  expenseAdd(newExpense);
}

// adiciona um novo item na lista de despesas
function expenseAdd(newExpense) {
  try {
    // Criar elemento para add na lista
    const expenseItem = document.createElement('li');
    expenseItem.classList.add('expense');

    // Cria o icone de acordo com a categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // Cria a info da despesa
    const expenseInfo = document.createElement('div');
    expenseInfo.classList.add('expense-info');

    // Cria o nome da despesa
    const expenseName = document.createElement('strong');
    expenseName.textContent = newExpense.expense;

    // Cria a categoria da despesa
    const expensecategory = document.createElement('span');
    expensecategory.textContent = newExpense.category_name;

    // Junto as informações do item
    expenseInfo.append(expenseName, expensecategory);

    // Cria o valor da despesa
    const expenseAmount = document.createElement('span');
    expenseAmount.classList.add('expense-amount');
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`;

    // Cria o icone de remover
    const removeIcon = document.createElement('img');
    removeIcon.classList.add('remove-icon');
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "Remover despesa");

    // Adiciona informações do item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // Adiciona o item na lista
    expenseList.append(expenseItem);

    updateTotals();

    clearForm();

  } catch (error) {
    alert('Erro ao adicionar despesa');
    console.log(error);
  }
}

// Atualiza o valor total
function updateTotals() {
  try {
    const items = expenseList.children
    expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despensas" : "despesa"}`;

    let total = 0;
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector('.expense-amount');
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");

      value = parseFloat(value);

      if(isNaN(value)) {
        return alert('Erro ao calcular o total');
      }

      total += Number(value);

    }

    const symbolBRL = document.createElement('small');
    symbolBRL.textContent = 'R$';

    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    //Limpa o total anterior
    expenseTotal.innerHTML = '';
    // adiciona o simbolo e o total formatado
    expenseTotal.append(symbolBRL, total);
  } catch (error) {
    console.log(error);
    alert('Erro ao atualizar totais');
  }


}

// Capturar o evento de clique no icone de remover
expenseList.addEventListener('click', function (event) {
  // Verifica se o elemento clicado é o icone de remover
  if (event.target.classList.contains('remove-icon')) {
    // Remove o item da lista
    const item = event.target.closest(".expense");
    item.remove();

    // Atualiza os totais
    updateTotals();
  }
})

function clearForm() {
  // Limpa os campos do formulário
  amount.value = '';
  expense.value = '';
  category.value = '';

  expense.focus();
}