import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery } from "@tanstack/react-query";

import { buildUrlWithParams } from "@/lib/helpers";

import { PaymentDetailsApiResponse, WorkDetails } from "@/lib/types/payment";
import { FranchiseCreateResponse } from "@/lib/types/franchise";
import { notification } from "antd";
import { errorType } from "@/lib/types";
// import { useNavigate } from "react-router-dom";
const PaymentService = () => {
  //   const navigate = useNavigate();

  const useFetchTargetedPaymentDetails = (id?: number) => {
    async function fetchTeam(): Promise<PaymentDetailsApiResponse> {
      const url = buildUrlWithParams(`/payment-details/${id}`, {});
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchTeam,
      queryKey: ["payment", id],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleCreateApplicationHistory = (
    reset: () => void,
    refetch: () => void
  ) => {
    function handleCreateQuotationRequest(
      data: WorkDetails
    ): Promise<FranchiseCreateResponse> {
      console.log(data);
      return axios.post(`/application-history`, data);
    }
    const onSuccess = (response: FranchiseCreateResponse) => {
      console.log("success", response);
      notification.success({
        message: "Application History added",
        description: "You have successfully added the Application-History",
        placement: "topRight",
      });
      reset();
      refetch();
    };
    const onError = (error: errorType) => {
      console.warn("error is", error);
      notification.error({
        message: "Failed to Add Application-History",
        description: error?.response?.data?.message,
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleCreateQuotationRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  return {
    useFetchTargetedPaymentDetails,
    useHandleCreateApplicationHistory,
  };
};
export default PaymentService;
