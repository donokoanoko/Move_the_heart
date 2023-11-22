{
	const jsInitCheckTimer = setInterval(pop_wait, 1000);
	const archive_message = [
		"上位のチャットのリプレイ",
		"チャットのリプレイ"
	];

	function pop_wait() {
		if (document.getElementById("chatframe") !== null && document.getElementById("chatframe").contentWindow.document.getElementById("reaction-control-panel") != null) {
			//Stream now
			clearInterval(jsInitCheckTimer);
			chrome.storage.local.get(["display", "position_x", "position_y", "transparency"], save => {
				const reaction_button = document.getElementById("chatframe").contentWindow.document.getElementById("reaction-control-panel").style;
				reaction_button.display = save.display ? "block" : "none";
				reaction_button.position = "absolute";
				reaction_button.right = save.position_x + "px";
				reaction_button.top = save.position_y + "px";
				reaction_button.opacity = save.transparency / 100;
			});
		} else if (document.getElementById("chatframe") !== null && document.getElementById("chatframe").contentWindow.document.getElementById('label-text') !== null && archive_message.includes(document.getElementById("chatframe").contentWindow.document.getElementById('label-text').textContent)) {
			//Archive
			clearInterval(jsInitCheckTimer);
		} else if (document.getElementById("message") !== null && document.getElementById("message").textContent === "この動画ではチャットのリプレイを利用できません。") {
			//Archive(edit)
			clearInterval(jsInitCheckTimer);
		} else if (document.getElementById("info-container") !== null && document.getElementById("info-container").textContent.indexOf("配信") == -1 && document.getElementById("info-container").textContent.indexOf("配信開始") !== -1) {
			//Movie
			clearInterval(jsInitCheckTimer);
		};
	};
}