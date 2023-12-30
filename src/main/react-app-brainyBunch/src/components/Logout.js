const Logout = () => {
  localStorage.removeItem("username");
  window.location.href = "/";
};

export default Logout;
