// script.js
let total = 0;
function addExpense() {
    const desc = document.getElementById('desc').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    
    if (!desc || isNaN(amount) || amount <= 0) {
        alert('Please enter valid details.');
        return;
    }
    
    total += amount;
    document.getElementById('totalAmount').textContent = total.toFixed(2);
    
    const li = document.createElement('li');
    li.innerHTML = `${desc} - $${amount.toFixed(2)} (${category}) <button onclick="removeExpense(this, ${amount})">X</button>`;
    document.getElementById('expenseList').appendChild(li);
    
    document.getElementById('desc').value = '';
    document.getElementById('amount').value = '';
}

function removeExpense(element, amount) {
    element.parentElement.remove();
    total -= amount;
    document.getElementById('totalAmount').textContent = total.toFixed(2);
}
