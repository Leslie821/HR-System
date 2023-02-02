import { useCallback, useEffect, useState } from "react";
import { fetchServerData } from "../../../utilis/fetchDataUtilis";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },

  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
];

function DepartmentOrgChart() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  async function initData() {
    const res = await fetchServerData("/department/list");
    console.log("res: ", res);

    let a = 0;
    const initialNodes = res.map((v: any) => {
      a += 150;
      return {
        id: v.id + "",
        // type: "input",
        data: { label: `${v.department_name}` },
        position: { x: 0, y: a },
      };
    });

    console.log("initialNodes:", initialNodes);
    setNodes(initialNodes);

    let initialEdges = [];
    for (let v of res) {
      if (v.father_department_id !== null) {
        console.log(v);

        // initialEdges.push({
        //   id: `e${v.id}-${v.father_department_id}`,
        //   source: v.id + "",
        //   target: v.father_department_id + "",
        // });
        initialEdges.push({
          id: `e-1-2`,
          source: v.id + "",
          target: v.father_department_id + "",
        });
      }
    }

    console.log("initialEdges:", initialEdges);
    setEdges(initialEdges);

    // const initialEdges = res.map((v: any) => {
    //   console.log(v);

    //   if (v.father_department_id[0].includes(null)) {
    //     v.father_department_id[0].replace(null, 0);

    //     return {
    //       id: `e${v.id}-${v.father_department_id}`,
    //       source: v.id,
    //       target: v.father_department_id,
    //     };
    //   } else {
    //     return {
    //       id: `e${v.id}-${v.father_department_id}`,
    //       source: v.id,
    //       target: v.father_department_id,
    //     };
    //   }
    // });
  }

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    console.log("nodes", nodes);
  }, [nodes]);

  useEffect(() => {
    console.log("edges", edges);
  }, [edges]);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return (
    <>
      <div style={{ width: "100%", height: "50vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        >
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  );
}

export default DepartmentOrgChart;
