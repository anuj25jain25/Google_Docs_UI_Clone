
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './CustomEditor.component.css';
import icon from '../../doc-icon.png';

class CustomEditor extends React.Component {

    state = {
        docContent: localStorage.getItem('doc') ? localStorage.getItem('doc') : "<p>Initial content</p>",
        key: process.env.REACT_APP_EDITOR_KEY
    }

    handleEditorChange = (e) => {
        localStorage.setItem('doc', e.target.getContent());
    }

    setMenuBar = () => {
        const menuBar = document.getElementsByClassName('tox-menubar')[0];
        const node_img = document.createElement("img");
        node_img.src = icon;
        node_img.style.height = "70px";
        const node_span = document.createElement("span");
        node_span.innerHTML = `Google Docs UI clone`;
        node_span.className = "doc-title";

        const node_right_div = document.createElement("div");
        node_right_div.className = "doc-title-right";

        const node_share_btn = document.createElement("button");
        node_share_btn.className = "share-btn";
        node_share_btn.innerText = "Share";

        const node_avatar = document.createElement("span");
        node_avatar.className = "avatar";
        node_avatar.innerText = "A";

        node_right_div.appendChild(node_share_btn);
        node_right_div.appendChild(node_avatar);

        menuBar.insertBefore(node_span, menuBar.childNodes[0])
        menuBar.insertBefore(node_img, menuBar.childNodes[0])
        menuBar.appendChild(node_right_div)

        const editor_footer = document.getElementsByClassName("tox-statusbar")[0];
        editor_footer.style.display = "none";
    }

    render() {
        return (
            <Editor
                apiKey={this.state.key}
                initialValue={this.state.docContent}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image',
                        'charmap print preview anchor help',
                        'searchreplace visualblocks code',
                        'insertdatetime media table paste wordcount'
                    ],
                    toolbar:
                        `undo redo | fullscreen  preview save print | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | insertfile image media pageembed template link anchor | a11ycheck ltr rtl | showcomments addcomment`
                }}
                onChange={this.handleEditorChange}
                onInit={this.setMenuBar}
            />
        );
    }
}

export default CustomEditor;