import { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';
import ConferenceEvent from './ConferenceEvent';

function App() {
  const [showVenue, setShowVenue] = useState(false);

  const handleGetStarted = () => {
    setShowVenue(true);
  };

  const handleBackToHome = () => {
    setShowVenue(false);
  };

  return (
    <div className="app-container">
      {!showVenue ? (
        <AboutUs onGetStarted={handleGetStarted} />
      ) : (
        <ConferenceEvent onBackToHome={handleBackToHome} />
      )}
    </div>
  );
}

export default App;

