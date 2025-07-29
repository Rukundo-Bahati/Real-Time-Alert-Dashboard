// src/components/AlertList.tsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert } from '@/types/Alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getSeverityBadgeVariant, getSeverityColor } from '@/utils/alertUtils';
import { formatTimestamp } from '@/utils/timestamp';

interface AlertListProps {
  alerts: Alert[];
  onAlertClick: (alert: Alert) => void;
  onGenerateDemoAlert?: () => void;
}

const AlertList: React.FC<AlertListProps> = ({ alerts, onAlertClick, onGenerateDemoAlert }) => {
  return (
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
            {onGenerateDemoAlert && (
              <Button onClick={onGenerateDemoAlert} variant="outline" className="mt-4">
                Generate Demo Alert
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {alerts.map((alert, index) => (
              <div
                key={alert.id}
                className={`p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer ${index === 0 ? 'alert-slide-in' : ''}`}
                onClick={() => onAlertClick(alert)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${getSeverityColor(alert.severity)}`}
                      style={{ backgroundColor: `hsl(var(--alert-${alert.severity}))` }}
                    />
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
  );
};

export default AlertList;
