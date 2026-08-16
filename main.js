let clearTimer = null;
let asterismHideTimer = null;
let astronomyLabelTimer = null;
let natureLabelTimer = null;
let projectsLabelTimer = null;
let modalImageToken = 0;
let resizeTimer = null;
let hdPicTitleTimer = null;
let isMusicUnlocked = false;
let toggleOutlineTimer = null;

const universe = document.getElementById('universe');
const phaseContent = document.getElementById('phase-content');
const edgeLight = document.getElementById('edge-light');
const carouselViewport = document.querySelector('.carousel-viewport');
const musicDisplayArea = document.getElementById('music-display-area');
const exitBtn = document.getElementById('exit-button');


// ASTRONOMY CAROUSEL LOGIC
const track = document.getElementById('astro-track');
const slides = Array.from(document.querySelectorAll('.carousel-item'));
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const astroContent = document.getElementById('content-astronomy');

// Modal Elements
const hdModal = document.getElementById('hd-modal');
const hdImage = document.getElementById('hd-image-display');
const closeModal = document.getElementById('close-modal');
const hdPicTitle = document.getElementById('hd-pic-title');

const hdImageStage = document.getElementById('hd-image-stage');
const hdAnnotateToggle = document.getElementById('hd-annotate-toggle');
const annotationGroups = Array.from(document.querySelectorAll('.annotation-group'));
const annotationLayer = document.getElementById('hd-annotation-layer');


