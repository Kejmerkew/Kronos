import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://kronos-fb949.firebaseio.com/",
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
  const response = get(url, params, axiosConfig);

  if (response.ok) {
    return response;
  }

  return data ? { ok: true, data } : response;
};

export default apiClient;
