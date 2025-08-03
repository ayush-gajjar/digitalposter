
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CanvasEditor() {
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 400 });
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [elements, setElements] = useState<any[]>([]);
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('background');
  const [canvasZoom, setCanvasZoom] = useState(1);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const canvasSizes = [
    { name: 'Square (1:1)', width: 300, height: 300 },
    { name: 'Portrait (4:5)', width: 300, height: 375 },
    { name: 'Landscape (16:9)', width: 400, height: 225 },
    { name: 'Story (9:16)', width: 225, height: 400 },
    { name: 'Custom', width: 300, height: 400 }
  ];

  const backgroundColors = [
    '#FFFFFF', '#000000', '#FF6B6B', '#4ECDC4', '#45B7D1', 
    '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
  ];

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  ];

  const shapes = [
    { id: 'rectangle', icon: 'ri-rectangle-line', name: 'Rectangle' },
    { id: 'circle', icon: 'ri-checkbox-blank-circle-line', name: 'Circle' },
    { id: 'triangle', icon: 'ri-shape-line', name: 'Triangle' },
    { id: 'star', icon: 'ri-star-line', name: 'Star' },
    { id: 'heart', icon: 'ri-heart-line', name: 'Heart' },
    { id: 'arrow', icon: 'ri-arrow-right-line', name: 'Arrow' }
  ];

  const addElement = (type: string, config: any = {}) => {
    const newElement = {
      id: Date.now(),
      type,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      rotation: 0,
      ...config
    };
    setElements([...elements, newElement]);
    setSelectedElement(elements.length);
  };

  const addText = () => {
    addElement('text', {
      text: 'Double tap to edit',
      fontSize: 24,
      color: '#000000',
      fontFamily: 'Inter',
      width: 200,
      height: 50
    });
  };

  const addShape = (shapeType: string) => {
    addElement('shape', {
      shapeType,
      fillColor: '#3B82F6',
      strokeColor: '#1E40AF',
      strokeWidth: 2
    });
  };

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          addElement('image', {
            src: e.target?.result as string,
            width: 150,
            height: 150
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const duplicateElement = () => {
    if (selectedElement !== null) {
      const element = elements[selectedElement];
      const duplicate = {
        ...element,
        id: Date.now(),
        x: element.x + 20,
        y: element.y + 20
      };
      setElements([...elements, duplicate]);
    }
  };

  const deleteElement = () => {
    if (selectedElement !== null) {
      const newElements = elements.filter((_, index) => index !== selectedElement);
      setElements(newElements);
      setSelectedElement(null);
    }
  };

  const moveElement = (direction: string) => {
    if (selectedElement !== null) {
      const newElements = [...elements];
      const element = newElements[selectedElement];
      const step = 5;
      
      switch (direction) {
        case 'up': element.y = Math.max(0, element.y - step); break;
        case 'down': element.y = Math.min(canvasSize.height - element.height, element.y + step); break;
        case 'left': element.x = Math.max(0, element.x - step); break;
        case 'right': element.x = Math.min(canvasSize.width - element.width, element.x + step); break;
      }
      setElements(newElements);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-black/50 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <i className="ri-arrow-left-line text-xl text-white"></i>
        </button>
        
        <h1 className="text-lg font-bold text-white">Canvas Editor</h1>
        
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium !rounded-button">
          Save
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
        <div 
          ref={canvasRef}
          className="relative shadow-2xl"
          style={{ 
            width: `${canvasSize.width}px`, 
            height: `${canvasSize.height}px`,
            background: backgroundColor.startsWith('linear-gradient') ? backgroundColor : undefined,
            backgroundColor: !backgroundColor.startsWith('linear-gradient') ? backgroundColor : undefined,
            transform: `scale(${canvasZoom})`,
            transformOrigin: 'center'
          }}
        >
          {elements.map((element, index) => (
            <div
              key={element.id}
              className={`absolute cursor-move ${index === selectedElement ? 'ring-2 ring-blue-500' : ''}`}
              style={{
                left: `${element.x}px`,
                top: `${element.y}px`,
                width: `${element.width}px`,
                height: `${element.height}px`,
                transform: `rotate(${element.rotation}deg)`
              }}
              onClick={() => setSelectedElement(index)}
            >
              {element.type === 'text' && (
                <div
                  style={{
                    fontSize: `${element.fontSize}px`,
                    color: element.color,
                    fontFamily: element.fontFamily,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {element.text}
                </div>
              )}
              
              {element.type === 'shape' && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: element.fillColor,
                    border: `${element.strokeWidth}px solid ${element.strokeColor}`,
                    borderRadius: element.shapeType === 'circle' ? '50%' : 
                                  element.shapeType === 'rectangle' ? '8px' : '0'
                  }}
                />
              )}
              
              {element.type === 'image' && (
                <img
                  src={element.src}
                  alt="Canvas element"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="bg-black/80 border-t border-gray-700">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-700">
          {[
            { id: 'background', icon: 'ri-palette-line', label: 'Background' },
            { id: 'text', icon: 'ri-text', label: 'Text' },
            { id: 'shapes', icon: 'ri-shape-line', label: 'Shapes' },
            { id: 'images', icon: 'ri-image-line', label: 'Images' },
            { id: 'canvas', icon: 'ri-artboard-line', label: 'Canvas' },
            { id: 'layers', icon: 'ri-stack-line', label: 'Layers' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === tab.id 
                  ? 'text-blue-400 border-b-2 border-blue-400' 
                  : 'text-gray-400'
              }`}
            >
              <i className={`${tab.icon} text-lg block mb-1`}></i>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Toolbar Content */}
        <div className="p-4 max-h-48 overflow-y-auto">
          {activeTab === 'background' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-medium mb-3">Solid Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {backgroundColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setBackgroundColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        backgroundColor === color ? 'border-blue-400 scale-110' : 'border-gray-600'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-3">Gradients</h3>
                <div className="flex flex-wrap gap-3">
                  {gradients.map((gradient, index) => (
                    <button
                      key={index}
                      onClick={() => setBackgroundColor(gradient)}
                      className={`w-12 h-8 rounded border-2 transition-all ${
                        backgroundColor === gradient ? 'border-blue-400 scale-110' : 'border-gray-600'
                      }`}
                      style={{ background: gradient }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <div className="space-y-4">
              <button
                onClick={addText}
                className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors !rounded-button"
              >
                <i className="ri-add-line mr-2"></i>
                Add Text
              </button>
              
              {selectedElement !== null && elements[selectedElement]?.type === 'text' && (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={elements[selectedElement].text}
                    onChange={(e) => {
                      const newElements = [...elements];
                      newElements[selectedElement].text = e.target.value;
                      setElements(newElements);
                    }}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    placeholder="Enter text"
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">Size</label>
                      <input
                        type="range"
                        min="12"
                        max="48"
                        value={elements[selectedElement].fontSize}
                        onChange={(e) => {
                          const newElements = [...elements];
                          newElements[selectedElement].fontSize = Number(e.target.value);
                          setElements(newElements);
                        }}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">Color</label>
                      <input
                        type="color"
                        value={elements[selectedElement].color}
                        onChange={(e) => {
                          const newElements = [...elements];
                          newElements[selectedElement].color = e.target.value;
                          setElements(newElements);
                        }}
                        className="w-full h-8 rounded"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'shapes' && (
            <div className="grid grid-cols-3 gap-3">
              {shapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => addShape(shape.id)}
                  className="flex flex-col items-center p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
                >
                  <i className={`${shape.icon} text-2xl text-white mb-2`}></i>
                  <span className="text-gray-300 text-xs">{shape.name}</span>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-4">
              <button
                onClick={addImage}
                className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors !rounded-button"
              >
                <i className="ri-image-add-line mr-2"></i>
                Add Image
              </button>
              
              <div className="grid grid-cols-3 gap-3">
                {['https://readdy.ai/api/search-image?query=Beautiful%20festival%20decoration%20elements%2C%20ornate%20patterns%2C%20traditional%20designs%2C%20celebration%20graphics&width=100&height=100&seq=stock1&orientation=squarish',
                  'https://readdy.ai/api/search-image?query=Geometric%20shapes%20and%20patterns%2C%20modern%20design%20elements%2C%20abstract%20graphics%2C%20colorful%20backgrounds&width=100&height=100&seq=stock2&orientation=squarish',
                  'https://readdy.ai/api/search-image?query=Nature%20elements%2C%20flowers%2C%20leaves%2C%20organic%20shapes%2C%20natural%20textures%20for%20design&width=100&height=100&seq=stock3&orientation=squarish'].map((img, index) => (
                  <button
                    key={index}
                    onClick={() => addElement('image', { src: img, width: 120, height: 120 })}
                    className="aspect-square bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors"
                  >
                    <img src={img} alt={`Stock ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'canvas' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-medium mb-3">Canvas Size</h3>
                <div className="space-y-2">
                  {canvasSizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setCanvasSize({ width: size.width, height: size.height })}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        canvasSize.width === size.width && canvasSize.height === size.height
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {size.name} ({size.width}x{size.height})
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-3">Zoom: {Math.round(canvasZoom * 100)}%</h3>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={canvasZoom}
                  onChange={(e) => setCanvasZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {activeTab === 'layers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Layers ({elements.length})</span>
                {selectedElement !== null && (
                  <div className="flex space-x-2">
                    <button
                      onClick={duplicateElement}
                      className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
                    >
                      <i className="ri-file-copy-line"></i>
                    </button>
                    <button
                      onClick={deleteElement}
                      className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                )}
              </div>
              
              {selectedElement !== null && (
                <div className="grid grid-cols-4 gap-2">
                  {['up', 'down', 'left', 'right'].map((direction) => (
                    <button
                      key={direction}
                      onClick={() => moveElement(direction)}
                      className="bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <i className={`ri-arrow-${direction}-line`}></i>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
