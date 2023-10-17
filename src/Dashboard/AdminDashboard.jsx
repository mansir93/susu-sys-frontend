import { GiTakeMyMoney } from "react-icons/gi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BiTransferAlt } from "react-icons/bi";
import { GiPayMoney } from "react-icons/gi";
import { MdSwitchAccount } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";
import BarChart from "./BarChart";
import { Spinner } from "@material-tailwind/react";
import RecentTransactions from "./RecentTransactions";

const AdminDashboard = ({ counts, loading }) => {
  return (
    <div>
      <div className="my-4 flex gap-2 flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        <div className="flex-1 flex items-center gap-4 bg-white rounded-3xl shadow-xl px-8 py-4">
          <div className="text-6xl text-blue-600  font-bold">
            <MdAccountBalance />
          </div>
          <div>
            <h1 className="text-xl text-blue-600  font-bold">
              {loading ? <Spinner color="blue" /> : counts?.totalAccountBalance}
            </h1>
            <p>Total Account Balance</p>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-4 bg-white rounded-3xl shadow-xl px-8 py-4">
          <div className="text-6xl text-blue-600  font-bold">
            <MdSwitchAccount />
          </div>
          <div>
            {" "}
            <h1 className="text-xl text-blue-600  font-bold">
              {loading ? <Spinner color="blue" /> : counts?.totalCustomers}
            </h1>
            <p>Total Customers</p>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-4 bg-white rounded-3xl shadow-xl px-8 py-4">
          <div className="text-6xl text-blue-600  font-bold">
            <GiTakeMyMoney />
          </div>
          <div>
            {" "}
            <h1 className="text-xl text-blue-600  font-bold">
              {loading ? (
                <Spinner color="blue" />
              ) : (
                counts?.averageAccountBalance
              )}
            </h1>
            <p> Average Account Balance</p>
          </div>
        </div>
      </div>
      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        <div className="flex-1 flex items-center gap-4 bg-white rounded-3xl shadow-xl px-8 py-4">
          <div className="text-6xl text-blue-600  font-bold">
            <GiPayMoney />
          </div>
          <div>
            {" "}
            <h1 className="text-xl text-blue-600  font-bold">
              {loading ? <Spinner color="blue" /> : counts?.totalDeposits}
            </h1>
            <p>Total Deposits</p>{" "}
          </div>
        </div>
        <div className="flex-1 flex items-center gap-4 bg-white rounded-3xl shadow-xl px-8 py-4">
          <div className="text-6xl text-blue-600  font-bold">
            <BiTransferAlt />{" "}
          </div>
          <div>
            {" "}
            <h1 className="text-xl text-blue-600  font-bold">
              {loading ? <Spinner color="blue" /> : counts?.totalTransactions}
            </h1>
            <p>Total Transactions</p>{" "}
          </div>
        </div>
        <div className="flex-1 flex items-center gap-4 bg-white rounded-3xl shadow-xl px-8 py-4">
          <div className="text-6xl text-blue-600  font-bold">
            <BiMoneyWithdraw />{" "}
          </div>
          <div>
            {" "}
            <h1 className="text-xl text-blue-600  font-bold">
              {loading ? <Spinner color="blue" /> : counts?.totalWithdrawals}
            </h1>
            <p>Total Withdrawals</p>
          </div>
        </div>
      </div>

      <div className="my-4 flex flex-col  2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4 w-full">
        <div className="flex-1 bg-white rounded-lg shadow-xl px-8">
          {loading ? <Spinner color="blue" /> : <BarChart counts={counts} />}
        </div>
        <div className=" bg-white rounded-lg shadow-xl px-8">
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
