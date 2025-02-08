import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getFirebaseIdToken } from '@utils/firebase';

export const endpoint = `${process.env.REST_API_ROOT}/${process.env.REST_API_VERSION}`;

// @ts-expect-error sdf
export async function prepareHeaders(headers) {
  const token = await getFirebaseIdToken();
  if (token) {
    headers.set('authorization', 'Bearer ' + token);
  }
  return headers;
}

export const restApiBaseQuery = fetchBaseQuery({
  baseUrl: endpoint,
  prepareHeaders,
});

export const googlePlaceApiBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.GOOGLE_PLACE_API_ROOT}`,
});

// @ts-expect-error sdf
export const baseQuery = async (args, api, extraOptions) => {
  let response;

  if (extraOptions && extraOptions.baseQuery) {
    response = await extraOptions.baseQuery(args, api, extraOptions);
  } else {
    response = await restApiBaseQuery(args, api, extraOptions);
  }

  if (response && response.error && response.error.status === 401) {
    // Todo: Trigger logout and redirect to login screen
  }
  return response;
};

export default baseQuery;
