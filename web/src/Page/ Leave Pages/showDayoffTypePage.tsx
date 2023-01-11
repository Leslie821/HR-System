import { Button, Container, Group, Table } from "@mantine/core";
import { useStyleTable } from "../Staff Pages/StaffsList";
import { IconArrowNarrowLeft } from "@tabler/icons";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
// import { useStyleTable } from "./Page/StaffsList";


const columns = [


    {
        name: "Dayoff Name",
        selector: (row: any) => row.dayoff_name,
    },
    {
        name: "Short Form",
        selector: (row: any) => row.short_form,
    },
    {
        name: "One-time Dayoff",
        selector: (row: any) => row.one_time_dayoff,
    },
    {
        name: "Paid leave ?",
        selector: (row: any) => row.paid_leave,
    },

];





export function DayoffType() {
    const [info, setInfo] = useState<any>([
        {
            dayoff_name: "Annual Leave",
            short_form: "AL",
            one_time_dayoff: "Yes",
            paid_leave: "Yes"
        }
    ])
    async function getType() {
        let res = await fetch("/getType", {
            method: "Get",
        })
        const result = await res.json()
        setInfo(result)
    }


    useEffect(() => {
        getType()

    }, [])



    return (
        <div>
            <Group>
                <Group>
                    <Button variant="light">
                        <IconArrowNarrowLeft size={50} stroke={1.5} />
                    </Button>

                    <h2>Leave Type</h2>
                </Group>

                <DataTable columns={columns} data={info} />
                {/* <Table striped withColumnBorders verticalSpacing="md">
      selectableRows
        <thead>{header}</thead>
        <tbody>{info}</tbody>
      </Table> */}
            </Group>
        </div>
    )
}



