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
  axios.get("http://demo5488429.mockable.io/a").then((response) => {
    printToScreen(response);
    console.log(response.data);
    console.log(response.headers);
  });
}

// with url object
function sendAPIWithUrlObject200() {
  const urlInstance = new URL("/a", "http://demo5488429.mockable.io");
  console.log(urlInstance.href);

  axios.get(urlInstance).then((response) => {
    printToScreen(response);
    console.log(response.data);
    console.log(response.headers);
  });
}

// with Request object
function sendAPIWithRequestObject200() {
  const request = new Request("http://demo5488429.mockable.io/a?z=444", {
    method: "GET",
  });

  fetch(request)
    .then((response) => {
      printToScreen(response);
    })
    .catch(console.log);
}

function fetchAPI200() {
  fetch("http://demo5488429.mockable.io/a").then((response) => {
    printToScreen(response);
    response.json().then(console.log);
    console.log(response.headers);
  });
}

function dynamicSendAPI1() {
  axios
    .get("http://demo5488429.mockable.io/patients/empi/P032/goals/ff2")
    .then((response) => {
      printToScreen(response);
      console.log(response.data);
      console.log(response.headers);
    })
    .catch(console.log);
}

function dynamicSendAPI2() {
  axios
    .get("http://demo5488429.mockable.io/patients/empi/P012/goals/ff24")
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

function postReqWithRequest() {
  const request1 = new Request("https://demo5468585.mockable.io/events", {
    method: "POST",
    body: JSON.stringify({ username: "example" }),
  });

  fetch(request1).then(console.log);
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
