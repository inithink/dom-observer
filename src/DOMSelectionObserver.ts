import {DOMObserver} from "./DOMObserver";

export interface SelectionEvent {
  anchorNode: Node
  anchorOffset: number
  focusNode: Node
  focusOffset: number
}

export class DOMSelectionObserver extends DOMObserver {
  private selectionOccurred = false;
  private anchorNode: Node | undefined;
  private anchorOffset: number | undefined;
  private focusNode: Node | undefined;
  private focusOffset: number | undefined;

  init() {
    this.element.addEventListener('focus', this.onFocus);
    this.element.addEventListener('blur', this.onBlur);
    document.addEventListener('selectionchange', this.onSelect);
    document.addEventListener('mouseup', this.onEnd);
    document.addEventListener('keyup', this.onEnd);
    document.addEventListener('keydown', this.onEnd);
  }

  uninstall() {
    let element = this.element;
    if (element) {
      this.resetVariables();
      document.removeEventListener('keydown', this.onEnd);
      document.removeEventListener('keyup', this.onEnd);
      document.removeEventListener('mouseup', this.onEnd);
      document.removeEventListener('selectionchange', this.onSelect);
      element.removeEventListener('blur', this.onBlur);
      element.removeEventListener('focus', this.onFocus);
    }
  }

  onEnd = () => {
    if (this.selectionOccurred) {
      let selectionEvent: SelectionEvent = {
        anchorNode: this.anchorNode!,
        anchorOffset: this.anchorOffset!,
        focusNode: this.focusNode!,
        focusOffset: this.focusOffset!,
      };
      this.resetVariables();
      this.eventBus.fire('select', selectionEvent);
    }
  };
  onSelect = () => {
    if (this.isDisabled()) {
      return;
    }
    let selection = window.getSelection();
    if (selection) {
      if (!selection.anchorNode || !selection.focusNode) {
        return;
      }
      if (this.element!.contains(selection.anchorNode) &&
        this.element!.contains(selection.focusNode)) {
        this.selectionOccurred = true;
        this.anchorNode = selection.anchorNode;
        this.anchorOffset = selection.anchorOffset;
        this.focusNode = selection.focusNode;
        this.focusOffset = selection.focusOffset;
      }
    }
  };

  onFocus = (e: FocusEvent) => {
    this.eventBus.fire('focus');
    e.stopPropagation();
  };

  onBlur = (e: FocusEvent) => {
    this.eventBus.fire('blur');
    e.stopPropagation();
  };

  private resetVariables() {
    this.selectionOccurred = false;
    this.anchorNode = undefined;
    this.anchorOffset = undefined;
    this.focusNode = undefined;
    this.focusOffset = undefined;
  }
}
