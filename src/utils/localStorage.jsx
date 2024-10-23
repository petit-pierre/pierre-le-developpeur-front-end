export function setStorage(token, password) {
  localStorage.setItem("persistantState", token);
  localStorage.setItem("password", password);
}
