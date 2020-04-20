import {useEffect, useState} from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import "./content.css";

const getSelectionText = () => {
  let selectedText = "";
  if (window.getSelection) { // all modern browsers and IE9+
    selectedText = window.getSelection().toString()
  }
  return selectedText
};
const getSelectionDimensions = () => {
  const range = window.getSelection().getRangeAt(0).getBoundingClientRect();
  return {left: range.left, top: (document.documentElement.scrollTop + range.top + range.height)};
};
const saveComment = (left, top, setCommentBox) => {
  chrome.storage.local.get({notes: []}, function (result) {
    let newNotes;
    if (result) {
      result.notes.push({left, top, value: 'test'});
      newNotes = result.notes;
    } else {
      newNotes = [{left, top, value: 'test'}]
    }
    chrome.storage.local.set({'notes': newNotes}, function () {
      console.log('Value is setted');
      setCommentBox(false);
    });
  });
};
const ContentReact = () => {
  const [noteButtonVisible, setNoteButton] = useState(false);
  const [commentBoxVisible, setCommentBox] = useState(false);
  useEffect(() => {
    function handleReleaseClick() {
      const selectedText = getSelectionText();
      if (selectedText.length) {
        setNoteButton(true);
      }
    }

    // Bind the event listener
    document.addEventListener("mouseup", handleReleaseClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mouseup", handleReleaseClick);
    };
  }, []);
  if (getSelectionText()) {
    const {left, top} = getSelectionDimensions();
    return <div>
      {
        noteButtonVisible && (<button id="selectedText" style={{position: 'absolute', left, top}} onClick={() => {
          setCommentBox(true);
          setNoteButton(false);
        }}>
          <div id="selectedTextImage"/>
        </button>)
      }
      {
        commentBoxVisible && (
          <div id="commentBox" style={{left, top}}>
            <textarea id="commentTextBox" autoComplete="input-area"/>
            <div id="buttonGroup">
              <button id="submitBtn" onClick={() => saveComment(left, top, setCommentBox)}>Submit</button>
              <button id="cancelBtn" onClick={() => setCommentBox(false)}>Cancel</button>
            </div>
          </div>
        )
      }
    </div>
  }
  return null;
};

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<ContentReact/>, app);
