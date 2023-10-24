(() => {
    figma.showUI(__html__);

    figma.ui.onmessage = (message) => {
        switch(message.type) {
            case 'resize':
                resize(figma.currentPage.selection, message.data.size);
            case 'close':
                figma.closePlugin();
                break;
        }
    }
})();

function resize(nodes: readonly SceneNode[], size: number) {
    nodes.forEach(node => {
        if('rescale' in node) {
            const total = node.width + node.height;
            const scale = size / total;
            const offsetScale = ((1 / scale) - 1) / 2;
            node.rescale(scale);
            node.x += node.width * offsetScale;
            node.y += node.height * offsetScale;
        }
    });
}