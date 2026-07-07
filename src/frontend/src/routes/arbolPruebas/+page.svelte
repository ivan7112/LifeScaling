<script>
import { SvelteFlow,Background, MiniMap, Controls, Panel } from '@xyflow/svelte';
import '@xyflow/svelte/dist/style.css';

import TreeNode from '../customNodes/TreeNode.svelte';
import { onMount } from 'svelte';




const nodeTypes={treeNode:TreeNode};

let nodes=$state.raw([{id:'1', position:{x:0,y:0},data:{label:'A', completed:false}, type:'treeNode'},
    {id:'2', position:{x:100,y:100},data:{label:'B',completed:true}, type:'treeNode'}
]);

let edges=$state.raw([
{id:'e1-2', source:'1',target:'2', sourceHandle:'source', targetHandle:'target', type:'smoothstep'  } //1 padre de 2. Si 1 incompleto 2 tambien

]);







//Funciones-----------------------------------------



</script>









<div id="Main" class="bg-amber-50">

    <h1 class=" text-blue-500 text-7xl font-bold font-serif">Pruebas</h1>

    <div style:width='100vw' style:height='80vh'>
        <SvelteFlow bind:nodes bind:edges {nodeTypes} fitView oninit={()=>{console.log('Initiated');}}>
            <Background/>
            
            <Controls/>
            

            <Panel position='bottom-right'>
                <MiniMap/>
            </Panel>
        </SvelteFlow>
    </div>

</div>
