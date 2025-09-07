// GraphQL response types
export interface User {
  id: string;
  firebaseId: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: 'DRIVER' | 'ADMIN' | 'SUPER_ADMIN';
  createdAt: string;
}

// Combined user type that includes both Firebase and backend data
export interface CombinedUser {
  // Firebase user data
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  // Backend user data
  id: string;
  firebaseId: string;
  name: string | null;
  phoneNumber?: string;
  phoneVerified: boolean;
  role: 'DRIVER' | 'ADMIN' | 'SUPER_ADMIN';
  createdAt: string;
}

export interface Vehicle {
  id: string;
  name: string;
  registrationNumber: string;
  vehicleTypeId: string;
  isActive: boolean;
  createdAt: string;
  vehicleType: VehicleType;
}

export interface VehicleType {
  id: string;
  name: string;
  description?: string;
  capacity: number;
  fuelType: 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'CNG' | 'HYBRID';
  licenseRequired: 'LMV' | 'MMV' | 'HMV';
  rangeType: 'SHORT_DISTANCE' | 'MEDIUM_DISTANCE' | 'LONG_DISTANCE';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: VehicleCategory;
}

export interface VehicleCategory {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Place {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: 'OFFICE' | 'WAREHOUSE' | 'DELIVERY' | 'PICKUP' | 'CUSTOMER' | 'OTHER';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TripType {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TrackingSession {
  id: string;
  vehicleId: string;
  userId: string;
  startedAt: string;
  endedAt?: string;
  sessionToken: string;
  status: 'ACTIVE' | 'COMPLETED';
  startPlace?: Place;
  endPlace?: Place;
  tripType?: TripType;
  vehicle: Vehicle;
}

export interface VehicleAssignment {
  id: string;
  vehicleId: string;
  userId: string;
  assignedAt: string;
  status: 'ASSIGNED' | 'UNASSIGNED';
  vehicle?: Vehicle;
}

// GraphQL Query Response Types
export interface MeQueryResponse {
  me: User;
}

export interface VehiclesQueryResponse {
  vehicles: Vehicle[];
}

export interface CurrentTrackingSessionQueryResponse {
  currentTrackingSession?: TrackingSession;
}

export interface PlacesQueryResponse {
  places: Place[];
}

export interface SearchPlacesQueryResponse {
  searchPlaces: Place[];
}

export interface TripTypesQueryResponse {
  tripTypes: TripType[];
}

export interface VehicleTypesQueryResponse {
  vehicleTypes: VehicleType[];
}

export interface CurrentAssignmentQueryResponse {
  currentAssignment?: VehicleAssignment;
}

// GraphQL Mutation Response Types
export interface RegisterUserMutationResponse {
  registerUser: User;
}

export interface AssignVehicleMutationResponse {
  assignVehicle: VehicleAssignment;
}

export interface UnassignVehicleMutationResponse {
  unassignVehicle: VehicleAssignment;
}

export interface StartTrackingMutationResponse {
  startTracking: TrackingSession;
}

export interface StopTrackingMutationResponse {
  stopTracking: TrackingSession;
}

export interface CreatePlaceMutationResponse {
  createPlace: Place;
}

export interface UpdatePlaceMutationResponse {
  updatePlace: Place;
}

export interface CreateTripTypeMutationResponse {
  createTripType: TripType;
}

export interface UpdateTripTypeMutationResponse {
  updateTripType: TripType;
}
