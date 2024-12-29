<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit" class="purchase-form">
      <div class="icon">
        <img src="../assets/image-sels.png" alt="" />
        <h2>Broker Purchase</h2>
      </div>
      <div class="hr-tag"><hr /></div>
      <div class="form-row">
        <div class="form-group">
          <label for="brokerName">Broker Name</label>
          <input
            v-model="form.brokerName"
            @input="validateField('brokerName')"
            type="text"
            id="brokerName"
          />
          <span v-if="errors.brokerName" class="error-message">{{
            errors.brokerName
          }}</span>
        </div>
        <div class="form-group">
          <label for="brokeragePercentage">Brokerage Percentage (%)</label>
          <input
            v-model.number="form.brokeragePercentage"
            @input="calculateTotalPayment"
            type="tel"
            id="brokeragePercentage"
            min="0"
          />
          <span v-if="errors.brokeragePercentage" class="error-message">{{
            errors.brokeragePercentage
          }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="itemType">Item Type</label>
          <select
            v-model="form.itemType"
            @change="validateField('itemType')"
            id="itemType"
          >
            <option disabled value="">Select an item</option>
            <option value="Cotton">Cotton</option>
            <option value="Mustard Oil">Mustard Oil</option>
            <option value="Other">Other</option>
          </select>
          <span v-if="errors.itemType" class="error-message">{{
            errors.itemType
          }}</span>
        </div>
        <div class="form-group">
          <label for="weight">Weight</label>
          <input
            v-model="form.weight"
            @input="calculateTotalPayment"
            type="tel"
            id="weight"
            min="0"
          />
          <span v-if="errors.weight" class="error-message">{{
            errors.weight
          }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="quantity">Quantity</label>
          <input
            v-model="form.quantity"
            @input="calculateTotalPayment"
            type="tel"
            id="quantity"
            min="1"
          />
          <span v-if="errors.quantity" class="error-message">{{
            errors.quantity
          }}</span>
        </div>
        <div class="form-group">
          <label for="pricePerUnit">Price per Unit</label>
          <input
            v-model="form.pricePerUnit"
            @input="calculateTotalPayment"
            type="tel"
            id="pricePerUnit"
            min="0"
          />
          <span v-if="errors.pricePerUnit" class="error-message">{{
            errors.pricePerUnit
          }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="purchaseDate">Purchase Date</label>
          <input
            v-model="form.purchaseDate"
            @change="validateField('purchaseDate')"
            type="date"
            id="purchaseDate"
          />
          <span v-if="errors.purchaseDate" class="error-message">{{
            errors.purchaseDate
          }}</span>
        </div>
        <div class="form-group">
          <label for="paymentStatus">Payment Status</label>
          <select v-model="form.paymentStatus" id="paymentStatus">
            <option disabled value="">Select Status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Pending">Partially Paid</option> 
          </select>
          <span v-if="errors.paymentStatus" class="error-message">{{
            errors.paymentStatus
          }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="less">Less</label>
          <input
            v-model.number="form.less"
            @input="calculateTotalPayment"
            type="tel"
            id="less"
            min="0"
          />
        </div>
        <div class="form-group">
          <label for="add">Add</label>
          <input
            v-model.number="form.add"
            @input="calculateTotalPayment"
            type="tel"
            id="add"
            min="0"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label id="paid-amount" for="paidAmount">Paid Amount</label>
          <input
            v-model.number="form.paidAmount"
            @input="calculateDueAmount"
            type="tel"
            id="paidAmount"
            min="0"
            :max="form.totalPayment"
          />
          <span v-if="errors.paidAmount" class="error-message">{{
            errors.paidAmount
          }}</span>
        </div>
        <div class="form-group">
          <label id="due-amount" for="dueAmount">Due Amount</label>
          <input v-model="form.dueAmount" type="tel" id="dueAmount" readonly />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group payment">
          <label for="totalPayment">Total Payment</label>
          <input
            v-model="form.totalPayment"
            type="tel"
            id="totalPayment"
            readonly
            :class="{ 'has-value': form.totalPayment > 0 }"
          />
        </div>
      </div>

      <button type="submit" class="save-button">Save Data</button>
    </form>

    <!-- Success/Error Popup -->
    <div v-if="popup.show" :class="['popup', popup.type]">
      <button class="close-icon" @click="closePopup">✖</button>
      <p>{{ popup.message }}</p>
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
import { ref } from "vue";
import axios from "axios";
const spinnerOverlay = document.getElementsByClassName("spinner-overlay");
const showSpinner = () => {
  spinnerOverlay[0].style.display = "flex";
};
const hideSpinner = () => {
  spinnerOverlay[0].style.display = "none";
};

const form = ref({
  brokerName: "",
  brokeragePercentage: 0,
  itemType: "",
  weight: "",
  quantity: 0,
  pricePerUnit: "",
  purchaseDate: "",
  totalPayment: 0,
  paymentStatus: "",
  less: 0,
  add: 0,
  paidAmount: 0,
  dueAmount: 0,
});

const errors = ref({
  brokerName: null,
  brokeragePercentage: null,
  itemType: null,
  weight: null,
  quantity: null,
  pricePerUnit: null,
  purchaseDate: null,
  paymentStatus: null,
});

const popup = ref({
  show: false,
  message: "",
  type: "",
});
const validateField = (field) => {
  if (form.value[field] === "" || form.value[field] === null) {
    errors.value[field] = `${field.replace(/([A-Z])/g, " $1")} is required.`;
  } else {
    errors.value[field] = null;
  }
};

const calculateTotalPayment = () => {
  const { weight, pricePerUnit, brokeragePercentage, less, add } = form.value;

  let baseTotal = weight * pricePerUnit;
  let brokerageAmount = (baseTotal * brokeragePercentage) / 100;

  form.value.totalPayment = baseTotal + brokerageAmount + add - less;
  form.value.paidAmount = form.value.totalPayment;
  calculateDueAmount();
};

const handleSubmit = async () => {
  Object.keys(form.value).forEach(validateField);
  showSpinner()

  if (Object.values(errors.value).every((error) => error === null)) {
    try {
      const response = await axios.post(
        "https://j-k-managment-backend.onrender.com/purchase/Brocker-Purchase",
        form.value
      );
      showPopup(" brocker purchse data  Successfully!", "success");
      console.log("Form Submitted:", response.data);
      form.value = {
        brokerName: "",
        brokeragePercentage: 0,
        itemType: "",
        weight: "",
        quantity: 0,
        pricePerUnit: "",
        purchaseDate: "",
        totalPayment: 0,
        paymentStatus: "",
        less: 0,
        add: 0,
        paidAmount: 0,
        dueAmount: 0,
      };
      hideSpinner()
    } catch (error) {
      hideSpinner()
      showPopup("Please correct the errors in the form.", "error");
      console.error("Error submitting form:", error);
    }
  } else {
    hideSpinner()
    console.log("Form has errors");
  }
};
const calculateDueAmount = () => {
  const { totalPayment, paidAmount } = form.value;

  if (paidAmount > totalPayment) {
    errors.value.paidAmount = "Paid amount cannot exceed total payment.";
  } else {
    errors.value.paidAmount = null;
  }

  form.value.dueAmount = totalPayment - paidAmount;
};
const showPopup = (message, type) => {
  popup.value.show = true;
  popup.value.message = message;
  popup.value.type = type;
};

const closePopup = () => {
  popup.value.show = false;
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
.popup {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #333;
  color: #fff;
  padding: 2em;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  text-align: center;
  z-index: 1000;
  width: 80%;
  max-width: 400px;
  font-size: 1.2em;
}

.popup.success {
  background-color: #4caf50;
}

.popup.error {
  background-color: #f44336;
}

.popup .close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  color: #fff;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
}

.popup p {
  margin: 1em 0;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #ffffff;
}

.purchase-form {
  // margin-top: 10%;
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 700px;
}
.icon {
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;

  img {
    height: 5rem;
    width: 5rem;
  }
}
.hr-tag {
  margin-bottom: 2rem;
}
.form-row {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: #333;
}

.form-group input,
.form-group select {
  padding: 0.85rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.95rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #4d8aff;
}

.payment input {
  color: white;
  font-size: 1rem;
  background: linear-gradient(
    277.64deg,
    #4d8aff 8.32%,
    #f53f9e 51.79%,
    #ff9051 96.13%
  );
  transition: background-color 0.3s ease;
}

.payment input.has-value {
  background-color: #1ee817;
}

.payment input:focus {
  background-color: #d8db11e1;
}

.payment input.has-value:focus {
  background-color: #d8db11e1;
}

.paymet select:focus {
  background-color: #bf17d8e1;
}

.error-message {
  color: #ff5b5b;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.save-button {
  display: block;
  width: 390px;
  height: 48px;
  padding: 16px 40px;
  margin: 0 auto;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 53px;
  background: linear-gradient(
    277.64deg,
    #4d8aff 8.32%,
    #f53f9e 51.79%,
    #ff9051 96.13%
  );
  cursor: pointer;
  transition: opacity 0.3s;
}

.save-button:hover {
  opacity: 0.9;
}
#due-amount {
  color: rgb(226, 14, 14);
  font-size: 15px;
  font-weight: 600;
}
#paid-amount {
  color: rgb(63, 200, 32);
  font-size: 15px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .form-container {
    margin-top: 3rem;
    background-color: #ffffff;
    padding: 1rem;
    width: 90%;
    max-width: 400px;
  }

  .purchase-form {
    margin-top: 2rem;
    height: auto;
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: 10px;
  }

  .form-row {
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    width: 100%;
  }

  input[type="text"],
  input[type="number"],
  input[type="date"],
  select {
    font-size: 1rem;
    padding: 0.5rem;
  }

  .save-button {
    padding: 10px 15px;
    font-size: 0.95rem;
    width: 100%;
    margin-top: 1rem;
  }

  .error-message {
    font-size: 0.85rem;
  }
}
</style>
