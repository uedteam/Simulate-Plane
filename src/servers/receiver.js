import dgram from "dgram";
import { WebSocketServer } from "ws";

const LISTEN_PORT = process.env.RECEIVER_PORT;
const LISTEN_HOST = process.env.RECEIVER_HOST;
const WS_PORT = process.env.WS_PORT;

const socket = dgram.createSocket("udp4");
const wss = new WebSocketServer({ port: WS_PORT });

function broadcastToClients(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
}

export function startReceiver() {
  if (!LISTEN_PORT || !LISTEN_HOST) {
    console.error("請在 .env 檔案中設定 LISTEN_PORT 和 LISTEN_HOST");
    process.exit(1);
  }

  if (isNaN(LISTEN_PORT)) {
    console.error("LISTEN_PORT 必須是數字");
    process.exit(1);
  }

  socket.on("message", (msg, rinfo) => {
    const logMsg = `📩 收到來自 ${rinfo.address}:${
      rinfo.port
    } 的訊息：${msg.toString()}`;
    console.log(logMsg);
    broadcastToClients(msg.toString());
  });

  socket.on("error", (err) => {
    console.error("❌ Socket 發生錯誤：", err);
    socket.close();
  });

  socket.on("listening", () => {
    const address = socket.address();
    console.log(`📡 接收器正在監聽 ${address.address}:${address.port}`);
    console.log(`📡 WebSocket 伺服器已啟動，監聽 port ${WS_PORT}`);
  });

  socket.bind(LISTEN_PORT, LISTEN_HOST, () => {
    console.log(`UDP Server 已啟動，監聽 port ${LISTEN_PORT}`);
  });
}
