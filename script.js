'use strict';
console.log('script working');

///////// classes /////////

class Major {
    name;
    courses_list = [];
    GPA_Point;

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
    GPA;

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
    Status;

    constructor(name) {
        this.name = name;
    }

}

///////// variable /////////

let user_name;
let major = new Major();
let semester_list = [];
let temp_semester = new Semester('temp');
let image;

// check data
check_all_key_local();
///////// Style - script /////////

// insert course
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};


//alert_window
const alert_window = document.querySelector('.alert_window');

const open_alert = function (message) {
    const message_elm = document.getElementById('alert_message');
    message_elm.textContent = message;
    alert_window.classList.remove('alert_window_hidden');
};

const close_alert = function () {
    alert_window.classList.add('alert_window_hidden');
};

//Delete_semester
const delete_Semester_window = document.querySelector('.delete_semester_window');

function open_delete_semester_w() {
    open_delete_semester_w_get_option();
    delete_Semester_window.classList.remove('delete_semester_window_hide');

}

function open_delete_semester_w_get_option() {
    const element = document.getElementById('delete_semester_option');
    let data = `<option selected>Choose...</option>`;
    for (let i = 0; i < semester_list.length; i++) {
        data += `<option>${semester_list[i].name}</option>`
    }
    element.innerHTML = data;
}

function close_delete_semester_w() {
    delete_Semester_window.classList.add('delete_semester_window_hide');
}

close_delete_semester_w();

//Delete_course
const delete_course_window = document.querySelector('.delete_course_window');

function open_delete_course_w() {
    delete_course_window.classList.remove('delete_course_window_hide');
    open_delete_course_w_get_option()
}

function open_delete_course_w_get_option() {
    const element = document.getElementById('delete_course_option');
    let data = `<option selected>Choose...</option>`;
    for (let i = 0; i < major.courses_list.length; i++) {
        data += `<option>${major.courses_list[i].id}</option>`
    }
    element.innerHTML = data;
}

function close_delete_course_w() {
    delete_course_window.classList.add('delete_course_window_hide');
}

close_delete_course_w()

//image window
const image_window = document.querySelector('.image_window');

function open_image_w() {
    image_window.classList.remove('image_window_hide');
    checkImage();
}

function close_image_w() {
    image_window.classList.add('image_window_hide');
}

close_image_w();

