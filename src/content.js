import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './content.css';
import IconButton from './components/IconButton';
import CommentBox from './components/CommentBox';

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
const ContentReact = () => {
  const [miniNoteIcon, setMiniNoteIcon] = useState(false);
  const [commentBox, setCommentBox] = useState(false);
  // const [tabId, setTabId] = useState(0);
  // const [activeNotes, setActiveNotes] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line
    // chrome.runtime.onMessage.addListener(function (request) {
    //   if (request) {
    //     setTabId(request.activeTabId);
    //     // eslint-disable-next-line
    //     chrome.storage.local.get({ notes: [] }, function (response) {
    //       console.log('response', response);
    //       const activeNotes = response.notes.find(
    //         (note) => note.tabId === request.activeTabId,
    //       );
    //       setActiveNotes(activeNotes);
    //       setCommentBox(true);
    //       setMiniNoteIcon(true);
    //     });
    //   }
    //   return true;
    // });

    function handleReleaseClick() {
      const selectedText = getSelectionText();
      if (selectedText.length) {
        setMiniNoteIcon(true);
      } else {
        setMiniNoteIcon(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mouseup', handleReleaseClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mouseup', handleReleaseClick);
    };
  }, []);
  // if (activeNotes) {
  //   return activeNotes.newNotes.map((activeNote) => {});
  // }
  if (getSelectionText()) {
    const { left, top } = getSelectionDimensions();
    return (
      <div>
        {miniNoteIcon && (
          <IconButton
            onClick={() => {
              setCommentBox(true);
              setMiniNoteIcon(false);
            }}
            left={left}
            top={top}
          />
        )}
        {commentBox && (
          <CommentBox
            left={left}
            top={top}
            tabId={0}
            setCommentBox={setCommentBox}
          />
        )}
      </div>
    );
  }
  return null;
};

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<ContentReact />, app);
