document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const input = document.getElementById('input');
    const container = document.querySelector('.container');
    const loadingScreen = document.querySelector('.loading-screen');
    const backgroundMusic = document.getElementById('background-music');

    let commandHistory = [];
    let historyIndex = 0;

    setTimeout(() => {
        loadingScreen.style.display = 'none';
        container.style.display = 'flex';
        input.focus();
        backgroundMusic.play();
    }, 3000);

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            let command = input.value.trim();
            output.innerHTML += '> ' + command + '<br>';
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            input.value = '';
            executeCommand(command);
        } else if (event.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        } else if (event.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        }
    });

    function executeCommand(command) {
        switch(command.toLowerCase()) {
            case 'help':
                output.innerHTML += 'Available commands: help, clear, echo [text], music [play|pause|stop]<br>';
                break;
            case 'clear':
                output.innerHTML = '';
                break;
            case command.match(/^echo\s+/) ? command : null:
                output.innerHTML += command.slice(5) + '<br>';
                break;
            case command.match(/^music\s+/) ? command : null:
                handleMusicCommand(command.slice(6));
                break;
            default:
                output.innerHTML += `Unknown command: ${command}<br>`;
        }
        terminal.scrollTop = terminal.scrollHeight;
    }

    function handleMusicCommand(action) {
        switch(action) {
            case 'play':
                backgroundMusic.play();
                output.innerHTML += 'Music playing...<br>';
                break;
            case 'pause':
                backgroundMusic.pause();
                output.innerHTML += 'Music paused.<br>';
                break;
            case 'stop':
                backgroundMusic.pause();
                backgroundMusic.currentTime = 0;
                output.innerHTML += 'Music stopped.<br>';
                break;
            default:
                output.innerHTML += `Unknown music command: ${action}<br>`;
        }
        terminal.scrollTop = terminal.scrollHeight;
    }
});
