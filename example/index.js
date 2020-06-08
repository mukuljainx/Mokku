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

function queryParam() {
  axios
    .get("https://demo5468585.mockable.io/events?name=mokku")
    .then(({ data }) => {
      console.log(data);
    });
}

function postReq() {
  axios
    .post("https://demo5468585.mockable.io/events", {
      message: "hello world",
    })
    .then(({ data }) => {
      console.log(data);
    });
}
