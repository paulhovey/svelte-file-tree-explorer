<script>
	import Icon from 'svelte-awesome'
	import { exclamationCircle } from 'svelte-awesome/icons'
	/**
	 * @typedef {Object} Props
	 * @property {string} [error]
	 */

	/** @type {Props} */
	let { error = '' } = $props();
</script>

<style>
	div {
		margin-left: 1rem;
		padding-left: 1.5rem;
		position: relative;
	}
	div :global(svg) {
		position: absolute;
		left: 0;
		top: -0.2rem;
		color: red;
	}
</style>

<div>
	<Icon data={ exclamationCircle } />
	there was an error { JSON.stringify(error) }
</div>
