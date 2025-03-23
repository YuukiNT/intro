document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded successfully."); // Log untuk memastikan script dimuat

  const landingPage = document.getElementById("landing-page");
  const seasonContainer = document.getElementById("season-container");
  const startButton = document.getElementById("start-button");
  const nextSeasonButton = document.getElementById("next-season");
  const backToHomeButton = document.getElementById("back-to-home");
  const funFactContainer = document.getElementById("fun-fact-container");
  const seasons = ["winter", "summer", "gugur", "semi", "rainy"]; // Tambahkan "rainy"
  let currentSeasonIndex = 0;

  // Sembunyikan elemen "Fun Fact" saat halaman dimuat
  if (funFactContainer) {
    funFactContainer.classList.add("hidden");
    console.log("Fun fact container is hidden by default.");
  }

  if (!startButton) {
    console.error("Start button is missing!");
    return;
  }

  console.log("Start button found."); // Log untuk memastikan tombol ditemukan

  // Event listener untuk tombol "Mulai"
  startButton.addEventListener("click", () => {
    console.log("Start button clicked.");
    if (landingPage && seasonContainer && nextSeasonButton) {
      landingPage.classList.add("hidden");
      seasonContainer.classList.remove("hidden");
      nextSeasonButton.classList.remove("hidden");
      backToHomeButton.classList.remove("hidden");

      const firstSeason = seasons[0];
      document.getElementById(`description-container-${firstSeason}`).classList.remove("hidden");
      playMusic(firstSeason); // Autoplay musik musim pertama
      updateFunFact(firstSeason);
    } else {
      console.error("One or more elements are missing!");
    }
  });

  // Fungsi untuk memperbarui fakta menarik
  function updateFunFact(season) {
    const funFactContent = document.getElementById("fun-fact-content");
    const funFactContainer = document.getElementById("fun-fact-container");

    if (!funFactContainer || !funFactContent) {
      console.error("Fun fact elements are missing!");
      return;
    }

    console.log(`Updating fun fact for season: ${season}`); // Debugging log

    // Perbarui konten fakta menarik berdasarkan musim
    switch (season) {
      case "winter":
        funFactContent.textContent = "Tahukah Anda? Kutub Utara mengalami malam yang berlangsung selama 6 bulan di musim dingin!";
        break;
      case "summer":
        funFactContent.textContent = "Tahukah Anda? Suhu tertinggi yang pernah tercatat di bumi adalah 56,7°C di Furnace Creek, California.";
        break;
      case "gugur":
        funFactContent.textContent = "Tahukah Anda? Musim gugur adalah waktu ketika hewan seperti tupai mengumpulkan makanan untuk persiapan musim dingin.";
        break;
      case "semi":
        funFactContent.textContent = "Tahukah Anda? Musim semi adalah waktu ketika bunga sakura bermekaran di Jepang, menarik wisatawan dari seluruh dunia.";
        break;
      case "rainy":
        funFactContent.textContent = "Tahukah Anda? Musim hujan membantu mengisi kembali sumber air, tetapi juga dapat menyebabkan banjir di beberapa wilayah.";
        break;
      default:
        funFactContent.textContent = "Fakta menarik tidak tersedia untuk musim ini.";
    }

    // Tampilkan elemen fakta menarik
    funFactContainer.classList.remove("hidden");
    console.log("Fun fact container is now visible."); // Debugging log
  }

  // Fungsi untuk memutar musik
  function playMusic(season) {
    const backgroundMusic = document.getElementById("background-music");
    const musicMap = {
      winter: "music/winter.mp3",
      summer: "music/summer.mp3",
      gugur: "music/gugur.mp3",
      semi: "music/semi.mp3",
      rainy: "music/rainy.mp3", // Tambahkan musik untuk musim hujan
    };

    if (!backgroundMusic) {
      console.error("Background music element is missing!");
      return;
    }

    backgroundMusic.src = musicMap[season] || "";
    backgroundMusic.play();
  }

  const quizPage = document.getElementById("quiz-page");
  const quizButton = document.getElementById("quiz-button");
  const backToLandingButton = document.getElementById("back-to-landing");
  const quizQuestion = document.getElementById("quiz-question");
  const quizOptions = document.getElementById("quiz-options");

  if (!quizPage || !quizButton || !backToLandingButton || !quizQuestion || !quizOptions) {
    console.error("One or more quiz elements are missing!");
    return;
  }

  console.log("Quiz elements found."); // Log untuk memastikan elemen kuis ditemukan

  const quizQuestions = [
    {
      question: "Musim semi terjadi pada bulan?",
      options: ["Juni - Agustus", "September - November", "Maret - Mei", "Desember - Februari"],
      correct: 2,
    },
    {
      question: "Apa yang menjadi tanda utama datangnya musim gugur?",
      options: ["Hujan turun setiap hari", "Salju mulai turun", "Daun-daun berubah warna dan berguguran", "Matahari bersinar lebih lama"],
      correct: 2,
    },
    {
      question: "Apa yang sering terjadi di musim panas?",
      options: ["Hujan salju", "Suhu tinggi", "Daun berubah warna", "Bunga sakura bermekaran"],
      correct: 1,
    },
    {
      question: "Apa yang sering terjadi di musim semi?",
      options: ["Bunga bermekaran", "Salju turun", "Daun gugur", "Cuaca sangat panas"],
      correct: 0,
    },
    {
      question: "Negara mana yang mengalami empat musim?",
      options: ["Indonesia", "Malaysia", "Singapura", "Jepang"],
      correct: 3,
    },
    {
      question: "Apa yang menjadi penyebab utama terjadinya musim di Bumi?",
      options: ["Perubahan jarak Bumi ke Matahari", "Kemiringan sumbu Bumi saat mengorbit Matahari", "Rotasi Bumi yang semakin cepat", "Pengaruh bulan terhadap Bumi"],
      correct: 1,
    },
  ];

  let currentQuestionIndex = 0; // Indeks pertanyaan saat ini

  // Fungsi untuk menampilkan kuis
  function showQuiz() {
    if (currentQuestionIndex >= quizQuestions.length) {
      alert("Selamat, Anda telah menyelesaikan semua pertanyaan!");
      quizPage.style.display = "none";
      landingPage.classList.remove("hidden");
      currentQuestionIndex = 0; // Reset indeks pertanyaan
      return;
    }

    const quiz = quizQuestions[currentQuestionIndex];
    quizQuestion.textContent = quiz.question;
    quizOptions.innerHTML = ""; // Hapus opsi sebelumnya

    quiz.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.className = "bg-gray-200 px-4 py-2 rounded hover:bg-gray-300";
      button.addEventListener("click", () => {
        if (index === quiz.correct) {
          alert("Selamat, jawaban Anda benar!");
          currentQuestionIndex++; // Lanjutkan ke pertanyaan berikutnya
          showQuiz(); // Tampilkan pertanyaan berikutnya
        } else {
          alert("Jawaban Anda salah, coba lagi!");
        }
      });
      quizOptions.appendChild(button);
    });
  }

  // Event listener untuk tombol "Quiz"
  quizButton.addEventListener("click", () => {
    landingPage.classList.add("hidden");
    quizPage.style.display = "flex";
    currentQuestionIndex = 0; // Reset indeks pertanyaan
    showQuiz();
  });

  // Event listener untuk tombol "Kembali" di halaman kuis
  backToLandingButton.addEventListener("click", () => {
    quizPage.style.display = "none";
    landingPage.classList.remove("hidden");
    currentQuestionIndex = 0; // Reset indeks pertanyaan
  });

  let autoChangeTimer;

  if (!nextSeasonButton) {
    console.error("Next Season button is missing!");
    return;
  }

  console.log("Next Season button found."); // Log untuk memastikan tombol ditemukan

  // Fungsi untuk mengubah musim
  function changeSeason(direction) {
    console.log("Changing season...");
    const currentSeason = document.getElementById(seasons[currentSeasonIndex]);
    currentSeason.classList.add("hidden");
    document.getElementById(`description-container-${seasons[currentSeasonIndex]}`).classList.add("hidden");

    // Hitung indeks musim berikutnya atau sebelumnya
    currentSeasonIndex = (currentSeasonIndex + direction + seasons.length) % seasons.length;

    const nextSeason = document.getElementById(seasons[currentSeasonIndex]);
    nextSeason.classList.remove("hidden");
    document.getElementById(`description-container-${seasons[currentSeasonIndex]}`).classList.remove("hidden");

    updateFunFact(nextSeason.id); // Perbarui fakta menarik
    playMusic(nextSeason.id); // Autoplay musik sesuai musim
  }

  // Event listener untuk tombol "Next Season"
  nextSeasonButton.addEventListener("click", () => {
    console.log("Next Season button clicked.");
    changeSeason(1);
  });

  backToHomeButton.addEventListener("click", () => {
    // Reset semua elemen ke keadaan awal
    landingPage.classList.remove("hidden");
    seasonContainer.classList.add("hidden");
    nextSeasonButton.classList.add("hidden");
    backToHomeButton.classList.add("hidden");

    // Sembunyikan semua musim
    seasons.forEach((season) => {
      document.getElementById(season).classList.add("hidden");
      document.getElementById(`description-container-${season}`).classList.add("hidden");
    });

    // Reset ke musim pertama
    currentSeasonIndex = 0;
    const firstSeason = document.getElementById(seasons[currentSeasonIndex]);
    if (firstSeason) {
      firstSeason.classList.remove("hidden");
    }

    stopMusic();
    stopAutoChangeTimer(); // Hentikan timer otomatis
    funFactContainer.classList.add("hidden"); // Sembunyikan fakta menarik
  });

  function stopMusic() {
    const backgroundMusic = document.getElementById("background-music");
    if (backgroundMusic) {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    }
  }

  function startAutoChangeTimer() {
    autoChangeTimer = setInterval(() => {
      document.getElementById("next-season").click();
    }, 10000); // Ganti musim setiap 10 detik
  }

  function stopAutoChangeTimer() {
    clearInterval(autoChangeTimer);
  }

  document.getElementById("toggle-theme").addEventListener("click", () => {
    const body = document.body;
    const themeButton = document.getElementById("toggle-theme");

    // Toggle antara mode gelap dan terang
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      body.classList.add("light");
      themeButton.textContent = "Mode Gelap";
    } else {
      body.classList.remove("light");
      body.classList.add("dark");
      themeButton.textContent = "Mode Terang";
    }
  });

  // Set mode default ke terang
  document.body.classList.add("light");

  const teamSection = document.getElementById("team-section");
  const showTeamButton = document.getElementById("show-team-button");
  const hideTeamButton = document.getElementById("hide-team-button");

  // Event listener untuk tombol "Tampilkan Anggota"
  showTeamButton.addEventListener("click", () => {
    if (teamSection.classList.contains("hidden")) {
      teamSection.classList.remove("hidden");
      showTeamButton.textContent = "Sembunyikan Anggota";
    } else {
      teamSection.classList.add("hidden");
      showTeamButton.textContent = "Tampilkan Anggota";
    }
  });

  if (hideTeamButton) {
    hideTeamButton.addEventListener("click", () => {
      teamSection.classList.add("hidden");
      showTeamButton.textContent = "Tampilkan Anggota";
    });
  }

  let touchStartX = 0; // Posisi awal sentuhan
  let touchEndX = 0; // Posisi akhir sentuhan

  // Fungsi untuk mendeteksi swipe
  function handleSwipe() {
    const swipeThreshold = 50; // Jarak minimum untuk mendeteksi swipe
    if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe ke kanan (musim sebelumnya)
      console.log("Swipe detected: right");
      changeSeason(-1);
    } else if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe ke kiri (musim berikutnya)
      console.log("Swipe detected: left");
      changeSeason(1);
    }
  }

  // Tambahkan event listener untuk swipe gesture
  seasonContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX; // Simpan posisi awal sentuhan
  });

  seasonContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX; // Simpan posisi akhir sentuhan
    handleSwipe(); // Panggil fungsi untuk mendeteksi swipe
  });
});
