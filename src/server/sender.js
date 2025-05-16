import dgram from "dgram";
import dotenv from "dotenv";
import { createFakePacket } from "../utils/fake.js";

dotenv.config();

const TARGET_PORT = process.env.SENDER_PORT;
const TARGET_HOST = process.env.SENDER_HOST;

const socket = dgram.createSocket("udp4");

export function startSender() {
  if (!TARGET_PORT || !TARGET_HOST) {
    console.error("請在 .env 檔案中設定 TARGET_PORT 和 TARGET_HOST");
    process.exit(1);
  }

  if (isNaN(TARGET_PORT)) {
    console.error("TARGET_PORT 必須是數字");
    process.exit(1);
  }

  setInterval(() => {
    const message = createFakePacket();
    socket.send(message, 0, message.length, TARGET_PORT, TARGET_HOST, (err) => {
      if (err) console.error("❌ 傳送錯誤：", err);
      else console.log("✅ 已發送：", message.toString());
    });
  }, 1000);
}
