import BaseNode from "./baseNode";
import { Position } from "reactflow";

export const LoggingNode = (props) => {
  const handles = [
    { type: "target", position: Position.Left, id: `${props.id}-input` },
  ];

  return (
    <BaseNode {...props} nodeType="Logging" handles={handles}>
      <div>
        <span>This node logs input data.</span>
      </div>
    </BaseNode>
  );
};
