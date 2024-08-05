// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
      <div className='toolbar-container'>
        <div className='toolbar'>
          <DraggableNode type="customInput" label="Input" />
          <DraggableNode type="llm" label="LLM" />
          <DraggableNode type="customOutput" label="Output" />
          <DraggableNode type="text" label="Text" />
          <DraggableNode type="Conditional" label="Conditional" />
          <DraggableNode type="calculation" label="Calculation" />
          <DraggableNode type="apiRequest" label="API Request" />
          <DraggableNode type="logging" label="Logging" />
          <DraggableNode type="transformation" label="Transformation" />
        </div>
      </div>
    );
};
