// Temporary storage for orders and SMS requests
let orders = [
  { user: 'Client001', product: 'WhatsApp', price: 7, status: 'Pending' },
  { user: 'Client002', product: 'TikTok', price: 10, status: 'Completed' },
];

let smsRequests = [
  { platform: 'WhatsApp', country: 'USA', code: '482193' },
  { platform: 'TikTok', country: 'Germany', code: '771902' },
];

// ------------------- ORDERS -------------------
function renderOrders() {
  const table = document.getElementById('orders-table');
  // Remove old rows
  table.querySelectorAll('tr.dynamic').forEach(r => r.remove());

  orders.forEach((order, idx) => {
    const row = table.insertRow();
    row.classList.add('dynamic');
    row.insertCell(0).textContent = order.user;
    row.insertCell(1).textContent = order.product;
    row.insertCell(2).textContent = '$' + order.price;
    row.insertCell(3).textContent = order.status;

    const actionCell = row.insertCell(4);
    if(order.status === 'Pending') {
      const btn = document.createElement('button');
      btn.textContent = 'Complete';
      btn.className = 'btn';
      btn.onclick = () => {
        orders[idx].status = 'Completed';
        renderOrders();
      };
      actionCell.appendChild(btn);
    } else {
      actionCell.textContent = '-';
    }
  });
}

// ------------------- SMS REQUESTS -------------------
function renderSMS() {
  const table = document.getElementById('sms-table');
  table.querySelectorAll('tr.dynamic').forEach(r => r.remove());

  smsRequests.forEach(sms => {
    const row = table.insertRow();
    row.classList.add('dynamic');
    row.insertCell(0).textContent = sms.platform;
    row.insertCell(1).textContent = sms.country;
    row.insertCell(2).textContent = sms.code;
  });
}

// ------------------- SETTINGS -------------------
function enableMaintenance() {
  alert('Maintenance mode enabled! (Demo)');
}

function clearLogs() {
  orders = [];
  smsRequests = [];
  renderOrders();
  renderSMS();
}

function toggleDarkMode() {
  document.body.classList.toggle('light-mode');
}

// ------------------- INITIAL RENDER -------------------
renderOrders();
renderSMS();
