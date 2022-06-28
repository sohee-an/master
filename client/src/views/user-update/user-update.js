import { sidebar } from "../../common/sidebar/sidebar.js";
import { changeNavbar, handleLogoutBtn } from "../../common/navbar/navbar.js";
import * as Api from "../../api.js";
sidebar();
changeNavbar();
handleLogoutBtn();

const switchBtn = document.querySelectorAll(".switch");
const submitBtn = document.querySelector(".button-submit");
const modal = document.querySelector(".modal");
const saveBtn = document.querySelector("#saveCompleteBtn");
const closeBtn = document.querySelectorAll(".close");
const userEmail = document.querySelector("#userEmail");

const input = document.querySelectorAll(".input:not(#currentPassword), button.input-switch");
const fullNameInput = document.querySelector("#name");
const passwordInput = document.querySelector("#password");
const passwordConfirmInput = document.querySelector("#password-confirm");
const postalCodeInput = document.querySelector("#sample4_postcode");
const address1Input = document.querySelector("#sample4_roadAddress");
const address2Input = document.querySelector("#sample4_detailAddress");
const phoneNumberInput = document.querySelector("#phoneNumber");
const currentPasswordInput = document.querySelector('#currentPassword');

initEventHandler();
getUserInfo();

// 로그인X -> 로그인 페이지로
if (!localStorage.getItem("token")) {
  window.location.href = "../../login";
}

function initEventHandler() {
  // input 스위치 기능
  switchBtn.forEach((el) => { el.addEventListener("click", handleSwitch) });

  // 저장하기 버튼 클릭 시 모달창 띄움
  submitBtn.addEventListener("click", openModal);

  // 모달창 닫기
  closeBtn.forEach((el) => { el.addEventListener('click', closeModal) });

  // 모달창 저장 완료 버튼 클릭 시 회원정보 저장
  saveBtn.addEventListener("click", saveUserInfo);
}

// 화면 로드 되었을 때 
// 회원 정보를 input에 표시, 제목에 userEmail 표시
async function getUserInfo() {
  const token = localStorage.getItem("token");
  const userId = parseJwt(token).userId;

  const { fullName, email, phoneNumber, address } = await Api.get('/api/basicUserInfo', userId);

  fullNameInput.value = fullName;
  userEmail.innerText = email;
  if (phoneNumber) {
    phoneNumberInput.value = phoneNumber;
  }
  if (address) {
    postalCodeInput.value = address.postalCode;
    address1Input.value = address.address1;
    address2Input.value = address.address2;
  }
}

// 회원정보 저장
async function saveUserInfo(e) {
  e.preventDefault();

  const fullName = fullNameInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const postalCode = postalCodeInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;
  const phoneNumber = phoneNumberInput.value;
  const currentPassword = currentPasswordInput.value;

  if (!password || !passwordConfirm) {
    alert("비밀번호를 입력해주세요.");
    return;
  }

  if (password && password.length < 4) {
    alert("비밀번호가 4글자 이상인지 확인해주세요.");
    return;
  }

  if (password && passwordConfirm && password !== passwordConfirm) {
    alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const userId = parseJwt(token).userId;

    const data = {
      fullName,
      password,
      address: {
        postalCode,
        address1,
        address2
      },
      phoneNumber,
      currentPassword
    };
    const result = await Api.patch("/api/users", userId, data);
    console.log(result);

    alert('회원정보가 안전하게 저장되었습니다.');
    modal.classList.remove("is-active");
    switchBtn.forEach(el => { el.classList.remove('is-active') });
    input.forEach(el => { el.disabled = true; });
  } catch (err) {
    alert(`회원정보 저장 과정에서 오류가 발생하였습니다: ${err.message}`);
  }
}

// Decode token
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

// 모달창 열기 / 닫기
function openModal(e) {
  e.preventDefault();
  modal.classList.add("is-active");
}

function closeModal(e) {
  e.preventDefault();
  modal.classList.remove("is-active");
}

// input 스위치 기능
function handleSwitch(e) {
  if (
    e.target.classList.contains("password") ||
    e.target.classList.contains("address")
  ) {
    multiSwitch(e);
  } else {
    singleSwitch(e);
  }
}

function singleSwitch(e) {
  const input = e.target.previousElementSibling;
  const checkbox = e.target.querySelector(".checkbox");

  if (!e.target.classList.contains("is-active")) {
    checkbox.checked = true;
    input.disabled = false;
    input.focus();
    input.classList.add("is-active");
    e.target.classList.add("is-active");
  } else {
    checkbox.checked = false;
    input.disabled = true;
    input.classList.remove("is-active");
    e.target.classList.remove("is-active");
  }
}

function multiSwitch(e) {
  const password = document.querySelector(".password-container");
  const address = document.querySelector(".address-container");

  if (e.target.classList.contains("password")) {
    const input = password.querySelectorAll(".input-switch");
    main(input);
  } else {
    const input = address.querySelectorAll(".input-switch");
    main(input);
  }

  function main(input) {
    if (!e.target.classList.contains("is-active")) {
      input.forEach((el) => {
        el.disabled = false;
        el.focus();
        el.classList.add("is-active");
      });
      e.target.classList.add("is-active");
    } else {
      input.forEach((el) => {
        el.disabled = true;
        el.classList.remove("is-active");
      });
      e.target.classList.remove("is-active");
    }
  }
}