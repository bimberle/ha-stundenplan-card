import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { StundenplanCardConfig, HomeAssistant } from './types';

@customElement('ha-stundenplan-card')
export class StundenplanCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: StundenplanCardConfig;
  @state() private stundenplanData: any = {};
  @state() private isLoading = false;
  @state() private error: string | null = null;
  @state() private modalOpen = false;
  @state() private modalImageSrc = '';
  @state() private modalTitle = '';

  public setConfig(config: StundenplanCardConfig): void {
    if (!config) {
      throw new Error('Ungültige Konfiguration');
    }
    
    if (!config.server) {
      throw new Error('Server-URL ist erforderlich');
    }
    
    if (!config.username) {
      throw new Error('Benutzername ist erforderlich');
    }
    
    if (!config.password) {
      throw new Error('Passwort ist erforderlich');
    }
    
    if (typeof config.height !== 'number' || config.height <= 0) {
      throw new Error('Höhe muss eine positive Zahl sein');
    }

    this.config = {
      ...config,
      type: config.type || 'custom:ha-stundenplan-card',
      height: config.height || 400,
      title: config.title || 'Stundenplan',
    };
  }

  public getCardSize(): number {
    return Math.ceil((this.config?.height || 400) / 50);
  }

  protected shouldUpdate(changedProperties: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    if (changedProperties.has('hass') && this.hass) {
      this.fetchStundenplanData();
    }

    return true;
  }

  private async fetchStundenplanData(): Promise<void> {
    if (!this.config) return;

    this.isLoading = true;
    this.error = null;

    try {
      // Build the IServ API endpoint
      // config.server already contains the base URL with port and path
      const baseUrl = this.config.server.replace(/\/+$/, ''); // Remove trailing slashes
      const apiUrl = `${baseUrl}/iserv-timetable/content/rgg-hausach.de/${this.config.username}/${encodeURIComponent(this.config.password)}`;
      
      console.log('Fetching stundenplan data from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Extract screenshot data from IServ API response
      if (data.success && data.screenshots) {
        this.stundenplanData = data.screenshots;
      } else {
        throw new Error('Keine gültigen Stundenplan-Daten erhalten');
      }
    } catch (error) {
      let errorMessage = 'Unbekannter Fehler beim Laden der Daten';
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Netzwerk-Fehler: Möglicherweise CORS-Problem oder Service nicht erreichbar';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      this.error = errorMessage;
      console.error('Fehler beim Laden der Stundenplan-Daten:', error);
      console.error('API URL war:', `${this.config.server}/iserv-timetable/content/rgg-hausach.de/${this.config.username}/***`);
    } finally {
      this.isLoading = false;
    }
  }

  private openModal(imageSrc: string, title: string) {
    this.modalImageSrc = imageSrc;
    this.modalTitle = title;
    this.modalOpen = true;
  }

  private closeModal() {
    this.modalOpen = false;
    this.modalImageSrc = '';
    this.modalTitle = '';
  }

  protected render() {
    if (!this.config || !this.hass) {
      return html`
        <ha-card>
          <div class="warning">
            Konfiguration fehlt oder ungültig
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.config.title}</div>
          <div class="server-info">${this.config.server}</div>
        </div>
        
        <div class="card-content" style="height: ${this.config.height}px;">
          ${this.isLoading
            ? html`
                <div class="loading">
                  <ha-circular-progress active></ha-circular-progress>
                  <div>Lade Stundenplan...</div>
                </div>
              `
            : this.error
            ? html`
                <div class="error">
                  <ha-icon icon="mdi:alert-circle"></ha-icon>
                  <div>${this.error}</div>
                </div>
              `
            : html`
                <div class="stundenplan-container">
                  ${this.renderStundenplan()}
                </div>
              `
          }
        </div>
        
        ${this.modalOpen ? html`
          <div class="modal-overlay" @click=${this.closeModal}>
            <div class="modal-content" @click=${(e: Event) => e.stopPropagation()}>
              <div class="modal-header">
                <h2>${this.modalTitle}</h2>
                <button class="modal-close" @click=${this.closeModal}>×</button>
              </div>
              <div class="modal-body">
                <img src="${this.modalImageSrc}" alt="${this.modalTitle}" class="modal-image" />
              </div>
            </div>
          </div>
        ` : ''}
      </ha-card>
    `;
  }

  private renderStundenplan() {
    if (!this.stundenplanData || Object.keys(this.stundenplanData).length === 0) {
      return html`
        <div class="no-data">
          <ha-icon icon="mdi:calendar-blank"></ha-icon>
          <div>Keine Stundenplan-Daten verfügbar</div>
        </div>
      `;
    }

    // Render clickable icons for screenshots
    return html`
      <div class="icon-container">
        ${Object.entries(this.stundenplanData).map(([key, screenshot]: [string, any]) => html`
          <div class="icon-section" 
               @click=${() => this.openModal(`data:image/png;base64,${screenshot.data}`, key === 'currentWeek' ? 'Aktuelle Woche' : key === 'nextWeek' ? 'Nächste Woche' : key)}>
            <div class="icon-wrapper">
              <ha-icon icon="${key === 'currentWeek' ? 'mdi:calendar-today' : 'mdi:calendar-arrow-right'}"></ha-icon>
            </div>
            <h3 class="icon-title">${key === 'currentWeek' ? 'Aktuelle Woche' : key === 'nextWeek' ? 'Nächste Woche' : key}</h3>
            <p class="icon-subtitle">Klicken zum Anzeigen</p>
          </div>
        `)}
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        --ha-card-border-radius: var(--ha-card-border-radius, 12px);
      }
      
      ha-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: var(--ha-card-border-radius);
        box-shadow: var(--ha-card-box-shadow, var(--shadow-elevation-2dp));
        background: var(--ha-card-background, var(--card-background-color));
        border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color));
      }
      
      .card-header {
        padding: var(--ha-card-header-padding, 16px);
        border-bottom: 1px solid var(--ha-card-border-color, var(--divider-color));
        background: var(--ha-card-header-background, transparent);
        border-radius: var(--ha-card-border-radius) var(--ha-card-border-radius) 0 0;
      }
      
      .name {
        font-size: var(--ha-card-header-font-size, 1.2em);
        font-weight: var(--ha-card-header-font-weight, 500);
        color: var(--ha-card-header-color, var(--primary-text-color));
        margin: 0;
        line-height: 1.2;
      }
      
      .server-info {
        font-size: 0.875rem;
        color: var(--secondary-text-color);
        opacity: 0.7;
        margin-top: 4px;
      }
      
      .card-content {
        padding: 16px;
        flex: 1;
        overflow: auto;
      }
      
      .loading,
      .error,
      .no-data {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;
        color: var(--secondary-text-color);
      }
      
      .loading ha-circular-progress {
        margin-bottom: 16px;
      }
      
      .error {
        color: var(--error-color);
      }
      
      .error ha-icon,
      .no-data ha-icon {
        --mdc-icon-size: 48px;
        margin-bottom: 16px;
        opacity: 0.5;
      }
      
      .warning {
        padding: 16px;
        color: var(--warning-color);
        text-align: center;
        font-weight: 500;
      }
      
      .stundenplan-container {
        height: 100%;
        overflow: auto;
      }
      
      .icon-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: var(--spacing, 16px);
        padding: 0;
        height: 100%;
        align-content: center;
      }
      
      .icon-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        padding: var(--spacing, 16px);
        border-radius: var(--border-radius, 8px);
        background: var(--ha-card-background, var(--card-background-color));
        border: 1px solid var(--outline-color, var(--divider-color));
        transition: all var(--transition-duration, 0.2s) var(--transition-easing, ease);
        box-shadow: var(--shadow-elevation-2dp);
        position: relative;
        overflow: hidden;
      }
      
      .icon-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--primary-color);
        opacity: 0;
        transition: opacity var(--transition-duration, 0.2s) var(--transition-easing, ease);
      }
      
      .icon-section:hover {
        border-color: var(--primary-color);
        box-shadow: var(--shadow-elevation-4dp);
        transform: translateY(-2px);
      }
      
      .icon-section:hover::before {
        opacity: 0.08;
      }
      
      .icon-section:active {
        transform: translateY(0);
        box-shadow: var(--shadow-elevation-2dp);
      }
      
      .icon-wrapper {
        background: var(--primary-color);
        border-radius: var(--border-radius, 8px);
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: var(--spacing, 12px);
        transition: all var(--transition-duration, 0.2s) var(--transition-easing, ease);
        position: relative;
        z-index: 1;
      }
      
      .icon-section:hover .icon-wrapper {
        background: var(--primary-color);
        transform: scale(1.05);
      }
      
      .icon-wrapper ha-icon {
        --mdc-icon-size: 28px;
        color: var(--primary-contrast-color, var(--text-primary-color));
      }
      
      .icon-title {
        font-size: 0.875rem;
        font-weight: var(--font-weight-medium, 500);
        margin: 0 0 4px 0;
        text-align: center;
        color: var(--primary-text-color);
        line-height: 1.2;
        position: relative;
        z-index: 1;
      }
      
      .icon-subtitle {
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        margin: 0;
        text-align: center;
        line-height: 1.2;
        position: relative;
        z-index: 1;
      }
      
      /* Modal Styles - Home Assistant conform */
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--overlay-color, rgba(0, 0, 0, 0.6));
        backdrop-filter: blur(4px);
        z-index: var(--z-index-dialog, 1000);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fade-in 0.2s ease-out;
      }
      
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slide-up {
        from { 
          opacity: 0;
          transform: translateY(20px) scale(0.95);
        }
        to { 
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      .modal-content {
        background: var(--ha-card-background, var(--card-background-color));
        border-radius: var(--ha-card-border-radius, 12px);
        max-width: min(95vw, 1200px);
        max-height: 95vh;
        overflow: hidden;
        box-shadow: var(--shadow-elevation-24dp);
        border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--outline-color));
        animation: slide-up 0.2s ease-out;
      }
      
      .modal-header {
        padding: var(--spacing, 16px) var(--spacing, 20px);
        border-bottom: 1px solid var(--outline-color, var(--divider-color));
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--ha-card-header-background, transparent);
      }
      
      .modal-header h2 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: var(--font-weight-medium, 500);
        color: var(--primary-text-color);
        line-height: 1.2;
      }
      
      .modal-close {
        background: transparent;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--secondary-text-color);
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--border-radius, 8px);
        transition: all var(--transition-duration, 0.2s) var(--transition-easing, ease);
        line-height: 1;
      }
      
      .modal-close:hover {
        background: var(--state-hover-color, var(--divider-color));
        color: var(--primary-text-color);
      }
      
      .modal-close:active {
        background: var(--state-active-color, var(--outline-color));
      }
      
      .modal-body {
        padding: 0;
        max-height: calc(95vh - 80px);
        overflow: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--scrollbar-thumb-color) transparent;
      }
      
      .modal-body::-webkit-scrollbar {
        width: 8px;
      }
      
      .modal-body::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .modal-body::-webkit-scrollbar-thumb {
        background-color: var(--scrollbar-thumb-color);
        border-radius: 4px;
      }
      
      .modal-image {
        width: 100%;
        height: auto;
        display: block;
        object-fit: contain;
        background: var(--secondary-background-color);
      }
      
      /* Responsive design for mobile */
      @media (max-width: 768px) {
        .icon-container {
          flex-direction: column;
          gap: 16px;
        }
        
        .icon-section {
          min-width: 120px;
          padding: 16px;
        }
        
        .icon-wrapper {
          width: 50px;
          height: 50px;
        }
        
        .icon-wrapper ha-icon {
          --mdc-icon-size: 26px;
        }
        
        .modal-content {
          margin: 10px;
        }
      }
    `;
  }
}