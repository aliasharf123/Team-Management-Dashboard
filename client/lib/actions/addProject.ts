"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addProject = async () => {
  const access_token = cookies().get("access_token")?.value;
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_Server_Url + "project/createProject",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
        body: JSON.stringify({ title: "untitled" , overView : 'put your overView here'}),
      }
    );
    // Do something with the successful response, e.g., parse JSON or update state
    if(!res.ok) throw new Error((await res.json()).message)

  } catch (error: any) {
    throw new Error(error.message);
  }
  revalidateTag("user");
};
