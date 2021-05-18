'use strict';
check_all_key_local();

// welcome
const elm_user = document.getElementById('user');
elm_user.textContent = "Welcome " + user_name + "\t| " + major.name;

//No.Semester
const elm_No_Semester = document.getElementById('No_Semester');
elm_No_Semester.textContent = Number(semester_list.length).toFixed();

//No.Courses
const elm_No_Courses = document.getElementById('No_Courses');
elm_No_Courses.textContent = Number(major.courses_list.length).toFixed();

//Total Major CR
const elm_No_MajorCR = document.getElementById('MajorCR');
elm_No_MajorCR.textContent = parseInt(getTotalMajorCR());

//Total Courses Registered
const elm_No_Course_RG = document.getElementById('No_Course_RG');
elm_No_Course_RG.textContent = parseInt(get_No_Course_RG());

//Total Total CR Registered
const elm_No_Course_RG_CR = document.getElementById('No_Course_RG_CR');
elm_No_Course_RG_CR.textContent = parseInt(get_No_Course_RG_CR());

//footer
const elm_footer_data = document.getElementById('footer_text');
let date = new Date();
elm_footer_data.innerText = `© ${date.getFullYear()} Copyright | MOHSOWA`;


//display semesters
display_semesters();

//display semesters
display_table();

//welcome

const welcome_window = document.querySelector('.Welcome_window');

const open_welcome = function () {
    welcome_window.classList.remove('Welcome_window_hidden');
};

const close_welcome = function () {
    welcome_window.classList.add('Welcome_window_hidden');
};
close_welcome();


function welcome_btn_action(){
    const user = document.getElementById('welcome_name').value;
    const major = document.getElementById('welcome_major').value;


    if (user !== null && user !== '' && major !== null && major !== ''){
        setUsername(user);
        setMajorName(major);

    }
    location.reload();
}

//save data
function check_key_in_local(value) {
    return `${value}` in localStorage;
}

function check_all_key_local() {
    if (check_key_in_local('user')) {
        user_name = JSON.parse(localStorage.getItem('user'))
    } else {
        open_welcome();
    }

    if (check_key_in_local('major')) {
        major = JSON.parse(localStorage.getItem('major'))
    } else {
        open_welcome()
    }

    if (check_key_in_local('semester_list')) {
        semester_list = JSON.parse(localStorage.getItem('semester_list'))
    }
}

function setUsername(user) {
    user_name = user;
    localStorage.setItem('user', JSON.stringify(user_name));
}

function setMajorName(value) {
    major.setName(value);
    localStorage.setItem('major', JSON.stringify(major));
}

//Semester

function new_semester() {
    let semester_name = prompt('Enter new semester name. e.g. 191 , 201');

    //check values for semester_name
    if (semester_name == null) {
        open_alert("No Data is Signed !");
        return;
    } else if (semester_name === "") {
        open_alert("Field is empty !");
        return;
    }


    // check if semester_name in list
    let inList = false;
    for (let i = 0; i < semester_list.length; i++) {
        if (semester_list[i].name === semester_name) {
            inList = true;
            open_alert(semester_name + " semester is signed before.")
            return;
        }
    }
    if (!inList) {
        let new_semester = new Semester(semester_name)
        // add to array
        semester_list.push(new_semester);
        // display length on page
        elm_No_Semester.textContent = Number(semester_list.length).toFixed();
        //display semesters
        add_OneSemestersToList(new_semester);
        // save data in localStorage
        localStorage.setItem('semester_list', JSON.stringify(semester_list));
        //display the table again
        display_table();
        //Reload Page
        location.reload()
    }
}

function display_semesters() {
    const elm_display_semester = document.getElementById('display_semester');
    elm_display_semester.innerHTML = null;
    for (let i = 0; i < semester_list.length; i++) {
        elm_display_semester.append(getCard_innerHTML(semester_list[i]));
    }
}

function add_OneSemestersToList(semester) {
    const elm_display_semester = document.getElementById('display_semester');
    const new_element = getCard_innerHTML(semester)
    elm_display_semester.append(new_element)
}

