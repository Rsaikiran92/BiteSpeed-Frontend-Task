import React from 'react';
import { FaEdit } from "react-icons/fa";

const SettingsPanel = ({ selectedNode, updateNodeText, deselectNode }) => {
    const handleTextChange = (event) => {
        const newText = event.target.value;

        updateNodeText(selectedNode.id, newText);
    };

    return (
        <aside>
            <div >
                <button onClick={deselectNode} style={{ marginBottom: '10px',marginLeft:"90px" }}>
                    ← Back
                </button><br />
                <div  style={{ border: "1px solid black",padding:"10px"}}>

                    <div style={{ textAlign: "center" }}>
                        <FaEdit />
                    </div>
                    <div style={{fontWeight:"bold",marginBottom:"5px",textAlign:"center"}}>Edit Text</div>
                    <input type="text" value={selectedNode.data.text} onChange={handleTextChange} />
                </div>

            </div>
        </aside>
    );
};

export default SettingsPanel;

