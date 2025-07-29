// src/components/AlertStats.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Activity } from 'lucide-react';
import { Alert } from '@/types/Alert';

interface AlertStatsProps {
  alerts: Alert[];
}

const AlertStats: React.FC<AlertStatsProps> = ({ alerts }) => {
  return (
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
  );
};

export default AlertStats;
