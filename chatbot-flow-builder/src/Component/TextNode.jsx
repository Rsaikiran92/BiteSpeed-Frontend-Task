import React from 'react';
import { Handle, Position } from 'reactflow';
import { MdOutlineMessage } from "react-icons/md";

const TextNode = ({ data}) => {
    
    return (
        <div className="text-node" style={{ border: "1px solid black" }}>
            <Handle type="target" position="left" />
            <div style={{ textAlign: "center" }}>
                <MdOutlineMessage  />
            </div>
            <div style={{fontSize:"15px",marginBottom:"10px",textAlign:"center",fontWeight:"bold"}}>Send Message</div>

            <div>
                <div style={{backgroundColor:"#f1f0f0",padding:"10px",fontSize:"10px",borderRadius:"5px"}}>{data.text}</div>
            </div>


            <Handle type="source" position="right" />
        </div>
    );
};

export default TextNode;
