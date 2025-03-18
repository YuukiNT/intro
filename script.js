document.addEventListener("DOMContentLoaded", () => {
  const seasons = ["winter", "summer"]; // Tambahkan musim lainnya di sini
  let currentSeasonIndex = 0;
  const backToHomeButton = document.getElementById("back-to-home");
  const backgroundMusic = document.getElementById("background-music");
  let autoChangeTimer;

  document.getElementById("next-season").addEventListener("click", () => {
    const currentSeason = document.getElementById(seasons[currentSeasonIndex]);
    currentSeason.classList.add("hidden");
    document.getElementById(`description-container-${seasons[currentSeasonIndex]}`).classList.add("hidden");

    currentSeasonIndex = (currentSeasonIndex + 1) % seasons.length;
    const nextSeason = document.getElementById(seasons[currentSeasonIndex]);
    nextSeason.classList.remove("hidden");
    document.getElementById(`description-container-${seasons[currentSeasonIndex]}`).classList.remove("hidden");

    updateFunFact(nextSeason.id);
    playMusic(nextSeason.id); // Autoplay musik sesuai musim
  });

  document.getElementById("start-button").addEventListener("click", () => {
    const landingPage = document.getElementById("landing-page");
    const seasonContainer = document.getElementById("season-container");
    const nextSeasonButton = document.getElementById("next-season");

    if (landingPage && seasonContainer && nextSeasonButton) {
      landingPage.classList.add("hidden");
      seasonContainer.classList.remove("hidden");
      nextSeasonButton.classList.remove("hidden");
      backToHomeButton.classList.remove("hidden");

      const firstSeason = seasons[0];
      document.getElementById(`description-container-${firstSeason}`).classList.remove("hidden");
      playMusic(firstSeason); // Autoplay musik musim pertama
      updateFunFact(firstSeason);
      startAutoChangeTimer(); // Mulai timer otomatis
    } else {
      console.error("One or more elements are missing!");
    }
  });

  backToHomeButton.addEventListener("click", () => {
    const landingPage = document.getElementById("landing-page");
    const seasonContainer = document.getElementById("season-container");
    const nextSeasonButton = document.getElementById("next-season");
    const funFactContainer = document.getElementById("fun-fact-container");

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

    // Sembunyikan fakta menarik
    funFactContainer.classList.add("hidden");

    // Reset ke musim pertama
    currentSeasonIndex = 0;
    const firstSeason = document.getElementById(seasons[currentSeasonIndex]);
    if (firstSeason) {
      firstSeason.classList.remove("hidden");
    }

    stopMusic();
    stopAutoChangeTimer(); // Hentikan timer otomatis
  });

  function updateFunFact(season) {
    const funFactContainer = document.getElementById("fun-fact-container");
    const funFactContent = document.getElementById("fun-fact-content");

    if (!funFactContainer || !funFactContent) {
      console.error("Fun fact elements are missing!");
      return;
    }

    switch (season) {
      case "winter":
        funFactContent.textContent = "Tahukah Anda? Kutub Utara mengalami malam yang berlangsung selama 6 bulan di musim dingin!";
        break;
      case "summer":
        funFactContent.textContent = "Tahukah Anda? Suhu tertinggi yang pernah tercatat di bumi adalah 56,7°C di Furnace Creek, California.";
        break;
      // Tambahkan kasus untuk musim lainnya di sini
    }

    funFactContainer.classList.remove("hidden");
  }

  function playMusic(season) {
    const musicMap = {
      winter: "winter.mp3",
      summer: "summer.mp3",
      // Tambahkan musik untuk musim lainnya di sini
    };

    // Hentikan musik sebelumnya
    stopMusic();

    // Putar musik baru
    backgroundMusic.src = musicMap[season] || "";
    backgroundMusic.play();
  }

  function stopMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
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
});
