import EmployeeInfoForm  from './EmployeeFunction';
import { EmployeeInfoFormProps } from './EmployeeFunction';

export function EmployeeInfoEdit (props: EmployeeInfoFormProps){

    return (
        
    <>
        <EmployeeInfoForm mode={'edit'} data={{name : "tom"}}/>
    </>
    )
}