const wsPort = 3001;
const wsHost =
  location.hostname === "localhost"
    ? "ws://localhost"
    : "ws://kevin-workshop.ddns.net";
const ws = new WebSocket(`${wsHost}:${wsPort}`);
const messagesDiv = document.getElementById("speed-info");
const altitudeDiv = document.getElementById("altitude-info");
const directionDiv = document.getElementById("direction-info");

ws.onopen = () => {
  console.log("✅ 已連線到 WebSocket 伺服器");
};

ws.onmessage = (event) => {
  const parsedData = JSON.parse(event.data);
  // console.log("📩 收到訊息：", parsedData.count);
  // console.log("📩 收到訊息：", parsedData.height);
  // console.log("📩 收到訊息：", parsedData.direction);

  messagesDiv.textContent = `${parsedData.km}`;
  altitudeDiv.textContent = `${parsedData.height}`;
  directionDiv.textContent = `${parsedData.direction}`;
  // messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

ws.onerror = (err) => {
  console.error("❌ WebSocket 發生錯誤：", err);
};

ws.onclose = () => {
  console.log("🔌 WebSocket 連線已關閉");
};

export const handleTakeOff = () => {
  fetch("/api/v1/send", {
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

export const handleLand = () => {
  fetch("/api/v1/send", {
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
