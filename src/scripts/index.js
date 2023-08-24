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

    show.innerHTML = `Не прочитано: ${count}`

    for (let i = 0; i < list.length; i++) {
      if (!list[i].classList.contains('messages__item--read')) {
        const deleteBtn = document.createElement("button")
        deleteBtn.classList.add('delete')
        deleteBtn.innerHTML = 'Прочитать'
        list[i].appendChild(deleteBtn)

        deleteBtn.addEventListener('click', () => {
          list[i].classList.add('messages__item--read')
          deleteBtn.remove()
          count--
          show.innerHTML = `Не прочитано: ${count}`
        })
      }
    }
  }

  counter('.message__list-item', '.message__counter')

});
