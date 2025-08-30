import React, { useEffect, useState } from "react";
import apiClient from "../utils/api-client";
import { set } from "zod/v4-mini";
import { en } from "zod/v4/locales";

const useData = (endPoint, customConfig, deps) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    () => {
      setIsLoading(true);
      apiClient
        .get(endPoint, customConfig)
        .then((res) => {
          if (
            endPoint === "/products" &&
            data &&
            data.products &&
            customConfig.params.page > 1
          ) {
            setData((prev) => ({
              ...prev,
              products: [...prev.products, ...res.data.products],
            }));
            setIsLoading(false);
          } else {
            setData(res.data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    },
    deps ? deps : []
  );

  return { data, error, isLoading };
};

export default useData;
