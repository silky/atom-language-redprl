'use babel';

import {} from 'atom';
import fs from 'fs';
import path from 'path';

const PACKAGE_NAME = 'language-redprl';

class RedPRL {

  constructor() {
    this.disposables =
      null;
    this.styles = {
      css  : null,
      less : null,
      path : null,
    };
  }

  activate() {
    this.notifyComrade('Greetings');
    this.loadStyles();
    this.compileStyles();
    this.applyStyles();
  }

  deactivate() {
    this.disposables.dispose();
  }

  serialize() {
  }

  applyStyles() {
    this.notifyComrade('Compiling and applying custom styles');
    atom.styles.addStyleSheet(this.styles.css, { priority : 0 });
  }

  compileStyles() {
    this.styles.css = atom.themes.lessCache.cssForFile(null, this.styles.less);
  }

  loadStyles() {
    const pkg =
      atom.packages.getLoadedPackage(PACKAGE_NAME);
    const styles = {
      css  : null,
      less : null,
      path : null,
    };
    if (!pkg) {
      atom.notifications.addFatalError(
`${PACKAGE_NAME} failed to locate its own package instance`
      );
    } else {
      styles.path = [pkg.path, 'styles', 'redprl.less'].join(path.sep);
      try {
        styles.less = fs.readFileSync(styles.path, {
          encoding : 'utf8',
        });
      } catch (e) {
        atom.notifications.addFatalError(
`${PACKAGE_NAME} failed to read its package styles file
${e.message}`
        );
      }
    }
    this.styles = styles;
  }

  notifyComrade(msg) {
    atom.notifications.addError(`${msg}, comrade!`, { icon : 'star' });
  }

}

export default RedPRL;
