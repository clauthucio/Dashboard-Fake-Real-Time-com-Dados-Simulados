export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  name: string;
  cargo: 'admin' | 'supervisor' | 'operador';
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'supervisor' | 'operador';
  sectorId?: number;
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
