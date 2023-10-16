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

const AddcustomerModal = ({ setAddCustomer, addCustomer }) => {
  const { data, isLoading, ApiRequest } = useAxios();

  const [formdata, setfordata] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
//   console.log(formdata);
  const handlechange = (e) => {
    setfordata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    ApiRequest("/customers/", "POST", formdata, null);
  };
  useEffect(() => {
    if (data) {
      setAddCustomer(!addCustomer);
    }
  }, [data]);

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
              Add Customer
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="full Name"
              size="lg"
              color="blue"
              name="fullName"
              onChange={handlechange}
            />
            <Input
              label="Email"
              size="lg"
              color="blue"
              name="email"
              onChange={handlechange}
            />
            <Input
              label="Phone Number"
              size="lg"
              color="blue"
              name="phoneNumber"
              onChange={handlechange}
            />
            <Input
              label="Address"
              size="lg"
              color="blue"
              name="address"
              onChange={handlechange}
            />
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

export default AddcustomerModal;
