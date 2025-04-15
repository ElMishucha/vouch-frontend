const container = document.createElement('div');
container.id = 'vouch-sidebar-container';
container.style.position = 'fixed';
container.style.top = '0';
container.style.right = '-600px';
container.style.width = '600px';
container.style.height = '100vh';
container.style.zIndex = '2147483647';
container.style.boxShadow = '-4px 0 10px rgba(0, 0, 0, 0.1)';
document.body.appendChild(container);

document.body.style.marginRight = '000px';

const script = document.createElement('script');
script.type = 'module';
script.src = chrome.runtime.getURL('assets/sidebar.js');
container.appendChild(script);



// Fact-Check Listener
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "FACT_CHECK") {
        const selectedText = message.payload;

        // Dispatch a CustomEvent to your React app in the shadow DOM
        window.dispatchEvent(new CustomEvent("vouch-fact-check", {
            detail: selectedText
        }));
    }
});