import { useEffect } from "react";
import { useState } from "react";
import {
  BarChart,
  XAxis,
  Legend,
  Bar,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { getTotalUsersProducts } from "../../../services/apiService";
import "./Dashboard.scss";
import { toast } from "react-toastify";

const Dashboard = () => {


  const [totalUsersProducts, setTotalUsersProducts] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(()=>{
    fetchDataUser();
    
  },[])

  const fetchDataUser = async() => {
    try{
      let res = await getTotalUsersProducts();
      console.log(res);
      if(res && res.data && res.status === 200){
        setTotalUsersProducts(res.data);

        let Pr = 0, Tus = 0, Us = 0, Mo = 0, Ad = 0;
        Pr = res?.data?.totalProducts ?? 0;
        Tus = res?.data?.totalUsers ?? 0;
        Us = res?.data?.roleUsers ?? 0;
        Mo = res?.data?.roleModerators ?? 0;
        Ad = res?.data?.roleAdmins ?? 0;
        const data = [
          {
            "name": "Product",
            "Pr" : Pr,
          },
          {
              "name": "Total Users",
              "Tus" : Tus,
          },
          {
            "name": "USER",
            "Us" : Us,
        },
        {
          "name": "MODERATOR",
          "Mo" : Mo,
      },
      {
        "name": "ADMIN",
        "Ad" : Ad,
    },
        ];
        setDataChart(data);
      }
    }catch(err){
      toast.error("Get total failed");
    }
  }

  return (
    <div className="dashboard-container">
      <div className="title">Analytics Dashboard</div>
      <div className="content">
        <div className="c-left">
          <div className="child"><span className="text-1">Total users</span><span className="text-2">{
            totalUsersProducts && totalUsersProducts.totalUsers ?
            <>{totalUsersProducts.totalUsers}</>
            :
            <>0</>
          }</span></div>
          <div className="child"><span className="text-1">Total products</span><span className="text-2">{
                        totalUsersProducts && totalUsersProducts.totalProducts ?
                        <>{totalUsersProducts.totalProducts}</>
                        :
                        <>0</>
          }</span></div>
        </div>
        <div className="c-right">
            <ResponsiveContainer width="95%" height={"100%"}>
          <BarChart width={400} height={300} data={dataChart}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Pr" fill="#8884d8" />
            <Bar dataKey="Tus" fill="#00FFFF" />
            <Bar dataKey="Us" fill="#5F9EA0" />
            <Bar dataKey="Mo" fill="#7FFF00" />
            <Bar dataKey="Ad" fill="#D2691E" />
          </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
