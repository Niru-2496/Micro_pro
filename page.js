let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let income = JSON.parse(localStorage.getItem("income")) || [];
let expenseLimit = localStorage.getItem("expenseLimit") || 0;

function updateDashboard() {
  let totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
  let totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  let balance = totalIncome - totalExpenses;
  
  document.getElementById("total-income").textContent = totalIncome.toFixed(2);
  document.getElementById("total-expenses").textContent = totalExpenses.toFixed(2);
  document.getElementById("balance").textContent = balance.toFixed(2);
  document.getElementById("expense-limit").value = expenseLimit;

  if (totalExpenses > expenseLimit && expenseLimit > 0) {
    alert("Warning! Your expenses have exceeded the set limit!");
  }
  
  renderIncomeExpenseGraph();
}

function renderIncomeExpenseGraph() {
  const ctx = document.getElementById('incomeExpenseChart').getContext('2d');
  if (window.pieChart) window.pieChart.destroy();
  
  window.pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Income', 'Expenses'],
      datasets: [{
        data: [
          income.reduce((acc, curr) => acc + curr.amount, 0),
          expenses.reduce((acc, curr) => acc + curr.amount, 0)
        ],
        backgroundColor: ['navy', 'lightblue']
      }]
    }
  });
}

document.getElementById("log-expense").addEventListener("click", function () {
  const description = document.getElementById("expense-description").value.trim();
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const date = document.getElementById("expense-date").value;
  
  if (!description || isNaN(amount) || !date) return;
  
  expenses.push({ description, amount, date });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  updateDashboard();
});

document.getElementById("log-income").addEventListener("click", function () {
  const description = document.getElementById("income-description").value;
  const amount = parseFloat(document.getElementById("income-amount").value);
  const date = document.getElementById("income-date").value;
  
  if (!description || isNaN(amount) || !date) return;
  
  income.push({ description, amount, date });
  localStorage.setItem("income", JSON.stringify(income));
  updateDashboard();
});

document.getElementById("expense-limit").addEventListener("change", function () {
  expenseLimit = parseFloat(this.value) || 0;
  localStorage.setItem("expenseLimit", expenseLimit);
  updateDashboard();
});

document.getElementById("reset-dashboard").addEventListener("click", function () {
  expenses = [];
  income = [];
  expenseLimit = 0;
  localStorage.clear();
  updateDashboard();
});

updateDashboard();
