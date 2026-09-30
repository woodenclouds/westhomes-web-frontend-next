import { NextResponse } from "next/server";
import { cms } from "@/lib/cms/client";
import type { EnquiryPayload, EnquiryType } from "@/lib/cms/types";

const allowedTypes: EnquiryType[] = ["product", "booking", "general"];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<EnquiryPayload>;

    if (!body.name?.trim() || !body.phone?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Name, phone and message are required." },
        { status: 400 },
      );
    }

    if (!body.type || !allowedTypes.includes(body.type)) {
      return NextResponse.json(
        { error: "Invalid enquiry type." },
        { status: 400 },
      );
    }

    const result = await cms.submitEnquiry({
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email?.trim(),
      type: body.type,
      productId: body.productId,
      productName: body.productName,
      preferredDate: body.preferredDate,
      message: body.message.trim(),
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Unable to submit enquiry right now." },
      { status: 500 },
    );
  }
}
