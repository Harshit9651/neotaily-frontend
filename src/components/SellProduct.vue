<template>
  <div class="order-form-container">
    <div class="form-header">
      <div class="form-group">
        <label for="customerName">Customer Name:</label>
        <input
          v-model="customerName"
          type="text"
          id="customerName"
          class="form-control"
          placeholder="Enter customer name"
        />
      </div>

      <div class="form-group">
        <label for="orderDate">Date:</label>
        <input
          v-model="orderDate"
          type="date"
          id="orderDate"
          class="form-control"
        />
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Weight</th>
            <th>Price per Unit</th>
            <th>Total Price</th>
            <th>
              <button type="button" class="btn btn-add" @click="addRow">
                Add Row
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>
              <select v-model="product.name" class="form-control">
                <option disabled value="">Select Product</option>
                <option value="Mustard Oil">Mustard Oil</option>
                <option value="Cutton Cake">Cutton Cake</option>
                <option value="Row of Cotton">Row of Cotton</option>
                <option value="Row of Mustard">Row of Mustard</option>
              </select>
            </td>
            <td>
              <input
                v-model.number="product.quantity"
                type="tel"
                class="form-control"
                @input="calculateTotalPrice(product)"
              />
            </td>
            <td>
              <input
                v-model="product.weight"
                type="text"
                class="form-control"
              />
            </td>
            <td>
              <input
                v-model.number="product.pricePerUnit"
                type="number"
                class="form-control"
                @input="calculateTotalPrice(product)"
              />
            </td>
            <td>{{ product.totalPrice.toFixed(2) }}</td>
            <td>
              <button
                type="button"
                class="btn btn-remove"
                @click="removeRow(index)"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="payment-section">
  <div class="form-group">
    <label for="paymentStatus">Payment Status:</label>
    <select v-model="paymentStatus" id="paymentStatus" class="form-control" @change="updatePayment">
      <option value="Paid">Paid</option>
      <option value="Unpaid">Unpaid</option>
      <option value="Partially Paid">Partially Paid</option>
    </select>
  </div>

  <div v-if="paymentStatus === 'Partially Paid'" class="form-group">
    <label for="paidAmount">Paid Amount:</label>
    <input
      v-model.number="paidAmount"
      type="number"
      id="paidAmount"
      class="form-control"
      @input="calculateRemainingAmount"
      placeholder="Enter paid amount"
    />
  </div>

  <div v-if="paymentStatus === 'Partially Paid'" class="form-group">
    <label for="remainingAmount">Remaining Amount:</label>
    <input
      v-model="remainingAmount"
      type="text"
      id="remainingAmount"
      class="form-control"
      readonly
    />
  </div>
</div>

    <div class="total-payment">
      <p><strong>Total Payment: </strong> {{ totalPayment.toFixed(2) }}</p>
    </div>

    <button type="button" class="btn btn-submit" @click="submitOrder">
      Submit Order
    </button>


    
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
import { useRouter } from "vue-router";
const router = useRouter();
const spinnerOverlay = document.getElementsByClassName("spinner-overlay");
const showSpinner = () => {
  spinnerOverlay[0].style.display = "flex";
};
const hideSpinner = () => {
  spinnerOverlay[0].style.display = "none";
};

const customerName = ref("");
const orderDate = ref("");
const products = ref([
  { name: "", quantity: 1, weight: "", pricePerUnit: 0, totalPrice: 0 },
]);
const paymentStatus = ref("Unpaid");
const paidAmount = ref(0);
const remainingAmount = ref(0);

const updatePayment = () => {
  if (paymentStatus.value === "Paid") {
    paidAmount.value = totalPayment.value;
    remainingAmount.value = 0;
  } else if (paymentStatus.value === "Unpaid") {
    paidAmount.value = 0;
    remainingAmount.value = totalPayment.value;
  } else if (paymentStatus.value === "Partially Paid") {
    calculateRemainingAmount();
  }
};

const calculateRemainingAmount = () => {
  if (paidAmount.value > totalPayment.value) {
    alert("Paid amount cannot exceed the total payment.");
    paidAmount.value = totalPayment.value;
  }
  remainingAmount.value = totalPayment.value - paidAmount.value;
};


