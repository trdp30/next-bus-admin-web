import { gql } from '@apollo/client';

// Authentication mutations
export const REGISTER_USER = gql`
  mutation RegisterUser($role: UserRole) {
    registerUser(role: $role) {
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

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser {
    deleteUser
  }
`;

// Vehicle mutations
export const ASSIGN_VEHICLE = gql`
  mutation AssignVehicle($vehicleId: String!, $password: String!) {
    assignVehicle(vehicleId: $vehicleId, password: $password) {
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

export const UNASSIGN_VEHICLE = gql`
  mutation UnassignVehicle($vehicleId: String!) {
    unassignVehicle(vehicleId: $vehicleId) {
      id
      vehicleId
      userId
      assignedAt
      status
    }
  }
`;

// Tracking mutations
export const START_TRACKING_MUTATION = gql`
  mutation StartTracking($input: StartTrackingInput!) {
    startTracking(input: $input) {
      id
      vehicleId
      userId
      startedAt
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
    }
  }
`;

export const STOP_TRACKING_MUTATION = gql`
  mutation StopTracking($vehicleId: String!) {
    stopTracking(vehicleId: $vehicleId) {
      id
      vehicleId
      userId
      startedAt
      endedAt
      sessionToken
      status
    }
  }
`;

// Place mutations
export const CREATE_PLACE = gql`
  mutation CreatePlace($name: String!, $address: String!, $type: PlaceType!) {
    createPlace(name: $name, address: $address, type: $type) {
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

export const UPDATE_PLACE = gql`
  mutation UpdatePlace($id: String!, $name: String, $address: String, $type: PlaceType) {
    updatePlace(id: $id, name: $name, address: $address, type: $type) {
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

// Trip type mutations
export const CREATE_TRIP_TYPE = gql`
  mutation CreateTripType($name: String!, $description: String!) {
    createTripType(name: $name, description: $description) {
      id
      name
      description
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TRIP_TYPE = gql`
  mutation UpdateTripType($id: String!, $name: String, $description: String) {
    updateTripType(id: $id, name: $name, description: $description) {
      id
      name
      description
      isActive
      createdAt
      updatedAt
    }
  }
`;
