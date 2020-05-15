/* *****************************************************
  Variables
***************************************************** */
// Alert Notification Banner
const alertBanner = document.getElementById('notification');
const closeIcon = document.querySelector('.close-icon');
// Projects list UL
const projectList = document.getElementById('projectList');

// Project form elements
const projectNameInput = document.getElementById('projectName');
const projectHTMLCheckbox = document.getElementById('html');
const projectCSSCheckbox = document.getElementById('css');
const projectJSCheckbox = document.getElementById('js');
const projectDetailsInput = document.getElementById('projectDetails');
const AddProjectButton = document.getElementById('addProjectButton');

// Student Invite form elements
const studentNameInput = document.getElementById('studentName');
const studentProjectSelect = document.getElementById('projectSelect');
const inviteStudentButton = document.getElementById('inviteStudentButton');

// Event Listeners

addProjectButton.addEventListener('click', e => {
  e.preventDefault(); //Don't refresh page
  if (validateForm()){
    addToProjectList();
  }
});

inviteStudentButton.addEventListener('click', e => {
  e.preventDefault();
  let success = false;
  let notificationText = "";
  const studentName = studentNameInput.value;
  const projectName = studentProjectSelect.value;
  if (studentName == "") {
    notificationText = "You must enter a student name";
  } else if(projectName == "") {
    notificationText = "You must select a project";
  } else {
    // if we were doing something we'd do it here!
    notificationText = `${studentName} was added to ${projectName}`;
    success = true;
  }
  displayNotification(notificationText, success);
});

projectList.addEventListener('click', e => {
  if(e.target.classList.contains("plus-icon")){
    e.target.parentNode.nextElementSibling.classList.toggle("hidden");
    
  }
});

inviteStudentButton.addEventListener('click', e => {});

closeIcon.addEventListener('click', () => {});

function addToProjectList() {
  const projectName = projectNameInput.value;
  const li = document.createElement("LI");
  li.innerHTML = `
          <div class="project-header flex">
            <h3 class="project-name">${projectName}</h3>
            <img class="plus-icon pointer" src="icons/plus-icon.svg" alt="Plus Icon Expand Details">
            <ul class="project-langs flex">
            ${projectHTMLCheckbox.checked ? '<li class="project-lang"><img class="html" src="icons/html5.svg" alt="HTML5 Logo"></li>' : ""}
            ${projectCSSCheckbox.checked ? '<li class="project-lang"><img class="css" src="icons/css3.svg" alt="CSS3 Logo"></li>' : ""}
            ${projectJSCheckbox.checked ? '<li class="project-lang"><img class="js" src="icons/javascript.svg" alt="JavaScript Logo"></li>' : ""}
            </ul>
          </div>
          <p class="project-info hidden">${projectDetailsInput.value}</p>
  `;
  li.classList.add("project");
  projectList.append(li);
  addProjectToSelect(projectName);
  resetForm();
}

function validateForm() {
  let notificationText = "Project was successfully added";
  let success = true
  if (projectNameInput.value == "") {
    notificationText = "Your project must have a name";
    success = false;
  } else if(projectDetailsInput.value =="") {
    notificationText = "Your project must incude details";
    success = false;
  } else if(!projectHTMLCheckbox.checked && !projectCSSCheckbox.checked && !projectJSCheckbox.checked) {
    notificationText = "You must select at least one language";
    success = false;
  }
  displayNotification(notificationText, success);
  return success;
}

function displayNotification(text, success) {
  alertBanner.firstElementChild.firstElementChild.innerText = text;
  if(success){
    alertBanner.classList.add('success');
    alertBanner.classList.remove('warning');
  } else {
    alertBanner.classList.add('warning');
    alertBanner.classList.remove('success');
  }
  alertBanner.classList.remove('hidden');
}

closeIcon.addEventListener('click', () => {
  alertBanner.classList.remove('success', 'warning');
  alertBanner.classList.add('hidden');
});

function addProjectToSelect(projectName) {
  const option = document.createElement('OPTION');
  option.innerText = projectName;
  option.setAttribute("value", projectName.replace(/\s/g, ''));
  studentProjectSelect.append(option);
}

function resetForm() {
projectNameInput.value = "";
projectHTMLCheckbox.checked = true;
projectCSSCheckbox.checked = true;
projectJSCheckbox.checked = false;
projectDetailsInput.value = "";
projectNameInput.focus();
}