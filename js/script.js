// Static game data (English keys)
const gameData = [
    {
        cover: 'images/wuziqi.png',
        title: '五子棋',
        description: '经典五子棋对战，可本地与好友交手。',
        link: 'games/wuziqi.html',
        date: '2025-11-28'
    },
    {
        cover: 'images/tuixiangzi.png',
        title: '推箱子',
        description: '益智推箱子关卡，锻炼逻辑与空间思维。',
        link: 'games/tuixiangzi.html',
        date: '2025-11-28'
    },
    {
        cover: 'images/tanchishe.png',
        title: '贪吃蛇',
        description: '简单上手的经典贪吃蛇，记录你的最高分。',
        link: 'games/tanchishe.html',
        date: '2025-12-01'
    },
    {
        cover: 'images/eluosifangkuai.png',
        title: '俄罗斯方块',
        description: '时间考验的俄罗斯方块，挑战手速与策略。',
        link: 'games/eluosifangkuai.html',
        date: '2025-12-02'
    },
    {
        cover: 'images/pintu.png',
        title: '美少女拼图',
        description: '美少女拼图游戏',
        link: 'games/pintu.html',
        date: '2025-12-13'
    }
];

const container = document.getElementById('gameListContainer');
const searchInput = document.getElementById('searchInput');
const listViewBtn = document.getElementById('listViewBtn');
const gridViewBtn = document.getElementById('gridViewBtn');
const noResults = document.getElementById('noResults');

// --- 渲染函数 ---
/**
 * 根据数据和当前视图模式渲染游戏列表。
 * @param {Array<Object>} games - 要渲染的游戏数组
 */
function renderGames(games) {
    container.innerHTML = ''; // 清空容器
    
    if (games.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    noResults.style.display = 'none';

    games.forEach(game => {
        const item = document.createElement('a');
        item.href = game.link;
        item.classList.add('game-item');

        // create cover & info elements so we can progressively swap the image
        const coverWrap = document.createElement('div');
        coverWrap.classList.add('game-cover');

        const img = document.createElement('img');
        const coverPath = game.cover || '';
        // derive small image by adding "_small" before extension in same directory,
        // e.g. images/wuziqi.png -> images/wuziqi_small.png
        const parts = coverPath.split('/');
        const dirname = parts.length > 1 ? parts.slice(0, -1).join('/') : '';
        const basename = parts[parts.length - 1] || '';
        const dotIndex = basename.lastIndexOf('.');
        const nameOnly = dotIndex > -1 ? basename.slice(0, dotIndex) : basename;
        const ext = dotIndex > -1 ? basename.slice(dotIndex) : '';
        const smallBasename = `${nameOnly}_small${ext}`;
        const smallPath = (dirname ? dirname + '/' : '') + smallBasename;

        img.alt = `${game.title} 封面`;

        // Try load small first; if small exists, show it and then try replacing with large.
        // If small missing, fallback to loading large directly.
        const loadLarge = () => {
            const largeLoader = new Image();
            largeLoader.onload = function () { img.src = coverPath; };
            largeLoader.onerror = function () { /* keep whatever src is displayed */ };
            largeLoader.src = coverPath;
        };

        const smallLoader = new Image();
        smallLoader.onload = function () {
            img.src = smallPath; // use small immediately
            // then try to load large to replace
            loadLarge();
        };
        smallLoader.onerror = function () {
            // small not available: load large directly
            loadLarge();
        };
        smallLoader.src = smallPath;

        coverWrap.appendChild(img);

        const info = document.createElement('div');
        info.classList.add('game-info');

        const h2 = document.createElement('h2');
        h2.classList.add('game-title');
        h2.textContent = game.title;

        const pIntro = document.createElement('p');
        pIntro.classList.add('game-intro');
        pIntro.textContent = game.description;

        const pTime = document.createElement('p');
        pTime.classList.add('game-time');
        pTime.textContent = `收录：${game.date}`;

        info.appendChild(h2);
        info.appendChild(pIntro);
        info.appendChild(pTime);

        item.appendChild(coverWrap);
        item.appendChild(info);

        container.appendChild(item);
    });
}

// --- 搜索功能 ---
function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    // 过滤数据
    const filteredGames = gameData.filter(game => {
        const titleMatch = (game.title || '').toLowerCase().includes(query);
        const introMatch = (game.description || '').toLowerCase().includes(query);
        return titleMatch || introMatch;
    });

    renderGames(filteredGames);
}

// 绑定搜索框输入事件
searchInput.addEventListener('input', handleSearch);

// --- 视图切换功能 ---
function changeView(viewMode) {
    if (viewMode === 'list') {
        container.classList.remove('grid-view');
        container.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    } else if (viewMode === 'grid') {
        container.classList.remove('list-view');
        container.classList.add('grid-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    }
    
    // 视图切换后重新渲染当前搜索结果，以应用新的CSS样式
    handleSearch(); 
}

// 绑定切换按钮事件
listViewBtn.addEventListener('click', () => changeView('list'));
gridViewBtn.addEventListener('click', () => changeView('grid'));

// --- 初始化 ---
document.addEventListener('DOMContentLoaded', () => {
    // 页面加载时默认渲染全部游戏列表 (列表视图)
    renderGames(gameData);
    changeView('list'); // 确保初始状态为列表视图并激活按钮
});
