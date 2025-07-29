import { useCallback, useEffect, useState } from 'react';
import { Alert } from '@/types/Alert';
import { getSeverity } from '@/utils/alertUtils';

export const useWebSocket = (onNewAlert: (alert: Alert) => void) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  const connectWebSocket = useCallback(() => {
    try {
      const wsUrl = 'ws://localhost:8080/alerts';
      const websocket = new WebSocket(wsUrl);

      websocket.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setConnectionAttempts(0);
      };

      websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'alert') {
            const newAlert: Alert = {
              id: `${Date.now()}-${Math.random()}`,
              type: data.type,
              hostname: data.hostname,
              message: data.message,
              timestamp: new Date(),
              severity: getSeverity(data.message),
            };
            onNewAlert(newAlert);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      websocket.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        setTimeout(() => {
          setConnectionAttempts(prev => prev + 1);
          if (connectionAttempts < 5) {
            connectWebSocket();
          }
        }, 3000);
      };

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      setIsConnected(false);
    }
  }, [connectionAttempts, onNewAlert]);

  useEffect(() => {
    connectWebSocket();
  }, [connectWebSocket]);

  return { isConnected };
};
