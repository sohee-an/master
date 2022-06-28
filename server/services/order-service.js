import { orderModel } from "../db";

class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    //상품 주문한거 db에 저장
    async addOrder(newOrder) {
        //객체에 할당함 // 
        // const { userId,name, phoneNumber,cartItems,total,address,orderRequest} = newOrder;
        const createdOrder = await this.orderModel.create(newOrder);
        return createdOrder;

    }

    async getUserOrder(userOrderId) {// 상품구매한 유저 아이디 들어감 
        // 상품 정보다 찾아옴. 유저 정보다 다 찾아옴
        const userOrder = await this.orderModel.findUserOrderAll(userOrderId);
        return userOrder;
    }

    async usersOrders() {
        const usersOrder = await this.orderModel.findUsersOrder();
        return usersOrder;
    }

    async deleteOrder(orderId) {
        const deletedOrder = await this.orderModel.remove(orderId);
        return deletedOrder;
    }

    /////////////////////////////////////기능 추가/////////////////////////////////////

    async getSpecificOrder(orderId) {
        const order = await this.orderModel.findOrder(orderId);
        return order;
    }

    async updateSpecificOrder(orderId, paymentData) {
        const order = await this.orderModel.updateOrder(orderId, paymentData);
        return order;
    }

    /////////////////////////////////////기능 추가/////////////////////////////////////

    /////관리자용 상태 업데이트
    async stateUpdate(orderId, state) {
        const update = { state: state };
        const updateOrder = await this.orderModel.update(
            orderId,
            update
        );
        return updateOrder;
    }
}

const orderService = new OrderService(orderModel);

export { orderService }