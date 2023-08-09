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

  // Изменение табов на мобилке
  const handleMenuClick = (index) => {
    const arrTabsContent = document.querySelectorAll('.tabs__item');

    arrTabsContent.forEach((tab, tabIndex) => {
      if (tabIndex === index) {
        tab.classList.add('is-active');
        document.querySelector('.overlay').classList.remove('active');
        document.querySelector('.js-menu-modal').classList.remove('active');
        document.body.classList.remove('no-scroll');
      } else {
        tab.classList.remove('is-active');
      }
    });
  };

  if (window.innerWidth < 768) {
    const menuBtnReviews = document.querySelector('.js-menu-mob-reviews');
    const menuBtnPin = document.querySelector('.js-menu-mob-pin');

    menuBtnReviews.addEventListener('click', (evt) => {
      evt.preventDefault();
      handleMenuClick(4);
    });

    menuBtnPin.addEventListener('click', (evt) => {
      evt.preventDefault();
      handleMenuClick(5);
    });
  }

  const monileMenu = document.querySelectorAll('.tabs__btn');

  monileMenu.forEach((el) => {
    el.addEventListener('click', (evt) => {
      evt.preventDefault();
      document.querySelector('.overlay').classList.remove('active');
      document.querySelector('.js-menu-modal').classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // Редактирование инпутов при клике на иконки
  const enableInputEditingOnIconClick = () => {
    const arrIconEdit = document.querySelectorAll('.js-icon');

    arrIconEdit.forEach((iconEdit) => {
      let isEditing = false;

      iconEdit.addEventListener('click', () => {
        const input = iconEdit.closest('.js-editing').querySelector('.js-editing-input');

        if (!isEditing) {
          input.removeAttribute('readonly');
          input.focus();

          const clickOutsideHandler = (event) => {
            if (!input.contains(event.target)) {
              input.setAttribute('readonly', 'true');
              document.removeEventListener('click', clickOutsideHandler);
              isEditing = false;
            }
          };

          setTimeout(() => {
            document.addEventListener('click', clickOutsideHandler);
            isEditing = true;
          }, 0);
        } else {
          input.setAttribute('readonly', 'true');
          isEditing = false;
        }
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
  const btnSubmit = document.querySelector('.js-profile-btn-submit');

  const checkPasswords = () => {
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (newPassword.length >= 6 && confirmPassword.length >= 6) {
      if (newPassword !== confirmPassword) {
        infoMessage.textContent = 'Пароли не совпадают';
        btnSubmit.disabled = true;
      } else {
        infoMessage.textContent = 'Пароли совпадают';
        btnSubmit.disabled = false;
      }
    } else {
      infoMessage.textContent = 'Пароль должен содержать не менее 6 символов';
    }
  };

  newPasswordInput.addEventListener('input', checkPasswords);
  confirmPasswordInput.addEventListener('input', checkPasswords);

  // Переключение видимости паролей
  const togglePasswordVisibility = () => {
    const iconViews = document.querySelectorAll('.js-icon-password');

    iconViews.forEach((iconView) => {
      iconView.addEventListener('click', () => {
        const input = iconView.previousElementSibling;
        if (input.type === 'password') {
          input.type = 'text';
        } else {
          input.type = 'password';
        }
      });
    });
  };
  togglePasswordVisibility();

  // Изменение текста у пунктов меню, удалить и передалать на беке через $_SERVER['HTTP_USER_AGENT']
  if (window.innerWidth < 768) {
    const menuProfile = document.querySelector('.mob-menu-1');
    const menuBonuses = document.querySelector('.mob-menu-2');
    const menuOrder = document.querySelector('.mob-menu-3');

    const newTextProfile = 'Профиль';
    const newTextBonuses = 'Бонусы';
    const newTextOrder = 'Заказы';

    menuProfile.childNodes[2].nodeValue = newTextProfile;
    menuBonuses.childNodes[2].nodeValue = newTextBonuses;
    menuOrder.childNodes[2].nodeValue = newTextOrder;
  }

  // модальные окна
  const handleModalPopup = (btn, blockModal) => {
    const btns = document.querySelectorAll(btn);
    const modal = document.querySelector(blockModal);

    const overlay = document.querySelector('.overlay');
    const arrCloseButton = document.querySelectorAll('.js-close');

    if (btns && modal) {
      btns.forEach((btnItem) => {
        btnItem.addEventListener('click', (evt) => {
          evt.preventDefault();
          modal.classList.add('active');
          overlay.classList.add('active');
          document.body.classList.add('no-scroll');
        });
      });

      arrCloseButton.forEach((closeButton) => {
        closeButton.addEventListener('click', (evt) => {
          evt.preventDefault();
          modal.classList.remove('active');
          modal?.classList.remove('sucsess');
          overlay.classList.remove('active');
          document.body.classList.remove('no-scroll');
        });
      });

      overlay.addEventListener('click', (evt) => {
        evt.preventDefault();
        modal.classList.remove('active');
        modal?.classList.remove('sucsess');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });

      if (window.screen.width > 767) {
        document.addEventListener('keydown', (evt) => {
          if (evt.key === 'Escape') {
            evt.preventDefault();
            modal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
          }
        });
      }
    }
  };
  handleModalPopup('.js-btn-privacy-policy', '.js-privacy-policy');
  handleModalPopup(undefined, '.js-saving-profile');
  handleModalPopup('.js-btn-menu-modal', '.js-menu-modal');

  // Валидация и отправка формы
  const handleFormSubmitPage = (formItem, popup) => {
    const form = document.querySelector(formItem);
    const modalBlock = document.querySelector(popup);
    const btn = form.querySelector('.js-profile-btn-submit');
    const email = form.querySelector('input[name="profile_email"]');
    const phone = form.querySelector('input[name="profile_number"]');

    if (!form) {
      return;
    }

    const pristine = new Pristine(form);

    const handleInputValidation = (inputElement) => {
      inputElement.addEventListener('input', () => {
        const valid = pristine.validate(inputElement);
        btn.disabled = !valid;
      });
    };

    handleInputValidation(email);
    handleInputValidation(phone);

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const valid = pristine.validate();

      if (valid) {
        modalBlock?.classList.add('active');
        document.querySelector('.overlay')?.classList.add('active');
        document.body.classList.add('no-scroll');

        const formData = Object.fromEntries(new FormData(evt.target).entries());
        formData.profile_number = formData.profile_number.replace(/\D/g, '');

        console.log(formData);
        // evt.target.submit();
      }
    });
  };

  handleFormSubmitPage('.js-profile-form', '.js-saving-profile');
});