function get_semester_total_CR(list) {
    let data = 0;
    for (let i = 0; i < list.length; i++) {
        data += parseInt(list[i].credit);
    }
    return data;
}

function getCard_innerHTML(semester) {
    semester.courses_list = get_semester_course_list(semester);
    const new_element = document.createElement('div');
    new_element.className = 'col-sm-4 semester_cards';
    new_element.id = `semester_${semester.name}`;
    new_element.innerHTML = `
                <div class="card mb-3" style="max-width: 18rem;">
                    <div class="card-header grid-container">
                            <div class="semester-name">${semester.name} | ${semester.courses_list.length} Courses | ${get_semester_total_CR(semester.courses_list)} CR</div>
                    </div>
                        ${getCourses_getCard_innerHTML(new_element.id)}
                </div>
    `;

    return new_element;
}

function getCourses_getCard_innerHTML(temp_id) {
    let data = `<div class="card-body"> `;
    let semester = get_Semester_by_ID(temp_id.substr(9));
    for (let i = 0; i < semester.courses_list.length; i++) {
        data += `<p>${semester.courses_list[i].id}</p>`;
    }
    return data + `</div>`;
}

function get_semester_course_list(semester) {
    let new_list = [];
    for (let i = 0; i < major.courses_list.length; i++) {
        if (major.courses_list[i].Semester.name === semester.name) {
            new_list.push(major.courses_list[i]);
        }
    }
    return new_list;
}

function delete_semester() {
    let semester_name = prompt("Enter semester name:");

    //check semester is in list\
    let complete_proses = false;
    for (let i = 0; i < semester_list.length; i++) {
        if (semester_name.match(semester_list[i].name)) {
            complete_proses = true;
            break;
        }
    }

    if (complete_proses) {
        // get index
        let index;
        for (let i = 0; i < semester_list.length; i++) {
            if (semester_name.match(semester_list[i].name)) {
                index = i;
                break;
            }
        }

        //delete from array
        let temp = semester_list[index]; // for delete linked courses
        delete semester_list[index];
        let new_array = [];
        for (let i = 0; i < semester_list.length; i++) {
            if (semester_list[i] != null) {
                new_array.push(semester_list[i]);
            }
        }


        semester_list = new_array;

        // remove table from page
        document.getElementById("semester_" + semester_name).remove();

        //edit info
        elm_No_Semester.textContent = Number(semester_list.length).toFixed();
        elm_No_Course_RG.textContent = parseInt(get_No_Course_RG());
        elm_No_Course_RG_CR.textContent = parseInt(get_No_Course_RG_CR());

        //delete linked courses
        get_semester_course_list(temp);
        for(let i = 0 ; i < get_semester_course_list(temp).length ; i++){
            get_semester_course_list(temp).Semester = temp_semester;
        }

        //display semester
        display_table();

        //save data
        localStorage.removeItem('semester_list');
        localStorage.setItem('semester_list', JSON.stringify(semester_list));

        //Reload Page
        location.reload()
    } else {
        open_alert("Semester is not found !")
    }


}

//Course

function new_Course() {
    //get value from form
    const courseID = document.getElementById('courseID').value;
    const courseName = document.getElementById('courseName').value;
    const courseCredit = document.getElementById('courseCredit').value;
    const coursePreReq1 = document.getElementById('preR_1').value;
    const coursePreReq2 = document.getElementById('preR_2').value;

    // check course id
    let complete_process = true;
    if (courseID.length !== 0) {
        for (let i = 0; i < major.courses_list.length; i++) {
            if (major.courses_list[i].id.match(courseID)) {
                complete_process = false;
                open_alert('Course is signed before !');
                break;
            }
        }
    } else {
        open_alert('Course ID field is empty !');
        complete_process = false;
    }


    if (complete_process) {
        if ((Number(courseCredit).toFixed() >= 0) && courseCredit != null) {
            // add to array
            let course = new Course(courseID, courseName, courseCredit, [coursePreReq1, coursePreReq2]);
            major.courses_list.push(course);

            //saveData
            localStorage.removeItem('major')
            localStorage.setItem('major', JSON.stringify(major));

            //edit info
            elm_No_Courses.textContent = Number(major.courses_list.length).toFixed();
            elm_No_MajorCR.textContent = parseInt(getTotalMajorCR());

            // add to table on page
            const elm_display_course = document.getElementById('display_courses');
            elm_display_course.append(getCourse_innerHTML(course));

            // close window
            close_insert_Course();

            //Reload Page
            location.reload()

        } else {
            open_alert('Course credit less than 0 !');
        }
    }
}

