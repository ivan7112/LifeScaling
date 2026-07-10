<script>
	import { onMount } from "svelte";
    import Tarjeta from "./Tarjeta.svelte";
    

 


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

<div class="bg-gray-100">

    <h1 class="text-5xl text-blue-600 font-bold  mb-10">Mapas</h1>

    <div class="grid grid-cols-3">

        {#each graphs as tree}
        <Tarjeta id={tree._id} name={tree.name} image={tree.image} />
        {/each }
    </div>

</div>

