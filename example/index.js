printToScreen = (response) => {
  document.querySelector("#body").textContent = JSON.stringify(
    response.data,
    undefined,
    4
  );
  document.querySelector("#headers").textContent = JSON.stringify(
    response.headers,
    undefined,
    4
  );
};

function sendAPI() {
  axios
    .get("http://demo5468585.mockable.io/patients/empi/goals")
    .then((response) => {
      printToScreen(response);
      console.log(response.data);
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
    });
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

function sendAPI2() {
  axios.get("https://demo5468585.mockable.io/events").then((response) => {
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
