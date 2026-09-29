// apps/omni_client/src/interfaces/SpookySocket.ts
export interface TelemetryFrame {
    timestamp_utc: string;
    fleet_active: number;
    tasks_queued: number;
    tenant_tps_velocity: number;
    signature_tier: 'SUPER' | 'ULTRA';
}

export interface SwarmSocketClient {
    connect(serviceToken: string): Promise<void>;
    onTelemetry(callback: (frame: TelemetryFrame) => void): void;
    close(): void;
}
