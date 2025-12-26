import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDXgCl6h1gIi1NLj7dpviZ-3wSBPrK0YyA",
  authDomain: "skin-care-e40cf.firebaseapp.com",
  projectId: "skin-care-e40cf",
  storageBucket: "skin-care-e40cf.firebasestorage.app",
  messagingSenderId: "920642881184",
  appId: "1:920642881184:web:f7af47da53e500aa70ebc5",
  measurementId: "G-2B8CZYDQET",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.addEventListener("load", () => {
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userBtn = document.getElementById("userBtn");
  const userName = document.getElementById("userName");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // 🔥 FIREBASE NAME FIRST
      if (user.displayName) {
        userName.innerText = user.displayName;
      } else {
        userName.innerText = user.email.split("@")[0];
      }

      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-flex";
      userBtn.style.display = "inline-flex";
    } else {
      loginBtn.style.display = "inline-flex";
      logoutBtn.style.display = "none";
      userBtn.style.display = "none";
    }
  });
});

window.logout = function () {
  signOut(auth).then(() => (location.href = "login.html"));
};
