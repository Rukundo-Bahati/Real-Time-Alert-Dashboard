import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { AlertTriangle, Wifi, WifiOff, Moon, Sun, Activity } from 'lucide-react';
import { useTheme } from 'next-themes';

interface Alert {
  id: string;
  type: string;
  hostname: string;
  message: string;
  timestamp: Date;
  severity: 'critical' | 'warning' | 'info' | 'success';
}

const AlertDashboard: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const { theme, setTheme } = useTheme();

  // Determine severity based on message content
  const getSeverity = (message: string): Alert['severity'] => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('critical') || lowerMessage.includes('unauthorized') || lowerMessage.includes('attack')) {
      return 'critical';
    }
    if (lowerMessage.includes('warning') || lowerMessage.includes('suspicious')) {
      return 'warning';
    }
    if (lowerMessage.includes('success') || lowerMessage.includes('resolved')) {
      return 'success';
    }
    return 'info';
  };

  // Connect to WebSocket server
  const connectWebSocket = useCallback(() => {
    try {
      // For demo purposes, we'll use a mock WebSocket URL
      // In production, replace with your actual WebSocket server URL
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
              severity: getSeverity(data.message)
            };
            
            setAlerts(prevAlerts => [newAlert, ...prevAlerts.slice(0, 99)]); // Keep only last 100 alerts
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      websocket.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        
        // Attempt to reconnect after a delay
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

      setWs(websocket);
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      setIsConnected(false);
    }
  }, [connectionAttempts]);

  // Generate demo alerts for testing
  const generateDemoAlert = () => {
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
    
    const newAlert: Alert = {
      id: `demo-${Date.now()}-${Math.random()}`,
      type: 'alert',
      hostname,
      message,
      timestamp: new Date(),
      severity: getSeverity(message)
    };
    
    setAlerts(prevAlerts => [newAlert, ...prevAlerts.slice(0, 99)]);
  };

  useEffect(() => {
    connectWebSocket();
    
    // Generate demo alerts every 5 seconds for demonstration
    const demoInterval = setInterval(generateDemoAlert, 5000);
    
    return () => {
      if (ws) {
        ws.close();
      }
      clearInterval(demoInterval);
    };
  }, [connectWebSocket]);

  const getSeverityBadgeVariant = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      case 'success': return 'default';
      default: return 'outline';
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical': return 'text-alert-critical';
      case 'warning': return 'text-alert-warning';
      case 'success': return 'text-alert-success';
      default: return 'text-alert-info';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-dashboard-gradient p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              Live Alert Dashboard
            </h1>
            <p className="text-muted-foreground">Real-time security monitoring system</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
              <Moon className="h-4 w-4" />
            </div>
            
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              {isConnected ? (
                <Wifi className="h-5 w-5 text-alert-success connection-pulse" />
              ) : (
                <WifiOff className="h-5 w-5 text-alert-critical" />
              )}
              <span className={`text-sm font-medium ${isConnected ? 'text-alert-success' : 'text-alert-critical'}`}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            
            {/* Demo Alert Button */}
            <Button onClick={generateDemoAlert} variant="outline" size="sm">
              Generate Demo Alert
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Alerts</p>
                <p className="text-2xl font-bold">{alerts.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-alert-critical">
                  {alerts.filter(alert => alert.severity === 'critical').length}
                </p>
              </div>
              <div className="h-8 w-8 rounded bg-alert-critical/20 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-alert-critical" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold text-alert-warning">
                  {alerts.filter(alert => alert.severity === 'warning').length}
                </p>
              </div>
              <div className="h-8 w-8 rounded bg-alert-warning/20 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-alert-warning" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Hosts</p>
                <p className="text-2xl font-bold">
                  {new Set(alerts.map(alert => alert.hostname)).size}
                </p>
              </div>
              <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center">
                <Activity className="h-4 w-4 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Alerts List */}
        <Card className="shadow-card">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Live Alert Feed</h2>
            <p className="text-sm text-muted-foreground">Latest security alerts from monitored systems</p>
          </div>
          
          <div className="max-h-[600px] overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No alerts received yet. Waiting for incoming data...</p>
                <Button onClick={generateDemoAlert} variant="outline" className="mt-4">
                  Generate Demo Alert
                </Button>
              </div>
            ) : (
              <div className="space-y-1">
                {alerts.map((alert, index) => (
                  <div
                    key={alert.id}
                    className={`p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors ${
                      index === 0 ? 'alert-slide-in' : ''
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-2 h-2 rounded-full mt-2 ${getSeverityColor(alert.severity)}`} 
                             style={{ backgroundColor: `hsl(var(--alert-${alert.severity}))` }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={getSeverityBadgeVariant(alert.severity)} className="text-xs">
                              {alert.severity.toUpperCase()}
                            </Badge>
                            <span className="font-mono text-sm font-medium">{alert.hostname}</span>
                          </div>
                          <p className="text-sm text-foreground">{alert.message}</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {formatTimestamp(alert.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AlertDashboard;