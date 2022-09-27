const storageHandler = (function () {
  let _taskDataStorage = [];
  let _projectDataStorage = [];

  const addTaskData = (dataObj, project) => {
    if (getTaskData()) _taskDataStorage = getTaskData();

    dataObj.taskId = _generateId();
    dataObj.project = project;

    _taskDataStorage.push(dataObj);

    storeData("data", _taskDataStorage);
  };

  const deleteTaskData = (taskId) => {
    _taskDataStorage = getTaskData();

    const taskIndex = _taskDataStorage.findIndex(
      (task) => task.taskId == taskId
    );

    if (taskIndex === -1) return;
    _taskDataStorage.splice(taskIndex, 1);

    storeData("data", _taskDataStorage);
  };

  const editData = () => {
    _taskDataStorage = getTaskData();
  };

  const storeData = (dataKey, dataArray) => {
    localStorage.setItem(dataKey, JSON.stringify(dataArray));
  };

  const getTaskData = () => {
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

    console.log(_projectDataStorage);
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
    getTaskData,
    deleteTaskData,
    editData,
    storeData,
    addProjectData,
    getProjectData,
    deleteProjectData,
  };
})();

export { storageHandler };
