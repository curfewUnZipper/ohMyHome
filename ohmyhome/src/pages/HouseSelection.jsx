import React from 'react';

export default function HouseSelection({ onSelectHouse }) {
  const [houses, setHouses] = React.useState([
    { id: 1, name: 'House 1', status: 'online' },
    { id: 2, name: 'House 2', status: 'offline' },
    { id: 3, name: 'House 3', status: 'offline' }
  ]);

  const [showAddModal, setShowAddModal] = React.useState(false);
  const [newHouseName, setNewHouseName] = React.useState('');
  const [hoveredHouse, setHoveredHouse] = React.useState(null);

  const handleAddHouse = () => {
    if (newHouseName.trim()) {
      const newHouse = {
        id: houses.length + 1,
        name: newHouseName.trim(),
        status: 'online'
      };
      setHouses([...houses, newHouse]);
      setNewHouseName('');
      setShowAddModal(false);
    }
  };

  const handleDeleteHouse = (houseId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this house?')) {
      setHouses(houses.filter(house => house.id !== houseId));
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center px-5 py-10">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-3 text-brand-primary">
          Choose your smart home
        </h1>
      </div>

      {/* Houses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl w-full">
        {houses.map((house) => (
          <div
            key={house.id}
            onClick={() => house.status === 'online' && house.id === 1 && onSelectHouse(house.id)}
            onMouseEnter={() => setHoveredHouse(house.id)}
            onMouseLeave={() => setHoveredHouse(null)}
            className={`flex flex-col items-center relative transition-transform duration-200 ${
              house.status === 'online' && house.id === 1 ? 'cursor-pointer' : 'cursor-default'
            } ${house.status === 'offline' ? 'opacity-50' : 'opacity-100'} ${
              hoveredHouse === house.id && house.status === 'online' && house.id === 1 ? 'scale-105' : 'scale-100'
            }`}
          >
            {/* Delete Button */}
            {hoveredHouse === house.id && (
              <button
                onClick={(e) => handleDeleteHouse(house.id, e)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 rounded-full w-9 h-9 flex items-center justify-center z-10 transition-all duration-200 hover:scale-110 shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            )}

            <div className="relative w-full max-w-xs mx-auto">
              <svg width="100%" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                {/* House base */}
                <rect x="80" y="140" width="120" height="100" fill="var(--brand-primary)" rx="4"/>
                
                {/* Roof */}
                <path d="M 70 140 L 140 80 L 210 140 Z" fill="var(--brand-primary)" opacity="0.8"/>
                <path d="M 70 140 L 140 80 L 140 100 L 80 150 Z" fill="var(--brand-primary)" opacity="0.6"/>
                
                {/* Chimney */}
                <rect x="170" y="95" width="20" height="45" fill="var(--brand-primary)" opacity="0.9" rx="2"/>
                <rect x="165" y="90" width="30" height="8" fill="var(--brand-primary)" rx="2"/>
                
                {/* Window */}
                <rect x="120" y="150" width="40" height="35" fill="var(--brand-hover)" rx="3"/>
                <line x1="140" y1="150" x2="140" y2="185" stroke="var(--brand-primary)" strokeWidth="3" opacity="0.5"/>
                <line x1="120" y1="167" x2="160" y2="167" stroke="var(--brand-primary)" strokeWidth="3" opacity="0.5"/>
                
                {/* Door */}
                <ellipse cx="140" cy="200" rx="25" ry="30" fill="var(--brand-hover)"/>
                <rect x="115" y="200" width="50" height="40" fill="var(--brand-secondary)"/>
                <circle cx="150" cy="220" r="3" fill="var(--brand-primary)"/>
                
                {/* Ground */}
                <rect x="60" y="240" width="160" height="8" fill="var(--brand-primary)" opacity="0.8" rx="4"/>
              </svg>
              
              {house.status === 'offline' && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg">
                  OFFLINE
                </div>
              )}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mt-5 text-brand-text">
              {house.name}
            </h2>
          </div>
        ))}
        
        {/* Add House Button */}
        <div
          onClick={() => setShowAddModal(true)}
          onMouseEnter={() => setHoveredHouse('add')}
          onMouseLeave={() => setHoveredHouse(null)}
          className={`flex flex-col items-center cursor-pointer transition-transform duration-200 ${
            hoveredHouse === 'add' ? 'scale-105' : 'scale-100'
          }`}
        >
          <div className="relative w-full max-w-xs mx-auto">
            <svg width="100%" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              {/* House base */}
              <rect x="80" y="140" width="120" height="100" fill="var(--brand-primary)" rx="4" opacity="0.3"/>
              
              {/* Roof */}
              <path d="M 70 140 L 140 80 L 210 140 Z" fill="var(--brand-primary)" opacity="0.3"/>
              
              {/* Chimney */}
              <rect x="170" y="110" width="15" height="30" fill="var(--brand-primary)" rx="2" opacity="0.3"/>
              
              {/* Window */}
              <rect x="130" y="160" width="20" height="20" fill="var(--brand-hover)" rx="2" opacity="0.3"/>
              
              {/* Door */}
              <ellipse cx="140" cy="200" rx="25" ry="30" fill="var(--brand-hover)" opacity="0.3"/>
              <rect x="115" y="200" width="50" height="40" fill="var(--brand-secondary)" opacity="0.3"/>
              
              {/* Ground */}
              <rect x="60" y="240" width="160" height="8" fill="var(--brand-primary)" rx="4" opacity="0.3"/>
              
              {/* Plus icon */}
              <circle cx="200" cy="120" r="40" fill="var(--brand-primary)"/>
              <line x1="200" y1="95" x2="200" y2="145" stroke="white" strokeWidth="7" strokeLinecap="round"/>
              <line x1="175" y1="120" x2="225" y2="120" stroke="white" strokeWidth="7" strokeLinecap="round"/>
            </svg>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-5 text-brand-text">
            Add House
          </h2>
        </div>
      </div>

      {/* Add House Modal */}
      {showAddModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => {
            setShowAddModal(false);
            setNewHouseName('');
          }}
        >
          <div 
            className="bg-brand-bg border-2 border-brand-primary rounded-2xl p-8 md:p-10 w-11/12 max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-brand-text text-2xl md:text-3xl font-bold mb-6">
              Add New House
            </h2>
            
            <input
              type="text"
              value={newHouseName}
              onChange={(e) => setNewHouseName(e.target.value)}
              placeholder="Enter house name..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddHouse()}
              autoFocus
              className="w-full px-4 py-3 text-base rounded-lg border-2 border-brand-primary bg-brand-hover text-brand-text mb-6 outline-none focus:border-opacity-100 transition-all"
            />
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewHouseName('');
                }}
                className="px-6 py-3 text-base font-bold rounded-lg border-2 border-brand-primary bg-transparent text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
              >
                Cancel
              </button>
              
              <button
                onClick={handleAddHouse}
                disabled={!newHouseName.trim()}
                className={`px-6 py-3 text-base font-bold rounded-lg border-none text-white transition-all ${
                  newHouseName.trim() 
                    ? 'bg-brand-primary hover:opacity-80 hover:scale-105 cursor-pointer' 
                    : 'bg-gray-500 cursor-not-allowed'
                }`}
              >
                Add House
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}