<script>
    import {Handle,Position} from '@xyflow/svelte';


    let {id,data,completed}=$props();

    let color=$state();
    if (completed) color= '#2bfb79';
    else color='#e15f5f';

    
</script>

 <div class="handle-container">
    <Handle type="source" position={Position.Bottom} id="source-1" />
    <Handle type="source" position={Position.Bottom} id="source-2" />
  </div>
<div  id="circularNode" style:background-color={color}> 
    {data.label}
</div>


<style>

#circularNode{
    border-style: solid;
    border-radius: 50px;
    padding: 15px;
   
    
}


</style>