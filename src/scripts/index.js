'use strict';
document.addEventListener('DOMContentLoaded', () => {

  const counter = (listElements, showCounter) => {
    const list = document.querySelectorAll(listElements)
    const show = document.querySelector(showCounter)

    let count = 0

    for (let i = 0; i < list.length; i++) {
      if (!list[i].classList.contains('messages__item--read')) {
        count++
      }
    }
    show.innerHTML = count

    for (let i = 0; i < list.length; i++) {
      if (!list[i].classList.contains('messages__item--read')) {
        list[i].addEventListener('click', () => {
          if (!list[i].classList.contains('messages__item--read')) {
            list[i].classList.add('messages__item--read');
            count--;
            show.innerHTML = count;
          }
        });
      }
    }
  }

  counter('.message__list-item', '.message__counter')
  counter('.notes__list-item', '.notes__counter')

});
