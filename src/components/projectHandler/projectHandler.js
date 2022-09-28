import isToday from "date-fns/isToday";
import parseISO from "date-fns/esm/fp/parseISO/index.js";
import isThisWeek from "date-fns/isThisWeek";
import trashIcon from "../../assets/icons/bx-trash.svg";

const projectHandler = (function () {
  const addProject = (projectList, projectArray) => {
    projectList.innerHTML = "";
    for (let index = 0; index < projectArray.length; index++) {
      const listItem = document.createElement("li");

      listItem.classList.add("project-nav-item");
      listItem.setAttribute("data-nav", projectArray[index].projectName);

      listItem.innerHTML = `<div class="project-name">
        <p>${projectArray[index].projectName}</p>
      </div>
      <div class="project-btn">
        <button type="button" class="project-delete-btn">
        <p class="visually-hidden">Delete Project</p>
              <svg width="24px" height="24px">
                <use xlink:href="${trashIcon}#trash" />
              </svg>
        </button>
      </div>`;
      projectList.appendChild(listItem);
    }
  };

  const changeProject = (project, projectContainer) => {
    projectContainer.setAttribute("data-category", project);

    projectContainer.querySelector(".list-heading h2").textContent = project;
  };

  const getProjectTasks = (project, objectArray) => {
    if (!objectArray || objectArray.length < 1) {
      return;
    }
    if (project == "all") {
      return objectArray;
    } else if (project == "today") {
      return objectArray.filter((object) => isToday(parseISO(object.taskDate)));
    } else if (project == "week") {
      return objectArray.filter((object) =>
        isThisWeek(parseISO(object.taskDate))
      );
    } else {
      return objectArray.filter((object) => object.project === project);
    }
  };
  return { changeProject, addProject, getProjectTasks };
})();

export { projectHandler };
