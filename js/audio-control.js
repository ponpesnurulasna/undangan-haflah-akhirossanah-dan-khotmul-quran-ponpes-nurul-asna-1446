document.addEventListener('DOMContentLoaded', function() {
    const audioButton = document.getElementById('audioButton');
    const bgMusic = document.getElementById('bgMusic');

    if (audioButton && bgMusic) {
        // Set properti audio
        bgMusic.loop = true;
        bgMusic.volume = 1.0;

        // Reset currentTime dan hapus localStorage saat halaman dimuat
        bgMusic.currentTime = 0;
        localStorage.removeItem('musicTime');
        localStorage.removeItem('musicPlaying');

        // Set initial icon
        audioButton.innerHTML = `
            <div class="icon-wrapper">
                <i class="fas fa-music music-icon"></i>
                <i class="fas fa-play play-icon"></i>
            </div>
        `;

        // Fungsi untuk memulai musik
        function playMusic() {
            bgMusic.play()
                .then(() => {
                    audioButton.classList.add('playing');
                    audioButton.innerHTML = `
                        <div class="icon-wrapper">
                            <i class="fas fa-music music-icon"></i>
                            <i class="fas fa-pause pause-icon"></i>
                        </div>
                    `;
                    localStorage.setItem('musicPlaying', 'true');
                })
                .catch((error) => {
                    console.log("Playback failed:", error);
                });
        }

        // Fungsi untuk menghentikan musik
        function pauseMusic() {
            bgMusic.pause();
            audioButton.classList.remove('playing');
            audioButton.innerHTML = `
                <div class="icon-wrapper">
                    <i class="fas fa-music music-icon"></i>
                    <i class="fas fa-play play-icon"></i>
                </div>
            `;
            localStorage.setItem('musicPlaying', 'false');
        }

        // Event listener untuk tombol audio
        audioButton.addEventListener('click', function() {
            if (bgMusic.paused) {
                playMusic();
            } else {
                pauseMusic();
            }
        });

        // Event listener untuk saat pengguna meninggalkan halaman
        window.addEventListener('beforeunload', function() {
            pauseMusic();
            localStorage.removeItem('musicTime');
            localStorage.removeItem('musicPlaying');
        });

        // Autoplay musik saat halaman dimuat
        const attemptAutoplay = async () => {
            try {
                await bgMusic.play();
                audioButton.classList.add('playing');
                audioButton.innerHTML = `
                    <div class="icon-wrapper">
                        <i class="fas fa-music music-icon"></i>
                        <i class="fas fa-pause pause-icon"></i>
                    </div>
                `;
                localStorage.setItem('musicPlaying', 'true');
            } catch (error) {
                console.log("Autoplay prevented:", error);
                audioButton.classList.add('attention');
                setTimeout(() => audioButton.classList.remove('attention'), 2000);
            }
        };

        // Jalankan autoplay
        attemptAutoplay();
    }
});
