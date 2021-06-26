// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fetch = require('node-fetch');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "search-overflow" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('search-overflow.searchOverflow', function () {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	var data;

	context.subscriptions.push(vscode.commands.registerCommand('search-overflow.searchOverflow', async () => {
		// const result = await vscode.window.showInputBox();
		// let url = 'https://api.stackexchange.com/2.2/search?order=desc&sort=votes&intitle='+result+'&site=stackoverflow';
		// fetch(url)
		// .then(res => res.json())
		// .then((out) => {
		// 	data=out;
		// })
		// .catch(err => { throw err });

		const panel = vscode.window.createWebviewPanel(
			'searchOverflow',
			'Search Overflow',
			vscode.ViewColumn.Two,
			{
			// Enable scripts in the webview
			enableScripts: true
			}
		);

		panel.webview.html = getWebviewContent(data);

	}));

	// context.subscriptions.push(
	// 	vscode.commands.registerCommand('search-overflow.searchOverflow', () => {
	// 	const panel = vscode.window.createWebviewPanel(
	// 		'searchOverflow',
	// 		'Search Overflow',
	// 		vscode.ViewColumn.Two,
	// 		{
	// 		// Enable scripts in the webview
	// 		enableScripts: true
	// 		}
	// 	);
	// 	// panel.webview.html = sample.html;
	// 	panel.webview.html = getWebviewContent();
	// 	})
	// );

	// const commandHandler = (name) => {
	//   console.log(`Hello ${name}!!!`);
	// };
  
	// context.subscriptions.push(vscode.commands.registerCommand('search-overflow.searchOverflow', () => { commandHandler}));

}

// async function showInputBox() {
	
// 	const result = await vscode.window.showInputBox({
// 		value: 'abcdef',
// 		valueSelection: [2, 4],
// 		placeHolder: 'For example: fedcba. But not: 123',
// 		validateInput: text => {
// 			vscode.window.showInformationMessage(`Validating: ${text}`);
// 			return text === '123' ? 'Not 123!' : null;
// 		}
// 	});
// 	vscode.window.showInformationMessage(`Got: ${result}`);
// }


function getWebviewContent(label) {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Stack OverFlow</title>
	</head>
	<body>
		<img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
		<h1 id="lines-of-code-counter">0</h1> {%= label%}`+
		label+
		`<script>
			const counter = document.getElementById('lines-of-code-counter');
	
			let count = 0;
			setInterval(() => {
				counter.textContent = count++;
			}, 100);
		</script>
	</body>
	</html>`;
  }


// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}