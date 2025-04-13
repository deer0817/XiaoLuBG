# XiaoLuBG - JavaScript background image plugin
## Usage
```javascript
// Example 1
/*
window.$BGIMG.set({
    selector: 'body',
    position: 'fixed',
    zIndex: -1,
    imgs: [
        "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/kafka.jpg",
        "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/landscape.jpg",
        "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/moon.jpg",
        "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/bridge.jpg",
        "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/chicago.jpg",
        "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/dusk.jpg"
    ],
    imgMode: 0,
    imgDuration: 60,
    animation: {
        enable: true,
        duration: 30,
        name: 'kenburns-top-right'
    }
})
window.$BGIMG.init()
*/

// Example 2
// Use default instance
window.$BGIMG.set({
    selector: 'body',
    imgMode: 1, // mode 0: random, mode 1: in-order
    init: true
});
// if init is false
// window.$BGIMG.init()

// Create a new instance
let bgDemo = new XiaoLuBG({
    selector: "#background-demo", // default: body, if it's not 'body', its position must be relative
    position: "absolute", // default: fixed, must be absolute if selector is not 'body'
    imgMode: 0,
    blur: 1, // default: 0
    opacity: 0.9, // default: 1
    imgs: [
        "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/kafka.jpg",
        "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/landscape.jpg",
        "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/moon.jpg",
        "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/bridge.jpg",
        "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/chicago.jpg",
        "https://cdn.jsdelivr.net/gh/deer0817/XiaoLuBG/imgs/dusk.jpg"
    ],
    animation: {
        enable: true,
        duration: 10,
        name: 'kenburns-bottom-left'
    },
    onBgImgChange: function (event) {
        console.log("Background image changed to: " + event.detail.img);
    }
});
bgDemo.init();
```
## License
[MIT License](LICENSE)