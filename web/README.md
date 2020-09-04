# setup

```
yarn
cp .env.example .env
```

> eslint の設定

vscode を使用している場合

1. 拡張機能をインストール([eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))
2. settings.json を開き、以下を追記する。

```json
{
  ...
  "eslint.nodePath": "./node_modules/eslint",
  "eslint.packageManager": "yarn",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.alwaysShowStatus": true,
  ...
}
```

※settings.json は、Ctrl + Shift +p を押して、settingsjson と打って Enter を押せば出てくると思います。
