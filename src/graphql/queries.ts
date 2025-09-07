import { gql } from '@apollo/client';

// User queries
export const ME_QUERY = gql`
  query Me {
    me {
      id
      firebaseId
      name
      email
      phoneNumber
      photoURL
      emailVerified
      phoneVerified
      role
      createdAt
    }
  }
`;

// Vehicle queries
export const VEHICLES_QUERY = gql`
  query GetVehicles($where: VehicleWhereInput) {
    vehicles(where: $where) {
      id
      name
      registrationNumber
      vehicleTypeId
      isActive
      createdAt
      vehicleType {
        id
        name
        description
        capacity
        fuelType
        licenseRequired
        rangeType
        category {
          id
          name
          description
        }
      }
    }
  }
`;

export const CURRENT_ASSIGNED_VEHICLE_QUERY = gql`
  query GetCurrentAssignedVehicle {
    currentAssignment {
      id
      vehicleId
      userId
      assignedAt
      status
      vehicle {
        id
        name
        registrationNumber
        vehicleType {
          id
          name
          description
        }
      }
    }
  }
`;

// Tracking queries
export const CURRENT_TRACKING_SESSION_QUERY = gql`
  query GetCurrentTrackingSession {
    currentTrackingSession {
      id
      vehicleId
      userId
      startedAt
      endedAt
      sessionToken
      status
      startPlace {
        id
        name
        address
        latitude
        longitude
        type
      }
      endPlace {
        id
        name
        address
        latitude
        longitude
        type
      }
      tripType {
        id
        name
        description
      }
      vehicle {
        id
        name
        registrationNumber
      }
    }
  }
`;

// Place queries
export const PLACES_QUERY = gql`
  query GetPlaces($where: PlaceWhereInput) {
    places(where: $where) {
      id
      name
      address
      latitude
      longitude
      type
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const SEARCH_PLACES_QUERY = gql`
  query SearchPlaces($query: String!) {
    searchPlaces(query: $query) {
      id
      name
      address
      latitude
      longitude
      type
      isActive
    }
  }
`;

// Trip type queries
export const TRIP_TYPES_QUERY = gql`
  query GetTripTypes($where: TripTypeWhereInput) {
    tripTypes(where: $where) {
      id
      name
      description
      isActive
      createdAt
      updatedAt
    }
  }
`;

// Vehicle type queries
export const VEHICLE_TYPES_QUERY = gql`
  query GetVehicleTypes($where: VehicleTypeWhereInput) {
    vehicleTypes(where: $where) {
      id
      name
      description
      capacity
      fuelType
      licenseRequired
      rangeType
      isActive
      createdAt
      updatedAt
      category {
        id
        name
        description
      }
    }
  }
`;
