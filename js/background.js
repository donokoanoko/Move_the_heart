chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.indexOf("https://www.youtube.com/watch?v=") !== -1) {
        chrome.scripting.executeScript({
            target: {
                "tabId": tabId,
                "allFrames": true
            },
            files: ["js/move_heart_listener.js"],
        });
    };
});

chrome.runtime.onInstalled.addListener(status => {
    chrome.storage.local.get(["display", "position_x", "position_y", "transparency"], save => {
        if (save.display == null) {
            chrome.storage.local.set({ "display": true, "position_x": "0", "position_y": "40", "transparency": "100" }, () => { });
        }
    });
});