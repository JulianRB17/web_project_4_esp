"use strict";

const profile = document.querySelector(".profile");
const modalProfile = document.querySelector("#edit-profile");
const modal = document.querySelector(".modal");
const profileName = profile.querySelector(".profile__name");
const modalInputName = modal.querySelector("#modal__input_name");
const profileAboutMe = profile.querySelector(".profile__about-me");
const modalInputAboutMe = modal.querySelector("#modal__input_about-me");
const modalNewPlace = document.querySelector("#new-place");
const cardsTemplate = document.querySelector("#cards__template").content;
const picModal = document.querySelector("#modal-pic");

const openCloseModal = function (m) {
  m.classList.toggle("modal_opened");
};

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

//Abrir ventana de edición de perfil
profile
  .querySelector(".profile__edit-btn")
  .addEventListener("click", function () {
    openCloseModal(modalProfile);
    modalInputName.value = profileName.textContent;
    modalInputAboutMe.value = profileAboutMe.textContent;
  });

//Cerrar ventana de edición de perfil
modalProfile
  .querySelector(".modal__close-btn")
  .addEventListener("click", function () {
    openCloseModal(modalProfile);
  });

//Salvar datos de edición de perfil
modal.querySelector(".modal__save-btn").addEventListener("click", function () {
  profileName.textContent = modalInputName.value;
  profileAboutMe.textContent = modalInputAboutMe.value;
  openCloseModal(modalProfile);
});

//Abrir ventana de nuevo lugar
profile
  .querySelector(".profile__add-btn")
  .addEventListener("click", function () {
    openCloseModal(modalNewPlace);
  });

//Cerrar ventana de nuevo lugar
modalNewPlace
  .querySelector(".modal__close-btn")
  .addEventListener("click", function () {
    openCloseModal(modalNewPlace);
  });

// Agregar carta de nuevo lugar
function addCard(nameValue, linkValue) {
  const card = cardsTemplate
    .querySelector(".cards__card-container")
    .cloneNode(true);
  const cardImg = card.querySelector(".cards__img");
  card.querySelector(".cards__name").textContent = nameValue;
  cardImg.alt = nameValue;
  cardImg.src = linkValue;
  document.querySelector(".cards").append(card);
  card;

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
      picModal.classList.add("modal_opened");
      picModal.querySelector(".modal__pic").src = evt.target.src;
      picModal.querySelector(".modal__pic").alt = evt.target.alt;
      picModal.querySelector(".modal__pic-name").textContent = evt.target.alt;
    });
  });
}

//Cerrar ventana de imagen
picModal
  .querySelector(".modal__close-btn")
  .addEventListener("click", function () {
    openCloseModal(picModal);
  });

//Salvar datos de nuevo lugar
modalNewPlace
  .querySelector(".modal__save-btn")
  .addEventListener("click", function () {
    const newPlaceTitle = modalNewPlace.querySelector(
      "#modal__input_new-place-title"
    ).value;

    const newPlacePic = modalNewPlace.querySelector(
      "#modal__input_new-place-pic"
    ).value;

    const inputs = modalNewPlace.querySelectorAll("input");

    if (newPlacePic !== "" || newPlaceTitle !== "") {
      addCard(newPlaceTitle, newPlacePic);
      inputs.forEach((inputs) => {
        inputs.value = "";
      });
      openCloseModal(modalNewPlace);
    } else openCloseModal(modalNewPlace);
  });

//Inicio
initialCards.forEach((e) => {
  addCard(e.name, e.link);
});
