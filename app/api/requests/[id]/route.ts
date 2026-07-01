import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/components/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

// ── DELETE /api/requests/[id] ────────────────────────────
// Admin only: requires the admin password in the `x-admin-key` header.
export async function DELETE(
  request: NextRequest,
  ctx: RouteContext<"/api/requests/[id]">
) {
  const adminKey = request.headers.get("x-admin-key");
  if (!process.env.ADMIN_PASSWORD || adminKey !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;

  const { error } = await supabaseAdmin
    .from("client_requests")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("[/api/requests/:id] delete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
