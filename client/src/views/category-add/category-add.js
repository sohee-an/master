import { sidebar } from "../../common/sidebar/sidebar.js";
import { changeNavbar, handleLogoutBtn } from "../../common/navbar/navbar.js";
import * as Api from "../../api.js";
sidebar();
changeNavbar();
handleLogoutBtn();

// 관리자 로그인 X -> 접근 불가
if (localStorage.getItem("role") !== "admin") {
  alert('관리자 전용 페이지입니다.');
  window.location.href = "/";

}

const submitBtn = document.querySelector('#submitBtn');
const largeCategoryInput = document.querySelector('#largeCategoryInput');
const mediumCategoryInput = document.querySelector('#mediumCategoryInput');

submitBtn.addEventListener('click', addCategory);

async function addCategory(e) {
  e.preventDefault();

  try {
    const largeCategory = largeCategoryInput.options[largeCategoryInput.selectedIndex].value;
    const mediumCategory = mediumCategoryInput.value;

    const data = { largeCategory, mediumCategory };
    await Api.post('/api/categories/register', data);
    alert('카테고리 추가가 완료되었습니다.');
    window.location.reload();
  } catch (err) {
    alert(`카테고리 저장 과정에서 오류가 발생하였습니다: ${err.message}`);
    window.location.reload();
  }
}