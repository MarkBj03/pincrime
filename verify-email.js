import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCmC3f0_VVkVpnFULh3HZ8pufC6mtkIkCQ",
    authDomain: "pincrime-c733b.firebaseapp.com",
    projectId: "pincrime-c733b",
    storageBucket: "pincrime-c733b.firebasestorage.app",
    messagingSenderId: "788016617504",
    appId: "1:788016617504:web:3c07b09b068bdddfca8445"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.onload = function () {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // If email is verified, redirect to index.html
            if (user.emailVerified) {
                window.location.href = "index.html";
            } else {
                // If email is not verified, keep showing the verification prompt
                console.log("Please verify your email.");
            }
        } else {
            // If the user is not logged in, redirect to the login page
            window.location.href = "login.html";
        }
    });

    // Resend email verification
    const resendBtn = document.getElementById('resend');
    if (resendBtn) {
        resendBtn.addEventListener('click', function () {
            const user = auth.currentUser;
            if (user) {
                user.sendEmailVerification()
                    .then(() => {
                        alert('Verification email has been resent.');
                    })
                    .catch((error) => {
                        showErrorPopup(error.message);
                    });
            }
        });
    }
}

// Function to show error messages in a popup
function showErrorPopup(message) {
    const popup = document.getElementById("popup-error");
    const popupMessage = document.getElementById("popup-message-error");
    popupMessage.textContent = message;
    popup.classList.add("visible");

    // Close the popup when the close button is clicked
    document.getElementById("popup-close-error").addEventListener("click", function () {
        popup.classList.remove("visible");
    });
}
