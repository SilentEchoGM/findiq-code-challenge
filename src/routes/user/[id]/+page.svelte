<script lang="ts">
  import { page } from "$app/stores";
  import { type Card } from "$lib/types";
  import { option as O } from "fp-ts"
  
  let currentCard = $state<O.Option<number>>(O.none)
</script>

{#snippet cardUi(card: Card)}
    <h2>{card.question}</h2>
    <button popovertarget="edit-card" popovertargetaction="show" class="icon-after icon-solid icon-pencil" aria-label="edit" onclick={() => {
      currentCard = O.some(card.id)
    }}></button>
{/snippet}

<h1>{$page.data.user.name}'s Cards</h1>
<div class="grid" style:grid-template-columns="1fr 2rem">
{#each $page.data.cards as card}
  {@render cardUi(card)}
{/each}
</div>

<div popover="auto" id="edit-card">
  <form action="?/saveCard">
    <label for="question">Question</label>
    <input type="text" id="question" name="question" required />
    <label for="answer">Answer</label>
    <input type="text" id="answer" name="answer" required />
    <label for="wrongAnswers">Wrong Answers</label>
    <input type="text" id="wrongAnswers" name="wrongAnswers" required />
    <button type="submit" popovertarget="edit-card" popovertargetaction="hide" onclick={() => {
      currentCard = O.none
    }}>Save</button>
  </form>
</div>