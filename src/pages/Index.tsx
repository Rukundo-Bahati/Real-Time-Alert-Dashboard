import React, { useState, useEffect } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Alert } from '@/types/Alert';
import AlertStats from '@/components/AlertStats';
import AlertList from '@/components/AlertList';
import AlertDetailsDialog from '@/components/AlertDetailsDialog';
import { getSeverity } from '@/utils/alertUtils';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';

const Index = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filtering states
  const [filterType, setFilterType] = useState<'' | 'severity' | 'hostname' | 'message' | 'date'>('');
  const [filterValue, setFilterValue] = useState('');

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setDialogOpen(true);
  };

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
      'User privilege escalation detected',
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
      severity: getSeverity(message),
    };

    setAlerts((prevAlerts) => [newAlert, ...prevAlerts.slice(0, 99)]);
  };

    // Auto-generate demo alerts in development
    useEffect(() => {
      if (process.env.NODE_ENV === 'development') {
        const demoInterval = setInterval(generateDemoAlert, 5000);
        return () => clearInterval(demoInterval);
      }
    }, []);
  

  // WebSocket connection
  const { isConnected } = useWebSocket((alert: Alert) => {
    setAlerts((prevAlerts) => [alert, ...prevAlerts]);
  });

  // Dynamic filtering logic
  const filteredAlerts = alerts.filter((alert) => {
    if (!filterType || !filterValue) return true;

    switch (filterType) {
      case 'severity':
        return alert.severity === filterValue;
      case 'hostname':
          return alert.hostname.toLowerCase().includes(filterValue.toLowerCase());
      case 'message':
            return alert.message.toLowerCase().includes(filterValue.toLowerCase());
      case 'date':
        return alert.timestamp.toISOString().slice(0, 10) === filterValue;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-dashboard-gradient p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header isConnected={isConnected} onGenerateDemoAlert={generateDemoAlert} />
        <AlertStats alerts={alerts} />

        <FilterPanel
          filterType={filterType}
          filterValue={filterValue}
          setFilterType={setFilterType}
          setFilterValue={setFilterValue}
        />

        {/*  Alert List */}
        <AlertList alerts={filteredAlerts} onAlertClick={handleAlertClick} />

        {/*  Alert Details Modal */}
        <AlertDetailsDialog
          alert={selectedAlert}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </div>
    </div>
  );
};

export default Index;
