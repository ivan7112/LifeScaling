
<script>

let {id,name,image}=$props();
</script>


<a href="./mapas/{id}" class="border-4 flex w-fit rounded-2xl m-8  ">
    <div class="bg-amber-200 flex items-center justify-center hover:text-red-300 hover:bg-gray-700">
        <h3 class="font-bold text-2xl p-10 ">{name}</h3>
        <img src={image} alt="Imagen de Portada" width="200px" height="200px">
    </div>
</a>