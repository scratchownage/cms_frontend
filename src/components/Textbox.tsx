import React, { useEffect, useRef } from 'react';
import interact from 'interactjs';

interface TextBoxProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  onDrag: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
  onEdit: (id: string, content: string) => void;
}

const TextBox: React.FC<TextBoxProps> = ({
  id,
  x,
  y,
  width,
  height,
  content,
  onDrag,
  onResize,
  onEdit,
}) => {
  const textBoxRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textBoxRef.current) {
      interact(textBoxRef.current)
        .draggable({
          listeners: {
            move(event) {
              const x = (parseFloat(textBoxRef.current!.getAttribute('data-x')!) || 0) + event.dx;
              const y = (parseFloat(textBoxRef.current!.getAttribute('data-y')!) || 0) + event.dy;

              textBoxRef.current!.style.transform = `translate(${x}px, ${y}px)`;
              textBoxRef.current!.setAttribute('data-x', x.toString());
              textBoxRef.current!.setAttribute('data-y', y.toString());

              onDrag(id, x, y);
            },
          },
        })
        .resizable({
          edges: { left: true, right: true, bottom: true, top: true },
          listeners: {
            move(event) {
              const width = event.rect.width;
              const height = event.rect.height;

              textBoxRef.current!.style.width = `${width}px`;
              textBoxRef.current!.style.height = `${height}px`;

              onResize(id, width, height);
            },
          },
        });
    }
  }, [id, onDrag, onResize]);

  return (
    <textarea
      ref={textBoxRef}
      className="text-box"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      value={content}
      onChange={(e) => onEdit(id, e.target.value)}
      onBlur={(e) => onEdit(id, e.target.value)}
    />
  );
};

export default TextBox;