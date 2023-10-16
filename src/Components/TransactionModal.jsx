import { FaUserCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useAxios } from "../utils/ApiHook";

const TransactionModal = ({ id, setOpenTransaction, openTransaction }) => {
  const { data, isLoading, ApiRequest } = useAxios();
  const [Transaction, setTransaction] = useState({});

  useEffect(() => {
    ApiRequest("/transactions/" + id, "GET", null, null);
  }, [Transaction]);

  useEffect(() => {
    if (data) {
      setTransaction(data);
    }
  }, [data]);
  // console.log(Transaction);
  return (
    <div className="w-full h-96">
      <div className="w-full flex p-4">
        <div className="flex-1">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>{" "}
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{Transaction?._id}</td>
                <td className="px-6 py-4">{Transaction?.amount}</td>
                <td className="px-6 py-4">{Transaction?.type}</td>
                <td className="px-6 py-4">
                  {Transaction?.customerId?.fullName}
                </td>
              </tr>
            </tbody>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <caption className="px-6 py-3">Customer</caption>
              <tr>
                <th scope="col" className="px-6 py-3">
                  Full name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  phoneNumber
                </th>

                <th scope="col" className="px-6 py-3">
                  Address
                </th>
              </tr>
            </thead>{" "}
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {Transaction?.customerId?.fullName}
                </th>
                <td className="px-6 py-4">{Transaction?.customerId?.email}</td>
                <td className="px-6 py-4">
                  {Transaction?.customerId?.phoneNumber}
                </td>

                <td className="px-6 py-4">
                  {Transaction?.customerId?.address}
                </td>
              </tr>
            </tbody>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <caption className="px-6 py-3">Staff</caption>
              <tr>
                <th scope="col" className="px-6 py-3">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  phoneNumber
                </th>
              </tr>
            </thead>{" "}
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {Transaction?.staffId?.firstName}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {Transaction?.staffId?.lastName}
                </th>
                <td className="px-6 py-4">{Transaction?.staffId?.email}</td>
                <td className="px-6 py-4">
                  {Transaction?.staffId?.phoneNumber}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
