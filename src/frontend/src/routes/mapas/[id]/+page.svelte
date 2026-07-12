<script>
    import { SvelteFlow,Background, MiniMap, Controls, Panel } from '@xyflow/svelte';
    import '@xyflow/svelte/dist/style.css';
    

    import TreeNode from '../../customNodes/TreeNode.svelte';
    import { onMount } from 'svelte';
	import { page } from '$app/state';


    const BASE_URL_API="/api/v1";

    const nodeTypes={treeNode:TreeNode};


    //Resize flow

    let size=$state('100vw');

    //Datos grafo
    let id=$derived(page.params.id);

    let nodes=$state.raw([]);
    let edges=$state.raw([]);
    let name=$state("");

    //Datos Nodo
    let selectedNodeData=$state(null);
    let selectedNodeId=$state(null);


    //Funciones-----------------------------------------

    function handleNodeClick({node, event}){
        selectedNodeData=node.data;
        selectedNodeId=node.id;

        
    }




    async function loadTree(){
        let res=await fetch(BASE_URL_API+`/graphs/${id}`,{method:'GET'});
        let data=await res.json();

        //console.log(data);
        nodes=data.nodes;
        edges=data.edges;
        name=data.name;
    }


    function resize(){
        size='50vh';
        console.log(size);
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

    onMount(()=>{
        loadTree();
    });


</script>



<div class="bg-blue-100 ">

    <div class="bg-amber-300 text-2xl">
    <button onclick={resize} class="hover:bg-amber-600">Resize</button>

    </div>




    <div class="border-2">
        <h1 class="text-5xl text-blue-600 font-bold  mb-10">{name}</h1>

        <div style:width={size} style:height='80vh' >
            <SvelteFlow bind:nodes bind:edges {nodeTypes} fitView oninit={()=>{console.log('Initiated');}}
                onnodeclick={handleNodeClick}>

                <Background/>
                    
                <Controls/>
                    

                <Panel position='bottom-right'>
                    <MiniMap/>
                </Panel>

            </SvelteFlow>

        </div>

    </div>


    {#if selectedNodeData}
    <div class="mu-25  m-10 bg-gray-500 border-2 rounded-2xl">
        <h1 class="text-4xl font-extrabold text-blue-600">{selectedNodeData.title}</h1>

        <div class="text-2xl font-semibold font-sans m-8">

                <p>{selectedNodeData.description}</p>

        </div>

        {#if selectedNodeData.completed}
            <div class="m-5">
                <button class="bg-red-400 font-extrabold rounded-3xl w-2xl h-1.5x1 hover:text-white" onclick={()=>{
                    uncompleteSuccesors(selectedNodeId);

                }}>Marcar Como No Completado</button>

            </div>

        {:else}


            <div class="m-5">
                <button class="bg-green-400 font-extrabold rounded-3xl w-2xl h-1.5x1 hover:text-white" onclick={()=>{
                    let father=searchFather(selectedNodeId, nodes, edges);
                    if(!father || father?.data.completed){
                        completeNode(selectedNodeId)
                    }
                }}>Marcar Como Completado</button>

            </div>



        {/if}
    </div>
    {/if}


    

</div>