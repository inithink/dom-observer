import {DOMObserver} from "./DOMObserver";

const observerOptions: MutationObserverInit = {
  childList: true,
  characterDataOldValue: true,
  characterData: true,
  subtree: true,
};

export class DOMMutationObserver extends DOMObserver {
  private observer = new MutationObserver(this.onMutation.bind(this));

  init() {
    this.observer.observe(this.element, observerOptions);
  }

  uninstall() {
    this.observer.disconnect();
  }

  onMutation(mutations: MutationRecord[]) {
    if (mutations.length === 0 || this.isDisabled()) {
      return;
    }
    this.disable();
    try {
      this.eventBus.fire('mutation', mutations);
    } finally {
      this.enable();
    }
  }
}

