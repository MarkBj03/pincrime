

const firebaseConfig = {
    apiKey: "AIzaSyB5AWgEqw8cpp7XibuKt6PYOENxQcrmIQA",
    authDomain: "loginsignup-e35d7.firebaseapp.com",
    projectId: "loginsignup-e35d7",
    storageBucket: "loginsignup-e35d7.firebasestorage.app",
    messagingSenderId: "373239397832",
    appId: "1:373239397832:web:0941172f776a9303f654fd"
};

firebase.initializeApp(firebaseConfig);


render();
function render() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
}
function redirectToIndex() {
    window.location.href = 'index.html';
}

function sendOTP() {
    var number = document.getElementById('number').value;
    firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier).then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        coderesult = confirmationResult;
        document.querySelector('.number-input').style.display = 'none';
        document.querySelector('.verification').style.display = '';
    }).catch(function (error) {

        alert(error.message);
    });
}

function verifyCode() {
    var code = document.getElementById('verificationCode').value;
    coderesult.confirm(code).then(function () {
        document.querySelector('.verification').style.display = 'none';
        document.querySelector('.result').style.display = '';
        document.querySelector('.correct').style.display = '';
        console.log('OTP Verified');
    }).catch(function () {
        document.querySelector('.verification').style.display = 'none';
        document.querySelector('.result').style.display = '';
        document.querySelector('.incorrect').style.display = '';
        console.log('OTP Not correct');
    })
}
