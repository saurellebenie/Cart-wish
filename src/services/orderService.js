import apiClient from "../utils/api-client";

export function checkoutApi() {
  return apiClient.post("/checkout");
}
