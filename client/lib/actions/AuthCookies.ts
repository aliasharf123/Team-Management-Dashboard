"use server";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

export async function setCookies(token: string) {
  cookies().set("access_token", token);
  redirect('/dashboard')
}
export async function deleteCookies(token: string) {
  cookies().delete("access_token");
}
export async function getCookies(token: string) {
  return cookies().get("access_token");
}