# 模擬飛機操作與資料傳輸專案

一個用於模擬飛機操作與資料傳輸的全端專案，支援 UDP 封包收發、Web 控制面板與資料展示，適合學習網路通訊、前後端整合與模擬系統設計。

## 目標

- 提供簡易的飛機模擬操作介面
- 展示 UDP 封包傳輸流程
- 支援 Node.js 與 Lua 雙語言範例
- 適合教學、實驗與快速原型開發

## 技術棧

- Node.js (Express, dgram)
- Lua (socket)
- 前端：HTML、CSS、Vanilla JS
- dotenv (環境變數管理)
- PM2、Nodemon (開發與部署輔助)

## 專案結構

```text
simulate-plane/
├── index.js                # 伺服器主程式 (Express)
├── package.json            # 專案設定與依賴
├── .env                    # 環境變數設定
├── public/                 # 前端靜態資源
│   ├── index.html
│   ├── style.css
│   └── script.js
├── src/
│   └── server/
│       ├── sender.js       # Node.js 發送端
│       ├── receiver.js     # Node.js 接收端
│       ├── sender.lua      # Lua 發送端
│       └── receiver.lua    # Lua 接收端
│   └── utils/
│       └── fake.js         # 假資料產生器
└── ... 其他設定與說明文件
```

## 安裝與啟動

1. 安裝依賴：

   ```bash
   npm install
   ```

2. 設定環境變數（可參考 `.env` 範例）：

   ```env
   SENDER_PORT=49005
   SENDER_HOST=127.0.0.1
   RECEIVER_PORT=49004
   RECEIVER_HOST=127.0.0.1
   PORT=3031
   ```

3. 啟動伺服器：

   ```bash
   npm start
   # 或使用 pm2
   npm run start:pm2
   ```

4. 開啟瀏覽器進入 [http://localhost:3000](http://localhost:3000)

## UDP 模擬操作

- Node.js 版本：
  - `src/server/sender.js`：發送假資料封包
  - `src/server/receiver.js`：接收封包並顯示
- Lua 版本：

  - `src/server/sender.lua`、`src/server/receiver.lua`
  - 執行方式：

    ```bash
    npm run send:lua
    npm run receive:lua
    ```

## 前端操作

- 進入首頁可看到飛行資訊與控制面板
- 透過按鈕可模擬起飛、降落等操作，並將指令送至後端

## 貢獻方式

歡迎提出 issue、PR 或建議。請遵循專案命名、格式與[重構原則](./copilot-codeGeneration-instructions.md)。

## 授權

本專案採用 ISC License。
