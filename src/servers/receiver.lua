local socket = require("socket")
local udp = socket.udp()

-- 設定目標地址和端口
-- 對 localhost 監聽，或用 0.0.0.0 綁全部介面
-- 如果需要監聽特定 IP，請修改下面的 IP 地址
local target_ip = os.getenv("RECEIVER_HOST")
local target_port = os.getenv("RECEIVER_PORT")

udp:setsockname(target_ip, target_port)
udp:settimeout(3)

print("🔄 開始等待 UDP 封包...")

while true do
  local data, ip, port = udp:receivefrom()
  if data then
    print("📩 收到資料:", data, ip, port)
  else
    print("❌ 沒有收到資料")
  end
end