<script lang="ts">
	import type { Card } from "$lib/types";
	import {
		function as f,
		readonlyArray as RA,
		string as Str,
	} from "fp-ts";

	let { card, onedit } = $props<{
		card: Card;
		onedit?: (cardId: number) => void;
	}>();

	const formatWrongAnswers = (wrong: string) =>
		f.pipe(wrong, Str.split(";"), RA.map(Str.trim));
</script>

<div
	class="p-2 bg-purple-500 rounded-lg drop-shadow-md text-white select-none flex flex-col gap-4 place-items-center relative"
>
	<div class="flex gap-8 items-baseline justify-between">
		<h2
			class="bg-black bg-opacity-20 font-bold p-1 px-2 rounded min-w-24"
		>
			{card.question}
		</h2>
		<div class="min-w-20">
			<span
				class="icon-solid icon-before text-lg text-white icon-check mr-1"
			></span>
			<span
				class="bg-green-600 border-white border-2 p-1 px-2 rounded-lg"
				>{card.answer}</span
			>
		</div>
	</div>
	<div class="flex flex-wrap gap-2 place-items-baseline">
		<div class="icon-solid icon-before icon-x"></div>

		{#each formatWrongAnswers(card.wrongAnswers) as wrong}
			<div class="bg-black bg-opacity-10 p-1 px-2 rounded-lg">
				{wrong}
			</div>
		{/each}
	</div>
	{#if onedit}
		<button
			aria-label="edit card"
			onclick={() => {
				onedit?.(card.id);
			}}
			class="icon-solid icon-after icon-pencil rounded-full bg-[#2B2B2B] size-9 p-1 absolute -bottom-2 -right-2 hover:bg-[#444]"
		>
		</button>
	{/if}
</div>
