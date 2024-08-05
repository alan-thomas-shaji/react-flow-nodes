import { useState, useEffect, useRef } from "react";
import BaseNode from "./baseNode";
import { Position, useUpdateNodeInternals } from "reactflow";

export const TextNode = (props) => {
  const [currText, setCurrText] = useState(props.data?.text || "{{input}}");
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const updateNodeInternals = useUpdateNodeInternals();
  const [handles, setHandles] = useState([]);

  const textareaRef = useRef(null);
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    adjustTextareaHeight();
    updateHandles(e.target.value);
  };
  const updateHandles = (text) => {
    // const regex = /{{(.*?)}}/g;
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    let match;
    const newHandles = [];

    while ((match = regex.exec(text)) !== null) {
      const name = match[1];
      const handleId = `${props?.id}-input-${name}`;
      newHandles.push({
        type: "target",
        position: Position.Left,
        id: handleId,
        name: name,
      });
    }
    const filteredHandles = newHandles.reduce((acc, curr) => {
      if (!acc.some((handle) => handle.id === curr.id)) {
        acc.push(curr);
      }
      return acc;
    }, []);

    for (let i = 1; i < filteredHandles.length; i++) {
      filteredHandles[i].style = {
        top: `${(i * textareaHeight) / (newHandles.length - 1)}px`,
      };
    }
    setTimeout(() => {
      updateNodeInternals(props.id);
    }, 0);
    setHandles(filteredHandles);
  };

  useEffect(() => {
    adjustTextareaHeight();
    updateHandles(currText);
  }, []);

  return (
    <BaseNode
      {...props}
      nodeType="Text"
      handles={handles
        .map((handle, index) => ({ 
          key: index,
          type: "target",
          position: handle.position,
          id: handle.id,
          style: { top: `${(index) * 100 / handles.length}%` },
        }))
        .concat([
          {
            type: "source",
            position: Position.Right,
            id: `${props.id}-output`,
          },
        ])
      }
    >
      <div>
        <label>
          Text:
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            style={{
              height: textareaHeight,
            }}
            className="text-node-text-field"
          />
        </label>
      </div>
    </BaseNode>
  );
};