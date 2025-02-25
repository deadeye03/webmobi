
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY,
  privateKey: process.env.IMAGEKIT_SECRET_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

export async function GET(request) {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}