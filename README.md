# Real-Time Alert Dashboard 🚨

![alt text](image.png)

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

## USAGE
To get started with the Real-Time Alert Dashboard, follow these steps:

```bash
git clone https://github.com/Rukundo-Bahati/Real-Time-Alert-Dashboard.git
cd Real-Time-Alert-Dashboard
npm install
npm start
```

Once the app is running, it will automatically connect to the configured WebSocket server and start displaying alerts as they arrive.

> **Note:** Ensure your WebSocket server sends alert messages in the expected JSON format shown above.

## How It Works
The Real-Time Alert Dashboard listens to a WebSocket server for incoming alert messages. When an alert is received, it is displayed immediately at the top of the alert list without requiring a page refresh. This allows users to monitor alerts in real time efficiently.

The app is built with React.js and uses WebSocket APIs to maintain a live connection with the server. Alerts include information such as the hostname and message, which are displayed in a user-friendly table.

## Release Notes
### Version 1.0.0
- Initial release of the Real-Time Alert Dashboard.
- Real-time alert display using WebSocket connection.
- Alerts are shown in a sortable and searchable table.
- Supports alert messages with hostname and message details.
- Responsive UI built with React.js for seamless user experience.

## File Structure and Component Roles

```
- **src/main.tsx**: Entry point of the React app. Renders the main `App` component into the root DOM element.
- **src/App.tsx**: Main app component that sets up global providers including React Query, theme, tooltips, and routing. Defines routes for the main `Index` page and a catch-all `NotFound` page.
- **src/pages/Index.tsx**: The main dashboard page. Manages alert state, handles WebSocket connections via `useWebSocket` hook, and renders the main UI components including `Header`, `AlertStats`, `AlertList`, and `AlertDetailsDialog`.
- **src/components/Header.tsx**: Displays the app title, theme toggle switch, connection status indicator, and a button to generate demo alerts.
- **src/components/AlertStats.tsx**: Shows alert statistics such as total alerts, critical alerts, warnings, and active hosts in a grid of cards.
- **src/components/AlertList.tsx**: Displays the live alert feed in a scrollable list. Each alert shows severity, hostname, message, and timestamp. Alerts are clickable to view details.
- **src/components/AlertDetailsDialog.tsx**: Modal dialog that shows detailed information about a selected alert including severity, source host, timestamp, message, and technical details.
- **src/components/ThemeProvider.tsx**: Wraps the app with theme context provider supporting dark mode and system preferences.
- **src/hooks/useWebSocket.ts**: Custom hook managing the WebSocket connection to receive real-time alerts. Handles connection status, reconnection attempts, and parsing incoming alert messages.
- **src/utils/alertUtils.ts**: Utility functions for alert severity determination and related helpers.
- **src/utils/timestamp.ts**: Utility functions for formatting timestamps.
- **src/types/Alert.ts**: TypeScript type definitions for alert objects.
```
This structure provides a modular and maintainable codebase for the real-time alert dashboard application.
