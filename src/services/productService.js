import apiClient from "../utils/api-client";

export function getSugegestionsAPI(search) {
  return apiClient.get(`/products/suggestions?search=${search}`);
}
