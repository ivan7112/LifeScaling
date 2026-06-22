<script>
    import { SvelteFlow,Background, MiniMap, Controls, Panel } from '@xyflow/svelte';
    import '@xyflow/svelte/dist/style.css';

    import TreeNode from '../../customNodes/TreeNode.svelte';
    import { onMount } from 'svelte';
	import { page } from '$app/state';


    const BASE_URL_API="/api/v1";

    const nodeTypes={treeNode:TreeNode};


    //Datos grafo
    let id=page.params.id;

    let nodes=$state.raw();
    let edges=$state.raw();
    let name=$state("");

    async function loadTree(){
        let res=await fetch(BASE_URL_API+`/graphs/${id}`,{method:'GET'});
        let data=await res.json();

        nodes=data.nodes;
        edges=data.edges;
        name=data.name;
    }

    onMount(()=>{
        //loadTree();
    })
</script>

<h1>{name}</h1>

<div>
    <SvelteFlow bind:nodes bind:edges {nodeTypes} fitView oninit={()=>{console.log('Initiated');}}>
        <Background/>
            
            <Controls/>
            

            <Panel position='bottom-right'>
                <MiniMap/>
            </Panel>
    </SvelteFlow>
</div>