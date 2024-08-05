import { useState } from "react";
import BaseNode from "./baseNode";
import { Position } from "reactflow";

export const CalculationNode = (props) => {
  const handles = [
    { type: "target", position: Position.Left, id: `${props.id}-input1` },
    {
      type: "target",
      position: Position.Left,
      id: `${props.id}-input2`,
      style: { top: "50%" },
    },
    { type: "source", position: Position.Right, id: `${props.id}-result` },
  ];

  const [operation, setOperation] = useState(props.data?.operation || "add");
  const options = [
    {
      value: "add",
      label: "Add",
    },
    {
      value: "subtract",
      label: "Subtract",
    },
    {
      value: "multiply",
      label: "Multiply",
    },
    {
      value: "divide",
      label: "Divide",
    },
  ];

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  return (
    <BaseNode {...props} nodeType="calculation" handles={handles}>
      <div>
        <label>
          Operation:
          <select value={operation} onChange={handleOperationChange}>
            {options?.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