document.addEventListener('click', (e) => {
    const clickedPlanet = e.target.closest('.planet');
    const clickedExit = e.target.closest('#exit-button');
    const clickedPanelContent = e.target.closest('.panel-content');

    // ACTION 1: REVERT
    if (clickedExit) {
        
        astroContent.classList.remove('show-content');
        
        document.querySelectorAll('#content-music iframe').forEach(iframe => {
            const currentSrc = iframe.getAttribute('src');
            if (currentSrc) iframe.setAttribute('src', currentSrc);
        });
        
        const pwdInput = document.getElementById('music-password-input');
        
        if (pwdInput) {
            pwdInput.value = '';
            pwdInput.placeholder = '';
        }

        document.getElementById('content-music-password').classList.remove('show-content');
        const contentMusic = document.getElementById('content-music');
        if(contentMusic) contentMusic.classList.remove('show-content');
        
        const contentNature = document.getElementById('content-nature');
        if(contentNature) contentNature.classList.remove('show-content');

        const contentProjects = document.getElementById('content-projects');
        if(contentProjects) contentProjects.classList.remove('show-content');

        const natureGrid = document.getElementById('nature-grid');
        if (natureGrid) {
            natureGrid.classList.remove('grid-enter');
            natureGrid.classList.add('grid-exit');
        }
    
        const natureDisplay = document.getElementById('nature-display-area');
        if (natureDisplay) {
            setTimeout(() => { natureDisplay.scrollTop = 0; }, 800); 
        }

        if (typeof currentMusicView !== 'undefined' && currentMusicView !== 'songs') {
            setTimeout(() => {
                currentMusicView = 'songs';
                const toggleBtn = document.getElementById('music-toggle-btn');
                if (toggleBtn) toggleBtn.textContent = 'SONGS';
            
                const aGrid = document.getElementById('artists-grid');
                const sGrid = document.getElementById('songs-grid');
                if (aGrid) {
                    aGrid.classList.add('hidden');
                    aGrid.classList.remove('grid-exit', 'grid-enter');
                }
                if (sGrid) sGrid.classList.remove('hidden');

                const topQ = document.getElementById('artist-top-quote');
                const botQ = document.getElementById('artist-bottom-quote');
                if (topQ) topQ.classList.add('hidden');
                if (botQ) botQ.classList.add('hidden');
            }, 800);
        }

        const musicDisplay = document.getElementById('music-display-area');
        if (musicDisplay) {
            musicDisplay.style.overflowY = 'hidden';
            setTimeout(() => {
                musicDisplay.scrollTop = 0;
            }, 800);
        }

        if (typeof currentSongSlideIndex !== 'undefined') {
            const songSlides = Array.from(document.querySelectorAll('#songs-grid .song-slide'));
            songSlides.forEach((slide, i) => {
                slide.classList.remove('active-slide', 'passed-slide', 'visited-slide', 'fade-out-up', 'fade-out-down');
                if (i === 0) slide.classList.add('active-slide');
            });
            currentSongSlideIndex = 0;
        }
        
        edgeLight.classList.remove('pulse-astronomy', 'pulse-music','pulse-nature', 'pulse-projects' );
        
        clearTimeout(astronomyLabelTimer);
        const astroLabel = document.getElementById('astronomy-label');
        if (astroLabel) astroLabel.classList.remove('visible');
        clearTimeout(natureLabelTimer);
        const natLabel = document.getElementById('nature-label');
        if (natLabel) natLabel.classList.remove('visible');
        clearTimeout(projectsLabelTimer);
        const projLabel = document.getElementById('projects-label');
        if (projLabel) projLabel.classList.remove('visible');
        phaseContent.classList.remove('visible-ui');
        phaseContent.classList.add('hidden-ui');

        setTimeout(() => {
            universe.classList.remove('fade-out-element');
        }, 800); 
        return;
    }

    if (clickedPanelContent) {
        const activePlanet = clickedPanelContent.closest('.planet');
        if (!activePlanet) return;

        const planetId = activePlanet.id.split('-')[1];

        universe.classList.add('fade-out-element');

        setTimeout(() => {
            phaseContent.classList.remove('hidden-ui');
            phaseContent.classList.add('visible-ui');

            if (planetId === '1') {
                astroContent.classList.add('show-content');
                updateCarousel();
                clearTimeout(astronomyLabelTimer);
                astronomyLabelTimer = setTimeout(() => {
                    document.getElementById('astronomy-label').classList.add('visible');
                }, 300);

                edgeLight.classList.remove('pulse-astronomy');
                void edgeLight.offsetWidth;
                edgeLight.classList.add('pulse-astronomy');
            }

            if (planetId === '2') {
                if (isMusicUnlocked) {

                    const contentMusic = document.getElementById('content-music');
                    if(contentMusic) contentMusic.classList.add('show-content');

                    edgeLight.classList.remove('pulse-astronomy', 'pulse-music');
                    void edgeLight.offsetWidth;
                    edgeLight.classList.add('pulse-music');

                    setTimeout(() => {
                        wakeUpToggleOutline();
                    }, 1000);

                } else {
                    document.getElementById('content-music-password').classList.add('show-content');
                    setTimeout(() => {
                        document.getElementById('music-password-input').focus();
                    }, 400);
                }    
                
            }

            if (planetId === '3') {

                document.getElementById('content-nature').classList.add('show-content');

                const natureGrid = document.getElementById('nature-grid');
                if (natureGrid) {
                    natureGrid.classList.remove('grid-exit');
                    natureGrid.classList.add('grid-enter');
                }

                edgeLight.classList.remove('pulse-astronomy', 'pulse-music', 'pulse-nature');
                void edgeLight.offsetWidth;
                edgeLight.classList.add('pulse-nature');

                clearTimeout(natureLabelTimer);
                natureLabelTimer = setTimeout(() => {
                    document.getElementById('nature-label').classList.add('visible');
                }, 300);
                
            }
            
            if (planetId === '4') {
                
                const contentProjects = document.getElementById('content-projects');
                if (contentProjects) contentProjects.classList.add('show-content');
                
                edgeLight.classList.remove('pulse-astronomy', 'pulse-music', 'pulse-nature', 'pulse-projects');
                void edgeLight.offsetWidth;
                edgeLight.classList.add('pulse-projects');      
                
                clearTimeout(projectsLabelTimer);
                projectsLabelTimer = setTimeout(() => {
                    document.getElementById('projects-label').classList.add('visible');
                }, 300);
                
            }

        }, 1000);
        return;
    }

    if (phaseContent.classList.contains('visible-ui')) return;
    if (universe.classList.contains('fade-out-element')) return;

    if (!clickedPlanet) {
        document.querySelectorAll('.planet').forEach(p => p.classList.remove('active'));
    } else {

        document.querySelectorAll('.planet').forEach(p => {
            if (p !== clickedPlanet) p.classList.remove('active');
        });
        clickedPlanet.classList.toggle('active');
    }
});

const hdDrawToggle = document.getElementById('hd-draw-toggle');
const asterismGroups = {
    0: document.getElementById('orion-asterism'),
    1: document.getElementById('taurus-asterism'),
    4: document.getElementById('scorpius-asterism')
}
const asterismLines = Array.from(document.querySelectorAll('.asterism-line'));

function syncHdAnnotationLayer() {
    if (!hdImage.naturalWidth || !hdImage.naturalHeight) return;

    const computedStyle = window.getComputedStyle(hdImage);
    const viewportW = parseFloat(computedStyle.maxWidth) || (window.innerWidth * 0.9);
    const viewportH = parseFloat(computedStyle.maxHeight) || (window.innerHeight * 0.9);

    const imageRatio = hdImage.naturalWidth / hdImage.naturalHeight;
    const viewportRatio = viewportW / viewportH;

    let renderW, renderH;

    if (imageRatio > viewportRatio) {
        renderW = viewportW;
        renderH = renderW / imageRatio;
    } else {
        renderH = viewportH;
        renderW = renderH * imageRatio;
    }

    hdImageStage.style.width = `${renderW}px`;
    hdImageStage.style.height = `${renderH}px`;
}

