export interface User {
    userId?: string; // Optional because it's auto-generated
    userName: string;
    email: string;
  }
  
  export interface UserCreationResponse {
    userId: string;
    message: string;
  }
  
  export interface ErrorResponse {
    error: string;
  }
  
  