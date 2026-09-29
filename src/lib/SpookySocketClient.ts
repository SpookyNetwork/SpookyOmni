// apps/omni_client/src/lib/SpookySocketClient.ts
import { TelemetryFrame, SwarmSocketClient } from '../interfaces/SpookySocket';

export class SpookySocketClientImpl implements SwarmSocketClient {
    private socket: WebSocket | null = null;
    private telemetryCallback: ((frame: TelemetryFrame) => void) | null = null;
    private baseUrl: string;

    constructor(baseUrl: string = 'ws://localhost:8000') {
        this.baseUrl = baseUrl;
    }

    async connect(serviceToken: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const url = `${this.baseUrl}/api/ws/telemetry?token=${serviceToken}`;
            this.socket = new WebSocket(url);

            this.socket.onopen = () => {
                console.log('[SPOOKY_SOCKET] Connected to Swarm Telemetry');
                resolve();
            };

            this.socket.onerror = (error) => {
                console.error('[SPOOKY_SOCKET] Connection error:', error);
                reject(error);
            };

            this.socket.onmessage = (event) => {
                if (this.telemetryCallback) {
                    try {
                        const frame: TelemetryFrame = JSON.parse(event.data);
                        this.telemetryCallback(frame);
                    } catch (e) {
                        console.error('[SPOOKY_SOCKET] Failed to parse telemetry frame', e);
                    }
                }
            };

            this.socket.onclose = () => {
                console.log('[SPOOKY_SOCKET] Connection closed');
            };
        });
    }

    onTelemetry(callback: (frame: TelemetryFrame) => void): void {
        this.telemetryCallback = callback;
    }

    close(): void {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}
