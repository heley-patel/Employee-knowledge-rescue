export async function api(url, options = {}, token) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  const rawBody = response.status === 204 ? '' : await response.text();
  let data = null;
  if (rawBody) {
    try { data = JSON.parse(rawBody); }
    catch { throw new Error('The server returned an invalid response. Ensure the API is running.'); }
  }
  if (!response.ok) throw new Error(data?.message || 'Request failed');
  return data;
}
