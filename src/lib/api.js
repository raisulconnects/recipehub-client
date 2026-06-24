export async function api(url, options = {}) {
  const res = await fetch(url, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
    ...(options.body && { body: JSON.stringify(options.body) }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || res.statusText);
  return data;
}