function getCourse_innerHTML(course) {
    const new_element = document.createElement('tr');
    new_element.innerHTML = `
                <td>${course.id}</td>
                <td>${course.name}</td>
                <td>${course.credit}</td>
                <td>${course.pre_request[0]}, ${course.pre_request[1]}</td>
                <td>
                    <div class="form-group col-">
                        <select id="option_${course.id}" class="form-control"
                                style="background-color: rgba(255,255,255,0.02); color: white"
                                onchange="add_course_to_semester(this.id)">
                            ${getOption_getCourse_innerHTML(course.Semester)}
                        </select>
                    </div>
                </td>
    `;
    return new_element;
}

function getOption_getCourse_innerHTML(semester) {
    let data;
    if (semester.name !== 'temp') {
        data = `<option>Choose...</option>`;
        for (let i = 0; i < semester_list.length; i++) {
            if (semester_list[i].name === semester.name) {
                data += `<option selected>${semester_list[i].name}</option>`;
            } else {
                data += `<option>${semester_list[i].name}</option>`;
            }
        }
    } else {
        data = `<option selected>Choose...</option>`;
        for (let i = 0; i < semester_list.length; i++) {
            data += `<option>${semester_list[i].name}</option>`;
        }
    }
    return data;
}

function display_table() {
    const elm_display_course = document.getElementById('display_courses');
    elm_display_course.innerHTML = null;
    for (let i = 0; i < major.courses_list.length; i++) {
        elm_display_course.append(getCourse_innerHTML(major.courses_list[i]));
    }
}

function add_course_to_semester(id) {
    let temp_id = id.substr(7);

    // add course to semester
    let semester = get_Semester_by_ID(document.getElementById(id).value);


    if (semester !== undefined) {
        get_course_by_ID(temp_id).Semester = semester;
    } else {
        get_course_by_ID(temp_id).Semester = temp_semester;
    }


    //saveData
    localStorage.removeItem('major')
    localStorage.setItem('major', JSON.stringify(major));


    //edit info
    elm_No_Courses.textContent = Number(major.courses_list.length).toFixed();
    elm_No_MajorCR.textContent = parseInt(getTotalMajorCR());

    display_semesters();
    display_table();

    location.reload();

}

function open_insert_Course() {
    // form
    const element = document.getElementById('insert_course_form');
    element.innerHTML = `
     <form>
                <h2 style="color: rgba(58,59,64,0.84); ">Insert new Course</h2>
                <div class="form-group">
                    <label for="courseID">Course ID</label>
                    <input type="text" class="form-control form-control-sm" id="courseID"
                           placeholder="course ID | e.g. Math 101 , ICS 102">
                </div>
                <div class="form-group">
                    <label for="courseName">Name</label>
                    <input type="text" class="form-control form-control-sm" id="courseName" placeholder="course Name">
                </div>
                <div class="form-group">
                    <label for="courseName">Credit</label>
                    <input type="text" class="form-control form-control-sm" id="courseCredit" placeholder="course Name">
                </div>
                <div class="form-group">
                    <label for="preR_1">Pre Request | 1</label>
                    <select class="form-control form-control-sm" id="preR_1">
                    <option selected>No PreRequisite</option>
                       ${get_courseList_pre()}
                    </select>
                </div>
                <div class="form-group">
                    <label for="preR_2">Pre Request | 2</label>
                    <select class="form-control form-control-sm" id="preR_2">
                        <option selected>No PreRequisite</option>
                        ${get_courseList_pre()}
                    </select>
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-outline-success close-modal" id="insert_course"
                            onclick="new_Course()"> Insert
                    </button>
                    <button type="button" class="btn btn-outline-secondary close-modal"
                            onclick="close_insert_Course();">Close
                    </button>
                </div>
            </form>
    `;
    //open
    openModal();
}

