# Arogya-Vritti - Telehealth Platform

A comprehensive telehealth platform designed to provide accessible healthcare services to everyone, anywhere. We connect patients with healthcare professionals through secure video consultations, AI-powered assistance, and real-time health monitoring.

# 🌟 Features

- Book Appointments: Schedule virtual consultations with healthcare specialists  
- Emergency Services: Access nearby hospitals and urgent medical care  
- AI Health Assistant: Get quick answers to common health questions  
- Personalised Dashboard: Track health insights and appointments  
- Secure Video Consultations: Face-to-face consultations from home  
- Real-time Health Monitoring: Track vital signs and health metrics  
- Payment Integration: Secure payment processing with Razorpay  

# 🚀 Tech Stack

### Frontend
- React 18  
- TypeScript  
- Vite  
- Tailwind CSS  
- Shadcn UI Components  
- React Router DOM  
- React Query  
- Chart.js & Recharts  
- React Leaflet (Maps)  
- Google AI Integration  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- JWT Authentication  
- Razorpay Integration  
- Multer (File Upload)  
- CORS enabled  

# 📦 Installation

### Prerequisites
- Node.js (v16 or higher)  
- MongoDB  
- npm or yarn  

### Frontend Setup
 ```bash
cd Front-end
npm install
npm run dev
```

### Backend Setup
```bash
cd Back-end
npm install
npm run dev
```

# 🔧 Environment Variables

### Frontend (.env)
VITE_BACKEND_URL=http://localhost:8080


### Backend (.env)
MONGODB_URI=your_mongodb_uri  
JWT_SECRET=your_jwt_secret  
RAZORPAY_KEY_ID=your_razorpay_key  
RAZORPAY_KEY_SECRET=your_razorpay_secret  
    

# 👥 Creators

- [Tryambakesh Satish](https://www.linkedin.com/in/tryambakeshsatish/)  
- [Samarth Srivastava](https://www.linkedin.com/in/samarthsrivastava00/)  
- [Rudra Tiwari](https://www.linkedin.com/in/rudra-tiwari1306/)  
- [Supriya Pandey](https://www.linkedin.com/in/supriya-pandey22/)  

# 🔐 Security Features

- JWT Authentication  
- Secure Password Hashing  
- CORS Protection  
- Environment Variables  
- Input Validation  
- Secure File Upload  

# 📱 API Endpoints

#### Authentication
- POST /api/auth/register  
- POST /api/auth/login  

#### Appointments
- GET /api/appointments  
- POST /api/appointments  
- PUT /api/appointments/:id  

#### Medical Records
- GET /api/medical-records  
- POST /api/medical-records  
- PUT /api/medical-records/:id  

#### Payments
- POST /api/payment/create  
- POST /api/payment/verify  

# 🚀 Deployment

### Frontend
```bash
cd Front-end
npm run build
```

### Backend
```bash
cd Back-end
npm start
```

# 🤝 Contributing

1. Fork the repository  
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)  
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)  
4. Push to the branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request  


