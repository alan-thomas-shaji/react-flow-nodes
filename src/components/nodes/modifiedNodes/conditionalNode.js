import { useState } from "react";
import BaseNode from "./baseNode";
import { Position } from "reactflow";

export const ConditionalNode = (props) => {
  const handles = [
    { type: "target", position: Position.Left, id: `${props.id}-condition` },
    { type: "source", position: Position.Right, id: `${props.id}-true` },
    {
      type: "source",
      position: Position.Right,
      id: `${props.id}-false`,
      style: { top: "50%" },
    },
  ];

  const [condition, setCondition] = useState(
    props.data?.condition || "input > 0"
  );

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  return (
    <BaseNode {...props} nodeType="Conditional" handles={handles}>
      <div>
        <label>
          Condition:
          <input
            type="text"
            value={condition}
            onChange={handleConditionChange}
          />
        </label>
      </div>
    </BaseNode>
  );
};
