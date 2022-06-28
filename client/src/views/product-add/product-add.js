import { sidebar } from "../../common/sidebar/sidebar.js";
import { changeNavbar, handleLogoutBtn } from "../../common/navbar/navbar.js";
sidebar();
changeNavbar();
handleLogoutBtn();

const imageInput = document.querySelector("#imageInput");
const searchKeywordInput = document.querySelector("#searchKeywordInput");
const fileNameSpan = document.querySelector("#fileNameSpan");
const addKeywordBtn = document.querySelector("#addKeywordBtn");
const keywordContainer = document.querySelector("#keywordContainer");
const submitBtn = document.querySelector("#submitBtn");
const submitForm = document.querySelector("#submitForm");

// 관리자 로그인 X -> 접근 불가
if (localStorage.getItem("role") !== "admin") {
  alert('관리자 전용 페이지입니다.');
  window.location.href = "/";
}

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(submitForm);

    const name = formData.get("name")
    const price = formData.get("price");
    const description = formData.get("description");
    const brand = formData.get("brand");
    const largeCategory = formData.get("largeCategory");
    const mediumCategory = formData.get("mediumCategory");
    const img = formData.get("img");

    if (!name || !price || !description || !brand || !largeCategory || !mediumCategory || !img) {
      return alert('상품 정보를 모두 기입해 주세요')
    }

    await fetch("/api/products/register", {
      method: "POST",
      body: formData
    })

    alert('상품 추가가 완료되었습니다.');
    window.location.href = "/admin";

  } catch (err) {
    alert(`상품 추가 과정에서 오류가 발생하였습니다: ${err.message}`);
  }
})

// 사진 업로드 하면 fileNameSpan.innerText = 파일 이름
imageInput.addEventListener("input", () => {
  fileNameSpan.innerText = imageInput.value.substr(12);
})

