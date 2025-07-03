import { Input, Spin } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import LeadService from "@/services/lead-management/lead-service";
import { QuotationCreate } from "@/lib/types/lead";
import { useParams } from "react-router-dom";

const FranchiseSendQuotation = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<QuotationCreate>();
  const { id } = useParams();
  const numericId = id ? parseInt(id) : undefined;
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [serviceCharge, setServiceCharge] = useState<number>(0);
  const { useHandleCreateFranchiseLeadQuotation, useFetchTargetedLead } =
    LeadService();
  const { data: TargetedleadData, isLoading: isTargetedleadLoading } =
    useFetchTargetedLead(numericId);
  const handleInputChange = (
    field: "feeAmount" | "serviceCharge",
    value: string
  ) => {
    const numericValue = Number(value) || 0;

    if (field === "feeAmount") {
      setFeeAmount(numericValue);
    } else if (field === "serviceCharge") {
      setServiceCharge(numericValue);
    }
  };
  const { mutate, isPending } = useHandleCreateFranchiseLeadQuotation(reset);
  const onSubmit: SubmitHandler<QuotationCreate> = (data) => {
    if (numericId !== undefined) {
      const payload: QuotationCreate = {
        leadId: numericId,
        feeAmount: feeAmount,
        serviceCharge: serviceCharge,
      };

      mutate(payload);
    } else {
      console.error("Lead ID is missing.", data);
    }
  };
  console.log(
    TargetedleadData?.data?.service,
    "TargetedleadData",
    isTargetedleadLoading
  );
  useEffect(() => {
    if (TargetedleadData) {
      setFeeAmount(+TargetedleadData?.data?.service?.feeAmount);
      setServiceCharge(+TargetedleadData?.data?.service?.serviceCharge);
    }
  }, [TargetedleadData, reset]);
  return (
    <>
      {isTargetedleadLoading ? (
        <>
          {" "}
          <Spin
            size="large"
            className="custom-table-spinner flex justify-center items-center p-5"
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="w-10/12 md:w-6/12 rounded-md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col w-full">
                <div className="flex justify-between w-full flex-col md:flex-row items-center">
                  <label className="text-[#1E293B] whitespace-nowrap font-medium text-[14px] md:w-[20%]">
                    FEE AMOUNT
                  </label>
                  <div className=" w-full md:w-[70%]">
                    <Input
                      {...register("feeAmount")}
                      onChange={(e) =>
                        handleInputChange("feeAmount", e.target.value)
                      }
                      value={feeAmount}
                      type="number"
                      className="flex-grow bg-white w-full border-b-[1px] h-[44px] border-0 rounded-none "
                    />
                  </div>
                  {errors.feeAmount && (
                    <span className="text-red-500 text-sm ml-2 text-nowrap">
                      {errors.feeAmount.message}
                    </span>
                  )}
                </div>

                <div className="flex justify-between w-full flex-col md:flex-row items-center my-4">
                  <label className="text-[#1E293B] whitespace-nowrap font-medium text-[14px] w-full md:w-[20%] flex-shrink-0">
                    SERVICE CHARGE
                  </label>{" "}
                  <div className=" w-full md:w-[70%]">
                    <Input
                      {...register("serviceCharge")}
                      type="number"
                      onChange={(e) =>
                        handleInputChange("serviceCharge", e.target.value)
                      }
                      value={serviceCharge}
                      className="flex-grow bg-white border-b-[1px] border-0 h-[44px] rounded-none "
                    />
                  </div>
                  {errors.serviceCharge && (
                    <span className="text-red-500 text-sm ml-2 text-nowrap">
                      {errors.serviceCharge.message}
                    </span>
                  )}
                </div>

                <div className="flex justify-between w-full flex-col md:flex-row items-center">
                  <label className="text-[#1E293B] w-full whitespace-nowrap font-medium text-[14px] md:w-[20%] ">
                    TOTAL AMOUNT
                  </label>
                  <div className=" w-full md:w-[70%]">
                    <Input
                      value={serviceCharge + feeAmount}
                      readOnly
                      className="w-full bg-white border-b-[1px] border-0 h-[44px] rounded-none "
                    />{" "}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-20 justify-between">
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="px-6 text-[#1E293B] bg-[#F1F5F9] rounded-md font-medium max-sm:hidden"
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    className="px-6 h-[40px] bg-orange-500 text-[#FFFFFF] rounded-md font-medium text-nowrap"
                  >
                    {isPending ? "Loading..." : "Send Quotation"}
                  </button>
                </div>
                <div className="text-right sm:w-auto font-medium my-10">
                  <p className="text-[#9499A1]">
                    Total Due:{" "}
                    <span className="text-[#3D475C]">
                      {serviceCharge + feeAmount}/-
                    </span>
                  </p>
                  <p className="text-[#9499A1]">
                    Total:{" "}
                    <span className="text-[#3D475C]">
                      {serviceCharge + feeAmount}/-
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FranchiseSendQuotation;
