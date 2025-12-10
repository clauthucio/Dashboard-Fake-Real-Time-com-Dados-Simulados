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
