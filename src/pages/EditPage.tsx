import React, { useState } from 'react';
import DraggableElement from '../components/DraggableElement';
import '../css/TextEditorPage.css';

interface ElementState {
  id: string;
  type: 'text' | 'image' | 'button';
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
}

const TextEditorPage: React.FC = () => {
  const [elements, setElements] = useState<ElementState[]>([]);

  const addElement = (type: 'text' | 'image' | 'button') => {
    let width: number;
    let height: number;
    let content: string;

    if (type === 'button') {
      width = 100;
      height = 40;
      content = 'Click Me';
    } else if (type === 'text') {
      width = 150;
      height = 100;
      content = 'Click to edit text';
    } else { // type === 'image'
      width = 150;
      height = 100;
      content = 'https://via.placeholder.com/150';
    }

    const newElement: ElementState = {
      id: `element-${Date.now()}`,
      type,
      x: 50,
      y: 50,
      width,
      height,
      content,
    };

    setElements([...elements, newElement]);
  };

  const handleDrag = (id: string, x: number, y: number) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, x, y } : el))
    );
  };

  const handleResize = (id: string, width: number, height: number) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, width, height } : el))
    );
  };

  const handleEdit = (id: string, content: string) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, content } : el))
    );
  };

  return (
    <div className="text-editor-container">
      <aside className="sidebar">
        <h2>Elements</h2>
        <button onClick={() => addElement('text')}>Add Text</button>
        <button onClick={() => addElement('image')}>Add Image</button>
        <button onClick={() => addElement('button')}>Add Button</button>
      </aside>
      <div className="editor-area">
        {elements.map((el) => (
          <DraggableElement
            key={el.id}
            id={el.id}
            type={el.type}
            x={el.x}
            y={el.y}
            width={el.width}
            height={el.height}
            content={el.content}
            onDrag={handleDrag}
            onResize={handleResize}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default TextEditorPage;
