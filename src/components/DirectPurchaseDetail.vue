<template>
    <div>
    <div class="main-container">
        <div class="bill-container" v-for="bills in bill" :key="bills._id">
            <div class="bill-details">
                <p class="bill-no">Bill No: {{ bills. billNumber }}</p>
                <hr>

                <div class="wrap-billing">
                    <div class="billing">
                        <span>Dealer Name</span>
                        <p class="render">{{ bills. dealerName}}</p>
                    </div>

                    <div class="billing">
                        <span>Item Name</span>
                        <p class="render">{{ bills.itemType }}</p>
                    </div>
                </div>

                <div class="wrap-billing-two">
                    <div class="billing">
                        <span>+Add</span>
                        <p class="render">{{ bills.add }}</p>
                    </div>

                    <div class="billing-pal">
                        <span>-Less</span>
                        <p class="render">{{ bills.less }}</p>
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
                        <p>{{ bills.quantity }}</p>
                        <p>{{ bills.weight }}</p>
                        <p>{{ bills.pricePerUnit }}</p>
                    </div>
                    <hr>
                </div>

                <div class="pricing-details">
                    <div class="wrap-details-name">
                        <p>Total Payment</p>
                        <p>Paid</p>
                        <p>Amount Due</p>
                        <p>Payment Status</p>
                    </div>
                    <div class="wrap-details">
                        <p>{{ bills.ttlprice }}</p>
                        <p>{{ bills.amountPaid }}</p>
                        <p>{{ bills.DAmount}}</p>
                        <p :class="[ 
                            bills.paymentStatus === 'Due' ? 'status-due' : null, 
                            bills.paymentStatus === 'Partially Paid' ? 'status-partially-paid' : null, 
                            bills.paymentStatus === 'Paid' ? 'status-paid' : null 
                        ]">
                            {{ bills.paymentStatus}}
                        </p>
                    </div>
                </div>
                <div class="editButton">
                    <div class="date-text">
                        <p>Date:</p>
                        <p>{{ formatDate(bills.createdAt) }}</p>
                    </div>
                    <button id="editButton" class="edit-btn" @click="openEditPopup(bills)">Edit</button>
                </div>
            </div>
        </div>

               <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
    <div class="popup">
      <h3>Edit Payment Details</h3>
      <form @submit.prevent="saveChanges">
        <div class="popup-content">
          <!-- Total Payment - Read Only -->
          <label>Total Payment:</label>
          <input type="number" v-model="editableBill.totalPayment" readonly />

          <!-- Paid Amount -->
          <label>Paid:</label>
          <input type="tel" v-model="editableBill.paid" @input="updateDueAmount" />

          <!-- Amount Due (auto-calculated) -->
          <label>Amount Due:</label>
          <input type="tel" v-model="editableBill.DAmount" readonly />

          <!-- Payment Status Dropdown -->
          <label>Payment Status:</label>
          <select v-model="editableBill.paymentStatus">
            <option value="Paid">Paid</option>
            <option value="Partially Paid">Partially Paid</option>
            <option value="Due">Due</option>
          </select>
        </div>
        <div class="popup-footer">
          <button type="submit" class="save-btn">Save</button>
          <button type="button" class="close-btn" @click="closePopup">Close</button>
        </div>
      </form>
    </div>
  </div>
   </div>
   
     <div v-if="popup.show"  :class="['popupp', popup.type]">
      <button class="close-icon" @click="closePopupp">✖</button>
      <p>{{ popup.message }}</p>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Reactive variables
const bill = ref([]);
const showPopup = ref(false);
const editableBill = ref({
    id: "",
    totalPayment: 0,
    paid: 0,
    DAmount: 0,
    paymentStatus: "",
});
const popup = ref({
  show: false,
  message: "",
  type: "",
});

// Fetch data from the backend
async function fetchBillData() {
    try {
        const response = await axios.get("https://j-k-managment-backend.onrender.com/purchase/AllDirectPurchase");
        bill.value = response.data;
    } catch (error) {
        console.error("Error fetching bill data:", error);
    }
}

// Open the edit popup for a specific bill
function openEditPopup(selectedBill) {
    editableBill.value = {
        id: selectedBill._id,
        totalPayment: selectedBill.ttlprice,
        paid: selectedBill.amountPaid,
        DAmount: selectedBill.DAmount,
        paymentStatus: selectedBill.paymentStatus,
    };
    showPopup.value = true;
}

// Close the popup
function closePopup() {
    showPopup.value = false;
}


async function saveChanges() {
    try {
      
        console.log('hy bill id is ',editableBill.value.id)
        await axios.post(`https://j-k-managment-backend.onrender.com/purchase/updateDirectPurchasedata`, editableBill.value);
        // Update the local data
        const updatedBill = bill.value.find((b) => b._id === editableBill.value.id);
        if (updatedBill) {
            updatedBill.ttlprice = editableBill.value.totalPayment;
            updatedBill.amountPaid = editableBill.value.paid;
            updatedBill.dueamount = editableBill.value.due;
            updatedBill.paymentStatus = editableBill.value.paymentStatus;
        }
        showPopup.value=false;
        showPopuppp("Data updated successfully!", "success");
    } catch (error) {
        showPopuppp("Please correct the errors in the form.", "error");
        console.error("Error saving bill data:", error);
    }
}

