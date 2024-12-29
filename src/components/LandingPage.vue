<template>
    <div class="mainconatainer">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-content">
            <!-- Logo -->
            <div class="logo">NEOTAILY</div>
  
            <!-- Desktop Navigation -->
            <div class="desktop-nav">
              <a href="#features" class="nav-link">Features</a>
              <a href="#pricing" class="nav-link">Pricing</a>
              <a href="#about" class="nav-link">About</a>
              <button @click="opensiginPopup" class="btn sign-in">Sign In</button>
           
            </div>
  
            <div class="mobile-menu-btn" @click="toggleMenu">
              <span>{{ isMenuOpen ? "Close" : "Menu" }}</span>
            </div>
          </div>
  
          <!-- Mobile Navigation -->
          <div v-if="isMenuOpen" class="mobile-nav">
            <a href="#features" class="nav-link">Features</a>
            <a href="#pricing" class="nav-link">Pricing</a>
            <a href="#about" class="nav-link">About</a>
            <!-- <button class="btn sign-in">Sign In</button>
          <button class="btn get-started">Get Started</button> -->
          </div>
        </div>
      </nav>
  
      <section class="hero">
        <div class="overlay"></div>
        <div class="container">
          <div class="content">
            <h1 class="headingg"> <span id="typewriter"></span></h1>
            <p class="subheading">
              Powerful, flexible, and easy to use. Our software helps you
              streamline your operations and boost productivity.
            </p>
            <div class="buttons">
              <button class="btn primary" @click="showpopup()">
                Get Started <span class="arrow"></span>
              </button>
              <button class="btn outline">Watch Demo</button>
            </div>
          </div>
        </div>
      </section>
  
      <section id="features" class="section-features">
        <div class="container">
          <div class="text-center mb-16">
            <h2 class="title">Powerful Features</h2>
            <p class="description">
              Everything you need to streamline your workflow and boost
              productivity
            </p>
          </div>
          <div class="features-grid">
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="feature-card"
            >
              <div class="icon">
                <component :is="feature.icon" class="icon-size" />
              </div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <section class="section-steps">
        <div class="container">
          <div class="text-center mb-16">
            <h2 class="title">How It Works</h2>
            <p class="description">
              Get started in minutes with our simple four-step process
            </p>
          </div>
          <div class="steps-grid">
            <div v-for="(step, index) in steps" :key="index" class="step-card">
              <div class="step-content">
                <span class="step-number">{{ step.number }}</span>
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-description">{{ step.description }}</p>
              </div>
              <ArrowRight v-if="index < steps.length - 1" class="step-arrow" />
            </div>
          </div>
        </div>
      </section>
  
      <section id="pricing" class="section-pricing">
        <div class="container">
          <div class="text-center mb-16">
            <h2 class="title">Simple, Transparent Pricing</h2>
            <p class="description">
              Choose the perfect plan for your business needs
            </p>
          </div>
          <div class="pricing-grid">
            <div
              v-for="(plan, index) in plans"
              :key="index"
              class="pricing-card"
              :class="{
                'popular-plan': plan.popular,
                'regular-plan': !plan.popular,
              }"
            >
              <span v-if="plan.popular" class="popular-tag"> Most Popular </span>
              <h3 class="plan-name">{{ plan.name }}</h3>
              <div class="plan-price">
                <span class="price">{{ plan.price }}</span>
                <span v-if="plan.price !== 'Custom'" class="per-year">/Year</span>
              </div>
              <p class="plan-description">{{ plan.description }}</p>
              <ul class="plan-features">
                <li
                  v-for="(feature, featureIndex) in plan.features"
                  :key="featureIndex"
                  class="feature-item"
                >
                  <Check class="check-icon" />
                  <span>{{ feature }}</span>
                </li>
              </ul>
              <button class="get-started-button">Get Started</button>
            </div>
          </div>
        </div>
      </section>
  
      <section class="testimonials-section">
        <div class="container">
          <div class="text-center mb-16">
            <h2 class="heading">What Our Clients Say</h2>
            <p class="subheading">
              Don't just take our word for it - hear from some of our satisfied
              customers
            </p>
          </div>
          <div class="testimonials-grid">
            <div
              v-for="(testimonial, index) in testimonials"
              :key="index"
              class="testimonial-card"
            >
              <div class="testimonial-header">
                <img
                  :src="testimonial.image"
                  :alt="testimonial.name"
                  class="testimonial-image"
                />
                <div>
                  <h4 class="testimonial-name">{{ testimonial.name }}</h4>
                  <p class="testimonial-role">{{ testimonial.role }}</p>
                </div>
              </div>
              <div class="testimonial-rating">
                <span v-for="n in testimonial.rating" :key="n" class="star"
                  >&#9733;</span
                >
              </div>
              <p class="testimonial-content">{{ testimonial.content }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <div v-if="open" class="dialog-overlay">
        <div class="dialog-content">
          <div class="dialog-header">
            <h2 class="dialog-title">
              {{
                step === 1 ? "Enter Your Phone Number" : "Complete Your Profile"
              }}
            </h2>
          </div>
  
          <div class="form-content">
            <div v-if="step === 1">
              <div class="form-group">
                <div class="select-group">
                  <select v-model="formData.countryCode" class="select">
                    <option value="">Code</option>
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+91">+91 (IN)</option>
                    <!-- Add more country codes as needed -->
                  </select>
                </div>
                <input
                  type="tel"
                  placeholder="Phone number"
                  v-model="formData.phoneNumber"
                  class="input"
                />
              </div>
              <button
                class="button"
                @click="handleNext"
                :disabled="!formData.countryCode || !formData.phoneNumber"
              >
                Next
              </button>
            </div>
  
            <div v-else>
              <div class="form-group">
                <input
                  type="text"
                  placeholder="Your name"
                  v-model="formData.name"
                  class="input"
                />
              </div>
              <button
                class="button"
                @click="handleSubmit"
                :disabled="!formData.name"
              >
                Complete Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <footer class="footer">
        <div class="container">
          <div class="grid">
            <!-- Company Info -->
            <div>
              <h3 class="logo">NEOTAILY</h3>
              <p class="description">
  
              </p>
              <div class="social-icons">
                <!-- <a href="#" class="icon">Facebook</a>
                <a href="#" class="icon">Twitter</a>
                <a href="#" class="icon">Instagram</a>
                <a href="#" class="icon">LinkedIn</a>
                <a href="#" class="icon">GitHub</a> -->
              </div>
            </div>
  
            <!-- Quick Links -->
            <div>
              <h4 class="heading">Quick Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>
  
            <!-- Support -->
            <div>
              <h4 class="heading">Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">API Reference</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
  
            <!-- Legal -->
            <div>
              <h4 class="heading">Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">Security</a></li>
              </ul>
            </div>
          </div>
  
          <div class="footer-bottom">
            <p>&copy; {{ currentYear }} NEOTAILY. All rights reserved.</p>
          </div>
        </div>
      </footer>
  
      <!-- signin pop  -->
  
      <div v-if="SigninPopUp" class="popup-overlay">
        <div class="popup-content">
          <button @click="closeSignupPopup" class="close-btn">&times;</button>
          <h2>Sign In</h2>
  
          <div class="form-container">
         
  
            <div class="input-group">
              <div class="phone-group">
                <div class="country-code">
                  <label>Code</label>
                  <select v-model="countryCode">
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+86">+86</option>
                  </select>
                </div>
  
                <div class="phone-input">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    v-model="phoneNumber"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
  
            <button @click="handleSignIn" class="signin-btn">Sign In</button>
          </div>
        </div>
      </div>
  
  
  
  
      <div v-if="isVisible" class="popup-overlay">
        <div class="popup-content">
          <button @click="closePopup" class="close-btn">&times;</button>
          <h2>Sign Up</h2>
  
          <div class="form-container">
            <div class="input-group">
              <label>Full Name</label>
              <input
                type="text"
                v-model="fullName"
                placeholder="Enter your name"
              />
            </div>
  
            <div class="input-group">
              <div class="phone-group">
                <div class="country-code">
                  <label>Code</label>
                  <select v-model="countryCode">
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+86">+86</option>
                  </select>
                </div>
  
                <div class="phone-input">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    v-model="phoneNumber"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
  
            <button @click="handleSignIn" class="signin-btn">Sign Up</button>
          </div>
        </div>
      </div>
  
      <div v-if="isVisibleoffer" class="popup-overlay">
      <div class="popup-content">
        <button @click="closePopupoffer" class="close-btn">&times;</button>
        
        <div class="promo-content">
          <h2>Special Offer! 🎉</h2>
          <div class="offer-badges">
            <span class="badge">Free Consultation</span>
            <span class="badge highlight">30% OFF</span>
          </div>
          
          <div class="features">
            <div class="feature-item">
              <span class="feature-icon">💼</span>
              <p>Professional Business Solutions</p>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🚀</span>
              <p>Boost Your Growth</p>
            </div>
            <div class="feature-item">
              <span class="feature-icon">💡</span>
              <p>Smart Automation Tools</p>
            </div>
          </div>
  
          <p class="limited-offer">
            🕒 Limited time offer! Contact us now.
          </p>
        </div>
      </div>
    </div>
  
    </div>
  </template>
  
  <script setup>
  
  import {
    Zap,
    Shield,
    Code2,
    Settings2,
    ArrowRight,
    Check,
  } from "lucide-vue-next";
  const isVisible = ref(false);
  const fullName = ref("");
  const countryCode = ref("+91");
  const phoneNumber = ref("");
  const isVisibleoffer = ref(false)
  
  
  const handleSignIn = () => {
    console.log("Signing in:", {
      fullName: fullName.value,
      phone: countryCode.value + phoneNumber.value,
    });
  };
  const showpopup = () => {
    isVisible.value = true;
  };
  
  const closePopup = () => {
    isVisible.value = false;
  };
  const closePopupoffer= ()=>{
    isVisibleoffer.value =false
  }
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Experience blazing-fast performance with our optimized software architecture.",
    },
    {
      icon: Shield,
      title: "Secure by Design",
      description:
        "Enterprise-grade security with end-to-end encryption and compliance features.",
    },
    {
      icon: Code2,
      title: "Developer Friendly",
      description:
        "Extensive API documentation and SDKs for seamless integration.",
    },
    {
      icon: Settings2,
      title: "Customizable",
      description:
        "Tailor the software to your needs with powerful customization options.",
    },
  ];
  
  const steps = [
    {
      number: "01",
      title: "Sign Up",
      description:
        "Create your account in minutes with our simple onboarding process.",
    },
    {
      number: "02",
      title: "Configure",
      description:
        "Customize the software settings according to your business needs.",
    },
    {
      number: "03",
      title: "Integrate",
      description:
        "Connect with your existing tools and start importing your data.",
    },
    {
      number: "04",
      title: "Launch",
      description:
        "Go live with your new streamlined workflow and boost productivity.",
    },
  ];
  
  const plans = [
    {
      name: "Starter",
      price: "\u20B9 400",
      description: "Perfect for small teams",
      features: [
        "Up to 5 team members",
        "Basic analytics",
        "24/7 support",
        "API access",
      ],
    },
    {
      name: "Pro",
      price: "\u20B9 700",
      description: "Best for growing businesses",
      features: [
        "Unlimited team members",
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
        "Advanced security",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited everything",
        "Custom development",
        "Dedicated support",
        "SLA guarantee",
        "On-premise option",
      ],
    },
  ];
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO at TechCorp",
      content:
        "This software has completely transformed how we operate. The productivity gains have been remarkable.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "Michael Chen",
      role: "CTO at StartupX",
      content:
        "The best decision we made was switching to this platform. The customization options are endless.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    {
      name: "Emily Davis",
      role: "Operations Director",
      content:
        "Outstanding support team and feature-rich platform. It's everything we needed and more.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
    {
      name: "Sarah Johnson",
      role: "CEO at TechCorp",
      content:
        "This software has completely transformed how we operate. The productivity gains have been remarkable.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
  ];
  
  
  
  import { ref,onMounted} from "vue";
  const isMenuOpen = ref(false);
  const SigninPopUp = ref(false);
  const opensiginPopup=()=>{
  SigninPopUp.value =true
  }
  const closeSignupPopup = ()=>{
    SigninPopUp.value =false
  }
  
  // Methods
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  
  const step = ref(1);
  const formData = ref({
    countryCode: "",
    phoneNumber: "",
    name: "",
  });
  
  const handleNext = () => {
    if (step.value < 2) step.value++;
  };
  
  const handleSubmit = () => {
    console.log("Form submitted:", formData.value);
  
    step.value = 1; // Reset step for next time
  };
  const typewriterText = "Transform Your Business with NEOTAILY";
      let index = 0;
  
      const typeEffect = () => {
        const element = document.getElementById("typewriter");
  
        // Reset the text if it's the first call
        if (index === 0) element.innerHTML = "";
  
        // Append characters one by one
        if (index < typewriterText.length) {
          element.innerHTML += typewriterText.charAt(index);
          index++;
          setTimeout(typeEffect, 100); // Continue typing with delay
        } else {
          // Reset index and restart the typing effect after a pause
          setTimeout(() => {
            index = 0;
            typeEffect();
          }, 2000); // Pause for 2 seconds before restarting
        }
      };
  
      const showofferpopup = ()=>{
    setTimeout(() => {
      isVisibleoffer.value = true
    }, 10000);
  }
     
      onMounted(() => {
        typeEffect();
        showofferpopup()
  
      });
  
     
  </script>
  <style>
  /* General Container */
  .mainconatainer {
    background: black;
    color: white;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }
  
  .testimonials-section {
    padding: 5rem 0;
    background-color: rgba(128, 0, 128, 0.1); /* Purple background */
  }
  
  .container {
    width: 80%;
    margin: 0 auto;
  }
  
  .text-center {
    text-align: center;
  }
  
  .heading {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  .subheading {
    color: #888;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .testimonial-card {
    padding: 1.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(128, 0, 128, 0.2); /* Purple border */
    border-radius: 0.5rem;
  }
  
  .testimonial-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .testimonial-image {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
  
  .testimonial-name {
    font-weight: 600;
  }
  
  .testimonial-role {
    font-size: 0.875rem;
    color: #888;
  }
  
  .testimonial-rating {
    margin-bottom: 1rem;
  }
  
  .star {
    color: #800080;
    font-size: 1.25rem;
  }
  
  .testimonial-content {
    color: #ddd;
    font-size: 1rem;
  }
  
  .hero {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom right,
      rgba(78, 0, 128, 0.2),
      rgba(0, 0, 0, 1)
    );
    z-index: 0;
  }
  
  .container {
    position: relative;
    z-index: 10;
    text-align: center;
  }
  
  .headingg {
    font-size: 3.75rem; /* 60px */
    font-weight: bold;
    margin-bottom: 1.5rem;
    background: linear-gradient(to right, #9b4de1, #7b5add);
    -webkit-background-clip: text;
    color: transparent;
  }
  
  .subheading {
    font-size: 1.25rem; /* 20px */
    color: #d1d5db; /* Gray-300 */
    margin-bottom: 2rem;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  
  .btn {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem; /* 18px */
    font-weight: 600;
    border-radius: 0.375rem; /* 6px */
    display: inline-flex;
    align-items: center;
  }
  
  .primary {
    background-color: #6b4bce;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .primary:hover {
    background-color: #5a3fa7;
  }
  
  .outline {
    background-color: transparent;
    border: 2px solid #6b4bce;
    color: #6b4bce;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .outline:hover {
    background-color: #6b4bce;
    color: white;
  }
  
  .arrow {
    margin-left: 0.5rem;
    font-size: 1.25rem;
  }
  
  /* Section Styles */
  section {
    padding-top: 80px;
    padding-bottom: 80px;
  }
  
  #features {
    background-color: #000000;
  }
  
  #pricing {
    background-color: rgb(1, 1, 1);
  }
  
  .section-steps {
    background-color: #000000;
  }
  
  .text-center {
    text-align: center;
  }
  
  .mb-16 {
    margin-bottom: 4rem;
  }
  
  /* Title Styles */
  .title {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .description {
    color: #a0aec0;
    max-width: 700px;
    margin: 0 auto;
    font-size: 1rem;
  }
  
  /* Grid Styles */
  .features-grid,
  .steps-grid,
  .pricing-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer {
    background-color: #000;
    color: #fff;
    padding: 40px 0;
    border-top: 1px solid rgba(128, 0, 128, 0.2);
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 40px;
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
    background: linear-gradient(to right, #9b4dca, #9a1de0);
    background-clip: text;
    color: transparent;
  }
  
  .description {
    color: #ccc;
  }
  
  .social-icons {
    display: flex;
    gap: 10px;
  }
  
  .icon {
    color: #ccc;
    text-decoration: none;
    font-size: 14px;
  }
  
  .icon:hover {
    color: #9b4dca;
  }
  
  .heading {
    font-size: 18px;
    font-weight: bold;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  ul li {
    margin-bottom: 10px;
  }
  
  ul li a {
    color: #ccc;
    text-decoration: none;
  }
  
  ul li a:hover {
    color: #9b4dca;
  }
  
  .footer-bottom {
    text-align: center;
    margin-top: 20px;
  }
  
  .footer {
    background-color: #000;
    color: #fff;
    padding: 40px 20px;
    border-top: 1px solid rgba(128, 0, 128, 0.2);
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 columns for larger screens */
    gap: 40px;
  }
  
  @media screen and (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr 1fr; /* 2 columns for tablets */
    }
  }
  
  @media screen and (max-width: 480px) {
    .grid {
      grid-template-columns: 1fr; /* 1 column for mobile phones */
      gap: 20px; /* Smaller gap for mobile */
    }
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
    background: linear-gradient(to right, #9b4dca, #9a1de0);
    background-clip: text;
    color: transparent;
  }
  
  .description {
    color: #ccc;
  }
  
  .social-icons {
    display: flex;
    flex-wrap: wrap; /* Ensures icons wrap in smaller spaces */
    gap: 10px;
  }
  
  .icon {
    color: #ccc;
    text-decoration: none;
    font-size: 14px;
  }
  
  .icon:hover {
    color: #9b4dca;
  }
  
  .heading {
    font-size: 18px;
    font-weight: bold;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  ul li {
    margin-bottom: 10px;
  }
  
  ul li a {
    color: #ccc;
    text-decoration: none;
  }
  
  ul li a:hover {
    color: #9b4dca;
  }
  
  .footer-bottom {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
  }
  
  @media screen and (max-width: 480px) {
    .footer-bottom {
      font-size: 12px; /* Adjust text size for mobile */
    }
  }
  
  @media (min-width: 768px) {
    .features-grid,
    .steps-grid,
    .pricing-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .features-grid,
    .steps-grid {
      grid-template-columns: repeat(4, 1fr);
    }
    .pricing-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  /* Feature Card Styles */
  .feature-card {
    padding: 1.5rem;
    border-radius: 0.375rem;
    border: 1px solid rgba(128, 90, 236, 0.2);
    transition: border-color 0.3s;
  }
  
  .feature-card:hover {
    border-color: rgba(128, 90, 236, 0.4);
  }
  
  .icon-size {
    width: 3rem;
    height: 3rem;
    color: #805ad5;
  }
  
  .feature-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .feature-description {
    color: #a0aec0;
  }
  
  /* Step Styles */
  .step-card {
    position: relative;
  }
  
  .step-content {
    padding: 1.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(128, 90, 236, 0.2);
    border-radius: 0.375rem;
  }
  
  .step-number {
    font-size: 2.25rem;
    font-weight: 700;
    color: #805ad5;
    margin-bottom: 1rem;
  }
  
  .step-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .step-description {
    color: #a0aec0;
  }
  
  .step-arrow {
    position: absolute;
    top: 50%;
    right: -1rem;
    transform: translateY(-50%);
    color: #805ad5;
  }
  
  /* Pricing Card Styles */
  .pricing-card {
    padding: 2rem;
    border: 1px solid rgba(128, 90, 236, 0.2);
    border-radius: 0.375rem;
  }
  
  .popular-plan {
    background-color: rgba(128, 90, 236, 0.1);
    border-color: #805ad5;
  }
  
  .regular-plan {
    border-color: rgba(128, 90, 236, 0.2);
  }
  
  .popular-tag {
    background-color: #805ad5;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    display: inline-block;
  }
  
  .plan-name {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .plan-price .price {
    font-size: 2.25rem;
    font-weight: 700;
  }
  
  .plan-price .per-year {
    color: #a0aec0;
  }
  
  .plan-description {
    color: #a0aec0;
    margin-bottom: 1.5rem;
  }
  
  .plan-features {
    list-style-type: none;
    padding-left: 0;
  }
  
  .feature-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .check-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #805ad5;
    margin-right: 0.5rem;
  }
  
  .get-started-button {
    width: 100%;
    background-color: #805ad5;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 600;
    text-align: center;
    transition: background-color 0.3s;
  }
  
  .get-started-button:hover {
    background-color: #6b46c1;
  }
  
  .navbar {
    position: fixed;
    width: 100%;
    top: 0;
    background-color: rgba(22, 21, 21, 0.8);
    backdrop-filter: blur(10px);
    padding: 20px;
    z-index: 50;
    border-bottom: 1px solid rgba(128, 0, 128, 0.2);
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
    background: linear-gradient(to right, #9b4dca, #9a1de0);
    background-clip: text;
    color: transparent;
  }
  
  .desktop-nav {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
  
  .nav-link {
    color: #ccc;
    text-decoration: none;
    font-size: 16px;
  }
  
  .nav-link:hover {
    color: #9b4dca;
  }
  
  .btn {
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .sign-in {
    background: none;
    color: #9b4dca;
    border: 1px solid #9b4dca;
  }
  
  .get-started {
    background-color: #9b4dca;
    color: white;
  }
  
  /* Ensure .mobile-nav visibility and layout for mobile screens */
  .mobile-nav {
    display: none; /* Hide by default */
    background-color: rgba(22, 21, 21, 0.9);
    padding: 20px;
    position: absolute;
    top: 70px; /* Adjust based on navbar height */
    width: 100%;
    left: 0;
    z-index: 40;
  }
  
  .mobile-nav a {
    color: #ccc;
    text-decoration: none;
    font-size: 18px;
  }
  
  .mobile-nav a:hover {
    color: #9b4dca;
  }
  
  .mobile-nav .btn {
    margin-top: 15px;
    display: block;
    width: 100%;
    text-align: center;
  }
  
  /* Show .mobile-menu-btn only on small screens */
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #ccc;
    font-size: 18px;
  }
  
  /* Media Query for Mobile Screens */
  @media screen and (max-width: 768px) {
    .desktop-nav {
      display: none;
    }
  
    .mobile-nav {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
  
  .dialog-overlay {
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
  
  .dialog-content {
    background-color: #1a1a1a;
    border-radius: 8px;
    padding: 20px;
    width: 300px;
    max-width: 100%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
  
  .dialog-header {
    text-align: center;
    margin-bottom: 16px;
  }
  
  .dialog-title {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
  }
  
  .form-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .form-group {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  
  .select-group {
    flex-shrink: 0;
  }
  
  .select {
    width: 120px;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #bbb;
    border-radius: 4px;
    background-color: #333;
    color: #fff;
  }
  
  .input {
    flex-grow: 1;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #bbb;
    border-radius: 4px;
    background-color: #333;
    color: #fff;
  }
  
  .button {
    background-color: #8a4fff;
    color: #fff;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .button:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
  
  .button:hover:not(:disabled) {
    background-color: #7a3cfa;
  }
  
  @media screen and (max-width: 768px) {
    /* .hero{
      margin-top: 4.5rem;
      margin-bottom: 1rem;
   } */
    .section-features {
      margin-top: 4.5rem;
    }
    section {
      padding-top: 0px;
    }
    .hero {
      margin-top: 4.5rem;
      margin-bottom: 1rem;
    }
  }
  .mobile-menu-btn,
  .mobile-nav {
    display: none;
  }
  
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .popup-content {
    position: relative;
    background: #1a1a1a;
    padding: 2rem;
    border-radius: 12px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
  
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: #a855f7;
    font-size: 1.5rem;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s;
  }
  
  .close-btn:hover {
    background: rgba(168, 85, 247, 0.1);
    transform: rotate(90deg);
  }
  
  h2 {
    color: #a855f7;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    text-align: center;
  }
  
  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    width: 100%;
  }
  
  .input-group {
    width: 100%;
  }
  
  .phone-group {
    display: flex;
    gap: 1rem;
    width: 100%;
  }
  
  .country-code {
    width: 30%;
  }
  
  .phone-input {
    flex: 1;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #a855f7;
    font-size: 0.9rem;
  }
  
  input,
  select {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid #4b5563;
    border-radius: 8px;
    background: #2d2d2d;
    color: white;
    font-size: 1rem;
    transition: border-color 0.3s;
    box-sizing: border-box;
  }
  
  input:focus,
  select:focus {
    outline: none;
    border-color: #a855f7;
  }
  
  .signin-btn {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #a855f7 0%, #7928ca 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s;
    margin-top: 0.5rem;
  }
  
  .signin-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .popup-content {
    position: relative;
    background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
    padding: 2.5rem;
    border-radius: 16px;
    width: 90%;
    max-width: 420px;
    box-shadow: 0 8px 32px rgba(168, 85, 247, 0.2);
    border: 1px solid rgba(168, 85, 247, 0.1);
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: #a855f7;
    font-size: 1.5rem;
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s;
  }
  
  .close-btn:hover {
    background: rgba(168, 85, 247, 0.1);
    transform: rotate(90deg);
  }
  
  .promo-content {
    text-align: center;
  }
  
  h2 {
    color: #fff;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #a855f7, #7928ca);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .offer-badges {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
  }
  
  .badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
    background: rgba(168, 85, 247, 0.1);
    color: #a855f7;
    border: 1px solid rgba(168, 85, 247, 0.2);
  }
  
  .badge.highlight {
    background: #a855f7;
    color: white;
  }
  
  .features {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem 0;
  }
  
  .feature-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem;
    background: rgba(168, 85, 247, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(168, 85, 247, 0.1);
  }
  
  .feature-icon {
    font-size: 1.5rem;
  }
  
  .feature-item p {
    color: #e5e7eb;
    margin: 0;
    font-size: 1.1rem;
  }
  
  .limited-offer {
    color: #a855f7;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1.5rem;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  
  
  #typewriter {
    display: inline-block;
    border-right: 2px solid white; /* Cursor effect */
    padding-right: 5px;
    animation: blink 0.7s step-end infinite;
  }
  
  /* Blinking cursor effect */
  @keyframes blink {
    from {
      border-color: white;
    }
    to {
      border-color: transparent;
    }
  }
  </style>