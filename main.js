const menuBtn = document.querySelector("#menu-btn");
const menuLines = document.querySelectorAll("#menu-btn #menu-line");

const aSideContainer = document.querySelector("#aside-container");
const aSideInner = document.querySelector("#aside-inner");

const dropdownBtns = document.querySelectorAll("#dropdown-btn");
const expandIcons = document.querySelectorAll("#expand-icon");
let prevDropdownIndex = null;

const forms = document.querySelectorAll("#form");

const searchForms = document.querySelectorAll("#search");

const toggleDropdown = (index) => {
  expandIcons[index].textContent =
    expandIcons[index].textContent.trim() === "expand_more"
      ? "expand_less"
      : "expand_more";

  const childToExpand =
    dropdownBtns[index].children[dropdownBtns[index].children.length - 1];

  childToExpand.addEventListener("click", (ev) => {
    ev.stopPropagation();
  });

  childToExpand.style.height =
    childToExpand.clientHeight === 0 ? `${childToExpand.scrollHeight}px` : 0;

  childToExpand.classList.toggle("my-4");
};

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
    // collapse
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
    if (prevDropdownIndex !== null) {
      toggleDropdown(prevDropdownIndex);
      prevDropdownIndex = null;
    }
  } else {
    // open
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
    if (prevDropdownIndex !== index && prevDropdownIndex !== null) {
      toggleDropdown(prevDropdownIndex);
    }
    toggleDropdown(index);
    prevDropdownIndex = prevDropdownIndex !== index ? index : null;
  });
});

forms.forEach((form) => {
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const email = form.querySelector("#email");
    const emailIcon = form.querySelector("#emailIcon");
    const emailRegxp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailRegxp.test(email.value)) {
      emailIcon.classList.add("text-green-500");
      setTimeout(() => {
        emailIcon.classList.remove("text-green-500");
      }, 2000);
      email.value = "";
    } else {
      emailIcon.classList.add("text-red-500", "animate-shake");
      setTimeout(() => {
        emailIcon.classList.remove("text-red-500", "animate-shake");
      }, 500);
    }
  });
});

searchForms.forEach((searchForm) => {
  searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    searchForm.querySelector("#search-input").value = "";
  });
});
