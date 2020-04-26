import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './content.css';

const getSelectionText = () => {
  let selectedText = '';
  if (window.getSelection) {
    // all modern browsers and IE9+
    selectedText = window.getSelection().toString();
  }
  return selectedText;
};
const getSelectionDimensions = () => {
  const range = window.getSelection().getRangeAt(0).getBoundingClientRect();
  return {
    left: range.left,
    top: document.documentElement.scrollTop + range.top + range.height,
  };
};
const saveComment = (left, top, setCommentBox, value, tabId) => {
  let notes = [];
  // eslint-disable-next-line
  chrome.storage.local.get({ notes: [] }, function (result) {
    if (result) {
      const currentNodes = result.notes.find((i) => i.tabId === tabId);
      const currentNewNodes = currentNodes ? currentNodes.newNotes : [];
      if (currentNodes) {
        currentNewNodes.push({
          left,
          top,
          value,
        });
        result.notes.map((node) =>
          node.tabId === tabId ? { newNotes: currentNewNodes, tabId } : node,
        );
      } else {
        result.notes.push({ newNotes: [{ left, top, value }], tabId });
      }
      notes = result.notes;
    }
    // eslint-disable-next-line
    chrome.storage.local.set({ notes }, function () {
      setCommentBox(false);
    });
  });
};
const ContentReact = () => {
  const [noteButtonVisible, setNoteButton] = useState(false);
  const [commentBoxVisible, setCommentBox] = useState(false);
  const [tabId, setTabId] = useState(0);
  const textArea = useRef();
  useEffect(() => {
    // eslint-disable-next-line
    chrome.storage.local.get({ notes: [] }, function (response) {
      console.log('response', response);
    });
    // eslint-disable-next-line
    chrome.runtime.onMessage.addListener(function (request) {
      if (request) {
        setTabId(request.activeTabId);
      }
      return true;
    });

    function handleReleaseClick() {
      const selectedText = getSelectionText();
      if (selectedText.length) {
        setNoteButton(true);
      }
    }

    // Bind the event listener
    document.addEventListener('mouseup', handleReleaseClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mouseup', handleReleaseClick);
    };
  }, []);
  if (getSelectionText()) {
    const { left, top } = getSelectionDimensions();
    return (
      <div>
        {noteButtonVisible && (
          <button
            type="button"
            id="selectedText"
            style={{ position: 'absolute', left, top }}
            onClick={() => {
              setCommentBox(true);
              setNoteButton(false);
            }}
          >
            <div id="selectedTextImage" />
          </button>
        )}
        {commentBoxVisible && (
          <div id="commentBox" style={{ left, top }}>
            <textarea
              ref={textArea}
              id="commentTextBox"
              autoComplete="input-area"
            />
            <div id="buttonGroup">
              <button
                type="button"
                id="submitBtn"
                onClick={() =>
                  saveComment(
                    left,
                    top,
                    setCommentBox,
                    textArea.current.value,
                    tabId,
                  )
                }
              >
                Submit
              </button>
              <button
                type="button"
                id="cancelBtn"
                onClick={() => setCommentBox(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<ContentReact />, app);
