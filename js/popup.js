let setting = {};

let move_heart = function (setting) {
    let reaction_button;
    chrome.tabs.query({ active: true, currentWindow: true }, tab => {
        if (tab[0].url.indexOf("https://www.youtube.com/watch?v=") !== -1) {
            chrome.scripting.executeScript({
                target: { tabId: tab[0].id },
                function: function (setting) {
                    reaction_button = document.getElementById("chatframe").contentWindow.document.getElementById("reaction-control-panel").style;
                    reaction_button.display = setting.display ? "block" : "none";
                    reaction_button.position = "absolute";
                    reaction_button.right = setting.position.x + "px";
                    reaction_button.top = setting.position.y + "px";
                    reaction_button.opacity = setting.transparency / 100;
                },
                args: [setting]
            });
        } else if (tab[0].url.indexOf("https://studio.youtube.com/video/") !== -1) {
            chrome.scripting.executeScript({
                target: { tabId: tab[0].id },
                function: function (setting) {
                    reaction_button = document.getElementById("reaction-control-panel").style;
                    reaction_button.display = setting.display ? "block" : "none";
                    reaction_button.position = "absolute";
                    reaction_button.right = setting.position.x + "px";
                    reaction_button.top = setting.position.y + "px";
                    reaction_button.opacity = setting.transparency.padStart(3, ' ') / 100;
                },
                args: [setting]
            });
        }
    });
}

window.onload = function () {
    chrome.storage.local.get(["display", "position_x", "position_y", "transparency"], save => {
        setting = {
            "display": save.display,
            "position": {
                "x": save.position_x,
                "y": save.position_y
            },
            "transparency": save.transparency
        };

        document.getElementById("display").checked = setting.display;
        document.getElementById("display_status").textContent = setting.display ? "表示" : "非表示";
        let display = document.getElementsByClassName("move");
        for (let i = 0; i < display.length; i++) {
            display[i].style.display = setting.display ? "block" : "none";
        }

        document.getElementById("position_y").value = setting.position.y;
        document.getElementById("position_x").value = setting.position.x;

        document.getElementById("transparency").value = setting.transparency;
        document.getElementById("transparency_display").textContent = setting.transparency.padStart(3, ' ') + "%";
    });
}


const toggle_switch = document.getElementById("display");
document.getElementById("display").addEventListener("click", () => {
    setting.display = toggle_switch.checked;
    document.getElementById("display_status").textContent = setting.display ? "表示" : "非表示";

    let display = document.getElementsByClassName("move");
    for (let i = 0; i < display.length; i++) {
        display[i].style.display = toggle_switch.checked ? "block" : "none";
    }
    setting.display = toggle_switch.checked;

    move_heart(setting);
});

document.getElementById("position_x").addEventListener("input", (position) => {
    console.log("move_x");
    setting.position.x = position.target.value;

    move_heart(setting);
});
document.getElementById("position_y").addEventListener("input", (position) => {
    setting.position.y = position.target.value;

    move_heart(setting);
});

document.getElementById("transparency").addEventListener("input", transparency => {
    setting.transparency = transparency.target.value;
    document.getElementById("transparency_display").textContent = setting.transparency.padStart(3, ' ') + "%";

    move_heart(setting);
});

document.getElementById("save").addEventListener("click", () => {
    chrome.storage.local.set({ "display": setting.display, "position_x": setting.position.x, "position_y": setting.position.y, "transparency": setting.transparency }, () => { });
});