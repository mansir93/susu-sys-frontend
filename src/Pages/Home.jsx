import React, { useEffect, useState } from "react";
import { useAxios } from "../utils/ApiHook";
import AdminDashboard from "../Dashboard/AdminDashboard";

const Home = () => {
  const { data, error, isLoading, ApiRequest } = useAxios();
  const [counts, setCounts] = useState({});

  useEffect(() => {
    ApiRequest("/counts/", "GET", null, null);
  }, []);
  // console.log(counts);
  useEffect(() => {
    if (data) {
      setCounts(data.counts);
    }
  }, [data]);
  return (
    <div className="mt-20">
      <AdminDashboard counts={counts} loading={isLoading} />
    </div>
  );
};

export default Home;
