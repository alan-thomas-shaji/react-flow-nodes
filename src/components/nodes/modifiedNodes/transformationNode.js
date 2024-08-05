import { useState } from "react";
import BaseNode from "./baseNode";
import { Position } from "reactflow";

export const TransformationNode = (props) => {
  const handles = [
    { type: "target", position: Position.Left, id: `${props.id}-input` },
    { type: "source", position: Position.Right, id: `${props.id}-output` },
  ];

  const [transformation, setTransformation] = useState(
    props.data?.transformation || "toUpperCase"
  );

  const handleTransformationChange = (e) => {
    setTransformation(e.target.value);
  };

  return (
    <BaseNode {...props} nodeType="Transformation" handles={handles}>
      <div>
        <label>
          Transformation:
          <select value={transformation} onChange={handleTransformationChange}>
            <option value="toUpperCase">To Upper Case</option>
            <option value="toLowerCase">To Lower Case</option>
            <option value="trim">Trim</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
