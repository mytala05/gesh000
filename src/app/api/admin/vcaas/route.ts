import { NextResponse } from "next/server";
import { getAdminToken, getKeyHealth, getModels, isAdminRequest, updateModels } from "@/lib/vcaas-key-rotation";
import { loadModels, saveModels } from "@/lib/vcaas-model-store";

function unauthorized() { return NextResponse.json({ ok: false, error: "Admin authorization required" }, { status: 401 }); }

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();
  const models = await loadModels();
  updateModels(models);
  return NextResponse.json({ ok: true, data: { models, keys: getKeyHealth(), adminConfigured: Boolean(getAdminToken()) } });
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();
  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.models)) return NextResponse.json({ ok: false, error: "models must be an array" }, { status: 400 });
  const models = body.models.filter((model: unknown) => {
    if (!model || typeof model !== "object") return false;
    const item = model as Record<string, unknown>;
    return typeof item.id === "string" && typeof item.name === "string" && typeof item.provider === "string" && typeof item.enabled === "boolean" && typeof item.visible === "boolean";
  });
  const saved = await saveModels(models);
  updateModels(saved);
  return NextResponse.json({ ok: true, data: { models: saved } });
}
