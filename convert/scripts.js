// Info
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Valores das moedas
const USD = 5.61
const EUR = 6.29
const GBP = 7.46

// Manipulando o input para receber apenas números.
amount.addEventListener("input", () => {
  const hasCharacteresRegex = /\D+/g
  amount.value = amount.value.replace(hasCharacteresRegex, "")
})

// Evento de submit do form
form.onsubmit = (event) => {
  event.preventDefault()

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break
    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break
    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break
  }
}

// Função para converter as moedas
function convertCurrency(amount, price, symbol) {
  try {
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    let total = amount * price


    if (isNaN(total)) {
      return alert("Por favor digite o valor corretamente.")
    }

    total = formatCurrencyBRL(total).replace("R$", "")

    result.textContent = `${total} Reais`

    footer.classList.add("show-result")

  } catch (e) {
    console.log(e)
    footer.classList.remove("show-result")

    alert("Não foi possivel converter :(")
  }
}


// Formatar para real
function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}