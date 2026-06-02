import toyotaImg from '../assets/images/toyota.jpg';
import hondaImg from '../assets/images/hondaCity.jpg';
import swiftImg from '../assets/images/marutiSwift.jpg';
import nexonImg from '../assets/images/tataNexon.avif';
import cretaImg from '../assets/images/hyundaiCreta.jpg';
import royalImg from '../assets/images/royalBike.jpg';
import hondaBikeImg from '../assets/images/hondaBike.jpg';
import bajajImg from '../assets/images/bajajBike.jpg';
import vespaImg from '../assets/images/VespaScooter.jpg';
import activaImg from '../assets/images/hondaScooter.jpg';
import atherImg from '../assets/images/atherScooter.jpg';
import tataBusImg from '../assets/images/tataBus.webp';
import volvoBusImg from '../assets/images/volvo.jpg';
import eicherBusImg from '../assets/images/eicherBus.jpg';
import autoRickshawImg from '../assets/images/auto.jpg';
import eRickshawImg from '../assets/images/eauto.webp';

import React, { createContext, useState, useContext } from 'react';

const VehicleContext = createContext();

// Vehicle database with comprehensive vehicle catalog
const VEHICLE_DATABASE = [
  // CARS - Premium Brands
  {
    id: 1,
    name: 'Toyota Fortuner',
    type: 'Car',
    brand: 'Toyota',
    category: 'SUV',
    basePricePerDay: 4000,
    brandMultiplier: 1.3, // Premium brand
    variants: [
      { id: '1-1', fuelType: 'Petrol', color: 'White', pricePerDay: 4000 },
      { id: '1-2', fuelType: 'Diesel', color: 'Black', pricePerDay: 4500 },
      { id: '1-3', fuelType: 'Diesel', color: 'Silver', pricePerDay: 4500 },
    ],
    image: toyotaImg,
    description: '7-seater premium SUV with excellent comfort',
    features: ['Air Conditioning', 'Power Windows', 'ABS Brakes', '7 Seats'],
  },
  {
    id: 2,
    name: 'Honda City',
    type: 'Car',
    brand: 'Honda',
    category: 'Sedan',
    basePricePerDay: 2500,
    brandMultiplier: 1.15,
    variants: [
      { id: '2-1', fuelType: 'Petrol', color: 'White', pricePerDay: 2500 },
      { id: '2-2', fuelType: 'Diesel', color: 'Black', pricePerDay: 2800 },
    ],
    image: hondaImg,
    description: 'Compact sedan perfect for city driving',
    features: ['Air Conditioning', 'Power Steering', 'Airbags', 'Power Windows'],
  },
  {
    id: 3,
    name: 'Maruti Swift',
    type: 'Car',
    brand: 'Maruti',
    category: 'Hatchback',
    basePricePerDay: 1800,
    brandMultiplier: 1.0,
    variants: [
      { id: '3-1', fuelType: 'Petrol', color: 'Red', pricePerDay: 1800 },
      { id: '3-2', fuelType: 'Petrol', color: 'White', pricePerDay: 1800 },
      { id: '3-3', fuelType: 'CNG', color: 'Gray', pricePerDay: 1600 },
    ],
    image: swiftImg,
    description: 'Affordable and fuel-efficient hatchback',
    features: ['Power Steering', 'Air Conditioning', 'Central Locking'],
  },
  {
    id: 4,
    name: 'Tata Nexon EV',
    type: 'Car',
    brand: 'Tata',
    category: 'Electric SUV',
    basePricePerDay: 3500,
    brandMultiplier: 1.1,
    variants: [
      { id: '4-1', fuelType: 'Electric', color: 'Blue', pricePerDay: 3500 },
      { id: '4-2', fuelType: 'Electric', color: 'White', pricePerDay: 3500 },
    ],
    image: nexonImg,
    description: 'Modern electric SUV with eco-friendly technology',
    features: ['Fast Charging', 'Touch Screen', '300+ KM Range', 'Airbags'],
  },
  {
    id: 5,
    name: 'Hyundai Creta',
    type: 'Car',
    brand: 'Hyundai',
    category: 'SUV',
    basePricePerDay: 3000,
    brandMultiplier: 1.15,
    variants: [
      { id: '5-1', fuelType: 'Petrol', color: 'Silver', pricePerDay: 3000 },
      { id: '5-2', fuelType: 'Diesel', color: 'Black', pricePerDay: 3300 },
    ],
    image: cretaImg,
    description: 'Stylish compact SUV with modern features',
    features: ['Sunroof', 'Touchscreen', 'Reverse Camera', 'All Weather Tyres'],
  },

  // BIKES
  {
    id: 6,
    name: 'Royal Enfield Classic',
    type: 'Bike',
    brand: 'Royal Enfield',
    category: 'Cruiser',
    basePricePerDay: 800,
    brandMultiplier: 1.1,
    variants: [
      { id: '6-1', fuelType: 'Petrol', color: 'Black', pricePerDay: 800 },
      { id: '6-2', fuelType: 'Petrol', color: 'Red', pricePerDay: 800 },
      { id: '6-3', fuelType: 'Petrol', color: 'Blue', pricePerDay: 800 },
    ],
    image: royalImg,
    description: 'Classic retro-style cruiser bike',
    features: ['ABS Available', 'Single Cylinder', 'High Ground Clearance'],
  },
  {
    id: 7,
    name: 'Honda CB500',
    type: 'Bike',
    brand: 'Honda',
    category: 'Sport Bike',
    basePricePerDay: 1200,
    brandMultiplier: 1.2,
    variants: [
      { id: '7-1', fuelType: 'Petrol', color: 'Red', pricePerDay: 1200 },
      { id: '7-2', fuelType: 'Petrol', color: 'Black', pricePerDay: 1200 },
    ],
    image: hondaBikeImg,
    description: 'High-performance sport bike',
    features: ['ABS', 'Dual Exhausts', 'Digital Display'],
  },
  {
    id: 8,
    name: 'Bajaj Pulsar',
    type: 'Bike',
    brand: 'Bajaj',
    category: 'Commuter',
    basePricePerDay: 500,
    brandMultiplier: 0.9,
    variants: [
      { id: '8-1', fuelType: 'Petrol', color: 'Black', pricePerDay: 500 },
      { id: '8-2', fuelType: 'Petrol', color: 'Red', pricePerDay: 500 },
    ],
    image: bajajImg,
    description: 'Reliable and fuel-efficient commuter bike',
    features: ['Lightweight', 'Good Mileage', 'Low Maintenance'],
  },

  // SCOOTERS
  {
    id: 9,
    name: 'Vespa Primavera',
    type: 'Scooter',
    brand: 'Vespa',
    category: 'Premium Scooter',
    basePricePerDay: 600,
    brandMultiplier: 1.15,
    variants: [
      { id: '9-1', fuelType: 'Petrol', color: 'Red', pricePerDay: 600 },
      { id: '9-2', fuelType: 'Petrol', color: 'White', pricePerDay: 600 },
      { id: '9-3', fuelType: 'Petrol', color: 'Blue', pricePerDay: 600 },
    ],
    image: vespaImg,
    description: 'Stylish Italian-designed premium scooter',
    features: ['Automatic Transmission', 'LED Lights', 'Comfortable Seat'],
  },
  {
    id: 10,
    name: 'Honda Activa',
    type: 'Scooter',
    brand: 'Honda',
    category: 'Automatic Scooter',
    basePricePerDay: 400,
    brandMultiplier: 1.1,
    variants: [
      { id: '10-1', fuelType: 'Petrol', color: 'Black', pricePerDay: 400 },
      { id: '10-2', fuelType: 'Petrol', color: 'White', pricePerDay: 400 },
      { id: '10-3', fuelType: 'Petrol', color: 'Blue', pricePerDay: 400 },
    ],
    image: activaImg,
    description: 'Most popular automatic scooter in India',
    features: ['CVT Transmission', 'Good Mileage', 'Underseat Storage'],
  },
  {
    id: 11,
    name: 'Ather Electric Scooter',
    type: 'Scooter',
    brand: 'Ather',
    category: 'Electric Scooter',
    basePricePerDay: 350,
    brandMultiplier: 1.05,
    variants: [
      { id: '11-1', fuelType: 'Electric', color: 'Gray', pricePerDay: 350 },
      { id: '11-2', fuelType: 'Electric', color: 'Black', pricePerDay: 350 },
    ],
    image: atherImg,
    description: 'Modern electric scooter with smart features',
    features: ['App Connected', 'Fast Charging', 'Zero Emissions', '100+ KM Range'],
  },

  // BUSES
  {
    id: 12,
    name: 'Tata AC Bus',
    type: 'Bus',
    brand: 'Tata',
    category: 'AC Bus',
    basePricePerDay: 8000,
    brandMultiplier: 1.0,
    variants: [
      { id: '12-1', fuelType: 'Diesel', color: 'White', pricePerDay: 8000 },
    ],
    image: tataBusImg,
    description: '45-seater air-conditioned bus for long routes',
    features: ['AC', '45 Seats', 'USB Charging Points', 'Luggage Space'],
  },
  {
    id: 13,
    name: 'Volvo Bus',
    type: 'Bus',
    brand: 'Volvo',
    category: 'Luxury Bus',
    basePricePerDay: 12000,
    brandMultiplier: 1.3,
    variants: [
      { id: '13-1', fuelType: 'Diesel', color: 'White', pricePerDay: 12000 },
    ],
    image: volvoBusImg,
    description: 'Premium luxury coach with advanced comfort features',
    features: ['AC', 'Reclining Seats', 'WiFi', '50 Seats', 'Onboard Washroom'],
  },
  {
    id: 14,
    name: 'Eicher Non-AC Bus',
    type: 'Bus',
    brand: 'Eicher',
    category: 'Standard Bus',
    basePricePerDay: 4500,
    brandMultiplier: 0.95,
    variants: [
      { id: '14-1', fuelType: 'Diesel', color: 'Yellow', pricePerDay: 4500 },
    ],
    image: eicherBusImg,
    description: 'Economical non-AC bus for short routes',
    features: ['Non-AC', 'High Capacity', 'Good Fuel Efficiency'],
  },

  // RICKSHAWS (Auto-Rickshaws)
  {
    id: 15,
    name: 'Auto Rickshaw 3-Wheeler',
    type: 'Rickshaw',
    brand: 'Bajaj',
    category: 'Auto Rickshaw',
    basePricePerDay: 300,
    brandMultiplier: 0.9,
    variants: [
      { id: '15-1', fuelType: 'CNG', color: 'Yellow-Black', pricePerDay: 300 },
      { id: '15-2', fuelType: 'Petrol', color: 'Yellow', pricePerDay: 350 },
    ],
    image: autoRickshawImg,
    description: '3-seater auto-rickshaw for city commute',
    features: ['CNG/Petrol Option', 'Compact', 'Very Affordable', 'Easy Manoeuvrability'],
  },
  {
    id: 16,
    name: 'E-Rickshaw',
    type: 'Rickshaw',
    brand: 'Kinetic',
    category: 'Electric Rickshaw',
    basePricePerDay: 250,
    brandMultiplier: 1.0,
    variants: [
      { id: '16-1', fuelType: 'Electric', color: 'Green', pricePerDay: 250 },
      { id: '16-2', fuelType: 'Electric', color: 'Blue', pricePerDay: 250 },
    ],
    image: eRickshawImg,
    description: 'Eco-friendly electric auto-rickshaw',
    features: ['Zero Emissions', 'Low Cost Per Ride', '50+ KM Range', 'Silent Operation'],
  },
];

