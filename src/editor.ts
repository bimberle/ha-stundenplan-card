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

        <div class="preview-section">
          <div class="preview-header">Vorschau</div>
          <div class="preview-info">
            Die Card wird Stundenplan-Daten von <strong>${this.config.server || 'Server nicht konfiguriert'}</strong> 
            ${this.config.username ? `für Benutzer <strong>${this.config.username}</strong>` : ''} laden.
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
    const value = target.value;

    if ((this.config as any)[configValue] === value) {
      return;
    }

    const newConfig = { ...this.config };
    
    if (configValue === 'height') {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue > 0) {
        (newConfig as any)[configValue] = numValue;
      }
    } else {
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
    }>;
  }
}

// Registriere den Editor
if ((window as any).customCards) {
  const cardConfig = (window as any).customCards.find((card: any) => card.type === 'ha-stundenplan-card');
  if (cardConfig) {
    cardConfig.getConfigElement = () => new StundenplanCardEditor();
  }
}