import { sidebar } from '../../common/sidebar/sidebar.js'
import { changeNavbar, handleLogoutBtn } from '../../common/navbar/navbar.js';


sidebar();
changeNavbar();
handleLogoutBtn();

const historyBtnElem = document.querySelector("#history-btn");
const continueBtnElem = document.querySelector("#continue-btn");


handleAllEvent();

function handleAllEvent() {
    historyBtnElem.addEventListener("click", () => {
        window.location.href = "/order/history";
    })
    continueBtnElem.addEventListener("click", () => {
        window.location.href = "/";
    })
}

function createOrderList() {
    let items = getCartItems();
    console.log(items);
    let newItems = ``;
    if (items.length == 0) newItems = `<li>장바구니가 비어있습니다.</li>`;
    else newItems = items.reduce((acc, cur) => {
        return acc + `<li id="item${cur.item}">

    </li>
    `}, ``);
    itemListElem.innerHTML = newItems;
    getPaymentInfo();

}