function setupAsterismLengths() {
    asterismLines.forEach(line => {
        const length = line.getTotalLength();
        line.style.setProperty('--line-length', length);
    });
}

setupAsterismLengths();

function openAllAnnotations() {
    hdModal.classList.add('guide-active', 'show-all');
    hdAnnotateToggle.classList.add('active');
    annotationGroups.forEach(group => group.classList.remove('is-open'));
}

function collapseToDotsOnly() {
    hdModal.classList.add('guide-active');
    hdModal.classList.remove('show-all');
    hdAnnotateToggle.classList.add('active');
    annotationGroups.forEach(group => group.classList.remove('is-open'));
}

function closeAllAnnotations() {
    hdModal.classList.remove('guide-active', 'show-all');
    hdAnnotateToggle.classList.remove('active');
    annotationGroups.forEach(group => group.classList.remove('is-open'));
}

function openAsterism() {
    clearTimeout(asterismHideTimer);
    const activeGroup = asterismGroups[currentIndex];
    if (!activeGroup) return;
    hdModal.classList.add('draw-active');
    activeGroup.classList.remove('is-hiding');
    void activeGroup.offsetWidth;
    activeGroup.classList.add('is-visible');
    hdDrawToggle.classList.add('active');
}

function closeAsterism() {
    clearTimeout(asterismHideTimer);
    const activeGroup = asterismGroups[currentIndex];
    if (!activeGroup) return;
    hdModal.classList.remove('draw-active');
    hdModal.classList.add('erase-active');
    activeGroup.classList.add('is-hiding');
    hdDrawToggle.classList.remove('active');

    asterismHideTimer = setTimeout(() => {
        activeGroup.classList.remove('is-visible', 'is-hiding');
    }, 650);
}

function showHdPicTitle(text) {
    clearTimeout(hdPicTitleTimer);

    hdPicTitle.style.transition = 'none';
    hdPicTitle.classList.remove('visible');
    hdPicTitle.textContent = text;

    void hdPicTitle.offsetWidth;
    hdPicTitle.style.transition = '';
    hdPicTitle.classList.add('visible');
}

function resetHdModalState() {
    clearTimeout(asterismHideTimer);
    resetNatureZoom();

    closeAllAnnotations();
    hdAnnotateToggle.classList.remove('ready', 'active');
    hdAnnotateToggle.textContent = 'Explore';

    hdModal.classList.remove('draw-active');
    Object.values(asterismGroups).forEach(group => {
    if (group) group.classList.remove('is-visible', 'is-hiding');
    });
    hdDrawToggle.classList.remove('ready', 'active');
}

let currentIndex = 0;

function updateCarousel() {
    slides.forEach(slide => slide.classList.remove('active-slide'));
    const activeSlide = slides[currentIndex];
    activeSlide.classList.add('active-slide');
    
    const slideCenter = activeSlide.offsetLeft + activeSlide.offsetWidth / 2;
    const viewportCenter = carouselViewport.offsetWidth / 2;
    const offset = slideCenter - viewportCenter;

    track.style.transform = `translateX(-${offset}px)`;
}

rightArrow.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Swipe Gestures
let swipeStartX = 0;
let swipeStartY = 0;
let isSwiping = false;

carouselViewport.addEventListener('pointerdown', (e) => {
    swipeStartX = e.clientX;
    swipeStartY = e.clientY;
    isSwiping = true;
});

carouselViewport.addEventListener('pointermove', (e) => {
    if (!isSwiping) return;
    const dx = Math.abs(e.clientX - swipeStartX);
    const dy = Math.abs(e.clientY - swipeStartY);
    if (dx > dy && dx > 8) e.preventDefault();
}, { passive: false });

