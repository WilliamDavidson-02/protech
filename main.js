const menuBtn = document.querySelector("#menu-btn");
const menuLines = document.querySelectorAll("#menu-btn #menu-line");

const aSideContainer = document.querySelector("#aside-container");
const aSideInner = document.querySelector("#aside-inner");

const dropdownBtns = document.querySelectorAll("#dropdown-btn");
const expandIcons = document.querySelectorAll("#expand-icon");

const toggleMenuBar = () => {
  const [firstLine, secondLine, thirdLine] = menuLines;
  if (!aSideContainer.classList.contains("hidden")) {
    aSideInner.classList.replace("translate-x-0", "translate-x-full");
    setTimeout(() => {
      aSideContainer.classList.toggle("hidden");
    }, 300);
  } else {
    aSideContainer.classList.toggle("hidden");
    setTimeout(() => {
      aSideInner.classList.replace("translate-x-full", "translate-x-0");
    }, 10);
  }

  secondLine.classList.toggle("opacity-0");

  if (secondLine.classList.contains("w-0")) {
    secondLine.classList.replace("w-0", "w-8");
    firstLine.classList.remove(
      "-rotate-45",
      "w-[calc-(19*1.41421356237)px]",
      "-translate-y-[3px]"
    );
    thirdLine.classList.remove(
      "rotate-45",
      "w-[calc-(19*1.41421356237)px]",
      "translate-y-[3px]"
    );
  } else {
    secondLine.classList.replace("w-8", "w-0");
    firstLine.classList.add(
      "-rotate-45",
      "w-[calc-(19*1.41421356237)px]",
      "-translate-y-[3px]"
    );
    thirdLine.classList.add(
      "rotate-45",
      "w-[calc-(19*1.41421356237)px]",
      "translate-y-[3px]"
    );
  }
};

menuBtn.addEventListener("click", toggleMenuBar);
window.addEventListener("resize", () => {
  if ((window.innerWidth > 768) & menuLines[1].classList.contains("w-0")) {
    toggleMenuBar();
  }
});

dropdownBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    expandIcons[index].textContent =
      expandIcons[index].textContent.trim() === "expand_more"
        ? "expand_less"
        : "expand_more";
    const childToExpand = btn.children[btn.children.length - 1];
    childToExpand.addEventListener("click", (ev) => {
      ev.stopPropagation();
    });
    childToExpand.style.height =
      childToExpand.clientHeight === 0 ? `${childToExpand.scrollHeight}px` : 0;
  });
});
