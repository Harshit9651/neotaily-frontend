<template>
  <div class="main-container">
    <div
      v-for="purchase in mandiPurchases"
      :key="purchase._id"
      class="bill-container"
    >
      <div class="bill-details">
        <p class="bill-no">Bill No: {{ purchase.receiptNumber }}</p>
        <hr />

        <div class="wrap-billing">
          <div class="billing">
            <span>Dealer Name</span>
            <p class="render">{{ purchase.DelarName }}</p>
          </div>

          <div class="billing">
            <span>Item Name</span>
            <p class="render">{{ purchase.itemType }}</p>
          </div>
        </div>

        <div class="wrap-billing-two">
          <div class="billing">
            <span>Dhami</span>
            <p class="render">{{ purchase.Dhami }}</p>
          </div>

          <div class="billing-pal">
            <span>Pal</span>
            <p class="render">{{ purchase.pal }}</p>
          </div>
        </div>

        <div class="pricing">
          <div class="wrap-billing-pricing">
            <div class="billing-names">
              <p>QTY</p>
              <p>WEIGHT</p>
              <p>UNIT PRICE</p>
            </div>
          </div>
          <div class="wrap-render">
            <p>{{ purchase.quantity }}</p>
            <p>{{ purchase.weight }}</p>
            <p>{{ purchase.pricePerUnit }}</p>
          </div>
          <hr />
        </div>

        <div class="pricing-details">
          <div class="wrap-details-name">
            <p>Total Payment</p>
            <p>Paid</p>
            <p>Amount Due</p>
            <p>Payment Status</p>
          </div>
          <div class="wrap-details">
            <p>{{ purchase.ttlprice }}</p>
            <p>{{ purchase.amountPaid }}</p>
            <!-- <p>{{ purchase.amountDue }}</p> -->
             <p>77</p>
            <p
              :class="[
                purchase.paymentStatus === 'Due' ? 'status-due' : '',
                purchase.paymentStatus === 'Partially Paid'
                  ? 'status-partially-paid'
                  : '',
                purchase.paymentStatus === 'Paid' ? 'status-paid' : '',
              ]"
            >
              {{ purchase.paymentStatus }}
            </p>
          </div>
        </div>
        <div class="editButton">
          <button class="edit-btn" @click="openEditPopup(purchase)">
            Edit
          </button>
        </div>
      </div>
    </div>

    <!-- Popup for Editing -->
    <div v-if="showPopup" class="popup-overlay" @click.self="showPopup = false">
      <div class="popup">
        <h3>Edit Payment Details</h3>
        <form @submit.prevent="saveChanges">
          <div class="popup-content">
            <label>Total Payment:</label>
            <input type="number" v-model="editableBill.totalPayment" />

            <label>Paid:</label>
            <input type="number" v-model="editableBill.paid" />

            <label>Amount Due:</label>
            <input type="number" v-model="editableBill.due" />
          </div>
          <button type="submit" class="save-btn">Save</button>
          <button type="button" class="close-btn" @click="showPopup = false">
            Close
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const mandiPurchases = ref([]);
const showPopup = ref(false);
const editableBill = ref({
  totalPayment: 0,
  paid: 0,
  due: 0,
});
const currentPurchase = ref(null);

async function allMandiPurchase() {
  try {
    const response = await axios.get(
      "https://j-k-managment-backend.onrender.com/purchase/AllMandiPurchase"
    );
    mandiPurchases.value = response.data;
    console.log(mandiPurchases.value);
  } catch (error) {
    console.log("Data not found:", error);
  }
}

onMounted(allMandiPurchase);

function openEditPopup(purchase) {
  currentPurchase.value = purchase;
  editableBill.value.totalPayment = purchase.ttlprice;
  editableBill.value.paid = purchase.amountPaid;
  editableBill.value.due = purchase.amountDue;
  showPopup.value = true;
}

function saveChanges() {
  if (currentPurchase.value) {
    currentPurchase.value.ttlprice = editableBill.value.totalPayment;
    currentPurchase.value.amountPaid = editableBill.value.paid;
    currentPurchase.value.amountDue = editableBill.value.due;
  }
  showPopup.value = false;
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: normal;
}

