<script>
import { SvelteFlow,Background, MiniMap, Controls, Panel, useSvelteFlow } from '@xyflow/svelte';
import '@xyflow/svelte/dist/style.css';

import TreeNode from '../customNodes/TreeNode.svelte';
import { onMount } from 'svelte';

import '../../../global.css';

const { screenToFlowPosition } = useSvelteFlow();


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

//Datos para el POST

let graphname=$state("");
let imagelink=$state("");


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


function getMaxId(nodes){
    let ids=nodes.map(n=>parseInt(n.id));
    
    return Math.max(...ids);
}

const  handleOnconnectEnd=(event, connectionState) => {

    if(connectionState.isValid) return;

    let newId=getMaxId(nodes) +1;

   

    let sourceId=connectionState.fromNode?.id || '1';


    const { clientX, clientY } =
      'changedTouches' in event ? event.changedTouches[0] : event;

    let newNode= {id:newId.toString(),
    
        position: screenToFlowPosition({
        x: clientX,
        y: clientY,
      }),
    
        data:{label:'X', title:'newTitle', description:'newDesc' ,completed:false},
    
        type:'treeNode'
    };

    let newEdge={id:'e'+sourceId+'-'+newId.toString(), 
                source:sourceId,
                target:newId.toString(),
                sourceHandle:'source',
                targetHandle:'target',
                type: 'smoothstep'
    }

    nodes=[... nodes, newNode];

    edges=[... edges, newEdge];

    //console.log(nodes);
    //console.log(edges);


}



const postMap= async (nodes, edges, graphname, imagelink) =>{

    let body={
        'nodes':nodes,
        'edges':edges,
        'name':graphname,
        'image':imagelink
    }

    //console.log(body);

    try{
    await fetch('/api/v1/graphs', {method:'POST', body:JSON.stringify(body), 
        headers:{'Content-Type':'application/json'}});
    }catch(e){

        console.log(e);
    }
    
}




</script>











<div  class="bg-amber-50 ">

    <h1 class=" text-blue-500 text-7xl font-bold font-serif">Pruebas</h1>

    <div style:width='100vw' style:height='80vh'>
        <SvelteFlow bind:nodes bind:edges {nodeTypes} fitView oninit={()=>{console.log('Initiated');}} 
        onnodeclick={handleNodeClick}
        onconnectend={handleOnconnectEnd} >
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

    <div class="m-10 mb-50 font-bold text-2x1 text-blue-500 col-end-1">

        <div class="m-10 ">
            <label for="graphimage">Cover Image</label>
            <input class="border-2 text-black" id="graphimage" type="text" bind:value={imagelink} alt="Select an Image">
        </div>

        <div class="m-10 ">
            <label for="graphname">Map Name</label>
            <input class="border-2 text-black" id="graphname" type="text" bind:value={graphname}>
        </div>

        <button onclick={()=>{
            postMap(nodes,edges,graphname,imagelink);
        }}>Publish Map</button>


    </div>

</div>


