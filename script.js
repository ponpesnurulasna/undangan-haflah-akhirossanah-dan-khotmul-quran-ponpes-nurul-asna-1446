// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Door Animation
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('open-btn');
    
    if (button) {
        // Klik tombol buka pintu untuk membuka pintu
        button.onclick = function(e) {
            e.preventDefault();
            
            const leftDoor = document.querySelector('.door.left');
            const rightDoor = document.querySelector('.door.right');
            const coverContent = document.querySelector('.cover-content');

            // Sembunyikan konten cover
            coverContent.classList.add('hidden');
            // Buka pintu
            leftDoor.classList.add('opened');
            rightDoor.classList.add('opened');

            // Tunggu 800ms lalu pindah ke halaman berikutnya
            setTimeout(() => {
                window.location.href = 'main_pembuka.html';
            }, 800);
        };
    }
});

// Countdown Timer
function startCountdown() {
    // Tanggal dan waktu acara
    const countDownDate = new Date("Feb 18, 2025 16:00:00").getTime();

    // Buat interval untuk mengupdate waktu hitung mundur setiap 1 detik
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Format waktu hitung mundur dengan menambahkan nol di depan
        const formatNumber = (num) => String(num).padStart(2, '0');

        // Update nilai waktu hitung mundur dengan animasi
        updateCountdownValue('days', formatNumber(days));
        updateCountdownValue('hours', formatNumber(hours));
        updateCountdownValue('minutes', formatNumber(minutes));
        updateCountdownValue('seconds', formatNumber(seconds));

        // Jika waktu hitung mundur sudah habis, hapus interval dan tampilkan pesan
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "<div class='expired-message'>Acara telah dimulai</div>";
        }
    }, 1000);
}

// Fungsi untuk mengupdate nilai waktu hitung mundur dengan animasi
function updateCountdownValue(id, value) {
    const element = document.getElementById(id);
    if (element && element.textContent !== value) {
        element.style.transform = 'translateY(-20px)';
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.textContent = value;
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, 300);
    }
}

// Mulai countdown ketika halaman selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('countdown')) {
        startCountdown();
    }
});

// Kontrol musik latar belakang
const audioPlayer = document.getElementById('background-music');
const toggleButton = document.getElementById('toggle-audio');
let isPlaying = false;

if (toggleButton && audioPlayer) {
    // Klik tombol untuk memutar atau menghentikan musik latar belakang
    toggleButton.addEventListener('click', function() {
        if (isPlaying) {
            audioPlayer.pause();
            toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            audioPlayer.play();
            toggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        isPlaying = !isPlaying;
    });
}

// Fungsi untuk membagikan undangan ke WhatsApp
function shareToWhatsApp() {
    const text = encodeURIComponent("Undangan Haflah Akhirossanah & Khotmil Qur'an ke-11 Pondok Pesantren Nurul Asna");
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
}
