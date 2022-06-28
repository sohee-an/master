import { sidebar } from '../../common/sidebar/sidebar.js'
import { changeNavbar, handleLogoutBtn } from '../../common/navbar/navbar.js';
import { addCommas } from '../../useful-functions.js';
import * as Api from '../../api.js';


sidebar();
changeNavbar();
handleLogoutBtn();

createOrderList();


// db 에서 유저의 주문내역 가져오기
async function createOrderList() {
    // const orders = await getOrderList();
    try {
        let orders = await Api.get('/api/orders');
        orders = orders.reverse();

        const orderListElem = document.querySelector('#order-list');


        const listHeader = orderListElem.innerHTML;
        const orderList = orders.reduce((acc, cur) => {
            let orderInfo = `${cur.products[0].product.name}`;

            if (cur.products.length > 1) orderInfo += ` 외  <strong>${cur.products.length - 1}</strong> 건`;

            const productListHeader = `<div class="product-header">
                주문 상품 정보
            </div>
            `;
            // 해당 주문 클릭시 보일 제품별 상세 내역

            let productList = cur.products.reduce((acc, item) => {
                return acc + `<div class="product-div" id="product-${item.product._id}">
    
                    <div class="p-img">
                        <input type="image" class="productImg" src="/uploads/${item.product.image}" onclick="window.location.href='/products/#/product/${item.product._id}'">
                    </div>
                    <div class="p-contents">    
                        <div class="p-info"> <p class="p-brand" style="color:grey;"> ${item.product.brand} </p> <strong > ${item.product.name} </strong> <br /> ${addCommas(item.product.price)} 원 / ${item.quantity} 개</div>
                        <div class="p-review"><input type="button" class="reviewBtn" value="리뷰 작성하기" onclick="window.location.href='/products/#/reviews/${item.product._id}'"></div>
                    </div>
    
                </div>
                `
            }, productListHeader);

            let str = acc + `<li class="order" id="order-${cur._id}">
                <div class="o-list-main" id="main-${cur._id}">
                    <div class="o-date" id="date-${cur._id}"> ${cur.orderTime}</div> 
                    <div class="o-info" id="info-${cur._id}"> ${orderInfo} </div> 
                    <div class="o-price" id="price-${cur._id}">${addCommas(cur.total)} 원</div> 
                    <div class="o-state" id="state-${cur._id}">${cur.state} `;

            if (cur.state == '상품 준비중') {
                str += ` &nbsp <input type="button" value="주문 취소" class="cancel-order-btn" id="orderBtn-${cur._id}" style="border: none;">`
            }
            str += `  </div>
                </div>
            </li>
            <div class="o-list-specific" id="specific-${cur._id}">
                ${productList}
                <div class="product-footer">
                    <div class="o-name"> 받는사람: ${cur.name}</div>
                    <div class="o-address"> 주소: ${cur.address.address1} ${cur.address.address2} (${cur.address.postalCode})</div>
                    <div class="o-name"> 배송 요청사항: ${cur.orderRequest}</div>
                </div>
            </div>
            `
            return str;
        }, listHeader);
        orderListElem.innerHTML = orderList;
        handleAllEvent();

    } catch (err) {
        console.log("Error message: " + err);
    }

}

function handleAllEvent() {
    const cancelOrderBtn = document.querySelector(".cancel-order-btn");
    const orderElem = document.querySelectorAll(".order");
    const reviewBtn = document.querySelectorAll("reviewBtn");

    cancelOrderBtn && cancelOrderBtn.addEventListener("click", async (e) => {
        const orderId = e.target.id.split('-')[1];
        const order = await Api.get('/api/orders');
        await jQuery.ajax({
            url: "/api/payments/cancel", // 예: http://www.myservice.com/payments/cancel
            type: "POST",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
                merchant_uid: orderId, // 예: ORD20180131-0000011
                cancel_request_amount: order.total, // 환불금액
                reason: "테스트 결제 환불", // 환불사유
            }),
        })

        await Api.delete("/api/orders", orderId);
        alert("주문취소 및 환불 완료");
        window.location.reload();

    })

    orderElem.forEach(item => item.addEventListener("click", (e) => {
        let targetIdElem = document.querySelector('#target_id');
        let before_id = targetIdElem.value;
        let target_id = e.target.id.split('-')[1];
        console.log(before_id + "  " + target_id);


        if (target_id == before_id) {
            const beforeElem = document.querySelector(`#specific-${before_id}`);
            beforeElem.classList.add("o-list-specific");
            targetIdElem.value = "";
            return;
        }
        if (targetIdElem.value) {  // 이미 선택된 주문내역이 있다면
            const beforeElem = document.querySelector(`#specific-${before_id}`);
            beforeElem.classList.add("o-list-specific");
        }

        targetIdElem.value = target_id;
        const targetElem = document.querySelector(`#specific-${target_id}`);
        targetElem.classList.remove("o-list-specific");
    }));

}