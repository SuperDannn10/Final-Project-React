import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';
import { incrementQuantity, decrementQuantity } from './venueSlice';
import { incrementAvQuantity, decrementAvQuantity } from './avSlice';
import { toggleMealSelection } from './mealsSlice';
import TotalCost from './TotalCost';

interface ConferenceEventProps {
  onBackToHome?: () => void;
}

// Fallback placeholder SVGs in case network is unavailable
const fallbackRoomSvg = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%232c3e50"/><text x="50%" y="45%" fill="%23ecf0f1" font-size="18" font-family="sans-serif" text-anchor="middle">Venue Room</text><rect x="60" y="110" width="180" height="50" rx="6" fill="%2334495e"/><circle cx="150" cy="80" r="15" fill="%23e67e22"/></svg>';
const fallbackAvSvg = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%231a365d"/><text x="50%" y="45%" fill="%23ecf0f1" font-size="18" font-family="sans-serif" text-anchor="middle">Equipment</text><circle cx="150" cy="115" r="28" fill="%2338b2ac"/><rect x="135" y="145" width="30" height="25" fill="%232b6cb0"/></svg>';

const ConferenceEvent: React.FC<ConferenceEventProps> = ({ onBackToHome }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(50);

  const dispatch = useDispatch();
  const venueItems = useSelector((state: RootState) => state.venue);
  const avItems = useSelector((state: RootState) => state.av);
  const mealsItems = useSelector((state: RootState) => state.meals);

  // Subtotal calculations
  const venueTotalCost = venueItems.reduce(
    (acc, item) => acc + item.cost * item.quantity,
    0
  );

  const avTotalCost = avItems.reduce(
    (acc, item) => acc + item.cost * item.quantity,
    0
  );

  const mealsTotalCost = mealsItems.reduce(
    (acc, item) => (item.selected ? acc + item.cost * numberOfPeople : acc),
    0
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 0) {
      setNumberOfPeople(0);
    } else {
      setNumberOfPeople(val);
    }
  };

  return (
    <div className="conference-event-container">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="navbar-left" onClick={onBackToHome} style={{ cursor: 'pointer' }}>
          <h2 className="navbar-brand">Conference Expense Planner</h2>
        </div>
        <nav className="navbar-links">
          <button
            type="button"
            className="nav-link"
            onClick={() => scrollToSection('venue-section')}
          >
            Venue
          </button>
          <button
            type="button"
            className="nav-link"
            onClick={() => scrollToSection('addons-section')}
          >
            Add-ons
          </button>
          <button
            type="button"
            className="nav-link"
            onClick={() => scrollToSection('meals-section')}
          >
            Meals
          </button>
        </nav>
        <div className="navbar-right">
          <button
            type="button"
            className="show-details-btn"
            onClick={() => setShowDetails(true)}
          >
            Show Details
          </button>
        </div>
      </header>

      <main className="main-content">
        {/* Section 1: Venue Room Selection */}
        <section id="venue-section" className="section-block">
          <div className="section-header-banner">
            <h2>Venue Room Selection</h2>
          </div>

          <div className="cards-grid">
            {venueItems.map((item, index) => {
              // Extract clean room title and capacity
              const titleMatch = item.name.match(/^(.*?)\s*\(Capacity:\s*(\d+)\)$/i);
              const roomTitle = titleMatch ? titleMatch[1] : item.name;
              const roomCap = titleMatch ? titleMatch[2] : item.capacity;

              return (
                <div key={item.name} className="product-card">
                  <div className="card-image-wrap">
                    <img
                      src={item.img}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackRoomSvg;
                      }}
                      className="card-image"
                    />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{roomTitle}</h3>
                    <p className="card-capacity">(Capacity: {roomCap})</p>
                    <p className="card-cost">${item.cost}</p>
                    <div className="card-quantity-controls">
                      <button
                        type="button"
                        className="btn-counter btn-decrement"
                        disabled={item.quantity === 0}
                        onClick={() => dispatch(decrementQuantity(index))}
                        aria-label={`Decrease ${item.name}`}
                      >
                        -
                      </button>
                      <span className="quantity-number">{item.quantity}</span>
                      <button
                        type="button"
                        className="btn-counter btn-increment"
                        onClick={() => dispatch(incrementQuantity(index))}
                        aria-label={`Increase ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="subtotal-container">
            <div className="subtotal-pill">Total Cost: ${venueTotalCost}</div>
          </div>
        </section>

        {/* Section 2: Add-ons Selection */}
        <section id="addons-section" className="section-block">
          <div className="section-header-banner">
            <h2>Add-ons Selection</h2>
          </div>

          <div className="cards-grid">
            {avItems.map((item, index) => (
              <div key={item.name} className="product-card">
                <div className="card-image-wrap">
                  <img
                    src={item.img}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = fallbackAvSvg;
                    }}
                    className="card-image"
                  />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-cost">${item.cost}</p>
                  <div className="card-quantity-controls">
                    <button
                      type="button"
                      className="btn-counter btn-decrement"
                      disabled={item.quantity === 0}
                      onClick={() => dispatch(decrementAvQuantity(index))}
                      aria-label={`Decrease ${item.name}`}
                    >
                      -
                    </button>
                    <span className="quantity-number">{item.quantity}</span>
                    <button
                      type="button"
                      className="btn-counter btn-increment"
                      onClick={() => dispatch(incrementAvQuantity(index))}
                      aria-label={`Increase ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="subtotal-container">
            <div className="subtotal-pill">Total Cost: ${avTotalCost}</div>
          </div>
        </section>

        {/* Section 3: Meals Selection */}
        <section id="meals-section" className="section-block meals-section-block">
          <div className="section-header-banner">
            <h2>Meals Selection</h2>
          </div>

          <div className="meals-content-card">
            <div className="people-input-row">
              <label htmlFor="numberOfPeople" className="people-label">
                Number of People:
              </label>
              <input
                id="numberOfPeople"
                type="number"
                min="0"
                value={numberOfPeople}
                onChange={handlePeopleChange}
                className="people-input"
              />
            </div>

            <div className="meals-options-grid">
              {mealsItems.map((meal, index) => (
                <div key={meal.name} className="meal-option-row">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={meal.selected}
                      onChange={() => dispatch(toggleMealSelection(index))}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="meal-label-text">{meal.name}</span>
                  </label>
                  <span className="meal-price">${meal.cost}</span>
                </div>
              ))}
            </div>

            <div className="subtotal-container" style={{ marginTop: '24px' }}>
              <div className="subtotal-pill">Total Cost: ${mealsTotalCost}</div>
            </div>
          </div>
        </section>
      </main>

      {/* Show Details Pop-up Modal */}
      {showDetails && (
        <TotalCost
          numberOfPeople={numberOfPeople}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default ConferenceEvent;
