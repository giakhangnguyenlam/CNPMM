class UserModel{
    constructor(id, name, dateofbirth, email, address, gender, jwt, role){
        this.id = id;
        this.name = name;
        this.dateofbirth = dateofbirth;
        this.email = email;
        this.address = address;
        this.gender = gender;
        this.jwt = jwt;
        this.role = role;
    }
}

module.exports = UserModel;