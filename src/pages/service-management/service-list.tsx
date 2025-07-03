import { Input, Table, Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import ServiceManagementService from "@/services/servicemanagement/service-management";
// import { resourceLimits } from "worker_threads";
import ServiceListTableColumns from "@/components/modules/service/service-list-table";
import { ServiceListType } from "@/lib/types/service";
const ServiceList = () => {
  const [limit, setFranchiseLimit] = useState<number>(5);
  const [page, setServiceCurrentPage] = useState<number>(1);
  const [test, setTest] = useState([]);
  const [query, setServiceQuery] = useState<string | undefined>(undefined);
  const [changes, setChanges] = useState(true);
  const navigate = useNavigate();
  const { useFetchAllServices } = ServiceManagementService();
  const {
    data: serviceData,
    isLoading: isServiceDataLoading,
    refetch,
  } = useFetchAllServices(limit, page, query, changes);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      console.log("selectedRowKeys: ", selectedRowKeys);
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  console.log(serviceData?.data?.length, "serviceData");
  const handleButtonClick = () => {
    navigate("/add-new-service");
  };
  const handlePageChange = (page: number, pageSize?: number) => {
    setServiceCurrentPage(page);
    if (pageSize) setFranchiseLimit(pageSize);
  };
  const totalResults = serviceData?.total || 0;
  const showTotal = (total: number) =>
    `Page ${Math.min(page, totalResults)} of ${total} Results`;
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServiceQuery(e.target.value);
  };
  const { columns, modal } = ServiceListTableColumns(refetch, setChanges);

  useEffect(() => {
    console.log("changes reflected", changes);
    refetch();
  }, [changes, refetch]);
  return (
    <div className="p-5">
      <div className="flex justify-between items-center flex-wrap md:flex-nowrap">
        {" "}
        <div className="border-b-[1px]">
          <Input
            onChange={handleSearchChange}
            placeholder="search service..."
            prefix={<img src="/preffixsearch.png" />}
            className="border-none bg-[#f8fafc] pl-2"
          />
        </div>
        <div className="flex items-center rounded-lg max-sm:mt-2">
          <div
            onClick={handleButtonClick} // Add navigation here
            className="border-[#E2E8F0] border-[1px] flex items-center bg-white p-2 rounded-lg cursor-pointer"
          >
            <div>
              <FiPlus className="text-[#64748B]" />
            </div>
            <div>
              <div className="pl-2 text-[#475569] font-DMSans">Add New</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Table<ServiceListType>
          columns={columns}
          dataSource={
            serviceData?.data?.length
              ? serviceData?.data?.map((service) => ({
                  ...service,
                  key: service.id,
                }))
              : test
          }
          loading={{
            spinning: isServiceDataLoading,
            indicator: (
              <div className="flex items-center justify-center">
                <Spin
                  className="custom-table-spinner"
                  size="large"
                  style={{ color: "#008444" }}
                />
              </div>
            ),
          }}
          pagination={false}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          className="overflow-auto border-[1px] rounded-lg mt-7  bg-white franchise-table"
        />
        {modal}
      </div>
      <div className=" flex justify-between items-center mt-4  flex-col md:flex-row">
        <div className="text-sm text-gray-600 mb-5 md:mb-0">
          {showTotal(totalResults)}
        </div>
        <Pagination
          current={page}
          pageSize={limit}
          total={totalResults}
          onChange={handlePageChange}
          showSizeChanger={false}
          size="small"
        />
      </div>
    </div>
  );
};
export default ServiceList;
