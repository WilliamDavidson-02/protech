const menuBtn = document.querySelector("#menu-btn");
const menuLines = document.querySelectorAll("#menu-btn #menu-line");

menuBtn.addEventListener("click", () => {
  const [firstLine, secondLine, thirdLine] = menuLines;
  if (secondLine.classList.contains("w-0")) {
    secondLine.classList.remove("w-0", "opacity-0");
    firstLine.classList.remove(
      "-rotate-45",
      "w-[calc-(108*1.41421356237)px]",
      "-translate-y-[1px]"
    );
    thirdLine.classList.remove(
      "rotate-45",
      "w-[calc-(108*1.41421356237)px]",
      "translate-y-[1px]"
    );
  } else {
    secondLine.classList.add("w-0", "opacity-0");
    firstLine.classList.add(
      "-rotate-45",
      "w-[calc-(108*1.41421356237)px]",
      "-translate-y-[1px]"
    );
    thirdLine.classList.add(
      "rotate-45",
      "w-[calc-(108*1.41421356237)px]",
      "translate-y-[1px]"
    );
  }
});
