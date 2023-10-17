import React, { useEffect, useState, useMemo } from "react";
import { useAxios } from "../utils/ApiHook";
import Swal from "sweetalert2";
import isEqual from "lodash/isEqual";

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
import CustomerModal from "../Components/CustomerModal";
import AddcustomerModal from "../Components/AddcustomerModal";

const Customers = () => {
  const [openCustomer, setOpenCustomer] = useState(false);
  const [addCustomer, setAddCustomer] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setselectedCustomer] = useState("");
  const [params, setParams] = useState({
    name: "",
    email: "",
    id: "",
    sortBy: "",
    sortOrder: "",
    page: 1,
  });
  // console.log(params);
  const { data, isLoading, ApiRequest } = useAxios();
  // console.log(data);

  useEffect(() => {
    ApiRequest("/customers/", "GET", null, params);
  }, [params, customers, addCustomer]);

  useEffect(() => {
    if (data && !isEqual(data.customers, customers)) {
      setCustomers(data.customers);
    }
  }, [data]);

  const deletecustomer = (id) => {
    ApiRequest("/customers/" + id, "DELETE", null, null);
  };

  const TABLE_HEAD = ["Customer", "Email", "Phone No.", "Action", ""];

  return (
    <div>
      <Card className="h- full w-full mt-12 ">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex items-center justify-between gap-6">
            <div>
              <Typography variant="h5" color="blue-gray">
                Customers list
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                color="blue"
                className="flex items-center gap-3"
                size="sm"
                onClick={() => setAddCustomer(true)}
              >
                Add Customer
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <select
                label=" Sort By:"
                value={params.sortBy}
                onChange={(e) =>
                  setParams({ ...params, sortBy: e.target.value })
                }
                className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="fullName">Name</option>
                <option value="createdAt">Creation Date</option>
              </select>
            </div>
            <div className="w-full md:w-72">
              <select
                label=" Sort By:"
                value={params.sortOrder}
                onChange={(e) =>
                  setParams({ ...params, sortOrder: e.target.value })
                }
                className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="w-full md:w-72">
              <Input
                label="id"
                icon={""}
                color="blue"
                onChange={(e) => setParams({ ...params, id: e.target.value })}
              />
            </div>
            <div className="w-full md:w-72">
              <Input
                label="name"
                icon={""}
                color="blue"
                onChange={(e) => setParams({ ...params, name: e.target.value })}
              />
            </div>
            <div className="w-full md:w-72">
              <Input
                label="email"
                icon={""}
                color="blue"
                onChange={(e) =>
                  setParams({ ...params, email: e.target.value })
                }
              />
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
              {customers?.map((customer, index) => {
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
                            {customer.fullName}
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
                          {customer.email}
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
                          {customer.phoneNumber}
                        </Typography>
                      </div>
                    </td>

                    <td>
                      <Tooltip content={customer.fullName}>
                        <IconButton
                          variant="text"
                          onClick={() => {
                            setOpenCustomer(true);
                            setselectedCustomer(customer._id);
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
                                deletecustomer(customer._id);
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
        open={openCustomer}
        handler={() => setOpenCustomer(!openCustomer)}
      >
        {" "}
        <DialogHeader>
          <div className="w-full flex justify-between items-center px-2">
            <h1>Customer Details</h1>
            <Button
              variant="text"
              color="red"
              onClick={() => setOpenCustomer(false)}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
          </div>
        </DialogHeader>
        <CustomerModal
          id={selectedCustomer}
          setOpenCustomer={setOpenCustomer}
          openCustomer={openCustomer}
        />
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={() => setOpenCustomer(false)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog
        size="xs"
        open={addCustomer}
        handler={() => setAddCustomer(!addCustomer)}
        className="bg-transparent shadow-none"
      >
        <AddcustomerModal
          setAddCustomer={setAddCustomer}
          addCustomer={addCustomer}
        />{" "}
      </Dialog>
    </div>
  );
};

export default Customers;
