import { db } from "@/lib/db";
import { planets } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const [planet] = await db
      .select()
      .from(planets)
      .where(eq(planets.id, Number(params.id)));

    if (!planet) {
      return NextResponse.json({ error: "Planeta não encontrado" }, { status: 404 });
    }
    return NextResponse.json(planet);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await db.delete(planets).where(eq(planets.id, Number(params.id)));
    return NextResponse.json({ message: "Planeta removido com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
