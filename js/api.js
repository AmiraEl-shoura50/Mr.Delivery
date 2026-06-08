// استيراد الدوال المطلوبة من الإصدار 12.14.0
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";

// بيانات الاتصال الخاصة بمشروعك على Firebase
 const firebaseConfig = {
    apiKey: "AIzaSyDrQSzTcME1eSRXCRFIZ7r5VvDSkhmOaS4",
    authDomain: "mr-delivery-4d789.firebaseapp.com",
    projectId: "mr-delivery-4d789",
    storageBucket: "mr-delivery-4d789.firebasestorage.app",
    messagingSenderId: "988756110589",
    appId: "1:988756110589:web:4dae3c5eb77809b57d6294",
    measurementId: "G-Z480L3MDHH"
  };
  
// منع إعادة تهيئة التطبيق إذا كان يعمل بالفعل
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// تهيئة الخدمات
const database = getDatabase(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// تصدير المتغيرات لصفحة الداشبورد وباقي الصفحات
export { app, database, analytics };