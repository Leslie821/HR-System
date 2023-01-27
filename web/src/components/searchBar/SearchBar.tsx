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
      console.log(query);

      const res = await fetch(
        `http://localhost:3000` + apiPath + `?q=${query}`
      );

      const data = await res.json();
      console.log("DATA", data);

      setBackData(data);
    } catch (error) {
      console.log(error);
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
