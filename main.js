;
(function () {
	window.onload = init;
})();


var textarea ;
function init() {
	textarea = document.getElementById('textarea');
	window.socilaBox = new SocialBox(textarea);
}
function SocialBox(el) {
	if(el.tagName !== 'DIV'){
		return console.error('is not a div');
	}
	this.el = el;
	this.init();
}
SocialBox.prototype.WHITE_SPACE = '&nbsp';
SocialBox.prototype.getSelect = function () {
	return window.getSelection().getRangeAt(0);
};

// return if pass node is a hash node or node inside of node hash
SocialBox.prototype.isHashTag = function (el) {
	if(el.className && el.className.indexOf('hash') != -1){
		return true;
	}else{
		if(el.parentNode == this.el){
			return false;
		}else{
			return this.isHashTag(el.parentNode);
		}
	}
};
SocialBox.prototype.init = function () {
	this.el.addEventListener('input',this.onInput.bind(this));
};
SocialBox.prototype.cursorLastPosition = function () {
	var newRange = document.createRange();
  var sel = window.getSelection();
	var lastNode = this.getLastNode();
	var lastIndex = lastNode.textContent.length;

	newRange.setStart(lastNode, lastIndex);
	newRange.collapse(true);
	sel.removeAllRanges();
	sel.addRange(newRange);
	this.el.focus();
};
SocialBox.prototype.getLastNode = function (el) {
	el = el || this.el;
	var last = el.childNodes[el.childNodes.length - 1];
	if(last.nodeType === 3){
		if(last.textContent == '\n	'){
			return this.getLastNode(last.previousSibling);
		}else{
			return last;
		}
	}else{
		return this.getLastNode(last);
	}
};
SocialBox.prototype.onInput = function (e) {
	range = this.getSelect();
	if(range.startContainer != range.endContainer || !range.collapsed){
		debugger;
	}
	var el = range.startContainer;
	if(this.isHashTag(el)){
		var text = el.textContent.split(' ');
		if(text.length > 1){
			var parent = el.parentNode;
			el.parentNode.textContent = text[0];
			parent.parentNode.appendChild(document.createTextNode( ' ' +  text[1]));
			this.cursorLastPosition()
		}else{
			var match = el.parentNode.textContent.match(/#\w+/g);
			if(match == null){
				if(el.tagName == 'SPAN'){
					console.log(el.parentNode);
					el.parentNode.className == '';
				}else if(el.nodeType === 3){
					var newEl = el.cloneNode();
					el.parentNode.parentNode.replaceChild(el.cloneNode(),el.parentNode);
					this.cursorLastPosition();
				}
			}else{
				return; // correct format
			}

		}
	}else{
		// TODO: change format for hashtags or anoter feature
	}
};
