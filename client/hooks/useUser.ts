import { getCookies } from "@/lib/actions/AuthCookies";
import { useEffect, useState } from "react";
import { UserDoc } from "../../server/src/user/types";

function useUser<T>(url: string) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState();
  const [accessToken, setAccessToken] = useState<any>();
  const fetchData = async () => {
    const accessToken = await getCookies();
    setAccessToken(accessToken);
    try {
      setLoading(true);
      const response = await fetch(process.env.NEXT_PUBLIC_Server_Url + url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const data = await response.json();
      setData(data);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return { data, loading, error, accessToken };
}

export default useUser;
