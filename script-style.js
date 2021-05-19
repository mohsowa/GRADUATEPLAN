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

//image window
const image_window = document.querySelector('.image_window');

function open_image_w(){
    image_window.classList.remove('image_window_hide');
    checkImage();
}

function close_image_w(){
    image_window.classList.add('image_window_hide');
}
close_image_w();

function previewFile(){
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
        image = localStorage.setItem('image',preview.src);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

function checkImage(){
    if(check_key_in_local('image')){
        const preview = document.querySelector('img');
        preview.src = localStorage.getItem('image');
    }
}


// color mode
const color_mode_window = document.querySelector('.color_mode_w');

function open_color_mode_w(){
    color_mode_window.classList.remove('color_mode_w_hide');
}

const body_color = document.querySelector('body');


function default_color(){
    if ('color' in localStorage){
        body_color.style.background = localStorage.getItem('color');
    }else{
        body_color.style.background="linear-gradient(15deg, #0a1121 0%, #377799 100%)";
        localStorage.setItem('color',body_color.style.background);
    }
}
default_color();


function change_color(){
    let color_code_elm = document.getElementById('color_id').value;
    body_color.style.background=`linear-gradient(15deg, #0a1121 0%, ${color_code_elm} 100%)`;
    localStorage.setItem('color',body_color.style.background);
    default_color();
}

function close_color_mode_w(){
    color_mode_window.classList.add('color_mode_w_hide');
}
close_color_mode_w();



