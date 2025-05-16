import dgram from "dgram";
import dotenv from "dotenv";

dotenv.config();

const LISTEN_PORT = process.env.RECEIVER_PORT;
const LISTEN_HOST = process.env.RECEIVER_HOST;

const socket = dgram.createSocket("udp4");

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
    console.log(
      `📩 收到來自 ${rinfo.address}:${rinfo.port} 的訊息：`,
      msg.toString(),
    );
  });

  socket.on("error", (err) => {
    console.error("❌ Socket 發生錯誤：", err);
    socket.close();
  });

  socket.on("listening", () => {
    const address = socket.address();
    console.log(`📡 接收器正在監聽 ${address.address}:${address.port}`);
  });

  socket.bind(LISTEN_PORT, LISTEN_HOST, () => {
    console.log(`UDP Server 已啟動，監聽 port ${LISTEN_PORT}`);
  });
}
