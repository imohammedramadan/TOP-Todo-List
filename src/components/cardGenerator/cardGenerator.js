import checkIcon from "../../assets/icons/bx-check.svg";
import crossIcon from "../../assets/icons/bx-x.svg";
import trashIcon from "../../assets/icons/bx-trash.svg";
import editIcon from "../../assets/icons/bx-edit-alt.svg";

const cardGenerator = (function () {
  const addCard = (parent, dataArray) => {
    if (!dataArray) {
      _addTaskBtn(parent);
      return;
    }

    parent.innerHTML = "";

    for (let index = 0; index < dataArray.length; index++) {
      const listItem = document.createElement("li");
      listItem.classList.add("task-card");
      listItem.setAttribute("data-id", dataArray[index].taskId);
      const taskStatus = dataArray[index].taskStatus;
      let statusIcon;
      let statusBtnClass;
      let srStatusText;
      if (taskStatus === true) {
        statusIcon = `${crossIcon}#cross`;
        statusBtnClass = "done-btn status-done";
        srStatusText = "not Done";
      } else {
        statusIcon = `${checkIcon}#check`;
        statusBtnClass = "done-btn";
        srStatusText = "Done";
      }

      listItem.innerHTML = `
      <div class="card-title">
        <h3>${dataArray[index].taskTitle}</h3>
      </div>
      <div class="card-priority priority-${dataArray[index].taskPriority}">
        <p>${dataArray[index].taskPriority}</p>
      </div>
      <div class="card-details">
        <p>
        ${dataArray[index].taskDetails}
        </p>
      </div>
      <div class="card-date">
        <p>${dataArray[index].taskDate}</p>
      </div>
      <div class="card-controls">
        <ul class="controls-list">
          <li class="control-item">
            <button type="button" class="delete-btn">
              <p class="visually-hidden">Delete</p>
              <svg width="24px" height="24px">
                <use xlink:href="${trashIcon}#trash" />
              </svg>
            </button>
          </li>
          <li class="control-item">
            <button type="button" class="edit-btn">
              <p class="visually-hidden">Edit</p>
              <svg width="24px" height="24px">
                <use xlink:href="${editIcon}#edit" />
              </svg>
            </button>
          </li>
          <li class="control-item">
            <button type="button" class="${statusBtnClass}">
              <p class="visually-hidden">Mark as ${srStatusText}</p>
              <svg width="24px" height="24px">
                <use xlink:href="${statusIcon}" />
              </svg>
            </button>
          </li>
        </ul>
      </div>`;
      parent.appendChild(listItem);
    }

    _addTaskBtn(parent);
  };

  const _addTaskBtn = (parent) => {
    const addTaskCard = document.createElement("li");
    addTaskCard.classList.add("task-card", "add-task-card");
    addTaskCard.innerHTML = `<div class="add-task-btn-container">
      <button type="button" class="add-task-btn">
        <p>
          Add <br />
          new <br />
          task
        </p>
      </button>
    </div>`;

    parent.appendChild(addTaskCard);
  };

  return { addCard };
})();

export { cardGenerator };
