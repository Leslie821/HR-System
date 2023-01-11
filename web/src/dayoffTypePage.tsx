import { Container, Group, Table } from "@mantine/core";
import { useStyleTable } from "./Page/StaffsList";

const info = [{
    day_off_name: "dfssdf",
    short_form: "sdfsdf",
    one_time_dayoff: "sdfsd",
    paid_leaver: "sdfsd"
}, {
    day_off_name: "dfssdf",
    short_form: "sdfsdf",
    one_time_dayoff: "sdfsd",
    paid_leaver: "sdfsd"
}]


export function DayoffType() {
    const { classes } = useStyleTable();

    const result = info.map((e) => (
        <tr key={e.day_off_name}>
            <th>{e.day_off_name}</th>
            <th>{e.short_form}</th>
            <th>{e.one_time_dayoff}</th>
            <th>{e.paid_leaver}</th>

        </tr>
    ))
    return (
        <>
            <Group className={classes.body}>
                <Table>
                    <thead>
                        <th>Day Off Name</th>
                        <th>Short Form</th>
                        <th>One-time Dayoff</th>
                        <th>Paid leave / No Paid leave </th>
                    </thead>
                </Table>
            </Group>


            <div>
                <tbody>{result}</tbody>
            </div>



        </>
    )
}