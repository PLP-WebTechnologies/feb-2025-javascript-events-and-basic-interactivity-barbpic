document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ========== //

    // Click Event
    const clickBtn = document.getElementById('click-btn');
    const clickOutput = document.getElementById('click-output');
    
    clickBtn.addEventListener('click', function() {
        clickOutput.textContent = "Button was clicked! 🎉";
        clickOutput.style.color = "#27ae60";
        
        // Reset after 2 seconds
        setTimeout(() => {
            clickOutput.textContent = "Waiting for click...";
            clickOutput.style.color = "";
        }, 2000);
    });

    // Hover Event
    const hoverTarget = document.getElementById('hover-target');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverTarget.addEventListener('mouseenter', function() {
        hoverOutput.textContent = "Mouse entered! ✨";
        this.style.fontWeight = 'bold';
    });
    
    hoverTarget.addEventListener('mouseleave', function() {
        hoverOutput.textContent = "Waiting for hover...";
        this.style.fontWeight = '';
    });

    // Keypress Event
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keypress', function(e) {
        keypressOutput.textContent = `Key pressed: ${e.key} (Code: ${e.keyCode})`;
    });

    // Secret Double Click Event
    const secretTarget = document.getElementById('secret-target');
    const secretOutput = document.getElementById('secret-output');
    
    secretTarget.addEventListener('dblclick', function() {
        secretOutput.textContent = "🎁 You found the secret! Here's a cookie: 🍪";
        this.style.backgroundColor = "#ffe6ff";
        
        // Add confetti effect
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.textContent = ['🎉', '✨', '🌟', '🎊'][Math.floor(Math.random() * 4)];
                confetti.style.position = 'absolute';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-30px';
                confetti.style.fontSize = (20 + Math.random() * 20) + 'px';
                confetti.style.animation = `fall ${2 + Math.random() * 3}s linear forwards`;
                document.body.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => confetti.remove(), 3000);
            }, i * 100);
        }
    });

    // ========== Interactive Elements ========== //

    // Color Changer
    const colorBtn = document.getElementById('color-btn');
    const colorTarget = document.getElementById('color-target');
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6'];
    
    colorBtn.addEventListener('click', function() {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        colorTarget.style.backgroundColor = randomColor;
    });

    // Image Gallery
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });

    // Auto-advance gallery every 5 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }, 5000);

    // Accordion
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            const plusSign = this.querySelector('span');
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                plusSign.textContent = '+';
            } else {
                // Close other open accordion items
                document.querySelectorAll('.accordion-content').forEach(item => {
                    item.classList.remove('active');
                    item.previousElementSibling.querySelector('span').textContent = '+';
                });
                
                content.classList.add('active');
                plusSign.textContent = '−';
            }
        });
    });

    // ========== Form Validation ========== //

    const form = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const lengthRule = document.getElementById('length-rule');
    const numberRule = document.getElementById('number-rule');
    const specialRule = document.getElementById('special-rule');

    // Real-time password validation
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        
        // Check length
        if (password.length >= 8) {
            lengthRule.classList.add('valid');
        } else {
            lengthRule.classList.remove('valid');
        }
        
        // Check for number
        if (/\d/.test(password)) {
            numberRule.classList.add('valid');
        } else {
            numberRule.classList.remove('valid');
        }
        
        // Check for special character
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            specialRule.classList.add('valid');
        } else {
            specialRule.classList.remove('valid');
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Name validation
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }
        
        // Password validation
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordError.style.display = 'block';
            isValid = false;
        } else {
            passwordError.style.display = 'none';
        }
        
        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
            document.querySelectorAll('.password-rules li').forEach(li => {
                li.classList.remove('valid');
            });
        }
    });
});

// Confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(calc(100vh + 30px)) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);