carouselViewport.addEventListener('pointerup', (e) => {
    if (!isSwiping) return;
    isSwiping = false;

    const deltaX = e.clientX - swipeStartX;
    const deltaY = e.clientY - swipeStartY;

    if (Math.abs(deltaX) < 40 || Math.abs(deltaY) > Math.abs(deltaX)) return;

    if (deltaX < 0 && currentIndex < slides.length - 1) {
        currentIndex++;
        updateCarousel();
    } else if (deltaX > 0 && currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

carouselViewport.addEventListener('pointercancel', () => {
    isSwiping = false;
});

slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
        if (index === currentIndex) {
            const hdSrc = slide.getAttribute('data-hd');
            if (!hdSrc) return;
            modalImageToken++;
            const thisLoadToken = modalImageToken;
            clearTimeout(clearTimer);
            hdImage.style.opacity = "0";
            hdImage.src = hdSrc;
            resetHdModalState();
            hdModal.classList.remove('image-1-active', 'image-2-active', 'image-3-active', 'image-4-active', 'image-5-active');
            if (index === 0) {
                annotationLayer.setAttribute('viewBox', '0 0 2160 1436');
            }
            
            if (index === 1) {
                annotationLayer.setAttribute('viewBox', '0 0 2160 1599');
            }

            if (index === 3) {
                annotationLayer.setAttribute('viewBox', '0 0 2944 2944');
            }

            if (index === 4) {
                annotationLayer.setAttribute('viewBox', '0 0 2160 2500');
            }
            
            hdModal.classList.add(`image-${index + 1}-active`);
            hdModal.classList.add('show-modal');
            hdImage.onload = () => {

                if (thisLoadToken !== modalImageToken) return;
                if (!hdModal.classList.contains('show-modal')) return;
                
                hdImage.style.opacity = "1";
                syncHdAnnotationLayer();

                const picTitles = ['Orion', 'Taurus', 'Trio', 'Star Map', 'Scorpius'];
                showHdPicTitle(picTitles[index]);

                if (index === 0) {
                    hdAnnotateToggle.classList.add('ready');
                    hdDrawToggle.classList.add('ready');
                }

                if (index === 1) {
                    hdAnnotateToggle.classList.add('ready');
                    hdDrawToggle.classList.add('ready');
                }

                if (index === 3) {
                    hdAnnotateToggle.classList.add('ready');
                    hdDrawToggle.classList.add('ready');
                }

                if (index === 4) {
                    hdAnnotateToggle.classList.add('ready');
                    hdDrawToggle.classList.add('ready');
                }

            };
            
        } else {
            currentIndex = index;
            updateCarousel();
        }
    });
});

// NATURE HD MODAL LOGIC
const natureItems = document.querySelectorAll('.nature-item');

natureItems.forEach((item) => {
    item.addEventListener('click', () => {
        const hdSrc = item.getAttribute('data-hd');
        if (!hdSrc) return;

        modalImageToken++;
        const thisLoadToken = modalImageToken;
        clearTimeout(clearTimer);
        
        hdImage.style.opacity = "0";
        hdImage.src = hdSrc; 
        
        resetHdModalState(); 
        hdModal.classList.remove('image-1-active', 'image-2-active', 'image-3-active', 'image-4-active');
        
        hdAnnotateToggle.classList.remove('ready', 'active');
        hdDrawToggle.classList.remove('ready', 'active');

        hdModal.classList.add('show-modal');

        hdImage.onload = () => {
            if (thisLoadToken !== modalImageToken) return;
            if (!hdModal.classList.contains('show-modal')) return;
            
            hdImage.style.opacity = "1";
            
            const imgEl = item.querySelector('img');
            const titleText = imgEl ? imgEl.getAttribute('alt') : 'Nature';
            showHdPicTitle(titleText);
        };
    });
});

// Close HD Modal
closeModal.addEventListener('click', () => {
    resetNatureZoom();
    clearTimeout(hdPicTitleTimer);
    hdPicTitle.classList.remove('visible');
    modalImageToken++;
    resetHdModalState();
    hdModal.classList.remove('show-modal');
    hdModal.classList.remove('image-1-active', 'image-2-active', 'image-3-active', 'image-4-active', 'image-5-active');
    clearTimer = setTimeout(() => {
        hdImage.src = "";
        hdImageStage.style.width = '';
        hdImageStage.style.height = '';
    }, 500);
});

hdImageStage.addEventListener('click', (e) => {
    if (!hdModal.classList.contains('guide-active')) return;

    const clickedDot = e.target.closest('.annotation-dot');
    const clickedToggle = e.target.closest('#hd-annotate-toggle');
    const clickedDraw = e.target.closest('#hd-draw-toggle');
    const clickedClose = e.target.closest('#close-modal');

    if (clickedDot || clickedToggle || clickedDraw || clickedClose) return;

    collapseToDotsOnly();
});

annotationGroups.forEach(group => {
    const dot = group.querySelector('.annotation-dot');

    if (!dot) return;

    dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!hdModal.classList.contains('guide-active')) return;

        hdModal.classList.remove('show-all');
        group.classList.toggle('is-open');
    });
});

hdAnnotateToggle.addEventListener('click', (e) => {
    e.stopPropagation();

    if (!hdAnnotateToggle.classList.contains('ready')) return;

    if (!hdModal.classList.contains('guide-active')) {
        openAllAnnotations();
    } else {
        closeAllAnnotations();
    }
});

