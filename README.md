# 🤍 Arogya-Vritti - Telehealth Platform

**A comprehensive telehealth platform designed to provide accessible healthcare services to everyone, anywhere. We connect patients with healthcare professionals through secure video consultations, AI-powered assistance, and real-time health monitoring.**

### Use case 2 – Telehealth Solution for access to Healthcare from anywhere.
**Problem Statement** – Post pandemic, world has changed significantly. Quick access to
quality, affordable and reliable healthcare from anywhere is the need of the hour. People
are confined in remote locations in their homes and hence there is an urgent need to come
up with a digitally enabled solution to address the following –

1. Instant access to Health consultation similar to in person experience by developing a
Telehealth application
2. Capture basic patient information and particular specialty for which Telehealth
consultation is needed
3. Ability to accept payment for the Telehealth consultation before the actual consultation
begins
4. No compromise in the privacy of the consultation involving PHI data and the ability to
securely save the information for future reference
5. Ability to chat and provide information from within the application during Telehealth
session
6. Overcome challenges of difference in dialect/ accent in remote consultation via a
transcription service

# 🔗 Links
### Website Link -> [www.arogya-vritti.life](https://www.arogya-vritti.life/)
### Figma Link -> [Click here](https://www.figma.com/design/UtV2n14SM6rDQJQT2haHbE/ArogyaVritti-Veersa?node-id=3-584&t=Vy9Z9okfQr54CXkn-1)
### Video Presentation -> [Click here](https://drive.google.com/file/d/10S7WjK8EynDfwDocQFJOsdJD8XW_MG9a/view?usp=sharing)

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

#### Emergency(Nearby Hospitals)
- GET /api/geoapify/hospitals
- GET /api/geoapify/ip-location
- GET /api/geoapify/reverse-geocode

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


