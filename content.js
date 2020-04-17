function getSelectionText() {
  let selectedText = "";
  if (window.getSelection) { // all modern browsers and IE9+
    selectedText = window.getSelection().toString()
  }
  return selectedText
}

function getSelectionDimensions() {
  const range = window.getSelection().getRangeAt(0).getBoundingClientRect();
  const {left, top, height} = range;
  return {left, top, height};
}

document.addEventListener('mouseup', function () {
  var selectedText = getSelectionText();
  if (selectedText.length > 0) { // check there's some text selected
    const {left, top, height} = getSelectionDimensions();
    if (document.getElementById('selectedText')) {
      document.getElementById('selectedText').remove();
    }
    if (document.getElementById('commentBox')) {
      document.getElementById('commentBox').remove();
    }
    const topOfSelectedText = document.documentElement.scrollTop + top + height;
    const div = document.createElement('div');
    div.style = `position: absolute;left: ${left}px;top: ${topOfSelectedText}px`;
    div.id = 'selectedText';
    div.innerHTML = "<div id='selectedTextImage'/>";
    document.body.prepend(div);
    document.getElementById('selectedText').addEventListener('click', function (ev) {
      document.getElementById('selectedText').remove();
      const contentBoxContainer = document.createElement('div');
      contentBoxContainer.innerHTML = `<div id="commentBox" style="left: ${left}px; top: ${topOfSelectedText}px" />`;
      document.body.prepend(contentBoxContainer);
    });
  } else {
    if (document.getElementById('commentBox')) {
      document.getElementById('commentBox').remove();
    }
  }
}, false);
