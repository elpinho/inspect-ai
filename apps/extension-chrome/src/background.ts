import { Message } from '@inspect-ai/shared';

// Create context menu item when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'inspect-element',
    title: 'Inspect with AI',
    contexts: ['all']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'inspect-element' && tab?.id) {
    // Send message to content script with click coordinates
    const message: Message = {
      type: 'INSPECT_ELEMENT',
      payload: {
        x: info.x,
        y: info.y
      }
    };

    chrome.tabs.sendMessage(tab.id, message);
  }
});
