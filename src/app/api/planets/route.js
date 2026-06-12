import { db } from "@/lib/db";
import { getPlanets } from "@/lib/planets";
import { planets } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await getPlanets();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const [newPlanet] = await db.insert(planets).values(body).returning();
    return NextResponse.json(newPlanet, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
