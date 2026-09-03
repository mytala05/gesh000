import "server-only";

const MAX_KEYS = 100;
const RETRYABLE = new Set([401, 408, 409, 425, 429, 500, 502, 503, 504]);

type KeyState = { key: string; failures: number; disabledUntil: number };

function loadKeys(): KeyState[] {
  const keys = [process.env.TOTALUM_VCAAS_API_KEY, process.env.VCAAS_API_KEY];
  for (let i = 1; i <= MAX_KEYS; i += 1) keys.push(process.env[`TOTALUM_VCAAS_API_KEY_${String(i).padStart(2, "0")}`]);
  return [...new Set(keys.map((key) => key?.trim()).filter((key): key is string => Boolean(key)))].map((key) => ({ key, failures: 0, disabledUntil: 0 }));
}

let states = loadKeys();
let cursor = 0;

export function getConfiguredKeyCount() { states = states.length ? states : loadKeys(); return states.length; }

export async function vcaasRequestWithRotation(path: string, options: RequestInit = {}): Promise<Response> {
  states = loadKeys();
  if (!states.length) return fetch(path, options);
  let last: Response | undefined;
  for (let attempt = 0; attempt < states.length; attempt += 1) {
    const now = Date.now();
    const index = (cursor + attempt) % states.length;
    const state = states[index];
    if (state.disabledUntil > now) continue;
    const headers = new Headers(options.headers);
    headers.set("api-key", state.key);
    if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    last = await fetch(path, { ...options, headers });
    if (!RETRYABLE.has(last.status)) { cursor = (index + 1) % states.length; state.failures = 0; return last; }
    state.failures += 1;
    state.disabledUntil = now + Math.min(60_000, 500 * 2 ** Math.min(state.failures, 7));
  }
  return last ?? fetch(path, options);
}

export async function vcaasUploadWithRotation(path: string, formData: FormData): Promise<Response> {
  states = loadKeys();
  if (!states.length) return fetch(path, { method: "POST", body: formData });
  for (let attempt = 0; attempt < states.length; attempt += 1) {
    const state = states[(cursor + attempt) % states.length];
    const response = await fetch(path, { method: "POST", headers: { "api-key": state.key }, body: formData });
    if (!RETRYABLE.has(response.status)) return response;
    state.failures += 1;
    state.disabledUntil = Date.now() + Math.min(60_000, 500 * 2 ** Math.min(state.failures, 7));
  }
  return fetch(path, { method: "POST", body: formData });
}

export function getKeyHealth() {
  states = loadKeys();
  return states.map((state, index) => ({ index: index + 1, configured: true, failures: state.failures, available: state.disabledUntil <= Date.now() }));
}

export const DEFAULT_MODELS = [
  { id: "totalum-default", name: "Totalum Default", provider: "Totalum", enabled: true, visible: false },
  { id: "totalum-fast", name: "Totalum Fast", provider: "Totalum", enabled: true, visible: false },
  { id: "totalum-pro", name: "Totalum Pro", provider: "Totalum", enabled: true, visible: false },
];

type Model = (typeof DEFAULT_MODELS)[number];
let models: Model[] = [...DEFAULT_MODELS];
export function getModels() { return models; }
export function updateModels(next: Model[]) { models = next.slice(0, 100); return models; }
export function getAdminToken() { return process.env.VCAAS_ADMIN_TOKEN || process.env.TOTALUM_VCAAS_ADMIN_TOKEN || ""; }
export function isAdminRequest(request: Request) { const expected = getAdminToken(); return Boolean(expected && request.headers.get("authorization") === `Bearer ${expected}`); }
