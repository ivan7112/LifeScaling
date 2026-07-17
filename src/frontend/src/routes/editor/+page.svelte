<script>
	import { SvelteFlow, Background, Panel, MiniMap, Controls } from "@xyflow/svelte";
	import TreeNode from "../customNodes/TreeNode.svelte";
    import '@xyflow/svelte/dist/style.css';

const nodeTypes={treeNode:TreeNode};

let nodes=$state.raw([{id:'1', position:{x:20,y:20}, 
data:{label:'A', completed:'false', title:'Hacer webos', description:'Pela el webo'},
 type:'treeNode'}]);


let edges=$state.raw([]);
</script>


<div class="bg-blue-200">

    <h1 class="text-3xl font-extrabold text-red-400">Map Editor</h1>

    <div style:width='70vw' style:height='80vh'>
        <SvelteFlow bind:nodes bind:edges {nodeTypes} fitView oninit={()=>{console.log('Initiated');}}>

            <Background/>
            
            <Controls/>
            

            <Panel position='bottom-right'>
                <MiniMap/>
            </Panel>
        </SvelteFlow>
    </div>
</div>



