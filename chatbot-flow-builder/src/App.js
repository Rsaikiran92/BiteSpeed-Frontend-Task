import React, { useState, useCallback } from 'react';
import ReactFlow, { addEdge, MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import NodesPanel from './Component/NodesPanel';
import SettingsPanel from './Component/SettingsPanel';
import TextNode from './Component/TextNode';
import ButtonEdge from './Component/ButtonEdge'; // Import the custom edge component
import './App.css';
import Navbar from './Component/Navbar';

const nodeTypes = {
  textNode: TextNode,
};

const edgeTypes = {
  buttonedge: ButtonEdge, // Define custom edge type
};

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'buttonedge', animated: true, data: { onRemove: handleRemoveEdge } }, eds)),
    [setEdges]
  );

  const handleRemoveEdge = useCallback(
    (id) => setEdges((eds) => eds.filter((edge) => edge.id !== id)),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => setSelectedNode(node), []);
  const onPaneClick = useCallback(() => setSelectedNode(null), []);

  const handleSave = () => {
    // console.log(edges)
    // const nodesWithNoTargets = nodes.filter((node) => !node.targetPosition);
    // if (nodesWithNoTargets.length > 1) {
    //   alert('Error: More than one node has empty target handles.');
    // } else {
    //   console.log('Flow saved:', { nodes, edges });
    // }
    // const connectedNodeIds = new Set();
    // edges.forEach((edge) => {
    //   connectedNodeIds.add(edge.source);
    //   connectedNodeIds.add(edge.target);
    // });
    // const disconnectedNodes = nodes.filter((node) => !connectedNodeIds.has(node.id));
    // if (disconnectedNodes.length > 0) {
    //   alert(`Warning: There are ${disconnectedNodes.length} disconnected node(s).`);
    // } else {
    //   alert('ok');
    // }
    const nodesWithNoIncomingEdges = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );

    // Check if there are more than one nodes with no incoming edges
    if (nodesWithNoIncomingEdges.length > 1) {
      alert('Error: More than one node has empty target handles.');
    } else {
      alert('Flow saved');
    }
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${type}_${+new Date()}`,
        type,
        position,
        data: { text: 'Click add to text' },
        animated: true,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const updateNodeText = (id, newText) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, text: newText } };
        }
        return node;
      })
    );
    setSelectedNode((node) => ({ ...node, data: { ...node.data, text: newText } }));
  };

  const deselectNode = () => {
    setSelectedNode(null);
  };


  return (
    <>
      <Navbar handleSave={handleSave} />

      <div className="flow-builder">


        {selectedNode ? (
          <SettingsPanel selectedNode={selectedNode} updateNodeText={updateNodeText} deselectNode={deselectNode} />
        ) : (
          <NodesPanel />
        )}
        <div className="react-flow-wrapper" style={{ height: '90vh', width: '100%' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        {/* <button onClick={handleSave}>Save Flow</button> */}
      </div>
    </>
  );
};

export default App;
