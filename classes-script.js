'use strict';

class Major {
    name;
    courses_list = [];
    totalCR = 1 ;

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

    numberOfCourses() {
        return this.courses_list.length;
    }

    totalCR() {
        let total = 0;
        for (let i = 0; i < this.courses_list.length; i++) {
            total += this.courses_list[i].credit;
        }
    }
}


// variable

let user_name;
let major = new Major();
let semester_list = [];
let temp_semester = new Semester('temp');





