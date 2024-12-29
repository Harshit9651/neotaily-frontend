<template>
    <div class="main-div">
    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="purchase-form">
        <div class="icon">
          <h2>Add Your Suspense Data</h2>
        </div>
        <div class="hr-tag"><hr /></div>
  
        <div class="form-row">
          <div class="form-group">
            <label for="itemType">Suspense Type</label>
            <select
              v-model="form.itemType"
              @change="validateField('itemType')"
              id="itemType"
            >
              <option disabled value="">Select Type</option>
              <option value="Repair">Repair</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Replacement">Replacement</option>
              <option value="Utility">Utility</option>
              <option value="Other">Other</option>
            </select>
            <span v-if="errors.itemType" class="error-message">{{ errors.itemType }}</span>
          </div>
          <div class="form-group">
            <label for="suspenseDate">Suspense Date</label>
            <input
              v-model="form.suspenseDate"
              @input="validateField('suspenseDate')"
              type="date"
              id="suspenseDate"
            />
            <span v-if="errors.suspenseDate" class="error-message">{{ errors.suspenseDate }}</span>
          </div>
        </div>
  
        <div class="form-row">
          <div class="form-group">
            <label for="amount">Total Amount</label>
            <input
              v-model="form.amount"
              @input="validateField('amount')"
              type="tel"
              id="amount"
              min="0"
            />
            <span v-if="errors.amount" class="error-message">{{ errors.amount }}</span>
          </div>
          <div class="form-group">
            <label for="description">Description (Reason)</label>
            <textarea
              v-model="form.description"
              @input="validateField('description')"
              id="description"
            ></textarea>
            <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
          </div>
        </div>
  
        <button type="submit" class="save-button">Save Suspance Data</button>
      </form>
  
      <!-- Success/Error Popup -->
      <div v-if="popup.show" :class="['popup', popup.type]">
        <button class="close-icon" @click="closePopup">✖</button>
        <p>{{ popup.message }}</p>
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
    itemType: "",
    suspenseDate: "",
    amount: "",
    description: "",
  });
  
  const errors = ref({
    itemType: null,
    suspenseDate: null,
    amount: null,
    description: null,
  });
  
  const popup = ref({
    show: false,
    message: "",
    type: "",
  });
  
  const validateField = (field) => {
    if (!form.value[field]) {
      errors.value[field] = `${field.replace(/([A-Z])/g, " $1")} is required.`;
    } else {
      errors.value[field] = null;
    }
  };
  
  const handleSubmit = async () => {
    showSpinner()
    Object.keys(form.value).forEach(validateField);
  
    if (Object.values(errors.value).every((error) => error === null)) {
      try {
        const response = await axios.post(
          "https://j-k-managment-backend.onrender.com/purchase/SuspanceData", 
          form.value
        );
        hideSpinner()
        showPopup("Suspense data submitted successfully!", "success");
        console.log("Form Submitted:", response.data);
        form.value = {
          itemType: "",
          suspenseDate: "",
          amount: "",
          description: "",
        };
      } catch (error) {
        showPopup("Error submitting form. Please try again.", "error");
        console.error("Error:", error);
        hideSpinner()
      }
    } else {
      console.log("Form has errors", errors.value);
    }
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
    height: 100vh;
    background-color: #ffffff;
  }
  
  .purchase-form {
    margin-top: 10%;
    background-color: #ffffff;
    padding: 2.5rem;
    border-radius: 10px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
    width: 100%;
    max-width: 700px;
  }
  .main-div{
    display: flex;
    justify-content: center;
    align-items: center;
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
  .form-group textarea {
  padding: 0.85rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.95rem;
  transition: border-color 0.3s ease;
  resize: none; /* Prevent resizing if not needed */
  min-height: 120px; /* Adjust height as needed */
}

.form-group textarea:focus {
  border-color: #4d8aff;
  outline: none;
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
  </style>
  