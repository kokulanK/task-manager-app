export interface UserProfile {
  id?: number;
  name: string;
  email: string;
  password?: string;  // optional for updates
}