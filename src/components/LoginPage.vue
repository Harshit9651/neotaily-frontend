<template>
  <div class="content-wrapper">
    <div class="partation-warpper login-with-email">
      <div class="content-container">
        <div class="container page2" id="login-email">
          <div class="login-wrapper">
            <div class="login">Log in</div>
            <div class="paragraph">
              Just Login to access <span>ShriVinayk.in</span>
            </div>
          </div>
          <div class="login-options">
            <div class="email-input with">
              <input v-model="email" type="email" placeholder="Email" />
              <label>Email</label>
            </div>
            <div class="password-input with">
              <input
                v-model="password"
                :type="passwordFieldType"
                placeholder="Password"
                class="password-field"
              />
              <label>Password</label>
              <!-- <div class="hide" @click="togglePasswordVisibility">
                <img
                  :src="passwordFieldType === 'password' ? '@/assets/hideicon.svg' : '@/assets/showicon.svg'"
               
                />
              </div> -->
            </div>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            <button class="login-button" @click="login">Login</button>
          </div>
        </div>
      </div>
      <div class="image-container">
        <img src="../assets/loginpageimage.svg" alt="Login Page Illustration" />
      </div>
    </div>

    <div v-if="showPopup" class="error-popup">
      <div class="popup-content">
        <p>{{ popupMessage }}</p>
        <button @click="closePopup">Close</button>
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

<!-- <script setup>
import { ref } from "vue";
import axios from "axios";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const showPopup = ref(false);
const popupMessage = ref("");

const login = async () => {
  try {

    errorMessage.value = "";
    showPopup.value = false;

    if (!email.value || !password.value) {
      errorMessage.value = "Email and Password are required.";
      return;
    }

    const response = await axios.post("http://localhost:3000/Auth/Login", {
      email: email.value,
      password: password.value,
    });

  
    const token = response.data.token;
    localStorage.setItem("authToken", token);
    console.log("bhn ki chut ma ki bhosdi maru char bar:",localStorage.getItem("authToken"))


    console.log("Login successful:", response.data.message);
    popupMessage.value = "Login successful!";
    showPopup.value = true;

   
    setTimeout(() => {
      window.location.href = "/"; 
    }, 1000);
  } catch (error) {
    // Handle backend errors
    if (error.response && error.response.data) {
      popupMessage.value = error.response.data.message || "An error occurred.";
    } else {
      popupMessage.value = "Network error or server unavailable.";
    }
    showPopup.value = true;
  }
};


const closePopup = () => {
  showPopup.value = false;
};
</script>
 -->
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

 const email = ref("");
 const password = ref("");
 const errorMessage = ref("");
 const showPopup = ref(false);
 const popupMessage = ref("");
 const passwordFieldType = ref("password");
 
//  const togglePasswordVisibility = () => {
//    passwordFieldType.value = passwordFieldType.value === "password" ? "text" : "password";
//  };
 
 const login = async () => {
   try {
    showSpinner()
     errorMessage.value = "";
     showPopup.value = false;
 
     if (!email.value || !password.value) {
       errorMessage.value = "Email and Password are required.";
       return;
     }
 
     const response = await axios.post("https://j-k-managment-backend.onrender.com/Auth/Login", {
       email: email.value,
       password: password.value,
     });
 
     const token = response.data.token;
     localStorage.setItem("authToken", token);
 
     console.log("Login successful:", response.data.message);
     popupMessage.value = "Login successful!";
     showPopup.value = true;
 
     setTimeout(() => {
       window.location.href = "/";
     }, 1000);
     hideSpinner()
   } catch (error) {
    hideSpinner()
     if (error.response && error.response.data) {
       popupMessage.value = error.response.data.message || "An error occurred.";
     } else {
      hideSpinner()
       popupMessage.value = "Network error or server unavailable.";
     }
     showPopup.value = true;
   }
 };
 
 const closePopup = () => {
   showPopup.value = false;
 };
 </script>

