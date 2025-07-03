import { Input, Pagination, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import "../../index.css";
import ComplaintService from "@/services/complaint/complaint";
import ComolaintListTableColumns from "@/components/modules/complaint/complaint-list-table";
import { Complaint } from "@/lib/types/complaint";
import tokenService from "@/services/token.service";
import FormulaInput from "./checking-formula";
import MathFormulaForm from "./checking-formula";
import ReactMathQuillForm from "./checking-formula";
import AdvancedFormulaEditor from "./checking-formula";
const FranchiseComplaintList = () => {
  const LoginPersonId = tokenService?.getLastUserData()?.email;

  const { useFetchAllComplaint } = ComplaintService();
  const [limit, setFranchiseLimit] = useState<number>(5);
  const [page, setFranchiseCurrentPage] = useState<number>(1);
  const [query, setFranchiseQuery] = useState<string | undefined>(undefined);
  const [email, setUSerId] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (LoginPersonId) {
      setUSerId(LoginPersonId);
    }
  }, [LoginPersonId]);
  const { data: complaintData, isLoading: iscomplaintDataLoading } =
    useFetchAllComplaint(limit, page, query, email);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      console.log("selectedRowKeys: ", selectedRowKeys);
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  const handlePageChange = (page: number, pageSize?: number) => {
    setFranchiseCurrentPage(page);
    if (pageSize) setFranchiseLimit(pageSize);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFranchiseQuery(e.target.value);
  };

  const totalResults = complaintData?.total || 0;
  const showTotal = (total: number) =>
    `Page ${Math.min(page, totalResults)} of ${total} Results`;
  console.log("LoginPersonId", LoginPersonId);
  return (
    <div className="p-5">
      <div className="flex justify-between items-center flex-wrap md:flex-nowrap">
        {" "}
        <div className="border-b-[1px] max-sm:w-full">
          <Input
            // size="large"
            placeholder="Search complaint"
            prefix={<img src="/preffixsearch.png" />}
            onChange={handleSearchChange}
            className="border-none bg-[#f8fafc] pl-2"
          />
        </div>
      </div>
      <Table<Complaint>
        columns={ComolaintListTableColumns()}
        dataSource={complaintData?.data?.map((team, ind) => ({
          ...team,
          key: ind,
        }))}
        loading={{
          spinning: iscomplaintDataLoading,
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
      />{" "}
      <div className=" flex justify-between items-center mt-4  flex-col md:flex-row">
        <div className="text-sm text-gray-600 mb-5 md:mb-0">
          {showTotal(totalResults)}
        </div>
        <Pagination
          current={page}
          pageSize={limit}
          total={totalResults}
          onChange={handlePageChange}
          showSizeChanger={false} // Enable page size changer
          size="small"
        />
      </div>
      {/* <AdvancedFormulaEditor /> */}
    </div>
  );
};

export default FranchiseComplaintList;