export const VehicleProvider = ({ children }) => {
  const [vehicles] = useState(VEHICLE_DATABASE);
  const [filters, setFilters] = useState({
    type: '', // Car, Bike, Scooter, Bus, Rickshaw
    brand: '',
    fuelType: '',
    color: '',
  });

  // Get all unique vehicle types
  const getVehicleTypes = () => {
    if (!vehicles || !Array.isArray(vehicles)) return [];
    return [...new Set(vehicles.map(v => v.type))];
  };

  // Get all unique brands
  const getBrands = () => {
    if (!vehicles || !Array.isArray(vehicles)) return [];
    return [...new Set(vehicles.map(v => v.brand))].sort();
  };

  // Get all unique fuel types across all vehicles
  const getFuelTypes = () => {
    if (!vehicles || !Array.isArray(vehicles)) return [];
    const fuelTypes = new Set();
    vehicles.forEach(vehicle => {
      vehicle.variants?.forEach(variant => {
        fuelTypes.add(variant.fuelType);
      });
    });
    return [...fuelTypes].sort();
  };

  // Get all unique colors for a specific vehicle type
  const getColorsForType = (vehicleType) => {
    if (!vehicles || !Array.isArray(vehicles)) return [];
    const colors = new Set();
    vehicles
      .filter(v => vehicleType === '' || v.type === vehicleType)
      .forEach(vehicle => {
        vehicle.variants?.forEach(variant => {
          colors.add(variant.color);
        });
      });
    return [...colors].sort();
  };

  // Filter vehicles based on current filters
  const getFilteredVehicles = () => {
    if (!vehicles || !Array.isArray(vehicles)) return [];
    return vehicles.filter(vehicle => {
      if (filters.type && vehicle.type !== filters.type) return false;
      if (filters.brand && vehicle.brand !== filters.brand) return false;

      // If fuel type filter is applied, check if vehicle has variants with that fuel type
      if (filters.fuelType) {
        const hasFuelType = vehicle.variants.some(v => v.fuelType === filters.fuelType);
        if (!hasFuelType) return false;
      }

      // If color filter is applied, check if vehicle has variants with that color
      if (filters.color) {
        const hasColor = vehicle.variants.some(v => v.color === filters.color);
        if (!hasColor) return false;
      }

      return true;
    });
  };

  // Get variants of a specific vehicle based on filters
  const getVariantsForVehicle = (vehicleId) => {
    if (!vehicles || !Array.isArray(vehicles)) return [];
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return [];

    return vehicle.variants.filter(variant => {
      if (filters.fuelType && variant.fuelType !== filters.fuelType) return false;
      if (filters.color && variant.color !== filters.color) return false;
      return true;
    });
  };

  // Get a single vehicle by ID
  const getVehicleById = (id) => {
    if (!vehicles || !Array.isArray(vehicles)) return null;
    return vehicles.find(v => v.id === id);
  };

  // Calculate price based on brand and fuel type
  const calculateVariantPrice = (vehicleId, variantId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    const variant = vehicle?.variants.find(v => v.id === variantId);
    
    if (!variant || !vehicle) return 0;

    let price = vehicle.basePricePerDay * vehicle.brandMultiplier;

    // Electric vehicles can have different pricing
    if (variant.fuelType === 'Electric') {
      price = price * 1.1; // 10% premium for electric
    }

    return Math.round(price);
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        filters,
        setFilters,
        getVehicleTypes,
        getBrands,
        getFuelTypes,
        getColorsForType,
        getFilteredVehicles,
        getVariantsForVehicle,
        getVehicleById,
        calculateVariantPrice,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error('useVehicles must be used within VehicleProvider');
  }
  return context;
};
