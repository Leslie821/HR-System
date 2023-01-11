import EmployeeInfoForm from "./Page/EmployeeInfoForm"




function EmployeeInfo() {
  return (
    <div>
      {/* <EmployeeInfoForm mode="create"/> */}
      <EmployeeInfoForm mode="edit" data={{ name: "tom" }} />

    </div>
  )
}
    export default EmployeeInfo