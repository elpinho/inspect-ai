// Create a panel in DevTools
chrome.devtools.panels.elements.createSidebarPane('Inspect AI', (sidebar) => {
  // Load the React panel
  sidebar.setPage('panel.html');

  // Create a connection to the panel
  let port: chrome.runtime.Port | null = null;

  // Listen for connections from the panel
  chrome.runtime.onConnect.addListener((connectionPort) => {
    if (connectionPort.name === 'devtools-panel') {
      port = connectionPort;
    }
  });

  // Update the panel when an element is selected
  chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
    if (!port) return;

    chrome.devtools.inspectedWindow.eval(
      /* javascript */ `(() => {
          const el = $0;
          if (!el) return null;

          function extractHTML(node) {
            // return a blank string if not a valid node
            if (!node) return ''

            // if it is a text node just return the trimmed textContent
            if (node.nodeType===3) return node.textContent.trim()

            //beyond here, only deal with element nodes
            if (node.nodeType!==1) return ''

            let html = ''

            // clone the node for its outer html sans inner html
            let outer = node.cloneNode()

            // if the node has a shadowroot, jump into it
            node = node.shadowRoot || node

            if (node.children.length) {

                // we checked for children but now iterate over childNodes
                // which includes #text nodes (and even other things)
                for (let n of node.childNodes) {

                    // if the node is a slot
                    if (n.assignedNodes) {

                        // an assigned slot
                        if (n.assignedNodes()[0]){
                            // Can there be more than 1 assigned node??
                            html += extractHTML(n.assignedNodes()[0])

                        // an unassigned slot
                        } else { html += n.innerHTML }

                    // node is not a slot, recurse
                    } else { html += extractHTML(n) }
                }

            // node has no children
            } else { html = node.innerHTML }

            // insert all the (children's) innerHTML
            // into the (cloned) parent element
            // and return the whole package
            outer.innerHTML = html
            return outer.outerHTML
        }

        })()`,
      (result, isException) => {
        if (!isException && result && port) {
          port.postMessage({
            type: 'ELEMENT_INFO',
            payload: result,
          });
        }
      }
    );
  });
});
