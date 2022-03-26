import {DOMObserver} from "./DOMObserver";

export class DOMKeyDownObserver extends DOMObserver {
  init() {
    this.element.addEventListener('keydown', this.onKeyDown);
  }

  uninstall() {
    this.element.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (e: KeyboardEvent) => {
    if (this.isDisabled()) {
      return;
    }
    this.eventBus.fire('keydown', e);
  };
}

