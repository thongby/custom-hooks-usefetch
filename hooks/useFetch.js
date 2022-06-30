import { useState } from "react";

const useFetch = (url, method) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const startFetch = () => {
    setErrorMessage("");
    setIsLoading(true);
  };

  const endFetch = () => {
    setIsLoading(false);
  };

  const sendFetch = async (body = {}) => {
    startFetch();

    let response;
    try {
      if (method === "GET") {
        response = await fetch(url);
      } else {
        response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });
      }
      const data = await response.json();
      setData(data);
      return Promise.resolve();
    } catch (error) {
      const errMessage = error.message || "unknown error";
      setErrorMessage(errMessage);
      return Promise.reject(errMessage);
    } finally {
      endFetch();
    }
  };

  return {
    sendFetch,
    data,
    isLoading,
    errorMessage
  };
};

export default useFetch;
