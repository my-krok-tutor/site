class VideoP{

    /**
     * util function to convert second to timepoint string
     * @param {number} sec - seconds > 0
     * @return {string} timepoint in format HH:mm:ss
     */
    static SecondToString(sec){
        const hour = (sec - sec % 3600) / 3600; 
        const minutes = ((sec % 3600) - (sec % 3600) % 60) / 60;
        const seconds = sec - hour * 3600 - minutes * 60;
        return hour.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    }

    /**
     * util function to convert string to timepoint object
     * @param {string} str - timepoint in format HH:mm:ss
     * @return {Object} timepoint with seconds and corrected timepoint string
     */
    static StringToSeconds(str){
        const time_regex = /\d\d:\d\d:\d\d/s;
        if(str.length == 8 && str.match(time_regex)){
            const parts = str.split(':');
            let successL = true;
            let seconds = new Number(parts[2]);
            if(seconds > 59){
                successL = false;
                seconds = 59;
            }
            let minutes = new Number(parts[1]);
            if(minutes > 59){
                successL = false;
                minutes = 59;
            }
            let hours = new Number(parts[0]);
            let secondsConverted = 0;
            if(successL){
                secondsConverted = seconds + minutes * 60 + hours * 60 * 60;
            }
            return { success: successL, point: VideoP.SecondToString(secondsConverted), seconds: secondsConverted };
        }
        return { success: false, point: '00:00:00', seconds: 0 };
    }

    /**
     * special interface for setup YT player @see Draw()
     * UNTOUCHABLE!
     * @param {string} tempVideoId - videoId from YT
     * @param {Object} props - settings to draw object using css classes and DOM nodes
     */
    static OnDraw(tempVideoId, props){
        const startS = VideoP.StringToSeconds(props.startPoint).seconds;
        const endS = VideoP.StringToSeconds(props.endPoint).seconds;
        const lockP = new YT.Player(tempVideoId, {
            height: '360',
            width: '640',
            videoId: props.videoId,
            playerVars: {
                fs: 1,
                start: startS,
                controls: 0,
                autoplay: 0,
                disablekb: 1,
                enablejsapi: 1,
                rel: 0,
                showinfo: 0,
                end: endS
            },
            events: {
                'onReady': (event) => {
                    const previewL = document.getElementById(tempVideoId);
                    const previewButtonL = document.getElementById(tempVideoId + 'button');
                    previewButtonL.innerText = 'play_arrow';
                    previewL.style.display = 'block';
                    previewL.style.position = 'absolute';
                    previewL.style.width = '100%';
                    previewL.style.height = '100%';
                    previewButtonL.addEventListener('click', function () {
                        switch (lockP.getPlayerState()) {
                            case 0:
                            case -1:
                            case 2:
                            case 5:
                                lockP.playVideo();
                                previewButtonL.style.opacity = '0.0';
                                break;
                            case 1:
                                lockP.pauseVideo();
                                previewButtonL.style.opacity = '1.0';
                                break;
                        }
                    });
                },
                'onStateChange': (event) => {
                    const previewButtonL = document.getElementById(tempVideoId + 'button');
                    if(lockP.getPlayerState() == 0){
                        lockP.pauseVideo();
                        previewButtonL.style.opacity = '1.0';
                        lockP.seekTo(startS, true);
                    }
                }
            }
        });
    }

    /**
     * special interface for drawing any VideoP from main file
     * UNTOUCHABLE!
     * @param {Object} props - settings to draw object using css classes and DOM nodes
     * @param {Node} contentL - holder for adding all children, that passed from @see Presenter.DrawPresenter()
     */
    static Draw(props, contentL){
        while (contentL.firstChild) {
            contentL.removeChild(contentL.lastChild);
        }
        const previewHolder = document.createElement('div');
        const preview = document.createElement('div');
        const previewIcon = document.createElement('p');
        preview.id = 'preview' + Math.round(Math.random() * 100000).toString();
        preview.style.display = 'none';
        previewHolder.classList.add('video__preview_holder');
        previewIcon.innerText = 'hourglass_empty';
        previewIcon.classList.add('material-icons');
        previewIcon.classList.add('video__preview_icon');
        previewIcon.id = preview.id + 'button';
        previewHolder.appendChild(preview);
        previewHolder.appendChild(previewIcon);
        contentL.appendChild(previewHolder);
        VideoP.OnDraw(preview.id, props);
    }
}