import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { useAxios } from "../utils/ApiHook";

const AddTransactionModal = ({
  id,
  setAddTransaction,
  addTransaction,
  setOpenCustomer,
  openCustomer,
}) => {
  const { data, error, isLoading, ApiRequest } = useAxios();

  const [formdata, setfordata] = useState({
    customerId: id,
    amount: "",
    type: "deposit",
  });
//   console.log(formdata);
  const handlechange = (e) => {
    setfordata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    ApiRequest("/transactions/", "POST", formdata, null);
  };
  useEffect(() => {
    if (data || error) {
      setAddTransaction(!addTransaction);
      setOpenCustomer(!openCustomer);
    }
  }, [data, error]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Add Transaction
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Amount"
              size="lg"
              color="blue"
              name="amount"
              onChange={handlechange}
            />
            <div className="w-full md:w-72">
              <select
                label="Type"
                name="type"
                onChange={handlechange}
                className="w-full bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
              >
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
              </select>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" color="blue" variant="gradient" fullWidth>
              Add
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default AddTransactionModal;
