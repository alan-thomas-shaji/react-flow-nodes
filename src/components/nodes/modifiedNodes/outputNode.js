import BaseNode from "./baseNode";
import { Position } from "reactflow";

export const OutputNode = (props) => {
  const handles = [
    { type: "target", position: Position.Left, id: `${props.id}-value` },
  ];

  return <BaseNode {...props} nodeType="Output" handles={handles} />;
};
