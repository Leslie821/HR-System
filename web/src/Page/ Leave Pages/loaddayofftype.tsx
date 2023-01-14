
type ItemProps = {
    item: string;
}

export function Loaddayoff(props: ItemProps) {

    return (
        <>
            <option value={props.item}>{props.item}</option>
        </>
    )
}