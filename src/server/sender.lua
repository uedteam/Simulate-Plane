local socket = require("socket")
local udp = socket.udp()

-- 設定目標地址和端口
local target_ip = "127.0.0.1"
local target_port = 49004

-- 持續發送資料
while true do
    local message = "Hello, Receiver, This is Sender!"
    local success, err = udp:sendto(message, target_ip, target_port)
    if success then
        print("✅ 資料已成功發送:", message)
    else
        print("❌ 發送失敗:", err)
    end
    -- 等待 1 秒後再發送
    socket.sleep(1)
end
