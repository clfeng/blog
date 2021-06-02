
const TAU = 2 * Math.PI;

function draw(ctx, node, { fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white' } = {}) {
    const children = node.children;
    const { x, y, r } = node;
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
    if (children) {
        for (let i = 0; i < children.length; i++) {
            draw(ctx, children[i]);
        }
    } else {
        const name = node.data.name;
        ctx.fillStyle = textColor;
        ctx.font = '1.5rem Arial';
        ctx.textAlign = 'center';
        ctx.fillText(name, x, y);
    }
}

draw(context, root);