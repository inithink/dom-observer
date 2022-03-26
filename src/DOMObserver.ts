import {EventBus} from "@inithink/event-bus";

export abstract class DOMObserver {
  private disableCount = 0;

  constructor(
    protected element: HTMLElement,
    protected eventBus: EventBus,
  ) {
  }

  isDisabled = () => {
    return this.disableCount > 0;
  };

  enable = () => {
    this.disableCount--;
    if (this.disableCount <= 0) {
      this.init();
      this.disableCount = 0;
    }
  };

  disable = () => {
    this.disableCount++;
    if (this.disableCount === 1) {
      this.uninstall();
    }
  };


  abstract init(): void;

  abstract uninstall(): void;

}
