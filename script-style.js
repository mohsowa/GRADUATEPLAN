'use strict';

// insert
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
    delete_Semester_window.classList.remove('delete_semester_window_hide');
    const elm_option = document.getElementById('delete_semester_window');
    elm_option.innerHTML = `
        <h4 >Delete Semester</h4>
        <select class="form-control" id="delete_semester_option" style="margin-bottom: 10px" onchange="delete_semester(this.value)">
       <option selected>Choose...</option>
        ${open_delete_semester_w_get_option()}
        </select>
        <button type="button" class="btn btn-outline-secondary"  onclick="close_delete_semester_w()">Close
        </button>
    `;
}

function open_delete_semester_w_get_option() {
    let data = ``;
    for (let i = 0; i < semester_list.length; i++) {
        data += `<option>${semester_list[i].name}</option>`
    }
    return data;
}

function close_delete_semester_w() {
    delete_Semester_window.classList.add('delete_semester_window_hide');
}

close_delete_semester_w();

//Delete_course
const delete_course_window = document.querySelector('.delete_course_window');

function open_delete_course_w(){
    delete_course_window.classList.remove('delete_course_window_hide');
    const elm_option = document.getElementById('delete_course_window');
    elm_option.innerHTML = `
        <h4 >Delete Course</h4>
        <select class="form-control" id="delete_course_option" style="margin-bottom: 10px" onchange="delete_course(this.value)">
       <option selected>Choose...</option>
        ${open_delete_course_w_get_option()}
        </select>
        <button type="button" class="btn btn-outline-secondary"  onclick="close_delete_course_w()">Close
        </button>
    `;
}

function open_delete_course_w_get_option() {
    let data = ``;
    for (let i = 0; i < major.courses_list.length; i++) {
        data += `<option>${major.courses_list[i].id}</option>`
    }
    return data;
}

function close_delete_course_w() {
    delete_course_window.classList.add('delete_course_window_hide');
}
close_delete_course_w()