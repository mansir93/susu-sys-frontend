import { FaUserCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useAxios } from "../utils/ApiHook";
import CustomerTransactions from "./CustomerTransactions";
import isEqual from "lodash/isEqual";

const CustomerModal = ({ id, setOpenCustomer, openCustomer }) => {
  const { data, isLoading, ApiRequest } = useAxios();
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    ApiRequest("/customers/" + id, "GET", null, null);
  }, [customer]);

  useEffect(() => {
    if (data && !isEqual(data, customer)) {
      setCustomer(data);
    }
  }, [data]);
  // console.log(customer);
  return (
    <div className="w-full h-96">
      <div className="w-full flex p-4">
        <FaUserCircle size={100} />
        <div className="flex-1">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Account Balance
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
                  {customer.fullName}
                </th>
                <td className="px-6 py-4">{customer?.email}</td>
                <td className="px-6 py-4">{customer?.phoneNumber}</td>
                <td className="px-6 py-4">{customer?.accountBalance}</td>
                <td className="px-6 py-4">{customer?.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <CustomerTransactions
        id={id}
        setOpenCustomer={setOpenCustomer}
        openCustomer={openCustomer}
      />
    </div>
  );
};

export default CustomerModal;
