import { Message } from '@inspect-ai/shared';

console.log('Inspect AI content script loaded');

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message: any) => {
  if (message.type === 'INSPECT_ELEMENT') {
    const element = document.elementFromPoint(
      message.payload.x as number,
      message.payload.y as number
    ) as HTMLElement;

    if (element) {
      console.log('Selected element:', {
        tag: element.tagName,
        id: element.id,
        classes: Array.from(element.classList),
        text: element.textContent?.trim()
      });

      // Highlight the element temporarily
      const originalOutline = element.style.outline;
      element.style.outline = '2px solid #00ff00';
      setTimeout(() => {
        element.style.outline = originalOutline;
      }, 1000);
    }
  }
});
