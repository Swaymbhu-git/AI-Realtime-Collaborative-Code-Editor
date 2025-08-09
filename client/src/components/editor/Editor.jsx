import React from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view'; 

const Editor = ({ value, onChange }) => {
    return (
        <ReactCodeMirror
            value={value}
            onChange={onChange}
            theme={oneDark}
            extensions={[cpp(), EditorView.lineWrapping]} 
            height="100vh"
            style={{ fontSize: '16px' }}
        />
    );
};

export default Editor;