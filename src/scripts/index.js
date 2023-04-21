import { data } from "./data.js";
import { printLoading, toggleHeader } from "./result.js";

document
  .querySelectorAll(".toggle-menu")
  .forEach((button) => button.addEventListener("click", toggleMenu));

function toggleMenu() {
  document.querySelector("nav").classList.toggle("open");
}

document
  .querySelectorAll("nav p")
  .forEach((item) => item.addEventListener("click", toggleMenu));

document.addEventListener("click", (e) => {
  if(e.target.classList.contains("button-start")) {
    printQuestion(0);
    toggleHeader('start')
  }
});

document.querySelectorAll('.to-info').forEach(item => item.addEventListener('click', () => {
    document.querySelector('.info').scrollIntoView({behavior: "smooth"})
}))

function printQuestion(index) {
  if (index === data.length) {
    printLoading();
    return;
  }
  document.querySelector('.app').scrollIntoView({behavior: "smooth"})
  const loadingPercent = (index / data.length) * 100;
  const {question, id, img, options} = data[index];
  document.querySelector(".start").innerHTML = `
    <div class="loading-wrapper">
        <div class="loading-bar" style="width: ${loadingPercent}%"></div>
    </div>
    <h2>${question}</h2>
    ${img ? `<img src=".${img}"/>` : ""}
    <form>
    <div
        class="${
          question.includes("цвет")
            ? "colors"
            : typeof options[0] === "number"
            ? "numbers"
            : "options"
        }"
    >
        ${options
          .map((item) => {
            return `
                <label
                style="${
                  question.includes("цвет")
                    ? `background: ${item}; color: transparent`
                    : ""
                }"
                class="${
                  question.includes("цвет") ||
                  typeof options[0] === "number"
                    ? "square"
                    : ""
                }"
                >
                <input type="radio" name="${id}" required>
                <p>${item}</p>
                <span></span>
                </label>
                
                `;
          })
          .join("")}
    </div>
    <button class="next button" disabled>Далее</button>
    </form>
    `;
  checkForm();
  handleNextQuestion(index);
}

function handleNextQuestion(index) {
  document
    .querySelector(".next")
    .addEventListener("click", () => printQuestion(index + 1));
}

function checkForm() {
  document.querySelectorAll('input[type="radio"]').forEach((input) =>
    input.addEventListener("click", () => {
      document.querySelector(".next").disabled = false;
    })
  );
}
