// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import MandiPurchaseForm from "./components/MandiPurchaseForm.vue";
import BrockerPurchaseForm from "./components/BrockerPurchaseForm.vue";
import DirectPurchaseForm from "./components/DirectPurchaseForm.vue";
import EmployeeAttendance from "./components/EmployeeAttendance.vue";
import Sellproduct from "./components/SellProduct.vue"
import CottonCakekhataBook from "./components/CottonCakekhataBook.vue";
import MustardOilKhataBook from "./components/MustardOilKhataBook.vue";
import RowOfCuttonKhataBokk from "./components/RowOfCuttonKhataBokk.vue";
import RowOfMustardOildKhataBook from "./components/RowOfMustardOildKhataBook.vue";
import CustomerKhataDetails from "./components/CustomerKhataDetails.vue";
import AddEmploye from "./components/AddEmploye.vue";
import SeleryManagment from "./components/SeleryManagment.vue";
import SeleryRecord from "./components/SeleryRecord.vue";
import ShowDepartments from "./components/ShowDepartments.vue";
import HomePage from "./components/HomePage.vue";
import MandiPurchaseDetail from "./components/MandiPurchaseDetail.vue";
import BrockerpurchaseDetail from "./components/BrockerpurchaseDetail.vue";
import DirectPurchaseDetail from "./components/DirectPurchaseDetail.vue";
import SuspanceForm from "./components/SuspanceForm.vue";
import SuspanceHistery from "./components/SuspanceHistery.vue";
import OrderBill from "./components/OrderBill.vue";
import LoginPage from "./components/LoginPage.vue";
import AdminPannel from "./components/AdminPannel.vue";
import LandingPage from "./components/LandingPage.vue";

const routes = [
  {
    path: "/Mandi-purchase-form",
    name: "MandiPurchase-form",
    component: MandiPurchaseForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/broker-purchase-Form",
    name: "BrockerPurchase",
    component: BrockerPurchaseForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/direct-purchase-Form",
    name: "DirectPurchase",
    component: DirectPurchaseForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/Employee-Attendance",
    name: "EmployeeAttendande",
    component: EmployeeAttendance,
    meta: { requiresAuth: true },
  },
  {
    path: "/Sell-product-Form",
    name: "SellProductForm",
    component: Sellproduct,
     meta: { requiresAuth: true },
  },
  {
    path: "/Cotton-Cake-khatabook",
    name: "cottoncakekhatabook",
    component: CottonCakekhataBook,
   meta: { requiresAuth: true },
  },
  {
    path: "/Mustard-Oil-khatabook",
    name: "Mustardkhatabook",
    component: MustardOilKhataBook,
     meta: { requiresAuth: true },
  },
  {
    path: "/Row-of-cutton-khatabook",
    name: "RowOfCuttonKhataBook",
    component: RowOfCuttonKhataBokk,
     meta: { requiresAuth: true },
  },
  {
    path: "/Row-Of-MustardOil-khatabook",
    name: "RowOfMustardOilKhataBook",
    component: RowOfMustardOildKhataBook,
    meta: { requiresAuth: true },
  },
  {
    path: "/customer-history/:id/:type",
    name: "CustomerHistorydetails",
    component: CustomerKhataDetails,
    props: true,
     meta: { requiresAuth: true },
  },
  {
    path: "/Add-Employee",
    name: "addEmploye",
    component: AddEmploye,
     meta: { requiresAuth: true },
  },
  {
    path: "/Selery-Managment",
    name: "Selerymanagment",
    component:SeleryManagment ,
     meta: { requiresAuth: true },
  },
  {
    path: "/Departments",
    name: "Departments",
    component:ShowDepartments,
     meta: { requiresAuth: true },
  },
  {
    path: "/Selery-Record/:id",
    name: "SeleryRecord",
    component:SeleryRecord,
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    name: "HomePage",
    component:HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/Mandi-Purchase-Detail",
    name: "Mandi-purchase-Detail",
    component:MandiPurchaseDetail,
     meta: { requiresAuth: true },
  },
  {
    path: "/Brocker-Purchase-Detail",
    name: "Brocker-purchase-Detail",
    component:BrockerpurchaseDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/Driect-Purchase-Detail",
    name: "Driect-purchase-Detail",
    component:DirectPurchaseDetail,
     meta: { requiresAuth: true },
  },
  {
    path: "/Suspance-form",
    name: "Suspance-form",
    component:SuspanceForm,
     meta: { requiresAuth: true },
  },

  {
    path: "/Suspance-History",
    name: "Suspance-History",
    component:SuspanceHistery,
     meta: { requiresAuth: true },
  },
  {
    path: "/OrderBill",
    name: "Bill",
    component: OrderBill,
    props: true,
     meta: { requiresAuth: true },
  },
  
  {
    path: "/Login",  
    name: "Login",
    component: LoginPage,
    
  },
  {
    path: "/Admin",  
    name: "Admin",
    component: AdminPannel,
    meta: { requiresAuth: true },
  },
  {
    path: "/Landing-Page",  
    name: "LandingPage",
    component: LandingPage,

  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("authToken");

  // Check if token exists and is valid (you can add expiration check here)
  const isAuthenticated = token && token !== "";

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.warn("User not authenticated, redirecting to Login");
    next({ name: "Login" });
  } else {
    next();
  }
});


export default router;
