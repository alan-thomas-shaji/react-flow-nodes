// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { SubmitButton } from "./submit";
import { InputNode } from "./nodes/modifiedNodes/inputNode";
import { LLMNode } from "./nodes/modifiedNodes/llmNode";
import { OutputNode } from "./nodes/modifiedNodes/outputNode";
import { TextNode } from "./nodes/modifiedNodes/textNode";
import { ConditionalNode } from "./nodes/modifiedNodes/conditionalNode";
import { CalculationNode } from "./nodes/modifiedNodes/calculationNode";
import { APIRequestNode } from "./nodes/modifiedNodes/apiRequestNode";
import { LoggingNode } from "./nodes/modifiedNodes/loggingNode";
import { TransformationNode } from "./nodes/modifiedNodes/transformationNode";
import "reactflow/dist/style.css";
import { parsePipeline } from "../services/apiService";
import Modal from "./modal/Modal";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  Conditional: ConditionalNode,
  calculation: CalculationNode,
  apiRequest: APIRequestNode,
  logging: LoggingNode,
  transformation: TransformationNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nodeCount, setNodeCount] = useState(0);
  const [edgeCount, setEdgeCount] = useState(0);
  const [isDag, setisDag] = useState(false);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleSubmit = async () => {
    const payload = {
      nodes: nodes,
      edges: edges,
    };
    try {
      const response = await parsePipeline(payload);
      setNodeCount(response.data.num_nodes);
      setEdgeCount(response.data.num_edges);
      setisDag(response.data.is_dag);
      setShowModal(true);
    } catch (error) {
      setNodeCount(0);
      setEdgeCount(0);
      setisDag(false);
      setShowModal(true);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setNodeCount(0);
    setEdgeCount(0);
    setisDag(false);
  };

  return (
    <>
      <div ref={reactFlowWrapper} className="react-flow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
          className="react-flow-main"
        >
          <Background color="#a41ec2" gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      <SubmitButton handleClick={handleSubmit} />
      <Modal show={showModal} handleClose={handleCloseModal}>
        <h2>Pipeline Results</h2>
        <p>Nodes: {nodeCount}</p>
        <p>Edges: {edgeCount}</p>
        {isDag ? (
          <p>Your pipeline produces a directed acyclic graph!</p>
        ) : (
          <p>Your pipeline does not produce a directed acyclic graph!</p>
        )}
      </Modal>
    </>
  );
};