function get_courseList_pre() {
    let data;
    for (let i = 0; i < major.courses_list.length; i++) {
        data += `<option>${major.courses_list[i].id}</option>`;
    }
    return data;
}

function close_insert_Course() {
    // delete all data in the form
    document.getElementById('courseID').value = null;
    document.getElementById('courseName').value = null;
    document.getElementById('courseCredit').value = null;
    document.getElementById('preR_1').value = null;
    document.getElementById('preR_2').value = null;
    // close page
    closeModal();
}

function delete_course() {
    let courseID = prompt("Enter Course ID:");

    // check input
    if (courseID == null) {
        open_alert('No course ID is signed!');
        return;
    } else if (courseID == '') {
        open_alert('Field is empty');
        return;
    }

    for (let i = 0; i < major.courses_list.length; i++) {
        if (major.courses_list[i].id.match(courseID)) {
            open_alert(major.courses_list[i].id + " is deleted correctly.");
            delete_course_h(major.courses_list[i]);

            //saveData
            localStorage.removeItem('major')
            localStorage.setItem('major', JSON.stringify(major));

            //edit info
            elm_No_Courses.textContent = Number(major.courses_list.length).toFixed();
            elm_No_MajorCR.textContent = parseInt(getTotalMajorCR());
            elm_No_Course_RG.textContent = parseInt(get_No_Course_RG());
            elm_No_Course_RG_CR.textContent = parseInt(get_No_Course_RG_CR());

            //display table
            display_table();

            //Reload Page
            location.reload()
            return;
        }
    }

    // error message
    open_alert('The course you want to delete is not found !');

}

function delete_course_h(course) {
    let new_array = [];

    for (let i = 0; i < major.courses_list.length; i++) {
        if (major.courses_list[i] != course) {
            new_array.push(major.courses_list[i]);
        }
    }
    console.log(new_array)
    major.courses_list = new_array;
}


// get Data

function get_course_by_ID(temp_id) {
    let course;
    for (let i = 0; i < major.courses_list.length; i++) {
        if (temp_id.match(major.courses_list[i].id)) {
            course = major.courses_list[i];
            break;
        }
    }
    return course;
}

function get_Semester_by_ID(temp_name) {
    let Semester;
    for (let i = 0; i < semester_list.length; i++) {
        if (temp_name.match(semester_list[i].name)) {
            Semester = semester_list[i];
        }
    }
    return Semester;
}

function getTotalMajorCR() {
    let total = 0;
    let array = major.courses_list;
    for (let i = 0; i < array.length; i++) {
        total += parseInt(array[i].credit);
    }
    return total;
}

function get_No_Course_RG() {
    let data = 0;
    for (let i = 0; i < semester_list.length; i++) {
        let semester = get_semester_course_list(semester_list[i]);
        data += parseInt(semester.length);
    }
    return parseInt(data);
}

function get_No_Course_RG_CR() {
    let data = 0;
    for (let i = 0; i < semester_list.length; i++) {
        let semester = get_semester_course_list(semester_list[i]);
        for (let j = 0; j < semester.length; j++) {
            data += parseInt(semester[j].credit);
        }
    }
    return parseInt(data);
}

function rest_all_data(){
    let input = prompt('Are you shore to delete all your data, Enter "yes" to conform');
    input = input.toLocaleLowerCase();
    if (input === 'yes' ){
        localStorage.clear();
        location.reload();
    }else{
        open_alert('Your request is rejected.');
    }
}