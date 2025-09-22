export interface Message {
  type: string;
  payload?: any;
  id?: string;
}

export interface ServerStatusMessage extends Message {
  type: 'serverStatus';
  payload: {
    status: 'starting' | 'running' | 'stopped' | 'error';
    port?: number;
    url?: string;
  };
}

export interface NavigationMessage extends Message {
  type: 'navigation';
  payload: {
    action: 'navigate' | 'refresh' | 'back' | 'forward' | 'home';
    url?: string;
  };
}

export interface WebviewStateMessage extends Message {
  type: 'webviewState';
  payload: {
    action: 'save' | 'load' | 'clear';
    state?: any;
  };
}

export interface ErrorMessage extends Message {
  type: 'error';
  payload: {
    message: string;
    stack?: string;
    code?: string;
  };
}

export interface CommandMessage extends Message {
  type: 'command';
  payload: {
    command: string;
    args?: any[];
  };
}

export interface ZoomMessage extends Message {
  type: 'zoom';
  payload: {
    action: 'in' | 'out' | 'reset';
    level?: number;
  };
}

export interface ViewMessage extends Message {
  type: 'view';
  payload: {
    action: 'split' | 'fullscreen' | 'normal';
    enabled?: boolean;
  };
}

export interface DevToolsMessage extends Message {
  type: 'devtools';
  payload: {
    action: 'open' | 'close' | 'inspect';
    element?: any;
  };
}

export type CommunicationMessage =
  | ServerStatusMessage
  | NavigationMessage
  | WebviewStateMessage
  | ErrorMessage
  | CommandMessage
  | ZoomMessage
  | ViewMessage
  | DevToolsMessage;

export interface WebviewPanelState {
  url: string;
  zoomLevel: number;
  isFullscreen: boolean;
  isSplitView: boolean;
  navigationHistory: string[];
  currentHistoryIndex: number;
  devToolsOpen: boolean;
}

export interface ServerConfiguration {
  port: number;
  root: string;
  host: string;
  open: boolean;
  browser: string | null;
  cors: boolean;
  https: {
    enable: boolean;
    cert: string;
    key: string;
    passphrase: string;
  };
  proxy: {
    enable: boolean;
    baseUri: string;
    proxyUri: string;
  };
  middleware: any[];
}

export interface ExtensionConfiguration {
  webviewPanel: {
    defaultView: 'split' | 'tab' | 'window';
    initialSize: { width: number; height: number };
    retainContextWhenHidden: boolean;
    autoShowOnStartup: boolean;
    preserveState: boolean;
  };
  server: {
    syncWithLiveServer: boolean;
    independentPort: boolean;
    customPort: number;
  };
  ui: {
    theme: 'auto' | 'light' | 'dark';
    showToolbar: boolean;
    showAddressBar: boolean;
    showStatusBar: boolean;
    compactMode: boolean;
    customCss: string;
  };
  navigation: {
    historySize: number;
    enableBackForward: boolean;
    enableKeyboardShortcuts: boolean;
    autoRefreshOnFileChange: boolean;
    syncWithEditor: boolean;
    contextMenu: boolean;
  };
  development: {
    debugMode: boolean;
    showDevToolsOnStart: boolean;
    logLevel: 'error' | 'warn' | 'info' | 'debug';
    enableExperimentalFeatures: boolean;
    customUserAgent: string;
    disableCache: boolean;
  };
  advanced: {
    maxConcurrentPanels: number;
    panelTimeout: number;
    memoryLimit: number;
    enableServiceWorker: boolean;
    customHeaders: Record<string, string>;
  };
}
