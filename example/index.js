function sendAPI() {
  axios
    .get("http://demo5468585.mockable.io/patients/empi/goals")
    .then(({ data }) => {
      console.log(data);
    });
}

function sendAPI2() {
  axios.get("https://demo5468585.mockable.io/events").then(({ data }) => {
    console.log(data);
  });
}
