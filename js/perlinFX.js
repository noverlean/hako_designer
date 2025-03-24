class PerlinNoise {
    constructor() {
        this.gradients = {};
        this.permutation = [];
        this.generatePermutation();
    }

    // Генерация случайных векторов для градиентов
    randomGradient() {
        const angle = Math.random() * 2 * Math.PI;
        return { x: Math.cos(angle), y: Math.sin(angle) };
    }

    // Генерация таблицы перестановок (пермутаций)
    generatePermutation() {
        for (let i = 0; i < 256; i++) {
            this.permutation[i] = i;
        }
        for (let i = 0; i < 256; i++) {
            const swap = Math.floor(Math.random() * 256);
            [this.permutation[i], this.permutation[swap]] = [this.permutation[swap], this.permutation[i]];
        }
        // Дублируем массив для быстрого доступа
        this.permutation = this.permutation.concat(this.permutation);
    }

    // Интерполяция (сглаживание)
    lerp(a, b, t) {
        return a + t * (b - a);
    }

    // Сглаживающая функция
    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    // Скалярное произведение вектора
    dot(grid, x, y) {
        return grid.x * x + grid.y * y;
    }

    // Основная функция для вычисления шума
    noise(x, y) {
        const xi = Math.floor(x) & 255;
        const yi = Math.floor(y) & 255;

        const xf = x - Math.floor(x);
        const yf = y - Math.floor(y);

        const topRight = this.getGradient(xi + 1, yi);
        const topLeft = this.getGradient(xi, yi);
        const bottomRight = this.getGradient(xi + 1, yi + 1);
        const bottomLeft = this.getGradient(xi, yi + 1);

        const u = this.fade(xf);
        const v = this.fade(yf);

        const n0 = this.dot(topLeft, xf, yf);
        const n1 = this.dot(topRight, xf - 1, yf);
        const n2 = this.dot(bottomLeft, xf, yf - 1);
        const n3 = this.dot(bottomRight, xf - 1, yf - 1);

        const x1 = this.lerp(n0, n1, u);
        const x2 = this.lerp(n2, n3, u);

        return this.lerp(x1, x2, v);
    }

    // Получение градиента для конкретной точки
    getGradient(x, y) {
        const index = this.permutation[x + this.permutation[y]] % 256;
        if (!this.gradients[index]) {
            this.gradients[index] = this.randomGradient();
        }
        return this.gradients[index];
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Создание объекта шума
const simplex = new PerlinNoise();

// Функция для получения цвета на основе высоты
function getColorByHeight(height) {
    const hue = Math.floor(height * 300 - 160); // От высоты к цвету
    return `hsl(${hue}, 100%, 50%)`;
}
let lastX = null;
let lastY = null;
// Массив для хранения точек линии
const points = [];
const maxLength = 50; // Максимальное количество точек в линии

function draw(x, y) {
    const scale = 0.002; // Масштаб шума
    const height = simplex.noise(x * scale, y * scale); // Генерация шума
    const color = getColorByHeight((height + 1) / 2); // Преобразование высоты в диапазон [0, 1]
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 30; // Толщина линии
    ctx.lineCap = "round"; // Закругленные концы линии

    // Добавляем текущую точку в массив
    points.push({ x, y });

    // Если длина линии превышает максимальную, удаляем старые точки
    if (points.length > maxLength) {
        points.shift();
    }

    // Рисуем линию по точкам
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка канваса
    ctx.beginPath();
    for (let i = 0; i < points.length - 1; i++) {
        const currentPoint = points[i];
        const nextPoint = points[i + 1];
        ctx.moveTo(currentPoint.x, currentPoint.y);
        ctx.lineTo(nextPoint.x, nextPoint.y);
    }
    ctx.stroke();
}

// Событие движения мыши
window.addEventListener("mousemove", (event) => {
    draw(event.clientX, event.clientY);
});


// Сброс последней позиции, если курсор покидает область окна
window.addEventListener("mouseout", () => {
    lastX = null;
    lastY = null;
});

// Обновление размера канваса при изменении окна
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});