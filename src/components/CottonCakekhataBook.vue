<template>
  <div class="customer-list-container">
    <!-- Header Section with Logo/Title -->
    <header class="header">
      <h3 class="app-title">
        <img src="../assets/MustardOil_image.jpg" alt="Cutton Cake Logo" class="logo" />
        Cutton-Cake  KhataBook
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
          <button @click.stop="deleteCustomer(customer._id)">Delete</button>
        
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
const productType = ref("");
productType.value = "cuttoncake"

console.log(`the product type is ${productType.value}`)

const filteredCustomers = computed(() => {
  return customers.value.filter((customer) =>
    customer.customerName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const router = useRouter();

onMounted(async () => {
  try {
    const response = await axios.get("https://j-k-managment-backend.onrender.com/Sell/cottonCakeKhata");
    customers.value = response.data;
  } catch (error) {
    console.error("Error fetching customer data:", error);
  } finally {
    loading.value = false;
  }
});

const viewCustomerDetails = (customerId) => {
 alert(customerId)
  router.push({ name: "CustomerHistorydetails", params: { id:customerId ,type: productType.value} });
};
const deleteCustomer = async (customerId) => {
  try {
    alert(`${customerId} is delete`)
    await axios.delete(`https://j-k-managment-backend.onrender.com/Sell/Cuttonkhata/${customerId}`);
    customers.value = customers.value.filter(customer => customer._id !== customerId);
  } catch (error) {
    console.error("Error deleting customer:", error);
  }
};

</script>


<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

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
.customer-info button {
  all: unset;
  width: 6.5rem;
  height: 2rem;
  padding: 8px 24px 8px 24px;
  gap: 10px;
  border-radius: 8px;
  background-color: #b86363;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.5px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: white;
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