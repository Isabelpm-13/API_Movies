if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").then((registerEvent) => {
      registerEvent.addEventListener("updatefound", () => {
        newServiceWorker = registerEvent.installing;

        newServiceWorker.addEventListener("statechange", () => {
          //if(newServiceWorker.state == 'installed' ){}

          switch (newServiceWorker.state) {
            case "installed":
              showSnackbarUpdate();

              break;
          }
        });
      });
    });
  });
}

function showSnackbarUpdate() {
  let x = document.getElementById("snackbar");
  x.className = "show";
}
