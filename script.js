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
const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("change", () => {
  document.body.classList.toggle("light");

  // Save user preference
  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

// Load theme from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    toggle.checked = true;
  }
});

