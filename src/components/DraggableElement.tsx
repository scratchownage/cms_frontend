import React, { useEffect, useRef } from 'react';
import interact from 'interactjs';

interface DraggableElementProps {
    id: string;
    type: 'text' | 'image' | 'button';
    x: number;
    y: number;
    width: number;
    height: number;
    content: string;
    onDrag: (id: string, x: number, y: number) => void;
    onResize: (id: string, width: number, height: number) => void;
    onEdit: (id: string, content: string) => void;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
    id,
    type,
    x,
    y,
    width,
    height,
    content,
    onDrag,
    onResize,
    onEdit,
}) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (elementRef.current) {
            interact(elementRef.current)
                .draggable({
                    listeners: {
                        move(event) {
                            const x = (parseFloat(elementRef.current!.getAttribute('data-x')!) || 0) + event.dx;
                            const y = (parseFloat(elementRef.current!.getAttribute('data-y')!) || 0) + event.dy;

                            elementRef.current!.style.transform = `translate(${x}px, ${y}px)`;
                            elementRef.current!.setAttribute('data-x', x.toString());
                            elementRef.current!.setAttribute('data-y', y.toString());

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

                            elementRef.current!.style.width = `${width}px`;
                            elementRef.current!.style.height = `${height}px`;

                            onResize(id, width, height);
                        },
                    },
                });
        }
    }, [id, onDrag, onResize]);

    return (
        <div
            ref={elementRef}
            className={`draggable-element ${type}-element`}
            style={{
                transform: `translate(${x}px, ${y}px)`,
                width: `${width}px`,
                height: `${height}px`,
            }}
        >
            {type === 'text' && (
                <textarea
                    value={content}
                    onChange={(e) => onEdit(id, e.target.value)}
                    className="text-element"
                />
            )}
            {type === 'image' && <img src={content} alt="Draggable" className="image-element" />}
            {type === 'button' && (
                <button
                    className="button-element"
                    style={{
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        fontSize: `${Math.max(12, height / 3)}px`,
                    }}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => onEdit(id, e.target.innerText)}
                >
                    {content}
                </button>
            )}
        </div>
    );
};

export default DraggableElement;