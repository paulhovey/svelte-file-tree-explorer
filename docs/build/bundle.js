
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
	'use strict';

	// generated during release, do not modify
	const PUBLIC_VERSION = '5';

	if (typeof window !== 'undefined')
		// @ts-ignore
		(window.__svelte ||= { v: new Set() }).v.add(PUBLIC_VERSION);

	const EACH_ITEM_REACTIVE = 1;
	const EACH_INDEX_REACTIVE = 1 << 1;
	/** See EachBlock interface metadata.is_controlled for an explanation what this is */
	const EACH_IS_CONTROLLED = 1 << 2;
	const EACH_IS_ANIMATED = 1 << 3;
	const EACH_ITEM_IMMUTABLE = 1 << 4;

	const PROPS_IS_IMMUTABLE = 1;
	const PROPS_IS_RUNES = 1 << 1;
	const PROPS_IS_UPDATED = 1 << 2;
	const PROPS_IS_BINDABLE = 1 << 3;
	const PROPS_IS_LAZY_INITIAL = 1 << 4;

	const TEMPLATE_FRAGMENT = 1;
	const TEMPLATE_USE_IMPORT_NODE = 1 << 1;

	const UNINITIALIZED = Symbol();

	// Dev-time component properties
	const FILENAME = Symbol('filename');

	/**
	 * @param {string} name
	 */
	function is_capture_event(name) {
		return name.endsWith('capture') && name !== 'gotpointercapture' && name !== 'lostpointercapture';
	}

	/** List of Element events that will be delegated */
	const DELEGATED_EVENTS = [
		'beforeinput',
		'click',
		'change',
		'dblclick',
		'contextmenu',
		'focusin',
		'focusout',
		'input',
		'keydown',
		'keyup',
		'mousedown',
		'mousemove',
		'mouseout',
		'mouseover',
		'mouseup',
		'pointerdown',
		'pointermove',
		'pointerout',
		'pointerover',
		'pointerup',
		'touchend',
		'touchmove',
		'touchstart'
	];

	/**
	 * Returns `true` if `event_name` is a delegated event
	 * @param {string} event_name
	 */
	function is_delegated(event_name) {
		return DELEGATED_EVENTS.includes(event_name);
	}

	/**
	 * @type {Record<string, string>}
	 * List of attribute names that should be aliased to their property names
	 * because they behave differently between setting them as an attribute and
	 * setting them as a property.
	 */
	const ATTRIBUTE_ALIASES = {
		// no `class: 'className'` because we handle that separately
		formnovalidate: 'formNoValidate',
		ismap: 'isMap',
		nomodule: 'noModule',
		playsinline: 'playsInline',
		readonly: 'readOnly',
		defaultvalue: 'defaultValue',
		defaultchecked: 'defaultChecked',
		srcobject: 'srcObject'
	};

	/**
	 * @param {string} name
	 */
	function normalize_attribute(name) {
		name = name.toLowerCase();
		return ATTRIBUTE_ALIASES[name] ?? name;
	}

	const node_env = globalThis.process?.env?.NODE_ENV;
	if (!node_env) {
		console.warn('If bundling, conditions should include development or production. If not bundling, conditions or NODE_ENV should include development or production. See https://www.npmjs.com/package/esm-env for tips on setting conditions in popular bundlers and runtimes.');
	}

	var DEV = node_env && !node_env.toLowerCase().includes('prod');

	// Store the references to globals in case someone tries to monkey patch these, causing the below
	// to de-opt (this occurs often when using popular extensions).
	var is_array = Array.isArray;
	var array_from = Array.from;
	var define_property = Object.defineProperty;
	var get_descriptor = Object.getOwnPropertyDescriptor;
	var get_descriptors = Object.getOwnPropertyDescriptors;
	var object_prototype = Object.prototype;
	var array_prototype = Array.prototype;
	var get_prototype_of = Object.getPrototypeOf;

	/**
	 * @param {any} thing
	 * @returns {thing is Function}
	 */
	function is_function(thing) {
		return typeof thing === 'function';
	}

	const noop$1 = () => {};

	// Adapted from https://github.com/then/is-promise/blob/master/index.js
	// Distributed under MIT License https://github.com/then/is-promise/blob/master/LICENSE

	/**
	 * @template [T=any]
	 * @param {any} value
	 * @returns {value is PromiseLike<T>}
	 */
	function is_promise(value) {
		return typeof value?.then === 'function';
	}

	/** @param {Function} fn */
	function run(fn) {
		return fn();
	}

	/** @param {Array<() => void>} arr */
	function run_all(arr) {
		for (var i = 0; i < arr.length; i++) {
			arr[i]();
		}
	}

	const DERIVED = 1 << 1;
	const EFFECT = 1 << 2;
	const RENDER_EFFECT = 1 << 3;
	const BLOCK_EFFECT = 1 << 4;
	const BRANCH_EFFECT = 1 << 5;
	const ROOT_EFFECT = 1 << 6;
	const BOUNDARY_EFFECT = 1 << 7;
	const UNOWNED = 1 << 8;
	const DISCONNECTED = 1 << 9;
	const CLEAN = 1 << 10;
	const DIRTY = 1 << 11;
	const MAYBE_DIRTY = 1 << 12;
	const INERT = 1 << 13;
	const DESTROYED = 1 << 14;
	const EFFECT_RAN = 1 << 15;
	/** 'Transparent' effects do not create a transition boundary */
	const EFFECT_TRANSPARENT = 1 << 16;
	/** Svelte 4 legacy mode props need to be handled with deriveds and be recognized elsewhere, hence the dedicated flag */
	const LEGACY_DERIVED_PROP = 1 << 17;
	const INSPECT_EFFECT = 1 << 18;
	const HEAD_EFFECT = 1 << 19;
	const EFFECT_HAS_DERIVED = 1 << 20;

	const STATE_SYMBOL = Symbol('$state');
	const STATE_SYMBOL_METADATA = Symbol('$state metadata');
	const LEGACY_PROPS = Symbol('legacy props');
	const LOADING_ATTR_SYMBOL = Symbol('');

	/** @import { Equals } from '#client' */
	/** @type {Equals} */
	function equals(value) {
		return value === this.v;
	}

	/**
	 * @param {unknown} a
	 * @param {unknown} b
	 * @returns {boolean}
	 */
	function safe_not_equal(a, b) {
		return a != a
			? b == b
			: a !== b || (a !== null && typeof a === 'object') || typeof a === 'function';
	}

	/** @type {Equals} */
	function safe_equals(value) {
		return !safe_not_equal(value, this.v);
	}

	/* This file is generated by scripts/process-messages/index.js. Do not edit! */

	/**
	 * Component %component% has an export named `%key%` that a consumer component is trying to access using `bind:%key%`, which is disallowed. Instead, use `bind:this` (e.g. `<%name% bind:this={component} />`) and then access the property on the bound component instance (e.g. `component.%key%`)
	 * @param {string} component
	 * @param {string} key
	 * @param {string} name
	 * @returns {never}
	 */
	function bind_invalid_export(component, key, name) {
		if (DEV) {
			const error = new Error(`bind_invalid_export\nComponent ${component} has an export named \`${key}\` that a consumer component is trying to access using \`bind:${key}\`, which is disallowed. Instead, use \`bind:this\` (e.g. \`<${name} bind:this={component} />\`) and then access the property on the bound component instance (e.g. \`component.${key}\`)\nhttps://svelte.dev/e/bind_invalid_export`);

			error.name = 'Svelte error';
			throw error;
		} else {
			throw new Error(`https://svelte.dev/e/bind_invalid_export`);
		}
	}

	/**
	 * A component is attempting to bind to a non-bindable property `%key%` belonging to %component% (i.e. `<%name% bind:%key%={...}>`). To mark a property as bindable: `let { %key% = $bindable() } = $props()`
	 * @param {string} key
	 * @param {string} component
	 * @param {string} name
	 * @returns {never}
	 */
	function bind_not_bindable(key, component, name) {
		if (DEV) {
			const error = new Error(`bind_not_bindable\nA component is attempting to bind to a non-bindable property \`${key}\` belonging to ${component} (i.e. \`<${name} bind:${key}={...}>\`). To mark a property as bindable: \`let { ${key} = $bindable() } = $props()\`\nhttps://svelte.dev/e/bind_not_bindable`);

			error.name = 'Svelte error';
			throw error;
		} else {
			throw new Error(`https://svelte.dev/e/bind_not_bindable`);
		}
	}

	/**
	 * %parent% called `%method%` on an instance of %component%, which is no longer valid in Svelte 5
	 * @param {string} parent
	 * @param {string} method
	 * @param {string} component
	 * @returns {never}
	 */
	function component_api_changed(parent, method, component) {
		if (DEV) {
			const error = new Error(`component_api_changed\n${parent} called \`${method}\` on an instance of ${component}, which is no longer valid in Svelte 5\nhttps://svelte.dev/e/component_api_changed`);

			error.name = 'Svelte error';
			throw error;
		} else {
			throw new Error(`https://svelte.dev/e/component_api_changed`);
		}
	}

	/**
	 * Attempted to instantiate %component% with `new %name%`, which is no longer valid in Svelte 5. If this component is not under your control, set the `compatibility.componentApi` compiler option to `4` to keep it working.
	 * @param {string} component
	 * @param {string} name
	 * @returns {never}
	 */
	function component_api_invalid_new(component, name) {
		if (DEV) {
			const error = new Error(`component_api_invalid_new\nAttempted to instantiate ${component} with \`new ${name}\`, which is no longer valid in Svelte 5. If this component is not under your control, set the \`compatibility.componentApi\` compiler option to \`4\` to keep it working.\nhttps://svelte.dev/e/component_api_invalid_new`);

			error.name = 'Svelte error';
			throw error;
		} else {
			throw new Error(`https://svelte.dev/e/component_api_invalid_new`);
		}
	}

	/**
	 * A derived value cannot reference itself recursively
	 * @returns {never}
	 */
	function derived_references_self() {
		if (DEV) {
			const error = new Error(`derived_references_self\nA derived value cannot reference itself recursively\nhttps://svelte.dev/e/derived_references_self`);

			error.name = 'Svelte error';
			throw error;
		} else {
			throw new Error(`https://svelte.dev/e/derived_references_self`);
		}
	}

	/**
	 * `%rune%` cannot be used inside an effect cleanup function
	 * @param {string} rune
	 * @returns {never}
	 */
	function effect_in_teardown(rune) {
		if (DEV) {
			const error = new Error(`effect_in_teardown\n\`${rune}\` cannot be used inside an effect cleanup function\nhttps://svelte.dev/e/effect_in_teardown`);

			error.name = 'Svelte error';
			throw error;
		} else {
			throw new Error(`https://svelte.dev/e/effect_in_teardown`);
		}
	}

	/**
	 * Effect cannot be created inside a `$derived` value that was not itself created inside an effect
	 * @returns {never}
	 */
	function effect_in_unowned_derived() {
		if (DEV) {
			const error = new Error(`effect_in_unowned_derived\nEffect cannot be created inside a \`$derived\` value that was not itself created inside an effect\nhttps://svelte.dev/e/effect_in_unowned_derived`);

			error.name = 'Svelte error';
			throw error;
		} else {
			throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
		}
	}

	/**
	 * `%rune%` can only be used inside an effect (e.g. during component initialisation)
	 * @param {string} rune
	 * @returns {never}
	 */
	function effect_orphan(rune) {
		if (DEV) {
			const error = new Error(`effect_orphan\n\`${rune}\` can only be used inside an effect (e.g. during component initialisation)\nhttps://svelte.dev/e/effect_orphan`);

			error.name = 'Svelte error';
			throw error;
		} else {
			throw new Error(`https://svelte.dev/e/effect_orphan`);
		}
	}

	/**
	 * Maximum update depth exceeded. This can happen when a reactive block or effect repeatedly sets a new value. Svelte limits the number of nested updates to prevent infinite loops
	 * @returns {never}
	 */
	function effect_update_depth_exceeded() {
		if (DEV) {
			const error = new Error(`effect_update_depth_exceeded\nMaximum update depth exceeded. This can happen when a reactive block or effect repeatedly sets a new value. Svelte limits the number of nested updates to prevent infinite loops\nhttps://svelte.dev/e/effect_update_depth_exceeded`);

			error.name = 'Svelte error';
			throw error;
		} else {
			throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
		}
	}

	/**
	 * Cannot do `bind:%key%={undefined}` when `%key%` has a fallback value
	 * @param {string} key
	 * @returns {never}
	 */
	function props_invalid_value(key) {
		if (DEV) {
			const error = new Error(`props_invalid_value\nCannot do \`bind:${key}={undefined}\` when \`${key}\` has a fallback value\nhttps://svelte.dev/e/props_invalid_value`);

			error.name = 'Svelte error';
			throw error;
		} else {
			throw new Error(`https://svelte.dev/e/props_invalid_value`);
		}
	}

	/**
	 * The `%rune%` rune is only available inside `.svelte` and `.svelte.js/ts` files
	 * @param {string} rune
	 * @returns {never}
	 */
	function rune_outside_svelte(rune) {
		if (DEV) {
			const error = new Error(`rune_outside_svelte\nThe \`${rune}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files\nhttps://svelte.dev/e/rune_outside_svelte`);

			error.name = 'Svelte error';
			throw error;
		} else {
			throw new Error(`https://svelte.dev/e/rune_outside_svelte`);
		}
	}

	/**
	 * Property descriptors defined on `$state` objects must contain `value` and always be `enumerable`, `configurable` and `writable`.
	 * @returns {never}
	 */
	function state_descriptors_fixed() {
		if (DEV) {
			const error = new Error(`state_descriptors_fixed\nProperty descriptors defined on \`$state\` objects must contain \`value\` and always be \`enumerable\`, \`configurable\` and \`writable\`.\nhttps://svelte.dev/e/state_descriptors_fixed`);

			error.name = 'Svelte error';
			throw error;
		} else {
			throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
		}
	}

	/**
	 * Cannot set prototype of `$state` object
	 * @returns {never}
	 */
	function state_prototype_fixed() {
		if (DEV) {
			const error = new Error(`state_prototype_fixed\nCannot set prototype of \`$state\` object\nhttps://svelte.dev/e/state_prototype_fixed`);

			error.name = 'Svelte error';
			throw error;
		} else {
			throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
		}
	}

	/**
	 * Reading state that was created inside the same derived is forbidden. Consider using `untrack` to read locally created state
	 * @returns {never}
	 */
	function state_unsafe_local_read() {
		if (DEV) {
			const error = new Error(`state_unsafe_local_read\nReading state that was created inside the same derived is forbidden. Consider using \`untrack\` to read locally created state\nhttps://svelte.dev/e/state_unsafe_local_read`);

			error.name = 'Svelte error';
			throw error;
		} else {
			throw new Error(`https://svelte.dev/e/state_unsafe_local_read`);
		}
	}

	/**
	 * Updating state inside a derived or a template expression is forbidden. If the value should not be reactive, declare it without `$state`
	 * @returns {never}
	 */
	function state_unsafe_mutation() {
		if (DEV) {
			const error = new Error(`state_unsafe_mutation\nUpdating state inside a derived or a template expression is forbidden. If the value should not be reactive, declare it without \`$state\`\nhttps://svelte.dev/e/state_unsafe_mutation`);

			error.name = 'Svelte error';
			throw error;
		} else {
			throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
		}
	}

	let legacy_mode_flag = false;
	let tracing_mode_flag = false;

	function enable_legacy_mode_flag() {
		legacy_mode_flag = true;
	}

	/* This file is generated by scripts/process-messages/index.js. Do not edit! */

	var bold$1 = 'font-weight: bold';
	var normal$1 = 'font-weight: normal';

	/**
	 * The following properties cannot be cloned with `$state.snapshot` — the return value contains the originals:
	 * 
	 * %properties%
	 * @param {string | undefined | null} [properties]
	 */
	function state_snapshot_uncloneable(properties) {
		if (DEV) {
			console.warn(`%c[svelte] state_snapshot_uncloneable\n%c${properties
			? `The following properties cannot be cloned with \`$state.snapshot\` — the return value contains the originals:

${properties}`
			: "Value cannot be cloned with `$state.snapshot` — the original value was returned"}\nhttps://svelte.dev/e/state_snapshot_uncloneable`, bold$1, normal$1);
		} else {
			console.warn(`https://svelte.dev/e/state_snapshot_uncloneable`);
		}
	}

	/** @import { Snapshot } from './types' */

	/**
	 * In dev, we keep track of which properties could not be cloned. In prod
	 * we don't bother, but we keep a dummy array around so that the
	 * signature stays the same
	 * @type {string[]}
	 */
	const empty = [];

	/**
	 * @template T
	 * @param {T} value
	 * @param {boolean} [skip_warning]
	 * @returns {Snapshot<T>}
	 */
	function snapshot(value, skip_warning = false) {
		if (DEV && !skip_warning) {
			/** @type {string[]} */
			const paths = [];

			const copy = clone(value, new Map(), '', paths);
			if (paths.length === 1 && paths[0] === '') {
				// value could not be cloned
				state_snapshot_uncloneable();
			} else if (paths.length > 0) {
				// some properties could not be cloned
				const slice = paths.length > 10 ? paths.slice(0, 7) : paths.slice(0, 10);
				const excess = paths.length - slice.length;

				let uncloned = slice.map((path) => `- <value>${path}`).join('\n');
				if (excess > 0) uncloned += `\n- ...and ${excess} more`;

				state_snapshot_uncloneable(uncloned);
			}

			return copy;
		}

		return clone(value, new Map(), '', empty);
	}

	/**
	 * @template T
	 * @param {T} value
	 * @param {Map<T, Snapshot<T>>} cloned
	 * @param {string} path
	 * @param {string[]} paths
	 * @param {null | T} original The original value, if `value` was produced from a `toJSON` call
	 * @returns {Snapshot<T>}
	 */
	function clone(value, cloned, path, paths, original = null) {
		if (typeof value === 'object' && value !== null) {
			var unwrapped = cloned.get(value);
			if (unwrapped !== undefined) return unwrapped;

			if (value instanceof Map) return /** @type {Snapshot<T>} */ (new Map(value));
			if (value instanceof Set) return /** @type {Snapshot<T>} */ (new Set(value));

			if (is_array(value)) {
				var copy = /** @type {Snapshot<any>} */ (Array(value.length));
				cloned.set(value, copy);

				if (original !== null) {
					cloned.set(original, copy);
				}

				for (var i = 0; i < value.length; i += 1) {
					var element = value[i];
					if (i in value) {
						copy[i] = clone(element, cloned, DEV ? `${path}[${i}]` : path, paths);
					}
				}

				return copy;
			}

			if (get_prototype_of(value) === object_prototype) {
				/** @type {Snapshot<any>} */
				copy = {};
				cloned.set(value, copy);

				if (original !== null) {
					cloned.set(original, copy);
				}

				for (var key in value) {
					// @ts-expect-error
					copy[key] = clone(value[key], cloned, DEV ? `${path}.${key}` : path, paths);
				}

				return copy;
			}

			if (value instanceof Date) {
				return /** @type {Snapshot<T>} */ (structuredClone(value));
			}

			if (typeof (/** @type {T & { toJSON?: any } } */ (value).toJSON) === 'function') {
				return clone(
					/** @type {T & { toJSON(): any } } */ (value).toJSON(),
					cloned,
					DEV ? `${path}.toJSON()` : path,
					paths,
					// Associate the instance with the toJSON clone
					value
				);
			}
		}

		if (value instanceof EventTarget) {
			// can't be cloned
			return /** @type {Snapshot<T>} */ (value);
		}

		try {
			return /** @type {Snapshot<T>} */ (structuredClone(value));
		} catch (e) {
			if (DEV) {
				paths.push(path);
			}

			return /** @type {Snapshot<T>} */ (value);
		}
	}

	/** @import { Derived, Reaction, Signal, Value } from '#client' */

	/** @type { any } */
	let tracing_expressions = null;

	/**
	 * @param {string} label
	 */
	function get_stack$1(label) {
		let error = Error();
		const stack = error.stack;

		if (stack) {
			const lines = stack.split('\n');
			const new_lines = ['\n'];

			for (let i = 0; i < lines.length; i++) {
				const line = lines[i];

				if (line === 'Error') {
					continue;
				}
				if (line.includes('validate_each_keys')) {
					return null;
				}
				if (line.includes('svelte/src/internal')) {
					continue;
				}
				new_lines.push(line);
			}

			if (new_lines.length === 1) {
				return null;
			}

			define_property(error, 'stack', {
				value: new_lines.join('\n')
			});

			define_property(error, 'name', {
				// 'Error' suffix is required for stack traces to be rendered properly
				value: `${label}Error`
			});
		}
		return error;
	}

	/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */

	let inspect_effects = new Set();

	/**
	 * @param {Set<any>} v
	 */
	function set_inspect_effects(v) {
		inspect_effects = v;
	}

	/**
	 * @template V
	 * @param {V} v
	 * @param {Error | null} [stack]
	 * @returns {Source<V>}
	 */
	function source(v, stack) {
		/** @type {Value} */
		var signal = {
			f: 0, // TODO ideally we could skip this altogether, but it causes type errors
			v,
			reactions: null,
			equals,
			version: 0
		};

		if (DEV && tracing_mode_flag) {
			signal.created = stack ?? get_stack$1('CreatedAt');
			signal.debug = null;
		}

		return signal;
	}

	/**
	 * @template V
	 * @param {V} initial_value
	 * @param {boolean} [immutable]
	 * @returns {Source<V>}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function mutable_source(initial_value, immutable = false) {
		const s = source(initial_value);
		if (!immutable) {
			s.equals = safe_equals;
		}

		// bind the signal to the component context, in case we need to
		// track updates to trigger beforeUpdate/afterUpdate callbacks
		if (legacy_mode_flag && component_context !== null && component_context.l !== null) {
			(component_context.l.s ??= []).push(s);
		}

		return s;
	}

	/**
	 * @template V
	 * @param {V} v
	 * @param {boolean} [immutable]
	 * @returns {Source<V>}
	 */
	function mutable_state(v, immutable = false) {
		return push_derived_source(mutable_source(v, immutable));
	}

	/**
	 * @template V
	 * @param {Source<V>} source
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function push_derived_source(source) {
		if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
			if (derived_sources === null) {
				set_derived_sources([source]);
			} else {
				derived_sources.push(source);
			}
		}

		return source;
	}

	/**
	 * @template V
	 * @param {Source<V>} source
	 * @param {V} value
	 * @returns {V}
	 */
	function set(source, value) {
		if (
			active_reaction !== null &&
			is_runes() &&
			(active_reaction.f & (DERIVED | BLOCK_EFFECT)) !== 0 &&
			// If the source was created locally within the current derived, then
			// we allow the mutation.
			(derived_sources === null || !derived_sources.includes(source))
		) {
			state_unsafe_mutation();
		}

		return internal_set(source, value);
	}

	/**
	 * @template V
	 * @param {Source<V>} source
	 * @param {V} value
	 * @returns {V}
	 */
	function internal_set(source, value) {
		if (!source.equals(value)) {
			source.v = value;
			source.version = increment_version();

			if (DEV && tracing_mode_flag) {
				source.updated = get_stack$1('UpdatedAt');
			}

			mark_reactions(source, DIRTY);

			// If the current signal is running for the first time, it won't have any
			// reactions as we only allocate and assign the reactions after the signal
			// has fully executed. So in the case of ensuring it registers the reaction
			// properly for itself, we need to ensure the current effect actually gets
			// scheduled. i.e: `$effect(() => x++)`
			if (
				is_runes() &&
				active_effect !== null &&
				(active_effect.f & CLEAN) !== 0 &&
				(active_effect.f & BRANCH_EFFECT) === 0
			) {
				if (new_deps !== null && new_deps.includes(source)) {
					set_signal_status(active_effect, DIRTY);
					schedule_effect(active_effect);
				} else {
					if (untracked_writes === null) {
						set_untracked_writes([source]);
					} else {
						untracked_writes.push(source);
					}
				}
			}

			if (DEV && inspect_effects.size > 0) {
				const inspects = Array.from(inspect_effects);
				var previously_flushing_effect = is_flushing_effect;
				set_is_flushing_effect(true);
				try {
					for (const effect of inspects) {
						// Mark clean inspect-effects as maybe dirty and then check their dirtiness
						// instead of just updating the effects - this way we avoid overfiring.
						if ((effect.f & CLEAN) !== 0) {
							set_signal_status(effect, MAYBE_DIRTY);
						}
						if (check_dirtiness(effect)) {
							update_effect(effect);
						}
					}
				} finally {
					set_is_flushing_effect(previously_flushing_effect);
				}
				inspect_effects.clear();
			}
		}

		return value;
	}

	/**
	 * @param {Value} signal
	 * @param {number} status should be DIRTY or MAYBE_DIRTY
	 * @returns {void}
	 */
	function mark_reactions(signal, status) {
		var reactions = signal.reactions;
		if (reactions === null) return;

		var runes = is_runes();
		var length = reactions.length;

		for (var i = 0; i < length; i++) {
			var reaction = reactions[i];
			var flags = reaction.f;

			// Skip any effects that are already dirty
			if ((flags & DIRTY) !== 0) continue;

			// In legacy mode, skip the current effect to prevent infinite loops
			if (!runes && reaction === active_effect) continue;

			// Inspect effects need to run immediately, so that the stack trace makes sense
			if (DEV && (flags & INSPECT_EFFECT) !== 0) {
				inspect_effects.add(reaction);
				continue;
			}

			set_signal_status(reaction, status);

			// If the signal a) was previously clean or b) is an unowned derived, then mark it
			if ((flags & (CLEAN | UNOWNED)) !== 0) {
				if ((flags & DERIVED) !== 0) {
					mark_reactions(/** @type {Derived} */ (reaction), MAYBE_DIRTY);
				} else {
					schedule_effect(/** @type {Effect} */ (reaction));
				}
			}
		}
	}

	/* This file is generated by scripts/process-messages/index.js. Do not edit! */

	var bold = 'font-weight: bold';
	var normal = 'font-weight: normal';

	/**
	 * Your `console.%method%` contained `$state` proxies. Consider using `$inspect(...)` or `$state.snapshot(...)` instead
	 * @param {string} method
	 */
	function console_log_state(method) {
		if (DEV) {
			console.warn(`%c[svelte] console_log_state\n%cYour \`console.${method}\` contained \`$state\` proxies. Consider using \`$inspect(...)\` or \`$state.snapshot(...)\` instead\nhttps://svelte.dev/e/console_log_state`, bold, normal);
		} else {
			console.warn(`https://svelte.dev/e/console_log_state`);
		}
	}

	/**
	 * %handler% should be a function. Did you mean to %suggestion%?
	 * @param {string} handler
	 * @param {string} suggestion
	 */
	function event_handler_invalid(handler, suggestion) {
		if (DEV) {
			console.warn(`%c[svelte] event_handler_invalid\n%c${handler} should be a function. Did you mean to ${suggestion}?\nhttps://svelte.dev/e/event_handler_invalid`, bold, normal);
		} else {
			console.warn(`https://svelte.dev/e/event_handler_invalid`);
		}
	}

	/**
	 * %parent% passed a value to %child% with `bind:`, but the value is owned by %owner%. Consider creating a binding between %owner% and %parent%
	 * @param {string} parent
	 * @param {string} child
	 * @param {string} owner
	 */
	function ownership_invalid_binding(parent, child, owner) {
		if (DEV) {
			console.warn(`%c[svelte] ownership_invalid_binding\n%c${parent} passed a value to ${child} with \`bind:\`, but the value is owned by ${owner}. Consider creating a binding between ${owner} and ${parent}\nhttps://svelte.dev/e/ownership_invalid_binding`, bold, normal);
		} else {
			console.warn(`https://svelte.dev/e/ownership_invalid_binding`);
		}
	}

	/**
	 * %component% mutated a value owned by %owner%. This is strongly discouraged. Consider passing values to child components with `bind:`, or use a callback instead
	 * @param {string | undefined | null} [component]
	 * @param {string | undefined | null} [owner]
	 */
	function ownership_invalid_mutation(component, owner) {
		if (DEV) {
			console.warn(`%c[svelte] ownership_invalid_mutation\n%c${component ? `${component} mutated a value owned by ${owner}. This is strongly discouraged. Consider passing values to child components with \`bind:\`, or use a callback instead` : "Mutating a value outside the component that created it is strongly discouraged. Consider passing values to child components with `bind:`, or use a callback instead"}\nhttps://svelte.dev/e/ownership_invalid_mutation`, bold, normal);
		} else {
			console.warn(`https://svelte.dev/e/ownership_invalid_mutation`);
		}
	}

	/**
	 * Reactive `$state(...)` proxies and the values they proxy have different identities. Because of this, comparisons with `%operator%` will produce unexpected results
	 * @param {string} operator
	 */
	function state_proxy_equality_mismatch(operator) {
		if (DEV) {
			console.warn(`%c[svelte] state_proxy_equality_mismatch\n%cReactive \`$state(...)\` proxies and the values they proxy have different identities. Because of this, comparisons with \`${operator}\` will produce unexpected results\nhttps://svelte.dev/e/state_proxy_equality_mismatch`, bold, normal);
		} else {
			console.warn(`https://svelte.dev/e/state_proxy_equality_mismatch`);
		}
	}

	/** @import { TemplateNode } from '#client' */

	/**
	 * Use this variable to guard everything related to hydration code so it can be treeshaken out
	 * if the user doesn't use the `hydrate` method and these code paths are therefore not needed.
	 */
	let hydrating = false;

	/** @param {TemplateNode} node */
	function reset(node) {
		return;
	}

	/** @import { ProxyMetadata } from '#client' */

	/** @type {Record<string, Array<{ start: Location, end: Location, component: Function }>>} */
	const boundaries = {};

	const chrome_pattern = /at (?:.+ \()?(.+):(\d+):(\d+)\)?$/;
	const firefox_pattern = /@(.+):(\d+):(\d+)$/;

	function get_stack() {
		const stack = new Error().stack;
		if (!stack) return null;

		const entries = [];

		for (const line of stack.split('\n')) {
			let match = chrome_pattern.exec(line) ?? firefox_pattern.exec(line);

			if (match) {
				entries.push({
					file: match[1],
					line: +match[2],
					column: +match[3]
				});
			}
		}

		return entries;
	}

	/**
	 * Determines which `.svelte` component is responsible for a given state change
	 * @returns {Function | null}
	 */
	function get_component() {
		// first 4 lines are svelte internals; adjust this number if we change the internal call stack
		const stack = get_stack()?.slice(4);
		if (!stack) return null;

		for (let i = 0; i < stack.length; i++) {
			const entry = stack[i];
			const modules = boundaries[entry.file];
			if (!modules) {
				// If the first entry is not a component, that means the modification very likely happened
				// within a .svelte.js file, possibly triggered by a component. Since these files are not part
				// of the bondaries/component context heuristic, we need to bail in this case, else we would
				// have false positives when the .svelte.ts file provides a state creator function, encapsulating
				// the state and its mutations, and is being called from a component other than the one who
				// called the state creator function.
				if (i === 0) return null;
				continue;
			}

			for (const module of modules) {
				if (module.end == null) {
					return null;
				}
				if (module.start.line < entry.line && module.end.line > entry.line) {
					return module.component;
				}
			}
		}

		return null;
	}

	const ADD_OWNER = Symbol('ADD_OWNER');

	/**
	 * Together with `mark_module_end`, this function establishes the boundaries of a `.svelte` file,
	 * such that subsequent calls to `get_component` can tell us which component is responsible
	 * for a given state change
	 */
	function mark_module_start() {
		const start = get_stack()?.[2];

		if (start) {
			(boundaries[start.file] ??= []).push({
				start,
				// @ts-expect-error
				end: null,
				// @ts-expect-error we add the component at the end, since HMR will overwrite the function
				component: null
			});
		}
	}

	/**
	 * @param {Function} component
	 */
	function mark_module_end(component) {
		const end = get_stack()?.[2];

		if (end) {
			const boundaries_file = boundaries[end.file];
			const boundary = boundaries_file[boundaries_file.length - 1];

			boundary.end = end;
			boundary.component = component;
		}
	}

	/**
	 * @param {any} object
	 * @param {any} owner
	 * @param {boolean} [global]
	 * @param {boolean} [skip_warning]
	 */
	function add_owner(object, owner, global = false, skip_warning = false) {
		if (object && !global) {
			const component = dev_current_component_function;
			const metadata = object[STATE_SYMBOL_METADATA];
			if (metadata && !has_owner(metadata, component)) {
				let original = get_owner(metadata);

				if (owner[FILENAME] !== component[FILENAME] && !skip_warning) {
					ownership_invalid_binding(component[FILENAME], owner[FILENAME], original[FILENAME]);
				}
			}
		}

		add_owner_to_object(object, owner, new Set());
	}

	/**
	 * @param {() => unknown} get_object
	 * @param {any} Component
	 * @param {boolean} [skip_warning]
	 */
	function add_owner_effect(get_object, Component, skip_warning = false) {
		user_pre_effect(() => {
			add_owner(get_object(), Component, false, skip_warning);
		});
	}

	/**
	 * @param {ProxyMetadata | null} from
	 * @param {ProxyMetadata} to
	 */
	function widen_ownership(from, to) {
		if (to.owners === null) {
			return;
		}

		while (from) {
			if (from.owners === null) {
				to.owners = null;
				break;
			}

			for (const owner of from.owners) {
				to.owners.add(owner);
			}

			from = from.parent;
		}
	}

	/**
	 * @param {any} object
	 * @param {Function} owner
	 * @param {Set<any>} seen
	 */
	function add_owner_to_object(object, owner, seen) {
		const metadata = /** @type {ProxyMetadata} */ (object?.[STATE_SYMBOL_METADATA]);

		if (metadata) {
			// this is a state proxy, add owner directly, if not globally shared
			if ('owners' in metadata && metadata.owners != null) {
				metadata.owners.add(owner);
			}
		} else if (object && typeof object === 'object') {
			if (seen.has(object)) return;
			seen.add(object);
			if (ADD_OWNER in object && object[ADD_OWNER]) {
				// this is a class with state fields. we put this in a render effect
				// so that if state is replaced (e.g. `instance.name = { first, last }`)
				// the new state is also co-owned by the caller of `getContext`
				render_effect(() => {
					object[ADD_OWNER](owner);
				});
			} else {
				var proto = get_prototype_of(object);

				if (proto === Object.prototype) {
					// recurse until we find a state proxy
					for (const key in object) {
						add_owner_to_object(object[key], owner, seen);
					}
				} else if (proto === Array.prototype) {
					// recurse until we find a state proxy
					for (let i = 0; i < object.length; i += 1) {
						add_owner_to_object(object[i], owner, seen);
					}
				}
			}
		}
	}

	/**
	 * @param {ProxyMetadata} metadata
	 * @param {Function} component
	 * @returns {boolean}
	 */
	function has_owner(metadata, component) {
		if (metadata.owners === null) {
			return true;
		}

		return (
			metadata.owners.has(component) ||
			(metadata.parent !== null && has_owner(metadata.parent, component))
		);
	}

	/**
	 * @param {ProxyMetadata} metadata
	 * @returns {any}
	 */
	function get_owner(metadata) {
		return (
			metadata?.owners?.values().next().value ??
			get_owner(/** @type {ProxyMetadata} */ (metadata.parent))
		);
	}

	/**
	 * @param {ProxyMetadata} metadata
	 */
	function check_ownership(metadata) {

		const component = get_component();

		if (component && !has_owner(metadata, component)) {
			let original = get_owner(metadata);

			// @ts-expect-error
			if (original[FILENAME] !== component[FILENAME]) {
				// @ts-expect-error
				ownership_invalid_mutation(component[FILENAME], original[FILENAME]);
			} else {
				ownership_invalid_mutation();
			}
		}
	}

	/** @import { ProxyMetadata, ProxyStateObject, Source } from '#client' */

	/**
	 * @template T
	 * @param {T} value
	 * @param {ProxyMetadata | null} [parent]
	 * @param {Source<T>} [prev] dev mode only
	 * @returns {T}
	 */
	function proxy(value, parent = null, prev) {
		/** @type {Error | null} */
		var stack = null;
		if (DEV && tracing_mode_flag) {
			stack = get_stack$1('CreatedAt');
		}
		// if non-proxyable, or is already a proxy, return `value`
		if (typeof value !== 'object' || value === null || STATE_SYMBOL in value) {
			return value;
		}

		const prototype = get_prototype_of(value);

		if (prototype !== object_prototype && prototype !== array_prototype) {
			return value;
		}

		/** @type {Map<any, Source<any>>} */
		var sources = new Map();
		var is_proxied_array = is_array(value);
		var version = source(0);

		if (is_proxied_array) {
			// We need to create the length source eagerly to ensure that
			// mutations to the array are properly synced with our proxy
			sources.set('length', source(/** @type {any[]} */ (value).length, stack));
		}

		/** @type {ProxyMetadata} */
		var metadata;

		if (DEV) {
			metadata = {
				parent,
				owners: null
			};

			if (prev) {
				// Reuse owners from previous state; necessary because reassignment is not guaranteed to have correct component context.
				// If no previous proxy exists we play it safe and assume ownerless state
				// @ts-expect-error
				const prev_owners = prev.v?.[STATE_SYMBOL_METADATA]?.owners;
				metadata.owners = prev_owners ? new Set(prev_owners) : null;
			} else {
				metadata.owners =
					parent === null
						? component_context !== null
							? new Set([component_context.function])
							: null
						: new Set();
			}
		}

		return new Proxy(/** @type {any} */ (value), {
			defineProperty(_, prop, descriptor) {
				if (
					!('value' in descriptor) ||
					descriptor.configurable === false ||
					descriptor.enumerable === false ||
					descriptor.writable === false
				) {
					// we disallow non-basic descriptors, because unless they are applied to the
					// target object — which we avoid, so that state can be forked — we will run
					// afoul of the various invariants
					// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getOwnPropertyDescriptor#invariants
					state_descriptors_fixed();
				}

				var s = sources.get(prop);

				if (s === undefined) {
					s = source(descriptor.value, stack);
					sources.set(prop, s);
				} else {
					set(s, proxy(descriptor.value, metadata));
				}

				return true;
			},

			deleteProperty(target, prop) {
				var s = sources.get(prop);

				if (s === undefined) {
					if (prop in target) {
						sources.set(prop, source(UNINITIALIZED, stack));
					}
				} else {
					// When working with arrays, we need to also ensure we update the length when removing
					// an indexed property
					if (is_proxied_array && typeof prop === 'string') {
						var ls = /** @type {Source<number>} */ (sources.get('length'));
						var n = Number(prop);

						if (Number.isInteger(n) && n < ls.v) {
							set(ls, n);
						}
					}
					set(s, UNINITIALIZED);
					update_version(version);
				}

				return true;
			},

			get(target, prop, receiver) {
				if (DEV && prop === STATE_SYMBOL_METADATA) {
					return metadata;
				}

				if (prop === STATE_SYMBOL) {
					return value;
				}

				var s = sources.get(prop);
				var exists = prop in target;

				// create a source, but only if it's an own property and not a prototype property
				if (s === undefined && (!exists || get_descriptor(target, prop)?.writable)) {
					s = source(proxy(exists ? target[prop] : UNINITIALIZED, metadata), stack);
					sources.set(prop, s);
				}

				if (s !== undefined) {
					var v = get(s);

					// In case of something like `foo = bar.map(...)`, foo would have ownership
					// of the array itself, while the individual items would have ownership
					// of the component that created bar. That means if we later do `foo[0].baz = 42`,
					// we could get a false-positive ownership violation, since the two proxies
					// are not connected to each other via the parent metadata relationship.
					// For this reason, we need to widen the ownership of the children
					// upon access when we detect they are not connected.
					if (DEV) {
						/** @type {ProxyMetadata | undefined} */
						var prop_metadata = v?.[STATE_SYMBOL_METADATA];
						if (prop_metadata && prop_metadata?.parent !== metadata) {
							widen_ownership(metadata, prop_metadata);
						}
					}

					return v === UNINITIALIZED ? undefined : v;
				}

				return Reflect.get(target, prop, receiver);
			},

			getOwnPropertyDescriptor(target, prop) {
				var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);

				if (descriptor && 'value' in descriptor) {
					var s = sources.get(prop);
					if (s) descriptor.value = get(s);
				} else if (descriptor === undefined) {
					var source = sources.get(prop);
					var value = source?.v;

					if (source !== undefined && value !== UNINITIALIZED) {
						return {
							enumerable: true,
							configurable: true,
							value,
							writable: true
						};
					}
				}

				return descriptor;
			},

			has(target, prop) {
				if (DEV && prop === STATE_SYMBOL_METADATA) {
					return true;
				}

				if (prop === STATE_SYMBOL) {
					return true;
				}

				var s = sources.get(prop);
				var has = (s !== undefined && s.v !== UNINITIALIZED) || Reflect.has(target, prop);

				if (
					s !== undefined ||
					(active_effect !== null && (!has || get_descriptor(target, prop)?.writable))
				) {
					if (s === undefined) {
						s = source(has ? proxy(target[prop], metadata) : UNINITIALIZED, stack);
						sources.set(prop, s);
					}

					var value = get(s);
					if (value === UNINITIALIZED) {
						return false;
					}
				}

				return has;
			},

			set(target, prop, value, receiver) {
				var s = sources.get(prop);
				var has = prop in target;

				// variable.length = value -> clear all signals with index >= value
				if (is_proxied_array && prop === 'length') {
					for (var i = value; i < /** @type {Source<number>} */ (s).v; i += 1) {
						var other_s = sources.get(i + '');
						if (other_s !== undefined) {
							set(other_s, UNINITIALIZED);
						} else if (i in target) {
							// If the item exists in the original, we need to create a uninitialized source,
							// else a later read of the property would result in a source being created with
							// the value of the original item at that index.
							other_s = source(UNINITIALIZED, stack);
							sources.set(i + '', other_s);
						}
					}
				}

				// If we haven't yet created a source for this property, we need to ensure
				// we do so otherwise if we read it later, then the write won't be tracked and
				// the heuristics of effects will be different vs if we had read the proxied
				// object property before writing to that property.
				if (s === undefined) {
					if (!has || get_descriptor(target, prop)?.writable) {
						s = source(undefined, stack);
						set(s, proxy(value, metadata));
						sources.set(prop, s);
					}
				} else {
					has = s.v !== UNINITIALIZED;
					set(s, proxy(value, metadata));
				}

				if (DEV) {
					/** @type {ProxyMetadata | undefined} */
					var prop_metadata = value?.[STATE_SYMBOL_METADATA];
					if (prop_metadata && prop_metadata?.parent !== metadata) {
						widen_ownership(metadata, prop_metadata);
					}
					check_ownership(metadata);
				}

				var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);

				// Set the new value before updating any signals so that any listeners get the new value
				if (descriptor?.set) {
					descriptor.set.call(receiver, value);
				}

				if (!has) {
					// If we have mutated an array directly, we might need to
					// signal that length has also changed. Do it before updating metadata
					// to ensure that iterating over the array as a result of a metadata update
					// will not cause the length to be out of sync.
					if (is_proxied_array && typeof prop === 'string') {
						var ls = /** @type {Source<number>} */ (sources.get('length'));
						var n = Number(prop);

						if (Number.isInteger(n) && n >= ls.v) {
							set(ls, n + 1);
						}
					}

					update_version(version);
				}

				return true;
			},

			ownKeys(target) {
				get(version);

				var own_keys = Reflect.ownKeys(target).filter((key) => {
					var source = sources.get(key);
					return source === undefined || source.v !== UNINITIALIZED;
				});

				for (var [key, source] of sources) {
					if (source.v !== UNINITIALIZED && !(key in target)) {
						own_keys.push(key);
					}
				}

				return own_keys;
			},

			setPrototypeOf() {
				state_prototype_fixed();
			}
		});
	}

	/**
	 * @param {Source<number>} signal
	 * @param {1 | -1} [d]
	 */
	function update_version(signal, d = 1) {
		set(signal, signal.v + d);
	}

	/**
	 * @param {any} value
	 */
	function get_proxied_value(value) {
		if (value !== null && typeof value === 'object' && STATE_SYMBOL in value) {
			return value[STATE_SYMBOL];
		}

		return value;
	}

	/**
	 * @param {any} a
	 * @param {any} b
	 * @param {boolean} equal
	 * @returns {boolean}
	 */
	function strict_equals(a, b, equal = true) {
		// try-catch needed because this tries to read properties of `a` and `b`,
		// which could be disallowed for example in a secure context
		try {
			if ((a === b) !== (get_proxied_value(a) === get_proxied_value(b))) {
				state_proxy_equality_mismatch(equal ? '===' : '!==');
			}
		} catch {}

		return (a === b) === equal;
	}

	/** @import { TemplateNode } from '#client' */

	/** @type {() => Node | null} */
	var first_child_getter;
	/** @type {() => Node | null} */
	var next_sibling_getter;

	/**
	 * @param {string} value
	 * @returns {Text}
	 */
	function create_text(value = '') {
		return document.createTextNode(value);
	}

	/**
	 * @template {Node} N
	 * @param {N} node
	 * @returns {Node | null}
	 */
	/*@__NO_SIDE_EFFECTS__*/
	function get_first_child(node) {
		return first_child_getter.call(node);
	}

	/**
	 * @template {Node} N
	 * @param {N} node
	 * @returns {Node | null}
	 */
	/*@__NO_SIDE_EFFECTS__*/
	function get_next_sibling(node) {
		return next_sibling_getter.call(node);
	}

	/**
	 * Don't mark this as side-effect-free, hydration needs to walk all nodes
	 * @template {Node} N
	 * @param {N} node
	 * @param {boolean} is_text
	 * @returns {Node | null}
	 */
	function child(node, is_text) {
		{
			return get_first_child(node);
		}
	}

	/**
	 * Don't mark this as side-effect-free, hydration needs to walk all nodes
	 * @param {DocumentFragment | TemplateNode[]} fragment
	 * @param {boolean} is_text
	 * @returns {Node | null}
	 */
	function first_child(fragment, is_text) {
		{
			// when not hydrating, `fragment` is a `DocumentFragment` (the result of calling `open_frag`)
			var first = /** @type {DocumentFragment} */ (get_first_child(/** @type {Node} */ (fragment)));

			// TODO prevent user comments with the empty string when preserveComments is true
			if (first instanceof Comment && first.data === '') return get_next_sibling(first);

			return first;
		}
	}

	/**
	 * Don't mark this as side-effect-free, hydration needs to walk all nodes
	 * @param {TemplateNode} node
	 * @param {number} count
	 * @param {boolean} is_text
	 * @returns {Node | null}
	 */
	function sibling(node, count = 1, is_text = false) {
		let next_sibling = node;

		while (count--) {
			next_sibling = /** @type {TemplateNode} */ (get_next_sibling(next_sibling));
		}

		{
			return next_sibling;
		}
	}

	/**
	 * @template {Node} N
	 * @param {N} node
	 * @returns {void}
	 */
	function clear_text_content(node) {
		node.textContent = '';
	}

	/** @import { Derived, Effect } from '#client' */

	/**
	 * @template V
	 * @param {() => V} fn
	 * @returns {Derived<V>}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function derived(fn) {
		var flags = DERIVED | DIRTY;

		if (active_effect === null) {
			flags |= UNOWNED;
		} else {
			// Since deriveds are evaluated lazily, any effects created inside them are
			// created too late to ensure that the parent effect is added to the tree
			active_effect.f |= EFFECT_HAS_DERIVED;
		}

		var parent_derived =
			active_reaction !== null && (active_reaction.f & DERIVED) !== 0
				? /** @type {Derived} */ (active_reaction)
				: null;

		/** @type {Derived<V>} */
		const signal = {
			children: null,
			ctx: component_context,
			deps: null,
			equals,
			f: flags,
			fn,
			reactions: null,
			v: /** @type {V} */ (null),
			version: 0,
			parent: parent_derived ?? active_effect
		};

		if (DEV && tracing_mode_flag) {
			signal.created = get_stack$1('CreatedAt');
		}

		if (parent_derived !== null) {
			(parent_derived.children ??= []).push(signal);
		}

		return signal;
	}

	/**
	 * @template V
	 * @param {() => V} fn
	 * @returns {Derived<V>}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function derived_safe_equal(fn) {
		const signal = derived(fn);
		signal.equals = safe_equals;
		return signal;
	}

	/**
	 * @param {Derived} derived
	 * @returns {void}
	 */
	function destroy_derived_children(derived) {
		var children = derived.children;

		if (children !== null) {
			derived.children = null;

			for (var i = 0; i < children.length; i += 1) {
				var child = children[i];
				if ((child.f & DERIVED) !== 0) {
					destroy_derived(/** @type {Derived} */ (child));
				} else {
					destroy_effect(/** @type {Effect} */ (child));
				}
			}
		}
	}

	/**
	 * The currently updating deriveds, used to detect infinite recursion
	 * in dev mode and provide a nicer error than 'too much recursion'
	 * @type {Derived[]}
	 */
	let stack = [];

	/**
	 * @param {Derived} derived
	 * @returns {Effect | null}
	 */
	function get_derived_parent_effect(derived) {
		var parent = derived.parent;
		while (parent !== null) {
			if ((parent.f & DERIVED) === 0) {
				return /** @type {Effect} */ (parent);
			}
			parent = parent.parent;
		}
		return null;
	}

	/**
	 * @template T
	 * @param {Derived} derived
	 * @returns {T}
	 */
	function execute_derived(derived) {
		var value;
		var prev_active_effect = active_effect;

		set_active_effect(get_derived_parent_effect(derived));

		if (DEV) {
			let prev_inspect_effects = inspect_effects;
			set_inspect_effects(new Set());
			try {
				if (stack.includes(derived)) {
					derived_references_self();
				}

				stack.push(derived);

				destroy_derived_children(derived);
				value = update_reaction(derived);
			} finally {
				set_active_effect(prev_active_effect);
				set_inspect_effects(prev_inspect_effects);
				stack.pop();
			}
		} else {
			try {
				destroy_derived_children(derived);
				value = update_reaction(derived);
			} finally {
				set_active_effect(prev_active_effect);
			}
		}

		return value;
	}

	/**
	 * @param {Derived} derived
	 * @returns {void}
	 */
	function update_derived(derived) {
		var value = execute_derived(derived);
		var status =
			(skip_reaction || (derived.f & UNOWNED) !== 0) && derived.deps !== null ? MAYBE_DIRTY : CLEAN;

		set_signal_status(derived, status);

		if (!derived.equals(value)) {
			derived.v = value;
			derived.version = increment_version();
		}
	}

	/**
	 * @param {Derived} derived
	 * @returns {void}
	 */
	function destroy_derived(derived) {
		destroy_derived_children(derived);
		remove_reactions(derived, 0);
		set_signal_status(derived, DESTROYED);

		derived.v = derived.children = derived.deps = derived.ctx = derived.reactions = null;
	}

	/** @import { ComponentContext, ComponentContextLegacy, Derived, Effect, TemplateNode, TransitionManager } from '#client' */

	/**
	 * @param {'$effect' | '$effect.pre' | '$inspect'} rune
	 */
	function validate_effect(rune) {
		if (active_effect === null && active_reaction === null) {
			effect_orphan(rune);
		}

		if (active_reaction !== null && (active_reaction.f & UNOWNED) !== 0) {
			effect_in_unowned_derived();
		}

		if (is_destroying_effect) {
			effect_in_teardown(rune);
		}
	}

	/**
	 * @param {Effect} effect
	 * @param {Effect} parent_effect
	 */
	function push_effect(effect, parent_effect) {
		var parent_last = parent_effect.last;
		if (parent_last === null) {
			parent_effect.last = parent_effect.first = effect;
		} else {
			parent_last.next = effect;
			effect.prev = parent_last;
			parent_effect.last = effect;
		}
	}

	/**
	 * @param {number} type
	 * @param {null | (() => void | (() => void))} fn
	 * @param {boolean} sync
	 * @param {boolean} push
	 * @returns {Effect}
	 */
	function create_effect(type, fn, sync, push = true) {
		var is_root = (type & ROOT_EFFECT) !== 0;
		var parent_effect = active_effect;

		if (DEV) {
			// Ensure the parent is never an inspect effect
			while (parent_effect !== null && (parent_effect.f & INSPECT_EFFECT) !== 0) {
				parent_effect = parent_effect.parent;
			}
		}

		/** @type {Effect} */
		var effect = {
			ctx: component_context,
			deps: null,
			deriveds: null,
			nodes_start: null,
			nodes_end: null,
			f: type | DIRTY,
			first: null,
			fn,
			last: null,
			next: null,
			parent: is_root ? null : parent_effect,
			prev: null,
			teardown: null,
			transitions: null,
			version: 0
		};

		if (DEV) {
			effect.component_function = dev_current_component_function;
		}

		if (sync) {
			var previously_flushing_effect = is_flushing_effect;

			try {
				set_is_flushing_effect(true);
				update_effect(effect);
				effect.f |= EFFECT_RAN;
			} catch (e) {
				destroy_effect(effect);
				throw e;
			} finally {
				set_is_flushing_effect(previously_flushing_effect);
			}
		} else if (fn !== null) {
			schedule_effect(effect);
		}

		// if an effect has no dependencies, no DOM and no teardown function,
		// don't bother adding it to the effect tree
		var inert =
			sync &&
			effect.deps === null &&
			effect.first === null &&
			effect.nodes_start === null &&
			effect.teardown === null &&
			(effect.f & EFFECT_HAS_DERIVED) === 0;

		if (!inert && !is_root && push) {
			if (parent_effect !== null) {
				push_effect(effect, parent_effect);
			}

			// if we're in a derived, add the effect there too
			if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
				var derived = /** @type {Derived} */ (active_reaction);
				(derived.children ??= []).push(effect);
			}
		}

		return effect;
	}

	/**
	 * Internal representation of `$effect(...)`
	 * @param {() => void | (() => void)} fn
	 */
	function user_effect(fn) {
		validate_effect('$effect');

		// Non-nested `$effect(...)` in a component should be deferred
		// until the component is mounted
		var defer =
			active_effect !== null &&
			(active_effect.f & BRANCH_EFFECT) !== 0 &&
			component_context !== null &&
			!component_context.m;

		if (DEV) {
			define_property(fn, 'name', {
				value: '$effect'
			});
		}

		if (defer) {
			var context = /** @type {ComponentContext} */ (component_context);
			(context.e ??= []).push({
				fn,
				effect: active_effect,
				reaction: active_reaction
			});
		} else {
			var signal = effect(fn);
			return signal;
		}
	}

	/**
	 * Internal representation of `$effect.pre(...)`
	 * @param {() => void | (() => void)} fn
	 * @returns {Effect}
	 */
	function user_pre_effect(fn) {
		validate_effect('$effect.pre');
		if (DEV) {
			define_property(fn, 'name', {
				value: '$effect.pre'
			});
		}
		return render_effect(fn);
	}

	/**
	 * @param {() => void | (() => void)} fn
	 * @returns {Effect}
	 */
	function effect(fn) {
		return create_effect(EFFECT, fn, false);
	}

	/**
	 * Internal representation of `$: ..`
	 * @param {() => any} deps
	 * @param {() => void | (() => void)} fn
	 */
	function legacy_pre_effect(deps, fn) {
		var context = /** @type {ComponentContextLegacy} */ (component_context);

		/** @type {{ effect: null | Effect, ran: boolean }} */
		var token = { effect: null, ran: false };
		context.l.r1.push(token);

		token.effect = render_effect(() => {
			deps();

			// If this legacy pre effect has already run before the end of the reset, then
			// bail out to emulate the same behavior.
			if (token.ran) return;

			token.ran = true;
			set(context.l.r2, true);
			untrack(fn);
		});
	}

	function legacy_pre_effect_reset() {
		var context = /** @type {ComponentContextLegacy} */ (component_context);

		render_effect(() => {
			if (!get(context.l.r2)) return;

			// Run dirty `$:` statements
			for (var token of context.l.r1) {
				var effect = token.effect;

				// If the effect is CLEAN, then make it MAYBE_DIRTY. This ensures we traverse through
				// the effects dependencies and correctly ensure each dependency is up-to-date.
				if ((effect.f & CLEAN) !== 0) {
					set_signal_status(effect, MAYBE_DIRTY);
				}

				if (check_dirtiness(effect)) {
					update_effect(effect);
				}

				token.ran = false;
			}

			context.l.r2.v = false; // set directly to avoid rerunning this effect
		});
	}

	/**
	 * @param {() => void | (() => void)} fn
	 * @returns {Effect}
	 */
	function render_effect(fn) {
		return create_effect(RENDER_EFFECT, fn, true);
	}

	/**
	 * @param {() => void | (() => void)} fn
	 * @returns {Effect}
	 */
	function template_effect(fn) {
		if (DEV) {
			define_property(fn, 'name', {
				value: '{expression}'
			});
		}
		return block(fn);
	}

	/**
	 * @param {(() => void)} fn
	 * @param {number} flags
	 */
	function block(fn, flags = 0) {
		return create_effect(RENDER_EFFECT | BLOCK_EFFECT | flags, fn, true);
	}

	/**
	 * @param {(() => void)} fn
	 * @param {boolean} [push]
	 */
	function branch(fn, push = true) {
		return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true, push);
	}

	/**
	 * @param {Effect} effect
	 */
	function execute_effect_teardown(effect) {
		var teardown = effect.teardown;
		if (teardown !== null) {
			const previously_destroying_effect = is_destroying_effect;
			const previous_reaction = active_reaction;
			set_is_destroying_effect(true);
			set_active_reaction(null);
			try {
				teardown.call(null);
			} finally {
				set_is_destroying_effect(previously_destroying_effect);
				set_active_reaction(previous_reaction);
			}
		}
	}

	/**
	 * @param {Effect} signal
	 * @returns {void}
	 */
	function destroy_effect_deriveds(signal) {
		var deriveds = signal.deriveds;

		if (deriveds !== null) {
			signal.deriveds = null;

			for (var i = 0; i < deriveds.length; i += 1) {
				destroy_derived(deriveds[i]);
			}
		}
	}

	/**
	 * @param {Effect} signal
	 * @param {boolean} remove_dom
	 * @returns {void}
	 */
	function destroy_effect_children(signal, remove_dom = false) {
		var effect = signal.first;
		signal.first = signal.last = null;

		while (effect !== null) {
			var next = effect.next;
			destroy_effect(effect, remove_dom);
			effect = next;
		}
	}

	/**
	 * @param {Effect} signal
	 * @returns {void}
	 */
	function destroy_block_effect_children(signal) {
		var effect = signal.first;

		while (effect !== null) {
			var next = effect.next;
			if ((effect.f & BRANCH_EFFECT) === 0) {
				destroy_effect(effect);
			}
			effect = next;
		}
	}

	/**
	 * @param {Effect} effect
	 * @param {boolean} [remove_dom]
	 * @returns {void}
	 */
	function destroy_effect(effect, remove_dom = true) {
		var removed = false;

		if ((remove_dom || (effect.f & HEAD_EFFECT) !== 0) && effect.nodes_start !== null) {
			/** @type {TemplateNode | null} */
			var node = effect.nodes_start;
			var end = effect.nodes_end;

			while (node !== null) {
				/** @type {TemplateNode | null} */
				var next = node === end ? null : /** @type {TemplateNode} */ (get_next_sibling(node));

				node.remove();
				node = next;
			}

			removed = true;
		}

		destroy_effect_children(effect, remove_dom && !removed);
		destroy_effect_deriveds(effect);
		remove_reactions(effect, 0);
		set_signal_status(effect, DESTROYED);

		var transitions = effect.transitions;

		if (transitions !== null) {
			for (const transition of transitions) {
				transition.stop();
			}
		}

		execute_effect_teardown(effect);

		var parent = effect.parent;

		// If the parent doesn't have any children, then skip this work altogether
		if (parent !== null && parent.first !== null) {
			unlink_effect(effect);
		}

		if (DEV) {
			effect.component_function = null;
		}

		// `first` and `child` are nulled out in destroy_effect_children
		// we don't null out `parent` so that error propagation can work correctly
		effect.next =
			effect.prev =
			effect.teardown =
			effect.ctx =
			effect.deps =
			effect.fn =
			effect.nodes_start =
			effect.nodes_end =
				null;
	}

	/**
	 * Detach an effect from the effect tree, freeing up memory and
	 * reducing the amount of work that happens on subsequent traversals
	 * @param {Effect} effect
	 */
	function unlink_effect(effect) {
		var parent = effect.parent;
		var prev = effect.prev;
		var next = effect.next;

		if (prev !== null) prev.next = next;
		if (next !== null) next.prev = prev;

		if (parent !== null) {
			if (parent.first === effect) parent.first = next;
			if (parent.last === effect) parent.last = prev;
		}
	}

	/**
	 * When a block effect is removed, we don't immediately destroy it or yank it
	 * out of the DOM, because it might have transitions. Instead, we 'pause' it.
	 * It stays around (in memory, and in the DOM) until outro transitions have
	 * completed, and if the state change is reversed then we _resume_ it.
	 * A paused effect does not update, and the DOM subtree becomes inert.
	 * @param {Effect} effect
	 * @param {() => void} [callback]
	 */
	function pause_effect(effect, callback) {
		/** @type {TransitionManager[]} */
		var transitions = [];

		pause_children(effect, transitions, true);

		run_out_transitions(transitions, () => {
			destroy_effect(effect);
			if (callback) callback();
		});
	}

	/**
	 * @param {TransitionManager[]} transitions
	 * @param {() => void} fn
	 */
	function run_out_transitions(transitions, fn) {
		var remaining = transitions.length;
		if (remaining > 0) {
			var check = () => --remaining || fn();
			for (var transition of transitions) {
				transition.out(check);
			}
		} else {
			fn();
		}
	}

	/**
	 * @param {Effect} effect
	 * @param {TransitionManager[]} transitions
	 * @param {boolean} local
	 */
	function pause_children(effect, transitions, local) {
		if ((effect.f & INERT) !== 0) return;
		effect.f ^= INERT;

		if (effect.transitions !== null) {
			for (const transition of effect.transitions) {
				if (transition.is_global || local) {
					transitions.push(transition);
				}
			}
		}

		var child = effect.first;

		while (child !== null) {
			var sibling = child.next;
			var transparent = (child.f & EFFECT_TRANSPARENT) !== 0 || (child.f & BRANCH_EFFECT) !== 0;
			// TODO we don't need to call pause_children recursively with a linked list in place
			// it's slightly more involved though as we have to account for `transparent` changing
			// through the tree.
			pause_children(child, transitions, transparent ? local : false);
			child = sibling;
		}
	}

	/**
	 * The opposite of `pause_effect`. We call this if (for example)
	 * `x` becomes falsy then truthy: `{#if x}...{/if}`
	 * @param {Effect} effect
	 */
	function resume_effect(effect) {
		resume_children(effect, true);
	}

	/**
	 * @param {Effect} effect
	 * @param {boolean} local
	 */
	function resume_children(effect, local) {
		if ((effect.f & INERT) === 0) return;

		// If a dependency of this effect changed while it was paused,
		// apply the change now
		if (check_dirtiness(effect)) {
			update_effect(effect);
		}

		// Ensure we toggle the flag after possibly updating the effect so that
		// each block logic can correctly operate on inert items
		effect.f ^= INERT;

		var child = effect.first;

		while (child !== null) {
			var sibling = child.next;
			var transparent = (child.f & EFFECT_TRANSPARENT) !== 0 || (child.f & BRANCH_EFFECT) !== 0;
			// TODO we don't need to call resume_children recursively with a linked list in place
			// it's slightly more involved though as we have to account for `transparent` changing
			// through the tree.
			resume_children(child, transparent ? local : false);
			child = sibling;
		}

		if (effect.transitions !== null) {
			for (const transition of effect.transitions) {
				if (transition.is_global || local) {
					transition.in();
				}
			}
		}
	}

	let is_micro_task_queued$1 = false;

	/** @type {Array<() => void>} */
	let current_queued_micro_tasks = [];

	function process_micro_tasks() {
		is_micro_task_queued$1 = false;
		const tasks = current_queued_micro_tasks.slice();
		current_queued_micro_tasks = [];
		run_all(tasks);
	}

	/**
	 * @param {() => void} fn
	 */
	function queue_micro_task(fn) {
		if (!is_micro_task_queued$1) {
			is_micro_task_queued$1 = true;
			queueMicrotask(process_micro_tasks);
		}
		current_queued_micro_tasks.push(fn);
	}

	/**
	 * Synchronously run any queued tasks.
	 */
	function flush_tasks() {
		if (is_micro_task_queued$1) {
			process_micro_tasks();
		}
	}

	/** @import { ComponentContext, Derived, Effect, Reaction, Signal, Source, Value } from '#client' */

	const FLUSH_MICROTASK = 0;
	const FLUSH_SYNC = 1;
	// Used for DEV time error handling
	/** @param {WeakSet<Error>} value */
	const handled_errors = new WeakSet();
	let is_throwing_error = false;

	// Used for controlling the flush of effects.
	let scheduler_mode = FLUSH_MICROTASK;
	// Used for handling scheduling
	let is_micro_task_queued = false;

	/** @type {Effect | null} */
	let last_scheduled_effect = null;

	let is_flushing_effect = false;
	let is_destroying_effect = false;

	/** @param {boolean} value */
	function set_is_flushing_effect(value) {
		is_flushing_effect = value;
	}

	/** @param {boolean} value */
	function set_is_destroying_effect(value) {
		is_destroying_effect = value;
	}

	// Handle effect queues

	/** @type {Effect[]} */
	let queued_root_effects = [];

	let flush_count = 0;
	/** @type {Effect[]} Stack of effects, dev only */
	let dev_effect_stack = [];
	// Handle signal reactivity tree dependencies and reactions

	/** @type {null | Reaction} */
	let active_reaction = null;

	/** @param {null | Reaction} reaction */
	function set_active_reaction(reaction) {
		active_reaction = reaction;
	}

	/** @type {null | Effect} */
	let active_effect = null;

	/** @param {null | Effect} effect */
	function set_active_effect(effect) {
		active_effect = effect;
	}

	/**
	 * When sources are created within a derived, we record them so that we can safely allow
	 * local mutations to these sources without the side-effect error being invoked unnecessarily.
	 * @type {null | Source[]}
	 */
	let derived_sources = null;

	/**
	 * @param {Source[] | null} sources
	 */
	function set_derived_sources(sources) {
		derived_sources = sources;
	}

	/**
	 * The dependencies of the reaction that is currently being executed. In many cases,
	 * the dependencies are unchanged between runs, and so this will be `null` unless
	 * and until a new dependency is accessed — we track this via `skipped_deps`
	 * @type {null | Value[]}
	 */
	let new_deps = null;

	let skipped_deps = 0;

	/**
	 * Tracks writes that the effect it's executed in doesn't listen to yet,
	 * so that the dependency can be added to the effect later on if it then reads it
	 * @type {null | Source[]}
	 */
	let untracked_writes = null;

	/** @param {null | Source[]} value */
	function set_untracked_writes(value) {
		untracked_writes = value;
	}

	/** @type {number} Used by sources and deriveds for handling updates to unowned deriveds it starts from 1 to differentiate between a created effect and a run one for tracing */
	let current_version = 1;

	// If we are working with a get() chain that has no active container,
	// to prevent memory leaks, we skip adding the reaction.
	let skip_reaction = false;

	// Handling runtime component context
	/** @type {ComponentContext | null} */
	let component_context = null;

	/** @param {ComponentContext | null} context */
	function set_component_context(context) {
		component_context = context;
	}

	/**
	 * The current component function. Different from current component context:
	 * ```html
	 * <!-- App.svelte -->
	 * <Foo>
	 *   <Bar /> <!-- context == Foo.svelte, function == App.svelte -->
	 * </Foo>
	 * ```
	 * @type {ComponentContext['function']}
	 */
	let dev_current_component_function = null;

	/** @param {ComponentContext['function']} fn */
	function set_dev_current_component_function(fn) {
		dev_current_component_function = fn;
	}

	function increment_version() {
		return ++current_version;
	}

	/** @returns {boolean} */
	function is_runes() {
		return !legacy_mode_flag || (component_context !== null && component_context.l === null);
	}

	/**
	 * Determines whether a derived or effect is dirty.
	 * If it is MAYBE_DIRTY, will set the status to CLEAN
	 * @param {Reaction} reaction
	 * @returns {boolean}
	 */
	function check_dirtiness(reaction) {
		var flags = reaction.f;

		if ((flags & DIRTY) !== 0) {
			return true;
		}

		if ((flags & MAYBE_DIRTY) !== 0) {
			var dependencies = reaction.deps;
			var is_unowned = (flags & UNOWNED) !== 0;

			if (dependencies !== null) {
				var i;

				if ((flags & DISCONNECTED) !== 0) {
					for (i = 0; i < dependencies.length; i++) {
						(dependencies[i].reactions ??= []).push(reaction);
					}

					reaction.f ^= DISCONNECTED;
				}

				for (i = 0; i < dependencies.length; i++) {
					var dependency = dependencies[i];

					if (check_dirtiness(/** @type {Derived} */ (dependency))) {
						update_derived(/** @type {Derived} */ (dependency));
					}

					// If we are working with an unowned signal as part of an effect (due to !skip_reaction)
					// and the version hasn't changed, we still need to check that this reaction
					// is linked to the dependency source – otherwise future updates will not be caught.
					if (
						is_unowned &&
						active_effect !== null &&
						!skip_reaction &&
						!dependency?.reactions?.includes(reaction)
					) {
						(dependency.reactions ??= []).push(reaction);
					}

					if (dependency.version > reaction.version) {
						return true;
					}
				}
			}

			// Unowned signals should never be marked as clean unless they
			// are used within an active_effect without skip_reaction
			if (!is_unowned || (active_effect !== null && !skip_reaction)) {
				set_signal_status(reaction, CLEAN);
			}
		}

		return false;
	}

	/**
	 * @param {unknown} error
	 * @param {Effect} effect
	 */
	function propagate_error(error, effect) {
		/** @type {Effect | null} */
		var current = effect;

		while (current !== null) {
			if ((current.f & BOUNDARY_EFFECT) !== 0) {
				try {
					// @ts-expect-error
					current.fn(error);
					return;
				} catch {
					// Remove boundary flag from effect
					current.f ^= BOUNDARY_EFFECT;
				}
			}

			current = current.parent;
		}

		is_throwing_error = false;
		throw error;
	}

	/**
	 * @param {Effect} effect
	 */
	function should_rethrow_error(effect) {
		return (
			(effect.f & DESTROYED) === 0 &&
			(effect.parent === null || (effect.parent.f & BOUNDARY_EFFECT) === 0)
		);
	}

	/**
	 * @param {unknown} error
	 * @param {Effect} effect
	 * @param {Effect | null} previous_effect
	 * @param {ComponentContext | null} component_context
	 */
	function handle_error(error, effect, previous_effect, component_context) {
		if (is_throwing_error) {
			if (previous_effect === null) {
				is_throwing_error = false;
			}

			if (should_rethrow_error(effect)) {
				throw error;
			}

			return;
		}

		if (previous_effect !== null) {
			is_throwing_error = true;
		}

		if (
			!DEV ||
			component_context === null ||
			!(error instanceof Error) ||
			handled_errors.has(error)
		) {
			propagate_error(error, effect);
			return;
		}

		handled_errors.add(error);

		const component_stack = [];

		const effect_name = effect.fn?.name;

		if (effect_name) {
			component_stack.push(effect_name);
		}

		/** @type {ComponentContext | null} */
		let current_context = component_context;

		while (current_context !== null) {
			if (DEV) {
				/** @type {string} */
				var filename = current_context.function?.[FILENAME];

				if (filename) {
					const file = filename.split('/').pop();
					component_stack.push(file);
				}
			}

			current_context = current_context.p;
		}

		const indent = /Firefox/.test(navigator.userAgent) ? '  ' : '\t';
		define_property(error, 'message', {
			value: error.message + `\n${component_stack.map((name) => `\n${indent}in ${name}`).join('')}\n`
		});
		define_property(error, 'component_stack', {
			value: component_stack
		});

		const stack = error.stack;

		// Filter out internal files from callstack
		if (stack) {
			const lines = stack.split('\n');
			const new_lines = [];
			for (let i = 0; i < lines.length; i++) {
				const line = lines[i];
				if (line.includes('svelte/src/internal')) {
					continue;
				}
				new_lines.push(line);
			}
			define_property(error, 'stack', {
				value: new_lines.join('\n')
			});
		}

		propagate_error(error, effect);

		if (should_rethrow_error(effect)) {
			throw error;
		}
	}

	/**
	 * @template V
	 * @param {Reaction} reaction
	 * @returns {V}
	 */
	function update_reaction(reaction) {
		var previous_deps = new_deps;
		var previous_skipped_deps = skipped_deps;
		var previous_untracked_writes = untracked_writes;
		var previous_reaction = active_reaction;
		var previous_skip_reaction = skip_reaction;
		var prev_derived_sources = derived_sources;
		var previous_component_context = component_context;
		var flags = reaction.f;

		new_deps = /** @type {null | Value[]} */ (null);
		skipped_deps = 0;
		untracked_writes = null;
		active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
		skip_reaction = !is_flushing_effect && (flags & UNOWNED) !== 0;
		derived_sources = null;
		component_context = reaction.ctx;

		try {
			var result = /** @type {Function} */ (0, reaction.fn)();
			var deps = reaction.deps;

			if (new_deps !== null) {
				var i;

				remove_reactions(reaction, skipped_deps);

				if (deps !== null && skipped_deps > 0) {
					deps.length = skipped_deps + new_deps.length;
					for (i = 0; i < new_deps.length; i++) {
						deps[skipped_deps + i] = new_deps[i];
					}
				} else {
					reaction.deps = deps = new_deps;
				}

				if (!skip_reaction) {
					for (i = skipped_deps; i < deps.length; i++) {
						(deps[i].reactions ??= []).push(reaction);
					}
				}
			} else if (deps !== null && skipped_deps < deps.length) {
				remove_reactions(reaction, skipped_deps);
				deps.length = skipped_deps;
			}

			return result;
		} finally {
			new_deps = previous_deps;
			skipped_deps = previous_skipped_deps;
			untracked_writes = previous_untracked_writes;
			active_reaction = previous_reaction;
			skip_reaction = previous_skip_reaction;
			derived_sources = prev_derived_sources;
			component_context = previous_component_context;
		}
	}

	/**
	 * @template V
	 * @param {Reaction} signal
	 * @param {Value<V>} dependency
	 * @returns {void}
	 */
	function remove_reaction(signal, dependency) {
		let reactions = dependency.reactions;
		if (reactions !== null) {
			var index = reactions.indexOf(signal);
			if (index !== -1) {
				var new_length = reactions.length - 1;
				if (new_length === 0) {
					reactions = dependency.reactions = null;
				} else {
					// Swap with last element and then remove.
					reactions[index] = reactions[new_length];
					reactions.pop();
				}
			}
		}
		// If the derived has no reactions, then we can disconnect it from the graph,
		// allowing it to either reconnect in the future, or be GC'd by the VM.
		if (
			reactions === null &&
			(dependency.f & DERIVED) !== 0 &&
			// Destroying a child effect while updating a parent effect can cause a dependency to appear
			// to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
			// allows us to skip the expensive work of disconnecting and immediately reconnecting it
			(new_deps === null || !new_deps.includes(dependency))
		) {
			set_signal_status(dependency, MAYBE_DIRTY);
			// If we are working with a derived that is owned by an effect, then mark it as being
			// disconnected.
			if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
				dependency.f ^= DISCONNECTED;
			}
			remove_reactions(/** @type {Derived} **/ (dependency), 0);
		}
	}

	/**
	 * @param {Reaction} signal
	 * @param {number} start_index
	 * @returns {void}
	 */
	function remove_reactions(signal, start_index) {
		var dependencies = signal.deps;
		if (dependencies === null) return;

		for (var i = start_index; i < dependencies.length; i++) {
			remove_reaction(signal, dependencies[i]);
		}
	}

	/**
	 * @param {Effect} effect
	 * @returns {void}
	 */
	function update_effect(effect) {
		var flags = effect.f;

		if ((flags & DESTROYED) !== 0) {
			return;
		}

		set_signal_status(effect, CLEAN);

		var previous_effect = active_effect;
		var previous_component_context = component_context;

		active_effect = effect;

		if (DEV) {
			var previous_component_fn = dev_current_component_function;
			dev_current_component_function = effect.component_function;
		}

		try {
			if ((flags & BLOCK_EFFECT) !== 0) {
				destroy_block_effect_children(effect);
			} else {
				destroy_effect_children(effect);
			}
			destroy_effect_deriveds(effect);

			execute_effect_teardown(effect);
			var teardown = update_reaction(effect);
			effect.teardown = typeof teardown === 'function' ? teardown : null;
			effect.version = current_version;

			if (DEV) {
				dev_effect_stack.push(effect);
			}
		} catch (error) {
			handle_error(error, effect, previous_effect, previous_component_context || effect.ctx);
		} finally {
			active_effect = previous_effect;

			if (DEV) {
				dev_current_component_function = previous_component_fn;
			}
		}
	}

	function log_effect_stack() {
		// eslint-disable-next-line no-console
		console.error(
			'Last ten effects were: ',
			dev_effect_stack.slice(-10).map((d) => d.fn)
		);
		dev_effect_stack = [];
	}

	function infinite_loop_guard() {
		if (flush_count > 1000) {
			flush_count = 0;
			try {
				effect_update_depth_exceeded();
			} catch (error) {
				if (DEV) {
					// stack is garbage, ignore. Instead add a console.error message.
					define_property(error, 'stack', {
						value: ''
					});
				}
				// Try and handle the error so it can be caught at a boundary, that's
				// if there's an effect available from when it was last scheduled
				if (last_scheduled_effect !== null) {
					if (DEV) {
						try {
							handle_error(error, last_scheduled_effect, null, null);
						} catch (e) {
							// Only log the effect stack if the error is re-thrown
							log_effect_stack();
							throw e;
						}
					} else {
						handle_error(error, last_scheduled_effect, null, null);
					}
				} else {
					if (DEV) {
						log_effect_stack();
					}
					throw error;
				}
			}
		}
		flush_count++;
	}

	/**
	 * @param {Array<Effect>} root_effects
	 * @returns {void}
	 */
	function flush_queued_root_effects(root_effects) {
		var length = root_effects.length;
		if (length === 0) {
			return;
		}
		infinite_loop_guard();

		var previously_flushing_effect = is_flushing_effect;
		is_flushing_effect = true;

		try {
			for (var i = 0; i < length; i++) {
				var effect = root_effects[i];

				if ((effect.f & CLEAN) === 0) {
					effect.f ^= CLEAN;
				}

				/** @type {Effect[]} */
				var collected_effects = [];

				process_effects(effect, collected_effects);
				flush_queued_effects(collected_effects);
			}
		} finally {
			is_flushing_effect = previously_flushing_effect;
		}
	}

	/**
	 * @param {Array<Effect>} effects
	 * @returns {void}
	 */
	function flush_queued_effects(effects) {
		var length = effects.length;
		if (length === 0) return;

		for (var i = 0; i < length; i++) {
			var effect = effects[i];

			if ((effect.f & (DESTROYED | INERT)) === 0) {
				try {
					if (check_dirtiness(effect)) {
						update_effect(effect);

						// Effects with no dependencies or teardown do not get added to the effect tree.
						// Deferred effects (e.g. `$effect(...)`) _are_ added to the tree because we
						// don't know if we need to keep them until they are executed. Doing the check
						// here (rather than in `update_effect`) allows us to skip the work for
						// immediate effects.
						if (effect.deps === null && effect.first === null && effect.nodes_start === null) {
							if (effect.teardown === null) {
								// remove this effect from the graph
								unlink_effect(effect);
							} else {
								// keep the effect in the graph, but free up some memory
								effect.fn = null;
							}
						}
					}
				} catch (error) {
					handle_error(error, effect, null, effect.ctx);
				}
			}
		}
	}

	function process_deferred() {
		is_micro_task_queued = false;
		if (flush_count > 1001) {
			return;
		}
		const previous_queued_root_effects = queued_root_effects;
		queued_root_effects = [];
		flush_queued_root_effects(previous_queued_root_effects);

		if (!is_micro_task_queued) {
			flush_count = 0;
			last_scheduled_effect = null;
			if (DEV) {
				dev_effect_stack = [];
			}
		}
	}

	/**
	 * @param {Effect} signal
	 * @returns {void}
	 */
	function schedule_effect(signal) {
		if (scheduler_mode === FLUSH_MICROTASK) {
			if (!is_micro_task_queued) {
				is_micro_task_queued = true;
				queueMicrotask(process_deferred);
			}
		}

		last_scheduled_effect = signal;

		var effect = signal;

		while (effect.parent !== null) {
			effect = effect.parent;
			var flags = effect.f;

			if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
				if ((flags & CLEAN) === 0) return;
				effect.f ^= CLEAN;
			}
		}

		queued_root_effects.push(effect);
	}

	/**
	 *
	 * This function both runs render effects and collects user effects in topological order
	 * from the starting effect passed in. Effects will be collected when they match the filtered
	 * bitwise flag passed in only. The collected effects array will be populated with all the user
	 * effects to be flushed.
	 *
	 * @param {Effect} effect
	 * @param {Effect[]} collected_effects
	 * @returns {void}
	 */
	function process_effects(effect, collected_effects) {
		var current_effect = effect.first;
		var effects = [];

		main_loop: while (current_effect !== null) {
			var flags = current_effect.f;
			var is_branch = (flags & BRANCH_EFFECT) !== 0;
			var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;
			var sibling = current_effect.next;

			if (!is_skippable_branch && (flags & INERT) === 0) {
				if ((flags & RENDER_EFFECT) !== 0) {
					if (is_branch) {
						current_effect.f ^= CLEAN;
					} else {
						try {
							if (check_dirtiness(current_effect)) {
								update_effect(current_effect);
							}
						} catch (error) {
							handle_error(error, current_effect, null, current_effect.ctx);
						}
					}

					var child = current_effect.first;

					if (child !== null) {
						current_effect = child;
						continue;
					}
				} else if ((flags & EFFECT) !== 0) {
					effects.push(current_effect);
				}
			}

			if (sibling === null) {
				let parent = current_effect.parent;

				while (parent !== null) {
					if (effect === parent) {
						break main_loop;
					}
					var parent_sibling = parent.next;
					if (parent_sibling !== null) {
						current_effect = parent_sibling;
						continue main_loop;
					}
					parent = parent.parent;
				}
			}

			current_effect = sibling;
		}

		// We might be dealing with many effects here, far more than can be spread into
		// an array push call (callstack overflow). So let's deal with each effect in a loop.
		for (var i = 0; i < effects.length; i++) {
			child = effects[i];
			collected_effects.push(child);
			process_effects(child, collected_effects);
		}
	}

	/**
	 * Internal version of `flushSync` with the option to not flush previous effects.
	 * Returns the result of the passed function, if given.
	 * @param {() => any} [fn]
	 * @returns {any}
	 */
	function flush_sync(fn) {
		var previous_scheduler_mode = scheduler_mode;
		var previous_queued_root_effects = queued_root_effects;

		try {
			infinite_loop_guard();

			/** @type {Effect[]} */
			const root_effects = [];

			scheduler_mode = FLUSH_SYNC;
			queued_root_effects = root_effects;
			is_micro_task_queued = false;

			flush_queued_root_effects(previous_queued_root_effects);

			var result = fn?.();

			flush_tasks();
			if (queued_root_effects.length > 0 || root_effects.length > 0) {
				flush_sync();
			}

			flush_count = 0;
			last_scheduled_effect = null;
			if (DEV) {
				dev_effect_stack = [];
			}

			return result;
		} finally {
			scheduler_mode = previous_scheduler_mode;
			queued_root_effects = previous_queued_root_effects;
		}
	}

	/**
	 * @template V
	 * @param {Value<V>} signal
	 * @returns {V}
	 */
	function get(signal) {
		var flags = signal.f;
		var is_derived = (flags & DERIVED) !== 0;

		// If the derived is destroyed, just execute it again without retaining
		// its memoisation properties as the derived is stale
		if (is_derived && (flags & DESTROYED) !== 0) {
			var value = execute_derived(/** @type {Derived} */ (signal));
			// Ensure the derived remains destroyed
			destroy_derived(/** @type {Derived} */ (signal));
			return value;
		}

		// Register the dependency on the current reaction signal.
		if (active_reaction !== null) {
			if (derived_sources !== null && derived_sources.includes(signal)) {
				state_unsafe_local_read();
			}
			var deps = active_reaction.deps;

			// If the signal is accessing the same dependencies in the same
			// order as it did last time, increment `skipped_deps`
			// rather than updating `new_deps`, which creates GC cost
			if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
				skipped_deps++;
			} else if (new_deps === null) {
				new_deps = [signal];
			} else {
				new_deps.push(signal);
			}

			if (
				untracked_writes !== null &&
				active_effect !== null &&
				(active_effect.f & CLEAN) !== 0 &&
				(active_effect.f & BRANCH_EFFECT) === 0 &&
				untracked_writes.includes(signal)
			) {
				set_signal_status(active_effect, DIRTY);
				schedule_effect(active_effect);
			}
		} else if (is_derived && /** @type {Derived} */ (signal).deps === null) {
			var derived = /** @type {Derived} */ (signal);
			var parent = derived.parent;
			var target = derived;

			while (parent !== null) {
				// Attach the derived to the nearest parent effect, if there are deriveds
				// in between then we also need to attach them too
				if ((parent.f & DERIVED) !== 0) {
					var parent_derived = /** @type {Derived} */ (parent);

					target = parent_derived;
					parent = parent_derived.parent;
				} else {
					var parent_effect = /** @type {Effect} */ (parent);

					if (!parent_effect.deriveds?.includes(target)) {
						(parent_effect.deriveds ??= []).push(target);
					}
					break;
				}
			}
		}

		if (is_derived) {
			derived = /** @type {Derived} */ (signal);

			if (check_dirtiness(derived)) {
				update_derived(derived);
			}
		}

		if (
			DEV &&
			tracing_mode_flag &&
			tracing_expressions !== null &&
			active_reaction !== null &&
			tracing_expressions.reaction === active_reaction
		) {
			// Used when mapping state between special blocks like `each`
			if (signal.debug) {
				signal.debug();
			} else if (signal.created) {
				var entry = tracing_expressions.entries.get(signal);

				if (entry === undefined) {
					entry = { read: [] };
					tracing_expressions.entries.set(signal, entry);
				}

				entry.read.push(get_stack$1('TracedAt'));
			}
		}

		return signal.v;
	}

	/**
	 * When used inside a [`$derived`](https://svelte.dev/docs/svelte/$derived) or [`$effect`](https://svelte.dev/docs/svelte/$effect),
	 * any state read inside `fn` will not be treated as a dependency.
	 *
	 * ```ts
	 * $effect(() => {
	 *   // this will run when `data` changes, but not when `time` changes
	 *   save(data, {
	 *     timestamp: untrack(() => time)
	 *   });
	 * });
	 * ```
	 * @template T
	 * @param {() => T} fn
	 * @returns {T}
	 */
	function untrack(fn) {
		const previous_reaction = active_reaction;
		try {
			active_reaction = null;
			return fn();
		} finally {
			active_reaction = previous_reaction;
		}
	}

	const STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);

	/**
	 * @param {Signal} signal
	 * @param {number} status
	 * @returns {void}
	 */
	function set_signal_status(signal, status) {
		signal.f = (signal.f & STATUS_MASK) | status;
	}

	/**
	 * @template {number | bigint} T
	 * @param {Value<T>} signal
	 * @param {1 | -1} [d]
	 * @returns {T}
	 */
	function update(signal, d = 1) {
		var value = get(signal);
		var result = d === 1 ? value++ : value--;

		set(signal, value);

		// @ts-expect-error
		return result;
	}

	/**
	 * @param {Record<string, unknown>} props
	 * @param {any} runes
	 * @param {Function} [fn]
	 * @returns {void}
	 */
	function push(props, runes = false, fn) {
		component_context = {
			p: component_context,
			c: null,
			e: null,
			m: false,
			s: props,
			x: null,
			l: null
		};

		if (legacy_mode_flag && !runes) {
			component_context.l = {
				s: null,
				u: null,
				r1: [],
				r2: source(false)
			};
		}

		if (DEV) {
			// component function
			component_context.function = fn;
			dev_current_component_function = fn;
		}
	}

	/**
	 * @template {Record<string, any>} T
	 * @param {T} [component]
	 * @returns {T}
	 */
	function pop(component) {
		const context_stack_item = component_context;
		if (context_stack_item !== null) {
			if (component !== undefined) {
				context_stack_item.x = component;
			}
			const component_effects = context_stack_item.e;
			if (component_effects !== null) {
				var previous_effect = active_effect;
				var previous_reaction = active_reaction;
				context_stack_item.e = null;
				try {
					for (var i = 0; i < component_effects.length; i++) {
						var component_effect = component_effects[i];
						set_active_effect(component_effect.effect);
						set_active_reaction(component_effect.reaction);
						effect(component_effect.fn);
					}
				} finally {
					set_active_effect(previous_effect);
					set_active_reaction(previous_reaction);
				}
			}
			component_context = context_stack_item.p;
			if (DEV) {
				dev_current_component_function = context_stack_item.p?.function ?? null;
			}
			context_stack_item.m = true;
		}
		// Micro-optimization: Don't set .a above to the empty object
		// so it can be garbage-collected when the return here is unused
		return component || /** @type {T} */ ({});
	}

	/**
	 * Possibly traverse an object and read all its properties so that they're all reactive in case this is `$state`.
	 * Does only check first level of an object for performance reasons (heuristic should be good for 99% of all cases).
	 * @param {any} value
	 * @returns {void}
	 */
	function deep_read_state(value) {
		if (typeof value !== 'object' || !value || value instanceof EventTarget) {
			return;
		}

		if (STATE_SYMBOL in value) {
			deep_read(value);
		} else if (!Array.isArray(value)) {
			for (let key in value) {
				const prop = value[key];
				if (typeof prop === 'object' && prop && STATE_SYMBOL in prop) {
					deep_read(prop);
				}
			}
		}
	}

	/**
	 * Deeply traverse an object and read all its properties
	 * so that they're all reactive in case this is `$state`
	 * @param {any} value
	 * @param {Set<any>} visited
	 * @returns {void}
	 */
	function deep_read(value, visited = new Set()) {
		if (
			typeof value === 'object' &&
			value !== null &&
			// We don't want to traverse DOM elements
			!(value instanceof EventTarget) &&
			!visited.has(value)
		) {
			visited.add(value);
			// When working with a possible SvelteDate, this
			// will ensure we capture changes to it.
			if (value instanceof Date) {
				value.getTime();
			}
			for (let key in value) {
				try {
					deep_read(value[key], visited);
				} catch (e) {
					// continue
				}
			}
			const proto = get_prototype_of(value);
			if (
				proto !== Object.prototype &&
				proto !== Array.prototype &&
				proto !== Map.prototype &&
				proto !== Set.prototype &&
				proto !== Date.prototype
			) {
				const descriptors = get_descriptors(proto);
				for (let key in descriptors) {
					const get = descriptors[key].get;
					if (get) {
						try {
							get.call(value);
						} catch (e) {
							// continue
						}
					}
				}
			}
		}
	}

	if (DEV) {
		/**
		 * @param {string} rune
		 */
		function throw_rune_error(rune) {
			if (!(rune in globalThis)) {
				// TODO if people start adjusting the "this can contain runes" config through v-p-s more, adjust this message
				/** @type {any} */
				let value; // let's hope noone modifies this global, but belts and braces
				Object.defineProperty(globalThis, rune, {
					configurable: true,
					// eslint-disable-next-line getter-return
					get: () => {
						if (value !== undefined) {
							return value;
						}

						rune_outside_svelte(rune);
					},
					set: (v) => {
						value = v;
					}
				});
			}
		}

		throw_rune_error('$state');
		throw_rune_error('$effect');
		throw_rune_error('$derived');
		throw_rune_error('$inspect');
		throw_rune_error('$props');
		throw_rune_error('$bindable');
	}

	/** @import { SourceLocation } from '#shared' */

	/**
	 * @param {any} fn
	 * @param {string} filename
	 * @param {SourceLocation[]} locations
	 * @returns {any}
	 */
	function add_locations(fn, filename, locations) {
		return (/** @type {any[]} */ ...args) => {
			const dom = fn(...args);

			var node = dom.nodeType === 11 ? dom.firstChild : dom;
			assign_locations(node, filename, locations);

			return dom;
		};
	}

	/**
	 * @param {Element} element
	 * @param {string} filename
	 * @param {SourceLocation} location
	 */
	function assign_location(element, filename, location) {
		// @ts-expect-error
		element.__svelte_meta = {
			loc: { file: filename, line: location[0], column: location[1] }
		};

		if (location[2]) {
			assign_locations(element.firstChild, filename, location[2]);
		}
	}

	/**
	 * @param {Node | null} node
	 * @param {string} filename
	 * @param {SourceLocation[]} locations
	 */
	function assign_locations(node, filename, locations) {
		var i = 0;

		while (node && i < locations.length) {

			if (node.nodeType === 1) {
				assign_location(/** @type {Element} */ (node), filename, locations[i++]);
			}

			node = node.nextSibling;
		}
	}

	/**
	 * @param {HTMLElement} dom
	 * @param {boolean} value
	 * @returns {void}
	 */
	function autofocus(dom, value) {
		if (value) {
			const body = document.body;
			dom.autofocus = true;

			queue_micro_task(() => {
				if (document.activeElement === body) {
					dom.focus();
				}
			});
		}
	}

	/**
	 * @template T
	 * @param {() => T} fn
	 */
	function without_reactive_context(fn) {
		var previous_reaction = active_reaction;
		var previous_effect = active_effect;
		set_active_reaction(null);
		set_active_effect(null);
		try {
			return fn();
		} finally {
			set_active_reaction(previous_reaction);
			set_active_effect(previous_effect);
		}
	}

	/** @import { Location } from 'locate-character' */

	/** @type {Set<string>} */
	const all_registered_events = new Set();

	/** @type {Set<(events: Array<string>) => void>} */
	const root_event_handles = new Set();

	/**
	 * @param {string} event_name
	 * @param {EventTarget} dom
	 * @param {EventListener} handler
	 * @param {AddEventListenerOptions} options
	 */
	function create_event(event_name, dom, handler, options) {
		/**
		 * @this {EventTarget}
		 */
		function target_handler(/** @type {Event} */ event) {
			if (!options.capture) {
				// Only call in the bubble phase, else delegated events would be called before the capturing events
				handle_event_propagation.call(dom, event);
			}
			if (!event.cancelBubble) {
				return without_reactive_context(() => {
					return handler.call(this, event);
				});
			}
		}

		// Chrome has a bug where pointer events don't work when attached to a DOM element that has been cloned
		// with cloneNode() and the DOM element is disconnected from the document. To ensure the event works, we
		// defer the attachment till after it's been appended to the document. TODO: remove this once Chrome fixes
		// this bug. The same applies to wheel events and touch events.
		if (
			event_name.startsWith('pointer') ||
			event_name.startsWith('touch') ||
			event_name === 'wheel'
		) {
			queue_micro_task(() => {
				dom.addEventListener(event_name, target_handler, options);
			});
		} else {
			dom.addEventListener(event_name, target_handler, options);
		}

		return target_handler;
	}

	/**
	 * @param {Array<string>} events
	 * @returns {void}
	 */
	function delegate(events) {
		for (var i = 0; i < events.length; i++) {
			all_registered_events.add(events[i]);
		}

		for (var fn of root_event_handles) {
			fn(events);
		}
	}

	/**
	 * @this {EventTarget}
	 * @param {Event} event
	 * @returns {void}
	 */
	function handle_event_propagation(event) {
		var handler_element = this;
		var owner_document = /** @type {Node} */ (handler_element).ownerDocument;
		var event_name = event.type;
		var path = event.composedPath?.() || [];
		var current_target = /** @type {null | Element} */ (path[0] || event.target);

		// composedPath contains list of nodes the event has propagated through.
		// We check __root to skip all nodes below it in case this is a
		// parent of the __root node, which indicates that there's nested
		// mounted apps. In this case we don't want to trigger events multiple times.
		var path_idx = 0;

		// @ts-expect-error is added below
		var handled_at = event.__root;

		if (handled_at) {
			var at_idx = path.indexOf(handled_at);
			if (
				at_idx !== -1 &&
				(handler_element === document || handler_element === /** @type {any} */ (window))
			) {
				// This is the fallback document listener or a window listener, but the event was already handled
				// -> ignore, but set handle_at to document/window so that we're resetting the event
				// chain in case someone manually dispatches the same event object again.
				// @ts-expect-error
				event.__root = handler_element;
				return;
			}

			// We're deliberately not skipping if the index is higher, because
			// someone could create an event programmatically and emit it multiple times,
			// in which case we want to handle the whole propagation chain properly each time.
			// (this will only be a false negative if the event is dispatched multiple times and
			// the fallback document listener isn't reached in between, but that's super rare)
			var handler_idx = path.indexOf(handler_element);
			if (handler_idx === -1) {
				// handle_idx can theoretically be -1 (happened in some JSDOM testing scenarios with an event listener on the window object)
				// so guard against that, too, and assume that everything was handled at this point.
				return;
			}

			if (at_idx <= handler_idx) {
				path_idx = at_idx;
			}
		}

		current_target = /** @type {Element} */ (path[path_idx] || event.target);
		// there can only be one delegated event per element, and we either already handled the current target,
		// or this is the very first target in the chain which has a non-delegated listener, in which case it's safe
		// to handle a possible delegated event on it later (through the root delegation listener for example).
		if (current_target === handler_element) return;

		// Proxy currentTarget to correct target
		define_property(event, 'currentTarget', {
			configurable: true,
			get() {
				return current_target || owner_document;
			}
		});

		// This started because of Chromium issue https://chromestatus.com/feature/5128696823545856,
		// where removal or moving of of the DOM can cause sync `blur` events to fire, which can cause logic
		// to run inside the current `active_reaction`, which isn't what we want at all. However, on reflection,
		// it's probably best that all event handled by Svelte have this behaviour, as we don't really want
		// an event handler to run in the context of another reaction or effect.
		var previous_reaction = active_reaction;
		var previous_effect = active_effect;
		set_active_reaction(null);
		set_active_effect(null);

		try {
			/**
			 * @type {unknown}
			 */
			var throw_error;
			/**
			 * @type {unknown[]}
			 */
			var other_errors = [];

			while (current_target !== null) {
				/** @type {null | Element} */
				var parent_element =
					current_target.assignedSlot ||
					current_target.parentNode ||
					/** @type {any} */ (current_target).host ||
					null;

				try {
					// @ts-expect-error
					var delegated = current_target['__' + event_name];

					if (delegated !== undefined && !(/** @type {any} */ (current_target).disabled)) {
						if (is_array(delegated)) {
							var [fn, ...data] = delegated;
							fn.apply(current_target, [event, ...data]);
						} else {
							delegated.call(current_target, event);
						}
					}
				} catch (error) {
					if (throw_error) {
						other_errors.push(error);
					} else {
						throw_error = error;
					}
				}
				if (event.cancelBubble || parent_element === handler_element || parent_element === null) {
					break;
				}
				current_target = parent_element;
			}

			if (throw_error) {
				for (let error of other_errors) {
					// Throw the rest of the errors, one-by-one on a microtask
					queueMicrotask(() => {
						throw error;
					});
				}
				throw throw_error;
			}
		} finally {
			// @ts-expect-error is used above
			event.__root = handler_element;
			// @ts-ignore remove proxy on currentTarget
			delete event.currentTarget;
			set_active_reaction(previous_reaction);
			set_active_effect(previous_effect);
		}
	}

	/**
	 * In dev, warn if an event handler is not a function, as it means the
	 * user probably called the handler or forgot to add a `() =>`
	 * @param {() => (event: Event, ...args: any) => void} thunk
	 * @param {EventTarget} element
	 * @param {[Event, ...any]} args
	 * @param {any} component
	 * @param {[number, number]} [loc]
	 * @param {boolean} [remove_parens]
	 */
	function apply(
		thunk,
		element,
		args,
		component,
		loc,
		has_side_effects = false,
		remove_parens = false
	) {
		let handler;
		let error;

		try {
			handler = thunk();
		} catch (e) {
			error = e;
		}

		if (typeof handler === 'function') {
			handler.apply(element, args);
		} else if (has_side_effects || handler != null || error) {
			const filename = component?.[FILENAME];
			const location = loc ? ` at ${filename}:${loc[0]}:${loc[1]}` : ` in ${filename}`;

			const event_name = args[0].type;
			const description = `\`${event_name}\` handler${location}`;
			const suggestion = remove_parens ? 'remove the trailing `()`' : 'add a leading `() =>`';

			event_handler_invalid(description, suggestion);

			if (error) {
				throw error;
			}
		}
	}

	/** @param {string} html */
	function create_fragment_from_html(html) {
		var elem = document.createElement('template');
		elem.innerHTML = html;
		return elem.content;
	}

	/** @import { Effect, TemplateNode } from '#client' */

	/**
	 * @param {TemplateNode} start
	 * @param {TemplateNode | null} end
	 */
	function assign_nodes(start, end) {
		var effect = /** @type {Effect} */ (active_effect);
		if (effect.nodes_start === null) {
			effect.nodes_start = start;
			effect.nodes_end = end;
		}
	}

	/**
	 * @param {string} content
	 * @param {number} flags
	 * @returns {() => Node | Node[]}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function template(content, flags) {
		var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
		var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;

		/** @type {Node} */
		var node;

		/**
		 * Whether or not the first item is a text/element node. If not, we need to
		 * create an additional comment node to act as `effect.nodes.start`
		 */
		var has_start = !content.startsWith('<!>');

		return () => {

			if (node === undefined) {
				node = create_fragment_from_html(has_start ? content : '<!>' + content);
				if (!is_fragment) node = /** @type {Node} */ (get_first_child(node));
			}

			var clone = /** @type {TemplateNode} */ (
				use_import_node ? document.importNode(node, true) : node.cloneNode(true)
			);

			if (is_fragment) {
				var start = /** @type {TemplateNode} */ (get_first_child(clone));
				var end = /** @type {TemplateNode} */ (clone.lastChild);

				assign_nodes(start, end);
			} else {
				assign_nodes(clone, clone);
			}

			return clone;
		};
	}

	/**
	 * @param {string} content
	 * @param {number} flags
	 * @param {'svg' | 'math'} ns
	 * @returns {() => Node | Node[]}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function ns_template(content, flags, ns = 'svg') {
		/**
		 * Whether or not the first item is a text/element node. If not, we need to
		 * create an additional comment node to act as `effect.nodes.start`
		 */
		var has_start = !content.startsWith('<!>');

		var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
		var wrapped = `<${ns}>${has_start ? content : '<!>' + content}</${ns}>`;

		/** @type {Element | DocumentFragment} */
		var node;

		return () => {

			if (!node) {
				var fragment = /** @type {DocumentFragment} */ (create_fragment_from_html(wrapped));
				var root = /** @type {Element} */ (get_first_child(fragment));

				if (is_fragment) {
					node = document.createDocumentFragment();
					while (get_first_child(root)) {
						node.appendChild(/** @type {Node} */ (get_first_child(root)));
					}
				} else {
					node = /** @type {Element} */ (get_first_child(root));
				}
			}

			var clone = /** @type {TemplateNode} */ (node.cloneNode(true));

			if (is_fragment) {
				var start = /** @type {TemplateNode} */ (get_first_child(clone));
				var end = /** @type {TemplateNode} */ (clone.lastChild);

				assign_nodes(start, end);
			} else {
				assign_nodes(clone, clone);
			}

			return clone;
		};
	}

	function comment() {

		var frag = document.createDocumentFragment();
		var start = document.createComment('');
		var anchor = create_text();
		frag.append(start, anchor);

		assign_nodes(start, anchor);

		return frag;
	}

	/**
	 * Assign the created (or in hydration mode, traversed) dom elements to the current block
	 * and insert the elements into the dom (in client mode).
	 * @param {Text | Comment | Element} anchor
	 * @param {DocumentFragment | Element} dom
	 */
	function append(anchor, dom) {

		if (anchor === null) {
			// edge case — void `<svelte:element>` with content
			return;
		}

		anchor.before(/** @type {Node} */ (dom));
	}

	/** @import { ComponentContext, Effect, TemplateNode } from '#client' */

	/**
	 * @param {Element} text
	 * @param {string} value
	 * @returns {void}
	 */
	function set_text(text, value) {
		// For objects, we apply string coercion (which might make things like $state array references in the template reactive) before diffing
		var str = value == null ? '' : typeof value === 'object' ? value + '' : value;
		// @ts-expect-error
		if (str !== (text.__t ??= text.nodeValue)) {
			// @ts-expect-error
			text.__t = str;
			text.nodeValue = str == null ? '' : str + '';
		}
	}

	/** @param {Function & { [FILENAME]: string }} target */
	function check_target(target) {
		if (target) {
			component_api_invalid_new(target[FILENAME] ?? 'a component', target.name);
		}
	}

	function legacy_api() {
		const component = component_context?.function;

		/** @param {string} method */
		function error(method) {
			// @ts-expect-error
			const parent = get_component()?.[FILENAME] ?? 'Something';
			component_api_changed(parent, method, component[FILENAME]);
		}

		return {
			$destroy: () => error('$destroy()'),
			$on: () => error('$on(...)'),
			$set: () => error('$set(...)')
		};
	}

	/** @import { Effect, Source, TemplateNode } from '#client' */

	const PENDING = 0;
	const THEN = 1;
	const CATCH = 2;

	/**
	 * @template V
	 * @param {TemplateNode} node
	 * @param {(() => Promise<V>)} get_input
	 * @param {null | ((anchor: Node) => void)} pending_fn
	 * @param {null | ((anchor: Node, value: Source<V>) => void)} then_fn
	 * @param {null | ((anchor: Node, error: unknown) => void)} catch_fn
	 * @returns {void}
	 */
	function await_block(node, get_input, pending_fn, then_fn, catch_fn) {

		var anchor = node;
		var runes = is_runes();
		var active_component_context = component_context;

		/** @type {any} */
		var component_function = DEV ? component_context?.function : null;

		/** @type {V | Promise<V> | typeof UNINITIALIZED} */
		var input = UNINITIALIZED;

		/** @type {Effect | null} */
		var pending_effect;

		/** @type {Effect | null} */
		var then_effect;

		/** @type {Effect | null} */
		var catch_effect;

		var input_source = (runes ? source : mutable_source)(/** @type {V} */ (undefined));
		var error_source = (runes ? source : mutable_source)(undefined);
		var resolved = false;

		/**
		 * @param {PENDING | THEN | CATCH} state
		 * @param {boolean} restore
		 */
		function update(state, restore) {
			resolved = true;

			if (restore) {
				set_active_effect(effect);
				set_active_reaction(effect); // TODO do we need both?
				set_component_context(active_component_context);
				if (DEV) set_dev_current_component_function(component_function);
			}

			try {
				if (state === PENDING && pending_fn) {
					if (pending_effect) resume_effect(pending_effect);
					else pending_effect = branch(() => pending_fn(anchor));
				}

				if (state === THEN && then_fn) {
					if (then_effect) resume_effect(then_effect);
					else then_effect = branch(() => then_fn(anchor, input_source));
				}

				if (state === CATCH && catch_fn) {
					if (catch_effect) resume_effect(catch_effect);
					else catch_effect = branch(() => catch_fn(anchor, error_source));
				}

				if (state !== PENDING && pending_effect) {
					pause_effect(pending_effect, () => (pending_effect = null));
				}

				if (state !== THEN && then_effect) {
					pause_effect(then_effect, () => (then_effect = null));
				}

				if (state !== CATCH && catch_effect) {
					pause_effect(catch_effect, () => (catch_effect = null));
				}
			} finally {
				if (restore) {
					if (DEV) set_dev_current_component_function(null);
					set_component_context(null);
					set_active_reaction(null);
					set_active_effect(null);

					// without this, the DOM does not update until two ticks after the promise
					// resolves, which is unexpected behaviour (and somewhat irksome to test)
					flush_sync();
				}
			}
		}

		var effect = block(() => {
			if (input === (input = get_input())) return;

			if (is_promise(input)) {
				var promise = input;

				resolved = false;

				promise.then(
					(value) => {
						if (promise !== input) return;
						// we technically could use `set` here since it's on the next microtick
						// but let's use internal_set for consistency and just to be safe
						internal_set(input_source, value);
						update(THEN, true);
					},
					(error) => {
						if (promise !== input) return;
						// we technically could use `set` here since it's on the next microtick
						// but let's use internal_set for consistency and just to be safe
						internal_set(error_source, error);
						update(CATCH, true);
						if (!catch_fn) {
							// Rethrow the error if no catch block exists
							throw error_source.v;
						}
					}
				);

				{
					// Wait a microtask before checking if we should show the pending state as
					// the promise might have resolved by the next microtask.
					queue_micro_task(() => {
						if (!resolved) update(PENDING, true);
					});
				}
			} else {
				internal_set(input_source, input);
				update(THEN, false);
			}

			// Set the input to something else, in order to disable the promise callbacks
			return () => (input = UNINITIALIZED);
		});
	}

	/** @import { Effect, TemplateNode } from '#client' */

	/**
	 * @param {TemplateNode} node
	 * @param {(branch: (fn: (anchor: Node) => void, flag?: boolean) => void) => void} fn
	 * @param {boolean} [elseif] True if this is an `{:else if ...}` block rather than an `{#if ...}`, as that affects which transitions are considered 'local'
	 * @returns {void}
	 */
	function if_block(node, fn, elseif = false) {

		var anchor = node;

		/** @type {Effect | null} */
		var consequent_effect = null;

		/** @type {Effect | null} */
		var alternate_effect = null;

		/** @type {UNINITIALIZED | boolean | null} */
		var condition = UNINITIALIZED;

		var flags = elseif ? EFFECT_TRANSPARENT : 0;

		var has_branch = false;

		const set_branch = (/** @type {(anchor: Node) => void} */ fn, flag = true) => {
			has_branch = true;
			update_branch(flag, fn);
		};

		const update_branch = (
			/** @type {boolean | null} */ new_condition,
			/** @type {null | ((anchor: Node) => void)} */ fn
		) => {
			if (condition === (condition = new_condition)) return;

			if (condition) {
				if (consequent_effect) {
					resume_effect(consequent_effect);
				} else if (fn) {
					consequent_effect = branch(() => fn(anchor));
				}

				if (alternate_effect) {
					pause_effect(alternate_effect, () => {
						alternate_effect = null;
					});
				}
			} else {
				if (alternate_effect) {
					resume_effect(alternate_effect);
				} else if (fn) {
					alternate_effect = branch(() => fn(anchor));
				}

				if (consequent_effect) {
					pause_effect(consequent_effect, () => {
						consequent_effect = null;
					});
				}
			}
		};

		block(() => {
			has_branch = false;
			fn(set_branch);
			if (!has_branch) {
				update_branch(null, null);
			}
		}, flags);
	}

	/** @import { EachItem, EachState, Effect, MaybeSource, Source, TemplateNode, TransitionManager, Value } from '#client' */

	/**
	 * @param {any} _
	 * @param {number} i
	 */
	function index(_, i) {
		return i;
	}

	/**
	 * Pause multiple effects simultaneously, and coordinate their
	 * subsequent destruction. Used in each blocks
	 * @param {EachState} state
	 * @param {EachItem[]} items
	 * @param {null | Node} controlled_anchor
	 * @param {Map<any, EachItem>} items_map
	 */
	function pause_effects(state, items, controlled_anchor, items_map) {
		/** @type {TransitionManager[]} */
		var transitions = [];
		var length = items.length;

		for (var i = 0; i < length; i++) {
			pause_children(items[i].e, transitions, true);
		}

		var is_controlled = length > 0 && transitions.length === 0 && controlled_anchor !== null;
		// If we have a controlled anchor, it means that the each block is inside a single
		// DOM element, so we can apply a fast-path for clearing the contents of the element.
		if (is_controlled) {
			var parent_node = /** @type {Element} */ (
				/** @type {Element} */ (controlled_anchor).parentNode
			);
			clear_text_content(parent_node);
			parent_node.append(/** @type {Element} */ (controlled_anchor));
			items_map.clear();
			link(state, items[0].prev, items[length - 1].next);
		}

		run_out_transitions(transitions, () => {
			for (var i = 0; i < length; i++) {
				var item = items[i];
				if (!is_controlled) {
					items_map.delete(item.k);
					link(state, item.prev, item.next);
				}
				destroy_effect(item.e, !is_controlled);
			}
		});
	}

	/**
	 * @template V
	 * @param {Element | Comment} node The next sibling node, or the parent node if this is a 'controlled' block
	 * @param {number} flags
	 * @param {() => V[]} get_collection
	 * @param {(value: V, index: number) => any} get_key
	 * @param {(anchor: Node, item: MaybeSource<V>, index: MaybeSource<number>) => void} render_fn
	 * @param {null | ((anchor: Node) => void)} fallback_fn
	 * @returns {void}
	 */
	function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
		var anchor = node;

		/** @type {EachState} */
		var state = { flags, items: new Map(), first: null };

		var is_controlled = (flags & EACH_IS_CONTROLLED) !== 0;

		if (is_controlled) {
			var parent_node = /** @type {Element} */ (node);

			anchor = parent_node.appendChild(create_text());
		}

		/** @type {Effect | null} */
		var fallback = null;

		var was_empty = false;

		block(() => {
			var collection = get_collection();

			var array = is_array(collection)
				? collection
				: collection == null
					? []
					: array_from(collection);

			var length = array.length;

			if (was_empty && length === 0) {
				// ignore updates if the array is empty,
				// and it already was empty on previous run
				return;
			}
			was_empty = length === 0;

			{
				var effect = /** @type {Effect} */ (active_reaction);
				reconcile(
					array,
					state,
					anchor,
					render_fn,
					flags,
					(effect.f & INERT) !== 0,
					get_key,
					get_collection
				);
			}

			if (fallback_fn !== null) {
				if (length === 0) {
					if (fallback) {
						resume_effect(fallback);
					} else {
						fallback = branch(() => fallback_fn(anchor));
					}
				} else if (fallback !== null) {
					pause_effect(fallback, () => {
						fallback = null;
					});
				}
			}

			// When we mount the each block for the first time, the collection won't be
			// connected to this effect as the effect hasn't finished running yet and its deps
			// won't be assigned. However, it's possible that when reconciling the each block
			// that a mutation occurred and it's made the collection MAYBE_DIRTY, so reading the
			// collection again can provide consistency to the reactive graph again as the deriveds
			// will now be `CLEAN`.
			get_collection();
		});
	}

	/**
	 * Add, remove, or reorder items output by an each block as its input changes
	 * @template V
	 * @param {Array<V>} array
	 * @param {EachState} state
	 * @param {Element | Comment | Text} anchor
	 * @param {(anchor: Node, item: MaybeSource<V>, index: number | Source<number>) => void} render_fn
	 * @param {number} flags
	 * @param {boolean} is_inert
	 * @param {(value: V, index: number) => any} get_key
	 * @param {() => V[]} get_collection
	 * @returns {void}
	 */
	function reconcile(array, state, anchor, render_fn, flags, is_inert, get_key, get_collection) {
		var is_animated = (flags & EACH_IS_ANIMATED) !== 0;
		var should_update = (flags & (EACH_ITEM_REACTIVE | EACH_INDEX_REACTIVE)) !== 0;

		var length = array.length;
		var items = state.items;
		var first = state.first;
		var current = first;

		/** @type {undefined | Set<EachItem>} */
		var seen;

		/** @type {EachItem | null} */
		var prev = null;

		/** @type {undefined | Set<EachItem>} */
		var to_animate;

		/** @type {EachItem[]} */
		var matched = [];

		/** @type {EachItem[]} */
		var stashed = [];

		/** @type {V} */
		var value;

		/** @type {any} */
		var key;

		/** @type {EachItem | undefined} */
		var item;

		/** @type {number} */
		var i;

		if (is_animated) {
			for (i = 0; i < length; i += 1) {
				value = array[i];
				key = get_key(value, i);
				item = items.get(key);

				if (item !== undefined) {
					item.a?.measure();
					(to_animate ??= new Set()).add(item);
				}
			}
		}

		for (i = 0; i < length; i += 1) {
			value = array[i];
			key = get_key(value, i);
			item = items.get(key);

			if (item === undefined) {
				var child_anchor = current ? /** @type {TemplateNode} */ (current.e.nodes_start) : anchor;

				prev = create_item(
					child_anchor,
					state,
					prev,
					prev === null ? state.first : prev.next,
					value,
					key,
					i,
					render_fn,
					flags,
					get_collection
				);

				items.set(key, prev);

				matched = [];
				stashed = [];

				current = prev.next;
				continue;
			}

			if (should_update) {
				update_item(item, value, i, flags);
			}

			if ((item.e.f & INERT) !== 0) {
				resume_effect(item.e);
				if (is_animated) {
					item.a?.unfix();
					(to_animate ??= new Set()).delete(item);
				}
			}

			if (item !== current) {
				if (seen !== undefined && seen.has(item)) {
					if (matched.length < stashed.length) {
						// more efficient to move later items to the front
						var start = stashed[0];
						var j;

						prev = start.prev;

						var a = matched[0];
						var b = matched[matched.length - 1];

						for (j = 0; j < matched.length; j += 1) {
							move(matched[j], start, anchor);
						}

						for (j = 0; j < stashed.length; j += 1) {
							seen.delete(stashed[j]);
						}

						link(state, a.prev, b.next);
						link(state, prev, a);
						link(state, b, start);

						current = start;
						prev = b;
						i -= 1;

						matched = [];
						stashed = [];
					} else {
						// more efficient to move earlier items to the back
						seen.delete(item);
						move(item, current, anchor);

						link(state, item.prev, item.next);
						link(state, item, prev === null ? state.first : prev.next);
						link(state, prev, item);

						prev = item;
					}

					continue;
				}

				matched = [];
				stashed = [];

				while (current !== null && current.k !== key) {
					// If the each block isn't inert and an item has an effect that is already inert,
					// skip over adding it to our seen Set as the item is already being handled
					if (is_inert || (current.e.f & INERT) === 0) {
						(seen ??= new Set()).add(current);
					}
					stashed.push(current);
					current = current.next;
				}

				if (current === null) {
					continue;
				}

				item = current;
			}

			matched.push(item);
			prev = item;
			current = item.next;
		}

		if (current !== null || seen !== undefined) {
			var to_destroy = seen === undefined ? [] : array_from(seen);

			while (current !== null) {
				// If the each block isn't inert, then inert effects are currently outroing and will be removed once the transition is finished
				if (is_inert || (current.e.f & INERT) === 0) {
					to_destroy.push(current);
				}
				current = current.next;
			}

			var destroy_length = to_destroy.length;

			if (destroy_length > 0) {
				var controlled_anchor = (flags & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;

				if (is_animated) {
					for (i = 0; i < destroy_length; i += 1) {
						to_destroy[i].a?.measure();
					}

					for (i = 0; i < destroy_length; i += 1) {
						to_destroy[i].a?.fix();
					}
				}

				pause_effects(state, to_destroy, controlled_anchor, items);
			}
		}

		if (is_animated) {
			queue_micro_task(() => {
				if (to_animate === undefined) return;
				for (item of to_animate) {
					item.a?.apply();
				}
			});
		}

		/** @type {Effect} */ (active_effect).first = state.first && state.first.e;
		/** @type {Effect} */ (active_effect).last = prev && prev.e;
	}

	/**
	 * @param {EachItem} item
	 * @param {any} value
	 * @param {number} index
	 * @param {number} type
	 * @returns {void}
	 */
	function update_item(item, value, index, type) {
		if ((type & EACH_ITEM_REACTIVE) !== 0) {
			internal_set(item.v, value);
		}

		if ((type & EACH_INDEX_REACTIVE) !== 0) {
			internal_set(/** @type {Value<number>} */ (item.i), index);
		} else {
			item.i = index;
		}
	}

	/**
	 * @template V
	 * @param {Node} anchor
	 * @param {EachState} state
	 * @param {EachItem | null} prev
	 * @param {EachItem | null} next
	 * @param {V} value
	 * @param {unknown} key
	 * @param {number} index
	 * @param {(anchor: Node, item: V | Source<V>, index: number | Value<number>) => void} render_fn
	 * @param {number} flags
	 * @param {() => V[]} get_collection
	 * @returns {EachItem}
	 */
	function create_item(
		anchor,
		state,
		prev,
		next,
		value,
		key,
		index,
		render_fn,
		flags,
		get_collection
	) {
		var reactive = (flags & EACH_ITEM_REACTIVE) !== 0;
		var mutable = (flags & EACH_ITEM_IMMUTABLE) === 0;

		var v = reactive ? (mutable ? mutable_source(value) : source(value)) : value;
		var i = (flags & EACH_INDEX_REACTIVE) === 0 ? index : source(index);

		if (DEV && reactive) {
			// For tracing purposes, we need to link the source signal we create with the
			// collection + index so that tracing works as intended
			/** @type {Value} */ (v).debug = () => {
				var collection_index = typeof i === 'number' ? index : i.v;
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				get_collection()[collection_index];
			};
		}

		/** @type {EachItem} */
		var item = {
			i,
			v,
			k: key,
			a: null,
			// @ts-expect-error
			e: null,
			prev,
			next
		};

		try {
			item.e = branch(() => render_fn(anchor, v, i), hydrating);

			item.e.prev = prev && prev.e;
			item.e.next = next && next.e;

			if (prev === null) {
				state.first = item;
			} else {
				prev.next = item;
				prev.e.next = item.e;
			}

			if (next !== null) {
				next.prev = item;
				next.e.prev = item.e;
			}

			return item;
		} finally {
		}
	}

	/**
	 * @param {EachItem} item
	 * @param {EachItem | null} next
	 * @param {Text | Element | Comment} anchor
	 */
	function move(item, next, anchor) {
		var end = item.next ? /** @type {TemplateNode} */ (item.next.e.nodes_start) : anchor;

		var dest = next ? /** @type {TemplateNode} */ (next.e.nodes_start) : anchor;
		var node = /** @type {TemplateNode} */ (item.e.nodes_start);

		while (node !== end) {
			var next_node = /** @type {TemplateNode} */ (get_next_sibling(node));
			dest.before(node);
			node = next_node;
		}
	}

	/**
	 * @param {EachState} state
	 * @param {EachItem | null} prev
	 * @param {EachItem | null} next
	 */
	function link(state, prev, next) {
		if (prev === null) {
			state.first = next;
		} else {
			prev.next = next;
			prev.e.next = next && next.e;
		}

		if (next !== null) {
			next.prev = prev;
			next.e.prev = prev && prev.e;
		}
	}

	/** @import { Effect, TemplateNode } from '#client' */

	/**
	 * @param {Element | Text | Comment} node
	 * @param {() => string} get_value
	 * @param {boolean} svg
	 * @param {boolean} mathml
	 * @param {boolean} [skip_warning]
	 * @returns {void}
	 */
	function html(node, get_value, svg, mathml, skip_warning) {
		var anchor = node;

		var value = '';

		/** @type {Effect | undefined} */
		var effect;

		block(() => {
			if (value === (value = get_value() ?? '')) {
				return;
			}

			if (effect !== undefined) {
				destroy_effect(effect);
				effect = undefined;
			}

			if (value === '') return;

			effect = branch(() => {

				var html = value + '';
				if (svg) html = `<svg>${html}</svg>`;
				else if (mathml) html = `<math>${html}</math>`;

				// Don't use create_fragment_with_script_from_html here because that would mean script tags are executed.
				// @html is basically `.innerHTML = ...` and that doesn't execute scripts either due to security reasons.
				/** @type {DocumentFragment | Element} */
				var node = create_fragment_from_html(html);

				if (svg || mathml) {
					node = /** @type {Element} */ (get_first_child(node));
				}

				assign_nodes(
					/** @type {TemplateNode} */ (get_first_child(node)),
					/** @type {TemplateNode} */ (node.lastChild)
				);

				if (svg || mathml) {
					while (get_first_child(node)) {
						anchor.before(/** @type {Node} */ (get_first_child(node)));
					}
				} else {
					anchor.before(node);
				}
			});
		});
	}

	/**
	 * @param {Comment} anchor
	 * @param {Record<string, any>} $$props
	 * @param {string} name
	 * @param {Record<string, unknown>} slot_props
	 * @param {null | ((anchor: Comment) => void)} fallback_fn
	 */
	function slot(anchor, $$props, name, slot_props, fallback_fn) {

		var slot_fn = $$props.$$slots?.[name];
		// Interop: Can use snippets to fill slots
		var is_interop = false;
		if (slot_fn === true) {
			slot_fn = $$props[name === 'default' ? 'children' : name];
			is_interop = true;
		}

		if (slot_fn === undefined) {
			if (fallback_fn !== null) {
				fallback_fn(anchor);
			}
		} else {
			slot_fn(anchor, is_interop ? () => slot_props : slot_props);
		}
	}

	/** @import { Snippet } from 'svelte' */

	/**
	 * In development, wrap the snippet function so that it passes validation, and so that the
	 * correct component context is set for ownership checks
	 * @param {any} component
	 * @param {(node: TemplateNode, ...args: any[]) => void} fn
	 */
	function wrap_snippet(component, fn) {
		return (/** @type {TemplateNode} */ node, /** @type {any[]} */ ...args) => {
			var previous_component_function = dev_current_component_function;
			set_dev_current_component_function(component);

			try {
				return fn(node, ...args);
			} finally {
				set_dev_current_component_function(previous_component_function);
			}
		};
	}

	function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx$1(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

	/**
	 * Small wrapper around clsx to preserve Svelte's (weird) handling of falsy values.
	 * TODO Svelte 6 revisit this, and likely turn all falsy values into the empty string (what clsx also does)
	 * @param  {any} value
	 */
	function clsx(value) {
		if (typeof value === 'object') {
			return clsx$1(value);
		} else {
			return value ?? '';
		}
	}

	/**
	 * Sets the `selected` attribute on an `option` element.
	 * Not set through the property because that doesn't reflect to the DOM,
	 * which means it wouldn't be taken into account when a form is reset.
	 * @param {HTMLOptionElement} element
	 * @param {boolean} selected
	 */
	function set_selected(element, selected) {
		if (selected) {
			// The selected option could've changed via user selection, and
			// setting the value without this check would set it back.
			if (!element.hasAttribute('selected')) {
				element.setAttribute('selected', '');
			}
		} else {
			element.removeAttribute('selected');
		}
	}

	/**
	 * @param {Element} element
	 * @param {string} attribute
	 * @param {string | null} value
	 * @param {boolean} [skip_warning]
	 */
	function set_attribute(element, attribute, value, skip_warning) {
		// @ts-expect-error
		var attributes = (element.__attributes ??= {});

		if (attributes[attribute] === (attributes[attribute] = value)) return;

		if (attribute === 'style' && '__styles' in element) {
			// reset styles to force style: directive to update
			element.__styles = {};
		}

		if (attribute === 'loading') {
			// @ts-expect-error
			element[LOADING_ATTR_SYMBOL] = value;
		}

		if (value == null) {
			element.removeAttribute(attribute);
		} else if (typeof value !== 'string' && get_setters(element).includes(attribute)) {
			// @ts-ignore
			element[attribute] = value;
		} else {
			element.setAttribute(attribute, value);
		}
	}

	/**
	 * Spreads attributes onto a DOM element, taking into account the currently set attributes
	 * @param {Element & ElementCSSInlineStyle} element
	 * @param {Record<string, any> | undefined} prev
	 * @param {Record<string, any>} next New attributes - this function mutates this object
	 * @param {string} [css_hash]
	 * @param {boolean} [preserve_attribute_case]
	 * @param {boolean} [is_custom_element]
	 * @param {boolean} [skip_warning]
	 * @returns {Record<string, any>}
	 */
	function set_attributes(
		element,
		prev,
		next,
		css_hash,
		preserve_attribute_case = false,
		is_custom_element = false,
		skip_warning = false
	) {
		var current = prev || {};
		var is_option_element = element.tagName === 'OPTION';

		for (var key in prev) {
			if (!(key in next)) {
				next[key] = null;
			}
		}

		if (next.class) {
			next.class = clsx(next.class);
		}

		if (css_hash !== undefined) {
			next.class = next.class ? next.class + ' ' + css_hash : css_hash;
		}

		var setters = get_setters(element);

		// @ts-expect-error
		var attributes = /** @type {Record<string, unknown>} **/ (element.__attributes ??= {});

		// since key is captured we use const
		for (const key in next) {
			// let instead of var because referenced in a closure
			let value = next[key];

			// Up here because we want to do this for the initial value, too, even if it's undefined,
			// and this wouldn't be reached in case of undefined because of the equality check below
			if (is_option_element && key === 'value' && value == null) {
				// The <option> element is a special case because removing the value attribute means
				// the value is set to the text content of the option element, and setting the value
				// to null or undefined means the value is set to the string "null" or "undefined".
				// To align with how we handle this case in non-spread-scenarios, this logic is needed.
				// There's a super-edge-case bug here that is left in in favor of smaller code size:
				// Because of the "set missing props to null" logic above, we can't differentiate
				// between a missing value and an explicitly set value of null or undefined. That means
				// that once set, the value attribute of an <option> element can't be removed. This is
				// a very rare edge case, and removing the attribute altogether isn't possible either
				// for the <option value={undefined}> case, so we're not losing any functionality here.
				// @ts-ignore
				element.value = element.__value = '';
				current[key] = value;
				continue;
			}

			var prev_value = current[key];
			if (value === prev_value) continue;

			current[key] = value;

			var prefix = key[0] + key[1]; // this is faster than key.slice(0, 2)
			if (prefix === '$$') continue;

			if (prefix === 'on') {
				/** @type {{ capture?: true }} */
				const opts = {};
				const event_handle_key = '$$' + key;
				let event_name = key.slice(2);
				var delegated = is_delegated(event_name);

				if (is_capture_event(event_name)) {
					event_name = event_name.slice(0, -7);
					opts.capture = true;
				}

				if (!delegated && prev_value) {
					// Listening to same event but different handler -> our handle function below takes care of this
					// If we were to remove and add listeners in this case, it could happen that the event is "swallowed"
					// (the browser seems to not know yet that a new one exists now) and doesn't reach the handler
					// https://github.com/sveltejs/svelte/issues/11903
					if (value != null) continue;

					element.removeEventListener(event_name, current[event_handle_key], opts);
					current[event_handle_key] = null;
				}

				if (value != null) {
					if (!delegated) {
						/**
						 * @this {any}
						 * @param {Event} evt
						 */
						function handle(evt) {
							current[key].call(this, evt);
						}

						current[event_handle_key] = create_event(event_name, element, handle, opts);
					} else {
						// @ts-ignore
						element[`__${event_name}`] = value;
						delegate([event_name]);
					}
				} else if (delegated) {
					// @ts-ignore
					element[`__${event_name}`] = undefined;
				}
			} else if (key === 'style' && value != null) {
				element.style.cssText = value + '';
			} else if (key === 'autofocus') {
				autofocus(/** @type {HTMLElement} */ (element), Boolean(value));
			} else if (key === '__value' || (key === 'value' && value != null)) {
				// @ts-ignore
				element.value = element[key] = element.__value = value;
			} else if (key === 'selected' && is_option_element) {
				set_selected(/** @type {HTMLOptionElement} */ (element), value);
			} else {
				var name = key;
				if (!preserve_attribute_case) {
					name = normalize_attribute(name);
				}

				var is_default = name === 'defaultValue' || name === 'defaultChecked';

				if (value == null && !is_custom_element && !is_default) {
					attributes[key] = null;

					if (name === 'value' || name === 'checked') {
						// removing value/checked also removes defaultValue/defaultChecked — preserve
						let input = /** @type {HTMLInputElement} */ (element);

						if (name === 'value') {
							let prev = input.defaultValue;
							input.removeAttribute(name);
							input.defaultValue = prev;
						} else {
							let prev = input.defaultChecked;
							input.removeAttribute(name);
							input.defaultChecked = prev;
						}
					} else {
						element.removeAttribute(key);
					}
				} else if (
					is_default ||
					(setters.includes(name) && (is_custom_element || typeof value !== 'string'))
				) {
					// @ts-ignore
					element[name] = value;
				} else if (typeof value !== 'function') {
					{
						set_attribute(element, name, value);
					}
				}
			}
			if (key === 'style' && '__styles' in element) {
				// reset styles to force style: directive to update
				element.__styles = {};
			}
		}

		return current;
	}

	/** @type {Map<string, string[]>} */
	var setters_cache = new Map();

	/** @param {Element} element */
	function get_setters(element) {
		var setters = setters_cache.get(element.nodeName);
		if (setters) return setters;
		setters_cache.set(element.nodeName, (setters = []));

		var descriptors;
		var proto = element; // In the case of custom elements there might be setters on the instance
		var element_proto = Element.prototype;

		// Stop at Element, from there on there's only unnecessary setters we're not interested in
		// Do not use contructor.name here as that's unreliable in some browser environments
		while (element_proto !== proto) {
			descriptors = get_descriptors(proto);

			for (var key in descriptors) {
				if (descriptors[key].set) {
					setters.push(key);
				}
			}

			proto = get_prototype_of(proto);
		}

		return setters;
	}

	/**
	 * @param {Element} dom
	 * @param {string} class_name
	 * @param {boolean} value
	 * @returns {void}
	 */
	function toggle_class(dom, class_name, value) {
		if (value) {
			if (dom.classList.contains(class_name)) return;
			dom.classList.add(class_name);
		} else {
			if (!dom.classList.contains(class_name)) return;
			dom.classList.remove(class_name);
		}
	}

	/** @import { ComponentContextLegacy } from '#client' */

	/**
	 * Legacy-mode only: Call `onMount` callbacks and set up `beforeUpdate`/`afterUpdate` effects
	 * @param {boolean} [immutable]
	 */
	function init(immutable = false) {
		const context = /** @type {ComponentContextLegacy} */ (component_context);

		const callbacks = context.l.u;
		if (!callbacks) return;

		let props = () => deep_read_state(context.s);

		if (immutable) {
			let version = 0;
			let prev = /** @type {Record<string, any>} */ ({});

			// In legacy immutable mode, before/afterUpdate only fire if the object identity of a prop changes
			const d = derived(() => {
				let changed = false;
				const props = context.s;
				for (const key in props) {
					if (props[key] !== prev[key]) {
						prev[key] = props[key];
						changed = true;
					}
				}
				if (changed) version++;
				return version;
			});

			props = () => get(d);
		}

		// beforeUpdate
		if (callbacks.b.length) {
			user_pre_effect(() => {
				observe_all(context, props);
				run_all(callbacks.b);
			});
		}

		// onMount (must run before afterUpdate)
		user_effect(() => {
			const fns = untrack(() => callbacks.m.map(run));
			return () => {
				for (const fn of fns) {
					if (typeof fn === 'function') {
						fn();
					}
				}
			};
		});

		// afterUpdate
		if (callbacks.a.length) {
			user_effect(() => {
				observe_all(context, props);
				run_all(callbacks.a);
			});
		}
	}

	/**
	 * Invoke the getter of all signals associated with a component
	 * so they can be registered to the effect this function is called in.
	 * @param {ComponentContextLegacy} context
	 * @param {(() => void)} props
	 */
	function observe_all(context, props) {
		if (context.l.s) {
			for (const signal of context.l.s) get(signal);
		}

		props();
	}

	/** @import { StoreReferencesContainer } from '#client' */

	/**
	 * Whether or not the prop currently being read is a store binding, as in
	 * `<Child bind:x={$y} />`. If it is, we treat the prop as mutable even in
	 * runes mode, and skip `binding_property_non_reactive` validation
	 */
	let is_store_binding = false;

	/**
	 * Returns a tuple that indicates whether `fn()` reads a prop that is a store binding.
	 * Used to prevent `binding_property_non_reactive` validation false positives and
	 * ensure that these props are treated as mutable even in runes mode
	 * @template T
	 * @param {() => T} fn
	 * @returns {[T, boolean]}
	 */
	function capture_store_binding(fn) {
		var previous_is_store_binding = is_store_binding;

		try {
			is_store_binding = false;
			return [fn(), is_store_binding];
		} finally {
			is_store_binding = previous_is_store_binding;
		}
	}

	/** @import { Source } from './types.js' */

	/**
	 * The proxy handler for legacy $$restProps and $$props
	 * @type {ProxyHandler<{ props: Record<string | symbol, unknown>, exclude: Array<string | symbol>, special: Record<string | symbol, (v?: unknown) => unknown>, version: Source<number> }>}}
	 */
	const legacy_rest_props_handler = {
		get(target, key) {
			if (target.exclude.includes(key)) return;
			get(target.version);
			return key in target.special ? target.special[key]() : target.props[key];
		},
		set(target, key, value) {
			if (!(key in target.special)) {
				// Handle props that can temporarily get out of sync with the parent
				/** @type {Record<string, (v?: unknown) => unknown>} */
				target.special[key] = prop(
					{
						get [key]() {
							return target.props[key];
						}
					},
					/** @type {string} */ (key),
					PROPS_IS_UPDATED
				);
			}

			target.special[key](value);
			update(target.version); // $$props is coarse-grained: when $$props.x is updated, usages of $$props.y etc are also rerun
			return true;
		},
		getOwnPropertyDescriptor(target, key) {
			if (target.exclude.includes(key)) return;
			if (key in target.props) {
				return {
					enumerable: true,
					configurable: true,
					value: target.props[key]
				};
			}
		},
		deleteProperty(target, key) {
			// Svelte 4 allowed for deletions on $$restProps
			if (target.exclude.includes(key)) return true;
			target.exclude.push(key);
			update(target.version);
			return true;
		},
		has(target, key) {
			if (target.exclude.includes(key)) return false;
			return key in target.props;
		},
		ownKeys(target) {
			return Reflect.ownKeys(target.props).filter((key) => !target.exclude.includes(key));
		}
	};

	/**
	 * @param {Record<string, unknown>} props
	 * @param {string[]} exclude
	 * @returns {Record<string, unknown>}
	 */
	function legacy_rest_props(props, exclude) {
		return new Proxy({ props, exclude, special: {}, version: source(0) }, legacy_rest_props_handler);
	}

	/**
	 * The proxy handler for spread props. Handles the incoming array of props
	 * that looks like `() => { dynamic: props }, { static: prop }, ..` and wraps
	 * them so that the whole thing is passed to the component as the `$$props` argument.
	 * @template {Record<string | symbol, unknown>} T
	 * @type {ProxyHandler<{ props: Array<T | (() => T)> }>}}
	 */
	const spread_props_handler = {
		get(target, key) {
			let i = target.props.length;
			while (i--) {
				let p = target.props[i];
				if (is_function(p)) p = p();
				if (typeof p === 'object' && p !== null && key in p) return p[key];
			}
		},
		set(target, key, value) {
			let i = target.props.length;
			while (i--) {
				let p = target.props[i];
				if (is_function(p)) p = p();
				const desc = get_descriptor(p, key);
				if (desc && desc.set) {
					desc.set(value);
					return true;
				}
			}
			return false;
		},
		getOwnPropertyDescriptor(target, key) {
			let i = target.props.length;
			while (i--) {
				let p = target.props[i];
				if (is_function(p)) p = p();
				if (typeof p === 'object' && p !== null && key in p) {
					const descriptor = get_descriptor(p, key);
					if (descriptor && !descriptor.configurable) {
						// Prevent a "Non-configurability Report Error": The target is an array, it does
						// not actually contain this property. If it is now described as non-configurable,
						// the proxy throws a validation error. Setting it to true avoids that.
						descriptor.configurable = true;
					}
					return descriptor;
				}
			}
		},
		has(target, key) {
			// To prevent a false positive `is_entry_props` in the `prop` function
			if (key === STATE_SYMBOL || key === LEGACY_PROPS) return false;

			for (let p of target.props) {
				if (is_function(p)) p = p();
				if (p != null && key in p) return true;
			}

			return false;
		},
		ownKeys(target) {
			/** @type {Array<string | symbol>} */
			const keys = [];

			for (let p of target.props) {
				if (is_function(p)) p = p();
				for (const key in p) {
					if (!keys.includes(key)) keys.push(key);
				}
			}

			return keys;
		}
	};

	/**
	 * @param {Array<Record<string, unknown> | (() => Record<string, unknown>)>} props
	 * @returns {any}
	 */
	function spread_props(...props) {
		return new Proxy({ props }, spread_props_handler);
	}

	/**
	 * @template T
	 * @param {() => T} fn
	 * @returns {T}
	 */
	function with_parent_branch(fn) {
		var effect = active_effect;
		var previous_effect = active_effect;

		while (effect !== null && (effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
			effect = effect.parent;
		}
		try {
			set_active_effect(effect);
			return fn();
		} finally {
			set_active_effect(previous_effect);
		}
	}

	/**
	 * This function is responsible for synchronizing a possibly bound prop with the inner component state.
	 * It is used whenever the compiler sees that the component writes to the prop, or when it has a default prop_value.
	 * @template V
	 * @param {Record<string, unknown>} props
	 * @param {string} key
	 * @param {number} flags
	 * @param {V | (() => V)} [fallback]
	 * @returns {(() => V | ((arg: V) => V) | ((arg: V, mutation: boolean) => V))}
	 */
	function prop(props, key, flags, fallback) {
		var immutable = (flags & PROPS_IS_IMMUTABLE) !== 0;
		var runes = !legacy_mode_flag || (flags & PROPS_IS_RUNES) !== 0;
		var bindable = (flags & PROPS_IS_BINDABLE) !== 0;
		var lazy = (flags & PROPS_IS_LAZY_INITIAL) !== 0;
		var is_store_sub = false;
		var prop_value;

		if (bindable) {
			[prop_value, is_store_sub] = capture_store_binding(() => /** @type {V} */ (props[key]));
		} else {
			prop_value = /** @type {V} */ (props[key]);
		}

		// Can be the case when someone does `mount(Component, props)` with `let props = $state({...})`
		// or `createClassComponent(Component, props)`
		var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;

		var setter =
			get_descriptor(props, key)?.set ??
			(is_entry_props && bindable && key in props ? (v) => (props[key] = v) : undefined);

		var fallback_value = /** @type {V} */ (fallback);
		var fallback_dirty = true;
		var fallback_used = false;

		var get_fallback = () => {
			fallback_used = true;
			if (fallback_dirty) {
				fallback_dirty = false;
				if (lazy) {
					fallback_value = untrack(/** @type {() => V} */ (fallback));
				} else {
					fallback_value = /** @type {V} */ (fallback);
				}
			}

			return fallback_value;
		};

		if (prop_value === undefined && fallback !== undefined) {
			if (setter && runes) {
				props_invalid_value(key);
			}

			prop_value = get_fallback();
			if (setter) setter(prop_value);
		}

		/** @type {() => V} */
		var getter;
		if (runes) {
			getter = () => {
				var value = /** @type {V} */ (props[key]);
				if (value === undefined) return get_fallback();
				fallback_dirty = true;
				fallback_used = false;
				return value;
			};
		} else {
			// Svelte 4 did not trigger updates when a primitive value was updated to the same value.
			// Replicate that behavior through using a derived
			var derived_getter = with_parent_branch(() =>
				(immutable ? derived : derived_safe_equal)(() => /** @type {V} */ (props[key]))
			);
			derived_getter.f |= LEGACY_DERIVED_PROP;
			getter = () => {
				var value = get(derived_getter);
				if (value !== undefined) fallback_value = /** @type {V} */ (undefined);
				return value === undefined ? fallback_value : value;
			};
		}

		// easy mode — prop is never written to
		if ((flags & PROPS_IS_UPDATED) === 0) {
			return getter;
		}

		// intermediate mode — prop is written to, but the parent component had
		// `bind:foo` which means we can just call `$$props.foo = value` directly
		if (setter) {
			var legacy_parent = props.$$legacy;
			return function (/** @type {any} */ value, /** @type {boolean} */ mutation) {
				if (arguments.length > 0) {
					// We don't want to notify if the value was mutated and the parent is in runes mode.
					// In that case the state proxy (if it exists) should take care of the notification.
					// If the parent is not in runes mode, we need to notify on mutation, too, that the prop
					// has changed because the parent will not be able to detect the change otherwise.
					if (!runes || !mutation || legacy_parent || is_store_sub) {
						/** @type {Function} */ (setter)(mutation ? getter() : value);
					}
					return value;
				} else {
					return getter();
				}
			};
		}

		// hard mode. this is where it gets ugly — the value in the child should
		// synchronize with the parent, but it should also be possible to temporarily
		// set the value to something else locally.
		var from_child = false;
		var was_from_child = false;

		// The derived returns the current value. The underlying mutable
		// source is written to from various places to persist this value.
		var inner_current_value = mutable_source(prop_value);
		var current_value = with_parent_branch(() =>
			derived(() => {
				var parent_value = getter();
				var child_value = get(inner_current_value);

				if (from_child) {
					from_child = false;
					was_from_child = true;
					return child_value;
				}

				was_from_child = false;
				return (inner_current_value.v = parent_value);
			})
		);

		if (!immutable) current_value.equals = safe_equals;

		return function (/** @type {any} */ value, /** @type {boolean} */ mutation) {

			if (arguments.length > 0) {
				const new_value = mutation ? get(current_value) : runes && bindable ? proxy(value) : value;

				if (!current_value.equals(new_value)) {
					from_child = true;
					set(inner_current_value, new_value);
					// To ensure the fallback value is consistent when used with proxies, we
					// update the local fallback_value, but only if the fallback is actively used
					if (fallback_used && fallback_value !== undefined) {
						fallback_value = new_value;
					}
					untrack(() => get(current_value)); // force a synchronisation immediately
				}

				return value;
			}
			return get(current_value);
		};
	}

	/**
	 * @param {Record<string, any>} $$props
	 * @param {string[]} bindable
	 * @param {string[]} exports
	 * @param {Function & { [FILENAME]: string }} component
	 */
	function validate_prop_bindings($$props, bindable, exports, component) {
		for (const key in $$props) {
			var setter = get_descriptor($$props, key)?.set;
			var name = component.name;

			if (setter) {
				if (exports.includes(key)) {
					bind_invalid_export(component[FILENAME], key, name);
				}

				if (!bindable.includes(key)) {
					bind_not_bindable(key, component[FILENAME], name);
				}
			}
		}
	}

	/**
	 * @param {string} method
	 * @param  {...any} objects
	 */
	function log_if_contains_state(method, ...objects) {
		untrack(() => {
			try {
				let has_state = false;
				const transformed = [];

				for (const obj of objects) {
					if (obj && typeof obj === 'object' && STATE_SYMBOL in obj) {
						transformed.push(snapshot(obj, true));
						has_state = true;
					} else {
						transformed.push(obj);
					}
				}

				if (has_state) {
					console_log_state(method);

					// eslint-disable-next-line no-console
					console.log('%c[snapshot]', 'color: grey', ...transformed);
				}
			} catch {}
		});

		return objects;
	}

	enable_legacy_mode_flag();

	mark_module_start();
	Raw[FILENAME] = "node_modules/svelte-awesome/package/components/svg/Raw.svelte";

	var root$7 = add_locations(ns_template(`<g><!></g>`), Raw[FILENAME], [[1, 0]]);

	function Raw($$anchor, $$props) {
		check_target(new.target);
		push($$props, false, Raw);

		let cursor = 0xd4937;

		function getId() {
			cursor += 1;
			return `fa-${cursor.toString(16)}`;
		}

		let raw = mutable_state('');
		let data = prop($$props, "data", 8);

		function getRaw(data) {
			if (!data || !data.raw) {
				return '';
			}

			let rawData = data.raw;
			const ids = {};

			rawData = rawData.replace(/\s(?:xml:)?id=["']?([^"')\s]+)/g, (match, id) => {
				const uniqueId = getId();

				ids[id] = uniqueId;
				return ` id="${uniqueId}"`;
			});

			rawData = rawData.replace(/#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g, (match, rawId, _, pointerId) => {
				const id = rawId || pointerId;

				if (!id || !ids[id]) {
					return match;
				}

				return `#${ids[id]}`;
			});

			return rawData;
		}

		legacy_pre_effect(() => (deep_read_state(data())), () => {
			set(raw, getRaw(data()));
		});

		legacy_pre_effect_reset();

		var g = root$7();
		var node = child(g);

		html(node, () => get(raw), true, false);
		append($$anchor, g);
		return pop({ ...legacy_api() });
	}

	mark_module_end(Raw);

	mark_module_start();
	Svg[FILENAME] = "node_modules/svelte-awesome/package/components/svg/Svg.svelte";

	var root$6 = add_locations(ns_template(`<svg><!></svg>`), Svg[FILENAME], [[1, 0]]);

	function Svg($$anchor, $$props) {
		check_target(new.target);

		const $$sanitized_props = legacy_rest_props($$props, [
			"children",
			"$$slots",
			"$$events",
			"$$legacy"
		]);

		const $$restProps = legacy_rest_props($$sanitized_props, [
			"class",
			"width",
			"height",
			"box",
			"spin",
			"inverse",
			"pulse",
			"flip",
			"style",
			"label"
		]);

		push($$props, false, Svg);

		let className = prop($$props, "class", 8, '');
		let width = prop($$props, "width", 8);
		let height = prop($$props, "height", 8);
		let box = prop($$props, "box", 8, '0 0 0 0');
		let spin = prop($$props, "spin", 8, false);
		let inverse = prop($$props, "inverse", 8, false);
		let pulse = prop($$props, "pulse", 8, false);
		let flip = prop($$props, "flip", 8, 'none');
		let style = prop($$props, "style", 8, '');
		let label = prop($$props, "label", 8, '');
		var svg = root$6();
		let attributes;
		var node = child(svg);

		slot(node, $$props, "default", {}, null);

		template_effect(() => {
			attributes = set_attributes(
				svg,
				attributes,
				{
					version: "1.1",
					class: `fa-icon ${className() ?? ""}`,
					width: width(),
					height: height(),
					"aria-label": label(),
					role: label() ? 'img' : 'presentation',
					viewBox: box(),
					style: style(),
					...$$restProps
				},
				"svelte-1mc5hvj",
				true
			);

			toggle_class(svg, "fa-spin", spin());
			toggle_class(svg, "fa-pulse", pulse());
			toggle_class(svg, "fa-inverse", inverse());
			toggle_class(svg, "fa-flip-horizontal", strict_equals(flip(), 'horizontal'));
			toggle_class(svg, "fa-flip-vertical", strict_equals(flip(), 'vertical'));
		});

		append($$anchor, svg);
		return pop({ ...legacy_api() });
	}

	mark_module_end(Svg);

	mark_module_start();
	Icon[FILENAME] = "node_modules/svelte-awesome/package/components/Icon.svelte";

	var root_3 = add_locations(ns_template(`<path></path>`), Icon[FILENAME], [[16, 6]]);
	var root_4 = add_locations(ns_template(`<polygon></polygon>`), Icon[FILENAME], [[19, 6]]);
	var root_2 = add_locations(ns_template(`<!><!><!>`, 1), Icon[FILENAME], []);

	function Icon($$anchor, $$props) {
		check_target(new.target);

		const $$sanitized_props = legacy_rest_props($$props, [
			"children",
			"$$slots",
			"$$events",
			"$$legacy"
		]);

		const $$restProps = legacy_rest_props($$sanitized_props, [
			"class",
			"data",
			"scale",
			"spin",
			"inverse",
			"pulse",
			"flip",
			"label",
			"style"
		]);

		push($$props, false, Icon);

		let className = prop($$props, "class", 8, '');
		let data = prop($$props, "data", 8);
		let iconData = mutable_state();
		let scale = prop($$props, "scale", 8, 1);
		let spin = prop($$props, "spin", 8, false);
		let inverse = prop($$props, "inverse", 8, false);
		let pulse = prop($$props, "pulse", 8, false);
		let flip = prop($$props, "flip", 8, undefined);
		let label = prop($$props, "label", 8, '');
		let style = prop($$props, "style", 8, '');
		let outerScale = 1;
		let width = mutable_state(10);
		let height = mutable_state(10);
		let combinedStyle = mutable_state();
		let box = mutable_state();

		function normaliseData(data) {
			let name;
			let iconData;

			if (!data) {
				return undefined;
			} else if ('definition' in data) {
				console.error(...log_if_contains_state("error", "`import faIconName from '@fortawesome/package-name/faIconName` not supported - Please use `import { faIconName } from '@fortawesome/package-name/faIconName'` instead"));
				return undefined;
			} else if ('iconName' in data && 'icon' in data) {
				name = data.iconName;

				// fontawesome v5/6 icon imported with:
				// import { iconName } from '@fortawesome/packagename/iconName';
				// import { iconName } from '@fortawesome/packagename';
				const [width, height, ,, path] = data.icon;
				const paths = Array.isArray(path) ? path : [path];

				iconData = {
					width,
					height,
					paths: paths.map((path) => {
						return { d: path };
					})
				};
			} else {
				// inbuilt icons
				name = Object.keys(data)[0];
				iconData = data[name];
			}

			return iconData;
		}

		function normalisedScale() {
			let numScale = 1;

			if (strict_equals(typeof scale(), 'undefined', false)) {
				numScale = Number(scale());
			}

			if (isNaN(numScale) || numScale <= 0) {
				console.warn(...log_if_contains_state("warn", 'Invalid prop: prop "scale" should be a number over 0.'));
				return outerScale;
			}

			return numScale * outerScale;
		}

		function calculateBox() {
			if (get(iconData)) {
				return `0 0 ${get(iconData).width} ${get(iconData).height}`;
			}

			return `0 0 ${get(width)} ${get(height)}`;
		}

		function calculateRatio() {
			if (!get(iconData)) {
				return 1;
			}

			return Math.max(get(iconData).width, get(iconData).height) / 16;
		}

		function calculateWidth() {

			if (get(iconData)) {
				return get(iconData).width / calculateRatio() * normalisedScale();
			}

			return 0;
		}

		function calculateHeight() {

			if (get(iconData)) {
				return get(iconData).height / calculateRatio() * normalisedScale();
			}

			return 0;
		}

		function calculateStyle() {
			let combined = '';

			if (strict_equals(style(), null, false)) {
				combined += style();
			}

			let size = normalisedScale();

			if (strict_equals(size, 1)) {
				if (strict_equals(combined.length, 0)) {
					return '';
				}

				return combined;
			}

			if (strict_equals(combined, '', false) && !combined.endsWith(';')) {
				combined += '; ';
			}

			return `${combined}font-size: ${size}em`;
		}

		legacy_pre_effect(
			() => (
				deep_read_state(data()),
				deep_read_state(style()),
				deep_read_state(scale())
			),
			() => {
				set(iconData, normaliseData(data()));
				style();
				scale();
				set(width, calculateWidth());
				set(height, calculateHeight());
				set(combinedStyle, calculateStyle());
				set(box, calculateBox());
			}
		);

		legacy_pre_effect_reset();
		init();

		Svg($$anchor, spread_props(
			{
				get label() {
					return label();
				},
				get width() {
					return get(width);
				},
				get height() {
					return get(height);
				},
				get box() {
					return get(box);
				},
				get style() {
					return get(combinedStyle);
				},
				get spin() {
					return spin();
				},
				get flip() {
					return flip();
				},
				get inverse() {
					return inverse();
				},
				get pulse() {
					return pulse();
				},
				get class() {
					return className();
				}
			},
			() => $$restProps,
			{
				children: wrap_snippet(Icon, ($$anchor, $$slotProps) => {
					var fragment_1 = comment();
					var node = first_child(fragment_1);

					slot(node, $$props, "default", {}, ($$anchor) => {
						var fragment_2 = root_2();
						var node_1 = first_child(fragment_2);

						each(node_1, 1, () => get(iconData)?.paths || [], index, ($$anchor, path) => {
							var path_1 = root_3();
							let attributes;

							template_effect(() => attributes = set_attributes(path_1, attributes, { ...get(path) }, undefined, true));
							append($$anchor, path_1);
						});

						var node_2 = sibling(node_1);

						each(node_2, 1, () => get(iconData)?.polygons || [], index, ($$anchor, polygon) => {
							var polygon_1 = root_4();
							let attributes_1;

							template_effect(() => attributes_1 = set_attributes(polygon_1, attributes_1, { ...get(polygon) }, undefined, true));
							append($$anchor, polygon_1);
						});

						var node_3 = sibling(node_2);

						{
							var consequent = ($$anchor) => {
								{
									add_owner_effect(() => get(iconData), Raw);

									Raw($$anchor, {
										get data() {
											return get(iconData);
										},
										set data($$value) {
											set(iconData, $$value);
										},
										$$legacy: true
									});
								}
							};

							if_block(node_3, ($$render) => {
								if (get(iconData)?.raw) $$render(consequent);
							});
						}

						append($$anchor, fragment_2);
					});

					append($$anchor, fragment_1);
				}),
				$$slots: { default: true }
			}
		));

		return pop({ ...legacy_api() });
	}

	mark_module_end(Icon);

	const exclamationCircle = { "exclamation-circle": { "width": 1536, "height": 1792, "paths": [{ "d": "M768 128q209 0 385.5 103t279.5 279.5 103 385.5-103 385.5-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103zM896 1375v-190q0-14-9-23.5t-22-9.5h-192q-13 0-23 10t-10 23v190q0 13 10 23t23 10h192q13 0 22-9.5t9-23.5zM894 1031l18-621q0-12-10-18-10-8-24-8h-220q-14 0-24 8-10 6-10 18l17 621q0 10 10 17.5t24 7.5h185q14 0 23.5-7.5t10.5-17.5z" }] } };
	const folder = { "folder": { "width": 1664, "height": 1792, "paths": [{ "d": "M1664 608v704q0 92-66 158t-158 66h-1216q-92 0-158-66t-66-158v-960q0-92 66-158t158-66h320q92 0 158 66t66 158v32h672q92 0 158 66t66 158z" }] } };
	const folderOpen = { "folder-open": { "width": 1920, "height": 1792, "paths": [{ "d": "M1879 952q0 31-31 66l-336 396q-43 51-120.5 86.5t-143.5 35.5h-1088q-34 0-60.5-13t-26.5-43q0-31 31-66l336-396q43-51 120.5-86.5t143.5-35.5h1088q34 0 60.5 13t26.5 43zM1536 608v160h-832q-94 0-197 47.5t-164 119.5l-337 396-5 6q0-4-0.5-12.5t-0.5-12.5v-960q0-92 66-158t158-66h320q92 0 158 66t66 158v32h544q92 0 158 66t66 158z" }] } };
	const caretDown = { "caret-down": { "width": 1024, "height": 1792, "paths": [{ "d": "M1024 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z" }] } };
	const caretRight = { "caret-right": { "width": 640, "height": 1792, "paths": [{ "d": "M576 896q0 26-19 45l-448 448q-19 19-45 19t-45-19-19-45v-896q0-26 19-45t45-19 45 19l448 448q19 19 19 45z" }] } };
	const spinner = { "spinner": { "width": 1792, "height": 1792, "paths": [{ "d": "M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zM1024 1600q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zM320 896q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zM1522 1394q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zM558 398q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zM1728 896q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zM1088 192q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zM1618 398q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z" }] } };
	const file = { "file": { "width": 1536, "height": 1792, "paths": [{ "d": "M1024 512v-472q22 14 36 28l408 408q14 14 28 36h-472zM896 544q0 40 28 68t68 28h544v1056q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h800v544z" }] } };
	const fileText = { "file-text": { "width": 1536, "height": 1792, "paths": [{ "d": "M1468 476q14 14 28 36h-472v-472q22 14 36 28zM992 640h544v1056q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h800v544q0 40 28 68t68 28zM1152 1376v-64q0-14-9-23t-23-9h-704q-14 0-23 9t-9 23v64q0 14 9 23t23 9h704q14 0 23-9t9-23zM1152 1120v-64q0-14-9-23t-23-9h-704q-14 0-23 9t-9 23v64q0 14 9 23t23 9h704q14 0 23-9t9-23zM1152 864v-64q0-14-9-23t-23-9h-704q-14 0-23 9t-9 23v64q0 14 9 23t23 9h704q14 0 23-9t9-23z" }] } };
	const fileExcelO = { "file-excel-o": { "width": 1536, "height": 1792, "paths": [{ "d": "M1468 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zM1024 136v376h376q-10-29-22-41l-313-313q-12-12-41-22zM1408 1664v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zM429 1430v106h281v-106h-75l103-161q5-7 10-16.5t7.5-13.5 3.5-4h2q1 4 5 10 2 4 4.5 7.5t6 8 6.5 8.5l107 161h-76v106h291v-106h-68l-192-273 195-282h67v-107h-279v107h74l-103 159q-4 7-10 16.5t-9 13.5l-2 3h-2q-1-4-5-10-6-11-17-23l-106-159h76v-107h-290v107h68l189 272-194 283h-68z" }] } };
	const filePictureO = { "file-picture-o": { "width": 1536, "height": 1792, "paths": [{ "d": "M1468 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zM1024 136v376h376q-10-29-22-41l-313-313q-12-12-41-22zM1408 1664v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zM1280 1216v320h-1024v-192l192-192 128 128 384-384zM448 1024q-80 0-136-56t-56-136 56-136 136-56 136 56 56 136-56 136-136 56z" }] } };

	/* This file is generated by scripts/process-messages/index.js. Do not edit! */

	/**
	 * `%name%(...)` is not available on the server
	 * @param {string} name
	 * @returns {never}
	 */
	function lifecycle_function_unavailable(name) {
		const error = new Error(`lifecycle_function_unavailable\n\`${name}(...)\` is not available on the server\nhttps://svelte.dev/e/lifecycle_function_unavailable`);

		error.name = 'Svelte error';
		throw error;
	}

	/** @import { Component } from '#server' */

	function createEventDispatcher() {
		return noop$1;
	}

	function mount() {
		lifecycle_function_unavailable('mount');
	}

	mark_module_start();
	Directory[FILENAME] = "src/Directory.svelte";

	var on_click = (_, dispatch, opened) => dispatch(opened() ? 'close' : 'open');
	var root$5 = add_locations(template(`<button class="svelte-195rpj9"><!> <!> </button>`), Directory[FILENAME], [[31, 0]]);

	function Directory($$anchor, $$props) {
		check_target(new.target);
		push($$props, true, Directory);
		validate_prop_bindings($$props, [], [], Directory);

		const dispatch = createEventDispatcher();

		/**
		 * @typedef {Object} Props
		 * @property {boolean} [opened]
		 * @property {string} [directory]
		 */
		/** @type {Props} */
		let opened = prop($$props, "opened", 3, false),
			directory = prop($$props, "directory", 3, '');

		var button = root$5();

		button.__click = [on_click, dispatch, opened];

		var node = child(button);
		var data = derived(() => opened() ? caretDown : caretRight);

		Icon(node, {
			get data() {
				return get(data);
			},
			class: "caret"
		});

		var node_1 = sibling(node, 2);
		var data_1 = derived(() => opened() ? folderOpen : folder);

		Icon(node_1, {
			get data() {
				return get(data_1);
			},
			class: "folder"
		});

		var text = sibling(node_1);
		template_effect(() => set_text(text, ` ${directory() ?? ""}`));
		append($$anchor, button);
		return pop({ ...legacy_api() });
	}

	mark_module_end(Directory);
	delegate(["click"]);

	/** @import { SvelteComponent } from '../index.js' */

	const noop = () => {};

	mark_module_start();
	File[FILENAME] = "src/File.svelte";

	var root$4 = add_locations(template(`<div class="svelte-1h4glgr"><button class="svelte-1h4glgr"><!> </button></div>`), File[FILENAME], [[30, 0, [[31, 1]]]]);

	function File($$anchor, $$props) {
		check_target(new.target);
		push($$props, true, File);
		validate_prop_bindings($$props, [], [], File);

		const bubble = noop();

		/**
		 * @typedef {Object} Props
		 * @property {string} [name]
		 * @property {boolean} [selected]
		 * @property {any} icons
		 */
		/** @type {Props} */
		let name = prop($$props, "name", 3, ''),
			selected = prop($$props, "selected", 3, false);

		let extension = derived(() => name() && name().split('.').pop());
		var div = root$4();
		var button = child(div);
		var event_handler = derived(() => bubble('click'));

		button.__click = function (...$$args) {
			apply(() => get(event_handler), this, $$args, File, [31, 33], true);
		};

		var node = child(button);
		var data = derived(() => $$props.icons && $$props.icons(get(extension)) || file);

		Icon(node, {
			get data() {
				return get(data);
			}
		});

		var text = sibling(node);

		template_effect(() => {
			toggle_class(button, "selected", selected());
			set_text(text, ` ${name() ?? ""}`);
		});

		append($$anchor, div);
		return pop({ ...legacy_api() });
	}

	mark_module_end(File);
	delegate(["click"]);

	mark_module_start();
	Loading[FILENAME] = "src/Loading.svelte";

	var root$3 = add_locations(template(`<div class="svelte-1g2w5wt"><!> Loading...</div>`), Loading[FILENAME], [[21, 0]]);

	function Loading($$anchor, $$props) {
		check_target(new.target);
		push($$props, false, Loading);

		var div = root$3();
		var node = child(div);

		Icon(node, { spin: true, data: spinner });
		append($$anchor, div);
		return pop({ ...legacy_api() });
	}

	mark_module_end(Loading);

	mark_module_start();
	Error$1[FILENAME] = "src/Error.svelte";

	var root$2 = add_locations(template(`<div class="svelte-1v698t4"><!> </div>`), Error$1[FILENAME], [[27, 0]]);

	function Error$1($$anchor, $$props) {
		check_target(new.target);
		push($$props, true, Error$1);
		validate_prop_bindings($$props, [], [], Error$1);

		/**
		 * @typedef {Object} Props
		 * @property {string} [error]
		 */
		/** @type {Props} */
		let error = prop($$props, "error", 3, '');
		var div = root$2();
		var node = child(div);

		Icon(node, { data: exclamationCircle });

		var text = sibling(node);

		template_effect(() => set_text(text, ` there was an error ${JSON.stringify(error()) ?? ""}`));
		append($$anchor, div);
		return pop({ ...legacy_api() });
	}

	mark_module_end(Error$1);

	const DIRECTORY = 'DIRECTORY';
	const FILE = 'FILE';

	mark_module_start();
	Tree_1[FILENAME] = "src/Tree.svelte";

	var root_7 = add_locations(template(`<ul><li><!></li></ul>`), Tree_1[FILENAME], [[81, 6, [[82, 7]]]]);
	var root_8 = add_locations(template(`<ul><li><!></li></ul>`), Tree_1[FILENAME], [[68, 6, [[69, 7]]]]);
	var root_1 = add_locations(template(`<li><!> <!></li>`), Tree_1[FILENAME], [[47, 2]]);
	var root$1 = add_locations(template(`<ul></ul>`), Tree_1[FILENAME], [[45, 0]]);

	function Tree_1($$anchor, $$props) {
		check_target(new.target);
		push($$props, true, Tree_1);
		validate_prop_bindings($$props, [], [], Tree_1);

		let files = prop($$props, "files", 19, () => []);
		const loaders = proxy({});
		const opened = proxy({});

		const open = (index) => {
			if (strict_equals(typeof files()[index].children, 'function')) {
				loaders[index] = files()[index].children();
			} else {
				loaders[index] = files()[index].children;
			}

			opened[index] = true;
		};

		const close = (index) => {
			loaders[index] = null;
			opened[index] = null;
		};

		if (strict_equals($$props.expanded, true)) {
			files().forEach((file, index) => {
				opened[index] = true;
				open(index);
			});
		}

		const hello = (event) => {
			console.log(...log_if_contains_state("log", '-----hi!-------', event));
		};

		var ul = root$1();

		each(ul, 21, files, index, ($$anchor, file, index) => {
			var li = root_1();
			var node = child(li);

			{
				var consequent = ($$anchor) => {
					Directory($$anchor, {
						get opened() {
							return opened[index];
						},
						get directory() {
							return get(file).name;
						},
						$$events: {
							open: () => open(index),
							close: () => close(index)
						}
					});
				};

				var alternate = ($$anchor) => {
					File($$anchor, {
						get icons() {
							return $$props.icons;
						},
						get selected() {
							return $$props.selected;
						},
						get name() {
							return get(file).name;
						},
						$$events: { click: hello }
					});
				};

				if_block(node, ($$render) => {
					if (get(file).children) $$render(consequent); else $$render(alternate, false);
				});
			}

			var node_1 = sibling(node, 2);

			{
				var consequent_2 = ($$anchor) => {
					var fragment_2 = comment();
					var node_2 = first_child(fragment_2);

					{
						var consequent_1 = ($$anchor) => {
							var fragment_3 = comment();
							var node_3 = first_child(fragment_3);

							await_block(
								node_3,
								() => loaders[index],
								($$anchor) => {
									var ul_2 = root_8();
									var li_2 = child(ul_2);
									var node_5 = child(li_2);

									Loading(node_5, {});
									reset(li_2);
									reset(ul_2);
									append($$anchor, ul_2);
								},
								($$anchor, files) => {
									Tree_1($$anchor, {
										get expanded() {
											return $$props.expanded;
										},
										get files() {
											return get(files);
										},
										get icons() {
											return $$props.icons;
										},
										get selected() {
											return $$props.selected;
										}
									});
								},
								($$anchor, error) => {
									var ul_1 = root_7();
									var li_1 = child(ul_1);
									var node_4 = child(li_1);

									Error$1(node_4, {
										get error() {
											return get(error);
										}
									});

									reset(li_1);
									reset(ul_1);
									append($$anchor, ul_1);
								}
							);

							append($$anchor, fragment_3);
						};

						if_block(node_2, ($$render) => {
							if (loaders[index]) $$render(consequent_1);
						});
					}

					append($$anchor, fragment_2);
				};

				if_block(node_1, ($$render) => {
					if (get(file).children) $$render(consequent_2);
				});
			}
			append($$anchor, li);
		});
		append($$anchor, ul);
		return pop({ ...legacy_api() });
	}

	mark_module_end(Tree_1);

	mark_module_start();
	FileExplorer[FILENAME] = "src/FileExplorer.svelte";

	var root = add_locations(template(`<main class="svelte-hgck11"><!></main>`), FileExplorer[FILENAME], [[42, 0]]);

	function FileExplorer($$anchor, $$props) {
		check_target(new.target);
		push($$props, true, FileExplorer);
		validate_prop_bindings($$props, [], [], FileExplorer);

		let files = prop($$props, "files", 19, () => []);
		var main = root();
		var node = child(main);

		Tree_1(node, {
			get files() {
				return files();
			},
			get icons() {
				return $$props.icons;
			},
			get expanded() {
				return $$props.expanded;
			},
			get selected() {
				return $$props.selected;
			}
		});
		append($$anchor, main);
		return pop({ ...legacy_api() });
	}

	mark_module_end(FileExplorer);

	mark_module_start();
	FileMenu[FILENAME] = "demo/FileMenu.svelte";

	function FileMenu($$anchor, $$props) {
		check_target(new.target);
		push($$props, true, FileMenu);
		validate_prop_bindings($$props, [], [], FileMenu);

		FileExplorer($$anchor, {
			get files() {
				return $$props.files;
			},
			get icons() {
				return $$props.icons;
			},
			get expanded() {
				return $$props.expanded;
			},
			get selected() {
				return $$props.selected;
			}
		});

		return pop({ ...legacy_api() });
	}

	mark_module_end(FileMenu);

	var basic = {
		files: [
			{
				type: DIRECTORY,
				name: 'dir',
				children: [
					{
						type: FILE,
						name: 'file-1.txt'
					},
					{
						type: FILE,
						name: 'file-2.css'
					},
					{
						type: FILE,
						name: 'file-3.js'
					}
				]
			},
			{
				type: DIRECTORY,
				name: 'has-sub-folders',
				children: [
					{
						type: DIRECTORY,
						name: 'children',
						children: [
							{
								type: FILE,
								name: 'file4-txt'
							},
							{
								type: FILE,
								name: 'file5-txt'
							},
							{
								type: FILE,
								name: 'file6-txt'
							},
						]
					},
					{
						type: FILE,
						name: 'file-3.txt'
					},
				]
			},
		]
	};

	const extensionToIconMap = {
		txt: fileText,
		xlsx: fileExcelO,
		png: filePictureO
	};

	var customIcons = {
		icons: extension => extensionToIconMap[extension],
		files: [
			{
				type: FILE,
				name: 'file-1.txt'
			},
			{
				type: FILE,
				name: 'file-2.xlsx'
			},
			{
				type: FILE,
				name: 'file-3.png'
			}
		],
	};

	const make = (name, props) => mount(FileMenu, {
		target: document.getElementById(`example-${name}`),
		props
	});

	make('basic', basic);
	make('custom-icons', customIcons);

})();
//# sourceMappingURL=bundle.js.map
