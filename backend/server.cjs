const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5566 });

console.log('WebSocket server started on ws://localhost:5566');

// Broadcast function
function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Generate random alert
function getRandomAlert() {
  const demoMessages = [
    'Unauthorized process detected',
    'Suspicious network activity from external IP',
    'Critical system file modified',
    'Warning: High CPU usage detected',
    'Security scan completed successfully',
    'Failed login attempt detected',
    'Malware signature detected in file',
    'System backup completed',
    'Network intrusion attempt blocked',
    'User privilege escalation detected'
  ];

  const hostnames = ['PC-01', 'SERVER-02', 'WEB-03', 'DB-04', 'ROUTER-01', 'FIREWALL-01'];

  const message = demoMessages[Math.floor(Math.random() * demoMessages.length)];
  const hostname = hostnames[Math.floor(Math.random() * hostnames.length)];

  return {
    type: 'alert',
    hostname,
    message
  };
}

// Broadcast alert every 4 seconds, regardless of number of clients
setInterval(() => {
  const alert = getRandomAlert();
  broadcast(alert);
}, 4000);

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
