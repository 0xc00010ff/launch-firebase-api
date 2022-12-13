# last-api-firebase

### Installation

<details>
  <summary>Install Firebase tools</summary>
  
  - https://firebase.google.com/docs/cli#install-cli-mac-linux
  - Log in to firebase with `firebase login`
  - Select project with `firebase projects:list`
  
</details>

### Connecting to your Firebase

- Cmd+Shift+F `your-app-name` and replace all project name instances with the name of your firebase project
- Generate a new private key from https://console.firebase.google.com/u/0/project/your-app-name/settings/serviceaccounts/adminsdk
- Name the private key `serviceAccountKey.json` and it to the **root** directory of this project

### Starting

- Note that the root folder is the project container, and the actual Node app is inside of `functions/`.
- Meaning that you'll do git in one terminal tab at the root folder, and use another tab at `/functions` for running the API

```bash
cd functions
npm install
npm run dev
```

- API will run at http://localhost:4001/your-app-name/us-central1/v1/
- Emulator dashboard will run at http://localhost:4000

### Dev env

The dev server runs at https://us-central1-your-app-name.cloudfunctions.net/v1

### Example Routes

Note: POST params expect a JSON body

`POST /widgets` - Create an widget.

- `name`: (optional) widget name
- `description`: (optional) widget description

`GET /widgets/:widgetId` - Read an widget. Response contains all the resources and their fields.

## VSCode super productivity setup:

- [Set up VSCode to run Prettier on save](https://scottsauber.com/2017/06/10/prettier-format-on-save-never-worry-about-formatting-javascript-again/)
- [Get Github Copilot autocomplete](https://docs.github.com/en/copilot/getting-started-with-github-copilot/getting-started-with-github-copilot-in-visual-studio-code)
- [Enable VSCode debugging breakpoints](https://profy.dev/article/debug-react-vscode)
