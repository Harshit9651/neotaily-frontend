<template>
    <div v-if="data" class="main-wrapper">
      <div
        class="role-card"
        v-for="(role, index) in roles"
        :key="index"
        @click="navigateToRole(role.name)"
      >
        <span>{{ role.name }}</span>
      </div>
    </div>
  
    <!-- Display filtered employees for the selected department -->
    <div v-else class="employee-list-container">
      <header class="header">
        <h3 class="app-title">{{ department }} <span>*</span> Employee</h3>
      </header>
  
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for an employee by name..."
        />
      </div>
  
      <div v-if="loading" class="loading-message">Loading employees...</div>
  
      <div v-else class="employee-cards">
        <div
          v-for="employee in filteredEmployees"
          :key="employee._id"
          class="employee-card"
          @click="viewEmployeeDetails(employee._id)"
        >
          <div class="outer">
            <img
              src="../assets/man_icon.png"
              alt="Employee Image"
              class="employee-image"
            />
          </div>
          <div class="employee-info">
           
            <h3>{{ employee.name }}</h3>
            <p>
          Department: {{
                employee.department
              }}
            </p>
            <p>Salary:{{ employee.salary }}</p>
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
  import { ref, computed } from "vue";
  import axios from "axios";
  import { useRouter } from "vue-router";
  const router = useRouter();
  // Spinner overlay
const spinnerOverlay = document.getElementsByClassName("spinner-overlay");
const showSpinner = () => {
  spinnerOverlay[0].style.display = "flex";
};
const hideSpinner = () => {
  spinnerOverlay[0].style.display = "none";
};

  const data = ref(true);
  const department = ref("");
  const employees = ref([]);
  const searchQuery = ref("");
  const loading = ref(false);
  const roles = ref([
    { name: "Jinning Mistri" },
    { name: "Saplar" },
    { name: "Jharkhand (Labor)" },
    { name: "Bihari Labor" },
    { name: "Packaging" },
    { name: "Munim" },
    { name: "Sr Manager" },
    { name: "Market Manager" },
    { name: "Driver" },
  ]);
  
  const navigateToRole = async (roleName) => {
    department.value = roleName;
    data.value = false;
    loading.value = true;
  
    try {
      showSpinner()
      const response = await axios.get(
        `https://j-k-managment-backend.onrender.com/Employe/RenderEmploye?department=${roleName}`
      );
      employees.value = response.data;
    } catch (error) {
      hideSpinner()
      console.error("Error fetching employee data:", error);
    } finally {
      hideSpinner()
      loading.value = false;
    }
  };
  
  const filteredEmployees = computed(() => {

    return employees.value.filter((employee) =>
    (employee.name || "") // Use the correct property
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  );
  });
  
  const viewEmployeeDetails = (employeeId) => {
    showSpinner()
    console.log("Employee ID:", employeeId);
    router.push({ name: "SeleryRecord", params: { id: employeeId } });
    hideSpinner()
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
.main-wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-top: 2rem;
  overflow-y: auto;
  max-height: 100vh;
}

.role-card {
  width: 35%;
  height: auto;
  min-height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  padding: 1rem;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-family: Inter;
  font-size: 36px;
  font-weight: 600;
  line-height: 46.8px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  border: 1px solid blueviolet;
  background-color: #1F509A;
  color: white;
  opacity: 0; /* Start hidden */
  transform: translateY(20px); /* Move down slightly */
  animation: fadeIn 0.5s ease-out forwards;
}

.role-card:nth-child(1) {
  animation-delay: 0.2s;
}
.role-card:nth-child(2) {
  animation-delay: 0.4s;
}
.role-card:nth-child(3) {
  animation-delay: 0.6s;
}
.role-card:nth-child(4) {
  animation-delay: 0.8s;
}
.role-card:nth-child(5) {
  animation-delay: 1s;
}
.role-card:nth-child(6) {
  animation-delay: 1.2s;
}
.role-card:nth-child(7) {
  animation-delay: 1.4s;
}
.role-card:nth-child(8) {
  animation-delay: 1.6s;
}
.role-card:nth-child(9) {
  animation-delay: 1.8s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.customer-list-container {
  font-family: "Arial", sans-serif;
  padding: 20px;
  background-color: white;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
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

.search-bar {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.search-bar input {
  width: 100%;
  max-width: 600px;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.employee-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
}

.employee-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: 20px;
  width: 80%;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  justify-content: space-between; /* Space items evenly */
}

.employee-card:hover {
  transform: scale(1.05);
}

.outer {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2.5px solid blueviolet;
  display: flex;
  justify-content: center;
  align-items: center;
}

.employee-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.employee-info {
  display: flex;
  flex-direction: row; /* Align items in a row */
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-left: 20px; /* Adds space between image and info */
}

.employee-info h3 {
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin-left: 40%;
}
.employee-info p {
  font-size: 16px;
  font-size: 16px;
  color: #777;
  margin: 0;
  padding: 0 10px;
}

.employee-infop i {
  color: #6c63ff; /* Icon color */
  margin-right: 5px;
}

.loading-message {
  text-align: center;
  font-size: 20px;
  color: #999;
}
</style>