hdDrawToggle.addEventListener('click', (e) => {
    e.stopPropagation();

    if (!hdDrawToggle.classList.contains('ready')) return;

    const activeGroup = asterismGroups[currentIndex];
    if (!activeGroup) return;

    if (!activeGroup.classList.contains('is-visible')) {
        openAsterism();
    } else {
        closeAsterism();
    }
});

window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    
    resizeTimer = setTimeout(() => {
        updateCarousel();

        if (hdModal.classList.contains('show-modal')) {
            syncHdAnnotationLayer();
        }
    }, 80);
});

let loadedArtistCount = 0;
let artistObserver = null;

function getBatchSizes() {
    const width = window.innerWidth;
    if (width > 900) return { initial: 6, scroll: 6 };
    if (width > 480) return { initial: 4, scroll: 4 };
    return { initial: 3, scroll: 2 };
}

function loadArtistIframes(isInitial = false) {
    const allArtistIframes = Array.from(document.querySelectorAll('#artists-grid iframe'));
    if (loadedArtistCount >= allArtistIframes.length) return;

    const sizes = getBatchSizes();
    const batchSize = isInitial ? sizes.initial : sizes.scroll;
    const limit = Math.min(loadedArtistCount + batchSize, allArtistIframes.length);

    for (let i = loadedArtistCount; i < limit; i++) {
        const iframe = allArtistIframes[i];
        const realSrc = iframe.getAttribute('data-src');
        
        if (realSrc) {

            let fallbackTimer;
            
            iframe.onload = () => {
                clearTimeout(fallbackTimer);
                iframe.classList.add('iframe-ready');
            };

            fallbackTimer = setTimeout(() => {
                iframe.classList.add('iframe-ready');
            }, 4000);
            
            iframe.setAttribute('src', realSrc);
            iframe.removeAttribute('data-src');
        }
    }

    loadedArtistCount = limit;

    if (artistObserver) artistObserver.disconnect();

    if (loadedArtistCount < allArtistIframes.length) {
        const lastLoaded = allArtistIframes[loadedArtistCount - 1];
        
        artistObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadArtistIframes(false);
            }
        }, {
            root: document.getElementById('music-display-area'),
            rootMargin: '0px 0px 300px 0px',
            threshold: 0
        });

        artistObserver.observe(lastLoaded);
    }
}


// MUSIC PASSWORD LOGIC
const musicPasswordInput = document.getElementById('music-password-input');
const musicPasswordSubmit = document.getElementById('music-password-submit');
const contentMusicPassword = document.getElementById('content-music-password');

// MUSIC TOGGLE LOGIC
const musicToggleBtn = document.getElementById('music-toggle-btn');
const artistsGrid = document.getElementById('artists-grid');
const songsGrid = document.getElementById('songs-grid');

const topQuotes = [
    "Some of my top artists",
    "Artists Shaping My Musical life",
    "The Superheroes of My Music World"
];

const bottomQuotesSuffixes = [
    "Because Music Heals",
    "Hidden within the heart",
    "As Music Puts me at ease"
];

let currentMusicView = 'songs'; 

function wakeUpToggleOutline() {
    if (!musicToggleBtn) return;
    musicToggleBtn.classList.add('show-outline');
    
    clearTimeout(toggleOutlineTimer);
    toggleOutlineTimer = setTimeout(() => {
        musicToggleBtn.classList.remove('show-outline');
    }, 3000);
}

