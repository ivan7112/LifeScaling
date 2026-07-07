<script>
    import {Handle,Position, useSvelteFlow} from '@xyflow/svelte';
    

    let {id,data}=$props();

    let color = $derived(data.completed ? '#2bfb79' : '#e15f5f');
    

    const { updateNodeData, getNodes, getEdges } = useSvelteFlow();

    let dialog; //Para el Popup



//Funciones


function completionCohererence(nodes,edges){ //Si source incompleto target tambien. Presuponemos árbol conexo

    
    for (let i=0;i<nodes.length;i++){
        let father=searchFather(nodes[i].id, nodes,edges);
        //console.log(searchFather(nodes[i].id, nodes,edges));
        if(nodes[i].data.completed && father && !(father.data.completed)){
             
           
            updateNodeData(nodes[i].id,{completed:false});
            
        }
    }
    

}


function searchFather(nodeId, nodes, edges){
    
    
    
    let fatherId=edges.find(e=>e.target===nodeId)?.source;

   

    let father=nodes.find(n=>n.id===fatherId);

    
    

    if(father) return father;
    else return null; 


}


function completeTask(nodeId){

    let estado=getNodes().find(e=>e.id===nodeId)?.data.completed;
    
    if(estado) estado=false;
    else estado=true;

    
    updateNodeData(nodeId,{completed:estado});
    
    completionCohererence(getNodes(), getEdges());



}




</script>

 <div class="handle-container">
    <Handle type="source" position={Position.Top} id="source" />
    <Handle type="target" position={Position.Top} id="target" />
  </div>
<div  id="circularNode" style:background-color={color}> 
    
    <div>
        <button  class="text-3x1 font-bold" onclick={()=>{dialog.showModal()}}>{data.label}</button>
    </div>
</div>


<dialog id='popup' bind:this={dialog} class="items-end">
    <h1>Título Tarea</h1>

    <div>
        <h2>Descripción Tarea</h2>
    </div>

    {#if !getNodes().find(e=>e.id===id)?.data.completed}
    <button onclick={() => {
        completeTask(id);
        dialog.close();
        }}>Completar Tarea</button>


    {:else}
    <button onclick={() => {
        completeTask(id);
        dialog.close();
        }}>Descompletar Tarea</button>
    {/if}

</dialog>


<style>

#circularNode{
    border-style: solid;
    border-radius: 50px;
    padding: 15px;
   
    
}


</style>