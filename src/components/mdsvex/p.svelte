<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class="bg-gradient-to-b from-primary-blue to-primary-green pl-1">
	<p
		class={cn("leading-7 [&:not(:first-child)]:mt-6 pl-4 bg-background", className)}
		{...$$restProps}
	>
		<slot />
	</p>

</div>
