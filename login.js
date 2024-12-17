import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    sendEmailVerification
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

const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            if (!user.emailVerified) {
                // If email is not verified, send a verification email and direct to verify page
                sendEmailVerification(user)
                    .then(() => {
                        showPopupMessage("A verification link has been sent to your email. Please verify before logging in.", false);
                        window.location.href = "verify-email.html"; // Redirect to verify-email page
                    })
                    .catch((error) => {
                        showPopupMessage(`Error sending verification email: ${error.message}`, false);
                    });
            } else {
                // If email is verified, proceed to the main page
                window.location.href = "index.html";
            }
        })
        .catch((error) => {
            const errorCode = error.code;

            if (errorCode === 'auth/user-not-found') {
                showPopupMessage("No user found with this email. Please sign up first.", false);
            } else if (errorCode === 'auth/wrong-password') {
                showPopupMessage("Incorrect password. Please try again.", false);
            } else {
                showPopupMessage(`Login failed: ${error.message}`, false);
            }
        });
});

// Helper function to show popup messages
function showPopupMessage(message, isSuccess) {
    const popup = isSuccess ? document.getElementById("popup-success") : document.getElementById("popup-error");
    const popupMessage = isSuccess ? document.getElementById("popup-message-success") : document.getElementById("popup-message-error");
    const popupClose = isSuccess ? document.getElementById("popup-close-success") : document.getElementById("popup-close-error");

    if (!popup || !popupMessage || !popupClose) {
        console.error("Popup elements are missing in the DOM.");
        return;
    }

    // Set the message text
    const boldText = isSuccess ? "Success!" : "Failed!";
    popupMessage.innerHTML = `<span class='popup-bold-center'>${boldText}</span> ${message}`;

    // Show the popup
    popup.classList.add("visible");
    popup.classList.remove("hidden");

    // Add event listener to close button
    popupClose.addEventListener("click", () => {
        popup.classList.add("hidden");
        popup.classList.remove("visible");
    });

    // Auto-hide the popup after 5 seconds
    setTimeout(() => {
        popup.classList.add("hidden");
        popup.classList.remove("visible");
    }, 5000);
}
