(function(window){
    const message = function() {
/*

██╗  ██╗██╗ █████╗  ██████╗ ██╗     ██╗   ██╗███████╗██████╗  ██████╗ 
╚██╗██╔╝██║██╔══██╗██╔═══██╗██║     ██║   ██║██╔════╝╚════██╗██╔═████╗
 ╚███╔╝ ██║███████║██║   ██║██║     ██║   ██║███████╗ █████╔╝██║██╔██║
 ██╔██╗ ██║██╔══██║██║   ██║██║     ██║   ██║╚════██║██╔═══╝ ████╔╝██║
██╔╝ ██╗██║██║  ██║╚██████╔╝███████╗╚██████╔╝███████║███████╗╚██████╔╝
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚══════╝╚══════╝ ╚═════╝ 

*/
    }
    let defaultStyle = `@-webkit-keyframes kenburns-top-right {
        0% {
            -webkit-transform: scale(1) translate(0, 0);
            transform: scale(1) translate(0, 0);
            -webkit-transform-origin: 84% 16%;
            transform-origin: 84% 16%;
        }
        100% {
            -webkit-transform: scale(1.25) translate(20px, -15px);
            transform: scale(1.25) translate(20px, -15px);
            -webkit-transform-origin: right top;
            transform-origin: right top;
        }
    }
    @keyframes kenburns-top-right {
        0% {
            -webkit-transform: scale(1) translate(0, 0);
            transform: scale(1) translate(0, 0);
            -webkit-transform-origin: 84% 16%;
            transform-origin: 84% 16%;
        }
        100% {
            -webkit-transform: scale(1.25) translate(20px, -15px);
            transform: scale(1.25) translate(20px, -15px);
            -webkit-transform-origin: right top;
            transform-origin: right top;
        }
    }`;
    function getMultiLine(f) {
        const lines = f.toString();
        return lines.substring(lines.indexOf('/*') + 2, lines.lastIndexOf('*/'));
    }
    class XiaoLuBG {
        constructor(obj) {
            this._setting = {}
            this._setting = Object.assign(this._setting, obj);
            this._imgindex = 0;
            this._currentImg = '';
            this._className = `xiaolu-bg-img-${Date.now()}`
        }
        _getImgs() {
            let imgs = this._setting.imgs;
            if (imgs && imgs.length > 0) {
                return imgs;
            } else {
                console.error('No images found');
                return [];
            }
        }
        _getSelectorNode() {
            let selector = this._setting.selector;
            if (selector) {
                return document.querySelector(selector);
            } else {
                return document.body;
            }
        }
        _setStyle() {
            let animation = this._setting.animation || {};
            let bgZIndex = this._setting.zIndex || -1;
            let opacity = this._setting.opacity || 1;
            let blur = this._setting.blur || 0;
            let switchDuration = this._setting.switchDuration || 2;
            let baseStyle = `
            .${this._className}::before, .${this._className}::after {
                content: "";
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                position: ${this._setting.position || 'fixed'};
                width: 100%;
                height: 100%;
                z-index: ${bgZIndex};
                background-position: center;
                background-attachment: fixed;
                background-size: cover;
                background-repeat: no-repeat;
                animation: ${animation.enable ? animation.name : 'none'} ${animation.duration}s ease-out infinite alternate both;
                -webkit-animation: ${animation.enable ? animation.name : 'none'} ${animation.duration}s ease-out infinite alternate both;
                opacity: ${opacity > 0 ? opacity : 'none'};
                filter: ${blur > 0 ? `blur(${blur}px)` : 'none'};
                transition: all ${switchDuration}s cubic-bezier(0.55, 0, 0.1, 1);
            }
            .${this._className}.switch-column.show-after::after {
                top: 0;
            }
            .${this._className}.switch-column.show-before::before {
                top: 0;
            }
            .${this._className}.switch-column.show-before::after {
                opacity: 0;
                top: -100%;
                animation: none;
                -webkit-animation: none;
            }
            .${this._className}.switch-column.show-after::before {
                opacity: 0;
                top: 100%;
                animation: none;
                -webkit-animation: none;
            }
            .${this._className}.switch-row.show-after::after {
                left: 0;
            }
            .${this._className}.switch-row.show-before::before {
                left: 0;
            }
            .${this._className}.switch-row.show-before::after {
                opacity: 0;
                left: 100%;
                animation: none;
                -webkit-animation: none;
            }
            .${this._className}.switch-row.show-after::before {
                opacity: 0;
                left: -100%;
                animation: none;
                -webkit-animation: none;
            }
            .${this._className}.switch-corner.show-after::after {
                left: 0;
                top: 0;
            }
            .${this._className}.switch-corner.show-before::before {
                left: 0;
                top: 0;
            }
            .${this._className}.switch-corner.show-before::after {
                opacity: 0;
                left: 100%;
                top: 100%;
                animation: none;
                -webkit-animation: none;
            }
            .${this._className}.switch-corner.show-after::before {
                opacity: 0;
                left: -100%;
                top: -100%;
                animation: none;
                -webkit-animation: none;
            }
            .${this._className}::before {
                background-image: var(--xiaolu-bg-img);
            }
            .${this._className}::after {
                background-image: var(--xiaolu-bg-img-after);
            }` 
            baseStyle += defaultStyle;
            let styleNode = document.createElement('style');
            styleNode.innerHTML = baseStyle;
            document.head.appendChild(styleNode);
        }
        _isShowingBefore() {
            let selectorNode = this._getSelectorNode();
            return selectorNode.classList.contains('show-before');
        }
        _setBg() {
            let switchDirection = this._setting.switchDirection || 'column';
            let selectorNode = this._getSelectorNode();
            selectorNode.classList.add(this._className);
            selectorNode.classList.add(`switch-${switchDirection}`);
            selectorNode.addEventListener('transitionend', (e) => {
                let imgIndex = this._imgindex;
                let imgs = this._getImgs();
                let propertyName  = '--xiaolu-bg-img';
                if (this._isShowingBefore()) {
                    imgIndex = (imgIndex + 1) % imgs.length;
                    propertyName = '--xiaolu-bg-img-after';
                }
                if (selectorNode.style.getPropertyValue(propertyName) !== `url(${imgs[imgIndex]})`) {
                    selectorNode.style.setProperty(propertyName, `url(${imgs[imgIndex]})`);
                }
            });
        }
        _getBgImg() {
            let imgMode = this._setting.imgMode || 0;
            let imgs = this._getImgs();
            if (imgMode === 0) {
                this._imgindex = Math.floor(Math.random() * imgs.length);
                this._currentImg = imgs[this._imgindex];
            } else if (imgMode === 1) {
                this._imgindex = (this._imgindex + 2) % imgs.length;
                this._currentImg = imgs[this._imgindex];
            } else {
                console.warn('Unknown imgMode, using random mode');
                this._imgindex = Math.floor(Math.random() * imgs.length);
                this._currentImg = imgs[this._imgindex];
            }
            return this._currentImg;
        }
        _setFirstBgImg() {
            let selectorNode = this._getSelectorNode();
            let imgs = this._getImgs();
            if (imgs.length <= 0) {
                console.error('No images found');
                return false;
            }
            this._getBgImg();
            selectorNode.style.setProperty('--xiaolu-bg-img', `url(${this._currentImg})`);
            let afterImgIndex = (this._imgindex + 1) % imgs.length;
            selectorNode.style.setProperty('--xiaolu-bg-img-after', `url(${imgs[afterImgIndex]})`);
            selectorNode.classList.add('show-before');
            return true;
        }
        _setBgImg() {
            let selectorNode = this._getSelectorNode();
            let curImg = "";
            if (this._isShowingBefore()) {
                this._getBgImg();
                selectorNode.classList.remove('show-before');
                selectorNode.classList.add('show-after');
                curImg = selectorNode.style.getPropertyValue('--xiaolu-bg-img-after');
            } else {
                selectorNode.classList.remove('show-after');
                selectorNode.classList.add('show-before');
                curImg = selectorNode.style.getPropertyValue('--xiaolu-bg-img');
            }
            if (curImg.match(/url\(["']?([^"']*)["']?\)/)) {
                curImg = curImg.match(/url\(["']?([^"']*)["']?\)/)[1];
            }
            return curImg;
        }
        _setBgImgInterval() {
            let imgDuration = this._setting.imgDuration || 60;
            let selectorNode = this._getSelectorNode();
            if (imgDuration <= 0) {
                return;
            }
            if (this._getImgs().length <= 1) {
                console.warn('No more than 1 image, no need to set interval');
                return;
            }
            setInterval(() => {
                let curImg = this._setBgImg();
                this._dispatchImgChangeEvent(selectorNode, curImg);
            }, imgDuration * 1000);
        }
        _registerImgChangeHook() {
            let imgChangeHook = this._setting.onBgImgChange;
            if (imgChangeHook && typeof imgChangeHook === 'function') {
                let selectorNode = this._getSelectorNode();
                selectorNode.addEventListener('bgImgChange', imgChangeHook);
            }
        }
        _dispatchImgChangeEvent(selector, imgUrl) {
            let event = new CustomEvent('bgImgChange', {
                detail: {
                    img: imgUrl
                }
            });
            selector.dispatchEvent(event);
        }

        set(setting) {
            this._setting = Object.assign(this._setting, setting);
            let initEn = this._setting.init || false;
            if (initEn) {
                this.init();
            }
        }
        init() {
            console.log(getMultiLine(message));
            this._setStyle();
            this._setBg();
            if (!this._setFirstBgImg()) {
                console.error('Failed to set first background image');
                return;
            }
            this._setBgImgInterval();
            this._registerImgChangeHook();
        }
    }
    window.XiaoLuBG = XiaoLuBG;
    window.$BGIMG = new XiaoLuBG({
        selector: 'body',
        position: 'fixed',
        zIndex: -1,
        opacity: 1,
        blur: 0,
        imgs: [
            "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/bridge.jpg",
            "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/chicago.jpg",
            "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/dusk.jpg",
            "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/kafka.jpg",
            "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/landscape.jpg",
            "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/moon.jpg"
        ],
        imgMode: 1,
        imgDuration: 60,
        animation: {
            enable: true,
            duration: 30,
            name: 'kenburns-top-right'
        }
    });
})(window);