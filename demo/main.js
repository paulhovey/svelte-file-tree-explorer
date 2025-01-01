import FileMenu from './FileMenu.svelte'

import basic from './example-basic.js'
import customIcons from './example-custom-icons.js'
import { mount } from "svelte";

const make = (name, props) => mount(FileMenu, {
	target: document.getElementById(`example-${name}`),
	props
})

make('basic', basic)
make('custom-icons', customIcons)
