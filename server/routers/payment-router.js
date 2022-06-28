import { Router } from "express";
import { orderService, userService } from "../services";
import axios from "axios";

const paymentRouter = Router();

// "/payments/complete"에 대한 POST 요청을 처리
paymentRouter.post("/complete", async (req, res) => {
    try {
        const { imp_uid, merchant_uid } = req.body; // req의 body에서 imp_uid, merchant_uid 추출

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // 액세스 토큰(access token) 발급 받기
        const getToken = await axios({
            url: "https://api.iamport.kr/users/getToken",
            method: "post", // POST method
            headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
            data: {
                imp_key: "5682936732856580", // REST API 키
                imp_secret: "768ef3c0a9394b3f9920957e75dc644f7f3c382668ea8932715cdc817ce33dc50e2cde69d554deee" // REST API Secret
            }
        });
        const { access_token } = getToken.data.response; // 인증 토큰

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // imp_uid로 아임포트 서버에서 결제 정보 조회
        const getPaymentData = await axios({
            url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
            method: "get", // GET method
            headers: { "Authorization": access_token } // 인증 토큰 Authorization header에 추가
        });

        const paymentData = getPaymentData.data.response; // 조회한 결제 정보

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // DB에서 결제되어야 하는 금액 조회
        const order = await orderService.getSpecificOrder(paymentData.merchant_uid);
        const amountToBePaid = order.total; // 결제 되어야 하는 금액

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // 결제 검증하기
        const { amount, status } = paymentData;
        if (amount === amountToBePaid) { // 결제금액 일치. 결제 된 금액 === 결제 되어야 하는 금액
            const order = await orderService.updateSpecificOrder(merchant_uid, { amount, status }); // DB에 결제 정보 저장

            switch (status) {
                case "ready": // 가상계좌 발급
                    // DB에 가상계좌 발급 정보 저장
                    const { vbank_num, vbank_date, vbank_name } = paymentData;
                    await userService.updatedUser(order.userId, { vbank_num, vbank_date, vbank_name });
                    // 가상계좌 발급 안내 문자메시지 발송
                    SMS.send({ text: `가상계좌 발급이 성공되었습니다. 계좌 정보 ${vbank_num} ${vbank_date} ${vbank_name}` });
                    res.send({ status: "vbankIssued", message: "가상계좌 발급 성공" });
                    break;
                case "paid": // 결제 완료
                    res.send({ status: "success", message: "일반 결제 성공" });
                    break;
            }
        } else { // 결제금액 불일치. 위/변조 된 결제
            throw { status: "forgery", message: "위조된 결제시도" };
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    } catch (e) {
        res.status(400).send(e);
    }
});

paymentRouter.post("/iamport-webhook", async (req, res) => {
    try {
        const { imp_uid, merchant_uid } = req.body; // req의 body에서 imp_uid, merchant_uid 추출

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // 액세스 토큰(access token) 발급 받기
        const getToken = await axios({
            url: "https://api.iamport.kr/users/getToken",
            method: "post", // POST method
            headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
            data: {
                imp_key: "5682936732856580", // REST API 키
                imp_secret: "768ef3c0a9394b3f9920957e75dc644f7f3c382668ea8932715cdc817ce33dc50e2cde69d554deee" // REST API Secret
            }
        });
        const { access_token } = getToken.data.response; // 인증 토큰

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // imp_uid로 아임포트 서버에서 결제 정보 조회
        const getPaymentData = await axios({
            url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
            method: "get", // GET method
            headers: { "Authorization": access_token } // 인증 토큰 Authorization header에 추가
        });

        const paymentData = getPaymentData.data.response; // 조회한 결제 정보

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // DB에서 결제되어야 하는 금액 조회
        const order = await orderService.getSpecificOrder(paymentData.merchant_uid);
        const amountToBePaid = order.total; // 결제 되어야 하는 금액

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // 결제 검증하기
        const { amount, status } = paymentData;
        if (amount === amountToBePaid) { // 결제금액 일치. 결제 된 금액 === 결제 되어야 하는 금액
            const order = await orderService.updateSpecificOrder(merchant_uid, { amount, status }); // DB에 결제 정보 저장

            switch (status) {
                case "ready": // 가상계좌 발급
                    // DB에 가상계좌 발급 정보 저장
                    const { vbank_num, vbank_date, vbank_name } = paymentData;
                    await userService.updatedUser(order.userId, { vbank_num, vbank_date, vbank_name });
                    // 가상계좌 발급 안내 문자메시지 발송
                    SMS.send({ text: `가상계좌 발급이 성공되었습니다. 계좌 정보 ${vbank_num} ${vbank_date} ${vbank_name}` });
                    res.send({ status: "vbankIssued", message: "가상계좌 발급 성공" });
                    break;
                case "paid": // 결제 완료
                    res.send({ status: "success", message: "일반 결제 성공" });
                    break;
            }
        } else { // 결제금액 불일치. 위/변조 된 결제
            throw { status: "forgery", message: "위조된 결제시도" };
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    } catch (e) {
        res.status(400).send(e);
    }
});

paymentRouter.post('/cancel', async (req, res, next) => {

    try {
        console.log("입장");
        const { merchant_uid, cancel_request_amount, reason } = req.body; // req의 body에서 imp_uid, merchant_uid 추출

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // 액세스 토큰(access token) 발급 받기
        const getToken = await axios({
            url: "https://api.iamport.kr/users/getToken",
            method: "post", // POST method
            headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
            data: {
                imp_key: "5682936732856580", // REST API 키
                imp_secret: "768ef3c0a9394b3f9920957e75dc644f7f3c382668ea8932715cdc817ce33dc50e2cde69d554deee" // REST API Secret
            }
        });

        const { access_token } = getToken.data.response; // 인증 토큰
        console.log("access_token", access_token);
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /* 아임포트 REST API로 결제환불 요청 */
        const getCancelData = await axios({
            url: "https://api.iamport.kr/payments/cancel",
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": access_token // 아임포트 서버로부터 발급받은 엑세스 토큰
            },
            data: {
                reason, // 가맹점 클라이언트로부터 받은 환불사유
                merchant_uid, // merchant_uid를 환불 `unique key`로 입력
                amount: cancel_request_amount, // 가맹점 클라이언트로부터 받은 환불금액
            }
        });

        const { response } = getCancelData.data; // 환불 결과
        console.log("response", response);
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        res.send(response);
    } catch (err) {
        res.status(400).json(err);
    }
})

export { paymentRouter }