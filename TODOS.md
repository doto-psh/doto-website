# Follow-up work

## Richer streaming states for Ask doto

- **What:** Distinguish connecting, generating, and partial-response states in both the compact chat and `/ask` workspace.
- **Why:** On a slow connection, the current minimal loading dots do not tell readers whether a request is queued, actively generating, or interrupted after partial output.
- **Current scope:** Keep the existing dots, error message, and retry path for this readability pass. Do not imply progress the API does not expose.
- **Dependency:** Add explicit stream-state events to the chat store and `/api/chat` response contract before designing new status copy or progress UI.
- **Acceptance:** State text is announced to assistive technology, partial content remains readable, retry preserves the prompt, and all new status text uses the semantic typography and contrast contract.
