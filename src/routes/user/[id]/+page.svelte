<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import CardUi from "$lib/components/CardUi.svelte";
  import { type Card } from "$lib/types";
  import { option as O } from "fp-ts";

  const getDefaultCard = () => ({
    question: "",
    answer: "",
    wrongAnswers: "",
    userId: $page.data.user.id,
    id: $page.data.cards.length,
  });

  let currentCard = $state<O.Option<number>>(O.none);
  let editCardModal = $state<HTMLDialogElement>();
  let editCardModalState = $state<Card>(getDefaultCard());
</script>

<h1 class="text-center text-4xl font-bold pb-8 pt-8">
  {$page.data.user.name}'s
  <span class="p-1 px-4 bg-purple-600 drop-shadow rounded">Cards</span>
</h1>

<div class="flex bg-black bg-opacity-20 p-8 px-32 place-content-between">
  <button
    class="bg-green-700 hover:bg-green-600 active:bg-green-800 p-2 px-8 rounded text-white text-xl"
    onclick={() => {
      editCardModalState = getDefaultCard();
      editCardModal?.showPopover();
      currentCard = O.some($page.data.cards.length);
    }}>Create New Card</button
  >
  <form action="?/logout" method="post" use:enhance>
    <button
      type="submit"
      class="bg-red-700 text-white text-xl rounded icon-solid icon-before icon-right-from-bracket p-2 px-8 hover:bg-red-600"
    >
      <span class="ml-4">Log out</span>
    </button>
  </form>
</div>

<div
  class="flex flex-wrap gap-4 p-8 m-4 rounded-lg max-h-full bg-purple-600 {O.isSome(
    currentCard,
  )
    ? 'blur-sm'
    : ''}"
>
  {#each $page.data.cards as card}
    <CardUi
      {card}
      onedit={(cardId) => {
        currentCard = O.some(cardId);
        editCardModalState = $page.data.cards[cardId - 1]; //minus 1 because sqlite ids start at 1
        editCardModal?.showPopover();
      }}
    ></CardUi>
  {:else}
    <div
      class=" flex flex-col text-xl w-full {O.isSome(currentCard)
        ? 'blur'
        : ''} place-items-center"
    >
      <div>No cards yet!</div>
      <div class="icon-solid icon-before opacity-50 icon-face-frown-open"></div>
    </div>
  {/each}
</div>

<dialog
  popover="auto"
  class="bg-purple-600 text-white text-lg rounded-xl drop-shadow-xl border-solid border-4 border-white border-opacity-35"
  id="edit-card"
  bind:this={editCardModal}
  ontoggle={(event) => {
    if (event.newState === "closed") {
      currentCard = O.none;
      editCardModalState = getDefaultCard();
    }
  }}
>
  <form
    method="post"
    use:enhance
    action="?/saveCard"
    class="grid grid-cols-2 gap-4 p-4 px-4 items-baseline"
  >
    <label for="question">Question</label>
    <input
      type="text"
      class="bg-purple-400 rounded p-1 px-2 placeholder:text-white placeholder:italic"
      id="question"
      name="question"
      placeholder="Iron"
      bind:value={editCardModalState.question}
    />
    <label for="answer">Answer</label>
    <input
      type="text"
      class="bg-purple-400 rounded p-1 px-2 placeholder:text-white placeholder:italic"
      id="answer"
      name="answer"
      placeholder="Fe"
      bind:value={editCardModalState.answer}
    />
    <label for="wrongAnswers"
      >Wrong Answers <div class="text-sm">
        (separate with
        <code class="bg-black bg-opacity-20 p-1 rounded">;</code>)
      </div></label
    >
    <input
      class="bg-purple-400 rounded p-1 px-2 placeholder:text-white placeholder:italic"
      id="wrongAnswers"
      name="wrongAnswers"
      placeholder={`Ag;Au;I
`}
      bind:value={editCardModalState.wrongAnswers}
    />
    <button
      class="col-span-2 bg-green-700 hover:bg-green-600 active:bg-green-800 p-2 px-8 rounded text-white text-xl"
      type="submit"
      popovertarget="edit-card"
      popovertargetaction="hide"
      onclick={() => {
        currentCard = O.none;
      }}>Save</button
    >
  </form>
</dialog>