// Automatically update the Amount Due
function updateDueAmount() {
    editableBill.value.DAmount = editableBill.value.totalPayment - editableBill.value.paid;
}

// Format date to "YYYY-MM-DD"
function formatDate(dateString) {
    return new Date(dateString).toISOString().split("T")[0];
}

onMounted(fetchBillData);

const showPopuppp = (message, type) => {
  popup.value.show = true;
  popup.value.message = message;
  popup.value.type = type;
};

const closePopupp = () => {
  popup.value.show = false;
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

/* Add your styles here */
.status-paid {
    color: darkgreen;
}
.status-due {
    color: red;
}
.status-partially-paid {
    color: orange;
}
/* Additional styles */
.popupp {
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

.popupp.success {
  background-color: #4caf50;
}

.popupp.error {
  background-color: #f44336;
}

.popupp .close-icon {
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

.popupp p {
  margin: 1em 0;
}
</style>


<style lang="scss">
.main-container {
    margin-top:2rem;
    width: 100%;
    height: 100vh;
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    background-color: #ffffff;

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
                font-family: 'Inter', sans-serif;
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
                        font-family: 'Inter', sans-serif;
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
                        font-family: 'Inter', sans-serif;
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
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                    font-size: 0.9em;
                }

                .wrap-details-name {
                    color: #7d8ca3;
                }

                .wrap-details {
                    color: #333;

                    .status-paid {
                        color: #27ae60;
                        font-weight: bold;
                    }

                    .status-partially-paid {
                        color: #f39c12;
                        font-weight: bold;
                    }

                    .status-due {
                        color: #e74c3c;
                        font-weight: bold;
                    }
                }
            }

            .editButton {
                margin-top: 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .date-text {
                    display: flex;
                    gap: 8px;

                    p:nth-of-type(1) {
                        font-family: 'Inter', sans-serif;
                        font-weight: 600;
                        font-size: 0.9em;
                        color: #7d8ca3;
                    }

                    p:nth-of-type(2) {
                        font-weight: 600;
                        font-size: 0.9em;
                        color: #4a90e2;
                    }
                }


            }

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


// .popup-overlay {
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: rgba(0, 0, 0, 0.5);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000;
// }

// .popup {
//     width: 300px;
//     background-color: #fff;
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//     text-align: center;

//     h3 {
//         margin-bottom: 15px;
//         color: #333;
//     }

//     .popup-content {
//         margin-bottom: 20px;

//         label {
//             display: block;
//             font-weight: 500;
//             margin-bottom: 5px;
//             color: #555;
//         }

//         input {
//             width: 100%;
//             padding: 8px;
//             margin-bottom: 15px;
//             border: 1px solid #ccc;
//             border-radius: 5px;
//             font-size: 1em;
//             color: #333;
//         }
//     }

//     .save-btn {
//         background-color: #3498db;
//         border: none;
//         color: #fff;
//         padding: 10px 20px;
//         font-size: 1em;
//         cursor: pointer;
//         border-radius: 8px;
//         transition: background-color 0.3s;
//         margin-right: 10px;
//     }

//     .save-btn:hover {
//         background-color: #2980b9;
//     }

//     .close-btn {
//         background-color: #e74c3c;
//         border: none;
//         color: #fff;
//         padding: 10px 20px;
//         font-size: 1em;
//         cursor: pointer;
//         border-radius: 8px;
//         margin-left: 10px;
//     }

// }

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

/* Popup Box */
.popup {
  background-color: #fff;
  width: 350px;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: popupIn 0.4s ease-out;
}

/* Popup Title */
.popup h3 {
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #333;
  font-weight: 600;
  text-transform: uppercase;
}

/* Popup Content */
.popup-content {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: #555;
}

input,
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1em;
  color: #333;
  transition: all 0.3s ease;
}

input:focus,
select:focus {
  border-color: #3498db;
  outline: none;
}

/* Popup Footer */
.popup-footer {
  display: flex;
  justify-content: space-between;
}

/* Buttons Styling */
.save-btn,
.close-btn {
  padding: 10px 20px;
  font-size: 1.1em;
  cursor: pointer;
  border-radius: 6px;
  width: 48%;
  transition: all 0.3s ease;
}

.save-btn {
  background-color: #3498db;
  border: none;
  color: #fff;
}

.save-btn:hover {
  background-color: #2980b9;
}

.close-btn {
  background-color: #e74c3c;
  border: none;
  color: #fff;
}

.close-btn:hover {
  background-color: #c0392b;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes popupIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>