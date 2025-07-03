import { Form, Input, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill ki default styling
import "../../../index.css";
import { franchiseInputs } from "@/lib/types/franchise";
import ServiceManagementService from "@/services/servicemanagement/service-management";
import Dropzone from "react-dropzone";
import { useParams } from "react-router-dom";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ServiceListType } from "@/lib/types/service";
const ServiceDetails = () => {
  const { id } = useParams();
  const { useHandleUpdateServiceService, useFetchTargetedservices } =
    ServiceManagementService();
  const numericId = id ? parseInt(id) : undefined;

  const { data: TargetedserviceData, isLoading: isTargetedserviceLoading } =
    useFetchTargetedservices(numericId);
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileimage, setselectedFileimage] = useState(
    TargetedserviceData?.data?.image
  );

  const {
    control,
    watch,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<franchiseInputs>();

  const { mutate, isPending } = useHandleUpdateServiceService(reset, numericId);
  const totalAmount = +watch("feeAmount", 0) + +watch("serviceCharge", 0);

  const toolbarOptions = [
    ["bold"],
    ["italic"],
    ["link"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["code-block"],
    [{ direction: "rtl" }],
    // ["image"],
    [{ align: [] }],
  ];
  const module = { toolbar: toolbarOptions };
  const onSubmit: SubmitHandler<ServiceListType> = (data: ServiceListType) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("feeAmount", data?.feeAmount);
    formData.append("serviceCharge", data?.serviceCharge);
    formData.append("description", data?.description);

    if (selectedFile) {
      formData.append("image", selectedFile);
      console.log("selectedFile", selectedFile);
    }

    console.log("FormData entries:", data);
    Modal.confirm({
      title: "Confirm Update",
      content: "Do you want to update this Service?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        mutate(formData);
      },
    });
  };
  const onError: SubmitErrorHandler<franchiseInputs> = (errors) => {
    console.warn("submiterrorhandler errors", errors);
  };
  console.log(content, "content");

  useEffect(() => {
    if (TargetedserviceData) {
      reset({
        title: TargetedserviceData?.data?.title,
        feeAmount: TargetedserviceData?.data?.feeAmount,
        serviceCharge: TargetedserviceData?.data?.serviceCharge,
        totalAmount: TargetedserviceData?.data?.totalAmount,
        description: TargetedserviceData?.data?.description,
        // image: TargetedserviceData?.data?.image,
      });
      setContent(TargetedserviceData?.data?.description);
      setselectedFileimage(TargetedserviceData?.data?.image);
    }
  }, [TargetedserviceData, reset]);
  console.log("TargetedserviceData", TargetedserviceData);
  const handleDiscard = () => {
    reset();
  };
  return (
    <>
      {isTargetedserviceLoading ? (
        <Spin
          className="custom-table-spinner flex justify-center mt-5"
          size="large"
        />
      ) : (
        <>
          {" "}
          <div className="editor-container p-5 w-full flex justify-center  ">
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              encType="multipart/form-data"
              className="w-full lg:w-9/12 flex justify-between flex-col lg:flex-row mt-8
   "
            >
              <div className="w-[25%]">
                <div className="text-[#1E293B] font-DMSans text-sm">
                  Service Image
                </div>
                <div className=" h-24 w-24 mt-4  cursor-pointer">
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <Dropzone
                        onDrop={(acceptedFiles) => {
                          field.onChange(acceptedFiles[0]); // React Hook Form ko notify karein
                          setSelectedFile(acceptedFiles[0]); // Local state update
                        }}
                        multiple={false}
                        accept={{ "image/*": [] }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            {...getRootProps()}
                            className="... border-[1px] h-full w-full"
                          >
                            <input {...getInputProps()} />
                            <img
                              src={
                                field.value
                                  ? URL.createObjectURL(field.value)
                                  : `${
                                      selectedFileimage
                                        ? selectedFileimage
                                        : "/service.png"
                                    }`
                              }
                              alt="Service"
                              className="h-full w-full p-1"
                            />
                          </div>
                        )}
                      </Dropzone>
                    )}
                  />
                  <div className="mt-2">Upload image</div>
                </div>
              </div>
              <div className="mt-5 lg:mt-0 lg:w-[70%]">
                <div className="mb-5">
                  {" "}
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Form.Item
                        className="w-full  mb-2"
                        validateStatus={errors?.title ? "error" : ""}
                        help={errors?.title?.message}
                      >
                        <label
                          htmlFor="title"
                          className="text-[13px] text-[#1E293B] font-manrope font-semibold"
                        >
                          First Name
                        </label>
                        <Input
                          {...field}
                          id="title"
                          placeholder="Title"
                          className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        />{" "}
                      </Form.Item>
                    )}
                  />
                </div>
                <div className="bg-[#f8fafc]">
                  {" "}
                  <div className="mb-5 cursor-pointer">
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <ReactQuill
                          {...field}
                          value={field.value}
                          onChange={(value) => field.onChange(value)} // Update React Hook Form state
                          modules={module}
                          className="rounded-lg max-h-30 border-[1px] hover:bg-white overflow-auto"
                          theme="snow"
                          placeholder="Start typing here..."
                        />
                      )}
                    />
                  </div>
                </div>{" "}
                <div className="w-full   mt-14 ">
                  <Controller
                    name="feeAmount"
                    control={control}
                    render={({ field }) => (
                      <Form.Item
                        className="w-full mb-2  "
                        validateStatus={errors?.feeAmount ? "error" : ""}
                      >
                        <div className="flex justify-between items-center flex-col w-full md:flex-row">
                          <label
                            htmlFor="feeAmount"
                            className="text-[13px] text-[#1E293B] font-manrope font-semibold w-full sm:w-[20%]"
                          >
                            Fee Amount
                          </label>
                          <div className="w-full sm:w-[75%]">
                            <Input
                              {...field}
                              id="feeAmount"
                              placeholder="Fee Amount"
                              className="w-full rounded-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] h-[42px]"
                            />
                            <div className="text-red-400">
                              {errors?.feeAmount?.message}
                            </div>
                          </div>
                        </div>
                      </Form.Item>
                    )}
                  />
                </div>{" "}
                <div className="w-full   mt-4 ">
                  <Controller
                    name="serviceCharge"
                    control={control}
                    render={({ field }) => (
                      <Form.Item
                        className="w-full mb-2  "
                        validateStatus={errors?.serviceCharge ? "error" : ""}
                        help={errors?.serviceCharge?.message}
                      >
                        <div className="flex justify-between items-center flex-col md:flex-row w-full ">
                          <label
                            htmlFor="serviceCharge"
                            className="text-[13px] text-[#1E293B] font-manrope font-semibold w-full  sm:w-[20%]"
                          >
                            Service Charge{" "}
                          </label>
                          <Input
                            {...field}
                            id="serviceCharge"
                            placeholder="serviceCharge"
                            className="w-full sm:w-[75%] rounded-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] h-[42px]"
                          />
                        </div>
                      </Form.Item>
                    )}
                  />
                </div>{" "}
                <div className="w-full   mt-4 ">
                  <Controller
                    name="totalAmount"
                    control={control}
                    render={({ field }) => (
                      <Form.Item
                        className="w-full mb-2  "
                        validateStatus={errors?.totalAmount ? "error" : ""}
                        help={errors?.totalAmount?.message}
                      >
                        <div className="flex justify-between items-center flex-col w-full md:flex-row">
                          <label
                            htmlFor="totalAmount"
                            className="text-[13px] text-[#1E293B] font-manrope font-semibold w-full sm:w-[20%]"
                          >
                            Total Amount{" "}
                          </label>
                          <Input
                            {...field}
                            value={totalAmount}
                            readOnly
                            id="totalAmount"
                            placeholder="totalAmount"
                            className="w-full sm:w-[75%] rounded-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] h-[42px]"
                          />
                        </div>
                      </Form.Item>
                    )}
                  />
                </div>{" "}
                <div className="mt-8 flex">
                  <div
                    onClick={handleDiscard}
                    className="text-[#1E293B] bg-[#F1F5F9] px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Discard
                  </div>
                  <button
                    type="submit"
                    disabled={!isDirty}
                    className={`text-white ml-2 bg-[#1E293B] px-4 py-2 rounded-lg  ${
                      !isDirty
                        ? "bg-gray-500  cursor-not-allowed"
                        : "bg-[#1E293B]"
                    }`}
                  >
                    {isPending ? (
                      <>
                        <Spin />
                      </>
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              </div>
            </form>{" "}
          </div>
        </>
      )}
    </>
  );
};

export default ServiceDetails;
