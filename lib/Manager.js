// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
class Manager {
    constructor(name, role, id, email, officeNumber) {
        this.name = name;
        this.role = "Manager";
        this.id = id;
        this.email = email;
        this.officeNumber = officeNumber;
    }

    getName(){
        return this.name;
    }

    getRole(){
        return this.role;
    }

    getId(){
        return this.id;
    }

    getEmail(){
        return this.email;
    }

    getOfficeNumber(){
        return this.officeNumber;
    }
};

module.exports = Manager;