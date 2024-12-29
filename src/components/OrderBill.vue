<template>
    <div class="bill-container" v-if="orderData">
      <h2>Bill</h2>
      <div class="bill-info">
        <div><strong>Buyer Name:</strong> {{ orderData.customerName }}</div>
        <div><strong>Bill Number:</strong> {{ billNumber }}</div>
        <div><strong>Date:</strong> {{ orderData.orderDate }}</div>
      </div>
  
      <table class="table" v-if="orderData.products && orderData.products.length > 0">
        <thead>
          <tr>
            <th>Product</th>
            <th>Weight (kg)</th>
            <th>Quantity</th>
            <th>Price per Unit</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in orderData.products" :key="index">
            <td>{{ product.name }}</td>
            <td>{{ product.weight }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.pricePerUnit ? product.pricePerUnit : 'N/A' }}</td>
            <td>{{ product.totalPrice ? product.totalPrice: 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
  
      <div class="total" v-if="orderData.totalPayment !== undefined">
        <div><strong>Total Amount:</strong> {{ orderData.totalPayment }}</div>
        <div><strong>Paid Amount:</strong> {{ orderData.paidAmount }}</div>
        <div><strong>Remaining Amount:</strong> {{ orderData.remainingAmount}}</div>
        
      </div>
  
      <div class="footer">
        Thank you for your purchase!
      </div>
  
      <button @click="printBill">Print Bill</button>
    </div>
  
    <!-- Fallback loading message if orderData is not available -->
    <div v-else>
      Loading...
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  const orderData = route.query.orderData
  ? JSON.parse(route.query.orderData)
  : {};
  // Generate random bill number
  const billNumber = ref(Math.floor(Math.random() * 1000000));
  
  const printBill = () => {
    // Save the current page's content
    const originalContents = document.body.innerHTML;

    // Get only the content of the .bill-container
    const billContents = document.querySelector(".bill-container").outerHTML;

    // Replace the entire page content with the bill content for printing
    document.body.innerHTML = billContents;

    // Trigger the print dialog
    window.print();

    // After printing, restore the original page content
    document.body.innerHTML = originalContents;
};



  </script>
  
  
  
     <style lang="scss" scoped>
body {
    font-family: Arial, sans-serif;
    margin: 20px;
    padding: 0;
}

.bill-container {
    max-width: 600px;
    margin: 0 auto;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.bill-info {
    margin-bottom: 20px;
    font-size: 1rem;
    color: #444;
}

.bill-info div {
    margin: 5px 0;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 0.9rem;
    color: #555;
}

.table th,
.table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

.table th {
    background-color: #f4f4f4;
    font-weight: bold;
}

.table td {
    text-align: center;
}

.total {
    text-align: right;
    font-weight: bold;
    font-size: 1rem;
    margin-top: 20px;
}

.total div {
    margin: 5px 0;
}

.footer {
    text-align: center;
    margin-top: 20px;
    font-size: 0.9rem;
    color: #777;
}
@media print {
    /* Hide everything else on the page */
    body * {
        visibility: hidden;
    }

    /* Only make the bill container visible */
    .bill-container,
    .bill-container * {
        visibility: visible;
    }

    .bill-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%; /* Ensure the content uses full width when printed */
        page-break-before: always; /* Prevent any page breaks before the bill */
    }
}


</style>

  