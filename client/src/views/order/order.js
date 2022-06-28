import { sidebar } from '../common/sidebar/sidebar.js'
import { changeNavbar, handleLogoutBtn } from '../common/navbar/navbar.js';
import { getCartItems, setCartItems, getOrderInfo, setOrderInfo } from '../localStorage.js';
import { addCommas } from '../useful-functions.js';
import * as Api from '../api.js';

/////////////////////////////////////기능 추가/////////////////////////////////////

//결제 기능 iamport와 연동
const IMP = window.IMP; // 생략 가능
IMP.init("imp85022909"); // 예: imp00000000

/////////////////////////////////////기능 추가/////////////////////////////////////

sidebar();
changeNavbar();
handleLogoutBtn();

const amountElem = document.getElementById('d-amount');
const priceElem = document.getElementById('d-price');
const shippingElem = document.getElementById('d-shipping');
const totalElem = document.getElementById('d-total-price');
const purchaseBtn = document.getElementById('purchase-btn');

const getContentsElem = document.querySelector('#get-contents');
const nameElem = document.querySelector('#d-name');
const phoneNumberElem = document.querySelector('#d-phoneNumber');
const postcodeElem = document.querySelector('#sample4_postcode');
const addressElem = document.querySelector('#sample4_roadAddress');
const detailAddressElem = document.querySelector('#sample4_detailAddress');
const orderRequestElem = document.querySelector('#d-requests');
const userInputElem = document.querySelector('#d-requests-input');


/** 전역변수로 말고 재구현 **/
let totalPrice = 0;

getPaymentInfo();
callOrderInfo();
handleAllEvent();


function init() {
    if (getCartItems.empty()) {
        alert('결제할 상품이 없습니다.');
        window.location.href = '/';
    }
}

function handleAllEvent() {
    purchaseBtn.addEventListener("click", handleSubmit);
    orderRequestElem.addEventListener("change", handleSelect);
    getContentsElem.addEventListener("click", handleGet)
    window.addEventListener('beforeunload', storeOrderInfo);
}

function getPaymentInfo() {
    let items = getCartItems();

    let itemAmount = items.reduce((acc, cur) => acc + Number(cur.quantity), 0);
    let itemPrice = items.reduce((acc, cur) => acc + Number((cur.price * cur.quantity)), 0);
    let shippingPrice = itemPrice ? 100 : 0;
    totalPrice = itemPrice + shippingPrice;

    amountElem.innerText = addCommas(itemAmount) + '개';
    priceElem.innerText = addCommas(itemPrice) + ' 원';
    shippingElem.innerText = addCommas(shippingPrice) + ' 원';
    totalElem.innerText = addCommas(totalPrice) + ' 원';

}

// 사용자가 기존에 입력한 배송지정보 local storage에서 불러오기
function callOrderInfo() {
    const orderInfo = getOrderInfo();

    nameElem.value = orderInfo.name;
    phoneNumberElem.value = orderInfo.phoneNumber;
    postcodeElem.value = orderInfo.postcode;
    addressElem.value = orderInfo.address;
    detailAddressElem.value = orderInfo.detailAddress;
}

// 사용자가 입력한 배송지정보 local Storage에 저장하기
function storeOrderInfo() {

    let name = nameElem.value;
    let phoneNumber = phoneNumberElem.value;
    let postcode = postcodeElem.value;
    let address = addressElem.value;
    let detailAddress = detailAddressElem.value;
    let orderRequest = orderRequestElem.value;

    const orderInfo = {
        name,
        phoneNumber,
        postcode,
        address,
        detailAddress,
        orderRequest
    }
    setOrderInfo(orderInfo);
}


/**** 추가 구현
 * 입력된 값이 형태에 맞는지 확인
 * 
 * 
 */