const addRow = () => {
  products.value.push({
    name: "",
    quantity: 1,
    weight: "",
    pricePerUnit: 0,
    totalPrice: 0,
  });
}; 
const validateForm = () => {
  if (!customerName.value.trim()) {
    alert("Please enter the customer's name.");
    return false;
  }

  if (!orderDate.value) {
    alert("Please select a date.");
    return false;
  }

  for (const product of products.value) {
    if (!product.name) {
      alert("Please select a product name for each row.");
      return false;
    }

    if (!product.quantity || product.quantity <= 0) {
      alert("Please enter a valid quantity for each product.");
      return false;
    }

    if (!product.pricePerUnit || product.pricePerUnit <= 0) {
      alert("Please enter a valid price per unit for each product.");
      return false;
    }
    
    if (!product.weight || product.weight<=0 ) {
      alert("Please enter a valid weight each product.");
      return false;
    }
    
  }

  if (paymentStatus.value === "Partially Paid") {
    if (!paidAmount.value || paidAmount.value <= 0) {
      alert("Please enter a valid paid amount for partial payment.");
      return false;
    }
    if (paidAmount.value > totalPayment.value) {
      alert("Paid amount cannot exceed the total payment.");
      return false;
    }
  }

  return true;
};


const removeRow = (index) => {
  products.value.splice(index, 1);
};

const calculateTotalPrice = (product) => {
  product.totalPrice = product.quantity * product.pricePerUnit;
};

const totalPayment = computed(() => {
  return products.value.reduce((acc, product) => acc + product.totalPrice, 0);
});

const submitOrder = async () => {
  for (const product of products.value) {
    if (!product.name) {
      alert("Please select a product name for each row.");
      return;
    }
  }
  if (!validateForm()) {
    return; // Stop submission if validation fails
  }

  const orderData = {
    customerName: customerName.value,
    orderDate: orderDate.value,
    products: products.value,
    totalPayment: totalPayment.value.toFixed(2),
    paymentStatus: paymentStatus.value,
    paidAmount: paidAmount.value,
    remainingAmount: remainingAmount.value,
  };
  console.log(orderData);

  try {
    showSpinner()
    console.log("data goes");

    const response = await axios.post(
      "https://j-k-managment-backend.onrender.com/Sell/SellData",
      orderData
    );
   
    if (response.status === 200) {
 hideSpinner()
      router.push({
  name: "Bill",
  query: { orderData: JSON.stringify(orderData) },
});
      alert(`Order submitted successfully!`);
      console.log(orderData)
    } else {
      hideSpinner()
      alert("Failed to submit the order. Please try again.");
    }
  } catch (error) {
    hideSpinner()
    console.error("Error submitting order:", error);
    alert("Error occurred while submitting the order.");
  }
};
</script>

<style scoped>
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
* {
  box-sizing: border-box;
}


body {
  font-family: "Arial", sans-serif;
  color: #333;
}

.order-form-container {
  max-width: 900px;
  margin: auto;
  padding: 30px;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-header {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #d0d4db;
  border-radius: 5px;
}

.table-responsive {
  margin-top: 20px;
  overflow-x: auto;
}
.payment-section {
  margin-top: 20px;
}
.payment-section .form-group {
  margin-bottom: 15px;
}


.table {
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #e0e6ed;
  padding: 10px;
  text-align: center;
  font-size: 0.9rem;
}

thead th {
  background-color: #f0f4fa;
  color: #5a5a5a;
  font-weight: bold;
}

.btn {
  padding: 8px 12px;
  font-size: 0.9rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-add {
  background-color: #5cb85c;
  color: #fff;
}

.btn-remove {
  background-color: #d9534f;
  color: #fff;
}

.btn-submit {
  background-color: #0275d8;
  color: #fff;
  display: block;
  width: 100%;
  margin-top: 20px;
}

.total-payment {
  text-align: right;
  font-size: 1.2rem;
  margin-top: 10px;
  color: #333;
}

@media (max-width: 768px) {
  .form-header {
    flex-direction: column;
  }

  .form-group {
    width: 100%;
  }

  .table-responsive {
    margin-top: 15px;
  }
}
</style>