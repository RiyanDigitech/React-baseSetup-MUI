import { schemaFranchise } from "@/lib/schemas";
import { Form, Input, Select, Spin } from "antd";
import { Option } from "antd/es/mentions";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiClockClockwiseBold } from "react-icons/pi";
import { zodResolver } from "@hookform/resolvers/zod";
import { franchiseInputs } from "@/lib/types/franchise";
import FranchiseService from "@/services/franchise/franchise-service";
import TextArea from "antd/es/input/TextArea";
import LocationseService from "@/services/location/location";
import { useState } from "react";
const FranchiseCreate = () => {
  const {
    control,
    setValue,
    // watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<franchiseInputs>({ resolver: zodResolver(schemaFranchise) });
  const { useHandleCreateFranchise } = FranchiseService();
  const [districts, setDistricts] = useState<string[] | []>([]);
  const [leadDistricts, setLeadDistricts] = useState<string[] | []>([]);

  const [isDistrictDisabled, setDistrictDisabled] = useState(true);
  const [isTalukDisabled, setTalukDisabled] = useState(true);
  const [isPanchayatDisabled, setPanchayatDisabled] = useState(true);

  const [isLeadDistrictDisabled, setLeadDistrictDisabled] = useState(true);
  const [isLeadTalukDisabled, setLeadTalukDisabled] = useState(true);
  const [isLeadPanchayatDisabled, setLeadPanchayaDisabled] = useState(true);

  const { mutate, isPending } = useHandleCreateFranchise(reset);
  const onSubmit: SubmitHandler<franchiseInputs> = (data) => {
    const payload = {
      ...data,
      // stateId: selectedStateId,
      leadTaluk: leadCustomValue ? leadCustomValue : null,
      leadPanchayat: leaCustomValuePanchayat ? leaCustomValuePanchayat : null,
      // ...(data.district !== "All" && { district: data.district }), // District ko sirf tab include karein jab wo "All" na ho
    };

    mutate(payload);
  };
  const onError: SubmitErrorHandler<franchiseInputs> = (errors) => {
    console.warn("submiterrorhandler errors", errors);
  };
  const { useFetchAllLocation } = LocationseService();

  const { data, isLoading } = useFetchAllLocation();
  const [customValue, setCustomValue] = useState("");
  const [leadCustomValue, setLeadCustomValue] = useState<string | null>(null);

  const [selectedTaluks, setSelectedTaluks] = useState<string[]>([]);
  const [selectedLeadTaluks, setSelectedLeadTaluks] = useState<string[]>([]);
  const [selectedPanchayat, setSelectedPanchayat] = useState<string[]>([]);

  const [selectedPanchayats, setSelectedPanchayats] = useState<string[]>([]);

  const [customValuePanchayat, setCustomValuePanchayat] = useState("");
  const [leaCustomValuePanchayat, setLeadCustomValuePanchayat] = useState<
    string | null
  >(null);

  const [optionFee, setOptionsFee] = useState("");
  const [leadOptionFee, setLeadOptionsFee] = useState("");

  const [optionFeePanchayat, setOptionFeePanchayat] = useState("");
  const [optionLeadFeePanchayat, setLeadOptionFeePanchayat] = useState("");

  const [forOnlyShowing, setforOnlyShowing] = useState("");
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
  const handleStateChange = (value: string) => {
    setValue("state", value);

    const selected = data?.data?.find((item) => item?.state === value);
    console.log("inside selected state", selected);
    setValue("stateId", selected?.id);

    setSelectedStateId(selected?.id || null); // Set ID in state (optional)
    setSelectedTaluks(selected?.taluks);
    setSelectedPanchayats(selected?.panchayats);
    setDistricts(Array.isArray(selected?.district) ? selected.district : []);

    setDistrictDisabled(!selected);
    setValue("district", "");
  };
  const handleStateChangeTaluk = (value: string) => {
    setValue("taluk", value);
    setPanchayatDisabled(false);
  };
  const handleLeadStateChangeTaluk = (value: string) => {
    console.log("inside data gotted", value);
    setValue("leadTaluk", value);
    setLeadCustomValue(value);
    setLeadPanchayaDisabled(false);
  };
  const handleStateChangePanchayat = (value: string) => {
    setValue("panchayat", value);
  };
  const handleLeadStateChangePanchayat = (value: string) => {
    setValue("leadPanchayat", value);
    setLeadCustomValuePanchayat(value);
  };
  const handleleadStateChange = (value: string) => {
    setValue("leadState", value);

    const selected = data?.data?.find((item) => item?.state === value);
    console.log("selected new inside", selected);
    setSelectedLeadTaluks(selected?.taluks);
    setSelectedPanchayat(selected?.panchayats);
    setLeadDistricts(
      Array.isArray(selected?.district) ? selected.district : []
    );

    setLeadDistrictDisabled(!selected);
    setValue("leadDistrict", "");
  };
  const handleDistrictChange = (value: string) => {
    setTalukDisabled(false);
    setValue("district", value);
  };
  const handleLeadDistrictChange = (value: null) => {
    if (value === null) {
      setValue("leadDistrict", null);
      console.log("inside all", value);
      setforOnlyShowing("All");
      setLeadTalukDisabled(true);
      setLeadPanchayaDisabled(true);
    } else {
      setLeadTalukDisabled(false);
      setValue("leadDistrict", value);
      setforOnlyShowing(value);
    }
  };
  const handleDiscard = () => {
    reset();
  };
  const addCustomValue = () => {
    if (customValue) {
      setOptionsFee(customValue);
      setCustomValue("");
    }
  };
  const addLeadCustomValue = () => {
    if (leadCustomValue) {
      setLeadOptionsFee(leadCustomValue);
      setLeadCustomValue(null);
    }
  };
  const addCustomValuePanchayat = () => {
    if (customValuePanchayat) {
      setOptionFeePanchayat(customValuePanchayat);
      setCustomValue("");
    }
  };
  const addLeadCustomValuePanchayat = () => {
    if (leaCustomValuePanchayat) {
      setLeadOptionFeePanchayat(leaCustomValuePanchayat);
      setLeadCustomValue(null);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spin
          className="custom-table-spinner flex justify-center mt-5"
          size="large"
        />
      ) : (
        <div className="font-DMSans">
          <Form
            onFinish={handleSubmit(onSubmit, onError)}
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
            <div className="w-full  flex items-center justify-between mb-2 flex-col lg:flex-row ">
              <label htmlFor="" className="w-[100%] lg:w-[10%] mb-5">
                Name
              </label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className=" w-full lg:w-[85%] bg-red-700"
                    validateStatus={errors?.username ? "error" : ""}
                    help={errors?.username?.message}
                  >
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter Your Name..."
                      className="w-[100%]    rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                    />
                  </Form.Item>
                )}
              />
            </div>{" "}
            <div className="w-full flex items-center justify-between mb-2 flex-col lg:flex-row">
              <label htmlFor="" className="w-[100%] lg:w-[10%] mb-5">
                Phone
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="flex flex-col w-full lg:w-[85%]"
                    validateStatus={errors?.phone ? "error" : ""}
                    help={errors?.phone?.message}
                  >
                    <Input
                      {...field}
                      type="text"
                      placeholder="+91 096 05 101101"
                      className="w-[100%]   rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                    />
                  </Form.Item>
                )}
              />
            </div>{" "}
            <div className="w-full flex items-center justify-between mb-2 flex-col lg:flex-row">
              <label htmlFor="" className="w-[100%] lg:w-[10%] mb-5">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="flex flex-col w-full lg:w-[85%]"
                    validateStatus={errors?.email ? "error" : ""}
                    help={errors?.email?.message}
                  >
                    <Input
                      {...field}
                      type="email"
                      placeholder="a@gmail.com"
                      className="w-[100%]    rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                    />
                  </Form.Item>
                )}
              />
            </div>{" "}
            <div className="w-full flex items-center justify-between mb-2 flex-col lg:flex-row">
              <label htmlFor="" className="w-[100%] lg:w-[10%] mb-5">
                Office Name
              </label>
              <Controller
                name="officeName"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="flex flex-col w-full lg:w-[85%]"
                    validateStatus={errors?.officeName ? "error" : ""}
                    help={errors?.officeName?.message}
                  >
                    <Input
                      {...field}
                      type="text"
                      placeholder="Office Name"
                      className="w-[100%]   rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                    />
                  </Form.Item>
                )}
              />
            </div>{" "}
            <div className="flex justify-between items-center flex-col lg:flex-row w-full mb-2">
              <label htmlFor="" className="w-[100%] lg:w-[10%] mb-5 ">
                Office Address With Pin Code
              </label>
              <Controller
                control={control}
                name="officeAddress"
                render={({ field }) => (
                  <Form.Item
                    className="flex flex-col w-full lg:w-[85%]"
                    validateStatus={errors?.officeAddress ? "error" : ""}
                    help={errors?.officeAddress?.message}
                  >
                    <TextArea
                      {...field}
                      // rows={2}
                      placeholder="Enter Office Address"
                      className="mt-1  w-[100%]  bg-white  text-black border-[#CBD5E1] border-t-0 border-r-0 border-l-0  border-b-2"
                    ></TextArea>
                  </Form.Item>
                )}
              />
            </div>
            {/* <div className="flex justify-between items-center flex-col lg:flex-row w-full mb-2">
              {" "}
              <div className="w-[100%] lg:w-[47%] flex items-center justify-between flex-col lg:flex-row">
                <label htmlFor="" className="w-[100%] lg:w-[20%] mb-5">
                  State
                </label>
                <Controller
                  name="state"
                  control={control}
                  defaultValue=""
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <Form.Item
                      className="flex flex-col w-full lg:w-[68%]"
                      validateStatus={errors?.state ? "error" : ""}
                      help={errors?.state?.message}
                    >
                      {" "}
                      <Select
                        {...field}
                        onChange={handleStateChange}
                        className="custom-select mt-1 h-10 w-full"
                        placeholder="Select State"
                        suffixIcon={
                          <IoMdArrowDropdown style={{ fontSize: "18px" }} />
                        }
                      >
                        {data?.data?.map((item, ind) => (
                          <Option key={ind.toString()} value={item.state}>
                            {item.state}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                />
              </div>{" "}
              <div className="w-[100%] lg:w-[47%] mt-3 lg:mt-0 flex items-center justify-between flex-col lg:flex-row">
                <label htmlFor="" className="w-[100%] lg:w-[20%] mb-5">
                  District
                </label>
                <Controller
                  name="district"
                  control={control}
                  rules={{ required: "District is required" }}
                  render={({ field }) => (
                    <Form.Item
                      className="flex flex-col w-full lg:w-[68%]"
                      validateStatus={errors?.district ? "error" : ""}
                      help={errors?.district?.message}
                    >
                      <Select
                        {...field}
                        disabled={isDistrictDisabled}
                        onChange={handleDistrictChange}
                        className="custom-select mt-1 h-10 w-full"
                        placeholder="Select District"
                        suffixIcon={
                          <IoMdArrowDropdown style={{ fontSize: "18px" }} />
                        }
                      >
                        {districts?.map((district, index) => (
                          <Option key={`${index}`} value={district}>
                            {district}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-between items-center flex-col lg:flex-row w-full mb-2">
              <div className="w-[100%] lg:w-[47%] flex items-center justify-between flex-col lg:flex-row">
                <label htmlFor="" className="w-[100%] lg:w-[20%] mb-5">
                  Taluk
                </label>
                <Controller
                  name="taluk"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Item
                      className="flex flex-col w-full lg:w-[68%]"
                      validateStatus={errors?.taluk ? "error" : ""}
                      help={errors?.taluk?.message}
                    >
                      {" "}
                      <Select
                        {...field}
                        disabled={isTalukDisabled}
                        onChange={handleStateChangeTaluk}
                        id="taluk"
                        className="custom-select mt-1 w-full h-10"
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
                                placeholder="Enter Taluk..."
                                className="w-8/12 border-[1px] hover:bg-gray-200"
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                              />
                              <button
                                onClick={addCustomValue}
                                className="w-3/12 border-[1px] rounded-lg text-xs"
                              >
                                Add Taluk
                              </button>
                            </div>
                          </div>
                        )}
                      >
                        {selectedTaluks?.map((item, ind) => (
                          <Option key={ind.toString()} value={item}>
                            {item}
                          </Option>
                        ))}
                        {
                          <Option
                            key={`${data?.data?.length}`}
                            value={optionFee}
                          >
                            {optionFee}
                          </Option>
                        }{" "}
                      </Select>
                    </Form.Item>
                  )}
                />
              </div>{" "}
              <div className="w-[100%] lg:w-[47%] flex items-center justify-between flex-col lg:flex-row mt-3 lg:mt-0">
                <label htmlFor="" className="w-[100%] lg:w-[20%] mb-5">
                  Panchayat
                </label>

                <Controller
                  name="panchayat"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Item
                      className="flex flex-col w-full lg:w-[68%]"
                      validateStatus={errors?.panchayat ? "error" : ""}
                      help={errors?.panchayat?.message}
                    >
                      {" "}
                      <Select
                        {...field}
                        onChange={handleStateChangePanchayat}
                        disabled={isPanchayatDisabled}
                        id="panchayat"
                        className="custom-select mt-1 w-full h-10"
                        suffixIcon={
                          <IoMdArrowDropdown style={{ fontSize: "18px" }} />
                        }
                        dropdownRender={(menu) => (
                          <div>
                            {menu}
                            <div className="p-2 border-t flex w-full justify-between">
                              <Input
                                value={customValuePanchayat}
                                onChange={(e) =>
                                  setCustomValuePanchayat(e.target.value)
                                }
                                placeholder="Enter Panchayat..."
                                className="w-8/12 border-[1px] hover:bg-gray-200"
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                              />
                              <button
                                onClick={addCustomValuePanchayat}
                                className="w-[30%] border-[1px] rounded-lg text-xs p-1"
                              >
                                Add Panchayat
                              </button>
                            </div>
                          </div>
                        )}
                      >
                        {selectedPanchayats?.map((item, ind) => (
                          <Option key={ind.toString()} value={item}>
                            {item}
                          </Option>
                        ))}
                        {
                          <Option
                            key={`${data?.data?.length}`}
                            value={optionFeePanchayat}
                          >
                            {optionFeePanchayat}
                          </Option>
                        }
                      </Select>
                    </Form.Item>
                  )}
                />
              </div>
            </div>{" "} */}
            {/* <div className="flex justify-between items-center flex-col lg:flex-row w-full mb-2">
              {" "}
              <div className=" w-[100%] lg:w-[47%] flex items-center justify-between flex-col lg:flex-row">
                <label htmlFor="" className=" w-[100%] lg:w-[20%] mb-5">
                  Post Office
                </label>
                <Controller
                  name="postOffice"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Item
                      className="flex flex-col w-full lg:w-[68%]"
                      validateStatus={errors?.postOffice ? "error" : ""}
                      help={errors?.postOffice?.message}
                    >
                      <Input
                        {...field}
                        type="postOffice"
                        placeholder="Enter Post Office"
                        className="w-[100%]   rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px]"
                      />{" "}
                    </Form.Item>
                  )}
                />
              </div>{" "}
              <div className="w-[100%] lg:w-[47%] flex items-center justify-between flex-col lg:flex-row mt-3 lg:mt-0">
                <label htmlFor="" className="w-[100%] lg:w-[20%] mb-5">
                  Pin Code
                </label>

                <Controller
                  name="pin"
                  control={control}
                  render={({ field }) => (
                    <Form.Item
                      className="flex flex-col w-full lg:w-[68%]"
                      validateStatus={errors?.pin ? "error" : ""}
                      help={errors?.pin?.message}
                    >
                      <Input
                        {...field}
                        type="text"
                        placeholder="682020"
                        className="w-full rounded-t-none border-x-0 border-t-0 border-b-[2px] border-[#cbd5e1] rounded-none h-[42px] mt-[3px]"
                      />
                    </Form.Item>
                  )}
                />
              </div>
            </div>{" "} */}
            <hr className="mt-8 font-bold" />
            <div className=" w-full flex items-center justify-between flex-col lg:flex-row mt-8  mb-2">
              <label htmlFor="" className="w-[100%] lg:w-[10%] uppercase ">
                Lead View Permission
              </label>
              <div className=" w-[100%] flex justify-between items-center flex-col lg:w-[86%] lg:ml-10  lg:flex-nowrap ">
                <div className="flex justify-between items-center flex-col lg:flex-row w-full  ">
                  <div className="w-[100%] lg:w-[38%] flex items-center justify-between flex-col lg:flex-row ">
                    <label htmlFor="" className="w-[100%] lg:w-[10%] mb-2">
                      lead State
                    </label>
                    <Controller
                      name="leadState"
                      control={control}
                      defaultValue=""
                      rules={{ required: "leadState is required" }}
                      render={({ field }) => (
                        <Form.Item
                          className="flex flex-col w-full lg:w-[70%]"
                          validateStatus={errors?.leadState ? "error" : ""}
                          help={errors?.leadState?.message}
                        >
                          <Select
                            {...field}
                            onChange={handleleadStateChange}
                            className="custom-select mt-2 h-10 w-full"
                            placeholder="Select State"
                            suffixIcon={
                              <IoMdArrowDropdown style={{ fontSize: "18px" }} />
                            }
                          >
                            {data?.data?.map((item, ind) => (
                              <Option key={ind.toString()} value={item.state}>
                                {item.state}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      )}
                    />
                  </div>
                  <div className="w-[100%] lg:w-[38%] mt-3 lg:mt-0 flex items-center justify-between flex-col lg:flex-row">
                    <label htmlFor="" className="w-[100%] lg:w-[10%] mb-2">
                      lead District
                    </label>
                    <Controller
                      name="leadDistrict"
                      control={control}
                      defaultValue=""
                      rules={{ required: "leadDistrict is required" }}
                      render={({ field }) => (
                        <Form.Item
                          className="flex flex-col w-full lg:w-[70%]"
                          validateStatus={errors?.leadDistrict ? "error" : ""}
                          help={errors?.leadDistrict?.message}
                        >
                          <Select
                            {...field}
                            onChange={handleLeadDistrictChange}
                            disabled={isLeadDistrictDisabled}
                            value={forOnlyShowing}
                            className="custom-select mt-2 h-10 w-full"
                            placeholder="Select District"
                            suffixIcon={
                              <IoMdArrowDropdown style={{ fontSize: "18px" }} />
                            }
                          >
                            <Option key={`all`} value={null}>
                              {"All"}
                            </Option>
                            {leadDistricts?.map((district, index) => (
                              <Option key={`${index}`} value={district}>
                                {district}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center flex-col lg:flex-row w-full  ">
                  <div className="w-[100%] lg:w-[38%] flex items-center justify-between flex-col lg:flex-row ">
                    <label htmlFor="" className="w-[100%] lg:w-[10%] mb-2">
                      LeadTaluk
                    </label>
                    <Controller
                      name="leadTaluk"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Form.Item
                          className="flex flex-col w-full lg:w-[68%]"
                          validateStatus={errors?.leadTaluk ? "error" : ""}
                          help={errors?.leadTaluk?.message}
                        >
                          {" "}
                          <Select
                            {...field}
                            disabled={isLeadTalukDisabled}
                            onChange={handleLeadStateChangeTaluk}
                            id="leadTaluk"
                            className="custom-select mt-1 w-full h-10"
                            suffixIcon={
                              <IoMdArrowDropdown style={{ fontSize: "18px" }} />
                            }
                            dropdownRender={(menu) => (
                              <div>
                                {menu}
                                <div className="p-2 border-t flex w-full justify-between">
                                  <Input
                                    value={leadCustomValue}
                                    onChange={(e) =>
                                      setLeadCustomValue(e.target.value)
                                    }
                                    placeholder="Enter leadTaluk..."
                                    className="w-8/12 border-[1px] hover:bg-gray-200"
                                    autoFocus
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <button
                                    onClick={addLeadCustomValue}
                                    className="w-3/12 border-[1px] rounded-lg text-xs"
                                  >
                                    Send
                                  </button>
                                </div>
                              </div>
                            )}
                          >
                            {selectedLeadTaluks?.map((item, ind) => (
                              <Option key={ind.toString()} value={item}>
                                {item}
                              </Option>
                            ))}
                            {
                              <Option
                                key={`${data?.data?.length}`}
                                value={leadOptionFee}
                              >
                                {leadOptionFee}
                              </Option>
                            }{" "}
                          </Select>
                        </Form.Item>
                      )}
                    />
                  </div>
                  <div className="w-[100%] lg:w-[38%] mt-3 lg:mt-0 flex items-center justify-between flex-col lg:flex-row">
                    <label htmlFor="" className="w-[100%] lg:w-[10%] mb-2">
                      lead Panchayat
                    </label>
                    <Controller
                      name="leadPanchayat"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Form.Item
                          className="flex flex-col w-full lg:w-[68%]"
                          validateStatus={errors?.panchayat ? "error" : ""}
                          help={errors?.panchayat?.message}
                        >
                          {" "}
                          <Select
                            {...field}
                            onChange={handleLeadStateChangePanchayat}
                            disabled={isLeadPanchayatDisabled}
                            id="leadPanchayat"
                            className="custom-select mt-1 w-full h-10"
                            suffixIcon={
                              <IoMdArrowDropdown style={{ fontSize: "18px" }} />
                            }
                            dropdownRender={(menu) => (
                              <div>
                                {menu}
                                <div className="p-2 border-t flex w-full justify-between">
                                  <Input
                                    value={leaCustomValuePanchayat}
                                    onChange={(e) =>
                                      setLeadCustomValuePanchayat(
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter leadPanchayat..."
                                    className="w-8/12 border-[1px] hover:bg-gray-200"
                                    autoFocus
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <button
                                    onClick={addLeadCustomValuePanchayat}
                                    className="w-3/12 border-[1px] rounded-lg text-xs"
                                  >
                                    send
                                  </button>
                                </div>
                              </div>
                            )}
                          >
                            {selectedPanchayat?.map((item, ind) => (
                              <Option key={ind.toString()} value={item}>
                                {item}
                              </Option>
                            ))}
                            {
                              <Option
                                key={`${data?.data?.length}`}
                                value={optionLeadFeePanchayat}
                              >
                                {optionLeadFeePanchayat}
                              </Option>
                            }
                          </Select>
                        </Form.Item>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mt-2 lg:mt-6 lg:mb-6">
              <div
                onClick={handleDiscard}
                className="px-4 h-[40px] bg-[#F1F5F9] text-[#0F172A] rounded-md text-[14px] mr-1 cursor-pointer  flex justify-center items-center"
              >
                Discard
              </div>
              <button
                disabled={isPending}
                className="px-4 h-[40px] text-white rounded-md bg-[#1E293B] flex items-center text-[14px] ml-2"
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
export default FranchiseCreate;
