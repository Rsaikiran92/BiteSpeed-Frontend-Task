import React from 'react';
import { MdOutlineMessage } from "react-icons/md";

const NodesPanel = () => {
    const handleDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <>
            <aside>
                <div className="text-node" style={{ border: "1px solid black" }}>

                    <div style={{ textAlign: "center" }}>
                        <MdOutlineMessage />
                    </div>

                    <div
                        className="dndnode text"
                        onDragStart={(event) => handleDragStart(event, 'textNode')}
                        draggable
                    >
                        Message
                    </div>
                </div>
                {/* we can add more features */}
            </aside>
        </>
    );
};

export default NodesPanel;
