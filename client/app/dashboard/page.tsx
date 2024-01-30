import React from "react";
import { UserDoc } from "../../../server/src/user/types";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const res = await fetch(process.env.NEXT_PUBLIC_Server_Url + "user", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + cookieStore.get("access_token")?.value,
    },
  });
  const userInfo: UserDoc = await res.json();

  return <div className="h-[200000px] bg-slate-100">Select project</div>;
}
