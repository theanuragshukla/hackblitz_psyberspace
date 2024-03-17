import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getDoctors } from "../../data/therepy";
import { profile } from "../../data/user";

export default function Therapists() {
  const [doctors, setDoctors] = useState([]);
  async function getDashboardData() {
    const response = await profile();
    const { status, msg, data } = await getDoctors();
    if (status) {
      setDoctors(data);
    }
  }
  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <Heading color="orange.500">Therapists</Heading>
  );
}
