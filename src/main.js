import "/style.css";

import { modalController } from "./components/modalModule/modalModule";
import { cardGenerator } from "./components/cardGenerator/cardGenerator";

import { storageHandler } from "./utils/storageHandler/storageHandler";
import { inputHandler } from "./utils/inputHandler/inputHandler";
import { projectHandler } from "./utils/projectHandler/projectHandler";

// const appRoot = document.querySelector("#app");

const cardList = document.querySelector(".task-card-list");

window.addEventListener("DOMContentLoaded", () => {
  renderCards(storageHandler.getTaskData());
});
// window.addEventListener("DOMContentLoaded", loadProjectsFromStorage);
window.addEventListener("DOMContentLoaded", modalHandler);
window.addEventListener("DOMContentLoaded", handleTaskDelete);
window.addEventListener("DOMContentLoaded", categorySwitchHandler);

function renderCards(tasksArray) {
  cardGenerator.addCard(cardList, tasksArray);
}

function modalHandler() {
  const addTaskBtn = document.querySelector(".add-task-btn");
  const addProjectBtn = document.querySelector(".add-project-btn");

  addTaskBtn.addEventListener("click", () => {
    openModal(addTaskBtn);
  });
  addProjectBtn.addEventListener("click", () => {
    openModal(addProjectBtn);
  });
}

function projectModalHandler() {
  const addProjectBtn = document.querySelector(".add-project-btn");
}

function openModal(button) {
  if (button.classList.value === "add-task-btn") {
    modalController.createTaskModal(false);
    modalController.openModal();
  } else {
    modalController.createProjectModal();
    modalController.openModal();
  }

  const taskModalForm = document.querySelector(".modal form");

  handleFormSubmit(taskModalForm, button);

  closeModal();
}

function handleFormSubmit(taskModalForm, modalType) {
  const currentProject = document
    .querySelector(".project-container")
    .getAttribute("data-category");

  const projectList = document.querySelector(".project-nav-list");

  taskModalForm.addEventListener("submit", (e) => {
    if (modalType.classList.value === "add-task-btn") {
      const newTaskObj = inputHandler.getModalInputs(e, taskModalForm);
      storageHandler.addTaskData(newTaskObj, currentProject);
      renderCards(
        projectHandler.getProjectTasks(
          currentProject,
          storageHandler.getTaskData()
        )
      );
    } else {
      const newProjectObj = inputHandler.getProjectModalInputs(
        e,
        taskModalForm
      );
      projectHandler.addProject(projectList, newProjectObj.projectName);

      storageHandler.addProjectData(newProjectObj);
    }
    modalController.closeModal();
    modalHandler();
  });
}

function closeModal() {
  const exitModalBtn = document.querySelector(".modal-exit");
  exitModalBtn.addEventListener("click", () => {
    modalController.closeModal();
  });
}

function handleTaskDelete() {
  cardList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      storageHandler.deleteData(
        Number(e.target.closest(".task-card").getAttribute("data-id"))
      );
      renderCards(storageHandler.getTaskData());
    }
    modalHandler();
  });
}

function categorySwitchHandler() {
  const projectContainer = document.querySelector(".project-container");
  const navList = document.querySelector(".side-nav");
  let selectedProject;

  navList.addEventListener("click", (e) => {
    if (e.target.closest("li")) {
      selectedProject = e.target.closest("li").getAttribute("data-nav");

      projectHandler.changeProject(selectedProject, projectContainer);

      renderCards(
        projectHandler.getProjectTasks(
          selectedProject,
          storageHandler.getTaskData()
        )
      );

      navList
        .querySelector(".active-nav-item")
        .classList.remove("active-nav-item");

      navList
        .querySelector(`[data-nav="${selectedProject}"]`)
        .classList.add("active-nav-item");
    }
    modalHandler();
  });
}
