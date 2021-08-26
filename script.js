"use strict";
let tasks = [];

const getPriorityName = function (priority) {
  switch (priority) {
    case "1":
      return "High";
    case "2":
      return "Medium";
    case "3":
      return "Low";
    default:
      return "";
  }
};

const deleteTask = function (i) {
  if (!confirm("Are you sure ?")) return;
  tasks.splice(i, 1);
  renderTable();
};
const moveUp = function (i) {
  if (i == 0) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i - 1];
  tasks[i - 1] = oldTask;
  renderTable();
};
const moveDown = function (i) {
  if (i == tasks.length - 1) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i + 1];
  tasks[i + 1] = oldTask;
  renderTable();
};

const renderTable = function () {
  const tbody = document.querySelector("#tasks_tbody");
  tbody.innerHTML = "";
  tasks.forEach((t, i) => {
    const row = `
        <tr>
        <td>${i + 1}</td>
        <td>${t.name}</td>
        <td>${getPriorityName(t.priority)}</td>
        <td>
        ${
          i > 0
            ? `<button class="btn btn-sm btn-secondary" onclick="moveUp(${i})">Up</button>`
            : ``
        }
        ${
          i < tasks.length - 1
            ? `<button class="btn btn-sm btn-secondary" onclick="moveDown(${i})">Down</button>`
            : ``
        }
        </td>
        <td>
        <button class="btn btn-primary btn-sm" onclick ="editTask(this, ${i})">Edit</button>
        <button class="btn btn-success btn-sm save" onclick="saveTask(this, ${i})" style="display:none;">Save</button>
        <button class="btn btn-danger btn-sm cancel" onclick="renderTable()" style="display:none;">Cancel</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${i})">Delete</button></td>
        </tr>
        `;
    tbody.insertAdjacentHTML("beforeEnd", row);
  });
};

//Edit an existing task.
const editTask=function(element,index){
  element.style.display="none";
  element.parentNode.querySelector(".save").style.display = "inline";
  element.parentNode.querySelector(".cancel").style.display = "inline";
  const task  = tasks[index];
  const children = element.parentNode.parentNode.children;
  children[1].innerHTML = `<input type="text" class="form-control" value=${task.name} />`;
  children[2].innerHTML = `<select class="form-control">
  <option value="1">High</option>
  <option value="2">Medium</option>
  <option value="3">Low</option>
  </select>`;
}

const saveTask = function (element, index){
  const task  = tasks[index];
  const children = element.parentNode.parentNode.children;
  task.name = children[1].firstElementChild.value;
  task.priority = children[2].firstElementChild.value;
  renderTable();
}  

const addTask = function () {
  console.log(this);
  const taskName = document.querySelector("#task_name").value;
  const priority = document.querySelector("#task_priority").value;
  if (taskName !== "" && priority > 0) {
    tasks.push({
      name: taskName,
      priority: priority,
    });
    renderTable();
  }
};

document.querySelector("#add").addEventListener("click", addTask);