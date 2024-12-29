<template>
    <nav class="header">
      <div class="div1">
        <div class="d-flex align-items-center">
          <button
            class="btn btn-outline-light me-2"
           
          >
            <component :is="isOpen ? 'FaTimes' : 'FaBars'" />
          </button>
          <router-link to="/" class="navbar-brand">
            <img
              src="/logo.png"
              alt="Company Logo"
              height="30"
              class="d-inline-block align-top"
            />
          </router-link>
        </div>
  
        <div class="ms-auto nav-buttons">
          <router-link to="/login" class="btn btn-outline-light me-2">
            Log in
          </router-link>
          <router-link to="/" class="btn btn-outline-light">
            Home
          </router-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
//   import { ref } from 'vue';
//   import { FaBars, FaTimes } from 'vue-icons/fa';
  
//   // Props
//   defineProps(['isOpen']);

//   const emit = defineEmits(['toggleSidebar']);
  
 
//    const toggleSidebar = () => emit('toggleSidebar'); 
  </script>
  
  <style scoped lang="scss">

  .header {
    background-color: orange;
    // box-shadow: $box-shadow;
    padding: 20px 0;
    transition: background-color 0.3s ease;
  
    .navbar-brand {
      img {
        max-height: 40px;
        transition: transform 0.3s ease;
  
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  
    .navbar-toggler {
      color: black;
  
      &:hover {
        border-color: rgb(198, 140, 32)
      }
    }
  
    .container {
      width: 100vw;
      justify-content: space-between;
    }
  
    .nav-link {
      color: white !important;
      font-weight: 600;
      border-radius: 50px;
      border: 1px solid white;
      padding: 10px;
      margin: 10px;
      transition: color 0.3s ease, transform 0.3s ease;
  
      &:hover {
        color: rgb(199, 151, 62) !important;
        transform: translateY(-3px);
      }
    }
  
    .btn-outline-light {
      border-color: lightblue;
      color: lightcyan;
      transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  
      &:hover {
        background-color: lightcyan;
        color: lightcoral;
        transform: scale(1.05);
      }
    }
  
    .sidebar-toggle {
      transition: transform 0.3s ease;
    }
  }
  
  .div1 {
    display: flex;
    flex-direction: row;
    padding: 0px 15px;
    align-items: center;
    justify-content: space-between;
  }
  
  .nav-buttons {
    display: flex;
    gap: 10px;
  
    .btn {
      color: orange;
      font-weight: 600;
      border-radius: 15px;
      padding: 10px 20px;
      transition: color 0.3s ease, background-color 0.3s ease;
  
      &:hover {
        // background-color: $primary-orange-light;
        // color: $primary-orange;
      }
    }
  }
  </style>
  