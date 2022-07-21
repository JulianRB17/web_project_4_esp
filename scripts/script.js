"use strict";

const profile = document.querySelector(".profile");
const modal = document.querySelector(".modal");
const profileName = profile.querySelector(".profile__name");
const modalInputName = modal.querySelector(".modal__input_name");
const profileAboutMe = profile.querySelector(".profile__about-me");
const modalInputAboutMe = modal.querySelector(".modal__input_about-me");

const closeModal = function () {
  modal.classList.remove("modal_opened");
  modal.classList.add("modal");
};

profile
  .querySelector(".profile__edit-btn")
  .addEventListener("click", function () {
    modal.classList.add("modal_opened");
    modal.classList.remove("modal");
    modalInputName.value = profileName.textContent;
    modalInputAboutMe.value = profileAboutMe.textContent;
  });

modal.querySelector(".modal__close-btn").addEventListener("click", closeModal);

modal.querySelector(".modal__save-btn").addEventListener("click", function () {
  profileName.textContent = modalInputName.value;
  profileAboutMe.textContent = modalInputAboutMe.value;
  closeModal();
});
