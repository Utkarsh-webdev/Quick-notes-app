document.getElementById("noteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("note-title").value;
  const content = document.getElementById("note-content").value;

  const note = { title, content };
  addNote(note);
  saveNote(note);
  this.reset();
});

function addNote(note, index = null) {
  const section = document.getElementById("notes-section");

  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");

  noteDiv.innerHTML = `
    <h3>${note.title}</h3>
    <p>${note.content}</p>
    <div class="note-actions">
      <button class="edit-btn" onclick="editNote(this)"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="delete-btn" onclick="deleteNote(this)"><i class="fa-solid fa-eraser"></i></button>
    </div>
  `;

  section.prepend(noteDiv);
}

function deleteNote(btn) {
  const noteDiv = btn.closest(".note");
  const title = noteDiv.querySelector("h3").innerText;
  const content = noteDiv.querySelector("p").innerText;

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.filter(n => !(n.title === title && n.content === content));
  localStorage.setItem("notes", JSON.stringify(notes));

  noteDiv.remove();
}

function editNote(btn) {
  const noteDiv = btn.closest(".note");
  const title = noteDiv.querySelector("h3").innerText;
  const content = noteDiv.querySelector("p").innerText;

  // Fill the form with note values
  document.getElementById("note-title").value = title;
  document.getElementById("note-content").value = content;

  // Remove the old note from DOM and localStorage
  deleteNote(btn);
}

function saveNote(note) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.unshift(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(addNote);
}

window.onload = loadNotes;


// Theme Toggle Logic
const themeToggle = document.getElementById("theme-toggle");

// Apply saved theme on load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(`${savedTheme}-mode`);
  themeToggle.checked = savedTheme === "dark";
  toggleIcons(savedTheme); // Update the icons based on the saved theme
});


// Toggle theme on click
themeToggle.addEventListener("change", () => {
  const isDark = themeToggle.checked;
  const theme = isDark ? "dark" : "light";
  document.body.classList.remove("light-mode", "dark-mode");
  document.body.classList.add(`${theme}-mode`);
  localStorage.setItem("theme", theme);
  toggleIcons(theme); // Update icons on toggle
});

// Function to toggle the icons and move them
function toggleIcons(theme) {
  const sunIcon = document.querySelector(".fa-sun");
  const moonIcon = document.querySelector(".fa-moon");
  const ball = document.querySelector(".ball");
  
  if (theme === "dark") {
    sunIcon.style.transform = "scale(0)";
    moonIcon.style.transform = "scale(1.2)";
    ball.style.transform = "translateX(30px)";
  } else {
    sunIcon.style.transform = "scale(1)";
    moonIcon.style.transform = "scale(0)";
    ball.style.transform = "translateX(0)";
  }
}
