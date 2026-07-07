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

<div class="bg-gray-100">
    <h1 class="text-5xl text-blue-600 font-bold  mb-10">Mapas</h1>

    <div class="grid grid-cols-3">

        {#each graphs as tree}

        <a href="./mapas/{tree._id}" class="border-4 flex w-fit rounded-2xl ">
        <div class="bg-amber-200 flex items-center justify-center">
            <h3 class="font-bold text-2xl ">{tree.name}</h3>
            <img src={tree.image} alt="Imagen de Portada" width="600px" height="600px">
        </div>
        </a>
        {/each }
    </div>

</div>

