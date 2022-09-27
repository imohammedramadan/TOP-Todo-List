const storageHandler = (function () {
  let _taskDataStorage = [];
  let _taskProjectStorage = [];

  const addTaskData = (dataObj, project) => {
    if (getTaskData()) _taskDataStorage = getTaskData();

    dataObj.taskId = _generateId();
    dataObj.project = project;

    _taskDataStorage.push(dataObj);

    storeData("data", _taskDataStorage);
  };

  const deleteData = (taskId) => {
    _taskDataStorage = getTaskData();

    if (!_taskDataStorage) return;

    if (_taskDataStorage.length === 0) localStorage.removeItem("data");

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
    if (getProjectData()) _taskProjectStorage = getProjectData();

    _taskProjectStorage.push(projectObj);

    storeData("projectData", _taskProjectStorage);
  };

  const getProjectData = () => {
    if (!localStorage.getItem("projectData")) {
      _taskProjectStorage = [];
    } else {
      return JSON.parse(localStorage.getItem("projectData"));
    }
  };

  const _generateId = () => {
    return _taskDataStorage.length === 0
      ? 1
      : _taskDataStorage[_taskDataStorage.length - 1].taskId + 1;
  };

  return {
    addTaskData,
    getTaskData,
    deleteData,
    editData,
    storeData,
    addProjectData,
    getProjectData,
  };
})();

export { storageHandler };
