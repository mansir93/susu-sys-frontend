import React, { useEffect, useState } from "react";
import { useAxios } from "../utils/ApiHook";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Dialog,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import Swal from "sweetalert2";

import TransactionModal from "../Components/TransactionModal";

const Transactions = () => {
  const [openTransaction, setOpenTransaction] = useState(false);
  const [Transactions, setTransactions] = useState([]);
  const [selectedTransaction, setselectedTransaction] = useState("");
  const [params, setParams] = useState({
    id: "",
    type: "",
    staffId: "",
    amount: null,
    page: 1,
    customerId: "",
  });
  const { data, error, isLoading, ApiRequest } = useAxios();

  useEffect(() => {
    if (data && data.transactions !== Transactions) {
      setTransactions(data.transactions);
    }
  }, [data, Transactions]);

  useEffect(() => {
    ApiRequest("/transactions/", "GET", null, params);
  }, [params, Transactions]);

  const deleteTransaction = (id) => {
    console.log(id);
    ApiRequest("/transactions/" + id, "DELETE", null, null);
  };

  const TABLE_HEAD = [
    "Transaction ID",
    "Amount",
    "Type",
    "Customer Name",
    "Staff Name",
    "Action",
    "",
  ];

  return (
    <div>
      <Card className="h- full w-full mt-12 ">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex items-center justify-between gap-6">
            <div>
              <Typography variant="h5" color="blue-gray">
                Transactions list
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Transactions ID"
                icon={"i"}
                color="blue"
                onChange={(e) => setParams({ ...params, id: e.target.value })}
              />
            </div>
            <div className="w-full md:w-72">
              <Input
                label="customer ID"
                icon={"i"}
                color="blue"
                onChange={(e) =>
                  setParams({ ...params, customerId: e.target.value })
                }
              />
            </div>
            <div className="w-full md:w-72">
              <Input
                label="staff ID"
                icon={"i"}
                color="blue"
                onChange={(e) =>
                  setParams({ ...params, staffId: e.target.value })
                }
              />
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
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Transactions?.map((Transaction, index) => {
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
                            {Transaction._id}
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
                          {Transaction.amount}
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
                          {Transaction.type}
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
                          {Transaction?.customerId?.fullName}
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
                          {Transaction.staffId.firstName}
                        </Typography>
                      </div>
                    </td>

                    <td>
                      <Tooltip content={Transaction?.customerId.fullName}>
                        <IconButton
                          variant="text"
                          onClick={() => {
                            setOpenTransaction(true);
                            setselectedTransaction(Transaction._id);
                          }}
                        >
                          open
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="delete">
                        <IconButton
                          variant="text"
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteTransaction(Transaction._id);
                              }
                            });
                          }}
                        >
                          Del
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {params?.page} of {data?.Pages}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              color="blue"
              size="sm"
              onClick={() => setParams({ ...params, page: params.page - 1 })}
              disabled={params.page < data?.Pages || !data?.Pages}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              color="blue"
              onClick={() => setParams({ ...params, page: params.page + 1 })}
              disabled={params.page === data?.Pages || !data?.Pages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Dialog
        dismiss={{ enabled: false }}
        size="xl"
        open={openTransaction}
        handler={() => setOpenTransaction(!openTransaction)}
      >
        {" "}
        <DialogHeader>
          <div className="w-full flex justify-between items-center px-2">
            <h1>Transaction Details</h1>
            <Button
              variant="text"
              color="red"
              onClick={() => setOpenTransaction(false)}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
          </div>
        </DialogHeader>
        <TransactionModal
          id={selectedTransaction}
          setOpenTransaction={setOpenTransaction}
          openTransaction={openTransaction}
        />
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={() => setOpenTransaction(false)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Transactions;
