import {  Plugin } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		// const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
		// 	// Called when the user clicks the icon.
		// 	new Notice('This is a notice!');
		// });
		// // Perform additional things with the ribbon
		// ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		// const statusBarItemEl = this.addStatusBarItem();
		// statusBarItemEl.setText('Status Bar Text');


		this.addCommand({
			id: "Cross out incomplete TODOS",
			name: "Cross Out Incomplete TODOS",
			editorCallback: (editor, view) => {
				let text = editor.getValue();
				// find all not completed Markdown TODOs in editor.getValue()
				const todos = text.match(/^-\s*\[ \]\s*(.*)$/gm);
				// loop through each TODO
				for (const todo of todos) {
					// complete the todo
					text = text.replace(todo, `#INCOMPLETE ~~${todo.replace(/^-\s*\[ \]\s*/, '')}~~`);
				}
				editor.setValue(text);
				// write the todos to the clipboard
				navigator.clipboard.writeText(todos.join('\n'));
			}
		})
		
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

