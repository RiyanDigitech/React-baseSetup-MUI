import { Input, Select, Spin } from "antd";
import { Option } from "antd/es/mentions";
import { PiClockClockwiseBold } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";

import "../../index.css";
import ComplaintService from "@/services/complaint/complaint";
import { useParams } from "react-router-dom";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { errorType } from "@/lib/types";
import TextArea from "antd/es/input/TextArea";
import { ComplaintReply } from "@/lib/types/complaint";
import { useEffect } from "react";

const ComplainDetails = () => {
  const { useFetchTargetedComplaint, useHandleComplaintReply } =
    ComplaintService();
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<ComplaintReply>();
  const { id } = useParams();
  const numericId = id ? parseInt(id) : undefined;

  const { data: TargetedComplaintData, isLoading: isComplaintLoading } =
    useFetchTargetedComplaint(numericId);
  const { mutate, isPending } = useHandleComplaintReply(reset);

  const onSubmit: SubmitHandler<ComplaintReply> = (data) => {
    const payload = {
      complaintId: `${numericId}`, // Always include the numericId
      adminReply: data?.adminReply, // Only the admin response
      complaintStatus: data?.complaintStatus, // Only the status
    };

    mutate(payload); // Send only the filtered payload
  };

  const onError: SubmitErrorHandler<errorType> = (errors) => {
    console.warn("submiterrorhandler errors", errors);
  };
  console.log(TargetedComplaintData, isComplaintLoading, errors);

  useEffect(() => {
    if (TargetedComplaintData) {
      reset({
        applicantName: TargetedComplaintData.data?.username || "Username",
        complaintDate: TargetedComplaintData.data?.complaintDate
          ? TargetedComplaintData.data?.complaintDate.slice(0, 10)
          : "",
        description: TargetedComplaintData.data?.description || "",
        complaintStatus: TargetedComplaintData.data?.status || "",
        adminReply: TargetedComplaintData.data?.adminReply || "",
      });
    }
  }, [TargetedComplaintData, reset]);
  const handleDiscard = () => {
    reset();
  };
  return (
    <div className="p-5">
      {isComplaintLoading ? (
        <Spin
          className="custom-table-spinner flex justify-center"
          size="large"
        />
      ) : (
        <>
          {" "}
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="items-center max-w-3xl mx-auto md:p-6 mt-25 md:mt-12"
          >
            <div className="w-full flex justify-between flex-col md:flex-row mb-4 ">
              <div className="md:w-6/12 flex justify-between items-center ">
                <div className="w-11/12  flex items-center justify-between  flex-col lg:flex-row">
                  <label
                    htmlFor=""
                    className="w-[100%] lg:w-[10%] text-[#0F172A] font-medium text-sm"
                  >
                    ApplicantName
                  </label>
                  <Controller
                    name="applicantName"
                    control={control}
                    render={({ field }) => (
                      <div className="flex flex-col w-full lg:w-[58%]">
                        <Input
                          {...field}
                          readOnly
                          type="text"
                          className="w-full rounded-t-none border-x-0 border-t-0 border-b-[1px] border-[#cbd5e1] rounded-none h-[42px] bg-[#f8fafc]"
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="md:w-5/12 max-md:mt-4  flex items-center justify-between  flex-col lg:flex-row">
                <label
                  htmlFor=""
                  className="w-[100%] lg:w-[10%] text-[#0F172A] font-medium text-sm"
                >
                  Date
                </label>
                <Controller
                  name="complaintDate"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col w-full lg:w-[69%]">
                      <Input
                        {...field}
                        readOnly
                        type="text"
                        className="w-full rounded-t-none border-x-0 border-t-0 border-b-[1px] border-[#cbd5e1] rounded-none h-[42px] bg-[#f8fafc]"
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="w-full  flex items-center justify-between  flex-col lg:flex-row">
              <label
                htmlFor="description"
                className="w-[100%] lg:w-[10%] text-[#0F172A] font-medium text-sm"
              >
                Description
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-full lg:w-[81%] bg-green-400">
                    <TextArea
                      {...field}
                      readOnly
                      className=" rounded-t-none max-md:border-none border-x-0 border-t-0 md:border-b-[1px] border-[#cbd5e1] rounded-none h-[42px] bg-[#f8fafc]"
                    />
                  </div>
                )}
              />
            </div>
            <div className="grid md:grid-cols-[120px_1fr] items-center gap-4 mb-4 mt-5">
              <label className="text-sm font-medium text-[#0F172A]">
                Status
              </label>
              <Controller
                name="complaintStatus"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="custom-select md:mt-1 w-full h-10 max-sm:-mt-1"
                    suffixIcon={
                      <IoMdArrowDropdown style={{ fontSize: "18px" }} />
                    }
                  >
                    <Option value="Pending">Pending</Option>
                    <Option value="Resolved">Resolved</Option>
                  </Select>
                )}
              />
            </div>
            <div className="grid md:grid-cols-[120px_1fr] items-center gap-4 mb-5">
              <label className="text-sm font-medium text-[#0F172A] text-[14px] ">
                Reply
              </label>
              <Controller
                name="adminReply"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    placeholder="Write your reply here."
                    className="max-sm:-mt-1 md:mt-1  rounded-none  w-full h-20 border-x-0 border-t-0 border-[#CBD5E1] p-2 border-b-[1px]"
                  />
                )}
              />
            </div>
            <div className="flex justify-start space-x-4 font-medium ">
              <button
                type="button"
                onClick={handleDiscard}
                className="px-4 h-[40px] bg-[#F1F5F9] text-[#0F172A] rounded-md text-[14px]"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={!isDirty}
                className="px-4 h-[40px] text-white rounded-md bg-[#1E293B] flex items-center text-[14px] "
              >
                <PiClockClockwiseBold className="text-xl mr-2 text-[#CBD5E1]" />
                {isPending ? <Spin /> : "Update"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ComplainDetails;
