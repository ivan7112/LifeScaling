<script>
import { SvelteFlow,Background, MiniMap, Controls, Panel } from '@xyflow/svelte';
import '@xyflow/svelte/dist/style.css';

import TreeNode from '../customNodes/TreeNode.svelte';



const nodeTypes={treeNode:TreeNode};

let nodes=$state.raw([{id:'1', position:{x:0,y:0},data:{label:'B', completed:false}, type:'treeNode'},
    {id:'2', position:{x:100,y:100},data:{label:'A'}}
]);

let edges=$state.raw([
{id:'e1-2', source:'1',target:'2'}

]);


</script>


<div id="Main">

    <h1>Pruebas</h1>

    <div style:width='100vw' style:height='100vh'>
        <SvelteFlow bind:nodes bind:edges {nodeTypes} fitView>
            <Background/>
            
            <Controls/>
            <Panel position='top-left'>
                <div>
                    <p>By Iván</p>
                </div>
            </Panel>

            <Panel position='bottom-right'>
                <MiniMap/>
            </Panel>
        </SvelteFlow>
    </div>

</div>
