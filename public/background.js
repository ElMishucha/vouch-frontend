// When the extension is installed or updated, create the context menu item.
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "fact-check",
        title: 'Fact Check "%s"',  // %s is replaced by the selected text.
        contexts: ["selection"]   // Show menu item only when text is selected.
    });
});

// Listen for clicks on the context menu.
chrome.contextMenus.onClicked.addListener((info, tab) => {
    // Check if it's our 'translate' menu item and that some text is selected.
    if (info.menuItemId === "fact-check" && info.selectionText) {
        chrome.tabs.sendMessage(tab.id, {
            type: "FACT_CHECK",
            payload: info.selectionText
        })
    }
});
