# XiaoLuBG - JavaScript background image plugin
## Usage

| param           | description                                                  | value                                                        |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| selector        | css selector                                                 | default: `body`                                              |
| position        | css position                                                 | default: `fixed`, if `selector`' is not `body`, its position must be `relative` |
| zIndex          | css z-index                                                  | default: `-1`,if `selector`is not `body`, you may set it to a positive value |
| imgMode         | image switching mode                                         | default: `0`, mode `0`: random, mode `1`: in-order           |
| init            | automatic initialization                                     | default: `false`, if false, the `init` function must be called |
| imgDuration     | image display duration                                       | default: `60`, unit: `second`                                |
| blur            | image blurriness                                             | default: `0`, unit: `px`                                     |
| opacity         | image Transparency                                           | default: `1`, 0 ~ 1                                          |
| imgs            | image list                                                   | type: `list`, default: images in the `imgs` directory        |
| animation       | image animation                                              | default: `kenburns-top-right`, you can define it yourself    |
| switchDuration  | image switching duration                                     | default: `2`, unit: `second`                                 |
| switchDirection | image switching direction                                    | default: `column`, optional values: `column`, `row`, `corner` |
| onBgImgChange   | callback function for image switching, parameter: `event.detail.img` | -                                                            |

### Example

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
    init: true,
    imgDuration: 30,
    switchDuration: 3,
    switchDirection: "corner", // row, column, corner
    onBgImgChange: function (event) {
        console.log("Background for body image changed to: " + event.detail.img);
    }
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
    switchDuration: 3,
    switchDirection: "column",
    onBgImgChange: function (event) {
        console.log("Background image for imgDemo changed to: " + event.detail.img);
    }
});
bgDemo.init();
```
## License
[MIT License](LICENSE)