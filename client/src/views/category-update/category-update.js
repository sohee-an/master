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

const categoryContainer = document.querySelector('#categoryContainer');
const modal = document.querySelector("#modal");
const form = document.querySelector('#submitForm');
const formContainer = document.querySelector(".form-container");
const updateCompleteBtn = document.querySelector("#updateCompleteBtn");
const deleteCompleteBtn = document.querySelector("#deleteCompleteBtn");
const closeBtn = document.querySelectorAll(".close");
const largeCategoryInput = document.querySelector('#largeCategoryInput');
const mediumCategoryInput = document.querySelector('#mediumCategoryInput');

getCategories();


// 카테고리 목록 가져오기
async function getCategories() {
  const res = await Api.get('/api/categories');

  res.forEach(el => {
    const { _id, largeCategory, mediumCategory } = el;

    const column = `<div class="columns orders-item" id="product-${_id}">
      <div class="column">${largeCategory}</div>
      <div class="column">${mediumCategory}</div>
      <div class="column">
        <button class="tag update-btn" id="updateBtn-${_id}">수정하기</button>
      </div>
      <div class="column">
        <button class="tag is-danger delete-btn" id="deleteBtn-${_id}">삭제하기</button>
      </div>
    </div>
    `
    categoryContainer.insertAdjacentHTML('beforeend', column);
  })

  initEventHandlers();
}

// 이벤트 핸들러
function initEventHandlers() {
  const updateBtn = document.querySelectorAll(".update-btn");
  const deleteBtn = document.querySelectorAll(".delete-btn");

  // 수정 버튼
  updateBtn.forEach(el => {
    el.addEventListener('click', updateCategory);
  })

  // 삭제 버튼
  deleteBtn.forEach(el => {
    el.addEventListener('click', deleteCategory);
  })

  // 모달창 닫기
  closeBtn.forEach(el => {
    el.addEventListener('click', closeModal);
  })
}

// 카테고리 수정
function updateCategory(e) {
  e.preventDefault();
  openForm(e);
  const categoryId = e.target.id.slice(10);

  updateCompleteBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const largeCategory = largeCategoryInput.value;
      const mediumCategory = mediumCategoryInput.value;
      const data = { largeCategory, mediumCategory };

      await Api.patch('/api/categories', categoryId, data);
      alert('카테고리 수정이 완료되었습니다.');
      window.location.reload();
    } catch (err) {
      alert(`카테고리 수정 과정에서 오류가 발생하였습니다: ${err.message}`);
    }
  })
}

// 상품 삭제
async function deleteCategory(e) {
  // 모달창 열기
  openModal(e);
  const categoryId = e.target.id.slice(10);

  // 상품 삭제
  deleteCompleteBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await Api.delete('/api/categories', categoryId);
    alert('카테고리가 삭제되었습니다.');
    window.location.reload();
  })
}

// 폼 열기
async function openForm(e) {
  e.preventDefault();
  formContainer.classList.add('is-active');
  document.body.classList.add('scroll-lock');
}

// 모달창 열기 / 닫기
function openModal(e) {
  e.preventDefault();
  modal.classList.add("is-active");
}

function closeModal(e) {
  e.preventDefault();
  modal.classList.remove("is-active");
  formContainer.classList.remove("is-active");
  document.body.classList.remove('scroll-lock');
}