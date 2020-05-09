import { useState, useEffect } from "react";

export const useLoading = () => {
  const [loading, setLoading] = useState(false);

  // when the component is called loding is set to true
  useEffect(() => {
    setLoading(true);
  }, [setLoading]);

  // we make the loading state and setLoding available for the rest of the component
  return {
    isLoading: loading,
    setLoading,
  };
};
