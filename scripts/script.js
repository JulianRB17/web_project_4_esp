"use strict";

const profile = document.querySelector(".profile");
const modalProfile = document.querySelector("#edit-profile");
const modal = document.querySelector(".modal");
const profileName = profile.querySelector(".profile__name");
const modalInputName = modal.querySelector("#modal__input_name");
const profileAboutMe = profile.querySelector(".profile__about-me");
const modalInputAboutMe = modal.querySelector("#modal__input_about-me");
const modalNewPlace = document.querySelector("#new-place");

const openCloseModal = function (m) {
  m.classList.toggle("modal_opened");
};

profile
  .querySelector(".profile__edit-btn")
  .addEventListener("click", function () {
    openCloseModal(modalProfile);
    modalInputName.value = profileName.textContent;
    modalInputAboutMe.value = profileAboutMe.textContent;
  });

modalProfile
  .querySelector(".modal__close-btn")
  .addEventListener("click", function () {
    openCloseModal(modalProfile);
  });

modal.querySelector(".modal__save-btn").addEventListener("click", function () {
  profileName.textContent = modalInputName.value;
  profileAboutMe.textContent = modalInputAboutMe.value;
  openCloseModal(modalProfile);
});

profile
  .querySelector(".profile__add-btn")
  .addEventListener("click", function () {
    openCloseModal(modalNewPlace);
  });

modalNewPlace.querySelectorAll(".modal__input").forEach(function (el) {
  el.addEventListener("click", function () {
    el.classList.remove("modal__input_empty");
  });
});

modalNewPlace
  .querySelector(".modal__close-btn")
  .addEventListener("click", function () {
    openCloseModal(modalNewPlace);
  });

modalNewPlace
  .querySelector(".modal__save-btn")
  .addEventListener("click", function () {
    openCloseModal(modalNewPlace);
  });
