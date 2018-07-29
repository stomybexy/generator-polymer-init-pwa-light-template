
import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from '../styles/shared-styles.js';

class AppHome extends PageViewElement {
  _render(props) {
    return html`
       ${SharedStyles}
      <section>
        <h2>Static page</h2>
        <p>This is a text-only page.</p>
        <p>It doesn't do anything other than display some static text.</p>
      </section>
    `;
  }
}

window.customElements.define('app-home', AppHome);