if (musicToggleBtn) {

    musicToggleBtn.addEventListener('mouseenter', wakeUpToggleOutline);

    musicToggleBtn.addEventListener('click', () => {
        wakeUpToggleOutline(); 

        musicToggleBtn.classList.add('glitch-out');
        musicToggleBtn.classList.remove('glitch-in');

        document.querySelectorAll('#content-music iframe').forEach(iframe => {
            const currentSrc = iframe.getAttribute('src');
            if (currentSrc) iframe.setAttribute('src', currentSrc);
        });
        
        if (currentMusicView === 'artists') {
            artistsGrid.classList.add('grid-exit');
            artistsGrid.classList.remove('grid-enter');
        }

        setTimeout(() => {
            const topQuoteEl = document.getElementById('artist-top-quote');
            const bottomQuoteEl = document.getElementById('artist-bottom-quote');

            if (currentMusicView === 'songs') {
                currentMusicView = 'artists';
                musicToggleBtn.textContent = 'ARTISTS';
                songsGrid.classList.add('hidden');
                
                artistsGrid.classList.remove('hidden', 'grid-exit');
                artistsGrid.classList.add('grid-enter');

                if (loadedArtistCount === 0) {
                    loadArtistIframes(true);
                }

                musicDisplayArea.style.overflowY = 'auto';

                const randomTop = topQuotes[Math.floor(Math.random() * topQuotes.length)];
                const randomBottom = bottomQuotesSuffixes[Math.floor(Math.random() * bottomQuotesSuffixes.length)];

                topQuoteEl.innerText = randomTop;
                bottomQuoteEl.innerText = "And more, " + randomBottom;

                topQuoteEl.classList.remove('hidden');
                bottomQuoteEl.classList.remove('hidden');

                checkBackButtonVisibility(musicDisplayArea);

            } else {
                currentMusicView = 'songs';
                musicToggleBtn.textContent = 'SONGS';
                
                artistsGrid.classList.add('hidden');
                artistsGrid.classList.remove('grid-exit', 'grid-enter');
                songsGrid.classList.remove('hidden');
                
                musicDisplayArea.style.overflowY = 'hidden';

                topQuoteEl.classList.add('hidden');
                bottomQuoteEl.classList.add('hidden');

                checkBackButtonVisibility(musicDisplayArea);
            }

            musicToggleBtn.classList.remove('glitch-out');
            musicToggleBtn.classList.add('glitch-in');
            
            setTimeout(() => {
                musicToggleBtn.classList.remove('glitch-in');
            }, 300);
            
        }, 200); 
    });
}

function checkMusicPassword() {
    const attempt = musicPasswordInput.value.trim().toLowerCase();
    
    if (attempt === 'kpop') {
        
        isMusicUnlocked = true;

        contentMusicPassword.classList.remove('show-content');

        const contentMusic = document.getElementById('content-music');
        if(contentMusic) contentMusic.classList.add('show-content');
        
        edgeLight.classList.remove('pulse-music');
        void edgeLight.offsetWidth;
        edgeLight.classList.add('pulse-music');
        
        setTimeout(() => {
            wakeUpToggleOutline();
        }, 1000);
        
    } else {
        musicPasswordInput.value = '';
        musicPasswordInput.placeholder = 'Wrong Answer';
        musicPasswordInput.focus();
    }
}

musicPasswordSubmit.addEventListener('click', checkMusicPassword);

musicPasswordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkMusicPassword();
    }
});

musicPasswordInput.addEventListener('input', () => {
    musicPasswordInput.placeholder = '';
});

// SCROLL HIDE BACK BUTTON
const natureDisplayArea = document.getElementById('nature-display-area');

function checkBackButtonVisibility(scrollElement, labelId) {

    if (scrollElement.scrollTop > 40) {
        exitBtn.classList.add('hidden-on-scroll');
        if (labelId) {
            const label = document.getElementById(labelId);
            if (label) label.classList.add('hidden-on-scroll');
        }

    } else {
        exitBtn.classList.remove('hidden-on-scroll');
        if (labelId) {
            const label = document.getElementById(labelId);
            if (label) label.classList.remove('hidden-on-scroll');
        }
    }
}

if (musicDisplayArea && exitBtn) {
    musicDisplayArea.addEventListener('scroll', () => {
        if (currentMusicView === 'artists') {
            checkBackButtonVisibility(musicDisplayArea, null);
        }
    });
}

if (natureDisplayArea && exitBtn) {
    natureDisplayArea.addEventListener('scroll', () => {
        checkBackButtonVisibility(natureDisplayArea, 'nature-label');
    });
}

document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// SONGS SECTION GESTURES & LOGIC
let songSlides = [];
let currentSongSlideIndex = 0;
let isSongAnimating = false;
const songsGridContainer = document.getElementById('songs-grid');

function goToSongSlide(index) {
    songSlides = Array.from(songsGridContainer.querySelectorAll('.song-slide'));
    
    if (index < 0 || index >= songSlides.length || isSongAnimating) return;
    
    isSongAnimating = true;

    const targetSlide = songSlides[index];
    const pendingIframes = targetSlide.querySelectorAll('iframe[data-src]');

    pendingIframes.forEach(iframe => {
        iframe.setAttribute('src', iframe.getAttribute('data-src'));
        iframe.removeAttribute('data-src');
    });

    document.querySelectorAll('iframe').forEach(iframe => {
        if (iframe.contentWindow) {
            iframe.contentWindow.postMessage({ command: 'pause' }, '*');
        }
    });

    const oldSlide = songSlides[currentSongSlideIndex];
    const isScrollingDown = index > currentSongSlideIndex;

    oldSlide.querySelectorAll('iframe').forEach(iframe => {
        const currentSrc = iframe.getAttribute('src');
        if (currentSrc) iframe.getAttribute('src, currentSrc');
    });
    
    oldSlide.classList.add('visited-slide');

    if (isScrollingDown) {
        oldSlide.classList.add('fade-out-up');
    } else {
        oldSlide.classList.add('fade-out-down');
    }
    
    currentSongSlideIndex = index;
    songSlides[currentSongSlideIndex].classList.add('active-slide');

    songSlides.forEach((slide, i) => {
        if (i < currentSongSlideIndex) {
            slide.classList.add('passed-slide');
        } else {
            slide.classList.remove('passed-slide');
        }
    });

    setTimeout(() => {
        oldSlide.classList.remove('active-slide', 'fade-out-up', 'fade-out-down');
    }, 800);

    setTimeout(() => {
        isSongAnimating = false;
    }, 1000);
}

