document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Animated counter
    const counters = document.querySelectorAll('.stat-item__value');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Start counter animation when scrolled to stats section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.hero__animation');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Calculator functionality
    const messageCount = document.getElementById('message-count');
    const currentCount = document.getElementById('current-count');
    const resultCount = document.getElementById('result-count');
    const totalPrice = document.getElementById('total-price');
    const pricePerSms = document.getElementById('price-per-sms');
    const economy = document.getElementById('economy');
    const messageType = document.getElementById('message-type');
    const country = document.getElementById('country');
    
    function calculatePrice() {
        const count = parseInt(messageCount.value);
        let price = 1.5; // Base price
        
        // Adjust price based on message type
        if (messageType.value === 'flash') price = 1.3;
        else if (messageType.value === 'unicode') price = 1.8;
        else if (messageType.value === 'viber') price = 2.0;
        
        // Adjust price based on country
        if (country.value === 'kz') price *= 1.2;
        else if (country.value === 'by') price *= 1.1;
        else if (country.value === 'world') price *= 1.5;
        
        // Volume discount
        let discount = 0;
        if (count >= 5000) discount = 0.1;
        if (count >= 10000) discount = 0.15;
        if (count >= 50000) discount = 0.2;
        
        const finalPrice = price * (1 - discount) * count;
        
        // Update UI
        currentCount.textContent = count.toLocaleString();
        resultCount.textContent = count.toLocaleString() + ' SMS';
        pricePerSms.textContent = (price * (1 - discount)).toFixed(2) + ' ₽';
        totalPrice.textContent = Math.round(finalPrice).toLocaleString();
        economy.textContent = (discount * 100) + '%';
    }
    
    messageCount.addEventListener('input', calculatePrice);
    messageType.addEventListener('change', calculatePrice);
    country.addEventListener('change', calculatePrice);
    
    // Initialize calculator
    calculatePrice();
    
    // Charts
    const openRateCtx = document.getElementById('openRateChart').getContext('2d');
    const responseTimeCtx = document.getElementById('responseTimeChart').getContext('2d');
    const conversionCtx = document.getElementById('conversionChart').getContext('2d');
    
    // Open Rate Chart
    new Chart(openRateCtx, {
        type: 'bar',
        data: {
            labels: ['Email', 'SMS', 'Push', 'Соцсети'],
            datasets: [{
                label: 'Процент открытия',
                data: [20, 98, 45, 30],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(139, 92, 246, 0.7)'
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(139, 92, 246, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Response Time Chart
    new Chart(responseTimeCtx, {
        type: 'line',
        data: {
            labels: ['0', '1 мин', '5 мин', '15 мин', '30 мин', '1 час', '1 день'],
            datasets: [{
                label: 'Прочитано сообщений',
                data: [0, 90, 95, 97, 98, 99, 100],
                fill: true,
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                borderColor: 'rgba(79, 70, 229, 1)',
                tension: 0.4,
                pointBackgroundColor: 'rgba(79, 70, 229, 1)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Conversion Chart
    new Chart(conversionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Перешли по ссылке', 'Совершили покупку', 'Не отреагировали'],
            datasets: [{
                data: [35, 15, 50],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(239, 68, 68, 0.7)'
                ],
                borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            cutout: '70%'
        }
    });
    
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    burger.classList.remove('active');
                    nav.classList.remove('active');
                }
            }
        });
    });
});
