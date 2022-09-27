import "/style.css";

import { modalController } from "./components/modalModule/modalModule";
import { cardGenerator } from "./components/cardGenerator/cardGenerator";
import { projectHandler } from "./components/projectHandler/projectHandler";

import { storageHandler } from "./utils/storageHandler/storageHandler";
import { inputHandler } from "./utils/inputHandler/inputHandler";

// const appRoot = document.querySelector("#app");

const cardList = document.querySelector(".task-card-list");
const projectList = document.querySelector(".project-nav-list");

window.addEventListener("DOMContentLoaded", renderProjects);
window.addEventListener("DOMContentLoaded", () => {
  renderCards(storageHandler.getTaskData());
});
// window.addEventListener("DOMContentLoaded", loadProjectsFromStorage);
window.addEventListener("DOMContentLoaded", modalHandler);
window.addEventListener("DOMContentLoaded", handleTaskDelete);
window.addEventListener("DOMContentLoaded", projectSwitchHandler);

function renderCards(tasksArray) {
  cardGenerator.addCard(cardList, tasksArray);
}

function renderProjects() {
  projectHandler.addProject(projectList, storageHandler.getProjectData());
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

      storageHandler.addProjectData(newProjectObj);

      renderProjects();
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
      storageHandler.deleteTaskData(
        Number(e.target.closest(".task-card").getAttribute("data-id"))
      );
      renderCards(storageHandler.getTaskData());
    }
    modalHandler();
  });
}

function handleProjectDelete(e) {
  if (e.target.classList.contains("project-delete-btn")) {
    storageHandler.deleteProjectData(
      e.target.closest(".project-nav-item").getAttribute("data-nav")
    );
    renderProjects();
  }
  modalHandler();
}

function projectSwitchHandler() {
  const projectContainer = document.querySelector(".project-container");
  const navList = document.querySelector(".side-nav");
  let selectedProject;

  navList.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-delete-btn")) {
      handleProjectDelete(e);
    } else if (e.target.closest("li")) {
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
