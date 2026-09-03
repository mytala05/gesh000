import { NextResponse } from "next/server";
import { getAdminToken, getKeyHealth, getModels, isAdminRequest, updateModels } from "@/lib/vcaas-key-rotation";

function unauthorized() { return NextResponse.json({ ok: false, error: "Admin authorization required" }, { status: 401 }); }

export function GET(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();
  return NextResponse.json({ ok: true, data: { models: getModels(), keys: getKeyHealth(), adminConfigured: Boolean(getAdminToken()) } });
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
  return NextResponse.json({ ok: true, data: { models: updateModels(models) } });
}
