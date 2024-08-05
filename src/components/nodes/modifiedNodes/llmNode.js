import BaseNode from "./baseNode";
import { Position } from "reactflow";

export const LLMNode = (props) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${props.id}-system`,
      style: { top: `${100 / 3}%` },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${props.id}-prompt`,
      style: { top: `${200 / 3}%` },
    },
    { type: "source", position: Position.Right, id: `${props.id}-response` },
  ];

  return (
    <BaseNode {...props} nodeType="LLM" handles={handles}>
      <div className="llm-text">
        <span>This is an LLM.</span>
      </div>
    </BaseNode>
  );
};
