<template>
  <div class="purchase-history-container">
    <!-- Header Section -->
    <header class="header">
      <h3 class="app-title">Selery Record</h3>
    </header>

    <!-- Loading and Error Messages -->
    <div v-if="loading" class="loading-message">Loading Selery history...</div>
    <div
      v-else-if="!purchaseHistory || purchaseHistory.length === 0"
      class="no-history-message"
    >
      No history Found.............
    </div>

    <!-- Purchase History List -->
    <div v-else class="purchase-history-list">
      <div
        v-for="record in purchaseHistory"
        :key="record._id"
        class="purchase-record"
      >
        <div class="record-info">
          <div class="name-date">
            <p><strong>Employe Id:</strong> {{ record.employee_id }}</p>
            <p>
              <strong>Salary Date:</strong>
              {{ record.paymentDate }}
            </p>
          </div>

          <div class="slid-design">
            <p>Total PDays</p>
            <p>Total Amount</p>
            <p>Credit Amount</p>
            <p>Remaining Amount</p>
            <p>Selery Month</p>
          </div>
          <div class="slidevalue">
            <p>{{ record.totalPresentDays }}</p>
            <p>{{ record.calculatedSalary }}</p>
            <p>{{ record.creditedAmount }}</p>
            <p>{{ record.remainingAmount }}</p>
            <p>{{ record.month }}/{{ record.year }}</p>
          </div>

          <div class="price-payment-status">
            <p>
              Payment Status:

              <strong :class="getPaymentStatusClass(record.paymentStatus)">
                {{ record.paymentStatus }}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="spinner-overlay">
      <div class="dots">
        <span style="--i: 1"></span>
        <span style="--i: 2"></span>
        <span style="--i: 3"></span>
        <span style="--i: 4"></span>
        <span style="--i: 5"></span>
        <span style="--i: 6"></span>
        <span style="--i: 7"></span>
        <span style="--i: 8"></span>
        <span style="--i: 9"></span>
        <span style="--i: 10"></span>
        <span style="--i: 11"></span>
        <span style="--i: 12"></span>
        <span style="--i: 13"></span>
        <span style="--i: 14"></span>
        <span style="--i: 15"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
// Spinner overlay
const spinnerOverlay = document.getElementsByClassName("spinner-overlay");
const showSpinner = () => {
  spinnerOverlay[0].style.display = "flex";
};
const hideSpinner = () => {
  spinnerOverlay[0].style.display = "none";
};

const purchaseHistory = ref([]);
const loading = ref(false);

import { useRoute } from "vue-router";
const router = useRoute();
const EmployeId = router.params.id;
console.log(EmployeId);

const fetchData = async () => {
  loading.value = true;
  try {
    showSpinner()
    const response = await axios.get(
      `https://j-k-managment-backend.onrender.com/Employe/EmployeseleryData?employeId=${EmployeId}`
    );
    purchaseHistory.value = response.data || [];
  } catch (error) {
    hideSpinner()
    console.error("Error fetching data:", error);
    purchaseHistory.value = [];
  } finally {
    hideSpinner()
    loading.value = false;
  }
};
function getPaymentStatusClass(status) {
  if (status === "Paid") return "status-paid";
  if (status === "Unpaid") return "status-unpaid";
  if (status === "Partially Paid") return "status-partially-paid";
  return "";
}
onMounted(fetchData);

// ["Paid", "Unpaid", "Partially Paid"],
</script>

<style scoped lang="scss">

.spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .spinner-overlay.active {
      display: flex;
    }
    .dots span {
      position: absolute;
      height: 10px;
      width: 10px;
      background: #fff;
      border-radius: 50%;
      transform: rotate(calc(var(--i) * (360deg / 15))) translateY(35px);
      animation: animate 1.5s linear infinite;
      animation-delay: calc(var(--i) * 0.1s);
      opacity: 0;
    }
    @keyframes animate {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
.status-paid {
  font-weight: 500;
  font-size: 18px;

  color: darkgreen;
}
.status-unpaid {
  font-weight: 500;
  font-size: 18px;
  color: red;
}
.status-partially-paid {
  font-weight: 500;
  font-size: 18px;
  color: yellow;
}
.purchase-history-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f9f9f9;

  .date-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: auto;
    width: 30rem;
    background-color: #ffffff;
    box-shadow: -4px 9px 34px 6px rgba(102, 45, 102, 1);
    border-radius: 15px;
    padding: 30px;
    box-sizing: border-box;
    text-align: center;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .date-overlay h2 {
    margin-bottom: 20px;
    font-size: 1.8rem;
    color: #663366;
  }

  .custom-date-wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 20px;
    width: 100%;
  }

  .custom-select {
    flex: 1;
    padding: 15px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    color: #333;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .custom-select:hover,
  .custom-select:focus {
    border-color: #663366;
    box-shadow: 0 0 5px rgba(102, 51, 102, 0.5);
  }

  .submit-btn {
    background-color: #663366;
    color: #fff;
    border: none;
    padding: 12px 25px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  .submit-btn:hover {
    background-color: #551a55;
    transform: translateY(-2px);
  }

  .submit-btn:active {
    transform: translateY(1px);
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    color: #333;
  }

  .close-btn:hover {
    color: #663366;
  }

  .close-btn:active {
    transform: scale(0.95);
  }
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
.success-btn {
  margin-left: 2rem;
  margin-top: 2rem;
  width: 95%;
  display: flex;
  justify-content: flex-end;

  .confirm-btn {
    display: flex;
    height: 3rem;
    width: 15%;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 40px;
    background: green;
    color: white;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
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