musicDisplayArea.addEventListener('click', (e) => {
    const clickedToggle = e.target.closest('#music-toggle-btn');
    const clickedExit = e.target.closest('#exit-button');
    
    if (currentMusicView === 'songs' && currentSongSlideIndex === 0 && !clickedToggle && !clickedExit) {
        goToSongSlide(1);
    }
});

musicDisplayArea.addEventListener('wheel', (e) => {
    if (currentMusicView !== 'songs') return;
    
    e.preventDefault();

    if (isSongAnimating) return;

    if (e.deltaY > 0) {
        goToSongSlide(currentSongSlideIndex + 1);
    } 
    else if (e.deltaY < 0) {
        goToSongSlide(currentSongSlideIndex - 1);
    }
}, { passive: false });

let songTouchStartY = 0;
let songTouchEndY = 0;

musicDisplayArea.addEventListener('touchstart', (e) => {
    if (currentMusicView !== 'songs') return;
    songTouchStartY = e.changedTouches[0].screenY;
}, { passive: true });

musicDisplayArea.addEventListener('touchend', (e) => {
    if (currentMusicView !== 'songs') return;
    songTouchEndY = e.changedTouches[0].screenY;
    handleSongSwipe();
}, { passive: true });

function handleSongSwipe() {
    if (isSongAnimating) return;

    const swipeDistance = songTouchStartY - songTouchEndY;
    const minSwipeThreshold = 40; 
    
    if (swipeDistance > minSwipeThreshold) {
        goToSongSlide(currentSongSlideIndex + 1);
    }
    else if (swipeDistance < -minSwipeThreshold) {
        goToSongSlide(currentSongSlideIndex - 1);
    }
}

let iframeTrackerInterval = null;
let lastFocusedIframe = null;

function pauseOtherIframes(activeIframe) {
    document.querySelectorAll('iframe').forEach(iframe => {
        if (iframe !== activeIframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({ command: 'pause' }, '*');
        }
    });
}

function startIframeTracker() {
    if (!iframeTrackerInterval) {
        iframeTrackerInterval = setInterval(() => {
            const active = document.activeElement;
            if (active && active.tagName === 'IFRAME') {
                if (active !== lastFocusedIframe) {
                    pauseOtherIframes(active);
                    lastFocusedIframe = active;
                }
            }
        }, 250);
    }
}

function stopIframeTracker() {
    if (iframeTrackerInterval) {
        clearInterval(iframeTrackerInterval);
        iframeTrackerInterval = null;
    }
    lastFocusedIframe = null;
}

window.addEventListener('blur', () => {
    setTimeout(() => {
        const active = document.activeElement;
        if (active && active.tagName === 'IFRAME') {
            if (active !== lastFocusedIframe) {
                pauseOtherIframes(active);
                lastFocusedIframe = active;
            }
            startIframeTracker();
        }
    }, 0);
});

window.addEventListener('focus', stopIframeTracker);
window.addEventListener('touchstart', (e) => {
    if (e.target.tagName !== 'IFRAME') {
        window.focus();
        stopIframeTracker();
    }
}, { passive: true });

// NATURE GALLERY
let currentZoom = 1;
let panX = 0;
let panY = 0;
let isDraggingZoom = false;
let startDragX = 0;
let startDragY = 0;
let initialPinchDistance = null;
let initialZoomOnPinch = 1;

hdImageStage.addEventListener('touchstart', (e) => {
    if (!isNatureMode()) return;
    
    // If two fingers are detected, initialize the pinch
    if (e.touches.length === 2) {
        e.preventDefault();
        initialPinchDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
        initialZoomOnPinch = currentZoom;
    }
}, { passive: false });

hdImageStage.addEventListener('touchmove', (e) => {
    if (!isNatureMode()) return;
    
    // Calculate the new distance as fingers move
    if (e.touches.length === 2 && initialPinchDistance) {
        e.preventDefault();
        const currentPinchDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );

        // Determine the zoom factor and apply limits (1 to 4)
        const zoomFactor = currentPinchDistance / initialPinchDistance;
        currentZoom = Math.min(Math.max(1, initialZoomOnPinch * zoomFactor), 4);

        applyZoomAndPan();
    }
}, { passive: false });

