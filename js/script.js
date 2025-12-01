// 静态游戏数据
const gameData = [
    {
        封面: 'images/wuziqi.png',
        标题: '五子棋',
        介绍: '童年回忆五子棋',
        链接: 'games/wuziqi.html',
        收录时间: '2025-11-28'
    },
    {
        封面: 'images/tuixiangzi.png',
        标题: '推箱子',
        介绍: '童年回忆推箱子',
        链接: 'games/tuixiangzi.html',
        收录时间: '2025-11-28'
    },
    {
        封面: 'images/tanshishe.png',
        标题: '贪吃蛇',
        介绍: '经典贪吃蛇游戏',
        链接: 'games/tanshishe.html',
        收录时间: '2025-12-01'
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
        item.href = game.链接;
        item.classList.add('game-item');

        item.innerHTML = `
            <div class="game-cover">
                <img src="${game.封面}" alt="${game.标题} 封面">
            </div>
            <div class="game-info">
                <h2 class="game-title">${game.标题}</h2>
                <p class="game-intro">${game.介绍}</p>
                <p class="game-time">收录：${game.收录时间}</p>
            </div>
        `;

        container.appendChild(item);
    });
}

// --- 搜索功能 ---
function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    // 过滤数据
    const filteredGames = gameData.filter(game => {
        const titleMatch = game.标题.toLowerCase().includes(query);
        const introMatch = game.介绍.toLowerCase().includes(query);
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
