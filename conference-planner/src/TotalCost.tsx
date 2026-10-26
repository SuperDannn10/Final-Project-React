import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';

interface TotalCostProps {
  onClose?: () => void;
  numberOfPeople: number;
}

const TotalCost: React.FC<TotalCostProps> = ({ onClose, numberOfPeople }) => {
  const venueItems = useSelector((state: RootState) => state.venue);
  const avItems = useSelector((state: RootState) => state.av);
  const mealsItems = useSelector((state: RootState) => state.meals);

  // Filter items that have selections
  const selectedVenues = venueItems.filter((item) => item.quantity > 0);
  const selectedAv = avItems.filter((item) => item.quantity > 0);
  const selectedMeals = mealsItems.filter((item) => item.selected);

  const venueSubtotal = selectedVenues.reduce(
    (total, item) => total + item.cost * item.quantity,
    0
  );
  const avSubtotal = selectedAv.reduce(
    (total, item) => total + item.cost * item.quantity,
    0
  );
  const mealsSubtotal = selectedMeals.reduce(
    (total, item) => total + item.cost * numberOfPeople,
    0
  );

  const totalCost = venueSubtotal + avSubtotal + mealsSubtotal;

  const hasItems =
    selectedVenues.length > 0 || selectedAv.length > 0 || selectedMeals.length > 0;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="modal-header">
          <h3 className="modal-title">TOTAL COST FOR THE EVENT</h3>
          <div className="modal-total-cost">${totalCost}</div>
        </div>

        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Unit Cost</th>
                <th>Quantity</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {/* Venue Items */}
              {selectedVenues.map((item, index) => (
                <tr key={`venue-${index}`}>
                  <td className="item-name">{item.name}</td>
                  <td>${item.cost}</td>
                  <td>{item.quantity}</td>
                  <td className="item-subtotal">${item.cost * item.quantity}</td>
                </tr>
              ))}

              {/* AV Items */}
              {selectedAv.map((item, index) => (
                <tr key={`av-${index}`}>
                  <td className="item-name">{item.name}</td>
                  <td>${item.cost}</td>
                  <td>{item.quantity}</td>
                  <td className="item-subtotal">${item.cost * item.quantity}</td>
                </tr>
              ))}

              {/* Meals Items */}
              {selectedMeals.map((item, index) => (
                <tr key={`meal-${index}`}>
                  <td className="item-name">{item.name}</td>
                  <td>${item.cost}</td>
                  <td>For {numberOfPeople} people</td>
                  <td className="item-subtotal">${item.cost * numberOfPeople}</td>
                </tr>
              ))}

              {!hasItems && (
                <tr>
                  <td colSpan={4} className="no-items-msg">
                    No items selected yet. Please select venue rooms, add-ons, or meals.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="modal-footer">
          <button className="modal-btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalCost;
