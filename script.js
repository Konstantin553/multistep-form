const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
// find the index of the active card
let currentStep = formSteps.findIndex((step) => {
  return step.classList.contains("active");
});

if (currentStep < 0) {
  currentStep = 0;
  showCurrentStep();
}

// click event
multiStepForm.addEventListener("click", (e) => {
  let incrementor;
  if (e.target.matches("[data-next]")) {
    incrementor = 1;
  } else if (e.target.matches("[data-previous]")) {
    incrementor = -1;
  }

  if (incrementor == null) return;

  const inputs = [...formSteps[currentStep].querySelectorAll("input")];
  //if any of my inputs is not filled reportValidity
  const allValid = inputs.every((input) => input.reportValidity());
  if (allValid) {
    //I am only changing my currentStep if everything is valid
    currentStep += incrementor;
    showCurrentStep();
  }
});

formSteps.forEach((step) => {
  step.addEventListener("animationend", (e) => {
    formSteps[currentStep].classList.remove("hide");
    e.target.classList.toggle("hide", !e.target.classList.contains("active"));
  });
});

//show current step
function showCurrentStep() {
  formSteps.forEach((step, index) => {
    //removing the active class from the previous step and add it to the current step
    step.classList.toggle("active", index === currentStep);
  });
}
