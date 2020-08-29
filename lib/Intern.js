// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
class Intern {
    constructor(name, role, id, email, school) {
        this.name = name;
        this.role = role;
        this.id = id;
        this.email = email;
        this.school = school;
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
    
    getSchool(){
        return this.school;
    }
};

module.exports = Intern;