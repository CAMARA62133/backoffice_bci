export interface User {
  id?: string | number;
  firstname?: string;
  lastname?: string;
  telephone?: string;
  email?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreateRequest {
  firstname?: string;
  lastname?: string;
  telephone?: string;
  email?: string;
  role?: string;
}

export interface UserUpdateRequest {
  firstname?: string;
  lastname?: string;
  telephone?: string;
  email?: string;
  role?: string;
}
