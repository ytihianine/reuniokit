import { gristClient } from "@/src/lib/grist/grist-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing attachment id parameter" },
        { status: 400 },
      );
    }

    const attachmentId = parseInt(id);
    if (isNaN(attachmentId)) {
      return NextResponse.json(
        { error: "Invalid attachment id" },
        { status: 400 },
      );
    }

    // Télécharger le fichier depuis Grist via le client
    const response = await gristClient.downloadAttachment(attachmentId);

    // Récupérer le blob du fichier
    const blob = await response.blob();

    // Récupérer les headers importants
    const contentType =
      response.headers.get("content-type") || "application/octet-stream";
    const contentDisposition = response.headers.get("content-disposition");

    // Créer la réponse avec le fichier
    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        ...(contentDisposition && {
          "Content-Disposition": contentDisposition,
        }),
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
