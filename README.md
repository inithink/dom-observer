# DOMSelectionObserver

## 이벤트 종류

- select

```typescript
export interface SelectionEvent {
  anchorNode: Node
  anchorOffset: number
  focusNode: Node
  focusOffset: number
}
```

- focus
- blur

# DOMMutationObserver

- mutation: `arg: MutationRecord[]`

# DOMKeyDownObserver

- keydown: `arg: e: KeyboardEvent`