<script>
	import { SvelteFlowProvider } from "@xyflow/svelte";
	import Pruebas from "./Pruebas.svelte";

//hemos de envolver el componente de esta forma para poder usar el hook.

</script>


<SvelteFlowProvider>
    <Pruebas />
</SvelteFlowProvider>
