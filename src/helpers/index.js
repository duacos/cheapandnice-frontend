import { useState, useEffect } from "react";
import { config } from "../config";

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

export const useTitle = (title) => {
  useEffect(() => {
    // update document title
    document.title = `${config.docTitle} | ${title}`;

    return () => {
      // clear "| home" from title
      document.title = config.docTitle;
    };
  }, [title]);
};
