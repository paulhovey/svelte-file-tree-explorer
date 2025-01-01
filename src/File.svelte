<script>
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import Icon from 'svelte-awesome'
	import { file } from 'svelte-awesome/icons'

	/**
	 * @typedef {Object} Props
	 * @property {string} [name]
	 * @property {boolean} [selected]
	 * @property {any} icons
	 */

	/** @type {Props} */
	let { name = '', selected = false, icons } = $props();

	let extension = $derived(name && name.split('.').pop())
</script>

<style>
	button:hover {
		background-color: lightgray;
	}
	div {
		padding-left: 1rem;
	}
</style>

<div>
	<button class:selected onclick={bubble('click')}>
		<Icon data={ icons && icons(extension) || file } />
		{ name }
	</button>
</div>
