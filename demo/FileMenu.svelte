<script>
	import FileExplorer from '../src/FileExplorer.svelte'

	let {
		files,
		icons,
		expanded,
		selected
	} = $props();
</script>

<FileExplorer
	{ files }
	{ icons }
	{ expanded }
	{ selected }
/>
