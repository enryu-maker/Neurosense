export const generateReferenceSpiral = (centerX: number, centerY: number, maxRadius: number, loops: number) => {
    let path = `M ${centerX} ${centerY}`;
    // Parametric equation for Archimedean spiral: r = a + b*theta
    const b = maxRadius / (loops * 2 * Math.PI);

    for (let angle = 0; angle <= loops * 2 * Math.PI; angle += 0.1) {
        const r = b * angle;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        path += ` L ${x} ${y}`;
    }
    return path;
};

export const pointsToPath = (points: { x: number, y: number }[]) => {
    if (points.length === 0) return '';
    const first = points[0];
    let path = `M ${first.x} ${first.y}`;
    for (let i = 1; i < points.length; i++) {
        const point = points[i];
        path += ` L ${point.x} ${point.y}`;
    }
    return path;
};
