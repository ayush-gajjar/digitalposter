
import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function PhotoEditor() {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [activeEditorTab, setActiveEditorTab] = useState('frames');
  const [canvasZoom, setCanvasZoom] = useState(1);
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
  const [selectedFrame, setSelectedFrame] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [textLayers, setTextLayers] = useState<any[]>([]);
  const [selectedLayer, setSelectedLayer] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropMode, setCropMode] = useState(false);
  const [cropRatio, setCropRatio] = useState({ width: 1, height: 1 });
  const [showShareModal, setShowShareModal] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const frames = [
    { id: 'diwali-gold', name: 'Golden Diwali', image: 'https://readdy.ai/api/search-image?query=Elegant%20golden%20Diwali%20decorative%20frame%20border%20with%20transparent%20center%2C%20ornate%20patterns%2C%20traditional%20Indian%20decorations%2C%20festival%20design%20elements%2C%20PNG%20frame%20overlay&width=300&height=400&seq=frame1&orientation=portrait' },
    { id: 'holi-colors', name: 'Colorful Holi', image: 'https://readdy.ai/api/search-image?query=Vibrant%20colorful%20Holi%20festival%20decorative%20frame%20border%20with%20transparent%20center%2C%20rainbow%20powder%20effects%2C%20celebration%20border%20design%2C%20PNG%20overlay&width=300&height=400&seq=frame2&orientation=portrait' },
    { id: 'christmas-snow', name: 'Christmas Snow', image: 'https://readdy.ai/api/search-image?query=Beautiful%20Christmas%20decorative%20frame%20border%20with%20transparent%20center%2C%20winter%20elements%2C%20holiday%20decorations%2C%20festive%20border%20design%2C%20PNG%20overlay&width=300&height=400&seq=frame3&orientation=portrait' },
    { id: 'new-year-sparkle', name: 'New Year Sparkle', image: 'https://readdy.ai/api/search-image?query=Sparkling%20New%20Year%20decorative%20frame%20border%20with%20transparent%20center%2C%20golden%20confetti%2C%20celebration%20elements%2C%20party%20border%20design%2C%20PNG%20overlay&width=300&height=400&seq=frame4&orientation=portrait' },
    { id: 'eid-elegant', name: 'Elegant Eid', image: 'https://readdy.ai/api/search-image?query=Elegant%20Eid%20Mubarak%20decorative%20frame%20border%20with%20transparent%20center%2C%20Islamic%20geometric%20patterns%2C%20crescent%20moon%2C%20stars%2C%20ornate%20border%2C%20PNG%20overlay&width=300&height=400&seq=frame5&orientation=portrait' },
    { id: 'business-pro', name: 'Business Pro', image: 'https://readdy.ai/api/search-image?query=Professional%20business%20decorative%20frame%20border%20with%20transparent%20center%2C%20corporate%20design%2C%20elegant%20border%2C%20modern%20geometric%20patterns%2C%20PNG%20overlay&width=300&height=400&seq=frame6&orientation=portrait' }
  ];

  const filters = [
    { id: 'none', name: 'Original', filter: '' },
    { id: 'vintage', name: 'Vintage', filter: 'sepia(80%) contrast(120%) brightness(90%)' },
    { id: 'cool', name: 'Cool', filter: 'hue-rotate(90deg) saturate(150%)' },
    { id: 'warm', name: 'Warm', filter: 'hue-rotate(-30deg) saturate(130%) brightness(110%)' },
    { id: 'bw', name: 'B&W', filter: 'grayscale(100%) contrast(120%)' },
    { id: 'dramatic', name: 'Dramatic', filter: 'contrast(150%) brightness(80%) saturate(150%)' }
  ];

  const stickers = [
    { id: 'diya', emoji: '🪔', name: 'Diya' },
    { id: 'fireworks', emoji: '🎆', name: 'Fireworks' },
    { id: 'party', emoji: '🎉', name: 'Party' },
    { id: 'gift', emoji: '🎁', name: 'Gift' },
    { id: 'cake', emoji: '🎂', name: 'Cake' },
    { id: 'balloon', emoji: '🎈', name: 'Balloon' },
    { id: 'star', emoji: '⭐', name: 'Star' },
    { id: 'heart', emoji: '❤️', name: 'Heart' },
    { id: 'sparkles', emoji: '✨', name: 'Sparkles' },
    { id: 'crown', emoji: '👑', name: 'Crown' },
    { id: 'flower', emoji: '🌺', name: 'Flower' },
    { id: 'moon', emoji: '🌙', name: 'Moon' }
  ];

  const cropRatios = [
    { id: 'square', name: '1:1', ratio: { width: 1, height: 1 } },
    { id: 'portrait', name: '4:5', ratio: { width: 4, height: 5 } },
    { id: 'landscape', name: '16:9', ratio: { width: 16, height: 9 } },
    { id: 'story', name: '9:16', ratio: { width: 9, height: 16 } },
    { id: 'free', name: 'Free', ratio: { width: 0, height: 0 } }
  ];

  const shareOptions = [
    { name: 'WhatsApp', icon: 'ri-whatsapp-line', color: 'bg-green-500' },
    { name: 'Instagram', icon: 'ri-instagram-line', color: 'bg-purple-500' },
    { name: 'Facebook', icon: 'ri-facebook-line', color: 'bg-blue-600' },
    { name: 'Twitter', icon: 'ri-twitter-line', color: 'bg-sky-500' },
    { name: 'Copy Link', icon: 'ri-link', color: 'bg-gray-500' },
    { name: 'Download', icon: 'ri-download-line', color: 'bg-indigo-500' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setActiveTab('editor');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      video.onloadedmetadata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0);

        stream.getTracks().forEach(track => track.stop());

        const imageData = canvas.toDataURL();
        setUploadedImage(imageData);
        setActiveTab('editor');
      };
    } catch (error) {
      console.error('Camera access error:', error);
      // Fallback to file input
      cameraInputRef.current?.click();
    }
  };

  const handleZoom = (delta: number) => {
    setCanvasZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const addTextLayer = () => {
    const newLayer = {
      id: Date.now(),
      type: 'text',
      text: 'Double tap to edit',
      fontSize: 24,
      color: '#000000',
      fontFamily: 'Inter',
      x: Math.random() * 60 + 20, // Random position between 20-80%
      y: Math.random() * 60 + 20,
      shadow: false,
      rotation: 0,
      isDragging: false
    };
    setTextLayers([...textLayers, newLayer]);
    setSelectedLayer(textLayers.length);
  };

  const addSticker = (sticker: any) => {
    const newLayer = {
      id: Date.now(),
      type: 'sticker',
      content: sticker.emoji,
      x: Math.random() * 60 + 20, // Random position
      y: Math.random() * 60 + 20,
      size: 48,
      rotation: 0,
      isDragging: false
    };
    setTextLayers([...textLayers, newLayer]);
    setSelectedLayer(textLayers.length);
  };

  const handleLayerMouseDown = useCallback((e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setSelectedLayer(index);
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });

    const newLayers = [...textLayers];
    newLayers[index].isDragging = true;
    setTextLayers(newLayers);
  }, [textLayers]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && selectedLayer < textLayers.length && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const deltaX = (e.clientX - dragStart.x) / rect.width * 100;
      const deltaY = (e.clientY - dragStart.y) / rect.height * 100;

      const newLayers = [...textLayers];
      newLayers[selectedLayer].x = Math.max(0, Math.min(100, newLayers[selectedLayer].x + deltaX));
      newLayers[selectedLayer].y = Math.max(0, Math.min(100, newLayers[selectedLayer].y + deltaY));
      setTextLayers(newLayers);

      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging, selectedLayer, textLayers, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    const newLayers = textLayers.map(layer => ({ ...layer, isDragging: false }));
    setTextLayers(newLayers);
  }, [textLayers]);

  const updateTextLayer = (field: string, value: any) => {
    if (selectedLayer < textLayers.length) {
      const newLayers = [...textLayers];
      newLayers[selectedLayer][field] = value;
      setTextLayers(newLayers);
    }
  };

  const moveLayerUp = () => {
    if (selectedLayer < textLayers.length - 1) {
      const newLayers = [...textLayers];
      [newLayers[selectedLayer], newLayers[selectedLayer + 1]] = [newLayers[selectedLayer + 1], newLayers[selectedLayer]];
      setTextLayers(newLayers);
      setSelectedLayer(selectedLayer + 1);
    }
  };

  const moveLayerDown = () => {
    if (selectedLayer > 0) {
      const newLayers = [...textLayers];
      [newLayers[selectedLayer], newLayers[selectedLayer - 1]] = [newLayers[selectedLayer - 1], newLayers[selectedLayer]];
      setTextLayers(newLayers);
      setSelectedLayer(selectedLayer - 1);
    }
  };

  const deleteLayer = () => {
    const newLayers = textLayers.filter((_, index) => index !== selectedLayer);
    setTextLayers(newLayers);
    setSelectedLayer(Math.max(0, selectedLayer - 1));
  };

  const applyCrop = (ratioData: any) => {
    setCropRatio(ratioData.ratio);
    setCropMode(true);
    // Implement crop functionality
    setTimeout(() => setCropMode(false), 100); // Quick visual feedback
  };

  const saveToGallery = async () => {
    if (!canvasRef.current || !uploadedImage) return;

    try {
      // Create a temporary canvas to render the final image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 800;
      canvas.height = 1200;

      // Draw background image
      const img = new Image();
      img.onload = async () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Apply filters
        if (selectedFilter !== 'none') {
          ctx.filter = getFilterStyle();
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

        // Draw frame if selected
        if (selectedFrame) {
          const frameImg = new Image();
          frameImg.crossOrigin = 'anonymous';
          frameImg.onload = () => {
            ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
            renderLayersAndSave();
          };
          frameImg.src = frames.find(f => f.id === selectedFrame)?.image || '';
        } else {
          renderLayersAndSave();
        }

        function renderLayersAndSave() {
          // Draw text layers and stickers
          textLayers.forEach(layer => {
            const x = (layer.x / 100) * canvas.width;
            const y = (layer.y / 100) * canvas.height;

            if (layer.type === 'text') {
              ctx.font = `${layer.fontSize * 2}px ${layer.fontFamily}`;
              ctx.fillStyle = layer.color;
              ctx.textAlign = 'center';
              ctx.fillText(layer.text, x, y);
            } else if (layer.type === 'sticker') {
              ctx.font = `${layer.size * 2}px Arial`;
              ctx.textAlign = 'center';
              ctx.fillText(layer.content, x, y);
            }
          });

          // Convert to blob and trigger download
          canvas.toBlob(blob => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `festival-poster-${Date.now()}.jpg`;
              a.click();
              URL.revokeObjectURL(url);
            }
          }, 'image/jpeg', 0.9);
        }
      };
      img.crossOrigin = 'anonymous';
      img.src = uploadedImage;
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  const handleShare = (option: string) => {
    const shareData = {
      title: 'My Festival Poster',
      text: 'Check out my amazing festival poster!',
      url: window.location.href
    };

    switch (option) {
      case 'WhatsApp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`);
        break;
      case 'Facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`);
        break;
      case 'Twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`);
        break;
      case 'Instagram':
        // Instagram doesn't support direct sharing, so download image
        saveToGallery();
        break;
      case 'Copy Link':
        navigator.clipboard.writeText(shareData.url);
        break;
      case 'Download':
        saveToGallery();
        break;
    }
    setShowShareModal(false);
  };

  const getFilterStyle = () => {
    const baseFilter = filters.find(f => f.id === selectedFilter)?.filter || '';
    const adjustments = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    return baseFilter ? `${baseFilter} ${adjustments}` : adjustments;
  };

  if (activeTab === 'upload') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white shadow-sm px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            </button>
            <h1 className="text-lg font-bold text-gray-900">Photo Editor</h1>
            <div className="w-10"></div>
          </div>
        </div>

        <div className="pt-6 px-4">
          <div className="text-center py-12">
            <div className="w-32 h-32 bg-gray-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
              <i className="ri-image-add-line text-4xl text-gray-400"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Upload Your Photo</h2>
            <p className="text-gray-600 mb-8">Choose a photo to start editing with professional tools</p>

            <div className="space-y-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all duration-200 !rounded-button"
              >
                <i className="ri-upload-line mr-2"></i>
                Choose from Gallery
              </button>

              <button
                onClick={handleCameraCapture}
                className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-2xl font-bold hover:border-gray-300 transition-all duration-200 !rounded-button"
              >
                <i className="ri-camera-line mr-2"></i>
                Take Photo
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />

            <div className="mt-12">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Features Available</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: 'ri-crop-line', name: 'Crop & Resize' },
                  { icon: 'ri-contrast-line', name: 'Filters & Effects' },
                  { icon: 'ri-text', name: 'Text Editor' },
                  { icon: 'ri-sticker-line', name: 'Stickers' },
                  { icon: 'ri-image-line', name: 'Frames' },
                  { icon: 'ri-stack-line', name: 'Layer Management' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <i className={`${feature.icon} text-lg text-gray-600`}></i>
                    </div>
                    <span className="font-medium text-gray-900">{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-black/50 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setActiveTab('upload')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <i className="ri-arrow-left-line text-xl text-white"></i>
        </button>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleZoom(-0.2)}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <i className="ri-subtract-line"></i>
          </button>
          <span className="text-white font-medium">{Math.round(canvasZoom * 100)}%</span>
          <button
            onClick={() => handleZoom(0.2)}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <i className="ri-add-line"></i>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowShareModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-full font-medium !rounded-button"
          >
            Share
          </button>
          <button
            onClick={saveToGallery}
            className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium !rounded-button"
          >
            Save
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <div
          ref={canvasRef}
          className="relative bg-white rounded-lg shadow-2xl overflow-hidden cursor-move"
          style={{
            transform: `scale(${canvasZoom}) translate(${canvasPosition.x}px, ${canvasPosition.y}px)`,
            width: '300px',
            height: '400px'
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {uploadedImage && (
            <img
              src={uploadedImage}
              alt="Editing"
              className="w-full h-full object-cover"
              style={{ filter: getFilterStyle() }}
              draggable={false}
            />
          )}

          {selectedFrame && (
            <div className="absolute inset-0 pointer-events-none z-10">
              <img
                src={frames.find(f => f.id === selectedFrame)?.image}
                alt="Frame"
                className="w-full h-full object-cover mix-blend-multiply"
                style={{ opacity: 0.8 }}
              />
            </div>
          )}

          {textLayers.map((layer, index) => (
            <div
              key={layer.id}
              className={`absolute cursor-move select-none ${index === selectedLayer ? 'ring-2 ring-blue-500 z-20' : 'z-10'} ${layer.isDragging ? 'scale-110' : ''} transition-transform`}
              style={{
                left: `${layer.x}%`,
                top: `${layer.y}%`,
                transform: `translate(-50%, -50%) rotate(${layer.rotation || 0}deg)`,
                userSelect: 'none'
              }}
              onMouseDown={(e) => handleLayerMouseDown(e, index)}
            >
              {layer.type === 'sticker' ? (
                <span
                  style={{
                    fontSize: `${layer.size}px`,
                    display: 'block',
                    lineHeight: 1,
                    userSelect: 'none'
                  }}
                >
                  {layer.content}
                </span>
              ) : (
                <span
                  style={{
                    fontSize: `${layer.fontSize}px`,
                    color: layer.color,
                    fontFamily: layer.fontFamily,
                    textShadow: layer.shadow ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none',
                    fontWeight: 'bold',
                    userSelect: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {layer.text}
                </span>
              )}
            </div>
          )}

          {cropMode && (
            <div className="absolute inset-0 border-4 border-dashed border-yellow-400 bg-black/20 flex items-center justify-center z-30">
              <span className="text-yellow-400 font-bold">Crop Preview</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="bg-black/80 border-t border-gray-700">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-700">
          {[
            { id: 'frames', icon: 'ri-image-line', label: 'Frames' },
            { id: 'filters', icon: 'ri-contrast-line', label: 'Filters' },
            { id: 'text', icon: 'ri-text', label: 'Text' },
            { id: 'stickers', icon: 'ri-emotion-line', label: 'Stickers' },
            { id: 'crop', icon: 'ri-crop-line', label: 'Crop' },
            { id: 'layers', icon: 'ri-stack-line', label: 'Layers' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveEditorTab(tab.id)}
              className={`flex-1 py-3 text-center transition-colors ${
                activeEditorTab === tab.id
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
          {activeEditorTab === 'frames' && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedFrame('')}
                className={`flex-shrink-0 w-16 h-20 rounded-xl border-2 flex items-center justify-center ${
                  !selectedFrame ? 'border-blue-500' : 'border-gray-600'
                }`}
              >
                <i className="ri-close-line text-white text-xl"></i>
              </button>
              {frames.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => setSelectedFrame(frame.id)}
                  className={`flex-shrink-0 w-16 h-20 rounded-xl border-2 overflow-hidden ${
                    selectedFrame === frame.id ? 'border-blue-500' : 'border-gray-600'
                  }`}
                >
                  <img src={frame.image} alt={frame.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {activeEditorTab === 'filters' && (
            <div className="space-y-4">
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedFilter === filter.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Brightness: {brightness}%</label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none slider"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Contrast: {contrast}%</label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none slider"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Saturation: {saturation}%</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={saturation}
                    onChange={(e) => setSaturation(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none slider"
                  />
                </div>
              </div>
            </div>
          )}

          {activeEditorTab === 'text' && (
            <div className="space-y-4">
              <button
                onClick={addTextLayer}
                className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors !rounded-button"
              >
                <i className="ri-add-line mr-2"></i>
                Add Text
              </button>

              {textLayers.length > 0 && selectedLayer < textLayers.length && textLayers[selectedLayer]?.type === 'text' && (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={textLayers[selectedLayer]?.text || ''}
                    onChange={(e) => updateTextLayer('text', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    placeholder="Enter text"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">Size: {textLayers[selectedLayer]?.fontSize || 24}px</label>
                      <input
                        type="range"
                        min="12"
                        max="48"
                        value={textLayers[selectedLayer]?.fontSize || 24}
                        onChange={(e) => updateTextLayer('fontSize', Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none slider"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">Color</label>
                      <input
                        type="color"
                        value={textLayers[selectedLayer]?.color || '#000000'}
                        onChange={(e) => updateTextLayer('color', e.target.value)}
                        className="w-full h-8 rounded border-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <label className="flex items-center space-x-2 text-gray-300">
                      <input
                        type="checkbox"
                        checked={textLayers[selectedLayer]?.shadow || false}
                        onChange={(e) => updateTextLayer('shadow', e.target.checked)}
                        className="opacity-0 w-4 h-4"
                      />
                      <span className="text-sm">Text Shadow</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeEditorTab === 'stickers' && (
            <div className="grid grid-cols-6 gap-3">
              {stickers.map((sticker) => (
                <button
                  key={sticker.id}
                  onClick={() => addSticker(sticker)}
                  className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-2xl hover:bg-gray-700 transition-colors hover:scale-110"
                  title={sticker.name}
                >
                  {sticker.emoji}
                </button>
              ))}
            </div>
          )}

          {activeEditorTab === 'crop' && (
            <div className="space-y-4">
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {cropRatios.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => applyCrop(ratio)}
                    className="flex-shrink-0 px-4 py-2 bg-gray-700 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-600 transition-colors hover:text-white"
                  >
                    {ratio.name}
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-xs">Tap a ratio to apply crop preview</p>
            </div>
          )}

          {activeEditorTab === 'layers' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-medium">Layers ({textLayers.length})</span>
                <span className="text-gray-500 text-sm">Selected: {selectedLayer + 1}</span>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={moveLayerUp}
                  disabled={selectedLayer >= textLayers.length - 1}
                  className="flex-1 bg-gray-700 text-white py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed !rounded-button"
                >
                  <i className="ri-arrow-up-line mr-2"></i>
                  Forward
                </button>
                <button
                  onClick={moveLayerDown}
                  disabled={selectedLayer <= 0}
                  className="flex-1 bg-gray-700 text-white py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed !rounded-button"
                >
                  <i className="ri-arrow-down-line mr-2"></i>
                  Backward
                </button>
                <button
                  onClick={deleteLayer}
                  disabled={textLayers.length === 0}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed !rounded-button"
                >
                  <i className="ri-delete-bin-line mr-2"></i>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-3xl w-full max-w-md p-6 transform translate-y-0 transition-transform duration-300">
            <div className="text-center mb-6">
              <div className="w-12 h-3 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Share Your Creation</h3>
              <p className="text-gray-600">Choose how to share your festival poster</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {shareOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleShare(option.name)}
                  className="flex flex-col items-center p-4 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center mb-2`}>
                    <i className={`${option.icon} text-white text-xl`}></i>
                  </div>
                  <span className="text-sm text-gray-700">{option.name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors !rounded-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
