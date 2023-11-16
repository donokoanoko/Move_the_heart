chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.indexOf("https://www.youtube.com/watch?v=") !== -1) {
        chrome.scripting.executeScript({
            target: {
                "tabId": tabId,
                "allFrames": true
            },
            files: ["move_heart.js"],
        });
    };
});