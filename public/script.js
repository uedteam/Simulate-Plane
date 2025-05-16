console.log("Hello, Simulate Plane!");

const handleTakeOff = () => {
  fetch("/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "The plane is taking off!" }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      console.log("Response from server:", data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

const handleLand = () => {
  fetch("/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "The plane is landing!" }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      console.log("Response from server:", data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};
