import { sidebar } from "../../common/sidebar/sidebar.js";
import { changeNavbar, handleLogoutBtn } from "../../common/navbar/navbar.js";
import * as Api from '../../api.js';
sidebar();
changeNavbar();
handleLogoutBtn();

const submitBtn = document.querySelector(".form-box .button");
const passwordInput = document.querySelector("#password");
const modal = document.querySelector(".modal");
const yesBtn = document.querySelector('#deleteCompleteBtn');
const closeBtn = document.querySelectorAll('.close');

// 로그인X -> 로그인 페이지로
if (!localStorage.getItem("token")) {
  window.location.href = "../../login";
}

// 회원정보 삭제 버튼 클릭시 모달창 띄움
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('is-active');
})

// 모달창 닫기
closeBtn.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('is-active');
  })
})

// 모달창 yes 버튼 클릭 시
yesBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const userId = parseJwt(token).userId;
    const password = passwordInput.value;

    const res = await Api.delete("/api/del", userId, { password });
    console.log(res);
    alert('회원 정보가 안전하게 삭제되었습니다.');
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/"
  } catch (err) {
    alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err.message}`);
  }
})

// Decode token
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}