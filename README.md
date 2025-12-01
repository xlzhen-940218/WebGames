# WebGames

一个简单的网页小游戏集合，包含若干基于 HTML/CSS/JavaScript 的轻量级游戏，适合在本地或静态主机上直接运行和学习。项目内部分文件可能由 AI 辅助生成并由作者整理。

**项目结构（简要）**
- `index.html`: 项目主页，入口页面。
- `css/`: 存放样式文件（例如 `style.css`）。
- `js/`: 存放脚本文件（例如 `script.js`）。
- `games/tuixiangzi.html`: 推箱子小游戏页面。
- `games/wuziqi.html`: 五子棋小游戏页面。
- `images/`: 游戏使用的图片资源目录。
- `LICENSE`: 许可证文件（默认 MIT 或仓库内所示）。
- `README.md`: 本文件，项目说明。

**如何在本地运行/预览**
- 直接打开：在文件管理器中双击 `index.html`，或在浏览器中使用 `file://` 协议打开。
- 建议使用静态服务器（避免某些浏览器对本地文件的限制）：
	- 使用 Python 3（在项目根目录运行）：
		```bash
		python3 -m http.server 8000
		```
		然后在浏览器访问 `http://localhost:8000/`。
	- 或在 VS Code 中安装并启用 `Live Server` 插件，点击 `Go Live` 即可预览。

**在线演示**
- GitHub Pages（托管）：https://webgames.codetools.fun/

**已包含的游戏（简述）**
- 推箱子（`games/tuixiangzi.html`）：经典推箱子玩法，使用键盘控制角色移动并推箱子到目标位置。
- 五子棋（`games/wuziqi.html`）：棋盘落子、胜负判定的简单实现，适合学习和本地对弈。

**贡献与反馈**
- 欢迎提交 Issue 或 Pull Request 来修复 bug、优化交互或添加新游戏。
- 提交时请尽量附带重现步骤和截图/录屏（如适用）。

**许可证**
- 仓库根目录下有 `LICENSE` 文件，请参阅其中的许可条款（例如 MIT）。

如需更多帮助或希望我为某个游戏添加功能（例如悔棋、AI 对手、移动动画等），请告诉我要实现的具体功能。
