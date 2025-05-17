import dgram from "dgram";
import dotenv from "dotenv";
import { log, error as logError } from "../utils/logger.js";
// import { createFakePacket } from "../utils/fake.js";

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const TARGET_PORT = process.env.SENDER_PORT || 41234;
const TARGET_HOST = process.env.SENDER_HOST || "127.0.0.1";

const socket = dgram.createSocket("udp4");

export function senderMessage(message) {
  return new Promise((resolve, reject) => {
    socket.send(message, 0, message.length, TARGET_PORT, TARGET_HOST, (err) => {
      if (err) {
        logError("❌ 傳送錯誤：", err);
        reject(new Error("傳送錯誤"));
      } else {
        log("✅ 已發送：", message.toString());
        resolve({ success: "資料已發送" });
      }
    });
  });

  // setInterval(() => {
  //   const message = createFakePacket();
  //   socket.send(message, 0, message.length, TARGET_PORT, TARGET_HOST, (err) => {
  //     if (err) console.error("❌ 傳送錯誤：", err);
  //     else console.log("✅ 已發送：", message.toString());
  //   });
  // }, 1000);
}
