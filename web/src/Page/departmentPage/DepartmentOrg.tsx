import { log } from "console";
import React, { Children, useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { fetchServerData } from "../../../utilis/fetchDataUtilis";
import OrgChartDiv from "./OrgChartDiv";

const ExampleTree = () => (
  <Tree label={<div>Root</div>}>
    <TreeNode label={<div>Child 1</div>}>
      <TreeNode label={<div>Grand Child</div>} />
    </TreeNode>
  </Tree>
);

type Node = {
  id: number;
  name: string;
  parent_id?: number;
  parentNode?: Node;
  children?: Node[];
};

const data = {
  name: "donny",
  post: "on9 jai",
  children: [
    {
      name: "donny2",
      post: "on9 jai",
      children: [
        {
          name: "donny3",
          post: "on9 jai",
        },
      ],
    },
    {
      name: "donny2",
      post: "on9 jai",
      children: [
        {
          name: "donny3",
          post: "on9 jai",
        },
      ],
    },
  ],
};
const [department, setDepartment] = useState([
  {
    id: "",
    department_name: "",
    father_department_id: "",
  },
]);

export const StyledTreeExample = () => (
  <Tree
    lineWidth={"2px"}
    lineColor={"green"}
    lineBorderRadius={"10px"}
    label={<OrgChartDiv name="donny" post="on9 jai" />}
  >
    <TreeNode label={<OrgChartDiv name="donny" post="on9 jai" />}>
      <TreeNode label={<OrgChartDiv name="donny" post="on9 jai" />} />
    </TreeNode>
  </Tree>
);
