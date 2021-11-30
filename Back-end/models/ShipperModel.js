class ShipperModel{
    constructor(orderId, name, address, phone, description, total){
        this.orderId = orderId;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.description = description;
        this.total = total;
    }
}

module.exports = ShipperModel;