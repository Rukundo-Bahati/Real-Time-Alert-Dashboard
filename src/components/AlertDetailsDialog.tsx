import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Clock, Monitor, MessageSquare } from 'lucide-react';

interface Alert {
  id: string;
  type: string;
  hostname: string;
  message: string;
  timestamp: Date;
  severity: 'critical' | 'warning' | 'info' | 'success';
}

interface AlertDetailsDialogProps {
  alert: Alert | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertDetailsDialog: React.FC<AlertDetailsDialogProps> = ({
  alert,
  open,
  onOpenChange,
}) => {
  if (!alert) return null;

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

  const formatDetailedTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alert Details
          </DialogTitle>
          <DialogDescription>
            Detailed information about the security alert
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Severity and Status */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}`} 
                     style={{ backgroundColor: `hsl(var(--alert-${alert.severity}))` }} />
                <Badge variant={getSeverityBadgeVariant(alert.severity)} className="text-sm">
                  {alert.severity.toUpperCase()}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">Alert ID: {alert.id}</span>
            </div>
          </Card>

          {/* Main Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Source Host</span>
              </div>
              <p className="font-mono text-lg">{alert.hostname}</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Timestamp</span>
              </div>
              <p className="text-sm">{formatDetailedTimestamp(alert.timestamp)}</p>
            </Card>
          </div>

          <Separator />

          {/* Alert Message */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Alert Message</span>
            </div>
            <p className="text-foreground leading-relaxed">{alert.message}</p>
          </Card>

          {/* Additional Details */}
          <Card className="p-4">
            <h4 className="font-medium mb-3">Technical Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Alert Type:</span>
                <span className="font-mono">{alert.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Severity Level:</span>
                <span className={getSeverityColor(alert.severity)}>{alert.severity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Source System:</span>
                <span className="font-mono">{alert.hostname}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Detection Time:</span>
                <span className="font-mono">{alert.timestamp.toISOString()}</span>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDetailsDialog;