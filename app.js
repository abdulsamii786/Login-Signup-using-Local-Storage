let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;

let loader = document.querySelector(".loading");
let error = document.getElementById("error");
let signUpFormFields = document.querySelectorAll("form input");
const [
  signUpName,
  signUpEmail,
  signUpPass,
  confirmSignUpPass,
  signUpMale,
  signUpFemale,
  signUpImage,
] = signUpFormFields;
let imageUrl;

const signUp = () => {
  event.preventDefault();
  if (
    signUpName.value.trim() === "" ||
    signUpEmail.value.trim() === "" ||
    signUpPass.value.trim() === "" ||
    confirmSignUpPass.value.trim() === ""
  ) {
    error.innerText = "Invalid Input(s)";
  } else {
    error.innerText = "";
    if (
      emailRegex.test(signUpEmail.value) &&
      passwordRegex.test(signUpPass.value)
    ) {
      if (signUpPass.value === confirmSignUpPass.value) {
        document.body.style.overflow = "hidden";
        loader.classList.add("load");
        let obj = {
          signUpName: signUpName.value,
          signUpEmail: signUpEmail.value,
          signUpPass: signUpPass.value,
          signUpImage: imageUrl,
        };
        localStorage.setItem("userData", JSON.stringify(obj));
        setTimeout(() => {
          loader.classList.remove("load");
          window.location.href = "./login.html";
        }, 2000);
      } else {
        error.innerText = "Password do not match";
      }
    } else {
      error.innerText = "Invalid Email Or Password";
    }
  }
};

const uploadImage = () => {
  let image = signUpImage.files[0];
  let fileRead = new FileReader();
  fileRead.onload = () => {
    imageUrl = fileRead.result;
  };
  fileRead.readAsDataURL(image);
};

let loginError = document.getElementById("loginError");
let loginFormFields = document.querySelectorAll("form input");
const [loginEmail, loginPassword] = loginFormFields;

let getData = JSON.parse(localStorage.getItem("userData"));

const login = () => {
  event.preventDefault();
  if (loginEmail.value !== "" && loginPassword.value !== "") {
    loginError.innerText = "";
    if (getData.signUpEmail === loginEmail.value) {
      loginError.innerText = "";
      if (getData.signUpPass === loginPassword.value) {
        loginError.innerText = "";
        document.body.style.overflow = "hidden";
        loader.classList.add("load");
        setTimeout(() => {
          loader.classList.remove("load");
          window.location.href = "./dashboard.html";
        }, 2000);
      } else {
        loginError.innerText = "Invalid Password";
      }
    } else {
      loginError.innerText = "Invalid Email";
    }
  } else {
    loginError.innerText = "Invalid Credentials";
  }
};

let showUserName = document.getElementById("showUserName");
let showUserImage = document.getElementById("showUserImg");

const showData = () => {
  showUserName.innerText = getData.signUpName;
  showUserImage.src = getData.signUpImage;
};
showData();

const logout = () => {
  document.body.style.overflow = "hidden";
  loader.classList.add("load");
  setTimeout(() => {
    loader.classList.remove("load");
    window.location.href = "./index.html";
  }, 2000);
  localStorage.clear();
};

// let getEyelogin = document.getElementById("eyelogin");
// let loginPassToggle = document.getElementById("loginPass");
// let isOpen = false;

// const toggleEyeLogin = () => {
//   // isOpen = !isOpen;
//   // if (isOpen) {
//   //   getEyelogin.className = "fa-solid fa-eye-slash";
//   //   loginPassToggle.type = "text";
//   // } else {
//   //   getEyelogin.className = "fa-solid fa-eye";
//   //   loginPassToggle.type = "password";
//   // }
// };
