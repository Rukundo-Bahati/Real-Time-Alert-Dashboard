
export interface Alert {
    id: string;
    type: string;
    hostname: string;
    message: string;
    timestamp: Date;
    severity: 'critical' | 'warning' | 'info' | 'success';
  }
  