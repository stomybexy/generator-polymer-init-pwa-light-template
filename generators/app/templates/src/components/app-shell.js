
import { LitElement, html } from '@polymer/lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings';
import { connect } from 'pwa-helpers/connect-mixin';
import { installOfflineWatcher } from 'pwa-helpers/network';
import { installRouter } from 'pwa-helpers/router';
import { updateMetadata } from 'pwa-helpers/metadata';

// This element is connected to the Redux store.
import { store } from '../redux/store.js';

// These are the actions needed by this element.
import {
  navigate,
  updateOffline,
} from '../redux/actions/app.js';
import { SharedStyles } from './styles/shared-styles.js';
import { menuIcon } from './app-icons.js';


class AppShell extends connect(store)(LitElement) {
  _render({ appTitle, _page, _offline }) {
    // Anything that's related to rendering should be done in here.
    return html`
     ${SharedStyles}
    <h1>${menuIcon} ${appTitle}</h1>
    
    <!-- Main content -->
    <main role="main" class="main-content">
      <app-home class="page" active?="${_page === 'home'}"></app-home>
      <app-view404 class="page" active?="${_page === 'view404'}"></app-view404>
    </main>
    `;
  }

  static get properties() {
    return {
      appTitle: String,
      _page: String,
      _offline: Boolean
    }
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  _firstRendered() {
    installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
  }

  _didRender(properties, changeList) {
    if ('_page' in changeList) {
      const pageTitle = properties.appTitle + ' - ' + changeList._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  _stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
  }
}

window.customElements.define('app-shell', AppShell);
