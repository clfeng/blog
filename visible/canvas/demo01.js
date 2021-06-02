/**
 * 1. 获取 Canvas 对象，通过 getContext(‘2d’) 得到 2D 上下文
 * 2. 设置绘图状态，比如填充颜色 fillStyle，平移变换 translate 等等
 * 3. 调用 beginPath 指令开始绘制图形；
 * 4. 调用绘图指令，比如 rect，表示绘制矩形；
 * 5. 调用 fill 指令，将绘制内容真正输出到画布上。
 * 
 */

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const rectSize = [100, 100];

context.fillStyle = 'red';
context.beginPath();
context.translate(-0.5 * rectSize[0], -0.5 * rectSize[1]);
context.rect(0.5 * canvas.width, 0.5 * canvas.height, ...rectSize);
context.fill();
context.save(); // 暂存状态

context.translate(0.5 * rectSize[0], 0.5 * rectSize[1]);
context.fillStyle = 'yellow';
context.beginPath();
context.rect(256, 256, ...rectSize);
context.fill();
context.restore(); // 恢复状态

