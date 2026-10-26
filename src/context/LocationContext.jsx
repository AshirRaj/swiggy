import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

const LOCATION_STORAGE_KEY = 'swiggy_current_location';

const DEFAULT_LOCATION = {
  id: 'loc-1',
  area: 'Indiranagar',
  city: 'Bengaluru',
  fullAddress: '100ft Road, Indiranagar, Bengaluru, Karnataka 560038',
  label: 'Other',
};

const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(() => {
    return getStorageItem(LOCATION_STORAGE_KEY, DEFAULT_LOCATION);
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    setStorageItem(LOCATION_STORAGE_KEY, currentLocation);
  }, [currentLocation]);

  const selectLocation = (loc) => {
    setCurrentLocation({
      ...DEFAULT_LOCATION,
      ...loc,
    });
    setIsLocationModalOpen(false);
  };

  const detectGPSLocation = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const detected = {
          id: 'loc-detected',
          area: 'Bandra West',
          city: 'Mumbai',
          fullAddress: 'Hill Road, Near Bandstand, Bandra West, Mumbai 400050',
          label: 'Current Location',
        };
        selectLocation(detected);
        resolve(detected);
      }, 700);
    });
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        selectLocation,
        detectGPSLocation,
        isLocationModalOpen,
        setIsLocationModalOpen,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
