"use server";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

export async function setCookies(token: string) {
  cookies().set("access_token", token);
  redirect('/dashboard')
}
export async function deleteCookies() {
  cookies().delete("access_token");
  redirect('/')
}
export async function getCookies() {
  return cookies().get("access_token")?.value;
}