<template>
    <div class="customer-list-container">
      <!-- Header Section with Logo/Title -->
      <header class="header">
        <h3 class="app-title">
          <img src="../assets/cutton-cake.jpg" alt="Cutton Cake Logo" class="logo" />
          Cutton Cake KhataBook
        </h3>
      </header>
    
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for a customer by name..."
        />  
      </div>
  
      <div v-if="loading" class="loading-message">Loading customers...</div>
  
      <div v-else class="customer-cards">
        <div
          v-for="customer in filteredCustomers"
          :key="customer._id"
          class="customer-card"
          @click="viewCustomerDetails(customer._id)"
        >
          <div class="outer">
            <img
              src="../assets/man_icon.png"
              alt="Customer Image"
              class="customer-image"
            />
          </div>
          <!-- customer.totalPurchase  -->
          <div class="customer-info">
            <h3>{{ customer.customerName }}</h3>
            <p>
              <i class="fas fa-shopping-cart"></i> Total Purchase: ₹{{customer.totalSale }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import axios from "axios";
  import { useRouter } from "vue-router";
  
  const customers = ref([]);
  const searchQuery = ref("");
  const loading = ref(true);
  
  const filteredCustomers = computed(() => {
    return customers.value.filter((customer) =>
      customer.customerName.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  const router = useRouter();
  
  onMounted(async () => {
    try {
      const response = await axios.get("https://j-k-managment-backend.onrender.com/Sell/mustardOilKhata");
      customers.value = response.data;
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      loading.value = false;
    }
  });
  
  const viewCustomerDetails = (customerId) => {
    router.push({ name: "CustomerDetails", params: { id: customerId } });
  };
  </script>
  
  
  <style scoped lang="scss">
  
  .customer-list-container {
    font-family: "Arial", sans-serif;
    padding: 20px;
    background-color: white;
  }
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
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
  
  .search-bar {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
  
  .search-bar input {
    width: 100%;
    max-width: 600px;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
    font-size: 16px;
  }
  
  .customer-cards {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
  }
  
  .customer-card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    padding: 20px;
    width: 80%;
    display: flex;
    align-items: center;
    transition: transform 0.3s ease;
    justify-content: space-between; /* Space items evenly */
  }
  
  .customer-card:hover {
    transform: scale(1.05);
  }
  
  .outer {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2.5px solid blueviolet;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .customer-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  
  .customer-info {
    display: flex;
    flex-direction: row; /* Align items in a row */
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-left: 20px; /* Adds space between image and info */
   
  }
  
  .customer-info h3{
    font-size: 20px;
    font-weight: 500;
    color: #333;
    margin-left:40%;
  
  }
  .customer-info p {
    font-size: 16px;
    font-size: 16px;
    color: #777;
    margin: 0;
    padding: 0 10px;
  }
  
  .customer-info p i {
    color: #6c63ff; /* Icon color */
    margin-right: 5px;
  }
  
  .loading-message {
    text-align: center;
    font-size: 20px;
    color: #999;
  }
  </style>