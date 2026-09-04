import "server-only";

import { DEFAULT_MODELS, type VcaasModel } from "@/lib/vcaas-key-rotation";

const TABLE = "vcaas_model_settings";

type ModelRow = VcaasModel & {
  sort_order: number;
  max_retries: number;
  created_at?: string;
  updated_at?: string;
};

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  return url && key ? { url, key } : null;
}

async function request<T>(method: string, body?: unknown): Promise<T | null> {
  const settings = config();
  if (!settings) return null;
  const response = await fetch(`${settings.url}/rest/v1/${TABLE}?order=sort_order.asc,id.asc`, {
    method,
    headers: {
      apikey: settings.key,
      Authorization: `Bearer ${settings.key}`,
      "Content-Type": "application/json",
      Prefer: method === "POST" ? "resolution=merge-duplicates,return=representation" : "return=representation",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!response.ok) return null;
  return (await response.json()) as T;
}

export async function loadModels(): Promise<VcaasModel[]> {
  const rows = await request<ModelRow[]>("GET");
  return rows?.length ? rows.map(({ sort_order: _sort, max_retries: _retries, created_at: _created, updated_at: _updated, ...model }) => model) : [...DEFAULT_MODELS];
}

export async function saveModels(models: VcaasModel[]): Promise<VcaasModel[]> {
  const normalized = models.slice(0, 100).map((model, index) => ({
    id: model.id.trim().slice(0, 120),
    name: model.name.trim().slice(0, 160),
    provider: model.provider.trim().slice(0, 80),
    enabled: model.enabled,
    visible: model.visible,
    sort_order: index,
    max_retries: 3,
  }));
  const saved = await request<ModelRow[]>("POST", normalized);
  return saved?.length ? saved.map(({ sort_order: _sort, max_retries: _retries, created_at: _created, updated_at: _updated, ...model }) => model) : normalized;
}
