(function() {
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
    
    const source = document.createElement('source');
    source.src = 'src/prank.mp4';
    source.type = 'video/mp4';
    video.appendChild(source);
    
    const audio = document.createElement('audio');
    audio.id = 'prankAudio';
    audio.style.display = 'none';
    audio.loop = true;
    
    const audioSource = document.createElement('source');
    audioSource.src = 'src/prank.mp3';
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
    
    function blockUserInput() {
        document.addEventListener('keydown', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
        
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
        
        container.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
        
        document.addEventListener('wheel', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, {passive: false});
        
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, {passive: false});
    }
    
    const button = document.querySelector('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.MjT6xe.sOCCfd.brKGGd.BhQfub.zwjsl');
    
    if (button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            button.style.display = 'none';
            
            container.style.display = 'block';
            
            blockUserInput();
            
            requestFullscreen(container)
                .then(() => {
                    video.muted = true;
                    video.play().catch(err => console.log('Video play error:', err));
                    
                    setTimeout(() => {
                        video.muted = false;
                        audio.play().catch(err => console.log('Audio play error:', err));
                    }, 1000);
                })
                .catch(err => {
                    console.log('Fullscreen error:', err);
                    video.muted = true;
                    video.play().catch(e => console.log('Video play error:', e));
                    
                    setTimeout(() => {
                        video.muted = false;
                        audio.play().catch(e => console.log('Audio play error:', e));
                    }, 1000);
                });
        });
    }
})();
