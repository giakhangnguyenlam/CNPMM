class OrderHistoryModel{
    constructor(id, userId, orderDate, total, orderStatus, paymentStatus, product){
        this.id  = id;
        this.userId = userId;
        this.orderDate = orderDate;
        this.total = total;
        this.orderStatus = orderStatus;
        this.paymentStatus = paymentStatus;
        this.product = product;
    }
}

module.exports = OrderHistoryModel;