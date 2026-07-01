import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/components/lib/supabaseAdmin";

// This route touches the database on every call, so it must run per-request.
export const dynamic = "force-dynamic";

// ── POST /api/requests ───────────────────────────────────
// Public: the contact / hire forms submit here. Runs with the service role
// key on the server, so the insert succeeds regardless of RLS while the
// secret never reaches the browser.
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const full_name = String(body.full_name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const requirements = String(body.requirements ?? "").trim();

  // Minimal server-side validation
  if (!full_name || !email || !requirements) {
    return NextResponse.json(
      { error: "full_name, email and requirements are required" },
      { status: 400 }
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const payload = {
    full_name,
    email,
    requirements,
    project_type: body.project_type ? String(body.project_type) : null,
    priority_level: body.priority_level
      ? String(body.priority_level)
      : "NORMAL_DEPLOYMENT",
    budget: Number(body.budget) || 0,
  };

  const { data, error } = await supabaseAdmin
    .from("client_requests")
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error("[/api/requests] insert error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}

// ── GET /api/requests ────────────────────────────────────
// Admin only: requires the admin password in the `x-admin-key` header.
export async function GET(request: NextRequest) {
  const adminKey = request.headers.get("x-admin-key");
  if (!process.env.ADMIN_PASSWORD || adminKey !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("client_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[/api/requests] fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: data ?? [] });
}
