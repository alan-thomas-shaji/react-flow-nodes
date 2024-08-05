import { useState } from "react";
import BaseNode from "./baseNode";
import { Position } from "reactflow";

export const InputNode = (props) => {
  const [type, setType] = useState(props.data?.type || "Text");

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handles = [
    { type: "source", position: Position.Right, id: `${props.id}-value` },
  ];

  return (
    <BaseNode {...props} nodeType="Input" handles={handles}>
      <label>
        Type:
        <select value={type} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
        <div className="select-arrow"></div>
      </label>
    </BaseNode>
  );
};
