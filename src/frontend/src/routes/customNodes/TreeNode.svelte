<script>
    import {Handle,Position, useSvelteFlow} from '@xyflow/svelte';
   
    

    let {id,data}=$props();

    let color = $derived(data.completed ? '#2bfb79' : '#e15f5f');
    

    const { updateNodeData, getNodes, getEdges } = useSvelteFlow();

    let dialog; //Para el Popup

    //Evento para enviar datos al componente padre

    



//Funciones













</script>

 <div class="handle-container">

    <Handle type="source" position={Position.Top} id="source" />
    <Handle type="target" position={Position.Top} id="target" />

 </div>

<div  id="circularNode" style:background-color={color}> 
    
    <p class="text-2xl">{data.label}</p>
</div>














<style>

#circularNode{
    border-style: solid;
    border-radius: 50px;
    padding: 15px;
   
    
}


</style>