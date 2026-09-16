// Best-effort per-process protection. Add an edge/distributed limit before a
// public launch: serverless instances do not share this memory.
export function createRateLimiter(
  limit = 10,
  windowMs = 60_000,
  capacity = 2000,
) {
  const entries = new Map<string, { count: number; resetAt: number }>();
  return (key: string, now = Date.now()) => {
    for (const [id, entry] of entries)
      if (entry.resetAt <= now) entries.delete(id);
    const entry = entries.get(key);
    if (entry) {
      if (entry.count >= limit) return false;
      entry.count += 1;
      return true;
    }
    if (entries.size >= capacity) return false;
    entries.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  };
}