body {
  min-height: 100vh;
  color: var(--color-text);
  background: var(--color-background);
  transition: color 0.5s, background-color 0.5s;
  line-height: 1.6;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (max-width: 768px) {
  body {
    font-size: 14px; 
  }
}
.main-container {
    
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f9;
  overflow-y: auto;
  gap:20px;
 

  .bill-container {
   
    width: 450px;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
  
    &:hover {
      transform: translateY(-5px);
    }

    .bill-details {
   
      .bill-no {
        font-family: "Inter", sans-serif;
        font-weight: bold;
        font-size: 1.2em;
        color: #333;
        text-align: center;
      }

      hr {
        margin: 10px 0;
        border: 0;
        border-top: 1px solid #e0e0e0;
      }

      .wrap-billing,
      .wrap-billing-two {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        // border: 1px solid red;
        padding: 0px 30px 0 30px;

        .billing {
          display: flex;
          flex-direction: column;
          align-items: start;
          gap: 4px;

          span {
            color: #7d8ca3;
            font-weight: 500;
            font-size: 0.85em;
          }

          .render {
            font-family: "Inter", sans-serif;
            font-size: 1em;
            font-weight: 500;
            color: #4a4a4a;
          }
        }

        .billing-pal {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 0px 40px 0 30px;

          span {
            color: #7d8ca3;
            font-weight: 500;
            font-size: 0.85em;
          }

          .render {
            font-family: "Inter", sans-serif;
            font-size: 1em;
            font-weight: 500;
            color: #4a4a4a;
          }
        }
      }

      .pricing {
        margin-top: 20px;

        .wrap-billing-pricing {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #f7f7f9;
          padding: 8px;
          border-radius: 10px;
          font-size: 0.9em;
          color: #555;
          font-weight: 600;

          .billing-names {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 5px 0;

            p {
              flex: 1;
              text-align: center;
              margin: 0;
            }
          }
        }

        .wrap-render {
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-size: 1em;
          color: #333;
          font-weight: 500;
          margin: 10px 0;

          p {
            flex: 1;
            text-align: center;
            margin: 0;
          }
        }
      }

      .pricing-details {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        .wrap-details-name,
        .wrap-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-family: "Inter", sans-serif;
          font-weight: 600;
          font-size: 0.9em;
        }

        .wrap-details-name {
          color: #7d8ca3;
        }

        .wrap-details {
          color: #333;

          .status-paid {
            color: #fff;
            background-color: #27ae60;
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
          }

          .status-partially-paid {
            color: #fff;
            background-color: #f39c12;
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
          }

          .status-due {
            color: #fff;
            background-color: #e74c3c;
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
          }
        }
      }

      .editButton {
        margin-top: 30px;
        text-align: right;

        .edit-btn {
          width: 100px;
          background-color: #3498db;
          border: none;
          color: #fff;
          padding: 10px 20px;
          font-size: 1em;
          letter-spacing: 0.2px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: background-color 0.3s;
        }

        .edit-btn:hover {
          background-color: #2980b9;
        }
      }
    }
  }
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  width: 300px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;

  h3 {
    margin-bottom: 15px;
    color: #333;
  }

  .popup-content {
    margin-bottom: 20px;

    label {
      display: block;
      font-weight: 500;
      margin-bottom: 5px;
      color: #555;
    }

    input {
      width: 100%;
      padding: 8px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1em;
      color: #333;
    }
  }

  .save-btn {
    background-color: #3498db;
    border: none;
    color: #fff;
    padding: 10px 20px;
    font-size: 1em;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s;
    margin-right: 10px;
  }

  .save-btn:hover {
    background-color: #2980b9;
  }

  .close-btn {
    background-color: #e74c3c;
    border: none;
    color: #fff;
    padding: 10px 20px;
    font-size: 1em;
    cursor: pointer;
    border-radius: 8px;
    margin-left: 10px;
  }
}
</style>
