const storageHandler = (function () {
  let _taskDataStorage = [];
  let _projectDataStorage = [];

  const addTaskData = (dataObj, project) => {
    if (getAllTasksData()) _taskDataStorage = getAllTasksData();

    dataObj.taskId = _generateId();
    dataObj.project = project;

    _taskDataStorage.push(dataObj);

    storeData("data", _taskDataStorage);
  };

  const deleteTaskData = (taskId) => {
    _taskDataStorage = getAllTasksData();

    const taskIndex = _taskDataStorage.findIndex(
      (task) => task.taskId == taskId
    );

    if (taskIndex === -1) return;
    _taskDataStorage.splice(taskIndex, 1);

    storeData("data", _taskDataStorage);
  };

  const getTaskData = (taskId) => {
    _taskDataStorage = getAllTasksData();

    const taskIndex = _taskDataStorage.findIndex(
      (task) => task.taskId == taskId
    );

    if (taskIndex === -1) return;

    return _taskDataStorage[taskIndex];
  };

  const editData = (taskId, taskObject) => {
    _taskDataStorage = getAllTasksData();

    const taskIndex = _taskDataStorage.findIndex(
      (task) => task.taskId == taskId
    );

    if (taskIndex === -1) return;

    _taskDataStorage[taskIndex].taskTitle = taskObject.taskTitle;
    _taskDataStorage[taskIndex].taskPriority = taskObject.taskPriority;
    _taskDataStorage[taskIndex].taskDetails = taskObject.taskDetails;
    _taskDataStorage[taskIndex].taskDate = taskObject.taskDate;

    storeData("data", _taskDataStorage);
  };

  const switchStatus = (taskId) => {
    _taskDataStorage = getAllTasksData();

    const taskIndex = _taskDataStorage.findIndex(
      (task) => task.taskId == taskId
    );

    if (taskIndex === -1) return;

    if (_taskDataStorage[taskIndex].taskStatus === true) {
      _taskDataStorage[taskIndex].taskStatus = false;
    } else {
      _taskDataStorage[taskIndex].taskStatus = true;
    }
    storeData("data", _taskDataStorage);

    return _taskDataStorage[taskIndex].taskStatus;
  };

  const storeData = (dataKey, dataArray) => {
    localStorage.setItem(dataKey, JSON.stringify(dataArray));
  };

  const getAllTasksData = () => {
    if (!localStorage.getItem("data")) {
      _taskDataStorage = [];
    } else {
      return JSON.parse(localStorage.getItem("data"));
    }
  };

  const addProjectData = (projectObj) => {
    if (getProjectData()) _projectDataStorage = getProjectData();

    _projectDataStorage.push(projectObj);

    storeData("projectData", _projectDataStorage);
  };

  const getProjectData = () => {
    if (!localStorage.getItem("projectData")) {
      _projectDataStorage = [];
    } else {
      return JSON.parse(localStorage.getItem("projectData"));
    }
  };

  const deleteProjectData = (projectName) => {
    _projectDataStorage = getProjectData();

    const projectIndex = _projectDataStorage.findIndex(
      (project) => project.projectName === projectName
    );

    if (projectIndex === -1) return;
    _projectDataStorage.splice(projectIndex, 1);

    storeData("projectData", _projectDataStorage);
  };

  const _generateId = () => {
    return _taskDataStorage.length === 0
      ? 1
      : _taskDataStorage[_taskDataStorage.length - 1].taskId + 1;
  };

  return {
    addTaskData,
    getAllTasksData,
    getTaskData,
    deleteTaskData,
    editData,
    switchStatus,
    storeData,
    addProjectData,
    getProjectData,
    deleteProjectData,
  };
})();

export { storageHandler };