hdImageStage.addEventListener('touchend', (e) => {
    // Reset pinch if fingers are lifted
    if (e.touches.length < 2) {
        initialPinchDistance = null;
    }
});

function isNatureMode() {
    return hdModal.classList.contains('show-modal') &&
    !hdModal.classList.contains('image-1-active') &&
    !hdModal.classList.contains('image-2-active') &&
    !hdModal.classList.contains('image-3-active') &&
    !hdModal.classList.contains('image-4-active') &&
    !hdModal.classList.contains('image-5-active');
}

function applyZoomAndPan() {
    hdImage.style.transform = `translate(${panX}px, ${panY}px) scale(${currentZoom})`;
}

hdImageStage.addEventListener('wheel', (e) => {
    if (!isNatureMode()) return;
    e.preventDefault();

    const zoomSpeed = 0.15;
    const delta = e.deltaY < 0 ? 1 : -1;
    currentZoom += delta * zoomSpeed;

    currentZoom = Math.min(Math.max(1, currentZoom), 4);

    if (currentZoom === 1) {
        panX = 0;
        panY = 0;
        hdImage.style.cursor = 'zoom-in';
    } else {
        hdImage.style.cursor = 'grab';
    }

    applyZoomAndPan();
}, { passive: false });

hdImageStage.addEventListener('pointerdown', (e) => {
    if (!isNatureMode() || currentZoom <= 1) return;
    isDraggingZoom = true;
    startDragX = e.clientX - panX;
    startDragY = e.clientY - panY;
    
    hdImage.style.cursor = 'grabbing';
    hdImage.style.transition = 'none'; 
});

window.addEventListener('pointermove', (e) => {
    if (!isDraggingZoom) return;
    panX = e.clientX - startDragX;
    panY = e.clientY - startDragY;
    applyZoomAndPan();
});

window.addEventListener('pointerup', () => {
    if (isDraggingZoom) {
        isDraggingZoom = false;
        hdImage.style.cursor = 'grab';
        hdImage.style.transition = 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)'; 
    }
});

function resetNatureZoom() {
    currentZoom = 1;
    panX = 0;
    panY = 0;
    if (hdImage) {
        hdImage.style.transform = `translate(0px, 0px) scale(1)`;
        hdImage.style.cursor = 'default';
        hdImage.style.transition = 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)';
    }
}

// PROJECTS SECTION
const projectPanels = document.querySelectorAll('.project-panel');

projectPanels.forEach(panel => {
    panel.addEventListener('click', function(e) {
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return; 
        }
        
        if (!this.classList.contains('touch-active')) {
            
            e.preventDefault();
            
            projectPanels.forEach(p => p.classList.remove('touch-active'));
            
            this.classList.add('touch-active');
            
        } else {
            
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 100); 
        }
    });
});

document.getElementById('content-projects').addEventListener('click', (e) => {
    if (!e.target.closest('.project-panel')) {
        projectPanels.forEach(p => p.classList.remove('touch-active'));
    }
});

// BIRTHDAY SPECIAL
function initBirthdaySequence() {
    const today = new Date();
    
    if (today.getMonth() === 7 && today.getDate() === 16) {
        document.body.classList.add('birthday-active');
        
        const introSequence = document.getElementById('intro-sequence');
        if (introSequence) {
            const bdayMessage = document.createElement('div');
            bdayMessage.className = 'bday-special-text';
            bdayMessage.textContent = "Thank you for the special visit on my special day.";
            introSequence.appendChild(bdayMessage);
        }

        const universe = document.getElementById('universe');
        if (universe) {
            for (let i = 0; i < 50; i++) {
                const meteor = document.createElement('div');
                meteor.className = 'cosmic-meteor';
                
                meteor.style.top = `${Math.random() * 150 - 50}vh`;
                meteor.style.left = `${Math.random() * 150 + 20}vw`;
                
                meteor.style.animationDelay = `${(Math.random() * 3.7 + 0.8).toFixed(2)}s`;
                meteor.style.animationDuration = `${(Math.random() * 1.2 + 0.8).toFixed(2)}s`;
                
                const colors = ['#E5C158', '#b464ff', '#00f2fe', '#ffffff'];
                const chosenColor = colors[Math.floor(Math.random() * colors.length)];
                meteor.style.setProperty('--meteor-color', chosenColor);
                
                universe.appendChild(meteor);
            }
        }
    }
}

initBirthdaySequence();