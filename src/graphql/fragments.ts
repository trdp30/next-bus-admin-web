import { gql } from '@apollo/client';

// User fragments
export const USER_FRAGMENT = gql`
  fragment UserFields on User {
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
`;

// Vehicle fragments
export const VEHICLE_FRAGMENT = gql`
  fragment VehicleFields on Vehicle {
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
`;

// Vehicle type fragments
export const VEHICLE_TYPE_FRAGMENT = gql`
  fragment VehicleTypeFields on VehicleType {
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
`;

// Place fragments
export const PLACE_FRAGMENT = gql`
  fragment PlaceFields on Place {
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
`;

// Trip type fragments
export const TRIP_TYPE_FRAGMENT = gql`
  fragment TripTypeFields on TripType {
    id
    name
    description
    isActive
    createdAt
    updatedAt
  }
`;

// Tracking session fragments
export const TRACKING_SESSION_FRAGMENT = gql`
  fragment TrackingSessionFields on TrackingSession {
    id
    vehicleId
    userId
    startedAt
    endedAt
    sessionToken
    status
    startPlace {
      ...PlaceFields
    }
    endPlace {
      ...PlaceFields
    }
    tripType {
      ...TripTypeFields
    }
    vehicle {
      ...VehicleFields
    }
  }
  ${PLACE_FRAGMENT}
  ${TRIP_TYPE_FRAGMENT}
  ${VEHICLE_FRAGMENT}
`;

// Vehicle assignment fragments
export const VEHICLE_ASSIGNMENT_FRAGMENT = gql`
  fragment VehicleAssignmentFields on VehicleAssignment {
    id
    vehicleId
    userId
    assignedAt
    status
  }
`;

export const VEHICLE_ASSIGNMENT_WITH_VEHICLE_FRAGMENT = gql`
  fragment VehicleAssignmentWithVehicleFields on VehicleAssignment {
    id
    vehicleId
    userId
    assignedAt
    status
    vehicle {
      ...VehicleFields
    }
  }
  ${VEHICLE_FRAGMENT}
`;
