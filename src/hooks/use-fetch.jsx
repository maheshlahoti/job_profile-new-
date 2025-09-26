import { useSession } from "@clerk/clerk-react";
import { useState,useEffect } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { session } = useSession();

  useEffect(() => {
    if (session) {
      fn(); 
    }
  }, [session]);

  const fn = async (...args) => {
    if (!session) {
      console.log("⏳ Waiting for session...");
      return; 
    }

    setLoading(true);
    setError(null);

    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });
      const response = await cb(supabaseAccessToken, options, ...args);
      setData(response);
      setError(null);
    } catch (error) {
     
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, fn };
};

export default useFetch;
