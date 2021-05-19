'use strict';

class Major {
    name;
    courses_list = [];

    constructor() {
    }

    setName(name) {
        this.name = name
    }

}

class Course {

    id;
    name;
    credit;
    pre_request = [];
    Semester = new Semester('temp');

    constructor(id, name, credit, pre_request) {
        this.id = id;
        this.name = name;
        this.credit = credit;
        this.pre_request = pre_request;
    }

}

class Semester {
    name;
    courses_list = [];

    constructor(name) {
        this.name = name;
    }

}


// variable

let user_name;
let major = new Major();
let semester_list = [];
let temp_semester = new Semester('temp');
let image;





