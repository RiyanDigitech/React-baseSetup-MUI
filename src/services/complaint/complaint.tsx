import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery } from "@tanstack/react-query";

import { buildUrlWithParams } from "@/lib/helpers";

// import { useNavigate } from "react-router-dom";
import {
  ComplaintReply,
  ComplaintsResponse,
  TargetedComplaintResponse,
} from "@/lib/types/complaint";
import { notification } from "antd";
import { errorType } from "@/lib/types";
import { useNavigate } from "react-router-dom";
const ComplaintService = () => {
  const navigate = useNavigate();
  const useFetchAllComplaint = (
    limit?: number,
    page?: number,
    query?: string,
    email?: number
  ) => {
    async function fetchTeam(): Promise<ComplaintsResponse> {
      const url = buildUrlWithParams("/complaint", {
        limit,
        page,
        query,
        email,
      });
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchTeam,
      queryKey: ["complaint", limit, page, query, email],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useFetchTargetedComplaint = (id?: number) => {
    async function fetchTeam(): Promise<TargetedComplaintResponse> {
      const url = buildUrlWithParams(`/complaint/${id}`, {});
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchTeam,
      queryKey: ["complaint", id],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleComplaintReply = (reset: () => void) => {
    function handleCreateFranchiseRequest(
      data: ComplaintReply
    ): Promise<ApiResponseComplaintReply> {
      console.log(data);
      return axios.post(`/complaint/reply`, data);
    }
    const onSuccess = (response: ApiResponseComplaintReply) => {
      console.log("success", response);
      notification.success({
        message: "Complaint Status Changed",
        description: "You have successfully Changed the Complaint Status",
        placement: "topRight",
      });
      reset();
      navigate("/complaint");
    };
    const onError = (error: errorType) => {
      console.warn("error is", error);
      notification.error({
        message: "Failed to Add Franchise",
        description: error?.response?.data?.message,
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleCreateFranchiseRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  return {
    useFetchAllComplaint,
    useFetchTargetedComplaint,
    useHandleComplaintReply,
  };
};
export default ComplaintService;
