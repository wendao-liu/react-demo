import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function index(props) {
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    const handleDocumentClick = (event) => {
      console.log(event.target);

      if (showDetails && !event.target.closest('.details')) {
        setShowDetails(false);
      }
    };

    document.addEventListener('click', handleDocumentClick, false);

    return () => {
      document.removeEventListener('click', handleDocumentClick, false);
    };
  }, [showDetails]);

  const handleDivClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>
      <div onClick={handleDivClick}>Click me to show details</div>
      {showDetails && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            return false;
          }}
        >
          Details go here
        </div>
      )}
    </div>
  );
}

index.propTypes = {};

export default index;
