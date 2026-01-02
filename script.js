// Create background stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Create continuous firework particles
function createContinuousFireworks() {
    setInterval(() => {
        const colors = ['#ffd700', '#ff69b4', '#00ffff', '#ff1493', '#ffb6c1', '#ffffff'];
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.6);
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                const angle = (Math.PI * 2 * i) / 15;
                const velocity = 50 + Math.random() * 50;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                document.body.appendChild(particle);
                
                animateParticle(particle, x, y, vx, vy);
            }, i * 30);
        }
    }, 2000);
}

function animateParticle(particle, startX, startY, vx, vy) {
    let x = startX;
    let y = startY;
    let opacity = 1;
    let time = 0;
    
    function update() {
        time += 0.02;
        x += vx * 0.02;
        y += vy * 0.02 + time * 30;
        opacity -= 0.012;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(update);
        } else {
            particle.remove();
        }
    }
    
    update();
}

// Fireworks sequence
function startFireworksSequence() {
    const fireworks = [
        document.getElementById('firework1'),
        document.getElementById('firework2'),
        document.getElementById('firework3'),
        document.getElementById('firework4')
    ];
    
    const delays = [0, 800, 1600, 2400];
    
    fireworks.forEach((firework, index) => {
        setTimeout(() => {
            firework.classList.add('active');
            
            // Add sound effect feel with particles
            const rect = firework.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            createFireworkBurst(centerX, centerY, index);
        }, delays[index]);
    });
    
    // Show letter after all fireworks
    setTimeout(() => {
        // Keep fireworks visible and add glow animation
        fireworks.forEach(firework => {
            firework.classList.add('stay');
        });
        
        document.getElementById('letterContainer').classList.add('show');
        
        // Start continuous background fireworks
        createContinuousFireworks();
    }, 3800);
}

// Create firework burst effect
function createFireworkBurst(x, y, fireworkIndex) {
    const colors = [
        ['#ffd700', '#ff69b4', '#ff1493'],
        ['#00ffff', '#ff00ff', '#0080ff'],
        ['#ff0000', '#ffff00', '#ff8800'],
        ['#ffffff', '#ffb6c1', '#ff69b4']
    ];
    
    const burstColors = colors[fireworkIndex];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = burstColors[Math.floor(Math.random() * burstColors.length)];
        particle.style.boxShadow = `0 0 10px ${burstColors[0]}`;
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 80 + Math.random() * 80;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        animateParticle(particle, x, y, vx, vy);
    }
}

// Initialize
createStars();

// Start the show automatically
window.addEventListener('load', () => {
    setTimeout(() => {
        startFireworksSequence();
    }, 500);
});
