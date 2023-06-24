console.log('hello there')

function portfolioError() {
  let btnPorfotlio = document.getElementById("btn-portfolio");

  btnPorfotlio.addEventListener("click", () => {
    Swal.fire("Hi!", "Sorry, still working in this section!", "info");
  });
}

portfolioError();
