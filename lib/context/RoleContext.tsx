import React, { createContext, useContext, useState, useCallback } from 'react';
import { HARDCODED_USER_LOCATION } from '../constants/map';

export type Role = 'user' | 'therapist';

export type LatLng = { latitude: number; longitude: number };

type RoleContextValue = {
  role: Role;
  setRole: (role: Role) => void;
  userLocation: LatLng;
  setUserLocation: (pos: LatLng) => void;
  therapistPosition: LatLng | null;
  setTherapistPosition: (pos: LatLng | null) => void;
};

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>('user');
  const [userLocation, setUserLocation] = useState<LatLng>(HARDCODED_USER_LOCATION);
  const [therapistPosition, setTherapistPosition] = useState<LatLng | null>(null);
  const setRole = useCallback((r: Role) => setRoleState(r), []);
  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        userLocation,
        setUserLocation,
        therapistPosition,
        setTherapistPosition,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
}
