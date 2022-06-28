import { sidebar } from "../common/sidebar/sidebar.js";
import { changeNavbar, handleLogoutBtn } from "../common/navbar/navbar.js";
// import * as Api from "../api.js";
sidebar();
changeNavbar();
handleLogoutBtn();

// 로그인X -> 로그인 페이지로
if (!localStorage.getItem("token")) {
  window.location.href = "../login";
}