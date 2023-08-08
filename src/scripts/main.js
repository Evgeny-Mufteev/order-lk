'use strict';
document.addEventListener('DOMContentLoaded', () => {
  // Табы
  const handleTabs = (section, buttons, points, tabsClass) => {
    const tabs = document.querySelector(section);
    const btns = tabs.querySelectorAll(buttons);
    const items = tabs.querySelectorAll(points);

    function change(arr, i) {
      arr.forEach(function (item) {
        item.forEach(function (i) {
          i.classList.remove(tabsClass);
        });
        item[i].classList.add(tabsClass);
      });
    }

    var _loop = function _loop(i) {
      btns[i].addEventListener('click', function () {
        change([btns, items], i);
      });
    };

    for (var i = 0; i < btns.length; i++) {
      _loop(i);
    }
  };
  handleTabs('.tabs', '.tabs__btn', '.tabs__item', 'is-active');

  // Редактирование инпутов при клике на иконки
  const enableInputEditingOnIconClick = () => {
    const arrIconEdit = document.querySelectorAll('.js-icon');

    arrIconEdit.forEach((iconEdit) => {
      iconEdit.addEventListener('click', () => {
        const input = iconEdit.closest('.js-editing').querySelector('.js-editing-input');

        input.removeAttribute('readonly');
        input.focus();

        const clickOutsideHandler = (event) => {
          if (!input.contains(event.target)) {
            input.setAttribute('readonly', 'true');
            document.removeEventListener('click', clickOutsideHandler);
          }
        };

        setTimeout(() => {
          document.addEventListener('click', clickOutsideHandler);
        }, 0);
      });
    });
  };
  enableInputEditingOnIconClick();

  // Маска телефона
  const handlePhoneMask = (input) => {
    let matrix = '+7 (___) ___-__-__',
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = input.value.replace(/\D/g, '');
    if (def.length >= val.length) val = def;
    input.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });
  };
  const numbers = document.querySelectorAll('input[type="tel"]');
  numbers.forEach((number) => {
    number.addEventListener('input', handlePhoneMask.bind(null, number));
    number.addEventListener('focus', handlePhoneMask.bind(null, number));
    number.addEventListener('blur', handlePhoneMask.bind(null, number));
  });

  // Проверка на совпадение паролей
  const newPasswordInput = document.querySelector('.js-new-password');
  const confirmPasswordInput = document.querySelector('.js-confirm-password');
  const infoMessage = document.querySelector('.js-message');

  const checkPasswords = () => {
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (newPassword.length >= 6 && confirmPassword.length >= 6) {
      if (newPassword !== confirmPassword) {
        infoMessage.textContent = 'Пароли не совпадают';
      } else {
        infoMessage.textContent = 'Пароли совпадают';
      }
    } else {
      infoMessage.textContent = 'Пароль должен содержать не менее 6 символов';
    }
  };

  newPasswordInput.addEventListener('input', checkPasswords);
  confirmPasswordInput.addEventListener('input', checkPasswords);

  // ghkhujnkjhik

  // const arrIcon = document.q
});
