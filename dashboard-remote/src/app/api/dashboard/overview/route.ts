import { NextResponse } from "next/server";
import { dashboardOverviewFixture } from "@/mocks/fixtures/dashboard";

export function GET() {
  return NextResponse.json(dashboardOverviewFixture);
}
