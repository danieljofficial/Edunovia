export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'admin' | 'teacher' | 'parent' | 'student';
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    profileImage?: string;
    class?: string;
    attendance?: number;
  };
  token: string;
}
