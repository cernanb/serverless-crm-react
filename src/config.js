const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://serverlesscrmapi.azurewebsites.net/api"
    : "http://localhost:7071/api"

export { apiUrl }
