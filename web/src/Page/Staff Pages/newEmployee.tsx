import { Container } from '@mantine/core';
import EmployeeInfoForm  from './EmployeeFunction';
import { EmployeeInfoFormProps } from './EmployeeFunction';

export function NewEmployee (props: EmployeeInfoFormProps){

    return (
        
    <Container size={800}>
        <EmployeeInfoForm mode={'create'}/>
    </Container>
    )
}

