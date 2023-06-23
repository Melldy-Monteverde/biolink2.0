function portfolioError() {
  let btnPorfotlio = document.getElementById("btn-portfolio");

  btnPorfotlio.addEventListener("click", () => {
    Swal.fire("Hola!", "Disculpa, sigo trabjando en esta sección!", "info");
  });
}

portfolioError();
