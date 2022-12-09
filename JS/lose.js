Swal.fire({
  title: "You're a ZOMBIE now",
  text: "You've lost",
  icon: "error",
  confirmButtonText: "Try again",
}).then(() => {
  window.location.href = "../index.html";
});
