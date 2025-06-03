import { senderMessage } from "../servers/sender.js";

/**
 * 發送訊息到 UDP
 */
export const sendMessage = async (req, res) => {
  console.log(req.body);

  const { message } = req.body;
  if (!message) {
    return res.status(400).send("請提供要發送的資料");
  }
  try {
    const bufferMessage = Buffer.from(message);
    const result = await senderMessage(bufferMessage);
    res.send(result.success);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
