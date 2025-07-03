import { Input, Select, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import { IoMdArrowDropdown } from "react-icons/io";
import PaymentService from "@/services/payment-details/payment-details";
import { useParams } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { franchiseInputs } from "@/lib/types/franchise";
import { useEffect, useState } from "react";
export const PaymentDetails = () => {
  const { useFetchTargetedPaymentDetails, useHandleCreateApplicationHistory } =
    PaymentService();
  const { id } = useParams();
  const {
    control,
    // formState: { isDirty },
    handleSubmit,
    reset,
  } = useForm<franchiseInputs>();
  const numericId = id ? parseInt(id) : undefined;
  const {
    data: TargetedPaymentData,
    isLoading: isTargetedPaymentLoading,
    refetch,
  } = useFetchTargetedPaymentDetails(numericId);
  console.log(
    TargetedPaymentData?.data?.paymentDetail,
    "isTargetedPaymentLoading"
  );
  const { mutate, isPending } = useHandleCreateApplicationHistory(
    reset,
    refetch
  );
  const onSubmit: SubmitHandler<franchiseInputs> = ({ date, ...restData }) => {
    console.log(restData, date, "date payload");
    mutate(restData);
  };
  const [optionsFee, setOptionsFee] = useState(["Completed", "Fee Paid"]);
  const [customValue, setCustomValue] = useState("");
  const addCustomValue = () => {
    if (customValue && !optionsFee.includes(customValue)) {
      setOptionsFee([...optionsFee, customValue]);
      setCustomValue("");
    }
  };
  const extractTextFromHTML = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };
  console.log(TargetedPaymentData?.data, "targeteddata");
  useEffect(() => {
    if (TargetedPaymentData) {
      reset({
        name: TargetedPaymentData?.data?.paymentDetail?.name,
        leadId: TargetedPaymentData?.data?.leadId,
        date: TargetedPaymentData?.data?.paymentDetail?.createdAt.slice(0, 10),
        title: TargetedPaymentData?.data?.paymentDetail?.title,
        applicantName: TargetedPaymentData?.data?.paymentDetail?.applicantName,
        payment: TargetedPaymentData?.data?.paymentDetail?.payment,
        franchiseName: TargetedPaymentData?.data?.paymentDetail?.franchiseName,
        // details: extractTextFromHTML(
        //   TargetedPaymentData?.data?.paymentDetail?.details
        // ),
        workStatus: TargetedPaymentData?.data?.paymentDetail?.workStatus,
      });
    }
  }, [TargetedPaymentData, reset]);
  return (
    <>
      {isTargetedPaymentLoading ? (
        <div className="flex justify-center items-center p-4">
          <Spin className="custom-table-spinner" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
          <div className="lg:flex justify-between w-full">
            {" "}
            <div className="lg:w-[18%] max-lg:mt-4">
              <label htmlFor="" className="w-[100%] lg:w-[10%]">
                Name
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-full lg:w-[85%] mt-1">
                    <Input
                      {...field}
                      readOnly
                      type="text"
                      placeholder="Enter Your Name..."
                      className="w-[100%] rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                    />
                  </div>
                )}
              />
            </div>{" "}
            <div className="lg:w-[18%] max-lg:mt-4">
              <label htmlFor="" className="w-[100%] lg:w-[10%]">
                Work Id
              </label>
              <Controller
                name="leadId"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-full lg:w-[85%] mt-1">
                    <Input
                      {...field}
                      readOnly
                      type="text"
                      placeholder="Enter Your Name..."
                      className="w-[100%] rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                    />
                  </div>
                )}
              />
            </div>{" "}
            <div className="lg:w-[18%] max-lg:mt-4">
              <label htmlFor="" className="w-[100%] lg:w-[10%]">
                Date
              </label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-full lg:w-[85%] mt-1">
                    <Input
                      {...field}
                      readOnly
                      type="text"
                      placeholder="Enter Date..."
                      className="w-[100%] rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                    />
                  </div>
                )}
              />
            </div>{" "}
            <div className="lg:w-[18%] max-lg:mt-4">
              <label htmlFor="" className="w-[100%] lg:w-[10%]">
                Title
              </label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-full lg:w-[85%] mt-1">
                    <Input
                      {...field}
                      readOnly
                      type="text"
                      placeholder="Enter Title..."
                      className="w-[100%] rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                    />
                  </div>
                )}
              />
            </div>{" "}
            <div className="lg:w-[18%] max-lg:mt-4">
              <label htmlFor="" className="w-[100%] lg:w-[10%]">
                Applicant Name
              </label>
              <Controller
                name="applicantName"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-full lg:w-[85%] mt-1">
                    <Input
                      {...field}
                      readOnly
                      type="text"
                      placeholder="Enter Your applicantName..."
                      className="w-[100%] rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                    />
                  </div>
                )}
              />
            </div>{" "}
          </div>
          <div className="mt-5">
            <div>Payment Details</div>
            <div className="bg-white w-full flex justify-between py-1 px-3 mt-1 flex-col md:flex-row">
              <div className="text-[#6B6B6B] w-full  lg:w-[40%]">
                <div className="  flex items-center justify-between">
                  <label htmlFor="" className="w-[100%] lg:w-[10%]">
                    Payment:
                  </label>
                  <Controller
                    name="payment"
                    control={control}
                    render={({ field }) => (
                      <div className="flex flex-col w-full lg:w-[85%] ml-5">
                        <Input
                          {...field}
                          readOnly
                          type="text"
                          placeholder=""
                          className="w-[100%] rounded-t-none border-none border-0 rounded-none h-[42px] text-[#18120F]"
                        />
                      </div>
                    )}
                  />
                </div>{" "}
              </div>
              <div className="text-[#6B6B6B] w-full lg:w-[60%] flex items-center">
                <div>Payment Method:</div>
                <span className="ml-2 text-[#18120F]">Pay U Money</span>
              </div>
            </div>
          </div>
          <div className="w-full mt-4">
            <label htmlFor="" className="w-[100%] lg:w-[100%] ">
              Franchise Name
            </label>
            <Controller
              name="franchiseName"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col w-full lg:w-[100%] mt-1">
                  <Input
                    {...field}
                    readOnly
                    type="text"
                    placeholder="Enter Your applicantname..."
                    className="w-[100%] rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[48px]"
                  />
                </div>
              )}
            />
          </div>{" "}
          <div className="w-full mt-4">
            <label htmlFor="" className="w-full">
              Work Status
            </label>

            <Controller
              name="workStatus"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  id="workStatus"
                  className="custom-select mt-1 w-full h-12"
                  suffixIcon={
                    <IoMdArrowDropdown style={{ fontSize: "18px" }} />
                  }
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <div className="p-2 border-t flex w-full justify-between">
                        <Input
                          value={customValue}
                          onChange={(e) => setCustomValue(e.target.value)}
                          placeholder="Enter custom Status..."
                          className="w-10/12 border-[1px] hover:bg-gray-200"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                        <button
                          onClick={addCustomValue}
                          className="w-1/12 border-[1px] rounded-md hover:bg-gray-300"
                        >
                          Add Status
                        </button>
                      </div>
                    </div>
                  )}
                >
                  {optionsFee.map((option, ind) => (
                    <Option key={`${ind}`} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </div>
          <div className=" mt-4">
            <label htmlFor="" className="">
              Details
            </label>
            <Controller
              name="details"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  id="details"
                  className="mt-1 bg-white border-x-0 border-t-0 border-b-[1px] border-[#CBD5E1] rounded-none"
                  placeholder="Details..."
                />
              )}
            />
          </div>
          <div className="mt-4">
            <button
              // disabled={!isDirty}
              type="submit"
              className="text-[#FFFFFF] font-DMSans bg-[#FF6820] py-2 px-3 rounded-lg"
            >
              {isPending ? (
                <>
                  <Spin />
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      )}
    </>
  );
};
