import { useState } from "react";
import { Handle } from "reactflow";

const BaseNode = ({ id, data, nodeType, handles, children }) => {
  const [name, setName] = useState(data?.name || `${nodeType}_${id}`);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="base-node">
      <div>
        <span className="node-title">{nodeType}</span>
      </div>
      {children}
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
      </div>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}
    </div>
  );
};

export default BaseNode;
