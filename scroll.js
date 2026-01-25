let lastScrollTop = 0;
const header = document.getElementById("header");


window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;


  if (currentScroll > lastScrollTop && currentScroll > 50) {
    header.style.top = "-150px";
  } else {
    header.style.top = "0";
  }


  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
