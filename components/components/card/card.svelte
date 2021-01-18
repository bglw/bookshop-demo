<script>
    export let compact = false;
    export let active = false;
    export let image;
    export let title;
    export let subtitle;

    function toggle() {
        active = !active;
    }
</script>
<div class="c-card" 
    class:c-card--compact={compact} 
    class:is-active={active}
    on:click={toggle}>

    <img class="c-card__image" src="{ image }" alt="Demo alt">

    <h2 class="c-card__title">
        { title }
    </h2>

    <p class="c-card__subtitle">
        { subtitle }
    </p>

</div>