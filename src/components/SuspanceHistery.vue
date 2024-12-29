<template>
  <div class="purchase-history-container">
    <!-- Header Section -->
    <header class="header">
      <h3 class="app-title">Suspense History</h3>
    </header>

    <!-- Loading Section -->
    <div v-if="loading" class="loading-message">
      Loading Suspense history...
    </div>

    <!-- No Records Section -->
    <div
      v-else-if="!purchaseHistory || purchaseHistory.length === 0"
      class="no-history-message"
    >
      No purchase history found for this customer.
    </div>

    <!-- Records Section -->
    <div v-else class="purchase-history-list">
      <div
        v-for="record in purchaseHistory"
        :key="record._id"
        class="purchase-record"
      >
        <div class="record-info">
          <!-- Record Header -->
          <div class="name-date">
            <p><strong>Suspance Type:</strong> {{ record.expenseType }}</p>
            <p>
              <strong>Date:</strong>
              {{ new Date(record.createdAt).toLocaleDateString() }}
            </p>
          </div>

          <!-- Payment Section -->
          <div class="price-payment-status">
            <p>
              <strong class="payment-color">Total Price:</strong> ₹
              {{ record.amount }}
            </p>
            <p class="description" title="Hover to expand">
              {{ record.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
const purchaseHistory = ref([]);
const loading = ref(true);

// Fetch Suspense History
const fetchData = async () => {
  loading.value = true;
  console.log("Fetching data...");
  try {
    const response = await axios.get(
      `https://j-k-managment-backend.onrender.com/purchase/AllSuspanceData`,{ headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }}
    );
    console.log("Response:", response.data);
    purchaseHistory.value = response.data || [];
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    purchaseHistory.value = [];
  } finally {
    loading.value = false;
    console.log("Loading complete.");
  }
};

// Update Payment Status

// Fetch data when the component is mounted or route params change
onMounted(fetchData);
watch(() => fetchData());
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
.description {
  max-width: 300px; /* Set your desired width */
  white-space: nowrap; /* Prevent text wrapping */
  overflow: hidden; /* Hide overflowing content */
  text-overflow: ellipsis; /* Add '...' for overflow */
  cursor: pointer; /* Indicate that the text can be hovered for full view */
}

.description:hover {
  white-space: normal; /* Allow wrapping on hover */
  overflow: auto; /* Show scroll if necessary */
  max-height: 100px; /* Add max height to control scrolling */
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
