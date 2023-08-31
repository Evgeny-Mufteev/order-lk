'use strict';
document.addEventListener('DOMContentLoaded', () => {

  const counterMassage = (listElements, showCounter) => {
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
            list[i].classList.add('messages__item--read')
            count--;
            show.innerHTML = count
          }
        })
      }
    }
  }
  const counterNotes = (listElements, showCounter) => {
    const list = document.querySelectorAll(listElements)
    const show = document.querySelector(showCounter)

    let count = 0

    for (let i = 0; i < list.length; i++) {
      count++
    }
    show.innerHTML = count

    for (let i = 0; i < list.length; i++) {
      const del = list[i].querySelector('.js-delete-btn')

      del.addEventListener('click', () => {
        count--
        show.innerHTML = count
      })
    }
  }

  counterMassage('.message__list-item', '.message__counter')
  counterNotes('.notes__list-item', '.notes__counter')

});
