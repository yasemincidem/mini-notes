// @flow
import React, { useRef } from 'react';
import styled from 'styled-components';

type Prop = {
  left: number,
  top: number,
  setCommentBox: Function,
};
const ButtonWrapper = styled.div`
  padding-top: 8px;
  display: block;
  text-align: left;
`;
const CommentBoxWrapper = styled.div`
  position: absolute;
  width: 282px;
  z-index: 1;
  color: rgb(0, 0, 0);
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  height: 154px;
  max-height: none;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
  user-select: text;
  white-space: normal;
  background-color: rgb(255, 255, 255);
  border-color: rgba(0, 0, 0, 0);
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 12px;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
`;
const TextArea = styled.textarea`
  box-sizing: border-box;
  color: rgb(60, 64, 67);
  font-family: var(--docs-material-font-family, Arial, sans-serif, sans);
  overflow-x: hidden;
  overflow-y: hidden;
  resize: none;
  width: 100%;
  outline-width: 0px !important;
  margin: 0px;
  font-size: 14px;
  line-height: 20px;
  min-height: 36px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(218, 220, 224);
  border-image: initial;
  border-radius: 4px;
  padding: 7px 8px;
`;
const Submit = styled.div`
  display: inline-block;
  box-shadow: none;
  box-sizing: border-box;
  font-family: 'Google Sans', Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 16px;
  color: rgb(255, 255, 255);
  height: 24px;
  border-radius: 4px;
  background: rgb(26, 115, 232);
  padding: 3px 12px 5px;
  border-width: 1px !important;
  border-style: solid !important;
  border-color: transparent !important;
  border-image: initial !important;
`;
const Cancel = styled.div`
  display: inline-block;
  box-shadow: none;
  box-sizing: border-box;
  font-family: 'Google Sans', Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 16px;
  color: rgb(26, 115, 232);
  height: 24px;
  border-radius: 4px;
  background: white;
  padding: 3px 12px 5px;
  border-width: 1px !important;
  border-style: solid !important;
  border-color: rgb(218, 220, 224) !important;
  border-image: initial !important;
`;
const saveComment = ({ left, top, setCommentBox, value, tabId }) => {
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
const CommentBox = (props: Prop) => {
  const { left, top, setCommentBox } = props;
  const textArea = useRef();
  return (
    <CommentBoxWrapper left={left} top={top}>
      <TextArea ref={textArea} />
      <ButtonWrapper>
        <Submit type="button" onClick={saveComment(props)}>
          Submit
        </Submit>
        <Cancel type="button" onClick={setCommentBox(false)}>
          Cancel
        </Cancel>
      </ButtonWrapper>
    </CommentBoxWrapper>
  );
};
export default CommentBox;
