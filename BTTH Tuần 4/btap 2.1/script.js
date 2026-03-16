const form = document.getElementById("registerForm");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm");
const terms = document.getElementById("terms");
const fullnameCount = document.getElementById("fullnameCount");
const togglePassword = document.getElementById("togglePassword");
const passwordStrengthBar = document.getElementById("passwordStrengthBar");
const passwordStrengthText = document.getElementById("passwordStrengthText");

function showError(id, message){
document.getElementById(id+"Error").textContent = message;
document.getElementById(id).classList.add("errorInput");
}

function clearError(id){
document.getElementById(id+"Error").textContent = "";
document.getElementById(id).classList.remove("errorInput");
document.getElementById(id).classList.add("validInput");
}
function validateFullname(){

const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
const value = fullname.value.trim();

if(value.length < 3){
showError("fullname","Tên phải ≥ 3 ký tự");
return false;
}

if(!regex.test(value)){
showError("fullname","Tên chỉ chứa chữ");
return false;
}

clearError("fullname");
return true;
}

function updateFullnameCount() {
  const len = fullname.value.length;
  fullnameCount.textContent = `${len}/50`;
  if (len > 50) {
    fullnameCount.style.color = '#d32f2f';
  } else {
    fullnameCount.style.color = '#555';
  }
}

function updatePasswordStrength() {
  const value = password.value;
  const hasLower = /[a-z]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecial = /[\W_]/.test(value);
  const lengthOk = value.length >= 8;

  if (!value) {
    passwordStrengthBar.className = 'strength-bar';
    passwordStrengthText.textContent = '';
    return;
  }

  let score = 0;
  if (lengthOk) score++;
  if (hasLower) score++;
  if (hasUpper) score++;
  if (hasNumber) score++;
  if (hasSpecial) score++;

  if (!lengthOk || score <= 2) {
    passwordStrengthBar.className = 'strength-bar weak';
    passwordStrengthText.textContent = 'Yếu';
  } else if (score <= 4) {
    passwordStrengthBar.className = 'strength-bar medium';
    passwordStrengthText.textContent = 'Trung bình';
  } else {
    passwordStrengthBar.className = 'strength-bar strong';
    passwordStrengthText.textContent = 'Mạnh';
  }
}

function togglePasswordVisibility() {
  const isPassword = password.type === 'password';
  password.type = isPassword ? 'text' : 'password';
  togglePassword.textContent = isPassword ? '🙈' : '👁';
}

function validateEmail(){
if(email.value.trim() === ""){
showError("email","Email không được để trống");
return false;
}   

const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!regex.test(email.value)){
showError("email","Email không hợp lệ");
return false;
}
clearError("email");
return true;
}
function validatePhone(){

if(phone.value.trim() === ""){
showError("phone","SĐT không được để trống");
return false;
}    

const regex=/^0[0-9]{9}$/;

if(!regex.test(phone.value)){
showError("phone","SĐT phải 10 số bắt đầu bằng 0");
return false;
}

clearError("phone");
return true;
}
function validatePassword(){
if(password.value.trim() === ""){
showError("password","Mật khẩu không được để trống");
return false;
}
const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

if(!regex.test(password.value)){
showError("password","Mật khẩu ≥8 ký tự có hoa thường và số");
return false;
}

clearError("password");
return true;
}
function validateConfirm(){

if(confirm.value !== password.value){
showError("confirm","Mật khẩu không khớp");
return false;
}

clearError("confirm");
return true;
}
function validateGender(){

const gender=document.querySelector("input[name='gender']:checked");

if(!gender){
document.getElementById("genderError").textContent="Phải chọn giới tính";
return false;
}

document.getElementById("genderError").textContent="";
return true;
}
function validateTerms(){

if(!terms.checked){
document.getElementById("termsError").textContent="Phải đồng ý điều khoản";
return false;
}

document.getElementById("termsError").textContent="";
return true;
}
form.addEventListener("submit",function(e){

e.preventDefault();

const valid =
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirm() &
validateGender() &
validateTerms();

if(valid){

form.style.display="none";

document.getElementById("success").innerHTML =
"Đăng ký thành công 🎉 Xin chào "+fullname.value;

}

});
fullname.addEventListener("blur",validateFullname);
email.addEventListener("blur",validateEmail);
phone.addEventListener("blur",validatePhone);
password.addEventListener("blur",validatePassword);
confirm.addEventListener("blur",validateConfirm);
fullname.addEventListener("input",() => {
  clearError("fullname");
  updateFullnameCount();
});
email.addEventListener("input",()=>clearError("email"));
phone.addEventListener("input",()=>clearError("phone"));
password.addEventListener("input",() => {
  clearError("password");
  updatePasswordStrength();
});
confirm.addEventListener("input",()=>clearError("confirm"));

togglePassword.addEventListener("click", togglePasswordVisibility);

// Initial UI state
updateFullnameCount();
updatePasswordStrength();