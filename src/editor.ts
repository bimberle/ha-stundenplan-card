import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { StundenplanCardConfig, HomeAssistant } from './types';

@customElement('ha-stundenplan-card-editor')
export class StundenplanCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public lovelace?: any;
  @state() private config!: StundenplanCardConfig;

  public setConfig(config: StundenplanCardConfig): void {
    this.config = {
      ...config,
      type: config.type || 'custom:ha-stundenplan-card',
      server: config.server || '',
      username: config.username || '',
      password: config.password || '',
      height: config.height || 400,
      refresh_interval: config.refresh_interval || 30,
    };
  }

  protected render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="option">
          <label for="title">Titel der Karte</label>
          <ha-textfield
            id="title"
            .label=${"Titel der Karte"}
            .value=${this.config.title || 'Stundenplan'}
            .configValue=${"title"}
            @input=${this.valueChanged}
            placeholder="Stundenplan"
          ></ha-textfield>
          <div class="helper-text">
            Der Titel, der oben in der Karte angezeigt wird
          </div>
        </div>

        <div class="option">
          <label for="server">Server-URL *</label>
          <ha-textfield
            id="server"
            .label=${"Server-URL (z.B. https://stundenplan.example.com)"}
            .value=${this.config.server}
            .configValue=${"server"}
            @input=${this.valueChanged}
            placeholder="https://stundenplan.example.com"
          ></ha-textfield>
          <div class="helper-text">
            Die vollständige URL zu Ihrem Stundenplan-Server
          </div>
        </div>

        <div class="option">
          <label for="username">Benutzername *</label>
          <ha-textfield
            id="username"
            .label=${"Benutzername"}
            .value=${this.config.username}
            .configValue=${"username"}
            @input=${this.valueChanged}
          ></ha-textfield>
          <div class="helper-text">
            Ihr Benutzername für die Anmeldung am Stundenplan-Server
          </div>
        </div>

        <div class="option">
          <label for="password">Passwort *</label>
          <ha-textfield
            id="password"
            type="password"
            .label=${"Passwort"}
            .value=${this.config.password}
            .configValue=${"password"}
            @input=${this.valueChanged}
          ></ha-textfield>
          <div class="helper-text">
            Ihr Passwort für die Anmeldung am Stundenplan-Server
          </div>
        </div>

        <div class="option">
          <label for="height">Höhe (px)</label>
          <ha-textfield
            id="height"
            type="number"
            .label=${"Höhe in Pixel"}
            .value=${this.config.height}
            .configValue=${"height"}
            @input=${this.valueChanged}
            min="100"
            max="1000"
            step="50"
          ></ha-textfield>
          <div class="helper-text">
            Die Höhe der Card in Pixel (Standard: 400px)
          </div>
        </div>

        <div class="option">
          <label for="refresh_interval">Auto-Update Intervall (Minuten)</label>
          <ha-textfield
            id="refresh_interval"
            type="number"
            .label=${"Aktualisierung alle X Minuten"}
            .value=${this.config.refresh_interval}
            .configValue=${"refresh_interval"}
            @input=${this.valueChanged}
            min="0"
            max="1440"
            step="5"
          ></ha-textfield>
          <div class="helper-text">
            Automatische Aktualisierung alle X Minuten (0 = deaktiviert, Standard: 30 Min.)
          </div>
        </div>

        <div class="validation-section">
          ${this.renderValidation()}
        </div>

        <div class="preview-section">
          <div class="preview-header">Vorschau</div>
          <div class="preview-info">
            ${this.renderPreview()}
          </div>
        </div>
      </div>
    `;
  }

  private valueChanged(ev: Event): void {
    if (!this.config || !this.hass) {
      return;
    }

    const target = ev.target as any;
    const configValue = target.configValue;
    let value = target.value;

    if ((this.config as any)[configValue] === value) {
      return;
    }

    const newConfig = { ...this.config };
    
    if (configValue === 'height') {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue >= 100 && numValue <= 1000) {
        (newConfig as any)[configValue] = numValue;
      } else {
        // Bei ungültigen Werten auf Standard zurücksetzen
        (newConfig as any)[configValue] = 400;
      }
    } else if (configValue === 'refresh_interval') {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 1440) {
        (newConfig as any)[configValue] = numValue;
      } else {
        // Bei ungültigen Werten auf Standard zurücksetzen
        (newConfig as any)[configValue] = 30;
      }
    } else {
      // Trim whitespace für Text-Felder
      value = typeof value === 'string' ? value.trim() : value;
      (newConfig as any)[configValue] = value;
    }

    this.config = newConfig;
    this.configChanged();
  }

  private configChanged(): void {
    const event = new CustomEvent('config-changed', {
      detail: { config: this.config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private renderValidation() {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validierung
    if (!this.config.server) {
      errors.push('Server-URL ist erforderlich');
    } else if (!this.config.server.startsWith('http')) {
      errors.push('Server-URL muss mit http:// oder https:// beginnen');
    }

    if (!this.config.username) {
      errors.push('Benutzername ist erforderlich');
    }

    if (!this.config.password) {
      errors.push('Passwort ist erforderlich');
    }

    if (this.config.height && (this.config.height < 100 || this.config.height > 1000)) {
      warnings.push('Empfohlene Höhe liegt zwischen 100 und 1000 Pixel');
    }

    if (this.config.refresh_interval !== undefined) {
      if (this.config.refresh_interval < 0 || this.config.refresh_interval > 1440) {
        warnings.push('Auto-Update Intervall sollte zwischen 0 und 1440 Minuten liegen');
      } else if (this.config.refresh_interval > 0 && this.config.refresh_interval < 5) {
        warnings.push('Intervalle unter 5 Minuten können die Server-Performance beeinträchtigen');
      }
    }

    if (errors.length === 0 && warnings.length === 0) {
      return html`
        <div class="validation-success">
          <ha-icon icon="mdi:check-circle" style="color: var(--success-color);"></ha-icon>
          <span>Konfiguration ist vollständig</span>
        </div>
      `;
    }

    return html`
      ${errors.map(error => html`
        <div class="validation-error">
          <ha-icon icon="mdi:alert-circle" style="color: var(--error-color);"></ha-icon>
          <span>${error}</span>
        </div>
      `)}
      ${warnings.map(warning => html`
        <div class="validation-warning">
          <ha-icon icon="mdi:alert" style="color: var(--warning-color);"></ha-icon>
          <span>${warning}</span>
        </div>
      `)}
    `;
  }

  private renderPreview() {
    if (!this.config.server || !this.config.username) {
      return html`
        <div class="preview-placeholder">
          Konfigurieren Sie Server-URL und Benutzername um eine Vorschau zu sehen.
        </div>
      `;
    }

    return html`
      <div class="preview-config">
        <div class="config-item">
          <strong>Server:</strong> ${this.config.server}
        </div>
        <div class="config-item">
          <strong>Benutzer:</strong> ${this.config.username}
        </div>
        <div class="config-item">
          <strong>Höhe:</strong> ${this.config.height}px
        </div>
        <div class="config-item">
          <strong>Titel:</strong> ${this.config.title || 'Stundenplan'}
        </div>
        <div class="config-item">
          <strong>Auto-Update:</strong> ${this.config.refresh_interval === 0 ? 'Deaktiviert' : `Alle ${this.config.refresh_interval} Min.`}
        </div>
      </div>
      <div class="preview-note">
        💡 Die Card wird nach dem Speichern Stundenplan-Daten vom konfigurierten Server laden.
        ${this.config.refresh_interval && this.config.refresh_interval > 0 
          ? `📱 Daten werden automatisch alle ${this.config.refresh_interval} Minuten aktualisiert.`
          : '⚠️ Auto-Update ist deaktiviert - nur manuelle Aktualisierung möglich.'}
      </div>
    `;
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .option {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      label {
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 4px;
      }

      ha-textfield {
        width: 100%;
      }

      .helper-text {
        font-size: 0.875em;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }

      .preview-section {
        margin-top: 16px;
        padding: 16px;
        background: var(--card-background-color);
        border-radius: 8px;
        border: 1px solid var(--divider-color);
      }

      .preview-header {
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 8px;
        font-size: 1.1em;
      }

      .preview-info {
        color: var(--secondary-text-color);
        line-height: 1.4;
      }

      .preview-info strong {
        color: var(--primary-text-color);
      }

      .validation-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .validation-success,
      .validation-error,
      .validation-warning {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.9em;
      }

      .validation-success {
        background: var(--success-color, #4caf50);
        background: color-mix(in srgb, var(--success-color, #4caf50) 10%, transparent);
        color: var(--success-color, #4caf50);
      }

      .validation-error {
        background: var(--error-color, #f44336);
        background: color-mix(in srgb, var(--error-color, #f44336) 10%, transparent);
        color: var(--error-color, #f44336);
      }

      .validation-warning {
        background: var(--warning-color, #ff9800);
        background: color-mix(in srgb, var(--warning-color, #ff9800) 10%, transparent);
        color: var(--warning-color, #ff9800);
      }

      .preview-placeholder {
        color: var(--secondary-text-color);
        font-style: italic;
        text-align: center;
        padding: 16px;
      }

      .preview-config {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .config-item {
        display: flex;
        padding: 4px 0;
        border-bottom: 1px solid var(--divider-color);
      }

      .config-item strong {
        min-width: 80px;
        margin-right: 16px;
      }

      .preview-note {
        margin-top: 12px;
        padding: 12px;
        background: var(--info-color, #2196f3);
        background: color-mix(in srgb, var(--info-color, #2196f3) 10%, transparent);
        color: var(--info-color, #2196f3);
        border-radius: 6px;
        font-size: 0.9em;
      }
    `;
  }
}

// Mache den Editor für Home Assistant verfügbar
declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      getConfigElement?: () => HTMLElement;
      getStubConfig?: () => any;
    }>;
  }
}