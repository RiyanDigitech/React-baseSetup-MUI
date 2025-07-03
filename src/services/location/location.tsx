import axios from "@/lib/config/axios-instance";
import { useQuery } from "@tanstack/react-query";

import { buildUrlWithParams } from "@/lib/helpers";

import { FranchiseResponse } from "@/lib/types/franchise";

const LocationseService = () => {
  const useFetchAllLocation = () => {
    async function fetchLocation(): Promise<FranchiseResponse> {
      const url = buildUrlWithParams("/location", {});
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchLocation,
      queryKey: ["location"],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };

  return {
    useFetchAllLocation,
  };
};
export default LocationseService;
