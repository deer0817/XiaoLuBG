(function(window){
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
    class XiaoLuBG {
        constructor(obj) {
            this._setting = {}
            this._setting = Object.assign(this._setting, obj);
            this._imgindex = 0;
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
            let baseStyle = `
            .${this._className}::before {
                content: "";
                position: ${this._setting.position || 'fixed'};
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                z-index: ${bgZIndex};
                background-position: center;
                background-attachment: fixed;
                background-size: cover;
                background-repeat: no-repeat;
                background-image: var(--xiaolu-bg-img);
                animation: ${animation.enable ? animation.name : 'none'} ${animation.duration}s ease-out infinite alternate both;
                -webkit-animation: ${animation.enable ? animation.name : 'none'} ${animation.duration}s ease-out infinite alternate both;
                opacity: ${opacity > 0 ? opacity : 'none'};
                filter: ${blur > 0 ? `blur(${blur}px)` : 'none'}
            }` 
            baseStyle += defaultStyle;
            let styleNode = document.createElement('style');
            styleNode.innerHTML = baseStyle;
            document.head.appendChild(styleNode);
        }
        _setBg() {
            let selectorNode = this._getSelectorNode();
            selectorNode.classList.add(this._className);
        }
        _getBgImg() {
            let imgMode = this._setting.imgMode || 0;
            let imgs = this._getImgs();
            if (imgMode == 0) {
                return imgs[Math.floor(Math.random() * imgs.length)];
            } else if (imgMode == 1) {
                let imgIndex = this._imgindex % imgs.length;
                this._imgindex++;
                return imgs[imgIndex];
            } else {
                console.warn('Unknown imgMode, using random mode');
                return imgs[Math.floor(Math.random() * imgs.length)];
            }
        }
        _setBgImg() {
            let selectorNode = this._getSelectorNode();
            let bgImg = this._getBgImg();
            selectorNode.style.setProperty('--xiaolu-bg-img', `url(${bgImg})`);
        }
        _setBgImgInterval() {
            let imgDuration = this._setting.imgDuration || 0;
            let selectorNode = this._getSelectorNode();
            if (imgDuration <= 0) {
                return;
            }
            setInterval(() => {
                let bgImg = this._getBgImg();
                selectorNode.style.setProperty('--xiaolu-bg-img', `url(${bgImg})`);
            }, imgDuration * 1000);
        }
        set(setting) {
            this._setting = Object.assign(this._setting, setting);
            let initEn = this._setting.init || false;
            if (initEn) {
                this.init();
            }
        }
        init() {
            console.info('XiaoLu BGImage init...');
            this._setStyle();
            this._setBgImg();
            this._setBgImgInterval();
            this._setBg();
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
            "./imgs/bridge.jpg",
            "./imgs/chicago.jpg",
            "./imgs/dusk.jpg",
            "./imgs/kafka.jpg",
            "./imgs/landscape.jpg",
            "./imgs/moon.jpg"
        ],
        imgMode: 0,
        imgDuration: 60,
        animation: {
            enable: true,
            duration: 30,
            name: 'kenburns-top-right'
        }
    });
})(window);