import { NextResponse } from "next/server";

// GET /api/nasa/gallery?q=mars&page=1
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "solar system";
  const page = searchParams.get("page") || "1";

  try {
    const res = await fetch(
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(q)}&media_type=image&page=${page}&page_size=12`
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Erro na NASA Image Library" }, { status: res.status });
    }

    const data = await res.json();
    const items = (data.collection?.items || []).map((item) => ({
      id: item.data?.[0]?.nasa_id,
      title: item.data?.[0]?.title,
      description: item.data?.[0]?.description,
      date: item.data?.[0]?.date_created,
      photographer: item.data?.[0]?.photographer,
      thumb: item.links?.[0]?.href,
    }));

    return NextResponse.json({
      items,
      total: data.collection?.metadata?.total_hits || 0,
      page: Number(page),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
