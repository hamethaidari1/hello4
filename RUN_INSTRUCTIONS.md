# 🚀 Job Portal - How to Run the Project

## ⚠️ IMPORTANT: This is NOT a static HTML project!

This is a **Node.js + Express server** that uses **EJS templates** and serves the website dynamically.

## 📂 Project Structure Understanding

```
hello4-main/
├── app.js                    ← Main server file (RUN THIS!)
├── public/js/main.js         ← Main JavaScript (UPDATED)
├── public/src/modules/       ← Updated modules with Firebase
├── views/pages/              ← EJS templates (UPDATED)
└── views/partials/           ← Template components
```

## 🏃‍♂️ **How to Run (Step by Step)**

### Step 1: Navigate to Project Directory
```bash
cd hello4-main
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Server
```bash
npm start
# OR
node app.js
```

### Step 4: Access the Website
Open your browser and go to:
```
http://localhost:3050
```

## ✅ **What Should Work Now:**

### 🌍 **Language Switching (TR/EN)**
- Click the language switcher in the top-right corner
- Switch between Turkish and English
- All content should translate instantly

### 🏠 **Homepage Features**
- **Hero Section**: Search functionality
- **Featured Jobs**: Dynamic job cards
- **Categories**: Interactive job categories
- **Statistics**: Company logos and counters

### 👤 **Authentication System**
- Click "Giriş Yap" (Login) or "Kayıt Ol" (Register)
- Test with Firebase authentication
- User profile management

### 📞 **Contact Form (Firebase Integration)**
- Go to Help page
- Fill out the contact form
- Messages are saved to Firebase Firestore

### 🔧 **Admin Panel**
- Log in with email: `admin@jobportal.com`
- Admin link appears in profile dropdown
- Access job management features

## 🔥 **Firebase Configuration Required**

The contact form and authentication need Firebase setup:

1. **Update Firebase Config** in `/public/src/firebase/config.js`:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

2. **Enable Firebase Services**:
   - Authentication (Email/Password + Google)
   - Firestore Database
   - Create `contacts` collection

## 🛠 **Development Mode**

For development with auto-restart:
```bash
npm install -g nodemon
nodemon app.js
```

## 📱 **Testing the Features**

### Test Language Switching:
1. Open the website
2. Click the language button (EN/TR)
3. Verify all text changes language

### Test Job Display:
1. Check homepage for featured jobs
2. Click on categories
3. Verify job filtering works

### Test Admin Features:
1. Login as admin@jobportal.com
2. Check profile dropdown for admin link
3. Access admin panel and manage jobs

### Test Contact Form:
1. Go to Help page
2. Fill contact form
3. Submit and check Firebase console

## 🐛 **Troubleshooting**

### Problem: "Cannot GET /"
**Solution**: Make sure you're running `node app.js` or `npm start`, not opening index.html directly

### Problem: Language switching not working
**Solution**: Check browser console for JavaScript errors. Make sure `public/js/main.js` is loading.

### Problem: Jobs not displaying
**Solution**: The project falls back to mock data if database connection fails. Check console for API errors.

### Problem: Contact form not working
**Solution**: Verify Firebase configuration is correct and services are enabled.

## 📞 **Support**

If you encounter issues:
1. Check browser console for errors
2. Verify you're running the Node.js server
3. Ensure all dependencies are installed
4. Check Firebase configuration

---

## 🎯 **Key Files Modified:**

1. **`public/js/main.js`** - Complete rewrite with all features
2. **`public/src/modules/help.js`** - Firebase contact form integration  
3. **`public/src/modules/profile.js`** - Admin functionality added
4. **`views/pages/index.ejs`** - Updated to work with JavaScript rendering
5. **`views/partials/navbar.ejs`** - Language switcher and UI elements

The project now includes:
- ✅ Complete bilingual support (TR/EN)
- ✅ Firebase authentication & Firestore integration
- ✅ Admin dashboard with job management
- ✅ Dynamic homepage with featured jobs & categories
- ✅ Contact form with Firebase storage
- ✅ Responsive design and modern UI
