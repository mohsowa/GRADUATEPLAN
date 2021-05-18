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

