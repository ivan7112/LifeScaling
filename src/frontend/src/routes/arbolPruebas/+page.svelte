<script>
import { SvelteFlow,Background, MiniMap, Controls, Panel } from '@xyflow/svelte';
import '@xyflow/svelte/dist/style.css';

import TreeNode from '../customNodes/TreeNode.svelte';
import { onMount } from 'svelte';

import '../../../global.css';




const nodeTypes={treeNode:TreeNode};

let nodes=$state.raw([{id:'1', position:{x:0,y:0},data:{label:'A', completed:true, title:'Hacer patatas', description:'Pela las papas y frielas'}, type:'treeNode'},
    {id:'2', position:{x:100,y:100},data:{label:'B',completed:true, title:'Hacer webos', description:'Pela el webo'}, type:'treeNode'}
]);

let edges=$state.raw([
{id:'e1-2', source:'1',target:'2', sourceHandle:'source', targetHandle:'target', type:'smoothstep'  } //1 padre de 2. Si 1 incompleto 2 tambien

]);




//Datos Nodo
let selectedNodeData=$state(null);
let selectedNodeId=$state(null);


//Funciones-----------------------------------------

function handleNodeClick({node, event}){
    selectedNodeData=node.data;
    selectedNodeId=node.id;
   

    
}


function searchFather(nodeId, nodes, edges){
    let fatherId=edges.find(e=>e.target===nodeId)?.source;
    let father=nodes.find(n=>n.id===fatherId);
    if(father) return father;
    else return null; 
    }



function searchChildrenIds(nodeId, nodes, edges){
        

        let childrenIds=edges.filter(e=> e.source===nodeId).map(e=>e.target);

        return childrenIds;

        
}


function completeNode(nodeId){
    nodes=nodes.map(n=>n.id===nodeId ? {... n , data: {... n.data, completed:true}}: n);
}

function uncompleteNode(nodeId){
    nodes=nodes.map(n=>n.id===nodeId ? {... n , data: {... n.data, completed:false}}: n);
}


function uncompleteSuccesors(nodeId){ //Pasa a incompleto un nodo y sus hijos

    let childrenIds=searchChildrenIds(nodeId,nodes,edges);

    //Caso base
    uncompleteNode(nodeId);
    
    if(!(childrenIds.length===0)){ 
        
   
        for(let i=0; i<childrenIds.length;i++){

            uncompleteSuccesors(childrenIds[i]);

        }
    }

}

</script>









<div  class="bg-amber-50 ">

    <h1 class=" text-blue-500 text-7xl font-bold font-serif">Pruebas</h1>

    <div style:width='100vw' style:height='80vh'>
        <SvelteFlow bind:nodes bind:edges {nodeTypes} fitView oninit={()=>{console.log('Initiated');}} 
        onnodeclick={handleNodeClick}>

            <Background/>
            
            <Controls/>
            

            <Panel position='bottom-right'>
                <MiniMap/>
            </Panel>
        </SvelteFlow>
    </div>



    {#if selectedNodeData}
    <div class="mu-25  m-10 bg-gray-500 border-2 rounded-2xl">
        <h1 class="text-4xl font-extrabold text-blue-600">{selectedNodeData.title}</h1>

        <div class="text-2xl font-semibold font-sans m-8">

                <p>{selectedNodeData.description}</p>

        </div>

        {#if selectedNodeData.completed}
            <div class="m-5">
                <button class="bg-red-400 font-extrabold rounded-3xl w-2xl h-1.5x1 hover:text-white" 
                onclick={()=>{

                    uncompleteSuccesors(selectedNodeId);

                }}>Marcar Como No Completado</button>

            </div>

        {:else}


            <div class="m-5">
                <button class="bg-green-400 font-extrabold rounded-3xl w-2xl h-1.5x1 hover:text-white" onclick={()=>{
                    let father=searchFather(selectedNodeId, nodes, edges);
                    if(!father || father?.data.completed){
                       completeNode(selectedNodeId);
                    }
                }}>Marcar Como Completado</button>

            </div>



        {/if}
    </div>
    {/if}

</div>
