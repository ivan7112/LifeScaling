<script>
    import {Handle,Position, useNodeConnections, useSvelteFlow, NodeResizer} from '@xyflow/svelte';
   
    

    let {id,data, selected}=$props();

    let color = $derived(data.completed ? '#2bfb79' : '#e15f5f');
    

    const { updateNodeData, getNodes, getEdges } = useSvelteFlow();

   
    //Limitación para quer solo pueda tener un solo  padre
   let connections=useNodeConnections({handleType:'target'});

   let isConnectable=$derived(connections.current.length===0 && !(id==='1'));

   

    



//Funciones













</script>



 <div class="handle-container">
    
    <Handle type="source" position={Position.Bottom} id="source"   />
    <Handle type="target" position={Position.Top} id="target" {isConnectable} />
    
 </div>

<div  id="circularNode" style:background-color={color}> 

    
    
    <p class="text-2xl">{data.label}</p>
</div>








<style>

#circularNode{
    border-style: solid;
    border-radius: 5px;
    padding: 15px;
   
    
}


</style>