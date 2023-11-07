const jsInitCheckTimer = setInterval(jsLoaded, 1000);
const archive_message = ["上位のチャットのリプレイ", "チャットのリプレイ"];

function jsLoaded() {
	if (document.getElementById("chatframe") !== null && document.getElementById("chatframe").contentWindow.document.getElementById("reaction-control-panel") != null) {
		//Stream now

		clearInterval(jsInitCheckTimer);

		const heart = document.getElementById("chatframe").contentWindow.document.getElementById("reaction-control-panel");
		heart.style.position = "absolute";
		heart.style.top = "35px";
		heart.style.rifht = "0px";
	}
	else if (document.getElementById("chatframe") !== null && document.getElementById("chatframe").contentWindow.document.getElementById('label-text') !== null && archive_message.includes(document.getElementById("chatframe").contentWindow.document.getElementById('label-text').textContent)){
		//Archive
		clearInterval(jsInitCheckTimer);
	}
	else if (document.getElementById("message").textContent === "この動画ではチャットのリプレイを利用できません。"){
		//Archive(edit)
		clearInterval(jsInitCheckTimer);
	}
	else if (document.getElementById("info-container").textContent.indexOf("配信") == -1){
		//Movie
		clearInterval(jsInitCheckTimer);
	};
};