import { ZardIcon } from '@shared/components/ui/icon/icons';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number | string;
  username: string;
  name: string;
  cargo: 'admin' | 'supervisor' | 'operador';
}

export interface User {
  id: number | string; // Spec says string/uuid, but keeping number if existing code relies on it heavily, though spec says "pattern: ^([0-9a-fA-F]{8}..." which is UUID. Let's switch to string or any. Let's use string to be safe.
  username: string;
  name: string;
  cargo: 'admin' | 'supervisor' | 'operador';
  password?: string; // Optional for listing, required for creation
}

export interface Sector {
  id: number;
  name: string;
}

export interface SimulationConfig {
  intervalMs: number;
  kpiLimit: number;
  historyWindowSize: number;
}

export interface MenuLayout {
  label: string;
  icon: ZardIcon;
  path: string;
}
