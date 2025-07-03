import { Form, Input, Spin } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill ki default styling
import "../../../index.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { franchiseInputs } from "@/lib/types/franchise";
import ServiceManagementService from "@/services/servicemanagement/service-management";
import Dropzone from "react-dropzone";

import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { schemaCreateService } from "@/lib/schemas";
import { ServiceListType } from "@/lib/types/service";
const CreateNewService = () => {
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [charges, setCharges] = useState<number>(0);
  const [feeamount, setFeeAmount] = useState<number>(0);
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<franchiseInputs>({ resolver: zodResolver(schemaCreateService) });
  const handleContentChange = (value: string) => {
    setContent(value);
  };
  const { useHandleCreateService } = ServiceManagementService();
  const { mutate, isPending } = useHandleCreateService(
    reset,
    setSelectedFile,
    setContent
  );
  const totalAmount =
    (Number(watch("feeAmount")) || 0) + (Number(watch("serviceCharge")) || 0);

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
    console.log("data checking", data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("feeAmount", feeamount.toString());
    formData.append("serviceCharge", charges.toString());
    formData.append("description", `${content}`);

    if (selectedFile) {
      formData.append("image", selectedFile);
      console.log("selectedFile", selectedFile);
    }

    console.log("FormData entries:", data);
    mutate(formData);
    // setSelectedFile(null);
  };
  const onError: SubmitErrorHandler<franchiseInputs> = (errors) => {
    console.log("submiterrorhandler errors", errors);
  };
  console.log(content, "content");
  const handleDiscard = () => {
    reset();
  };
  return (
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
          </div>{" "}
          <div className=" h-24 w-24 mt-4 cursor-pointer">
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
                    <>
                      <div
                        {...getRootProps()}
                        className="... border-[1px] h-full w-full "
                      >
                        <input {...getInputProps()} />
                        <img
                          src={
                            field.value
                              ? URL.createObjectURL(field.value)
                              : `/service.png`
                          }
                          alt="Service"
                          className="h-full w-full p-1"
                        />{" "}
                        <div className="mt-2">Upload image</div>
                        <div className="text-red-300">
                          {" "}
                          {/* {errors?.image?.message} */}
                        </div>
                      </div>
                    </>
                  )}
                </Dropzone>
              )}
            />
          </div>
        </div>
        <div className="mt-5 lg:mt-0 lg:w-[70%]">
          <div className="mb-5 max-sm:mt-2">
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
          <div className="bg-[#f8fafc] max-sm:w-full  rounded-lg p-2">
            <label className="text-[#1E293B] font-manrope font-semibold">
              Description
            </label>
            <ReactQuill
              value={content}
              modules={module}
              onChange={handleContentChange}
              className=" rounded-lg focus:bg-white hover:bg-white "
              theme="snow"
              placeholder="Start typing here..."
            />
          </div>{" "}
          <div className="w-full   mt-14 ">
            <Controller
              name="feeAmount"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full mb-2  "
                  // validateStatus={errors?.feeAmount ? "error" : ""}
                  // help={errors?.feeAmount?.message}
                >
                  <div className="flex justify-between flex-col  items-center w-full max-sm:mt-12 sm:flex-row">
                    <label
                      htmlFor="feeAmount"
                      className="text-[13px] text-[#1E293B] font-manrope font-semibold max-sm:w-full  sm:w-[20%]"
                    >
                      FEE AMOUNT
                    </label>
                    <div className="max-sm:w-full sm:w-[75%]">
                      <Input
                        {...field}
                        id="feeAmount"
                        type="number"
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value); // Update form state
                          setFeeAmount(Number(value)); // Update your local state
                        }}
                        placeholder="Fee Amount"
                        className="w-full rounded-none border-x-0 border-t-0 border-b-[1px] border-[#cbd5e1] h-[42px]"
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
                  // validateStatus={errors?.feeAmount ? "error" : ""}
                  // help={errors?.feeAmount?.message}
                >
                  <div className="flex justify-between flex-col  items-center w-full max-sm:mt-12 sm:flex-row">
                    <label
                      htmlFor="serviceCharge"
                      className="text-[13px] text-[#1E293B] font-manrope font-semibold max-sm:w-full  sm:w-[20%] uppercase"
                    >
                      Serivce Charge
                    </label>
                    <div className="max-sm:w-full sm:w-[75%]">
                      <Input
                        {...field}
                        id="serviceCharge"
                        type="number"
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value); // Update form state
                          setCharges(Number(value)); // Update your local state
                        }}
                        placeholder="Fee Amount"
                        className="w-full rounded-none border-x-0 border-t-0 border-b-[1px] border-[#cbd5e1] h-[42px]"
                      />
                      <div className="text-red-400">
                        {/* {errors?.feeAmount?.message} */}
                      </div>
                    </div>
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
                  // validateStatus={errors?.feeAmount ? "error" : ""}
                  // help={errors?.feeAmount?.message}
                >
                  <div className="flex justify-between items-center w-full flex-col md:flex-row">
                    <label
                      htmlFor="totalAmount"
                      className="text-[13px] text-[#1E293B] font-manrope font-semibold  w-full sm:w-[20%]"
                    >
                      TOTAL AMOUNT
                    </label>
                    <div className="w-full sm:w-[75%]">
                      <Input
                        {...field}
                        id="totalAmount"
                        value={totalAmount}
                        readOnly
                        placeholder="Total Amount"
                        className="w-full rounded-none border-x-0 border-t-0 border-b-[1px] border-[#cbd5e1] h-[42px]"
                      />
                      <div className="text-red-400">
                        {errors?.totalAmount?.message}
                      </div>
                    </div>
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
              className="text-white ml-2 bg-[#1E293B] px-4 py-2 rounded-lg"
            >
              {isPending ? (
                <>
                  <Spin />
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </form>{" "}
    </div>
  );
};

export default CreateNewService;
