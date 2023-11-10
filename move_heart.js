const jsInitCheckTimer = setInterval(jsLoaded, 1000);
const archive_message = [
	"上位のチャットのリプレイ",
	"チャットのリプレイ"
];

function jsLoaded() {
	if (document.getElementById("chatframe") !== null && document.getElementById("chatframe").contentWindow.document.getElementById("reaction-control-panel") != null) {
		//Stream now
		console.log("#####LIVE#####")
		clearInterval(jsInitCheckTimer);

		const heart = document.getElementById("chatframe").contentWindow.document.getElementById("reaction-control-panel");
		heart.style.position = "absolute";
		heart.style.top = "35px";
		heart.style.rifht = "0px";
	}
	else if (document.getElementById("chatframe") !== null && document.getElementById("chatframe").contentWindow.document.getElementById('label-text') !== null && archive_message.includes(document.getElementById("chatframe").contentWindow.document.getElementById('label-text').textContent)){
		//Archive
		console.log("#####Archive#####")
		clearInterval(jsInitCheckTimer);
	}
	else if (document.getElementById("message") !== null && document.getElementById("message").textContent === "この動画ではチャットのリプレイを利用できません。"){
		//Archive(edit)
		console.log("#####Archive(edit)#####")
		clearInterval(jsInitCheckTimer);
	}
	else if (document.getElementById("info-container") !== null && document.getElementById("info-container").textContent.indexOf("配信") == -1 && document.getElementById("info-container").textContent.indexOf("配信開始") !== -1){
		//Movie
		console.log("#####Movie#####")
		clearInterval(jsInitCheckTimer);
	};
};