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

export interface MenuLayout {
  label: string;
  icon: ZardIcon;
  path: string;
}

export interface MachineAlert {
  nivel: 'verde' | 'amarelo' | 'vermelho';
  mensagem: string | null;
}

export interface MachineKPIs {
  producao: number;
  temperatura: number;
  consumoEnergia: number;
  vibracao: number;
  velocidadeLinha: number;
  pecasBoas: number;
  pecasRuins: number;
  taxaFalha: number;
  pressao: number;
}

export interface MachineGoals {
  producaoHora: number;
  temperaturaMax: number;
  consumoMax: number;
}

export interface MachineHistoryPoint {
  hora: string;
  producao: number;
  temperatura: number;
  consumoEnergia: number;
  alerta: 'verde' | 'amarelo' | 'vermelho';
}

export interface MachineLimit {
  amarelo: number;
  vermelho: number;
}

export interface MachineProductionLimit {
  min: number;
  max: number;
}

export interface MachineSimulationLimits {
  temperatura: MachineLimit;
  consumoEnergia: MachineLimit;
  producao: MachineProductionLimit;
}

export interface MachineSimulation {
  intervaloAtualizacao: number;
  limites: MachineSimulationLimits;
}

export interface Machine {
  id: string;
  nome: string;
  setor: string;
  status: string;
  alerta: MachineAlert;
  kpisAtuais: MachineKPIs;
  metas: MachineGoals;
  pecasDefeituosas: string[];
  historico: MachineHistoryPoint[];
  simulacao: MachineSimulation;
  ultimaAtualizacao: string | null;
}