<style lang="scss" scoped>
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
.error-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.popup-content {
  background: linear-gradient(135deg, #007bff, #0056b3);
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  transform: scale(1);
  animation: popup-animation 0.3s ease-out;
}

.popup-content p {
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
}

.popup-content button {
  padding: 10px 25px;
  background: white;
  color: #007bff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s, transform 0.2s;
}

.popup-content button:hover {
  background: #f2f2f2;
  transform: scale(1.05);
}

@keyframes popup-animation {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.content-wrapper {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  .heading {
    overflow: hidden;
    padding-left: 5%;
    display: flex;
    align-items: center;
    width: 100%;
    height: 4.25rem;
    box-shadow: 0px 4px 20px 0px #0000001f;
    background: white;
    box-sizing: border-box;
    gap: 1rem;
    #mobile-back-button {
      display: none;
    }
  }

  .partation-warpper {
    padding: 2rem;
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - 7rem);
    box-sizing: border-box;
    gap: 2rem;
    .content-container,
    .image-container {
      flex-grow: 1;
      flex-basis: calc(50% - 1rem);
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: calc(50% - 1rem);
    }

    .content-container {
      padding: 0px;
      .container {
        display: flex !important;
        flex-direction: column !important;
        justify-content: center;
        gap: 3rem;

        // height: calc(100% - 10rem);
        width: 70%;

        .login-wrapper {
          display: flex;
          align-items: center;
          flex-direction: column;
          width: 100%;
          // height: 5rem;
          gap: 1rem;

          .login {
            font-family: Inter;
            font-size: 2.25rem;
            font-weight: 600;
            line-height: 46.8px;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            color: #1c1b1c;
            // margin-bottom: 1rem;
          }
          .forgot-password {
            font-family: Inter;
            font-size: 2.25rem;
            font-weight: 600;
            line-height: 2.295rem;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            color: #1c1b1c;
          }
          .paragraph {
            width: 100%;
            font-family: Inter;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.4625rem;
            text-align: center;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            color: #484646;
            display: flex;
            display: flex;
            justify-content: center;
            // flex-direction: column;
            gap: .3rem;

            span {
              font-family: Inter;
              font-size: 0.9375rem;
              font-weight: 600;
              line-height: 1.4625rem;
              text-align: left;
              text-decoration-line: underline;
              text-decoration-style: solid;
              text-underline-position: from-font;
              text-decoration-skip-ink: none;
              color: #7343ea;
            }
            .footer {
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }

          .forgot-paragraph {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .forgot {
        }
        .login-options {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;

          .with {
            display: flex;
            justify-content: center;
            // gap: 0.4rem;
            align-items: center;

            border: 1px solid black;
            border-radius: 3.125rem;
            font-family: Inter;
            font-size: 1rem;
            font-weight: 400;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            color: #313030;
            overflow: visible;
            padding: .5rem 1rem;
          }

          .with {
            display: flex;
            justify-content: center;
            align-items: center;

            border: 1px solid #c9c6c5;
            border-radius: 3.125rem;
            padding: .7rem 1rem;
          }
          .with input {
            border: none;
            outline: none;
            flex: 1;
            font-size: 1rem;
            color: #313030;
            background: transparent;
          }
          .otp-wrapper {
            height: 100%;
            width: 60%;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            .inputs {
              width: 100%;
              display: flex;
              justify-content: space-around;
              .otp-input {
                height: 3.5rem;
                width: 3.5rem;
                padding: 0.75rem, 1rem;
                border: 1px solid #c9c6c5;
                text-align: center;
                font-family: Inter;
                font-size: 0.875rem;
                font-weight: 400;
                line-height: 1.1375rem;
                color: #313030;
                margin: 0px;
                &.error {
                  border: 1px solid red;
                }
                &::placeholder {
                  color: #adaaaa;
                  font-family: Inter;
                  font-size: 0.875rem;
                  font-weight: 400;
                  line-height: 1.1375rem;
                  text-align: center;
                }
              }
            }
            .resend-otp {
              display: flex;
              height: 1rem;
              width: 100%;
              margin: 0;
              font-family: Inter;
              font-size: 0.875rem;
              font-weight: 400;
              line-height: 1.1375rem;
              text-align: center;
              text-underline-position: from-font;
              text-decoration-skip-ink: none;
              color: #484646;
              justify-content: center;
              gap: .3rem;

              span {
                font-family: Inter;
                font-size: 0.875rem;
                font-weight: 400;
                line-height: 1.1375rem;
                text-underline-position: from-font;
                text-decoration-skip-ink: none;

                color: #adaaaa;
              }
            }
          }
          label {
            position: absolute;
            left: 1.5rem;
            top: 0%;
            transform: translateY(-50%);
            transition: all 0.3s ease;
            pointer-events: none;
            font-size: 1rem;
            color: #c0c0c0;
            background: white;
            opacity: 0;
            visibility: hidden;
          }

          .with input:focus + label,
          .with input:not(:placeholder-shown) + label {
            visibility: visible;
            opacity: 1;
            transform: translateY(-150%);
            font-size: 0.875rem;
            color: #000000;
            position: absolute;
            left: 1.5rem;
            top: 0%;
            transform: translateY(-50%);
            transition: all 0.3s ease;
            pointer-events: none;
            font-size: 1rem;
            color: #c0c0c0;
            background: white;
          }
          .RconfirmPassword {
            border: 1px solid #c9c6c5;
            transition: border 0.3s ease;
          }

          .RconfirmPassword.green-border {
            border: 2px solid green;
          }

          .login {
            // margin-top: 1rem;
            background: #d2d1d3;
            font-family: Inter;
            font-size: 0.875rem;
            font-weight: 500;

            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            color: #8f8c91;
            padding: 1rem 1.5rem;
          }
          .login.active {
            background: #683cd3;

            color: #ffffff;
            cursor: pointer;
          }

          .password {
            position: relative;
          }
          .hide {
            position: absolute;
            right: 0;
            margin-top: 0.4rem;
            margin-right: 1rem;
          }
          input {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            font-family: Inter, sans-serif;
            font-size: 1rem;
            // padding: 0 1rem;
            box-sizing: border-box;
            color: #313030;
          }

          input::placeholder {
            color: #c0c0c0;
            font-size: 0.875rem;
            font-family: "Inter";
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.1375rem;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            color: #adaaaa;
          }
          .success-message {
            display: none;
            padding-left: 1rem;
            font-family: Inter;
            font-size: 0.75rem;
            font-weight: 400;
            line-height: 0.975rem;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            color: #06c270;
          }

          #set-password {
            color: #8f8c91;
          }
        }

        ///////////fhfuhfhufuhf
        .error {
          display: none;
          padding-left: 1rem;
          font-family: Inter;
          font-size: 0.75rem;
          font-weight: 400;
          line-height: 0.975rem;
          color: #e8505b;
        }
        .error-message {
          display: none;
          padding-left: 1rem;
          font-family: Inter, sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          line-height: 0.76rem;
          color: #e8505b;
        }

        .error-active .error-message {
          display: block;
        }

        .with {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;

          border: 1px solid #c9c6c5;
          border-radius: 3.125rem;
          transition: border 0.3s ease;
          button{
            all:unset;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: .4rem;
          }
        }

        .with input {
          flex: 1;

          font-size: 1rem;
          border: none;
          outline: none;
          background: transparent;
        }

        .with input:focus + label,
        .with input:not(:placeholder-shown) + label {
          visibility: visible;
          opacity: 1;
          transform: translateY(-150%);
          font-size: 0.875rem;
          color: #000000;
        }

        .with label {
          position: absolute;
          left: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          transition: all 0.3s ease;
          font-size: 1rem;
          color: #c0c0c0;
          background: white;
          opacity: 0;
          visibility: hidden;
        }

        .error-active .with {
          border-color: #e8505b;
        }

        .error-active input {
          color: #e8505b;
        }
        #incorrect-password {
          //styleName: Body Small/R;
          font-family: Inter;
          font-size: 12px;
          font-weight: 400;
          line-height: 15.6px;
          text-align: left;
          text-underline-position: from-font;
          text-decoration-skip-ink: none;
          color: #e8505b;
          margin-left: 1rem;
          display: none;
        }

        .login-button {
          // margin-top: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem, 1.5rem;
          color: white;
          border-radius: 3.125rem;
          cursor: pointer;
          background-color: #683cd3;
          color: #fff;
          cursor: pointer;

        }
        .active {
          background-color: #683cd3;
          color: #fff;
          cursor: pointer;
        }

        .password-visible .password-field {
          color: #313030;
        }

        // .password-visible .hide img {
        //   content: url("./assets/showicon.svg");
        // }

        &.error {
          border: 1px solid #e8505b;

          input {
            color: #e8505b;
          }
        }
        &.valid {
          border: 1px solid #06c270;
        }

        .with.password {
          transition: border 0.3s ease;
        }
        .RconfirmPassword {
          border: 1px solid green;
        }
        .input-wrapper.success {
          border: 1px solid #06c270;
        }

        .error-message {
          display: none;
          color: #e8505b;
          font-size: 0.75rem;
          padding-left: 1rem;
        }

        .success-message {
          display: none;
          color: #06c270;
          font-size: 10.75rem;
          padding-left: 1rem;
        }

        .success-visible {
          display: block;
        }

        .terms {
          // margin-top: 2rem;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          font-family: Inter, sans-serif;
          font-size: 0.875rem;
          font-weight: 400;
          line-height: 1.1375rem;
          text-align: center;
          color: #adaaaa;
          text-underline-position: from-font;
          text-decoration-skip-ink: none;

          span {
            font-family: Inter, sans-serif;
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.1375rem;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            color: #1b74f9;
            cursor: pointer;
          }

          span:not(:last-child) {
            margin-right: 0.25rem;
          }
        }

        .error {
          padding-left: 1rem;
          display: flex;
          justify-content: flex-start;
          font-family: Inter;
          font-size: 0.75rem;
          font-weight: 400;
          line-height: 0.975rem;
          text-align: left;
          text-underline-position: from-font;
          text-decoration-skip-ink: none;
          color: #e8505b;
          width: 100%;
        }

        // .check-error {
        //   height: 3rem;
        //   width: 100%;
        //   display: flex;
        //   justify-content: space-between;
        //   align-items: center;
        //   .check-box {
        //     height: 1.5rem;
        //     width: 25%;

        //     display: flex;
        //     justify-content: space-between;
        //     align-items: center;
        //     .text {
        //       font-family: Inter;
        //       font-size: 0.875rem;
        //       font-weight: 400;
        //       line-height: 1.058rem;
        //       text-align: left;
        //       text-underline-position: from-font;
        //       text-decoration-skip-ink: none;
        //       color: #605e5e;
        //     }
        //   }
        //   .forgot-password {
        //     width: 30%;
        //     // height: 1.5rem;
        //     display: flex;
        //     align-items: center;
        //     justify-content: flex-end;
        //     font-family: Inter;
        //     font-size: 0.875rem;
        //     font-weight: 400;
        //     line-height: 1.0588rem;
        //     text-align: right;
        //     text-underline-position: from-font;
        //     text-decoration-skip-ink: none;
        //     color: #7343ea;
        //   }
        // }

        .check-error {
          height: auto; /* Flexible height */
          width: 100%;
          display: flex;
          justify-content: space-between; /* Space between elements */
          align-items: center;
          flex-wrap: wrap; /* Wrap content on smaller screens */

          .check-box {
            height: 1.5rem;
            width: auto; /* Adjust width to fit content */
            display: flex;
            justify-content: flex-start; /* Align checkbox and text together */
            align-items: center;
            gap: 0.5rem; /* Add gap between checkbox and text */

            .text {
              font-family: Inter, sans-serif;
              font-size: 0.875rem; /* 14px */
              font-weight: 400;
              line-height: 1.058rem; /* 17px */
              text-align: left;
              color: #605e5e;
            }
          }

          .forgot-password {
            width: auto; /* Flexible width */
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-family: Inter, sans-serif;
            font-size: 0.875rem; /* 14px */
            font-weight: 400;
            line-height: 1.0588rem; /* 17px */
            text-align: right;
            color: #7343ea;
          }
        }
        .login-button {
          // margin-top: 2rem;
          display: flex;
          justify-content: center;
          gap: 0.4rem;
          align-items: center;

          border-radius: 3.125rem;
          font-family: Inter;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.21rem;
          text-align: left;
          text-underline-position: from-font;
          text-decoration-skip-ink: none;
          background: #d2d1d3;
          color: #8f8c91;
          padding: 1rem 1.5rem;
          background: #683cd3;
          color: #ffffff;
          border: none;

          &.active {
            background: #683cd3;
            color: #ffffff;
            cursor: pointer;
          }
        }

        .google-login {
          // margin-top: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;

          border: 1px solid #797676;
          border-radius: 3.125rem;
          overflow: hidden;
          background-color: #ffffff;
          gap: 0.4rem;
          font-family: Inter;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.21rem;
          text-align: left;
          text-underline-position: from-font;
          text-decoration-skip-ink: none;
          color: #313030;
          padding: 1rem 1.5rem;
        }
      }
      .page2 {
        margin-top: 1rem;
        height: calc(100% - 5rem);
      }
      #login-email {
        display: flex;
        flex-direction: column;
        gap: 3rem;
        width: 80%;

        .login-options {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          .with {
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.5rem;

            border: 1px solid #c9c6c5;
            border-radius: 3.125rem;
            transition: border 0.3s ease;
          }

          input {
            border: none;
            outline: none;
            flex: 1;
            // padding: 0 1.5rem;
            font-size: 1rem;
            color: #313030;
            background: transparent;
          }
          .otp-wrapper {
            height: 100%;
            width: 60%;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            .inputs {
              width: 100%;
              display: flex;
              justify-content: space-around;
              .otp-input {
                height: 3.5rem;
                width: 3.5rem;
                padding: 0.75rem, 1rem;
                border: 1px solid #c9c6c5;
                text-align: center;
                font-family: Inter;
                font-size: 0.875rem;
                font-weight: 400;
                line-height: 1.1375rem;
                color: #313030;
                margin: 0px;
                &.error {
                  border: 1px solid red;
                }
                &::placeholder {
                  color: #adaaaa;
                  font-family: Inter;
                  font-size: 0.875rem;
                  font-weight: 400;
                  line-height: 1.1375rem;
                  text-align: center;
                }
              }
            }
            .resend-otp {
              display: flex;
              height: 1rem;
              width: 100%;
              margin: 0;
              font-family: Inter;
              font-size: 0.875rem;
              font-weight: 400;
              line-height: 1.1375rem;
              text-align: center;
              text-underline-position: from-font;
              text-decoration-skip-ink: none;
              color: #484646;
              justify-content: center;

              span {
                font-family: Inter;
                font-size: 0.875rem;
                font-weight: 400;
                line-height: 1.1375rem;
                text-underline-position: from-font;
                text-decoration-skip-ink: none;

                color: #adaaaa;
              }
            }
          }
          label {
            position: absolute;
            left: 1.5rem;
            top: 0%;
            transform: translateY(-50%);
            transition: all 0.3s ease;
            pointer-events: none;
            font-size: 1rem;
            color: #c0c0c0;
            background: white;
            opacity: 0;
            visibility: hidden;
          }

          .with input:focus + label,
          .with input:not(:placeholder-shown) + label {
            visibility: visible;
            opacity: 1;
            transform: translateY(-150%);
            font-size: 0.875rem;
            color: #000000;
            position: absolute;
            left: 1.5rem;
            top: 0%;
            transform: translateY(-50%);
            transition: all 0.3s ease;
            pointer-events: none;
            font-size: 1rem;
            color: #c0c0c0;
            background: white;
          }
          .RconfirmPassword {
            border: 1px solid #c9c6c5;
            transition: border 0.3s ease;
          }

          .RconfirmPassword.green-border {
            border: 2px solid green;
          }

          .login {
            // margin-top: 1rem;
            background: #d2d1d3;
            font-family: Inter;
            font-size: 0.875rem;
            font-weight: 500;

            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            color: #8f8c91;
            padding: 1rem 1.5rem;
          }
          .login.active {
            background: #683cd3;

            color: #ffffff;
            cursor: pointer;
          }

          .password {
            position: relative;
          }
          .hide {
            position: absolute;
            right: 0;
            margin-top: 0.4rem;
            margin-right: 1rem;
          }
          input {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            font-family: Inter, sans-serif;
            font-size: 1rem;
            padding: 0 1rem;
            box-sizing: border-box;
            color: #313030;
          }

          input::placeholder {
            color: #c0c0c0;
            font-size: 0.875rem;
            font-family: "Inter";
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.1375rem;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            color: #adaaaa;
          }
          .success-message {
            display: none;
            padding-left: 1rem;
            font-family: Inter;
            font-size: 0.75rem;
            font-weight: 400;
            line-height: 0.975rem;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            color: #06c270;
          }
        }

        #login-email-footer {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;

          .signin-with {
            width: 100%;
            display: flex;
            align-items: center;
            .part1 {
              width: 40%;
              height: 0.0625rem;
              background-color: #313131;
            }
            .part2 {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 20%;
              font-family: Inter;
              font-size: 0.875rem;
              font-weight: 400;
              line-height: 1.0585rem;
              text-underline-position: from-font;
              text-decoration-skip-ink: none;
              color: #313131;
            }
            .part3 {
              width: 40%;
              height: 0.0625rem;
              background-color: #313131;
            }
          }
        }
      }
      .page3 {
        margin-top: 1rem;
        height: calc(100% - 5rem);
        .paragraph {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          .header {
            display: flex;
            gap: 0.4rem;
          }
        }

        .sendotppp {
          height: 10rem;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 5rem;
          border-radius: 3.125rem;
          overflow: hidden;
          background-color: #ffffff;
          gap: 0.4rem;
          font-family: Inter;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.21rem;
          text-align: left;
          text-underline-position: from-font;
          text-decoration-skip-ink: none;
          color: #313030;
          background: #d2d1d3;
          color: #8f8c91;
          &.active {
            background: #683cd3;
            color: #f3f3f3;
          }
        }
      }

      #signup-otp {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .login-with-number {
        display: flex;
        flex-direction: column;
        gap: 3rem;
        height: calc(100% - 12rem);
        .numberinput {
          display: flex;
          gap: 0.4rem;
          align-items: center;

          border: 1px solid black;
          border-radius: 3.125rem;
          font-family: Inter;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.21rem;
          text-align: left;
          text-underline-position: from-font;
          text-decoration-skip-ink: none;
          color: #313030;
          overflow: visible;
          padding-left: 0.5rem;
          border: 1px solid #c9c6c5;
          padding: 1rem, 1.5rem;
          height: 3rem;

          .iti__flag-container {
            background-color: white !important;
          }
          .iti__selected-flag {
            background-color: white !important;
          }
          &.active {
            background: #683cd3;
            color: #f3f3f3;
          }
        }
        #login-number {
          display: flex;

          flex-direction: column;
          gap: 3rem;
        }
      }
      #passwordf {
        border: 1px solid #c0c0c0;

        &.active-error {
          border: 1px solid red;
          input {
            color: red;
          }
        }
      }
      #homepage-image {
        display: none;
      }
    }

    .image-container {
      img {
        max-width: 100%;
        height: auto;
        object-fit: contain;
      }
    }
  }
}
</style>