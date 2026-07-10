
<script>

let {id,name,image}=$props();
</script>


<a href="./mapas/{id}" class="border-4 flex w-fit rounded-2xl ">
    <div class="bg-amber-200 flex items-center justify-center">
        <h3 class="font-bold text-2xl ">{name}</h3>
        <img src={image} alt="Imagen de Portada" width="600px" height="600px">
    </div>
</a>