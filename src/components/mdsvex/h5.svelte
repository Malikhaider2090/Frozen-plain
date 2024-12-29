<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h5
	class={cn("mt-8 scroll-m-20 text-h5 font-semibold tracking-tight", className)}
	{...$$restProps}
>
	<slot />
</h5>
