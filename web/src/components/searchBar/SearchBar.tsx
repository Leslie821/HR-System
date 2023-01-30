import { Input } from "@mantine/core";
import { useEffect, useState } from "react";
import StaffsList from "../../Page/Staff Pages/StaffsList";

interface SearchBarProps {
  apiPath: string;
  setBackData: Function;
}

export function SearchBar({ apiPath, setBackData }: SearchBarProps) {
  const [initData, setInitData] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3000` + apiPath + `${query}`);
      console.log("query:", query);

      const data = await res.json();
      console.log("DATA", data);

      const usersAddStatus = data.map((v: any) => {
        if (v.termination_date == null) {
          return {
            ...v,
            status: "Active",
          };
        } else {
          return {
            ...v,
            status: "Inactive",
          };
        }
      });

      setBackData(usersAddStatus);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    if (initData) {
      setInitData(false);
      return;
    }

    fetchData();
  }, [query]);

  return (
    <>
      <Input
        style={{ marginBottom: 8 }}
        placeholder="Search me"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      ></Input>
    </>
  );
}

export default SearchBar;
