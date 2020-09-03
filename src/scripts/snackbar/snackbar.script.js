import "./snackbar.css";

export function showSnackbar(message) {
  const x = document.getElementById("snackbar");
  x.innerHTML = message;
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
}
