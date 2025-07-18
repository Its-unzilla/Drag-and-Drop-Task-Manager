const taskList = document.getElementById("task-list");
let draggedItem = null;

// Attach event listeners to all tasks
function initDragAndDrop() {
  const tasks = document.querySelectorAll(".task");

  tasks.forEach(task => {
    task.addEventListener("dragstart", handleDragStart);
    task.addEventListener("dragover", handleDragOver);
    task.addEventListener("dragleave", handleDragLeave);
    task.addEventListener("drop", handleDrop);
    task.addEventListener("dragend", handleDragEnd);
  });
}

function handleDragStart(e) {
  draggedItem = this;
  this.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
}

function handleDragOver(e) {
  e.preventDefault(); // Necessary to allow drop
  if (this !== draggedItem) {
    this.classList.add("over");
  }
}

function handleDragLeave(e) {
  this.classList.remove("over");
}

function handleDrop(e) {
  e.preventDefault();
  this.classList.remove("over");

  if (this !== draggedItem) {
    const list = this.parentNode;
    const draggedIndex = [...list.children].indexOf(draggedItem);
    const targetIndex = [...list.children].indexOf(this);

    if (draggedIndex < targetIndex) {
      list.insertBefore(draggedItem, this.nextSibling);
    } else {
      list.insertBefore(draggedItem, this);
    }
  }

  updateDataStorage();
}

function handleDragEnd() {
  this.classList.remove("dragging");
  document.querySelectorAll(".task").forEach(t => t.classList.remove("over"));
}

// Save current order to localStorage or elsewhere
function updateDataStorage() {
  const tasks = [...taskList.children].map(task => task.textContent);
  console.log("Current Task Order:", tasks); // Replace with localStorage if needed
}

// Basic keyboard accessibility: reordering via arrow keys (optional)
taskList.addEventListener("keydown", e => {
  const focused = document.activeElement;
  if (!focused.classList.contains("task")) return;

  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
    const sibling = e.key === "ArrowUp" ? focused.previousElementSibling : focused.nextElementSibling;
    if (sibling) {
      taskList.insertBefore(focused, e.key === "ArrowUp" ? sibling : sibling.nextElementSibling);
      focused.focus();
      updateDataStorage();
    }
  }
});

initDragAndDrop();
