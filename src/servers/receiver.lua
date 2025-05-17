local socket = require("socket")
local udp = socket.udp()

-- 對 localhost 監聽，或用 0.0.0.0 綁全部介面
udp:setsockname("127.0.0.1", 49005)
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