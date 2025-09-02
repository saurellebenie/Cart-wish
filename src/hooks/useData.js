import apiClient from "../utils/api-client";
import { useQuery } from "@tanstack/react-query";

const useData = (
  endPoint,
  customConfig = {},
  queryKey,
  staleTime = 300_000
) => {
  const fetchFunction = () =>
    apiClient.get(endPoint, customConfig).then((res) => res.data);

  return useQuery({
    queryKey,
    queryFn: fetchFunction,
    staleTime,
  });
};

export default useData;
