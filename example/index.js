function sendAPI() {
  axios
    .get("http://demo5468585.mockable.io/patients/empi/goals")
    .then(({ data }) => {
      console.log(data);
    });
}
