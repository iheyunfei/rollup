<template>
	<div class="select">
		<button
			v-for="value in values"
			:key="value"
			:class="{ selected: value === selected }"
			@click="emit('select', value)"
		>
			{{ value }}
		</button>
	</div>
</template>

<script setup lang="ts">
defineProps<{ selected: string; values: string[] }>();
const emit = defineEmits<{ (event: 'select', selected: string): void }>();
</script>

<style scoped>
.select {
	background-color: var(--bg-inactive);
	border: 1px solid var(--bg-default);
	border-radius: 7px;
	padding: 2px;
	display: flex;
}

button {
	display: block;
	border-radius: 6px;
	border: 1px solid transparent;
	font-size: 0.8rem;
	margin: 0;
	padding: 0;
	flex-basis: 0;
	flex-grow: 1;
	line-height: 2rem;
	transition: all 0.2s;
}

.selected {
	background-color: var(--bg-active);
	font-weight: bold;
	border-color: var(--vp-c-brand);
}
</style>
