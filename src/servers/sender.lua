local socket = require("socket")
local udp = socket.udp()

-- 設定目標地址和端口
local target_ip = "127.0.0.1"
local target_port = 49004

-- 持續發送資料
while true do
    -- 遞增數字，每次發送時加一
    if not counter then
      counter = 1
    else
      counter = counter + 1
    end
    -- 每公里向南爬升10公尺
    local message = string.format('{"km":%d, "height":%d, "direction":"South"}', counter, counter * 10)
    local success, err = udp:sendto(message, target_ip, target_port)
    if success then
        print("✅ 資料已成功發送:", message)
    else
        print("❌ 發送失敗:", err)
    end
    -- 等待 1 秒後再發送
    socket.sleep(1)
end
