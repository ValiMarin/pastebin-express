const textsContainer = document.getElementById("textsContainer");
const input = document.getElementById("input");
const addText = document.getElementById("addText");

function displayText(text) {
  const div = document.createElement("div");
  const p = document.createElement("p");

  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.gap = "10px";
  div.appendChild(p);

  let cpyText;
  if (text.length > 20) {
    cpyText = text.slice(0, 5);
    cpyText += "...";
    const a = document.createElement("a");
    a.href = `fulltext.html?text=${encodeURIComponent(text)}`;
    a.textContent = "View full";
    a.classList.add("btn", "btn-primary", "ms-2");
    div.appendChild(a);
  } else cpyText = text;

  p.textContent = cpyText;
  textsContainer.appendChild(div);
}

fetch("http://localhost:3000/paste")
  .then((res) => res.json())
  .then((data) => data.forEach((text) => displayText(text.content)))
  .catch((err) => console.error(err));

addText.addEventListener("click", () => {
  const text = input.value.trim();

  input.value = "";

  if (!text) return;

  fetch("http://localhost:3000/paste", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: text }),
  })
    .then((res) => res.json())
    .then((newPaste) => {
      displayText(newPaste.content);
    })
    .catch((err) => console.error(err));
});
