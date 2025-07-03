import { Form, Input, Modal, Select, Spin } from "antd";
// import { Option } from "antd/es/mentions";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiClockClockwiseBold } from "react-icons/pi";
import { franchiseInputs } from "@/lib/types/franchise";
import FranchiseService from "@/services/franchise/franchise-service";
import TextArea from "antd/es/input/TextArea";
import LocationseService from "@/services/location/location";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const FranchiseUpdate = () => {
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<franchiseInputs>();
  const { useFetchTargetedFranchises, useHandleUpdateFranchiseService } =
    FranchiseService();

  const { id } = useParams();
  const numericId = id ? parseInt(id) : undefined;

  const { data: TargetedFranchiseData, isLoading: isTargetedFranchiseLoading } =
    useFetchTargetedFranchises(numericId);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

  const { useFetchAllLocation } = LocationseService();

  const { data } = useFetchAllLocation();

  useEffect(() => {
    if (TargetedFranchiseData) {
      const targetState = TargetedFranchiseData?.data?.state;

      // State ke districts nikalne ka tareeqa
      const districts =
        data?.data?.find((item) => item?.state === targetState)?.district || [];
      if (Array.isArray(districts)) {
        setSelectedDistricts(districts);
        console.log(districts, "check districts");
      }
      console.log(districts, "check districts");
      reset({
        username: TargetedFranchiseData?.data?.username,
        phone: TargetedFranchiseData?.data?.phone,
        email: TargetedFranchiseData?.data?.email,
        officeName: TargetedFranchiseData?.data?.officeName,
        officeAddress: TargetedFranchiseData?.data?.officeAddress,
        state: TargetedFranchiseData?.data?.state,
        district: TargetedFranchiseData?.data?.district,
        taluk: TargetedFranchiseData?.data?.taluk,
        panchayat: TargetedFranchiseData?.data?.panchayat,
        postOffice: TargetedFranchiseData?.data?.postOffice,
        pin: TargetedFranchiseData?.data?.pin,
      });
    }
  }, [TargetedFranchiseData, reset, data?.data]);
  const { mutate, isPending } = useHandleUpdateFranchiseService(
    reset,
    numericId
  );

  const onSubmit: SubmitHandler<franchiseInputs> = (data) => {
    Modal.confirm({
      title: "Confirm Update",
      content: "Do you want to update this user?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        mutate(data);
      },
    });
  };
  const statesArray = data?.data?.map((stateData) => ({
    state: stateData?.state,
    districts: stateData?.district,
  }));

  const handleStateChange = (selectedState: string) => {
    const foundState = statesArray?.find(
      (state) => state?.state === selectedState
    );
    const districtsArray =
      typeof foundState?.districts === "string"
        ? [foundState.districts] // Convert string to array
        : foundState?.districts || [];
    setSelectedDistricts(districtsArray);
  };
  console.log(TargetedFranchiseData, "get franchise data");
  const handleDiscard = () => {
    reset();
  };
  return (
    <>
      {isTargetedFranchiseLoading ? (
        <Spin
          className="custom-table-spinner flex justify-center mt-5"
          size="large"
        />
      ) : (
        <div className="font-DMSans">
          <Form
            onFinish={handleSubmit(onSubmit)}
            className="w-11/12 mx-auto lg:w-9/12  mt-4 font-DMSans"
          >
            <div className="flex justify-between items-center mb-6 flex-col lg:flex-row">
              <div className="font-DMSans">
                <div className="text-[#0F172A] text-lg font-medium">
                  Franchise Details
                </div>
                <div className="text-[#475569] text-sm">
                  Showing The Franchise Details
                </div>
              </div>
            </div>
            <div className="w-full  flex items-center justify-between mb-5 flex-col lg:flex-row">
              <label htmlFor="" className="w-[100%] lg:w-[10%]">
                Name
              </label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-full lg:w-[85%]">
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter Your Name..."
                      className="w-[100%] rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                    />
                  </div>
                )}
              />
            </div>{" "}
            <div className="w-full flex items-center justify-between mb-5 flex-col lg:flex-row">
              <label htmlFor="" className="w-[100%] lg:w-[10%]">
                Phone
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-full lg:w-[85%]">
                    <Input
                      {...field}
                      type="text"
                      placeholder="+91 096 05 101101"
                      className="w-[100%]   rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                    />
                    {errors.phone && (
                      <div className="text-red-500 text-sm mt-1 w-full">
                        {errors.phone.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>{" "}
            <div className="w-full flex items-center justify-between mb-5 flex-col lg:flex-row">
              <label htmlFor="" className="w-[100%] lg:w-[10%]">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-full lg:w-[85%]">
                    <Input
                      {...field}
                      type="email"
                      placeholder="a@gmail.com"
                      className="w-[100%]    rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                    />
                    {errors.email && (
                      <div className="text-red-500 text-sm mt-1 w-full">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>{" "}
            <div className="w-full flex items-center justify-between mb-5 flex-col lg:flex-row">
              <label htmlFor="" className="w-[100%] lg:w-[10%]">
                Office Name
              </label>
              <Controller
                name="officeName"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-full lg:w-[85%]">
                    <Input
                      {...field}
                      type="text"
                      placeholder="Digitech Infra Associates"
                      className="w-[100%]   rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                    />
                    {errors.officeName && (
                      <div className="text-red-500 text-sm mt-1 w-full">
                        {errors.officeName.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>{" "}
            <div className="flex justify-between items-center flex-col lg:flex-row w-full mb-5">
              <label htmlFor="" className="w-[100%] lg:w-[10%]">
                Office Address With Pin Code
              </label>
              <Controller
                control={control}
                name="officeAddress"
                render={({ field }) => (
                  <div className="flex flex-col w-full lg:w-[85%]">
                    <TextArea
                      {...field}
                      // rows={2}
                      placeholder="MELKA Tower, Cheruparambath Rd, near Titan eye"
                      className="mt-1  w-[100%]  bg-white  text-black border-[#CBD5E1] border-t-0 border-r-0 border-l-0  border-b-2"
                    ></TextArea>
                    {errors.officeAddress && (
                      <div className="text-red-500 text-sm mt-1 w-full">
                        {errors.officeAddress.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="flex justify-between items-center flex-col lg:flex-row w-full mb-5">
              {" "}
              {/* <div className="w-[100%] lg:w-[47%] flex items-center justify-between flex-col lg:flex-row">
                <label htmlFor="" className="w-[100%] lg:w-[20%]">
                  State
                </label>
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <div className="flex flex-col w-full lg:w-[68%]">
                      <Select
                        {...field}
                        onChange={(value) => {
                          field.onChange(value); // Update react-hook-form value
                          handleStateChange(value); // Update districts
                        }}
                        className="custom-select mt-1 h-10 w-full"
                        placeholder="Select State"
                        suffixIcon={
                          <IoMdArrowDropdown style={{ fontSize: "18px" }} />
                        }
                      >
                        {statesArray?.map((state, index) => (
                          <Select.Option key={index} value={state.state}>
                            {state.state}
                          </Select.Option>
                        ))}
                      </Select>
                      {errors.state && (
                        <div className="text-red-500 text-sm mt-1 w-full">
                          {errors.state.message}
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>{" "} */}
              {/* <div className="w-[100%] lg:w-[47%] mt-3 lg:mt-0 flex items-center justify-between flex-col lg:flex-row">
                <label htmlFor="" className="w-[100%] lg:w-[20%]">
                  District
                </label>
                <Controller
                  name="district"
                  control={control}
                  defaultValue=""
                  rules={{ required: "District is required" }}
                  render={({ field }) => (
                    <div className="flex flex-col w-full lg:w-[68%]">
                      <Select
                        {...field}
                        className="custom-select mt-1 h-10 w-full"
                        placeholder="Select District"
                        suffixIcon={
                          <IoMdArrowDropdown style={{ fontSize: "18px" }} />
                        }
                      >
                        {selectedDistricts?.map((district, index) => (
                          <Select.Option key={index} value={district}>
                            {district}
                          </Select.Option>
                        ))}
                      </Select>
                      {errors.district && (
                        <div className="text-red-500 text-sm mt-1 w-full">
                          {errors.district.message}
                        </div>
                      )}
                    </div>
                  )}
                />
              </div> */}
            </div>{" "}
            {/* <div className="flex justify-between items-center flex-col lg:flex-row w-full mb-5">
              {" "}
              <div className="w-[100%] lg:w-[47%] flex items-center justify-between flex-col lg:flex-row">
                <label htmlFor="" className="w-[100%] lg:w-[20%]">
                  Taluk
                </label>
                <Controller
                  name="taluk"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="flex flex-col w-full lg:w-[68%]">
                      <Input
                        {...field}
                        type="taluk"
                        placeholder="Digitech Infra Associates"
                        className="w-[100%]   rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                      />{" "}
                    </div>
                  )}
                />
              </div>{" "}
              <div className="w-[100%] lg:w-[47%] flex items-center justify-between flex-col lg:flex-row mt-3 lg:mt-0">
                <label htmlFor="" className="w-[100%] lg:w-[20%]">
                  Panchayat
                </label>

                <Controller
                  name="panchayat"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="flex flex-col w-full lg:w-[68%]">
                      <Input
                        {...field}
                        type="panchayat"
                        placeholder="Digitech Infra Associates"
                        className="w-[100%]   rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                      />{" "}
                      {errors.panchayat && (
                        <div className="text-red-500 text-sm mt-1 w-full">
                          {errors.panchayat.message}
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>{" "} */}
            {/* <div className="flex justify-between items-center flex-col lg:flex-row w-full mb-5">
              {" "}
              <div className=" w-[100%] lg:w-[47%] flex items-center justify-between flex-col lg:flex-row">
                <label htmlFor="" className=" w-[100%] lg:w-[20%]">
                  Post Office
                </label>
                <Controller
                  name="postOffice"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="flex flex-col w-full lg:w-[68%]">
                      <Input
                        {...field}
                        type="postOffice"
                        placeholder="Digitech Infra Associates"
                        className="w-[100%]   rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                      />{" "}
                      {errors.postOffice && (
                        <div className="text-red-500 text-sm mt-1 w-full">
                          {errors.postOffice.message}
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>{" "}
              <div className="w-[100%] lg:w-[47%] flex items-center justify-between flex-col lg:flex-row mt-3 lg:mt-0">
                <label htmlFor="" className="w-[100%] lg:w-[20%]">
                  Pin Code
                </label>

                <Controller
                  name="pin"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col w-full lg:w-[68%]">
                      <Input
                        {...field}
                        type="text"
                        placeholder="682020"
                        className="w-full rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                      />
                      {errors.pin && (
                        <div className="text-red-500 text-sm mt-1 w-full">
                          {errors.pin.message}
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>{" "} */}
            {/* <div className="w-full flex items-center justify-between flex-col lg:flex-row lg:justify-start mb-5">
              <label htmlFor="" className="w-[100%] lg:w-[10%]">
                Lead View Permission
              </label>
              <div className="w-[100%] flex justify-between items-center flex-wrap lg:w-[70%] lg:ml-10  lg:flex-nowrap">
                <div className="my-2 lg:my-0 border-[1px] min-w-fit border-[#CBD5E1] rounded-lg bg-white py-1 px-2">
                  All
                </div>
                <div className="my-2 lg:my-0 border-[1px] min-w-fit border-[#CBD5E1] rounded-lg bg-white py-1 px-2">
                  State Wise
                </div>
                <div className="my-2 lg:my-0 border-[1px] min-w-fit border-[#CBD5E1] rounded-lg bg-white py-1 px-2">
                  District Wise
                </div>
                <div className="my-2 lg:my-0 border-[1px] min-w-fit border-[#CBD5E1] rounded-lg bg-white py-1 px-2">
                  Taluk Wise
                </div>
                <div className="my-2 lg:my-0 border-[1px] min-w-fit border-[#CBD5E1] rounded-lg bg-white py-1 px-2">
                  Panchayat Wise
                </div>
              </div>
            </div>{" "} */}
            <div className="flex mt-2 lg:mt-8 lg:mb-6">
              {" "}
              <div
                onClick={handleDiscard}
                className="px-4 h-[40px] bg-[#F1F5F9] text-[#0F172A] rounded-md text-[14px] mr-1 cursor-pointer flex items-center"
              >
                Discard
              </div>
              <button
                disabled={!isDirty}
                // onClick={showModal}
                className={`px-4 h-[40px] text-white rounded-md bg-[#1E293B] flex items-center text-[14px] ml-2 ${
                  !isDirty ? "bg-gray-500  cursor-not-allowed" : "bg-[#1E293B]"
                }`}
              >
                {isPending ? (
                  <Spin className="mr-3" />
                ) : (
                  <PiClockClockwiseBold className="text-xl mr-2 text-[#CBD5E1]" />
                )}
                Update
              </button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};
export default FranchiseUpdate;
