<template>
  <div class="purchase-history-container">
    <!-- Header Section -->
    <header class="header">
      <h3 class="app-title">Selery Panel</h3>
    </header>

    <!-- Loading and Error Messages -->
    <div v-if="loading" class="loading-message">
      Loading purchase history...
    </div>
    <div
      v-else-if="!purchaseHistory || purchaseHistory.length === 0"
      class="no-history-message"
    >
      No purchase history found for the selected month and year.
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
            <p><strong>Employe Name:</strong> {{ record.employeeName }}</p>
            <p>
              <strong>Occupation:</strong>
              {{ record.occupation }}
            </p>
          </div>

          <div class="slid-design">
            <p>Gros Salary</p>
            <p>PresentDay</p>
            <p>Half Days</p>
            <p>Absent</p>
          </div>
          <div class="slidevalue">
            <p>₹{{ record.monthlySalary }}</p>
            <p>{{ record.presentDays }}</p>
            <p>{{ record.halfDays }}</p>
            <p>{{ record.absentDays }}</p>
          </div>

          <div class="price-payment-status">
            <p>
              <strong class="payment-color">Net Salary:</strong> ₹{{
                record.salary
              }}
            </p>
            <p v-if="record.paymentStatus === 'Partially Paid'">
              Credit Amount:
              <input
                type="number"
                v-model.number="record.creditAmount"
                @input="validateCreditAmount(record)"
                :max="record.salary"
                class="custom-select"
              />
            </p>
            <p v-else>crediated Payment: ₹{{ record.creditAmount ??0 }}</p>
            <p >Remaining Payment: ₹{{ record.remainingAmount??0 }}</p>

            <!-- <p>Remaining Payment: {{ record.salary - record.salary }}</p> -->
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
          <div v-if="activeRecordId === record.employeeId" class="success-btn">
            <button class="confirm-btn" @click="confirmPayment(record)">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Date Selection Modal -->
    <div v-if="dateoverlay" class="date-overlay-background">
      <div class="date-overlay">
        <button class="close-btn" @click="closeDateOverlay">
          <!-- Close Button SVG -->
        </button>
        <h2>Select a Month and Year</h2>
        <div class="custom-date-wrapper">
          <select v-model="selectedMonth" class="custom-select">
            <option disabled value="">Select Month</option>
            <option
              v-for="(month, index) in months"
              :key="index"
              :value="index + 1"
            >
              {{ month }}
            </option>
          </select>
          <select v-model="selectedYear" class="custom-select">
            <option disabled value="">Select Year</option>
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <button class="submit-btn" @click="submitDateSelection">Submit</button>
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
import { ref, computed } from "vue";
import axios from "axios";

const purchaseHistory = ref([]);
const loading = ref(false);
const dateoverlay = ref(true);
const activeRecordId = ref(null);
// Spinner overlay
const spinnerOverlay = document.getElementsByClassName("spinner-overlay");
const showSpinner = () => {
  spinnerOverlay[0].style.display = "flex";
};
const hideSpinner = () => {
  spinnerOverlay[0].style.display = "none";
};

const selectedMonth = ref("");
const selectedYear = ref("");
//   const paid = ref(true)

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = computed(() => Array.from({ length: 21 }, (_, i) => 2020 + i));

const fetchData = async () => {
  if (!selectedMonth.value || !selectedYear.value) return;

  loading.value = true;

  try {
    showSpinner()
    console.log(selectedMonth.value);
    console.log(selectedYear.value);
    const response = await axios.post(
      `https://j-k-managment-backend.onrender.com/Employe/EmployeSeleries`,
      { month: selectedMonth.value, year: selectedYear.value }
    );

    purchaseHistory.value = response.data || [];
    hideSpinner()
    
  } catch (error) {
    hideSpinner()
    console.error("Error fetching data:", error);
    purchaseHistory.value = [];
  } finally {
    hideSpinner()
    loading.value = false;
  }
};

