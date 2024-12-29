<template>
    <div class="purchase-history-container">
      <!-- Header Section -->
      <header class="header">
        <h3 class="app-title">
          <img
            src="../assets/cutton-cake.jpg"
            alt="Cutton Cake Logo"
            class="logo"
          />
          {{ customerName }}'s Purchase History
        </h3>
      </header>
  
      <div v-if="loading" class="loading-message">
        Loading purchase history...
      </div>
      <div
        v-else-if="!purchaseHistory || purchaseHistory.length === 0"
        class="no-history-message"
      >
        No purchase history found for this customer.
      </div>
  
      <div v-else class="purchase-history-list">
        <div
          v-for="record in purchaseHistory"
          :key="record._id"
          class="purchase-record"
        >
          <div class="record-info">
            <div class="name-date">
              <p><strong>Item Name:</strong> {{ record.name }}</p>
              <p>
                <strong>Date:</strong>
                {{ new Date(record.orderDate).toLocaleDateString() }}
              </p>
            </div>
  
            <div class="slid-design">
              <p>Weight</p>
              <p>Quantity</p>
              <p>PricePerUnit</p>
            </div>
            <div class="slidevalue">
              <p>{{ record.weight }}</p>
              <p>{{ record.quantity }}</p>
              <p>₹{{ record.pricePerUnit }}</p>
            </div>
  
            <!-- <div class="price-payment-status">
              <p>
                <strong class="payment-color">Total Price:</strong> ₹{{
                  record.ttlprice
                }}
              </p>
              <p>Creditaed payment:9000</p>
              <p>remaining Payment:80000</p>
              <div class="payment-status">
                <strong>Payment Status:</strong>
                <select
                  v-model="record.paymentStatus"
                  @change="updatePaymentStatus(record, index)"
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Partially Paid">Partially Paid</option>
                </select>
              </div>
            </div> -->
         
            <div class="price-payment-status">
    <p><strong class="payment-color">Total Price:</strong> ₹{{ record.ttlprice }}</p>
    
    <div v-if="record.paymentStatus === 'Partially Paid' || record.paymentStatus === 'Unpaid'">
      <p>
        Credited Payment:
        <input
          type="number"
          v-model.number="record.creditAmount"
          @input="validateCreditAmount(record)"
          class="custom-input"
          :max="record.ttlprice"
        />
      </p>
      <p>Remaining Payment: ₹{{ record.remainingAmount || record.ttlprice }}</p>
    </div>
    
    <div v-else>
      <p>Credited Payment: ₹{{ record.creditAmount || 0 }}</p>
      <p>Remaining Payment: ₹{{ record.remainingAmount || 0 }}</p>
    </div>
  
    <div class="payment-status">
      <strong>Payment Status:</strong>
      <select
        v-model="record.paymentStatus"
        @change="handlePaymentStatusChange(record)"
      >
        <option value="Paid">Paid</option>
        <option value="Unpaid">Unpaid</option>
        <option value="Partially Paid">Partially Paid</option>
      </select>
    </div>
  </div>
  
         
         
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from "vue";
  import axios from "axios";
  import { useRoute } from "vue-router";
  const route = useRoute();
  
  const purchaseHistory = ref([]);
  const loading = ref(true);
  const customerName = ref("");
  
  const fetchData = async () => {
    loading.value = true;
    const customerId = route.params.id;
    const productType = route.params.type;
    try {
      const response = await axios.get(
        `http://localhost:3000/Sell/customerOrders/${customerId}/${productType}`
      );
      if (response.data) {
        purchaseHistory.value = response.data.products;
        customerName.value = response.data.customerName;
      } else {
        purchaseHistory.value = [];
      }
    } catch (error) {
      console.error("Error fetching purchase history:", error);
      purchaseHistory.value = [];
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchData);
  
  watch(
    () => route.params,
    () => {
      fetchData();
    }
  );
  
  // const updatePaymentStatus = async (record) => {
  //   try {
  //     const productType = route.params.type; 
  //     await axios.put(
  //       `http://localhost:3000/Sell/customerpayment/${record._id}/${productType}`,
  //       {
  //         paymentStatus: record.paymentStatus,
  //       }
  //     );
  //     alert(
  //       `Payment status updated to "${record.paymentStatus}" for this order.`
  //     );
  //   } catch (error) {
  //     console.error("Error updating payment status:", error);
  //     alert("Error updating payment status. Please try again.");
  //   }
  // };
  
  
  const handlePaymentStatusChange = (record) => {
    if (record.paymentStatus === "Paid") {
      record.creditAmount = record.ttlprice; // Full payment
      record.remainingAmount = 0;
    } else if (record.paymentStatus === "Unpaid") {
      record.creditAmount = 0; // No payment
      record.remainingAmount = record.ttlprice;
    } else if (record.paymentStatus === "Partially Paid") {
      record.creditAmount = 0; // Allow user input
      record.remainingAmount = record.ttlprice;
    }
  };
  
  const validateCreditAmount = (record) => {
    // Ensure credited amount does not exceed total price
    if (record.creditAmount > record.ttlprice) {
      record.creditAmount = record.ttlprice;
    }
    record.remainingAmount = Math.max(0, record.ttlprice - (record.creditAmount || 0));
  };
  
  // const updatePaymentStatus = async (record) => {
  //   try {
  //     const productType = route.params.type;
  //     await axios.put(
  //       `http://localhost:3000/Sell/customerpayment/${record._id}/${productType}`,
  //       {
  //         paymentStatus: record.paymentStatus,
  //         creditedAmount: record.creditAmount || 0,
  //         remainingAmount: record.remainingAmount || record.ttlprice,
  //       }
  //     );
  //     alert(`Payment status updated successfully for "${record.name}".`);
  //   } catch (error) {
  //     console.error("Error updating payment status:", error);
  //     alert("Failed to update payment status. Please try again.");
  //   }
  // };
  
  </script>
  
  <style scoped lang="scss">
  .purchase-history-container {
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }
  
  .app-title {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  
  .logo {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  
  .loading-message,
  .no-history-message {
    text-align: center;
    font-size: 20px;
    color: #999;
  }
  
  .purchase-history-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .purchase-record {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: all 0.3s ease-in-out;
  }
  
  .purchase-record:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  .record-info {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    color: #777;
    width: 95%;
  }
  
  .slid-design {
    margin-left: 2rem;
    width: 95%;
    background-color: rgb(235, 242, 239);
    height: 48px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  
  .slidevalue {
    margin-top: 1rem;
    margin-left: 2rem;
    width: 95%;
    background-color: rgb(255, 255, 255);
    height: 48px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  
  .record-item {
    display: flex;
    justify-content: space-between;
    gap: 5px;
  }
  .name-date {
    margin-left: 2rem;
    width: 95%;
    background-color: rgb(255, 255, 255);
    height: 48px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .record-item p {
    font-size: 16px;
    margin: 5px 0;
  }
  .price-payment-status {
    margin-left: 2rem;
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .payment-color {
      font-size: 16px;
      font-weight: 500;
      color: green;
    }
  }
  
  // .payment-status {
  //   margin-top: 10px;
  // }
  
  .record-info select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
    background-color: #f0f0f0;
    color: #333;
    transition: border-color 0.3s ease-in-out;
  }
  
  .record-info select:focus {
    border-color: #007bff;
  }
  
  @media (max-width: 768px) {
    .purchase-record {
      padding: 15px;
    }
  
    .record-info {
      gap: 10px;
    }
  
    .record-item p {
      font-size: 14px;
    }
  }
  </style>
  