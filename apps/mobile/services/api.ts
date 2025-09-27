

import { ApiResponse, LoginRequest, LoginResponse, SignupRequest } from '@/types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'An error occurred',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signup(userData: SignupRequest): Promise<ApiResponse<LoginResponse>> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  
  async getUsers(role?: string) {
    const endpoint = role ? `/users?role=${role}` : '/users';
    return this.request(endpoint);
  }

  async getUserById(id: string) {
    return this.request(`/users/${id}`);
  }

  async updateUser(id: string, userData: any) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  
  async getStudents(classId?: string) {
    const endpoint = classId ? `/students?class=${classId}` : '/students';
    return this.request(endpoint);
  }

  async promoteStudent(studentId: string, newClass: string) {
    return this.request(`/students/${studentId}/promote`, {
      method: 'PUT',
      body: JSON.stringify({ newClass }),
    });
  }

  
  async getAssignments(studentId?: string) {
    const endpoint = studentId ? `/assignments?student=${studentId}` : '/assignments';
    return this.request(endpoint);
  }

  async submitAssignment(assignmentId: string, answers: any) {
    return this.request(`/assignments/${assignmentId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  }

  
  async getNotifications(userId: string) {
    return this.request(`/notifications/${userId}`);
  }

  async markNotificationAsRead(notificationId: string) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  
  async getPayments(studentId?: string) {
    const endpoint = studentId ? `/payments?student=${studentId}` : '/payments';
    return this.request(endpoint);
  }

  async processPayment(paymentData: any) {
    return this.request('/payments/process', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  
  async generateReport(reportType: string, filters: any) {
    return this.request('/reports/generate', {
      method: 'POST',
      body: JSON.stringify({ reportType, filters }),
    });
  }
}

export const apiService = new ApiService();
export default apiService;
