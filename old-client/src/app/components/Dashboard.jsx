import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { getDoctors } from "../../data/therepy";
import { profile } from "../../data/user";

export default function Dashboard() {
  async function getDashboardData() {
    const response = await profile();
    const doctors = await getDoctors();
    console.log(response, doctors);
  }
  useEffect(() => {
    getDashboardData()
  }, [])
  return (
    <Heading color="orange.500">Dashboard</Heading>
  );
  }
