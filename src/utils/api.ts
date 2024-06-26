const BASE_URL = "https://eventease-adw2.onrender.com";

export const API_ENDPOINTS = {
  REGISTER: `${BASE_URL}/api/v1/auth/register`,
  LOGIN: `${BASE_URL}/api/v1/auth/login`,
  CREATE_EVENT: `${BASE_URL}/api/v1/auth/event/createEvent`,
  UPDATE_EVENTPICTURE: `${BASE_URL}/api/v1/auth/event/updateEventPicture/`,
  UPDATE_EVENT: `${BASE_URL}/api/v1/auth/event/updateEvent/`,
  UPDATE_PROFILE_PICTURE: `${BASE_URL}/api/v1/auth/user/updateProfilePicture/`,
  GET_ALL_EVENTS: `${BASE_URL}/api/v1/auth/event/getAllEvents`,
  GET_EVENT_PICTURE: `${BASE_URL}/api/v1/auth/event/getEventPicture/`,
  GET_PROFILE_PICTURE: `${BASE_URL}/api/v1/auth/user/getProfilePicture/`,
  GET_PROFILE_PICTURE_SVG: `${BASE_URL}/api/v1/auth/user/getProfilePicture/svg/`,
  GET_EVENT_BY_ID: `${BASE_URL}/api/v1/auth/event/getEventById/`,
  GET_USER_BY_ID: `${BASE_URL}/api/v1/auth/user/`,
  UPDATE_USER: `${BASE_URL}/api/v1/auth/updateUser/`,
  JOIN_EVENT: `${BASE_URL}/api/v1/auth/userevent/joinEvent/`,
  GET_EVENTS_JOINED_BY_USER: `${BASE_URL}/api/v1/auth/userevent/getAllEventsJoinedByUser/`,
  DELETE_EVENT: `${BASE_URL}/api/v1/auth/event/deleteEventById/`,
};
