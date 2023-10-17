import React, { useEffect, useState } from "react";
import { useAxios } from "../utils/ApiHook";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Dialog,
} from "@material-tailwind/react";
import AddTransactionModal from "./AddTransactionModal";
// import TransactionModal from "../Components/TransactionModal";

const CustomerTransactions = ({ id, setOpenCustomer, openCustomer }) => {
  const [addTransaction, setAddTransaction] = useState(false);
  const [Transactions, setTransactions] = useState([]);
  const [params, setParams] = useState({
    type: "",
    amount: null,
    customerId: id,
  });
  // console.log(params);
  const { data, error, isLoading, ApiRequest } = useAxios();
  // console.log(data);

  useEffect(() => {
    if (data) {
      setTransactions(data.transactions);
    }
  }, [data]);

  useEffect(() => {
    ApiRequest("/transactions/", "GET", null, params);
  }, [params]);

  const TABLE_HEAD = ["Transaction ID", "Amount", "Type", "Staff Name", ""];

  return (
    <div>
      <Card className="w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Typography variant="h5" color="blue-gray">
                Transactions list
              </Typography>
            </div>
            <div className="w-full md:w-72">
              <Input
                label="Amount"
                icon={"i"}
                color="blue"
                onChange={(e) =>
                  setParams({ ...params, amount: e.target.value })
                }
              />
            </div>

            <div className="w-full md:w-72">
              <select
                label="Type"
                value={params.sortBy}
                onChange={(e) => setParams({ ...params, type: e.target.value })}
                className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
              </select>
            </div>
            <div className="w-full md:w-72">
              <Button
                color="blue"
                // className="flex items-center gap-3"
                size="sm"
                onClick={() => setAddTransaction(true)}
              >
                Add Transaction
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-100/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="uppercase font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Transactions?.slice(0, 5).map((Transaction, index) => {
                return (
                  <tr key={index} className=" border-b border-blue-gray-400">
                    <td className=" p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {Transaction?._id}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Transaction?.amount}
                        </Typography>
                      </div>
                    </td>

                    <td>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {Transaction?.type}
                        </Typography>
                      </div>
                    </td>

                    <td>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {Transaction?.staffId?.firstName}
                        </Typography>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Dialog
        size="xs"
        open={addTransaction}
        handler={() => setAddTransaction(!addTransaction)}
        className="bg-transparent shadow-none"
      >
        <AddTransactionModal
          setAddTransaction={setAddTransaction}
          addTransaction={addTransaction}
          id={id}
          setOpenCustomer={setOpenCustomer}
          openCustomer={openCustomer}
        />{" "}
      </Dialog>
    </div>
  );
};

export default CustomerTransactions;
