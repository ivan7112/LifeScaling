<script>
	import { onMount } from "svelte";
    

 


    const BASE_URL_API="/api/v1";

    let graphs=$state([]);

    onMount(()=>{
        loadGraphs();
    })


//-------------------------------------
    async function loadGraphs(){
        let res=await fetch(BASE_URL_API+'/graphs');
        let data=await res.json();

        graphs=data;
    }

    
</script>


<h1>Mapas</h1>

<div>

    {#each graphs as tree}
    <a href="./mapas/{tree._id}">
    <div class="graphContainer">
        <h3>{tree.name}</h3>
        <img src={tree.image} alt="Imagen de Portada" width="100px" height="100px">
    </div>
    </a>
    {/each }
</div>

<style>
    
    .graphContainer{
        border-style: groove;
        border-width: 10px;
        border-color: black;
        
    }
</style>