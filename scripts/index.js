"use strict";

import { resetValidation } from "./validate.js";

const profile = document.querySelector(".profile");
const modalProfile = document.querySelector("#edit-profile");
const modal = document.querySelector(".modal");
const profileName = profile.querySelector(".profile__name");
const modalInputName = modal.querySelector("#modal__input_name");
const profileAboutMe = profile.querySelector(".profile__about-me");
const modalInputAboutMe = modal.querySelector("#modal__input_about-me");
const modalNewPlace = document.querySelector("#new-place");
const cardsTemplate = document.querySelector("#cards__template").content;
const modalPic = document.querySelector("#modal-pic");
const modalProfilePic = document.querySelector("#profile-pic");

const initialCards = [
  {
    name: "Cenotes",
    link: "./images/cards_1.jpg",
  },
  {
    name: "Ushuaia",
    link: "./images/cards_2.jpeg",
  },
  {
    name: "Iguazú",
    link: "./images/cards_3.jpeg",
  },
  {
    name: "Uyuni",
    link: "./images/cards_4.jpg",
  },
  {
    name: "Bacalar",
    link: "./images/cards_5.webp",
  },
  {
    name: "Las Coloradas",
    link: "./images/cards_6.jpg",
  },
];

//BUG: por alguna razón no se salvan los datos de los inputs

//Resetear valores de los inputs
const resetInputValues = (modalWindow) =>
  modalWindow.querySelectorAll(".modal__input").forEach((inputElement) => {
    inputElement.value = "";
  });

//Abrir ventana modal y agregar eventListener para escape una vez que esté abierta.

const openModal = function (modalWindow) {
  modalWindow.classList.add("modal_opened");
  const escapeCloseModal = function (e) {
    if (e.key === "Escape") {
      modalWindow.classList.remove("modal_opened");
      resetInputValues(modalWindow);
      document.removeEventListener("keydown", escapeCloseModal);
    }
  };
  document.addEventListener("keydown", escapeCloseModal);
};

//Cerrar ventanas modales
const closeModal = function (modalWindow) {
  modalWindow.classList.remove("modal_opened");
  resetInputValues(modalWindow);
};

const btnCloseModal = function (modalWindow) {
  modalWindow
    .querySelector(".modal__close-btn")
    .addEventListener("click", function () {
      closeModal(modalWindow);
    });
  modalWindow.querySelector(".modal__overlay").addEventListener("click", () => {
    {
      closeModal(modalWindow);
    }
  });
};

// Salvar datos en ventana modal

const saveAndCloseModal = function (modalWindow, saveFunction) {
  const saveAndClose = function () {
    saveFunction();
    closeModal(modalWindow);
  };
  modalWindow
    .querySelector(".modal__save-btn")
    .addEventListener("click", saveAndClose);
  modalWindow.querySelectorAll("input").forEach((input) =>
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") saveAndClose;
    })
  );
};

//Abrir ventana de edición de perfil
profile
  .querySelector(".profile__edit-btn")
  .addEventListener("click", function () {
    openModal(modalProfile);
    modalInputName.value = profileName.textContent;
    modalInputAboutMe.value = profileAboutMe.textContent;
    resetValidation(modalProfile);
  });

//Cerrar ventana de edición de perfil
btnCloseModal(modalProfile);

//Salvar datos de edición de perfil
const saveProfile = function () {
  profileName.textContent = modalInputName.value;
  profileAboutMe.textContent = modalInputAboutMe.value;
};

saveAndCloseModal(modalProfile, saveProfile);

//Abrir ventana de nuevo lugar
profile
  .querySelector(".profile__add-btn")
  .addEventListener("click", function () {
    openModal(modalNewPlace);
    resetValidation(modalNewPlace);
  });

//Cerrar ventana de nuevo lugar
btnCloseModal(modalNewPlace);

// Agregar carta de nuevo lugar
function addCard(nameValue, linkValue) {
  const card = cardsTemplate
    .querySelector(".cards__card-container")
    .cloneNode(true);
  const cardImg = card.querySelector(".cards__img");
  card.querySelector(".cards__name").textContent = nameValue;
  cardImg.alt = nameValue;
  cardImg.src = linkValue;
  document.querySelector(".cards").prepend(card);

  //Dar like a cada imagen
  card.querySelectorAll(".cards__like-btn").forEach((button) => {
    button.addEventListener("click", (likeButton) => {
      likeButton.target.classList.toggle("cards__like-btn_active");
    });
  });

  //Borrar imagen
  card.querySelectorAll(".cards__trash-btn").forEach((button) => {
    button.addEventListener("click", (trashButton) =>
      trashButton.target.closest(".cards__card-container").remove()
    );
  });

  //Abrir imagen en modal
  card.querySelectorAll(".cards__img").forEach((pic) => {
    pic.addEventListener("click", function (evt) {
      openModal(modalPic);
      modalPic.querySelector(".modal__pic").src = evt.target.src;
      modalPic.querySelector(".modal__pic").alt = evt.target.alt;
      modalPic.querySelector(".modal__pic-name").textContent = evt.target.alt;
    });
  });
}

//Cerrar ventana de imagen modal
btnCloseModal(modalPic);

//Salvar datos de nuevo lugar
const saveNewPlace = function () {
  const newPlaceTitle = modalNewPlace.querySelector(
    "#modal__input_new-place-title"
  ).value;

  const newPlacePic = modalNewPlace.querySelector(
    "#modal__input_new-place-pic"
  ).value;

  addCard(newPlaceTitle, newPlacePic);
  modalNewPlace.querySelectorAll("input").forEach((inputs) => {
    inputs.value = "";
  });
};

saveAndCloseModal(modalNewPlace, saveNewPlace);

//Abrir ventana de foto de perfil
document.querySelector(".profile__pic").addEventListener("click", () => {
  openModal(modalProfilePic);
  resetValidation(modalProfilePic);
});

//Cerrar ventana de foto de perfil
btnCloseModal(modalProfilePic);

//Salvar datos de ventana de foto de perfil
const saveProfilePic = function () {
  document.querySelector(".profile__pic").style.backgroundImage = `url(${
    modalProfilePic.querySelector("#modal__input_profile-pic").value
  })`;
  document
    .querySelector(".profile__pic")
    .setAttribute(
      "alt",
      `${
        modalProfilePic.querySelector("#modal__input_profile-pic-description")
          .value
      }`
    );
};

saveAndCloseModal(modalProfilePic, saveProfilePic);

//Inicio con 6 tarjetas
initialCards.forEach((e) => {
  addCard(e.name, e.link);
});
