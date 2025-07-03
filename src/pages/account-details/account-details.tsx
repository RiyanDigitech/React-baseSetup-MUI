import { UserInfo } from "@/lib/types/user";
import tokenService from "@/services/token.service";
import { Form, Input, Spin } from "antd";
// import { Option } from "antd/es/mentions";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
// import { IoMdArrowDropdown } from "react-icons/io";
import { PiClockClockwiseBold } from "react-icons/pi";
import AuthService from "@/services/auth.service";
import { FaSlack } from "react-icons/fa";
// import LocationseService from "@/services/location/location";
const AccountDetails = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [monitoring, setMonitoring] = useState<boolean>(true);
  const [profileImages, setProfileImages] = useState<string | undefined>(
    undefined
  );

  const {
    control,
    setValue, // Add this
    trigger, // Add this
    // watch,
    formState: { isDirty, dirtyFields },
    handleSubmit,
    reset,
  } = useForm<UserInfo>();
  const { useHandleUpdateProfile, useFetchTargetedAdmin } = AuthService();
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Ensure files exist
    if (file) {
      // const reader = new FileReader();
      // reader.onload = () => {
      setSelectedFile(file);
      setMonitoring(false); // Cast result to string
      // setValue("image", reader?.result as string, {
      //   shouldDirty: true,
      // });
      // trigger("image");
      // setValue("image", reader?.result as string, {
      //   shouldDirty: true,
      // });
      //      // };
      // reader.readAsDataURL(file);
    }
  };
  const { mutate, isPending } = useHandleUpdateProfile();
  const { data, isLoading } = useFetchTargetedAdmin();
  console.log("data", data);

  const onSubmit: SubmitHandler<UserInfo> = (data) => {
    const updatedData = new FormData(); // Create FormData instance

    // Append form fields only if they were modified
    Object.keys(data).forEach((key) => {
      if (dirtyFields[key as keyof UserInfo]) {
        updatedData.append(key, data[key as keyof UserInfo] as string);
      }
    });

    if (selectedFile) {
      updatedData.append("image", selectedFile);
    }

    mutate(updatedData as unknown as UserInfo);
    setMonitoring(true);
  };
  useEffect(() => {
    if (data?.data) {
      reset({
        username: data?.data?.username,
        phone: data?.data?.phone,
        email: data?.data?.email,
        address: data?.data?.details?.address,
      });
    }
    setProfileImages(data?.data?.image || "");
  }, [reset, data?.data]);
  const handleDiscard = () => {
    reset();
  };
  console.log("last data", tokenService.getLastUserData()?.id);
  return (
    <>
      {isLoading ? (
        <Spin
          size="large"
          className="custom-table-spinner p-2 flex justify-center"
        />
      ) : (
        <Form
          onFinish={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="bg-white h-screen p-5 lg:p-11 font-DMSans"
        >
          {" "}
          <div className="flex justify-between w-full items-center mb-6  flex-col lg:flex-row">
            <div className="font-DMSans">
              <div className="text-[#0F172A] text-lg font-medium">
                Account Details
              </div>
              <div className="text-[#475569] text-sm">
                Showing The Account Details
              </div>
            </div>
          </div>
          <div className="flex mt-3 max-sm:justify-between">
            <div className="text-[#0F172A] font-DMSans font-medium">
              Profile Picture
            </div>

            <div className="flex lg:ml-6 items-center">
              <>
                {" "}
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : profileImages
                  }
                  alt="Profile"
                  className=" h-20 w-20 rounded-3xl"
                />
              </>
              <div className="text-[#FF6820] ml-4 font-DMSans font-medium lg:translate-y-3 cursor-pointer">
                <label className="cursor-pointer">
                  Change Profile Picture
                  <input
                    type="file"
                    accept="image/*"
                    className=" cursor-default invisible"
                    onChange={handleImageChange}
                  />
                </label>
              </div>{" "}
            </div>
          </div>
          <div className="mt-8 w-full lg:w-10/12 lg:flex justify-between">
            <div className=" w-full lg:w-full lg:flex justify-between items-center">
              <label
                htmlFor="firstname"
                className="w-full lg:w-fit text-[#1E293B] font-DMSans font-medium"
              >
                User Name
              </label>{" "}
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-full lg:w-[85%]">
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter Your Name..."
                      className="w-[100%] rounded-t-none border-x-0 border-t-0 border-b-[1px] border-[#cbd5e1] rounded-none h-[42px]"
                    />
                  </div>
                )}
              />
            </div>
          </div>{" "}
          <div className="mt-8 w-full lg:w-10/12 lg:flex justify-between">
            <div className=" w-full lg:w-full lg:flex justify-between items-center">
              <label
                htmlFor="email"
                className="w-full lg:w-fit text-[#1E293B] font-DMSans font-medium"
              >
                Email
              </label>{" "}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-full lg:w-[85%]">
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter Your emai..."
                      className="w-[100%] rounded-t-none border-x-0 border-t-0 border-b-[1px] border-[#cbd5e1] rounded-none h-[42px]"
                    />
                  </div>
                )}
              />
            </div>
          </div>{" "}
          <div className="mt-8 w-full lg:w-10/12 lg:flex justify-between">
            <div className=" w-full lg:w-full lg:flex justify-between items-center">
              <label
                htmlFor="phone"
                className="w-full lg:w-fit text-[#1E293B] font-DMSans font-medium"
              >
                phone
              </label>{" "}
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-full lg:w-[85%]">
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter Your phone..."
                      className="w-[100%] rounded-t-none border-x-0 border-t-0 border-b-[1px] border-[#cbd5e1] rounded-none h-[42px]"
                    />
                  </div>
                )}
              />
            </div>
          </div>{" "}
          <div className="flex mt-2 lg:mt-8">
            {" "}
            <button
              type="button"
              onClick={handleDiscard}
              className="px-4 h-[40px] bg-[#F1F5F9] text-[#0F172A] rounded-md text-[14px] mr-1"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={!(isDirty || !monitoring)} // Button enabled if any one is true
              className={`px-4 h-[40px] text-white rounded-md  flex items-center text-[14px] ml-2  ${
                !(isDirty || !monitoring)
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#1E293B]"
              }`}
            >
              <PiClockClockwiseBold className="text-xl mr-2 text-[#CBD5E1]" />
              {isPending ? <Spin /> : "Update"}
            </button>
          </div>
        </Form>
      )}
    </>
  );
};

export default AccountDetails;
