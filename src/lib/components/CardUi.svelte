<script lang="ts">
	import type { Card } from "$lib/types";

	let { card, onedit } = $props<{
		card: Card;
		onedit?: (cardId: number) => void;
	}>();
</script>

<h2>
	{card.question}
</h2>
<button
	aria-label="edit card"
	onclick={() => {
		onedit?.(card.id);
	}}
	class="icon-solid icon-after icon-pencil"
>
</button>