function previewFile() {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
        image = localStorage.setItem('image', preview.src);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

function checkImage() {
    if (check_key_in_local('image')) {
        const preview = document.querySelector('img');
        preview.src = localStorage.getItem('image');
    }
}


// color mode
const color_mode_window = document.querySelector('.color_mode_w');

function open_color_mode_w() {
    color_mode_window.classList.remove('color_mode_w_hide');
}

const body_color = document.querySelector('body');


function default_color() {
    if ('color' in localStorage) {
        body_color.style.background = localStorage.getItem('color');
    } else {
        body_color.style.background = "linear-gradient(15deg, #0a1121 0%, #377799 100%)";
        localStorage.setItem('color', body_color.style.background);
    }
}

default_color();


function change_color() {
    let color_code_elm = document.getElementById('color_id').value;
    body_color.style.background = `linear-gradient(15deg, #0a1121 0%, ${color_code_elm} 100%)`;
    localStorage.setItem('color', body_color.style.background);
    default_color();
}

function close_color_mode_w() {
    color_mode_window.classList.add('color_mode_w_hide');
}

close_color_mode_w();

///////// Data - script /////////

// welcome
const elm_user = document.getElementById('user');
elm_user.textContent = "Welcome " + user_name + "\t| " + major.name;

//No. Remaining Semesters
const elm_Remaining_Semesters = document.getElementById('No_Remaining_Semesters');
elm_Remaining_Semesters.textContent = get_No_Remaining_Semesters();

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

//GPA Point
const elm_GPA_Point = document.getElementById('GPA_Point');
elm_GPA_Point.textContent = (major.GPA_Point === undefined) ? 0 : major.GPA_Point;

//GPA Point
const elm_GPA_CR = document.getElementById('GPA_CR');
elm_GPA_CR.textContent = get_GPA_CR();

//GPA Point
const elm_GPA = document.getElementById('GPA_Value');
elm_GPA.textContent = (get_GPA_CR() === 0)?0:get_main_GPA();

//display semesters
display_semesters();

//display semesters
display_table();

//welcome

function open_welcome() {
    const welcome_window = document.querySelector('.Welcome_window');
    welcome_window.classList.remove('Welcome_window_hidden');
}


function welcome_btn_action() {
    const user = document.getElementById('welcome_name').value;
    const temp_major = document.getElementById('welcome_major').value;
    const GPA_point = document.getElementById('select_GPA_point').value;

    if (user !== null && user !== '' && temp_major !== null && temp_major !== '') {
        if (GPA_point !== 'Choose GPA Point') {
            user_name = user
            major.name = temp_major;
            if (GPA_point === '4 GPA Point') {
                major.GPA_Point = 4;
            } else {
                major.GPA_Point = 5;
            }
            localStorage.setItem('user', JSON.stringify(user_name));
            localStorage.setItem('major', JSON.stringify(major));
            location.reload();
        } else {
            alert("Choose GPA Point!")
        }
    } else {
        alert("Enter your Name and Your Major")
    }

}

//Semester

function new_semester() {
    let semester_name = prompt('Enter new semester name. e.g. 191 , 201');

    //check values for semester_name
    if (semester_name == null) {
        alert("No Data is Signed !");
        return;
    } else if (semester_name === "") {
        alert("Field is empty !");
        return;
    }


    // check if semester_name in list
    let inList = false;
    for (let i = 0; i < semester_list.length; i++) {
        if (semester_list[i].name === semester_name) {
            inList = true;
            alert(semester_name + " semester is signed before.")
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
        location.reload();
    }
}

function display_semesters() {
    const elm_display_semester = document.getElementById('display_semester');
    elm_display_semester.innerHTML = null;
    for (let i = 0; i < semester_list.length; i++) {
        elm_display_semester.append(getCard_innerHTML(semester_list[i]));
    }
    semester_status_Listener();
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
    if(display_semester_GPA(semester)){
        new_element.innerHTML = `
                <div class="card mb-3" style="max-width: 18rem;">
                    <div class="card-header grid-container">
                            <div class="semester-name">${semester.name} | ${semester.courses_list.length} Courses | ${get_semester_total_CR(semester.courses_list)} CR </div>
                            <div style="text-align: center" class="semester-name">GPA  ${get_GPA(semester.courses_list)}</div>
                            ${get_semester_status(semester)}
                    </div>
                        ${getCourses_getCard_innerHTML(new_element.id)}
                </div>
    `;
    }else{
        new_element.innerHTML = `
                <div class="card mb-3" style="max-width: 18rem;">
                    <div class="card-header grid-container">
                            <div class="semester-name">${semester.name} | ${semester.courses_list.length} Courses | ${get_semester_total_CR(semester.courses_list)} CR</div>
                            ${get_semester_status(semester)}
                    </div>
                        ${getCourses_getCard_innerHTML(new_element.id)}
                </div>
    `;
    }

    return new_element;
}

function display_semester_GPA(semester){
    if(semester.courses_list.length === 0){
       return false;
    }
    for(let i = 0 ; i < semester.courses_list.length; i ++){
        if(semester.courses_list[i].GPA === ''){
            return false;
        }
    }
    return true;
}

function get_semester_status(semester) {
    let data = ``;
    if (semester.status === undefined) {
        semester.status = 'Later Semester';
    }
    if (semester.status === 'Later Semester') {
        data += `
<select class="form-control" id="${semester.name}_status_option" style="background-color: #3375A5; color: white">
        <option selected style="background-color: white">Later Semester</option>
        <option style="background-color: #F58E29; color: white">Current Semester</option>
        <option style="background-color: #F93644; color: white">Finished Semester</option>
        `;
    } else if (semester.status === 'Current Semester') {
        data += `
<select class="form-control" id="${semester.name}_status_option" style="background-color: #F58E29; color: white">
        <option style="background-color: #3375A5; color: white">Later Semester</option>
        <option selected style="background-color: white">Current Semester</option>
        <option style="background-color: #F93644; color: white">Finished Semester</option>
        `;
    } else if (semester.status === 'Finished Semester') {
        data += `
<select class="form-control" id="${semester.name}_status_option" style="background-color: #F93644; color: white">
        <option style="background-color: #3375A5; color: white">Later Semester</option>
        <option style="background-color: #F58E29; color: white">Current Semester</option>
        <option selected style="background-color: white">Finished Semester</option>
        `;
    }
    return data + '</select>';
}

function getCourses_getCard_innerHTML(temp_id) {
    let data = `<div class="card-body"> `;
    let semester = get_Semester_by_ID(temp_id.substr(9));
    for (let i = 0; i < semester.courses_list.length; i++) {
        if (semester.courses_list[i].GPA === undefined || semester.courses_list[i].GPA === '') {
            data += `<p>${semester.courses_list[i].id}  |  Credit: ${semester.courses_list[i].credit}</p>`;
        } else {
            data += `<p>${semester.courses_list[i].id}   |   Credit: ${semester.courses_list[i].credit}   |   GPA: ${semester.courses_list[i].GPA}</p>`;
        }

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

function delete_semester(id) {
    if (id === '' || id === 'Choose...') {
        alert('No semester is deleted !');
        return
    }

    let semester_name = id;
    close_delete_semester_w();

    //check semester is in list\
    let complete_proses = false;
    for (let i = 0; i < semester_list.length; i++) {
        if (semester_name === semester_list[i].name) {
            complete_proses = true;
            break;
        }
    }

    if (complete_proses) {
        // get index
        let index;
        for (let i = 0; i < semester_list.length; i++) {
            if (semester_name === semester_list[i].name) {
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
        for (let i = 0; i < get_semester_course_list(temp).length; i++) {
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
        alert("Semester is not found !")
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
    const coursePreReq3 = document.getElementById('preR_3').value;

    // check course id
    let complete_process = true;
    if (courseID.length !== 0) {
        for (let i = 0; i < major.courses_list.length; i++) {
            if (major.courses_list[i].id === courseID) {
                complete_process = false;
                alert('Course is signed before !');
                break;
            }
        }
    } else {
        alert('Course ID field is empty !');
        complete_process = false;
    }


    if (complete_process) {
        if ((Number(courseCredit).toFixed() >= 0) && courseCredit != null) {
            // add to array
            let course = new Course(courseID, courseName, courseCredit, [coursePreReq1, coursePreReq2, coursePreReq3]);
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
            alert('Course credit less than 0 !');
        }
    }
}

function getCourse_innerHTML(course) {
    const new_element = document.createElement('tr');
    new_element.innerHTML = `
                <td>${course.id}</td>
                <td>${course.name}</td>
                <td>${course.credit}</td>
                <td>${course.pre_request[0]}, ${course.pre_request[1]} , ${course.pre_request[2]}</td>
                <td>
                    <div class="form-group col-">
                        <select id="option_${course.id}" class="form-control"
                                style="background-color: rgba(255,255,255,0.02); color: white">
                            ${getOption_getCourse_innerHTML(course.Semester)}
                        </select>
                    </div>
                </td>
                <td><div class="form-group col-">
                        <select id="GPA_${course.id}" class="form-control"
                                style="background-color: rgba(255,255,255,0.02); color: white">
                            ${getGPA__innerHTML(course)}
                        </select>
                    </div></td>
                <td>
                <div>
                <button class="btn btn-outline-light" style="margin-top: 8px" id="Edit_${course.id}">Edit</button>
</div>
</td>
    `;
    return new_element;
}

function getGPA__innerHTML(course) {
    let data = ``;
    if (course.GPA === undefined || course.GPA === '') {
        data = `
        <option selected>Choose...</option>
                            <option>A+</option>
                            <option>A</option>
                            <option>B+</option>
                            <option>B</option>
                            <option>C+</option>
                            <option>C</option>
                            <option>D+</option>
                            <option>D</option>
                            <option>F</option>
        `;
    } else if (course.GPA === 'A+') {
        data = `
        <option>Choose...</option>
                            <option selected>A+</option>
                            <option>A</option>
                            <option>B+</option>
                            <option>B</option>
                            <option>C+</option>
                            <option>C</option>
                            <option>D+</option>
                            <option>D</option>
                            <option>F</option>
        `;
    } else if (course.GPA === 'A') {
        data = `
        <option>Choose...</option>
                            <option>A+</option>
                            <option selected>A</option>
                            <option>B+</option>
                            <option>B</option>
                            <option>C+</option>
                            <option>C</option>
                            <option>D+</option>
                            <option>D</option>
                            <option>F</option>
        `;
    } else if (course.GPA === 'B+') {
        data = `
        <option>Choose...</option>
                            <option>A+</option>
                            <option>A</option>
                            <option selected>B+</option>
                            <option>B</option>
                            <option>C+</option>
                            <option>C</option>
                            <option>D+</option>
                            <option>D</option>
                            <option>F</option>
        `;
    } else if (course.GPA === 'B') {
        data = `
        <option>Choose...</option>
                            <option>A+</option>
                            <option>A</option>
                            <option>B+</option>
                            <option selected>B</option>
                            <option>C+</option>
                            <option>C</option>
                            <option>D+</option>
                            <option>D</option>
                            <option>F</option>
        `;
    } else if (course.GPA === 'C+') {
        data = `
        <option>Choose...</option>
                            <option>A+</option>
                            <option>A</option>
                            <option>B+</option>
                            <option>B</option>
                            <option selected>C+</option>
                            <option>C</option>
                            <option>D+</option>
                            <option>D</option>
                            <option>F</option>
        `;
    } else if (course.GPA === 'C') {
        data = `
        <option>Choose...</option>
                            <option>A+</option>
                            <option>A</option>
                            <option>B+</option>
                            <option>B</option>
                            <option>C+</option>
                            <option selected>C</option>
                            <option>D+</option>
                            <option>D</option>
                            <option>F</option>
        `;
    } else if (course.GPA === 'D+') {
        data = `
        <option>Choose...</option>
                            <option>A+</option>
                            <option>A</option>
                            <option>B+</option>
                            <option>B</option>
                            <option>C+</option>
                            <option>C</option>
                            <option selected>D+</option>
                            <option>D</option>
                            <option>F</option>
        `;
    } else if (course.GPA === 'D') {
        data = `
        <option>Choose...</option>
                            <option>A+</option>
                            <option>A</option>
                            <option>B+</option>
                            <option>B</option>
                            <option>C+</option>
                            <option>C</option>
                            <option>D+</option>
                            <option selected>D</option>
                            <option>F</option>
        `;
    } else if (course.GPA === 'F') {
        data = `
        <option>Choose...</option>
                            <option>A+</option>
                            <option>A</option>
                            <option>B+</option>
                            <option>B</option>
                            <option>C+</option>
                            <option>C</option>
                            <option>D+</option>
                            <option>D</option>
                            <option  selected>F</option>
        `;
    }
    return data;
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
    add_course_to_semester_Listener();
    assign_GPA_to_course();
    btn_edit_course_Listener();
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
    openModal();
}

function get_courseList_pre() {
    let data = '<option selected>No PreRequisite</option>';
    for (let i = 0; i < major.courses_list.length; i++) {
        data += `<option>${major.courses_list[i].id}</option>`;
    }
    return data;
}

function get_courseList_pre_edit(id,pre) {
    if (pre === 'No PreRequisite'){
        let data = '<option selected>No PreRequisite</option>';
        for (let i = 0; i < major.courses_list.length; i++) {
            if(id !== major.courses_list[i].id){
                if(pre === major.courses_list[i].id){
                    data += `<option >${major.courses_list[i].id}</option>`;
                }else{
                    data += `<option>${major.courses_list[i].id}</option>`;
                }
            }
        }
        return data;
    }else{
        let data = '<option >No PreRequisite</option>';
        for (let i = 0; i < major.courses_list.length; i++) {
            if(id !== major.courses_list[i].id){
                if(pre === major.courses_list[i].id){
                    data += `<option selected>${major.courses_list[i].id}</option>`;
                }else{
                    data += `<option>${major.courses_list[i].id}</option>`;
                }
            }
        }
        return data;
    }

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

function delete_course(id) {

    if (id === 'Choose...') {
        close_delete_course_w();
        alert('No course is deleted !');
        return;
    }
    let courseID = id;

    // check input
    if (courseID == null) {
        alert('No course ID is signed!');
        return;
    } else if (courseID === '') {
        alert('Field is empty');
        return;
    }

    for (let i = 0; i < major.courses_list.length; i++) {
        if (major.courses_list[i].id === courseID) {
            alert(major.courses_list[i].id + " is deleted correctly.");
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


            //close delete window
            close_delete_course_w();

            //Reload Page
            location.reload()
            return;
        }
    }

    // error message
    alert('The course you want to delete is not found !');

}

function delete_course_h(course) {
    let new_array = [];

    for (let i = 0; i < major.courses_list.length; i++) {
        if (major.courses_list[i] !== course) {
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
        if (temp_id === major.courses_list[i].id) {
            course = major.courses_list[i];
            break;
        }
    }
    return course;
}

function get_Semester_by_ID(temp_name) {
    let Semester;
    for (let i = 0; i < semester_list.length; i++) {
        if (temp_name === semester_list[i].name) {
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

function rest_all_data() {
    let input = prompt('Are you shore to delete all your data, Enter "yes" to conform');
    input = input.toLocaleLowerCase();
    if (input === 'yes') {
        localStorage.clear();
        location.reload();
    } else {
        alert('Your request is rejected.');
    }
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
        major = JSON.parse(localStorage.getItem('major'));
        if (major.GPA_Point === undefined) {
            open_welcome();
        }
    } else {
        open_welcome();
    }

    if (check_key_in_local('semester_list')) {
        semester_list = JSON.parse(localStorage.getItem('semester_list'))
    }
}


//Listener Event

//welcome btn
document.getElementById("welcome_btn").addEventListener("click", function () {
    welcome_btn_action();
});

//Rest btn
document.getElementById("reset_btn").addEventListener("click", function () {
    rest_all_data();
});

//color btn
document.getElementById("color_btn").addEventListener("click", function () {
    open_color_mode_w();
});

//close color w btn
document.getElementById("close_color_btn").addEventListener("click", function () {
    close_color_mode_w();
});

//change color on change
document.getElementById("color_id").addEventListener("change", function () {
    change_color();
});

// Insert new semester btn
document.getElementById("open_new_semester_btn").addEventListener("click", function () {
    new_semester();
});

// Delete Semester btn
document.getElementById("delete_semester_w_btn").addEventListener("click", function () {
    open_delete_semester_w();
});

// view plan image btn
document.getElementById("open_imgPlan_btn").addEventListener("click", function () {
    open_image_w();
});

// view plan image btn
document.getElementById("previewFile").addEventListener("change", function () {
    previewFile();
});

// close plan image btn
document.getElementById("close_imgPlan_btn").addEventListener("click", function () {
    close_image_w();
});

// insert new course btn
document.getElementById("open_insert_Course_btn").addEventListener("click", function () {
    open_insert_Course();
    document.getElementById('preR_1').innerHTML = get_courseList_pre();
    document.getElementById('preR_2').innerHTML = get_courseList_pre();
    document.getElementById('preR_3').innerHTML = get_courseList_pre();
});

// close alert window btn
document.getElementById("close_alert_btn").addEventListener("click", function () {
    close_alert();
});

// delete course btn
document.getElementById("open_delete_course_w_btn").addEventListener("click", function () {
    open_delete_course_w();
});

// insert course action
document.getElementById("insert_course").addEventListener("click", function () {
    new_Course();
});

// close inset course window
document.getElementById("close_insert_Course_btn").addEventListener("click", function () {
    close_insert_Course();
});

//close delete semester window btn
document.getElementById("close_o_delete_semester_btn").addEventListener("click", function () {
    close_delete_semester_w();
});

// delete semester action
document.getElementById("delete_semester_option").addEventListener("change", function () {
    delete_semester(this.value);
});

// close delete course window btn
document.getElementById("close_delete_course_w_btn").addEventListener("click", function () {
    close_delete_course_w();
});

// delete course action
document.getElementById("delete_course_option").addEventListener("change", function () {
    delete_course(this.value);
});

function add_course_to_semester_Listener() {
    for (let i = 0; i < major.courses_list.length; i++) {
        let temp_id = "option_" + major.courses_list[i].id;
        document.getElementById(temp_id).addEventListener("change", function () {
            add_course_to_semester(temp_id);
        });
    }
}

function assign_GPA_to_course() {
    for (let i = 0; i < major.courses_list.length; i++) {
        let temp_id = "GPA_" + major.courses_list[i].id;
        document.getElementById(temp_id).addEventListener("change", function () {
            let temp_GPA = document.getElementById(temp_id).value;
            if (temp_GPA !== "Choose...") {
                major.courses_list[i].GPA = document.getElementById(temp_id).value
            } else {
                major.courses_list[i].GPA = '';
            }
            localStorage.setItem('major', JSON.stringify(major));
            location.reload();
        });
    }
}

function semester_status_Listener() {
    for (let i = 0; i < semester_list.length; i++) {
        const temp_id = (semester_list[i].name) + '_status_option';
        document.getElementById(temp_id).addEventListener("change", function () {
            let value = document.getElementById(temp_id).value;
            let prev_value = semester_list[i].status
            semester_list[i].status = value;
            if (value === 'Current Semester') {
                for (let j = 0; j < semester_list.length; j++) {
                    if (semester_list[j].status === 'Current Semester') {
                        if (semester_list[j] !== semester_list[i]) {
                            alert(semester_list[j].name + " is current semester !");
                            semester_list[i].status = prev_value;
                        }
                    }
                }
            }
            localStorage.setItem('semester_list', JSON.stringify(semester_list));
            location.reload();
        });

    }
}

function btn_edit_course_Listener() {
    for (let i = 0; i < major.courses_list.length; i++) {
        let temp_id = "Edit_" + major.courses_list[i].id;
        document.getElementById(temp_id).addEventListener("click", function () {
            const view = document.querySelector('.Edit_Course');
            view.classList.remove('Edit_Course_hide');

            // get values
            //Id
            document.getElementById('e-courseID').value = major.courses_list[i].id;

            //Name
            document.getElementById('e-courseName').value = major.courses_list[i].name;

            //Credit
            document.getElementById('e-courseCredit').value = major.courses_list[i].credit;

            //pre
            document.getElementById('e-preR_1').innerHTML = get_courseList_pre_edit(major.courses_list[i].id,major.courses_list[i].pre_request[0]);
            document.getElementById('e-preR_2').innerHTML = get_courseList_pre_edit(major.courses_list[i].id,major.courses_list[i].pre_request[1]);
            document.getElementById('e-preR_3').innerHTML = get_courseList_pre_edit(major.courses_list[i].id,major.courses_list[i].pre_request[2]);

        });
    }
}

//close_edit_Course_btn
document.getElementById("close_edit_Course_btn").addEventListener("click", function () {
    const view = document.querySelector('.Edit_Course');
    view.classList.add('Edit_Course_hide');
});

document.getElementById("edit_course").addEventListener("click", function () {
    const course_id = document.getElementById('e-courseID').value;

    for (let i = 0 ; i < major.courses_list.length;i++){
        if (course_id === major.courses_list[i].id){
            const pre_1 = document.getElementById('e-preR_1').value;
            const pre_2 = document.getElementById('e-preR_2').value;
            const pre_3 = document.getElementById('e-preR_3').value;
            if(pre_1 !== major.courses_list[i].id && pre_2 !== major.courses_list[i].id && pre_3 !== major.courses_list[i].id){
                major.courses_list[i].name = document.getElementById('e-courseName').value;
                major.courses_list[i].credit = document.getElementById('e-courseCredit').value;
                major.courses_list[i].pre_request[0] = document.getElementById('e-preR_1').value;
                major.courses_list[i].pre_request[1] = document.getElementById('e-preR_2').value;
                major.courses_list[i].pre_request[2] = document.getElementById('e-preR_3').value;

                localStorage.setItem('major', JSON.stringify(major));
                location.reload();

                //const view = document.querySelector('.Edit_Course');
                //.classList.add('Edit_Course_hide');
            }else {
                alert('This course cannot be Pre Request for itself!')
            }
        }
    }


});

function GPA_4_Point(List){
    let value = 0;
    let total_CR = 0;
    for (let i = 0 ; i < List.length; i ++){
        if(List[i].GPA !== undefined){
            total_CR += parseInt(List[i].credit);
            if(List[i].GPA === 'A+'){
                value += parseFloat((4 * List[i].credit));
            }else if(List[i].GPA === 'A'){
                value += parseFloat((3.75 * List[i].credit));
            }else if(List[i].GPA === 'B+'){
                value += parseFloat((3.5 * List[i].credit));
            }else if(List[i].GPA === 'B'){
                value += parseFloat((3 * List[i].credit));
            }else if(List[i].GPA === 'C+'){
                value += parseFloat((2.5 * List[i].credit));
            }else if(List[i].GPA === 'C'){
                value += parseFloat((2 * List[i].credit));
            }else if(List[i].GPA === 'D+'){
                value += parseFloat((1.5 * List[i].credit));
            }else if(List[i].GPA === 'D'){
                value += parseFloat((1 * List[i].credit));
            }else if(List[i].GPA === 'F'){
                value += parseFloat((0 * List[i].credit));
            }
        }else{
            return undefined;
        }
    }
    value = (value / total_CR);
    return value.toFixed(2);
}

function GPA_5_Point(List){
    let value = 0;
    let total_CR = 0;
    for (let i = 0 ; i < List.length; i ++){
        if(List[i].GPA !== undefined){
            total_CR += parseInt(List[i].credit);
            if(List[i].GPA === 'A+'){
                value += parseFloat((5 * List[i].credit));
            }else if(List[i].GPA === 'A'){
                value += parseFloat((4.75 * List[i].credit));
            }else if(List[i].GPA === 'B+'){
                value += parseFloat((4.5 * List[i].credit));
            }else if(List[i].GPA === 'B'){
                value += parseFloat((4 * List[i].credit));
            }else if(List[i].GPA === 'C+'){
                value += parseFloat((3.5 * List[i].credit));
            }else if(List[i].GPA === 'C'){
                value += parseFloat((3 * List[i].credit));
            }else if(List[i].GPA === 'D+'){
                value += parseFloat((2.5 * List[i].credit));
            }else if(List[i].GPA === 'D'){
                value += parseFloat((2 * List[i].credit));
            }else if(List[i].GPA === 'F'){
                value += parseFloat((1 * List[i].credit));
            }
        }else{
            return undefined;
        }
    }
    value = (value / total_CR);
    return value.toFixed(2);
}

function get_GPA(list){
    if (major.GPA_Point === 4){
        return GPA_4_Point(list);
    }else{
        return GPA_5_Point(list);
    }
}

function get_GPA_CR(){
    let value = 0 ;
    for (let i = 0 ; i < major.courses_list.length; i++){
        if( major.courses_list[i].GPA !== ''){
            value += parseInt(major.courses_list[i].credit);
        }
    }
    return value;
}

function get_main_GPA(){
    let list = []
    for (let i = 0 ; i < major.courses_list.length; i++){
        if( major.courses_list[i].GPA !== ''){
            list.push(major.courses_list[i]);
        }
    }
    return get_GPA(list);
}

function get_No_Remaining_Semesters(){
    let value = 0 ;
    for (let i = 0 ; i < semester_list.length; i++){
        if(semester_list[i].status === 'Later Semester'){
            value++;
        }
    }
    return value;
}