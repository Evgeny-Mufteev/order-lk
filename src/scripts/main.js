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

  // отправка данных
  const sendData = (url, data) => {
    fetch(url, {
      method: 'POST',
      body: data,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((jsonData) => {
        console.log(jsonData);
        window.location.href = 'http://localhost:3000/';
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
  if (newPasswordInput && confirmPasswordInput) {
    newPasswordInput.addEventListener('input', checkPasswords);
    confirmPasswordInput.addEventListener('input', checkPasswords);
  }

  // Переключение видимости паролей
  const togglePasswordVisibility = () => {
    const iconViews = document.querySelectorAll('.js-icon-password');

    iconViews.forEach((iconView) => {
      iconView.addEventListener('click', () => {
        const input = iconView.previousElementSibling;
        if (input.type === 'password') {
          input.type = 'text';
          iconView.classList.add('hide');
        } else {
          input.type = 'password';
          iconView.classList.remove('hide');
        }
      });
    });
  };
  togglePasswordVisibility();

  // Изменение текста у пунктов меню, удалить и передалать на беке через $_SERVER['HTTP_USER_AGENT']
  // так же удалить классы
  if (window.innerWidth < 768) {
    const menuProfile = document.querySelector('.mob-menu-1');
    const menuBonuses = document.querySelector('.mob-menu-2');
    const menuOrder = document.querySelector('.mob-menu-3');
    const arrOrderRepeat = document.querySelectorAll('.mob-menu-4');

    const newTextProfile = 'Профиль';
    const newTextBonuses = 'Бонусы';
    const newTextOrder = 'Заказы';
    const neworderRepeat = 'Повторить';

    menuProfile.childNodes[2].nodeValue = newTextProfile;
    menuBonuses.childNodes[2].nodeValue = newTextBonuses;
    menuOrder.childNodes[2].nodeValue = newTextOrder;

    arrOrderRepeat.forEach((orderRepeat) => {
      orderRepeat.childNodes[2].nodeValue = neworderRepeat;
    });
  }

  // вызов и закрытие модального окна
  const handleModalPopup = (btn, blockModal, shouldStopPropagation = false) => {
    const btns = document.querySelectorAll(btn);
    const modal = document.querySelector(blockModal);

    const overlay = document.querySelector('.overlay');
    const arrCloseButton = document.querySelectorAll('.js-close');

    if (btns && modal) {
      btns.forEach((btnItem) => {
        btnItem.addEventListener('click', (evt) => {
          evt.preventDefault();
          if (shouldStopPropagation) evt.stopPropagation();
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
          document.querySelector('.js-modal-note-text').value = '';
        });
      });

      overlay.addEventListener('click', (evt) => {
        evt.preventDefault();
        modal.classList.remove('active');
        modal?.classList.remove('sucsess');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
        document.querySelector('.js-modal-note-text').value = '';
      });

      if (window.screen.width > 767) {
        document.addEventListener('keydown', (evt) => {
          if (evt.key === 'Escape') {
            evt.preventDefault();
            modal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            document.querySelector('.js-modal-note-text').value = '';
          }
        });
      }
    }
  };
  handleModalPopup('.js-btn-privacy-policy', '.js-privacy-policy');
  handleModalPopup(undefined, '.js-saving-profile');
  handleModalPopup('.js-btn-menu-modal', '.js-menu-modal');
  handleModalPopup('.js-add-card', '.js-add-new-card');
  handleModalPopup('.js-btn-block-card', '.js-block-card');
  handleModalPopup('.js-btn-read', '.js-modal-read');
  handleModalPopup('.js-btn-add-none', '.js-modal-note');
  handleModalPopup('.js-btn-editing', '.js-modal-note');

  handleModalPopup('.js-btn-del-reviews', '.js-delete-review', true);
  handleModalPopup('.js-reviews-item', '.js-view-review');

  // Валидация формы
  const handleFormSubmitPage = (formItem, popup) => {
    const form = document.querySelector(formItem);
    const modalBlock = document.querySelector(popup);

    if (!form) {
      return;
    }

    const btn = form.querySelector('.js-profile-btn-submit');
    const email = form.querySelector('input[name="profile_email"]');
    const phone = form.querySelector('input[name="profile_number"]');

    const pristine = new Pristine(form);

    const handleInputValidation = (inputElement) => {
      inputElement?.addEventListener('input', () => {
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
        evt.preventDefault();
        modalBlock?.classList.add('active');
        document.querySelector('.overlay')?.classList.add('active');
        document.body.classList.add('no-scroll');

        const formData = Object.fromEntries(new FormData(evt.target).entries());
        if (formData.phone_number) {
          formData.phone_number = formData.phone_number.replace(/\D/g, '');
        }

        console.log(formData);
        // evt.target.submit();
        const url = form.getAttribute('action');
        sendData(url, formData);
      }
    });
  };
  handleFormSubmitPage('.js-profile-form', '.js-saving-profile');
  handleFormSubmitPage('.js-new-card_form', undefined);

  // Сортировка в бонусах
  const sortItems = () => {
    const arrItems = document.querySelectorAll('.js-bonus__order-sort');

    arrItems.forEach((el) => {
      el.addEventListener('click', (evt) => {
        evt.preventDefault();
        arrItems.forEach((item) => {
          item.classList.remove('active');
        });
        el.classList.add('active');
      });
    });
  };
  sortItems();

  // Слайдер бонусных карт
  const handleWindowResize = () => {
    if (window.innerWidth < 768) {
      const futureSlider = document.querySelector('.future-slider');
      futureSlider?.classList.remove('future-slider');
      futureSlider?.classList.add('swiper-wrapper');

      const cartSlider = new Swiper('.cart-slider', {
        pagination: {
          el: '.swiper-pagination',
        },
      });
    } else {
      const futureSlider = document.querySelector('.swiper-wrapper');
      futureSlider?.classList.remove('swiper-wrapper');
      futureSlider?.classList.add('future-slider');
    }
  };
  handleWindowResize();
  window.addEventListener('resize', handleWindowResize);

  // Удаление заголовков карт в слайдере
  const blockBonus = document.querySelector('.bonus');
  const arrTitle = blockBonus ? blockBonus.querySelectorAll('.profile__title') : [];

  const removeCardTitlesFromSlider = () => {
    if (window.innerWidth < 768) {
      arrTitle.forEach((title) => {
        title.style.display = 'block';
      });
    } else {
      for (let i = 1; i < arrTitle.length; i++) {
        arrTitle[i].style.display = 'none';
      }
    }
  };

  removeCardTitlesFromSlider();
  window.addEventListener('resize', handleWindowResize);

  // Выпадающий список в регистрации новой карты
  if (document.querySelector('.js-sort-box')) {
    const handleParameterSelection = (el) => {
      el = el.target;
      // Открытие списка
      if (el.closest('.js-sort-btn')) {
        el.closest('.js-sort-btn').classList.toggle('active');
      }

      // Удаление активного выбранного пункта из списка
      if (el.closest('.js-sort-list')) {
        const allEl = el.closest('.js-sort-list').querySelectorAll('.js-sort-item');
        allEl.forEach((listItem) => {
          listItem.classList.remove('active');
        });
      }

      // Подстановка выбранного пункта
      if (el.classList.contains('js-sort-item')) {
        el.classList.add('active');
        el.closest('.js-sort-box').querySelector('.selecting-item').value = el.textContent;
        el.closest('.js-sort-box')
          .querySelector('.selecting-item')
          .setAttribute('value', el.textContent);
        document.querySelector('.selecting-item').dispatchEvent(new Event('input'));
      }

      // Закрытие списка
      if (!el.closest('.js-sort-btn')) {
        document.querySelectorAll('.js-sort-btn').forEach((el) => {
          el.classList.remove('active');
        });
      }
    };
    document.addEventListener('click', handleParameterSelection);
  }

  // Передатать id выбранной карты для блокировки
  // или отзыва для удаления
  const lockSelectedCard = (el) => {
    el = el.target;
    if (el.closest('.js-bonus-card-item')) {
      document.querySelector('.js-select-blocked-card').value =
        el.closest('.js-bonus-card-item').id;
    }

    if (el.closest('.js-reviews-item')) {
      document.querySelector('.js-select-delete-review').value = el.closest('.js-reviews-item').id;
    }
  };
  const blockFormCard = document.querySelector('.bonus__inner');
  const blockFormReview = document.querySelector('.reviews__items');

  if (blockFormCard && blockFormReview) {
    blockFormCard.addEventListener('click', lockSelectedCard);
    blockFormReview.addEventListener('click', lockSelectedCard);
  }

  // Блокировака карты
  const blockMap = () => {
    const arrBtns = document.querySelectorAll('.js-bonus-card-item');
    const selectCard = document.querySelector('.js-select-blocked-card');
    const btnBlocked = document.querySelector('.js-btn-blocked');

    btnBlocked.addEventListener('click', () => {
      const selectedValue = selectCard.value;

      arrBtns.forEach((el) => {
        const id = el.id;
        if (selectedValue === id && !el.classList.contains('bonus-map--blocked')) {
          el.classList.add('bonus-map--blocked');
          el.classList.remove('bonus-map--non-base-map');
          el.classList.remove('bonus-map--non-bonuses');
          el.classList.remove('bonus-map--base-map');
          handleModalPopup(undefined, '.js-block-card');
        }
      });
    });
  };
  blockMap();

  // Свап карт
  const cardUnlock = (el) => {
    el = el.target;

    // разблокировать и сделать не основной
    if (el.closest('.bonus__desc-btn--blocked')) {
      el.closest('.bonus-map').classList.remove('bonus-map--blocked');
      el.closest('.bonus-map').classList.add('bonus-map--non-base-map');
    }

    // Сделать основной
    if (el.closest('.js-make-main')) {
      const allBonusMaps = document.querySelectorAll('.bonus-map');

      // Удаляем класс у всех элементов
      allBonusMaps.forEach((bonusMap) => {
        bonusMap.classList.remove('bonus-map--base-map');
        bonusMap.classList.remove('bonus-map--non-bonuses');
        bonusMap.classList.add('bonus-map--non-base-map');
      });

      // Добавляем класс только к текущему элементу
      const closestBonusMap = el.closest('.bonus-map');
      closestBonusMap.classList.remove('bonus-map--non-base-map');
      closestBonusMap.classList.add('bonus-map--base-map');
    }
  };
  document.addEventListener('click', cardUnlock);

  // Сортировка в заказах модалка
  const sortOrders = (el) => {
    el = el.target;
    const modal = document.querySelector('.js-sort-modal');

    if (el.closest('.js-sort-modal-btn') || el.closest('.js-sort-modal')) {
      modal.classList.add('active');
    } else {
      if (modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
      }
    }

    if (el.closest('.sort-list')) {
      var allEl = el.closest('.sort-list').querySelectorAll('.js-sort-link');
      allEl.forEach(function (listItem) {
        listItem.classList.remove('active');
      });
      document.querySelector('.js-sort-modal').classList.remove('active');
    }

    if (el.classList.contains('js-sort-link')) {
      el.closest('.js-block-sort').querySelector('.js-sort-modal-btn').textContent = el.textContent;
      el.classList.add('active');
    }
  };
  document.addEventListener('click', sortOrders);

  // Аккардеоны
  const handleInfoHideShowBlock = (el) => {
    el = el.target;

    if (el.closest('.js-title') && !el.closest('.js-title.active')) {
      document.querySelectorAll('.js-title').forEach((el) => {
        el.classList.remove('active');
        let scrollHeight = el.closest('.js-item');
        let descElement = scrollHeight.querySelector('.js-desc');
        descElement.style.maxHeight = null;
        descElement.classList.remove('active');
      });

      let scrollHeight = el.closest('.js-item');
      el.closest('.js-title').classList.add('active');
      let descElement = scrollHeight.querySelector('.js-desc');
      descElement.style.maxHeight = descElement.scrollHeight + 'px';
      descElement.classList.add('active');
    } else if (el.closest('.js-title') && !el.closest('.js-desc')) {
      el.closest('.js-title').classList.remove('active');
      let scrollHeight = el.closest('.js-item');
      let descElement = scrollHeight.querySelector('.js-desc');
      descElement.classList.remove('active');
      descElement.style.maxHeight = null;
    }
  };
  document.addEventListener('click', handleInfoHideShowBlock);

  // Вызов нескольких модальных окон
  const openMultipleModals = (el) => {
    el = el.target;

    if (el.closest('.order__actions-mob')) {
      document.querySelectorAll('.js-modal-actions-block').forEach(function (el) {
        el.classList.remove('active');
      });
      el.closest('.js-modal-actions-item')
        .querySelector('.js-modal-actions-block')
        .classList.add('active');
      document.querySelector('.overlay').classList.add('active');
      document.body.classList.add('no-scroll');
    }

    if (!el.closest('.js-modal-actions-item')) {
      document.querySelectorAll('.js-modal-actions-block').forEach(function (el) {
        el.classList.remove('active');
      });
    }
  };
  document.addEventListener('click', openMultipleModals);

  // Копирование сообщения в модальное окно
  const copyMessageToModal = () => {
    const blocks = document.querySelectorAll('.js-read-block');
    const modalText = document.querySelector('.js-modal-read-text');
    const modalDate = document.querySelector('.js-modal-read-date');

    const handleClick = (event) => {
      const block = event.currentTarget;
      const text = block.querySelector('.js-read-text').textContent;
      const date = block.querySelector('.js-read-date').textContent;

      block.classList.add('messages__item--read');
      modalText.textContent = text;
      modalDate.textContent = date;
    };

    blocks.forEach((block) => {
      block.addEventListener('click', handleClick);
    });
  };
  copyMessageToModal();

  // Редактирование существующей заметки и отправка формы
  const editNote = () => {
    const noteEditingBlocks = document.querySelectorAll('.js-note-editing');

    noteEditingBlocks.forEach((noteEditingBlock) => {
      const editButton = noteEditingBlock.querySelector('.js-btn-editing');
      const noteText = noteEditingBlock.querySelector('.js-note-text');
      const modalNoteText = document.querySelector('.js-modal-note-text');

      editButton.addEventListener('click', (event) => {
        const textToCopy = noteText.innerText;
        modalNoteText.value = textToCopy;
      });
    });

    const form = document.querySelector('.popup-add-note__form');
    const inputText = form.querySelector('.js-modal-note-text');
    const btnSubmit = form.querySelector('.js-modal-btn-save-note');

    if (!form) {
      return;
    }

    const pristine = new Pristine(form);

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const valid = pristine.validate();

      if (valid) {
        evt.preventDefault();
        const formData = Object.fromEntries(new FormData(evt.target).entries());
        console.log(formData);
        const url = form.getAttribute('action');
        sendData(url, formData);
      }
    });

    inputText.addEventListener('input', () => {
      const valid = pristine.validate(inputText);

      if (valid && inputText.value !== '' && inputText.value !== inputText.defaultValue) {
        btnSubmit.disabled = false;
      } else {
        btnSubmit.disabled = true;
      }
    });
  };

  editNote();

  // Подсчет количества символов в попапе добавлнеие заметки
  const countCharacters = () => {
    const inputElement = document.querySelector('.js-modal-note-text');
    const spanElement = document.querySelector('.popup-add-note__characters span');
    const arrNoteEditingButtons = document.querySelectorAll('.js-btn-editing');
    const addNoteButton = document.querySelector('.js-btn-add-none');
    const MAX_CHARACTERS = 3000;

    if (!inputElement || !spanElement) {
      return;
    }

    inputElement.addEventListener('input', (evt) => {
      evt.preventDefault();
      const textLength = inputElement.value.length;

      if (textLength > MAX_CHARACTERS) {
        inputElement.value = inputElement.value.slice(0, MAX_CHARACTERS);
        spanElement.textContent = MAX_CHARACTERS;
      } else if (spanElement.textContent !== textLength.toString()) {
        spanElement.textContent = textLength;
      }
    });

    if (arrNoteEditingButtons.length > 0) {
      arrNoteEditingButtons.forEach((btn) => {
        btn.addEventListener('click', (evt) => {
          evt.preventDefault();
          spanElement.textContent = 0;
          spanElement.textContent = inputElement.value.length;
        });
      });
    }

    if (addNoteButton) {
      addNoteButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        spanElement.textContent = 0;
      });
    }
  };
  countCharacters();

  // Удаление заметки
  const deleteNote = (el) => {
    el = el.target;

    if (el.closest('.js-btn-notes-delete')) {
      el.closest('.js-note-editing').remove();
    }
  };
  document.addEventListener('click', deleteNote);

  // Запрос на удаление отзыва
  const requestDeleteReview = () => {
    const form = document.querySelector('.popup-delete-review__form');
    const modalBlock = document.querySelector('.js-delete-review');

    if (!form) {
      return;
    }

    const pristine = new Pristine(form);

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const valid = pristine.validate();

      if (valid) {
        evt.preventDefault();
        modalBlock?.classList.add('success');
        const formData = Object.fromEntries(new FormData(evt.target).entries());

        console.log(formData);
        setTimeout(() => {
          const url = form.getAttribute('action');
          sendData(url, formData);
        }, 3000);
      }
    });
  };
  requestDeleteReview();

  // подсчет и вывод непрочитанного количества сообщений и заметок
  const displayUnreadMessageCount = (blockSelector, messageSelector, spanSelector) => {
    if (window.innerWidth > 768) {
      const updateUnreadCount = () => {
        const content = document.querySelector(blockSelector);
        const messageBlocks = content?.querySelectorAll(messageSelector) || [];
        const quantitySpan = content?.querySelector(spanSelector);

        if (quantitySpan) quantitySpan.textContent = messageBlocks.length.toString();
      };

      updateUnreadCount();

      const handleDomChange = () => {
        updateUnreadCount();
      };

      const observer = new MutationObserver(handleDomChange);

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  };

  displayUnreadMessageCount(
    '.messages',
    '.js-read-block:not(.messages__item--read)',
    '.js-read-quantity',
  );
  displayUnreadMessageCount('.notes', '.js-note-editing', '.js-read-quantity');

  // Изменение видимости меню при актвных модальных окнах
  const toggleMenuVisibilityOnActiveModals = () => {
    const mobileMenu = document.querySelector('.js-toggle-menu');
    const btnOther = mobileMenu.querySelector('.js-btn-menu-modal');
    const arrHiddenMenuItems = mobileMenu.querySelectorAll('.js-hidden-menu');
    const overlay = document.querySelector('.overlay');
    btnOther.addEventListener('click', (evt) => {
      mobileMenu.classList.add('bb');
    });
    overlay.addEventListener('click', (evt) => {
      mobileMenu.classList.remove('bb');
    });
    console.log(arrHiddenMenuItems);
    arrHiddenMenuItems.forEach((el) => {
      el.addEventListener('click', (evt) => {
        mobileMenu.classList.remove('bb');
      });
    });
  };
  toggleMenuVisibilityOnActiveModals();
});
