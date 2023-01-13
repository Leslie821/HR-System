import EmployeeInfoForm  from './EmployeeFunction';
import { EmployeeInfoFormProps } from './EmployeeFunction';

export function NewEmployee (props: EmployeeInfoFormProps){

    return (
        
    <>
        <EmployeeInfoForm mode={'create'}/>
    </>
    )
}

