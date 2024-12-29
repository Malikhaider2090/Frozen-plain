<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h2
	class={cn(
		"mt-12 pb-2 text-h_3 font-semibold tracking-tight first:mt-0",
		className
	)}
	{...$$restProps}
>
	<slot />
</h2>
