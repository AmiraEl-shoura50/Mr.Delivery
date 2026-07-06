// استيراد الدوال المطلوبة من الإصدار 12.14.0
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";

// بيانات الاتصال الخاصة بمشروعك على Firebase
 const firebaseConfig = {
  apiKey: "AIzaSyA2L9YImlJS56duMH3EuQgSmHz8fEUlmXY",
  authDomain: "test-8038c.firebaseapp.com",
  databaseURL: "https://test-8038c-default-rtdb.firebaseio.com",
  projectId: "test-8038c",
  storageBucket: "test-8038c.firebasestorage.app",
  messagingSenderId: "999761018383",
  appId: "1:999761018383:web:2d4950b28f7ac2e2126d7a",
  measurementId: "G-Z7EDJW909B"
};

// منع إعادة تهيئة التطبيق إذا كان يعمل بالفعل
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// تهيئة الخدمات
const database = getDatabase(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// تصدير المتغيرات لصفحة الداشبورد وباقي الصفحات
export { app, database, analytics };