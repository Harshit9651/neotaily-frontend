<template>
  <div class="attendance-container">
    <h1>Employee Attendance (Date: {{ currentDate }})</h1>
    <div class="employee-card" v-for="employee in employees" :key="employee.id">
      <div class="image-outer">
        <img
          src="../assets/man_icon.png"
          alt="User Image"
          class="employee-image"
        />
      </div>
      <div class="employee-details">
        <h2>{{ employee.name }}</h2>
        <p class="designation">{{ employee.department }}</p>
      </div>
   
  
      <select
  v-model="employee.status"
  @change="updateAttendanceStatus(employee)"
  :class="statusClass(employee.status)"
  class="status-dropdown"
>  <option value="other">other</option>
  <option value="Full Day">Full Day</option>
  <option value="Half Leave">Half Leave</option>
  <option value="Absent">Absent</option>
</select>

    </div>

    <div v-if="dateoverlay" class="date-overlay" id="dateOverlay">
      <!-- <button class="close-btn" @click="closedateoverlay">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="11"
          viewBox="0 0 12 11"
          fill="none"
        >
          <path
            d="M10.9137 0.5L1 10.3267"
            stroke="#5A3B3B"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M10.9998 10.4998L1.17236 0.586914"
            stroke="#5A3B3B"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
        </svg>
      </button> -->
      <h2>Select a Date</h2>
      <div class="custom-date-wrapper">
        <input type="date" class="custom-date-input" v-model="selectedDate" />
      </div>
      <button class="submit-btn" @click="closedateoverlay">Submit</button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const dateoverlay = ref(true);
const employees = ref([]);
const selectedDate = ref("");
const name = route.query.name;
console.log(name);


// Fetch data on component mount
onMounted(async () => {
  try {
    const response = await axios.get("https://j-k-managment-backend.onrender.com/Employe/AllEmploye", {
      params: {
        name
      },
      headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
    });
    employees.value = response.data;
    employees.value.forEach((employee) => {
      employee.status = "other";  // Set default status as "Present"
    });
    
  } catch (error) {
    console.error("Error fetching employees:", error);
    alert("Failed to fetch employees. Please try again.");
  }
});

// Computed property for displaying the selected date
const currentDate = computed(() => {
  return selectedDate.value
    ? new Date(selectedDate.value).toLocaleDateString()
    : "Select a Date";
});

// Function to update attendance status
const updateAttendanceStatus = async (employee) => {
  try {
    if (employee.status === 'other') {
      alert('You cannot select "other" as the attendance status.');
      return; 
    }
    await axios.post("https://j-k-managment-backend.onrender.com/Employe/updateAttendance", {
      id: employee._id,
      status: employee.status,
      date: selectedDate.value,
    });
  
    alert(`Attendance for ${employee.name} updated to ${employee.status}`);
  } catch (error) {
    console.error("Error updating attendance status:", error);
    alert("Failed to update attendance status");
  }
};

const statusClass = (status) => {
  if (status === "Full Day") return "bg-success";
  if (status === "Half Leave") return "bg-warning";
  if (status === "Absent") return "bg-danger";
  if (status === "other") return "bg-danger";
  return "";
};

function closedateoverlay() {
  if (selectedDate.value) {
    dateoverlay.value = false;
  } else {
    alert("Please select a date before proceeding!");
  }
}

// Watcher to toggle body scroll based on overlay visibility
watch(
  () => dateoverlay.value,
  (newVal) => {
    document.body.style.overflow = newVal ? "hidden" : "auto";
  }


  
);
</script>

<style lang="scss" scoped>
.attendance-container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  position: relative;
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

  /* Wrapper for the custom date input */
  .custom-date-wrapper {
    position: relative;
    display: inline-block;
    margin-bottom: 20px;
    width: 80%;
  }

  /* Date input styling */
  .custom-date-input {
    width: 100%;
    padding: 15px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    color: #333;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .custom-date-input:hover,
  .custom-date-input:focus {
    border-color: #663366;
    box-shadow: 0 0 5px rgba(102, 51, 102, 0.5);
  }

  /* Submit button styling */
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

  /* Close button styling */
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

  /* Add slight hover effect for the close button */
  .close-btn:active {
    transform: scale(0.95);
  }
}

h1 {
  font-size: 1.8rem;
  color: #555;
  margin-bottom: 20px;
}

.employee-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 12px;
  padding: 15px 20px;
  margin-bottom: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.employee-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.image-outer {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2.5px solid blueviolet;
  .employee-image {
    margin-top: 2px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
}

.employee-details {
  flex: 1;
  margin-left: 15px;
  text-align: left;
  display: flex;
  align-items: center;
}

.employee-details h2 {
  font-size: 1.1rem;
  color: #333;
  margin: 0;
  width: 7rem;

  overflow: hidden;
  text-overflow: ellipsis;  /* Adds ellipsis (…) if content overflows */
  white-space: nowrap; 
}

.designation {
  margin-left: 20%;
  font-size: 1rem;
  color: #777;
}

.status-dropdown {
  max-width: 12.5rem;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  background-color: #f8f8f8;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
}

.status-dropdown:focus,
.status-dropdown:hover {
  border-color: #aaa;
  background-color: #e9e9e9;
}
.bg-success {
  color: #155724;
}
.bg-warning {
  color: #856404;
}
.bg-danger {
  color: #721c24;
}
</style>
