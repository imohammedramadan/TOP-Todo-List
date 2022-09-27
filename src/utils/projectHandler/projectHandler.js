import isToday from "date-fns/isToday";
import parseISO from "date-fns/esm/fp/parseISO/index.js";
import isThisWeek from "date-fns/isThisWeek";

const projectHandler = (function () {
  const addProject = (projectList, projectName) => {
    const listItem = document.createElement("li");
    listItem.classList.add("project-nav-item");
    listItem.setAttribute("data-nav", projectName);

    listItem.innerHTML = `<p>${projectName}</p>`;
    projectList.appendChild(listItem);
  };

  const changeProject = (project, projectContainer) => {
    projectContainer.setAttribute("data-category", project);

    projectContainer.querySelector(".list-heading h2").textContent = project;
  };

  const getProjectTasks = (project, objectArray) => {
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