async function handleSubmit(e) {
    e.preventDefault();

    let name = nameElem.value;
    let phoneNumber = phoneNumberElem.value;
    let postcode = postcodeElem.value;
    let address = addressElem.value;
    let detailAddress = detailAddressElem.value;
    let orderRequest = orderRequestElem.value;
    if (orderRequest == 'userinput') orderRequest = userInputElem.value;

    console.log(orderRequest);
    if (!localStorage.getItem('token')) { // 로그인 안되어있을 경우
        window.location = '/login';
        return;
    }

    if (!name || !phoneNumber || !postcode || !detailAddress || !address) { // 주문 정보 필드 입력이 완료되지 않았을 경우

        return alert(`주문 정보를 입력해주세요.`);
    }

    if (getCartItems().length == 0) {   // 장바구니에 물건이 담겨있지 않는 경우
        alert(`구매할 제품이 없습니다. 제품을 선택해주세요.`);
        window.location.href = '/products';
        return;
    }


    try {
        const cartItems = getCartItems().map(item => { return { id: item.id, quantity: item.quantity } });
        console.log(cartItems);

        const data = {
            name,
            phoneNumber,
            address: {
                postalCode: postcode,
                address1: address,
                address2: detailAddress,
            },
            orderRequest,
            cartItems,
            totalPrice
        };

        console.log(data);

        const order = await Api.post('/api/orders', data);
        const user = await Api.get(`/api/basicUserInfo/${order.userId}`);


        /////////////////////////////////////기능 추가/////////////////////////////////////

        // IMP.request_pay(param, callback) 결제창 호출
        IMP.request_pay({ // param
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: order._id,
            name: `${getCartItems()[0].name} 외 ${getCartItems().length - 1} 건`,
            amount: totalPrice,
            buyer_email: user.email,
            buyer_name: order.name,
            buyer_tel: order.phoneNumber,
            buyer_addr: `${order.address.address1} ${order.address.address2}`,
            buyer_postcode: `${order.address.postalCode}`
        }, async function (rsp) { // callback
            console.log(rsp);
            if (rsp.success) { // 결제 성공 시: 결제 승인 또는 가상계좌 발급에 성공한 경우
                // jQuery로 HTTP 요청
                const rspData = {
                    imp_uid: rsp.imp_uid,
                    merchant_uid: rsp.merchant_uid
                }
                await jQuery.ajax({
                    url: "/api/payments/complete", // 예: https://www.myservice.com/payments/complete
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    data: JSON.stringify(rspData)
                }).done(function (data) {
                    // 가맹점 서버 결제 API 성공시 로직
                    switch (data.status) {
                        case "vbankIssued":
                            // 가상계좌 발급 시 로직
                            break;
                        case "success":
                            alert(`주문 및 결제가 완료되었습니다.`);
                            setCartItems([]);
                            window.location.href = '/order/complete';
                            break;
                    }
                })
            } else {
                Api.delete('/api/orders', order._id);
                alert("결제에 실패하였습니다. 에러 내용: " + rsp.error_msg);
            }
        });

        /////////////////////////////////////기능 추가/////////////////////////////////////

        // 로그인 페이지 이동

    } catch (err) {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}

function handleSelect() {

    if (orderRequestElem.value == "userinput") {
        userInputElem.classList.remove("user-input-hide");
        userInputElem.classList.add("user-input-show");

        return;
    }
    userInputElem.classList.remove("user-input-show");
    userInputElem.classList.add("user-input-hide");


}

async function handleGet(e) {
    e.preventDefault();

    try {
        const token = localStorage.getItem("token");
        const userId = parseJwt(token).userId;
        const { fullName, phoneNumber, address } = await Api.get(`/api/basicUserInfo`, userId);

        console.log(phoneNumber);

        nameElem.value = fullName;
        phoneNumberElem.value = phoneNumber;
        postcodeElem.value = address.postalCode;
        addressElem.value = address.address1;
        detailAddressElem.value = address.address2;


    } catch (err) {
        console.log("Error message: " + err);
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
