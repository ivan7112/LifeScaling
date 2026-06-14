<script>
    import {Handle,Position, useSvelteFlow} from '@xyflow/svelte';
    

    let {id,data}=$props();

    const color = $derived(data.completed ? '#2bfb79' : '#e15f5f');
    

    const { updateNodeData, getNodes, getEdges } = useSvelteFlow();



//Funciones


function completionCohererence(nodes,edges){ //Si source incompleto target tambien. Presuponemos árbol conexo

    
    for (let i=0;i<nodes.length;i++){
        
        if(nodes[i].data.completed && !(searchFather(nodes[i], nodes, edges)?.data?.completed)){
            
            //nodes[i].data.completed=false;
            updateNodeData(nodes[i].id,{completed:false});
            
        }
    }
    

}


function searchFather(nodeId, nodes, edges){
    
    
    
    let fatherId=edges.find(e=>e.target===nodeId)?.source;

   

    let father=nodes.find(n=>n.id===fatherId);

    
    

    if(father) return father;
    else return {}; 


}




</script>

 <div class="handle-container">
    <Handle type="source" position={Position.Top} id="source" />
    <Handle type="target" position={Position.Top} id="target" />
  </div>
<div  id="circularNode" style:background-color={color}> 
    {data.label}
    <div>
        <button onclick={()=>{
            
           completionCohererence(getNodes(), getEdges());
           console.log(searchFather(id,getNodes(), getEdges()));
        }}>Show Father in Console
        </button>
    </div>
</div>


<style>

#circularNode{
    border-style: solid;
    border-radius: 50px;
    padding: 15px;
   
    
}


</style>