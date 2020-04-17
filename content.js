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

function autoExpand(field) {
  field.style.height = field.scrollHeight + 'px';
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
      contentBoxContainer.innerHTML = `<div id="commentBox" style="left: ${left}px; top: ${topOfSelectedText}px">
                                            <textarea id="commentTextBox"
                                                      autocomplete="input-area"
                                                      x-webkit-speech="" 
                                                      speech=""
                                                      role="combobox" 
                                                      aria-autocomplete="list" 
                                                      aria-label="Yorum taslağı">
                                            </textarea>
                                            <div id="buttonGroup">
                                                      <div role="button" id="commentBtn" style="user-select: none;" aria-disabled="false" aria-label="Submit" tabindex="0">Submit</div>
                                                      <div role="button" id="cancelBtn" tabindex="0" aria-label="Cancel" style="user-select: none;">Cancel</div>
                                            </div>
                                       </div>`;
      document.body.prepend(contentBoxContainer);
      document.getElementById('commentTextBox').focus();
      document.getElementById('commentTextBox').addEventListener('input', function (event) {
        if (event.target.tagName.toLowerCase() !== 'textarea') return;
        autoExpand(event.target);
      }, false);
      document.getElementById('cancelBtn').addEventListener('click', function (event) {
        document.getElementById('commentBox').remove();
      }, false);
    });
  } else {
    // if (document.getElementById('commentBox')) {
    //   document.getElementById('commentBox').remove();
    // }
  }
}, false);
