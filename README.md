# Real-Time Alert Dashboard 🚨

## Objective
A live dashboard built with React.js that listens to a WebSocket server for incoming alerts in real time and displays them without needing a page refresh.

## 💻 Tech Stack
- React.js
- WebSockets
- JavaScript (ES6+)

## 📡 Expected Message Format
```json
{
  "type": "alert",
  "hostname": "PC-01",
  "message": "Unauthorized process detected"
}
```
Features
1. Connects to a WebSocket server.

2. Displays incoming alerts in a table format.

3. New alerts appear at the top of the list in real time.

USAGE:
```
git clone https://github.com/Rukundo-Bahati/Real-Time-Alert-Dashboard.git
cd 'Real-Time-Alert-Dashboard
npm install
npm start
```