import { useCallback, useEffect, useState } from "react";
import { fetchServerData } from "../../../utilis/fetchDataUtilis";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  ControlButton,
  Controls,
  Edge,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

function DepartmentOrgChart() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  async function initData() {
    const res = await fetchServerData("/department/list");

    let a = 0;
    const initialNodes = res.map((v: any) => {
      // console.log(v);

      a += 70;

      // let x = Math.floor(Math.random() * 200);
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerWidth;
      // x = Math.random() >= 0.5 ? x * -1 : x;
      return {
        id: v.id + "",
        // type: "input",
        data: { label: `${v.department_name}` },
        position: { x: x, y: a },
      };
    });

    // console.log("initialNodes:", initialNodes);
    setNodes(initialNodes);

    let initialEdges = [];
    for (let v of res) {
      if (v.father_department_id !== null) {
        // console.log(v);
        initialEdges.push({
          id: `e${v.id}-${v.father_department_id}`,
          source: v.father_department_id + "",
          type: "step",
          target: v.id + "",
        });
      }
    }

    // console.log("initialEdges:", initialEdges);
    setEdges(initialEdges);
  }

  useEffect(() => {
    initData();
  }, []);

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
      <div style={{ width: "100%", height: "95vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          attributionPosition="top-right"
        >
          <Controls position={"top-right"} />
          <MiniMap zoomable pannable />
        </ReactFlow>
      </div>
    </>
  );
}

export default DepartmentOrgChart;
