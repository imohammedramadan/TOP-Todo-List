import { modalController } from "./components/modalModule/modalModule";
import { cardGenerator } from "./components/cardGenerator/cardGenerator";
import { projectHandler } from "./components/projectHandler/projectHandler";

import { storageHandler } from "./utils/storageHandler/storageHandler";
import { inputHandler } from "./utils/inputHandler/inputHandler";

import crossImg from "./assets/icons/bx-x.svg";
import checkImg from "./assets/icons/bx-check.svg";

// const appRoot = document.querySelector("#app");

const cardList = document.querySelector(".task-card-list");
const projectList = document.querySelector(".project-nav-list");
const projectContainer = document.querySelector(".project-container");
const navList = document.querySelector(".side-nav");

window.addEventListener("DOMContentLoaded", renderProjects);
window.addEventListener("DOMContentLoaded", () => {
  renderCards(storageHandler.getAllTasksData());
});
// window.addEventListener("DOMContentLoaded", loadProjectsFromStorage);
window.addEventListener("DOMContentLoaded", modalHandler);
window.addEventListener("DOMContentLoaded", handleTaskBtnClicks);
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
          storageHandler.getAllTasksData()
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

function handleTaskBtnClicks() {
  cardList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      handleTaskDelete(e);
    } else if (e.target.classList.contains("edit-btn")) {
      handleTaskEdit(e);
    } else if (e.target.classList.contains("done-btn")) {
      switchTaskStatus(e);
    }
  });
}

function handleTaskDelete(e) {
  if (e.target.classList.contains("delete-btn")) {
    storageHandler.deleteTaskData(
      Number(e.target.closest(".task-card").getAttribute("data-id"))
    );
    renderCards(storageHandler.getAllTasksData());
  }

  const selectedProject = projectContainer.getAttribute("data-category");
  cardList.innerHTML = "";
  renderCards(
    projectHandler.getProjectTasks(
      selectedProject,
      storageHandler.getAllTasksData()
    )
  );

  modalHandler();
}

function switchToDefaultProject() {
  const defaultProject = "all";
  projectHandler.changeProject(defaultProject, projectContainer);

  cardList.innerHTML = "";
  renderCards(
    projectHandler.getProjectTasks(
      defaultProject,
      storageHandler.getAllTasksData()
    )
  );

  if (navList.querySelector(".active-nav-item")) {
    navList
      .querySelector(".active-nav-item")
      .classList.remove("active-nav-item");
  }
  navList
    .querySelector(`[data-nav="${defaultProject}"]`)
    .classList.add("active-nav-item");
}

function handleProjectDelete(e) {
  if (e.target.classList.contains("project-delete-btn")) {
    storageHandler.deleteProjectData(
      e.target.closest(".project-nav-item").getAttribute("data-nav")
    );
    renderProjects();
  }
  switchToDefaultProject();
  modalHandler();
}

function projectSwitchHandler() {
  let selectedProject;

  navList.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-delete-btn")) {
      handleProjectDelete(e);
    } else if (e.target.closest("li")) {
      selectedProject = e.target.closest("li").getAttribute("data-nav");

      projectHandler.changeProject(selectedProject, projectContainer);

      cardList.innerHTML = "";
      renderCards(
        projectHandler.getProjectTasks(
          selectedProject,
          storageHandler.getAllTasksData()
        )
      );

      if (navList.querySelector(".active-nav-item")) {
        navList
          .querySelector(".active-nav-item")
          .classList.remove("active-nav-item");
      }

      navList
        .querySelector(`[data-nav="${selectedProject}"]`)
        .classList.add("active-nav-item");
    }
    modalHandler();
  });
}

function switchTaskStatus(e) {
  const cardId = e.target.closest(".task-card").getAttribute("data-id");
  let statusIcon;
  let srStatusText;

  if (storageHandler.switchStatus(cardId)) {
    statusIcon = `${crossImg}#cross`;
    srStatusText = "Mark as not Done";
    e.target.classList.add("status-done");
  } else {
    statusIcon = `${checkImg}#check`;
    srStatusText = "Mark as Done";
    e.target.classList.remove("status-done");
  }

  e.target.querySelector("use").setAttribute("xlink:href", `${statusIcon}`);

  e.target.closest(".done-btn").querySelector(".visually-hidden").textContent =
    srStatusText;
}

function handleTaskEdit(e) {
  const cardId = e.target.closest(".task-card").getAttribute("data-id");
  const taskObject = storageHandler.getTaskData(cardId);

  modalController.createTaskModal(true, taskObject);
  const editForm = document.querySelector(".modal form");
  modalController.openModal();

  const submitBtn = document.querySelector(".modal-submit");
  const exitBtn = document.querySelector(".modal-exit");
  submitBtn.addEventListener("click", (e) => {
    if (
      editForm.querySelector("#modal-task-priority").value === "" ||
      editForm.querySelector("#modal-task-title").value === ""
    ) {
      return;
    }

    const editedTaskObject = inputHandler.getModalInputs(e, editForm);

    storageHandler.editData(cardId, editedTaskObject);

    cardList.innerHTML = "";
    renderCards(
      projectHandler.getProjectTasks("all", storageHandler.getAllTasksData())
    );
    modalController.closeModal();
  });

  exitBtn.addEventListener("click", modalController.closeModal);
  modalHandler();
}