const submitDateSelection = () => {
  if (selectedMonth.value && selectedYear.value) {
    dateoverlay.value = false;
    fetchData(); // Fetch data after closing the modal
  } else {
    alert("Please select both a month and a year.");
  }
};

// const updatePaymentStatus = async (record) => {
//   try {

//   const creditAmount = record.creditAmount || 0;
//   record.remainingAmount = Math.max(0, record.salary - creditAmount); // Ensure no negative values

//     await axios.put(
//       `http://localhost:3000/Sell/customerpayment/${record._id}`,
//       {
//         paymentStatus: record.paymentStatus,
//       }
//     );
//     alert(`Payment status updated to "${record.paymentStatus}".`);
//   } catch (error) {
//     console.error("Error updating payment status:", error);
//     alert("Failed to update payment status.");
//   }
// };
const validateCreditAmount = (record) => {
  // Ensure creditAmount is within the valid range
  if (record.creditAmount > record.salary) {
    record.creditAmount = record.salary; // Cap the value to the salary
  }
  record.remainingAmount = Math.max(
    0,
    record.salary - (record.creditAmount || 0)
  ); // Calculate remaining

  console.log("remainging amount is ", record.remainingAmount);
};

const handlePaymentStatusChange = (record) => {
  activeRecordId.value = record.employeeId;
  console.log("hello");
  if (record.paymentStatus === "Paid") {
    // Set credited amount to salary and remaining amount to 0
    record.creditAmount = record.salary;
    record.remainingAmount = 0;
    console.log("paid");
  } else if (record.paymentStatus === "Unpaid") {
    // Set credited amount to 0 and remaining amount to salary
    record.creditAmount = 0;
    record.remainingAmount = record.salary;
    console.log("unpaid");
  } else if (record.paymentStatus === "Partially Paid") {
    // Reset creditAmount to allow user input
    record.creditAmount = 0;
    record.remainingAmount = record.salary;
    console.log("partially paid");
    console.log("record creditAmount is", record.creditAmount);
    console.log("record remaining amout is", record.remainingAmount);
  }
};

const confirmPayment = async (record) => {
  showSpinner()
  try {
    console.log("Record data:", record);

    // Validate record ID
    if (!record.employeeId) {
      alert("Invalid record ID. Cannot update payment details.");
      return;
    }

    // Additional validations for partial payment
    if (record.paymentStatus === "Partially Paid") {
      if (!record.creditAmount || record.creditAmount <= 0) {
        alert("Please enter a valid credited amount.");
        return;
      }

      if (record.creditAmount > record.salary) {
        alert("Credit amount cannot exceed the salary.");
        return;
      }
    }

    console.log(`employe id is ${record.employeeId}`),
      console.log(`employe paymentsStatus is ${record.paymentStatus}`),
      console.log(`employe crediated is ${record.creditAmount}`),
      console.log(`employe remainig  is ${record.remainingAmount}`);
      console.log(`employe remainig  is ${record.presentDays}`);
      console.log(`employe remainig  is ${record.halfDays}`);
      console.log(`employe remainig  is ${record.absentDays}`);
    // Backend update
    const response = await axios.post(`https://j-k-managment-backend.onrender.com/Employe/selery`, {
      month: selectedMonth.value,
      year: selectedYear.value,
      EmployeId: record.employeeId,
      paymentStatus: record.paymentStatus,
      creditedAmount: record.creditAmount || 0,
      remainingAmount: record.remainingAmount || record.salary,
      totalPresentDays:record.presentDays,
      totalHalfDays:record.halfDays,
      calculatedSalary:record.salary



    });
hideSpinner()
    alert(`"Success" Payment details updated for "${record.employeeName}".`);
    console.log("Backend response:", response.data);
    activeRecordId.value = null
  } catch (error) {
    hideSpinner()
    console.error("Error confirming payment:", error);
    alert("Failed to update payment details.");
  }
};
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
