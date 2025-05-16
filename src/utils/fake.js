// 模擬一個簡單的資料封包（pitch, roll, yaw）
export function createFakePacket() {
  const pitch = (Math.random() * 10 - 5).toFixed(2);
  const roll = (Math.random() * 10 - 5).toFixed(2);
  const yaw = (Math.random() * 360).toFixed(2);
  const payload = `FAKE_DATA:${pitch},${roll},${yaw}`;
  return Buffer.from(payload);
}
