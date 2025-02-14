import examplesById from 'examples.json';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Module } from '../../types';

const areModulesEqual = (modulesA: Module[], modulesB: Module[]) =>
	modulesA.length === modulesB.length &&
	modulesA.every(
		(module, index) =>
			module.name === modulesB[index].name &&
			module.code === modulesB[index].code &&
			module.isEntry === modulesB[index].isEntry
	);

export const useModules = defineStore('modules', () => {
	const modules = ref<Module[]>([]);
	const selectedExample = ref<string | null>(null);

	watch(
		modules,
		modulesValue => {
			if (
				selectedExample.value &&
				!(
					examplesById[selectedExample.value] &&
					areModulesEqual(modulesValue, examplesById[selectedExample.value].modules)
				)
			) {
				selectedExample.value = null;
			}
		},
		{ deep: true }
	);

	return {
		modules,
		selectedExample,
		selectExample(value: string) {
			modules.value = examplesById[value].modules.map((module: Module) => ({
				...module
			}));
			selectedExample.value = value;
		},
		set(newModules: Module[], newSelectedExample: string) {
			selectedExample.value = newSelectedExample;
			modules.value = newModules;
		}
	};
});
