import checkIcon from "../../assets/icons/bx-check.svg";
import crossIcon from "../../assets/icons/bx-x.svg";

const modalController = (function () {
  const modalContainer = document.querySelector(".modal-container");

  const createTaskModal = (editMode, taskObj) => {
    modalContainer.innerHTML = "";
    const dialog = document.createElement("dialog");

    dialog.classList.add("modal");

    dialog.innerHTML = `<form>
    <div class="modal-form-content">
      <div>
        <label class="visually-hidden" for="modal-task-title"
          >Title</label
        >
        <input
          type="text"
          id="modal-task-title"
          name="taskTitle"
          placeholder="Title"
          required
        />
      </div>
      <div>
        <label class="visually-hidden" for="modal-task-priority"
          >Priority</label
        >
        <select name="taskPriority" id="modal-task-priority" required>
          <option value="">Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div>
        <label class="visually-hidden" for="modal-task-details"
          >Details</label
        >
        <textarea
          id="modal-task-details"
          name="taskDetails"
          placeholder="Details"
          rows="5"
          cols="50"
        ></textarea>
      </div>
      <div>
        <label class="visually-hidden" for="modal-task-date"
          >Date</label
        >
        <input type="date" id="modal-task-date" name="taskDate"/>
      </div>
    </div>
    <div class="modal-btns">
      <button class="modal-form-btn modal-exit" type="button">
        <p class="visually-hidden">Exit</p>
        <svg width="24px" height="24px">
          <use xlink:href="${crossIcon}#cross" />
        </svg>
      </button>

      <button class="modal-form-btn modal-submit" type="submit">
        <p class="visually-hidden">Done</p>
        <svg width="24px" height="24px">
          <use xlink:href="${checkIcon}#check" />
        </svg>
      </button>
    </div>
  </form>`;

    modalContainer.appendChild(dialog);

    if (!editMode) return;

    _createEditModal(taskObj);
  };

  const _createEditModal = (taskObj) => {
    // const taskId = taskObj._taskId;
    const taskTitle = taskObj._taskTitle;
    const taskPriority = taskObj._taskPriority;
    const taskDetails = taskObj._taskDetails;
    const taskDate = taskObj._taskDate;
    // const taskStatus = taskObj._taskStatus;
    document
      .querySelector("#modal-task-title")
      .setAttribute("value", taskTitle);

    document.querySelector("#modal-task-details").textContent = taskDetails;

    document.querySelector("#modal-task-date").setAttribute("value", taskDate);

    switch (taskPriority) {
      case "High":
        document
          .querySelector("#modal-task-priority")
          .options[1].setAttribute("selected", "");

        break;

      case "Medium":
        document
          .querySelector("#modal-task-priority")
          .options[2].setAttribute("selected", "");

        break;

      case "Low":
        document
          .querySelector("#modal-task-priority")
          .options[3].setAttribute("selected", "");

        break;

      default:
        return;
    }
  };

  const openModal = () => {
    modalContainer.querySelector(".modal").showModal();
  };

  const closeModal = () => {
    modalContainer.querySelector(".modal").close();
    modalContainer.innerHTML = "";
  };

  const createProjectModal = () => {
    modalContainer.innerHTML = "";
    const dialog = document.createElement("dialog");

    dialog.classList.add("project-modal");
    dialog.classList.add("modal");

    dialog.innerHTML = `<form>
    <div class="modal-form-content">
      <div>
        <label class="visually-hidden" for="modal-project-name"
          >Title</label
        >
        <input
          type="text"
          id="modal-project-name"
          name="projectName"
          placeholder="Project Name"
          required
        />
      </div>
    </div>
    <div class="modal-btns">
      <button class="modal-form-btn modal-exit" type="button">
        <p class="visually-hidden">Exit</p>
        <svg width="24px" height="24px">
          <use xlink:href="${crossIcon}#cross" />
        </svg>
      </button>

      <button class="modal-form-btn modal-submit" type="submit">
        <p class="visually-hidden">Done</p>
        <svg width="24px" height="24px">
          <use xlink:href="${checkIcon}#check" />
        </svg>
      </button>
    </div>
  </form>`;

    modalContainer.appendChild(dialog);
  };

  return { createTaskModal, openModal, closeModal, createProjectModal };
})();

export { modalController };
