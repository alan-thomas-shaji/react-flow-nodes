import { useState } from "react";
import BaseNode from "./baseNode";
import { Position } from "reactflow";

export const APIRequestNode = (props) => {
  const handles = [
    { type: "target", position: Position.Left, id: `${props.id}-url` },
    {
      type: "target",
      position: Position.Left,
      id: `${props.id}-method`,
      style: { top: "50%" },
    },
    { type: "source", position: Position.Right, id: `${props.id}-response` },
  ];

  const [url, setUrl] = useState(props.data?.url || "");
  const [method, setMethod] = useState(props.data?.method || "GET");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  return (
    <BaseNode {...props} nodeType="apiRequest" handles={handles}>
      <div>
        <label>
          URL:
          <input type="text" value={url} onChange={handleUrlChange} />
        </label>
        <label>
          Method:
          <select value={method} onChange={handleMethodChange}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
