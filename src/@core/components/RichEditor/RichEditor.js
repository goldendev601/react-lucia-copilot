import React, {useEffect, useState} from 'react';
import {InputLabel} from "@material-ui/core";
import { EditorState, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import richEditStyles from './styles';

const RichEdit = (props) => {
    const {formik, label, name, placeholder} = props;

    const classes = richEditStyles();

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    useEffect(() => {
        if (formik.values[name]) {
            const contentBlock = htmlToDraft(formik.values[name]);
            if (contentBlock) {
              const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
              const noteState = EditorState.createWithContent(contentState);
              setEditorState(noteState)
            }
        }
    }, [])

    const changeNoteEditor = (editState) => {
        setEditorState(editState)
    }

    const changeEditor = (e) => {
        const html = draftToHtml(e);
        formik.setFieldValue(name, html)
    }

    return (
        <>
            <InputLabel className={classes.descriptionLabel}>{label}</InputLabel>
            <Editor
                name={name}
                editorState={editorState}
                toolbarClassName={classes.editorToolbar}
                wrapperClassName={classes.editorWrapper}
                editorClassName={classes.editor}
                onEditorStateChange={changeNoteEditor}
                onChange={changeEditor}
                toolbar={{
                    options: ['inline', 'list', 'textAlign', 'link'],
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                }}
                placeholder = {placeholder}
            />
        </>
    )
}

export default RichEdit;