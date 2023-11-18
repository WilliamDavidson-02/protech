import collectionData from "./collectionData";
import productsData from "./products";

const menuBtn = document.querySelector("#menu-btn");
const menuLines = document.querySelectorAll("#menu-btn #menu-line");

const aSideContainer = document.querySelector("#aside-container");
const aSideInner = document.querySelector("#aside-inner");

const dropdownBtns = document.querySelectorAll("#dropdown-btn");
const expandIcons = document.querySelectorAll("#expand-icon");
const navLgLinks = document.querySelectorAll("#nav-lg-link");
const navLgDropdown = document.querySelectorAll("#nav-lg-dropdown");
const underlines = document.querySelectorAll("#underline");
let prevDropdownIndex = null;

const forms = document.querySelectorAll("#form");

const searchForms = document.querySelectorAll("#search");
const searchDesktopBtn = document.querySelector("#search-desktop-btn");

const scrollToTop = document.querySelector("#scrollToTop");

const collectionNavBtns = document.querySelectorAll("#collection-nav-btn");
const collectionCards = document.querySelectorAll("#collection-card");
let collectionType = 0;

const selectColorContainers = document.querySelectorAll(
  "#select-color-container"
);
const productImages = document.querySelectorAll("#product-img");

// Toggles desktop dropdown collection links.
const togglePrevCollection = (btn) => {
  if (!btn.classList.contains("font-semibold")) {
    btn.classList.add("font-semibold", "text-pro-dark-purple");
  } else {
    btn.classList.remove("font-semibold", "text-pro-dark-purple");
  }
};

const toggleCollectionCards = (collection) => {
  const dataToInsert = collectionData[collection];

  collectionCards.forEach((card, index) => {
    const [image, texts] = card.children;
    const [titleText, descriptionText] = texts.children;

    const { img, title, description } = dataToInsert[index];

    image.classList.add("opacity-0");
    titleText.classList.add("opacity-0");
    descriptionText.classList.add("opacity-0");

    setTimeout(() => {
      image.src = img;
      titleText.textContent = title;
      descriptionText.textContent = description;

      image.classList.remove("opacity-0");
      titleText.classList.remove("opacity-0");
      descriptionText.classList.remove("opacity-0");
    }, 300);
  });
};

// Smaller drop downs in nav mobile and footer.
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

const toggleDesktopDropdown = (index) => {
  const underline = underlines[index];
  const dropdown = navLgDropdown[index];
  const dropdownInner = dropdown.children[0];

  dropdownInner.addEventListener("click", (ev) => {
    ev.stopPropagation();
  });

  if (underline.classList.contains("w-0")) {
    // Open
    underline.classList.replace("w-0", "w-full");
    dropdown.classList.replace("hidden", "absolute");
    setTimeout(() => {
      dropdownInner.classList.replace("-translate-y-full", "translate-y-0");
    }, 10);
  } else {
    // Close
    underline.classList.replace("w-full", "w-0");
    dropdownInner.classList.replace("translate-y-0", "-translate-y-full");
    setTimeout(() => {
      dropdown.classList.replace("absolute", "hidden");
    }, 300);

    if (collectionType !== 0) {
      // remove previous collection class.
      togglePrevCollection(collectionNavBtns[collectionType].children[0]);

      toggleCollectionCards(collectionType);
      toggleCollectionCards(0);
      collectionType = 0;
      collectionNavBtns[collectionType].children[0].classList.add(
        "font-semibold",
        "text-pro-dark-purple"
      );
    }
  }
};

const toggleMenuBar = () => {
  const [firstLine, secondLine, thirdLine] = menuLines;
  // Toggles mobile side menu
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
  // If window is resized close side menu/dropdown
  if ((window.innerWidth > 768) & menuLines[1].classList.contains("w-0")) {
    toggleMenuBar();
  }
  if (
    (window.innerWidth <= 768) &
    underlines[prevDropdownIndex]?.classList.contains("w-full")
  ) {
    toggleDesktopDropdown(prevDropdownIndex);
    prevDropdownIndex = null;
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
      email.value = "";
      emailIcon.classList.add("text-green-500");
      setTimeout(() => {
        emailIcon.classList.remove("text-green-500");
      }, 2000);
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

scrollToTop.addEventListener("click", (ev) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

navLgLinks.forEach((link, index) => {
  link.addEventListener("click", () => {
    if (prevDropdownIndex !== index && prevDropdownIndex !== null) {
      toggleDesktopDropdown(prevDropdownIndex);
    }
    toggleDesktopDropdown(index);
    prevDropdownIndex = prevDropdownIndex !== index ? index : null;
  });
});

window.addEventListener("keydown", (ev) => {
  // Esc key to close desktop dropdown.
  if (ev.key === "Escape") {
    ev.preventDefault();
    toggleDesktopDropdown(prevDropdownIndex);
    prevDropdownIndex = null;
  }
});

collectionNavBtns.forEach((collectionBtn, index) => {
  collectionBtn.addEventListener("click", () => {
    if (collectionType === index) return;

    // remove previous collection class.
    togglePrevCollection(collectionNavBtns[collectionType].children[0]);

    // Add class to clicked btn.
    togglePrevCollection(collectionBtn.children[0]);
    toggleCollectionCards(index);

    collectionType = index;
  });
});

searchDesktopBtn.addEventListener("click", () => {
  const searchDesktop = searchDesktopBtn.querySelector("#search-input");

  searchDesktop.readOnly = !searchDesktop.readOnly;

  if (!searchDesktop.readOnly) {
    searchDesktop.focus();
  }

  searchDesktop.addEventListener("click", (ev) => {
    if (!searchDesktop.readOnly) ev.stopPropagation();
  });

  searchDesktop.classList.toggle("cursor-pointer");

  if (searchDesktopBtn.classList.contains("bg-white")) {
    searchDesktopBtn.classList.remove("bg-white", "px-3", "rounded-full");
    searchDesktop.classList.replace("w-36", "w-10");
  } else {
    searchDesktopBtn.classList.add("bg-white", "px-3", "rounded-full");
    searchDesktop.classList.replace("w-10", "w-36");
  }
});

selectColorContainers.forEach((container, prodIndex) => {
  const colors = [...container.children];
  colors.forEach((color, colorIndex) => {
    color.addEventListener("click", () => {
      colors.forEach((prevColor) => {
        if (!prevColor.classList.contains("border-2")) return;
        prevColor.classList.remove("border-2", "border-pro-light-purple");
      });

      color.classList.add("border-2", "border-pro-light-purple");

      productImages[prodIndex].src = productsData[prodIndex][colorIndex];
    });
  });
});
