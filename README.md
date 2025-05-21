# 模擬飛機操作與資料傳輸專案

一個用於模擬飛機操作與資料傳輸的全端專案，支援 UDP 封包收發、Web 控制面板與資料展示，適合學習網路通訊、前後端整合與模擬系統設計。

## 目標

- 提供簡易的飛機模擬操作介面
- 展示 UDP 封包傳輸流程
- 支援 Node.js 與 Lua 雙語言範例
- 適合教學、實驗與快速原型開發

## 技術棧

- Node.js (Express, dgram, ws, winston)
- Lua (socket)
- 前端：HTML、CSS、Vanilla JS
- dotenv (環境變數管理)
- PM2、Nodemon (開發與部署輔助)
- Swagger (API 文件)

## 專案結構

```text
simulate-plane/
├── index.js                # 伺服器主程式 (Express)
├── package.json            # 專案設定與依賴
├── .env.*                  # 多環境變數設定
├── public/                 # 前端靜態資源
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── 404.html
├── src/
│   ├── controllers/
│   │   └── sendController.js
│   ├── routes/
│   │   └── send-route.js
│   ├── servers/
│   │   ├── sender.js       # Node.js 發送端
│   │   ├── receiver.js     # Node.js 接收端
│   │   ├── sender.lua      # Lua 發送端
│   │   └── receiver.lua    # Lua 接收端
│   └── utils/
│       ├── fake.js         # 假資料產生器
│       ├── logger.js       # 日誌工具
│       └── swagger.js      # Swagger 設定
├── logs/
│   ├── app.log
│   └── changelog.md
└── ... 其他設定與說明文件
```

## 安裝與啟動

1. 安裝依賴：

   ```bash
   npm install
   ```

2. 設定環境變數（可參考 `.env.development`、`.env.production` 範例）：

   ```env
   SENDER_PORT=49005
   SENDER_HOST=127.0.0.1
   RECEIVER_PORT=49004
   RECEIVER_HOST=127.0.0.1
   PORT=3031
   WS_PORT=3032
   ```

3. 啟動伺服器：

   ```bash
   npm start
   # 或使用 pm2
   npm run start:pm2
   ```

4. 開啟瀏覽器進入 [http://localhost:3031](http://localhost:3031)

## UDP 模擬操作

- Node.js 版本：
  - [`src/servers/sender.js`](src/servers/sender.js)：發送資料封包
  - [`src/servers/receiver.js`](src/servers/receiver.js)：接收封包並推播至 WebSocket
- Lua 版本：
  - [`src/servers/sender.lua`](src/servers/sender.lua)、[`src/servers/receiver.lua`](src/servers/receiver.lua)
  - 執行方式：

    ```bash
    npm run send:lua
    npm run receive:lua
    ```

## 前端操作

- 進入首頁可看到飛行資訊與控制面板
- 透過按鈕可模擬起飛、降落等操作，並將指令送至後端
- 即時資料會透過 WebSocket 顯示於面板

## API 文件

- Swagger 文件已整合，啟動伺服器後可於 [http://localhost:3031/api-docs](http://localhost:3031/api-docs) 查看

## 日誌與錯誤處理

- 所有操作與錯誤會記錄於 [`logs/app.log`](logs/app.log)
- 重大異常會於主控台顯示

## 貢獻方式

歡迎提出 issue、PR 或建議。請遵循專案命名、格式與[重構原則](./copilot-codeGeneration-instructions.md)。

## 授權

本專案僅供授權用戶或團隊內部使用，未經授權不得散布、修改或用於商業用途。如需取得授權或合作，請聯絡專案負責人。
