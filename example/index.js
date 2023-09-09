printToScreen = (response) => {
  document.querySelector("#body").textContent = JSON.stringify(
    response.data,
    undefined,
    4,
  );
  document.querySelector("#headers").textContent = JSON.stringify(
    response.headers,
    undefined,
    4,
  );
  document.querySelector("#status").textContent = JSON.stringify(
    response.status,
    undefined,
    4,
  );
};

function sendAPI200() {
  axios.get("http://demo6210424.mockable.io/a").then((response) => {
    printToScreen(response);
    console.log(response.data);
    console.log(response.headers);
  });
}

function fetchAPI200() {
  fetch("http://demo6210424.mockable.io/a").then((response) => {
    printToScreen(response);
    response.json().then(console.log);
    console.log(response.headers);
  });
}

function dynamicSendAPI1() {
  axios
    .get("http://demo5468585.mockable.io/patients/empi/P032/goals/ff2")
    .then((response) => {
      printToScreen(response);
      console.log(response.data);
      console.log(response.headers);
    })
    .catch(console.log);
}

function dynamicSendAPI2() {
  axios
    .get("http://demo5468585.mockable.io/patients/empi/P012/goals/ff24")
    .then((response) => {
      printToScreen(response);
      console.log(response.data);
      console.log(response.headers);
    });
}

function sendAPI409() {
  axios.get("http://demo6210424.mockable.io/409").then((response) => {
    printToScreen(response);
    console.log(response.data);
    console.log(response.headers);
  });
}

function sendAPI404() {
  axios.get("http://demo6210424.mockable.io/404").then((response) => {
    printToScreen(response);
    console.log(response.data);
    console.log(response.headers);
  });
}

function queryParam() {
  axios
    .get("https://demo5468585.mockable.io/events?name=mokku")
    .then((response) => {
      printToScreen(response);
      console.log(response.data);
      console.log(response.headers);
    });
}

function postReq() {
  axios
    .post("https://demo5468585.mockable.io/events", {
      message: "hello world",
    })
    .then((response) => {
      printToScreen(response);
      console.log(response.data);
      console.log(response.headers);
    });
}

function uploadFile(event) {
  event.preventDefault();
  var formData = new FormData();
  var imageFile = document.querySelector("#file");
  formData.append("image", imageFile.files[0]);
  axios.post("upload_file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
