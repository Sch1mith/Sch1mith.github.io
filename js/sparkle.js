const projetos = document.querySelector(".projetos");
const colors = [
    "#FFD700",
    "#FF8C00",
    "#FF4500",
    "#FB68EE",
    "#FF69B4",
    "#00CED1",
];
const stars = ["✦", "✧"];

projetos.addEventListener("mousemove", (e) => {
    const rect = projetos.getBoundingClientRect();
    const x = e.clientX  - rect.left;
    const y = e.clientY - rect.top;

    createSparkle(x, y);
});

function createSparkle(x, y) {
    const sparkle = document.createElement("span");
    sparkle.classList.add("cursor-trail");

    const starChar = stars[Math.floor(Math.random() * stars.length)];
    const size = Math.random() * 15 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 10;

    sparkle.style.backgroundColor = color;
    sparkle.style.boxShadow = `0 0 10px ${color}`;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    projetos.appendChild(sparkle);

    sparkle.animate(
        [
            {
                opacity: 1,
                transform: "translate(-50%, -50%) scale(1)",
            },
            {
                opacity: 0,
                transform: `translate(calc(-50% + ${
                    Math.cos(angle) * distance
                }px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`,
            },
        ],
        {
            duration: 1000,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            fill: "forwards",
        }
    );
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
};

document.addEventListener(
    "touchmove",
    (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        cursor.style.left = touch.clientX + "px";
        cursor.style.top = touch.clientY + "px";
        createSparkle(touch.pageX, touch.pageY);
    },
    { passive: false }
);
