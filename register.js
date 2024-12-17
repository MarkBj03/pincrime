// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
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
function showPopupMessage(message, isSuccess) {
    const popup = isSuccess ? document.getElementById("popup-success") : document.getElementById("popup-error");
    const popupMessage = isSuccess ? document.getElementById("popup-message-success") : document.getElementById("popup-message-error");
    const popupClose = isSuccess ? document.getElementById("popup-close-success") : document.getElementById("popup-close-error");

    // Set the message text
    message = message.replace(/\n/g, '<br>');
    message = "<span class='popup-bold-center'>Success!</span>" + message;
    popupMessage.innerHTML = message;

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
    }, 2000);
}
function showPopupMessageError(message, isSuccess) {
    const popup = isSuccess ? document.getElementById("popup-success") : document.getElementById("popup-error");
    const popupMessage = isSuccess ? document.getElementById("popup-message-success") : document.getElementById("popup-message-error");
    const popupClose = isSuccess ? document.getElementById("popup-close-success") : document.getElementById("popup-close-error");

    // Set the message text
    message = message.replace(/\n/g, '<br>');
    message = "<span class='popup-bold-center'>Failed!</span>" + message;
    popupMessage.innerHTML = message;

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
    }, 2000);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const errorContainer = document.getElementById('error-message'); // Div for error messages
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default page reload behavior

    const email = document.getElementById('email').value;
    const password1 = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    if (password1 !== password2) {
        showPopupMessageError("Password does not match!", false); // Show error popup
    } else if (password1.length < 6) {
        showPopupMessage("Password must be at least 6 characters long!", false); // Show error popup
    } else {
        createUserWithEmailAndPassword(auth, email, password1)
            .then((userCredential) => {
                const user = userCredential.user;
                

                sendEmailVerification(user)
                    .then(() => {
                        showPopupMessage("Account Created Please Verify Email!", true); // Show success popup
                        setTimeout(() => {
                            window.location.href = "login.html"; // Redirect to login page
                        }, 5000); // 5000ms (5 seconds)
                    })
                    .catch((error) => {
                        console.error("Error sending email verification:", error.message);
                        showPopupMessage("Error sending verification email: " + error.message, false); // Show error popup
                    });
            })
            .catch((error) => {
                const errorMessage = error.message;
                showPopupMessageError("Email Already in Use!"); // Show error popup
            });
    }
});


