export interface StundenplanCardConfig {
  type: string;
  server: string;
  username: string;
  password: string;
  height: number;
  title?: string;
  refresh_interval?: number; // Minuten zwischen automatischen Updates (Standard: 30)
}

export interface HomeAssistant {
  hassUrl(): string;
  callService(domain: string, service: string, serviceData?: any): void;
  callApi<T>(method: string, path: string, parameters?: any): Promise<T>;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: StundenplanCardConfig): void;
  getCardSize(): number;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  lovelace?: any;
  setConfig(config: StundenplanCardConfig): void;
}