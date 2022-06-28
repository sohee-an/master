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

const productsContainer = document.querySelector("#productsContainer");
const modal = document.querySelector("#modal");
const form = document.querySelector('#submitForm');
const formContainer = document.querySelector(".form-container");
const updateCompleteBtn = document.querySelector("#updateCompleteBtn");
const deleteCompleteBtn = document.querySelector("#deleteCompleteBtn");
const closeBtn = document.querySelectorAll(".close");

const titleInput = document.querySelector('#titleInput');
const largeCategoryInput = document.querySelector('#largeCategory');
const mediumCategoryInput = document.querySelector('#mediumCategory');
const brandInput = document.querySelector('#brandInput');
const shortDescInput = document.querySelector('#shortDescInput');
const imageInput = document.querySelector('#imageInput');
const priceInput = document.querySelector('#priceInput');
const fileNameSpan = document.querySelector('#fileNameSpan');

getProducts();

// 상품 목록 가져오기
async function getProducts() {
  const res = await Api.get('/api/products');

  res.forEach(el => {
    const { _id, name, category_id, brand, price } = el;

    const column = `<div class="columns orders-item" id="product-${_id}">
      <div class="column is-3">${name}</div>
      <div class="column">${category_id.largeCategory}</div>
      <div class="column">${category_id.mediumCategory}</div>
      <div class="column is-one-fifth">${brand}</div>
      <div class="column">${price}</div>
      <div class="column">
        <button class="tag update-btn" id="updateBtn-${_id}">수정하기</button>
      </div>
      <div class="column">
        <button class="tag is-danger delete-btn" id="deleteBtn-${_id}">삭제하기</button>
      </div>
    </div>
    `
    productsContainer.insertAdjacentHTML('beforeend', column);
  })

  initEventHandlers();
}

// 이벤트 핸들러
function initEventHandlers() {
  const updateBtn = document.querySelectorAll(".update-btn");
  const deleteBtn = document.querySelectorAll(".delete-btn");

  // 상품 수정 버튼
  updateBtn.forEach(el => {
    el.addEventListener('click', updateProduct);
  })

  // 상품 삭제 버튼
  deleteBtn.forEach(el => {
    el.addEventListener('click', deleteProduct);
  })

  // 모달창 닫기
  closeBtn.forEach(el => {
    el.addEventListener('click', closeModal);
  })

  // 사진 업로드 하면 fileNameSpan.innerText = 파일 이름
  imageInput.addEventListener("input", () => {
    fileNameSpan.innerText = imageInput.value.substr(12);
  })
}

// 상품 수정
async function updateProduct(e) {
  e.preventDefault();
  openForm(e);

  const productId = e.target.id.slice(10);
  const { name, brand, description, image, price, category_id } = await Api.get('/api/products', productId);

  titleInput.value = name;
  brandInput.value = brand;
  shortDescInput.value = description;
  fileNameSpan.innerText = image;
  priceInput.value = price;

  const largeOptions = document.querySelectorAll('#largeCategory option');
  const mediumOptions = document.querySelectorAll('#mediumCategory option');
  largeOptions.forEach(el => {
    if (el.value === category_id.largeCategory) {
      el.selected = true;
    }
  });
  mediumOptions.forEach(el => {
    if (el.value === category_id.mediumCategory) {
      el.selected = true;
    }
  });

  updateCompleteBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(form);
      await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        body: formData
      })
      alert('상품 수정이 완료되었습니다.');
      window.location.reload();
    }
    catch (err) {
      alert(`상품 수정 과정에서 오류가 발생하였습니다.: ${err.message}`);
      window.location.reload();
    }
  })
}

// 상품 삭제
async function deleteProduct(e) {
  // 모달창 열기
  openModal(e);
  const productId = e.target.id.slice(10);

  // 상품 삭제
  deleteCompleteBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await Api.delete('/api/products', productId);
    alert('상품 정보가 안전하게 삭제되었습니다.');
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