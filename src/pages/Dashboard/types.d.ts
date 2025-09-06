export interface DashboardPageProps {
  // Add any props that the Dashboard page might receive
}

export interface DashboardCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: string;
  onClick: () => void;
}

export interface UserProfile {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface DashboardStats {
  totalVehicles?: number;
  activeJourneys?: number;
  totalDistance?: number;
  alerts?: number;
}
