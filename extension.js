// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fetch = require('node-fetch');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "search-overflow" is now active!');
	context.subscriptions.push(vscode.commands.registerCommand('search-overflow.searchOverflow', async () => {
		(async() =>{
			var intitle = await vscode.window.showInputBox({placeHolder: "Enter keywords !!"});
			var url = 'https://api.stackexchange.com/2.2/search?order=desc&sort=votes&intitle='+intitle+'&site=stackoverflow';
			const response = await fetch(url);
    		const data = await response.json();
			const panel = vscode.window.createWebviewPanel(
				'searchOverflow',
				'Search Overflow',
				vscode.ViewColumn.Two,
				{
				// Enable scripts in the webview
				enableScripts: true
				}
			);
			var len = data['items'].length;
			if(len==0){
				panel.webview.html = `<h1>No Questions Found</h1>`;
			}
			else{
				var dataList = "";
				for(let i=1; i<=Math.min(10,len);i++){
					dataList += `<a href=\"`;
					dataList += data['items'][i-1]['link'];
					dataList += `" class=\"list-group-item list-group-item-action active\">`;
					dataList += data['items'][i-1]['title'];
					dataList += `</a>`;
				}
				panel.webview.html = getWebviewContent(dataList);
			}
		})()
	}));
}

function getWebviewContent(data) {
	// return `<!DOC
	return `<!DOCTYPE html>
	<html>
	<head>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	</head>
	<body>
	<div>
		<h1> Questions </h1>
	</div>
	<div>
		<ul class="list-group">`+
			data +
		`</ul>
	</div>
	</body>
	</html>`;
  }


// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}