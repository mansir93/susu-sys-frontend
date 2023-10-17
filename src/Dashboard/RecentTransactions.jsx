import React, { useEffect, useState } from "react";

import { useAxios } from "../utils/ApiHook";

const RecentTransactions = () => {
  const { data, error, isLoading, ApiRequest } = useAxios();
  const [Transactions, setTransactions] = useState([]);
  useEffect(() => {
    ApiRequest("/transactions/recent", "GET", null, null);
  }, []);

  useEffect(() => {
    if (data) {
      setTransactions(data);
    }
  }, [data, Transactions]);
  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
          </tr>
        </thead>{" "}
        <tbody>
          {Transactions?.map((transaction, i) => (
            <tr
              key={1}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{transaction?.type}</td>
              <td className="px-6 py-4">{transaction?.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;
