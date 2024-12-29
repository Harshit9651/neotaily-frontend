<template>
  <div class="main-wrapper">

    <div class="emergency-alert">
      ⚠️ This panel is for emergency use only. Data deleted through this panel cannot be recovered.
    </div>

    <div class="factory-reset">
      <button @click="showConfirmationOverlay('purchase')">Reset Purchase Data</button>
      <button @click="showConfirmationOverlay('khata')">Reset Khata Data</button>
      <button @click="showConfirmationOverlay('suspense')">Reset Suspense Data</button>
      <button @click="showConfirmationOverlay('factory')" id="reset-all-data ">Reset Factory Data</button>
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

    <!-- Confirmation Overlay -->
    <div v-if="showConfirmation" class="confirmation-overlay">
      <div class="overlay-content">
        <h2>Are you sure?</h2>
        <p>{{ confirmationMessage }}</p>
        <div class="button-group">
          <button class="btn btn-success" @click="closeConfirmationOverlay()">No</button>
          <button class="btn btn-danger" @click="resetData()">Yes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// Spinner overlay
const spinnerOverlay = document.getElementsByClassName("spinner-overlay");
const showSpinner = () => {
  spinnerOverlay[0].style.display = "flex";
};
const hideSpinner = () => {
  spinnerOverlay[0].style.display = "none";
};

// State variables
const showConfirmation = ref(false);
const confirmationMessage = ref("");
const resetType = ref("");

// Show confirmation overlay with specific message
const showConfirmationOverlay = (type) => {
  resetType.value = type;

  switch (type) {
    case "purchase":
      confirmationMessage.value =
        "This action will delete all purchase data permanently. This cannot be undone. Do you want to continue?";
      break;
    case "khata":
      confirmationMessage.value =
        "This action will delete all khata data permanently. This cannot be undone. Do you want to continue?";
      break;
    case "suspense":
      confirmationMessage.value =
        "This action will delete all suspense data permanently. This cannot be undone. Do you want to continue?";
      break;

    case "factory":
      confirmationMessage.value =
        "This action will delete all factory data permanently. This cannot be undone. Do you want to continue?";
      break;
    default:
      confirmationMessage.value = "Unknown action.";
  }

  showConfirmation.value = true;
};

// Close confirmation overlay
const closeConfirmationOverlay = () => {
  showConfirmation.value = false;
};

// Reset data based on selected type
const resetData = async () => {
  try {
    showSpinner();

    let endpoint = "";
    switch (resetType.value) {
      case "purchase":
        endpoint = "https://j-k-managment-backend.onrender.com/Admin/ResetPurchaseData";
        break;
      case "khata":
        endpoint = "https://j-k-managment-backend.onrender.com/Admin/ResetKhataData";
        break;
      case "suspense":
        endpoint = "https://j-k-managment-backend.onrender.com/Admin/ResetSuspenseData";
        break;
   
      case "factory":
        endpoint = "https://j-k-managment-backend.onrender.com/Admin/ResetFactoryData";
        break;
    }

    await axios.delete(endpoint, {
      headers: {
        Authorization: "Bearer your-auth-token",
      },
    });

    alert(`${resetType.value} data reset successfully!`);
  } catch (error) {
    console.error(`Error resetting ${resetType.value} data:`, error);
    alert(`Failed to reset ${resetType.value} data.`);
  } finally {
    hideSpinner();
    closeConfirmationOverlay();
  }
};
</script>
  
  <style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
  @import "@fortawesome/fontawesome-free/css/all.css";
  body {
    margin: 0;
    padding: 0;
  }
  
  html {
    margin: 0;
    padding: 0;
  }
  
  .main-wrapper {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    background-color: white;
  
    .navbar {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 3rem;
      // background: #7343ea;
      background-color: #ccc;
      // background-color: gray;
      box-shadow: 0px 4px 20px 0px #0000001f;
  
      .logo {
        font-weight: 600;
        font-size: 18px;
        color: white;
        cursor: pointer;
      }
  
      .logout {
        cursor: pointer;
        font-weight: 500;
        font-size: 18px;
        color: rgb(0, 0, 0);
        cursor: pointer;
  
        i {
          color: rgb(0, 0, 0);
        }
      }
    }
  

    .factory-reset{
      margin-top: 5rem;
        margin:1rem;
        margin-top: 2rem;
        display: flex;
       justify-content: space-around;
       align-items: center;
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          all: unset;
        //   width: 6.5rem;
          height: 2rem;
          border-radius: 4.5rem;
          background: #be1e0f;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          text-align: center;
          padding-left:  1rem;
          padding-right: 1rem;
          padding-top: .5rem;
          padding-bottom: .5rem;
        }


        #reset-all-data {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% {
    background: #be1e0f;
    color: white;
  }
  50% {
    background: rgb(232, 232, 10);
    color: rgb(255, 255, 255);
  }
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
    .image-overlay-container {
      position: fixed;
      top: 5%;
      left: 5%;
      height: 90vh;
      width: 90%;
      background-color: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      display: fixed;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
  
    .image-overlay-container>div{
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
  
    }
  
    .overlay-header {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 10px;
      position: absolute;
      top: 0;
      right: 0;
    }
  
    .close-icon {
      font-size: 24px;
      cursor: pointer;
      color: black;
      border-radius: 50%;
      padding: 5px;
      margin: 10px;
    }
  
    .image-container {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .image-container img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      
    }
  }







.confirmation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.overlay-content {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.overlay-content h2 {
  margin-bottom: 1rem;
}

.overlay-content p {
  margin-bottom: 1.5rem;
}

.button-group {
  display: flex;
  justify-content: space-around;
}

.btn {
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}


.emergency-alert {
  // position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f44336;
  color: white;
  text-align: center;
  padding: 0.5rem;
  font-weight: bold;
  // z-index: 1000;

  
}

.password-overlay {
  // position: fixed;
  // top: 0;
  // left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  // z-index: 2000;
}

.password-overlay .overlay-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.password-overlay .button-group {
  margin-top: 1rem;
}

.password-overlay input[type="password"] {
  width: 80%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}


.reset-button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  border: none;
  cursor: pointer;
  animation: blink 1s infinite; /* This will make the button blink */
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
@keyframes blink {
  0% {
    background-color: red;
  }
  50% {
    background-color: lightcoral;
  }
  100% {
    background-color: red;
  }
}

.reset-button:hover {
  background-color: lightcoral; /* This makes the button slightly lighter when hovered */
}


  </style>
  