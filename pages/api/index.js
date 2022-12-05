import axios from "axios";

const baseURL = "http://localhost:5000";

export const getAllEvents = () => axios.get(`${baseURL}/events/list-all`);

export const updateEvent = (eventId, data) =>
  axios.put(`${baseURL}/events/${eventId}/update-event`, data);

export const insertEvent = (data) =>
  axios.post(`${baseURL}/events/insert-event`, data);

export const deleteEvent = (eventId) =>
  axios.delete(`${baseURL}/events/${eventId}/delete-event`);

export const insertParticipant = (eventId, data) =>
  axios.post(`${baseURL}/participants/${eventId}/insert-participant`, data);

export const updateParticipant = (participantId) =>
  axios.delete(`${baseURL}/participants/${participantId}/insert-participant`);
