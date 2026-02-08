// Set the date we're counting down to
const weddingDate = new Date("Feb 28, 2026 08:00:00").getTime();

// Countdown Timer
const countdownTimer = setInterval(function () {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById("countdown");
    if (countdownElement) {
        countdownElement.innerHTML = `
            <div class="countdown-item"><span>${days}</span><label>Hari</label></div>
            <div class="countdown-item"><span>${hours}</span><label>Jam</label></div>
            <div class="countdown-item"><span>${minutes}</span><label>Menit</label></div>
            <div class="countdown-item"><span>${seconds}</span><label>Detik</label></div>
        `;
    }

    if (distance < 0) {
        clearInterval(countdownTimer);
        countdownElement.innerHTML = "<h3>The Wedding Day Has Passed</h3>";
    }
}, 1000);

// Music Player
const musicControl = document.getElementById('toggle-music');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

musicControl.addEventListener('click', function () {
    if (isPlaying) {
        bgMusic.pause();
        musicControl.innerHTML = '<i class="fas fa-play"></i>';
        musicControl.classList.remove('playing');
    } else {
        bgMusic.play();
        musicControl.innerHTML = '<i class="fas fa-pause"></i>';
        musicControl.classList.add('playing');
    }
    isPlaying = !isPlaying;
});

// Try to autoplay (might be blocked by browser)
window.addEventListener('click', function () {
    if (!isPlaying && bgMusic.paused) {
        // Optionally prompt user or just let the first click start it?
        // We'll leave it to the manual button for better UX, or start on first interaction if desired.
        // For now, let's stick to the button.
    }
}, { once: true });


// Copy to Clipboard
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(function () {
        alert('Nomor rekening berhasil disalin: ' + text);
    }, function (err) {
        console.error('Could not copy text: ', err);
    });
}

// Scroll Animation (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up, .fade-in').forEach((el) => {
    observer.observe(el);
});

// Wishes Form Handling (Simulated)
const wishesForm = document.getElementById('wishes-form');
const wishesList = document.getElementById('wishes-list');

// Load wishes from local storage
const savedWishes = JSON.parse(localStorage.getItem('weddingWishes')) || [
    { name: "Dewi & Budi", message: "Selamat menempuh hidup baru! Semoga rukun selalu.", attendance: "Hadir", date: new Date().toLocaleDateString() },
    { name: "Siti", message: "Baarakallahu laka wa baarakaa alaika wa jamaa bainakumaa fii khoir.", attendance: "Masih Ragu", date: new Date().toLocaleDateString() }
];

function renderWishes() {
    wishesList.innerHTML = '';
    savedWishes.forEach(wish => {
        const li = document.createElement('li');
        li.className = 'wish-item';

        let attendanceClass = '';
        if (wish.attendance === 'Hadir') attendanceClass = 'hadir';
        else if (wish.attendance === 'Tidak Hadir') attendanceClass = 'tidak';

        li.innerHTML = `
            <div class="wish-header">
                <span class="wish-name">${wish.name}</span>
                <span class="wish-attendance ${attendanceClass}">${wish.attendance}</span>
            </div>
            <p>${wish.message}</p>
            <span class="wish-date">${wish.date}</span>
        `;
        wishesList.prepend(li);
    });
}

// Initial Render
renderWishes();

wishesForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('sender-name').value;
    const message = document.getElementById('sender-message').value;
    const attendance = document.getElementById('attendance').value;

    if (name && message) {
        const newWish = {
            name: name,
            message: message,
            attendance: attendance,
            date: new Date().toLocaleDateString()
        };

        savedWishes.push(newWish);
        localStorage.setItem('weddingWishes', JSON.stringify(savedWishes));

        renderWishes();
        wishesForm.reset();
        alert('Terima kasih atas ucapan dan doa Anda!');
    }
});
