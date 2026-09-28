import { getAuthHeaders, getToken } from './auth';

const BASE_URL = 'https://rvrjc-colorido-demo-backend-1.onrender.com/api';

async function handleResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    let message = errorText;
    try {
      const json = JSON.parse(errorText);
      message = json.message || json.error || errorText;
    } catch {
      // not JSON
    }
    throw new Error(message || `Request failed with status ${response.status}`);
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

// 1. Auth API
export async function loginAdmin(username, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return handleResponse(res);
}

// 2. Fest Info
export async function fetchFestInfo() {
  const res = await fetch(`${BASE_URL}/fest`);
  return handleResponse(res);
}

export async function updateFestInfo(data) {
  const res = await fetch(`${BASE_URL}/fest`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

// 3. Categories
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  return handleResponse(res);
}

export async function createCategory(data) {
  const res = await fetch(`${BASE_URL}/categories`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function updateCategory(id, data) {
  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function deleteCategory(id) {
  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return handleResponse(res);
}

// 4. Events
export async function fetchEvents(params = {}) {
  const query = new URLSearchParams();
  if (params.categoryId) query.append('categoryId', params.categoryId);
  if (params.featured) query.append('featured', params.featured);
  const qs = query.toString() ? `?${query.toString()}` : '';

  const res = await fetch(`${BASE_URL}/events${qs}`);
  return handleResponse(res);
}

export async function fetchEvent(id) {
  const res = await fetch(`${BASE_URL}/events/${id}`);
  return handleResponse(res);
}

export async function createEvent(data) {
  const res = await fetch(`${BASE_URL}/events`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function updateEvent(id, data) {
  const res = await fetch(`${BASE_URL}/events/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function deleteEvent(id) {
  const res = await fetch(`${BASE_URL}/events/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return handleResponse(res);
}

// 5. Venues
export async function fetchVenues() {
  const res = await fetch(`${BASE_URL}/venues`);
  return handleResponse(res);
}

export async function createVenue(data) {
  const res = await fetch(`${BASE_URL}/venues`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function updateVenue(id, data) {
  const res = await fetch(`${BASE_URL}/venues/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function deleteVenue(id) {
  const res = await fetch(`${BASE_URL}/venues/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return handleResponse(res);
}

// 6. Schedule
export async function fetchSchedule(day = null) {
  const url = day ? `${BASE_URL}/schedule?day=${day}` : `${BASE_URL}/schedule`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function createScheduleItem(data) {
  const res = await fetch(`${BASE_URL}/schedule`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function updateScheduleItem(id, data) {
  const res = await fetch(`${BASE_URL}/schedule/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function deleteScheduleItem(id) {
  const res = await fetch(`${BASE_URL}/schedule/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return handleResponse(res);
}

// 7. Map Locations
export async function fetchMapLocations(all = false) {
  const url = all ? `${BASE_URL}/map?all=true` : `${BASE_URL}/map`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function createMapLocation(data) {
  const res = await fetch(`${BASE_URL}/map`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function updateMapLocation(id, data) {
  const res = await fetch(`${BASE_URL}/map/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function deleteMapLocation(id) {
  const res = await fetch(`${BASE_URL}/map/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return handleResponse(res);
}

// 8. Gallery
export async function fetchGallery(params = {}) {
  const query = new URLSearchParams();
  if (params.category) query.append('category', params.category);
  if (params.featured) query.append('featured', params.featured);
  const qs = query.toString() ? `?${query.toString()}` : '';

  const res = await fetch(`${BASE_URL}/gallery${qs}`);
  return handleResponse(res);
}

export async function addGalleryImage(data) {
  const res = await fetch(`${BASE_URL}/gallery`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function updateGalleryImage(id, data) {
  const res = await fetch(`${BASE_URL}/gallery/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function deleteGalleryImage(id) {
  const res = await fetch(`${BASE_URL}/gallery/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return handleResponse(res);
}

// 9. Contact Info
export async function fetchContacts(type = null) {
  const url = type ? `${BASE_URL}/contact?type=${type}` : `${BASE_URL}/contact`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function createContact(data) {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function updateContact(id, data) {
  const res = await fetch(`${BASE_URL}/contact/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function deleteContact(id) {
  const res = await fetch(`${BASE_URL}/contact/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return handleResponse(res);
}

// 10. Dashboard Stats
export async function fetchDashboardStats() {
  const res = await fetch(`${BASE_URL}/dashboard/stats`);
  return handleResponse(res);
}

// 11. AI Chat
export async function sendAiMessage(message) {
  const res = await fetch(`${BASE_URL}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  return handleResponse(res);
}

// 12. Image Upload
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const token = getToken();
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    headers,
    body: formData
  });
  return handleResponse(res);
}
