<script lang="ts">
	// import CopyButton from "./docs/copy-button.svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };

	// let codeString: string;

	// function copyCodeToClipboard(node: HTMLPreElement) {
	// 	codeString = node.innerText.trim() ?? "";
	// }
</script>

<!-- use:copyCodeToClipboard -->
<pre
	class={cn(
		"mb-4 mt-6 font-inter rounded-lg border bg-foreground py-4",
		className
	)}
	{...$$restProps}>
	<slot />
</pre>
<!-- <CopyButton
	value={codeString}
	class={cn("absolute right-4 top-4 pre-copy-btn")}
/> -->
