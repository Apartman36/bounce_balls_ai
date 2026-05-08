(() => {
const MAX_BALLS = 400;
const QUALITY = "balanced";
const MAX_DPR = 1.5;
const BALL_GLOW_MODE = "cheap";
const TRAIL_MODE = "subtle";
const BACKGROUND_FADE_ALPHA = 1;
const MAX_PARTICLES = 520;
const TRAIL_LENGTH = TRAIL_MODE === "subtle" ? 5 : 0;
const TRAIL_POINT_TTL = 0.16;
const BALL_RADIUS = 7;
const BALL_SPEED = 330;
const BOUNCE_DAMPING = 0.988;
const PARTICLE_COUNT = 22;
const RING_LINE_WIDTH = 7;
const OUTER_RING_LINE_SCALE = 1.12;
const SPIKE_COUNT = 96;
const TAU = Math.PI * 2;
const FIXED_DT = 1 / 120;
const MAX_FRAME_DT = 1 / 20;
const MIN_SPEED = 230;
const MAX_SPEED = 520;
const GRAVITY = 74;
const SWIRL_FORCE = 34;
const VELOCITY_JITTER = 26;
const SUCCESS_CONFETTI = 260;
const STALL_OUTWARD_START = 20;
const OUTER_GAP_WIDEN_START = 25;
const MAX_FLOATING_TEXTS = 18;
const MUSIC_ENABLED = true;
const MUSIC_VOLUME = 0.12;
const BOUNCE_SOUND_WINDOW_MS = 80;
const MAX_BOUNCE_SOUNDS_PER_WINDOW = 3;
const LEVELS = [
    {
        name: "Classic Spiral",
        colorOffset: 0,
        startOffset: { x: -0.08, y: 0.08 },
        startVelocityAngle: -0.68,
        startSpeedMultiplier: 1,
        outerGapCenterAngle: -1.72,
        outerGapSizeAngle: 0.86,
        outerGapDriftSpeed: 0.025,
        gapDriftSpeed: 0.018,
        rings: [
            { radiusRatio: 0.2, gapCenterAngle: -0.92, gapSizeAngle: 0.92, colorOffset: 0.0, driftSpeed: 0.035 },
            { radiusRatio: 0.32, gapCenterAngle: 2.64, gapSizeAngle: 0.82, colorOffset: 0.18, driftSpeed: -0.018 },
            { radiusRatio: 0.44, gapCenterAngle: 0.4, gapSizeAngle: 0.78, colorOffset: 0.36, driftSpeed: 0.024 },
            { radiusRatio: 0.56, gapCenterAngle: -2.05, gapSizeAngle: 0.74, colorOffset: 0.54, driftSpeed: -0.02 },
            { radiusRatio: 0.68, gapCenterAngle: 1.18, gapSizeAngle: 0.72, colorOffset: 0.72, driftSpeed: 0.02 },
            { radiusRatio: 0.8, gapCenterAngle: -0.82, gapSizeAngle: 0.72, colorOffset: 0.9, driftSpeed: -0.016 }
        ],
        pickups: [
            { radiusRatio: 0.14, angle: -0.58, factor: 2, color: "#ffef5e" },
            { radiusRatio: 0.29, angle: 0.08, factor: 5, color: "#39ff88" },
            { radiusRatio: 0.46, angle: -0.78, factor: 4, color: "#28f7ff" },
            { radiusRatio: 0.63, angle: 1.28, factor: 3, color: "#ff4bd8" }
        ]
    },
    {
        name: "Wide Orbit",
        colorOffset: 0.16,
        startOffset: { x: -0.04, y: -0.02 },
        startVelocityAngle: -0.34,
        startSpeedMultiplier: 0.92,
        outerGapCenterAngle: 0.88,
        outerGapSizeAngle: 1.08,
        outerGapDriftSpeed: -0.018,
        gapDriftSpeed: 0.014,
        rings: [
            { radiusRatio: 0.24, gapCenterAngle: -0.32, gapSizeAngle: 1.02, colorOffset: 0.02, driftSpeed: 0.018 },
            { radiusRatio: 0.38, gapCenterAngle: 1.62, gapSizeAngle: 0.94, colorOffset: 0.22, driftSpeed: -0.012 },
            { radiusRatio: 0.52, gapCenterAngle: -2.72, gapSizeAngle: 0.9, colorOffset: 0.42, driftSpeed: 0.014 },
            { radiusRatio: 0.66, gapCenterAngle: -0.68, gapSizeAngle: 0.88, colorOffset: 0.62, driftSpeed: -0.014 },
            { radiusRatio: 0.8, gapCenterAngle: 1.92, gapSizeAngle: 0.86, colorOffset: 0.82, driftSpeed: 0.012 }
        ],
        pickups: [
            { radiusRatio: 0.2, angle: 0.34, factor: 2, color: "#28f7ff" },
            { radiusRatio: 0.4, angle: -1.04, factor: 3, color: "#39ff88" },
            { radiusRatio: 0.58, angle: 0.82, factor: 4, color: "#ffef5e" },
            { radiusRatio: 0.72, angle: -2.18, factor: 2, color: "#ff4bd8" }
        ]
    },
    {
        name: "Multiplier Storm",
        colorOffset: 0.42,
        startOffset: { x: -0.1, y: 0.04 },
        startVelocityAngle: -0.82,
        startSpeedMultiplier: 1.08,
        outerGapCenterAngle: -2.56,
        outerGapSizeAngle: 0.98,
        outerGapDriftSpeed: 0.04,
        gapDriftSpeed: 0.026,
        rings: [
            { radiusRatio: 0.18, gapCenterAngle: -0.72, gapSizeAngle: 0.86, colorOffset: 0.02, driftSpeed: 0.05 },
            { radiusRatio: 0.29, gapCenterAngle: 2.06, gapSizeAngle: 0.76, colorOffset: 0.18, driftSpeed: -0.032 },
            { radiusRatio: 0.41, gapCenterAngle: -1.8, gapSizeAngle: 0.76, colorOffset: 0.34, driftSpeed: 0.04 },
            { radiusRatio: 0.53, gapCenterAngle: 0.8, gapSizeAngle: 0.74, colorOffset: 0.5, driftSpeed: -0.036 },
            { radiusRatio: 0.65, gapCenterAngle: -2.92, gapSizeAngle: 0.72, colorOffset: 0.66, driftSpeed: 0.032 },
            { radiusRatio: 0.77, gapCenterAngle: -0.28, gapSizeAngle: 0.72, colorOffset: 0.82, driftSpeed: -0.03 }
        ],
        pickups: [
            { radiusRatio: 0.13, angle: -0.48, factor: 5, color: "#ff4bd8" },
            { radiusRatio: 0.25, angle: 1.1, factor: 2, color: "#ffef5e" },
            { radiusRatio: 0.37, angle: -1.38, factor: 4, color: "#28f7ff" },
            { radiusRatio: 0.51, angle: 0.22, factor: 3, color: "#39ff88" },
            { radiusRatio: 0.67, angle: 2.18, factor: 5, color: "#b064ff" }
        ]
    },
    {
        name: "Tight Core",
        colorOffset: 0.68,
        startOffset: { x: 0.02, y: 0.02 },
        startVelocityAngle: -1.1,
        startSpeedMultiplier: 1.02,
        outerGapCenterAngle: 2.38,
        outerGapSizeAngle: 0.94,
        outerGapDriftSpeed: -0.032,
        gapDriftSpeed: 0.02,
        rings: [
            { radiusRatio: 0.15, gapCenterAngle: -1.22, gapSizeAngle: 0.82, colorOffset: 0.04, driftSpeed: -0.046 },
            { radiusRatio: 0.25, gapCenterAngle: 1.86, gapSizeAngle: 0.76, colorOffset: 0.18, driftSpeed: 0.032 },
            { radiusRatio: 0.36, gapCenterAngle: -0.26, gapSizeAngle: 0.74, colorOffset: 0.32, driftSpeed: -0.028 },
            { radiusRatio: 0.48, gapCenterAngle: 2.72, gapSizeAngle: 0.72, colorOffset: 0.5, driftSpeed: 0.026 },
            { radiusRatio: 0.6, gapCenterAngle: 0.54, gapSizeAngle: 0.7, colorOffset: 0.66, driftSpeed: -0.022 },
            { radiusRatio: 0.72, gapCenterAngle: -2.2, gapSizeAngle: 0.72, colorOffset: 0.82, driftSpeed: 0.02 },
            { radiusRatio: 0.83, gapCenterAngle: 1.12, gapSizeAngle: 0.74, colorOffset: 0.96, driftSpeed: -0.016 }
        ],
        pickups: [
            { radiusRatio: 0.12, angle: -0.82, factor: 3, color: "#39ff88" },
            { radiusRatio: 0.24, angle: 0.72, factor: 2, color: "#ffef5e" },
            { radiusRatio: 0.42, angle: -1.9, factor: 4, color: "#28f7ff" },
            { radiusRatio: 0.58, angle: 0.18, factor: 3, color: "#ff4bd8" },
            { radiusRatio: 0.75, angle: 2.4, factor: 2, color: "#b064ff" }
        ]
    }
];
const BASE_NEON_COLORS = ["#39ff88", "#ffef5e", "#b064ff", "#28f7ff", "#ff4bd8"];
const shell = requiredElement(".sim-shell");
const canvas = requiredElement("#gameCanvas");
const mapNameValue = requiredElement("#mapName");
const stateValue = requiredElement("#stateValue");
const ballCountValue = requiredElement("#ballCount");
const pickupCountValue = requiredElement("#pickupCount");
const timeValue = requiredElement("#timeValue");
const maxBallCountValue = requiredElement("#maxBallCount");
const actionButton = requiredElement("#actionButton");
const newRunButton = requiredElement("#newRunButton");
const nextMapButton = requiredElement("#nextMapButton");
const fullscreenButton = requiredElement("#fullscreenButton");
const soundButton = requiredElement("#soundButton");
const musicButton = requiredElement("#musicButton");
const centerMessage = requiredElement("#centerMessage");
const ctx = requiredContext(canvas);
let geometry = {
    width: 0,
    height: 0,
    dpr: 1,
    center: { x: 0, y: 0 },
    outerRadius: 1,
    unit: 1,
    ballRadius: BALL_RADIUS,
    ringLineWidth: RING_LINE_WIDTH,
    pickupRadius: 18,
    spikeHeight: 18
};
let rings = [];
let pickups = [];
let collectedPickupIds = new Set();
let balls = [];
let particles = [];
let floatingTexts = [];
let state = "READY";
let levelIndex = 0;
let runVariant = createRunVariant(getLevel());
let currentPalette = createPalette(runVariant.colorOffset);
let collectedMultipliers = 0;
let debugEnabled = false;
let accumulator = 0;
let lastTime = performance.now();
let elapsed = 0;
let runElapsed = 0;
let fps = 60;
let maxBallsReached = 0;
let maxRadiusReached = 0;
let lastProgressElapsed = 0;
let resizeObserver;
let audioContext;
let audioAvailable = true;
let soundEnabled = true;
let musicEnabled = MUSIC_ENABLED;
let musicElement = null;
let musicLoadFailed = false;
let bounceSoundWindowStart = 0;
let bounceSoundCount = 0;
let lastDeathSoundAt = 0;
const randomBetween = (min, max) => min + Math.random() * (max - min);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const length = (x, y) => Math.hypot(x, y);
function requiredElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Missing required DOM element: ${selector}`);
    }
    return element;
}
function requiredContext(targetCanvas) {
    const context = targetCanvas.getContext("2d");
    if (!context) {
        throw new Error("Canvas 2D context is not available.");
    }
    return context;
}
function ensureAudioContext() {
    if (!audioAvailable || !soundEnabled) {
        return null;
    }
    try {
        const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextConstructor) {
            audioAvailable = false;
            return null;
        }
        if (!audioContext) {
            audioContext = new AudioContextConstructor();
        }
        return audioContext;
    }
    catch {
        audioAvailable = false;
        return null;
    }
}
function startAudioFromGesture() {
    if (soundEnabled) {
        const context = ensureAudioContext();
        if (context?.state === "suspended") {
            context.resume().catch(() => {
                audioAvailable = false;
            });
        }
    }
    if (musicEnabled) {
        playMusic();
    }
}
function getPlayableAudioContext() {
    if (!soundEnabled || !audioAvailable || !audioContext || audioContext.state !== "running") {
        return null;
    }
    return audioContext;
}
function getCrowdSoundScale() {
    return clamp(1 - Math.max(0, balls.length - 1) / 260, 0.22, 1);
}
function scheduleTone(startFrequency, endFrequency, duration, volume, type = "sine", delay = 0) {
    const context = getPlayableAudioContext();
    if (!context || volume <= 0) {
        return;
    }
    try {
        const startAt = context.currentTime + delay;
        const stopAt = startAt + duration + 0.04;
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(Math.max(1, startFrequency), startAt);
        oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), startAt + duration);
        gain.gain.setValueAtTime(0.0001, startAt);
        gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume), startAt + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(startAt);
        oscillator.stop(stopAt);
        oscillator.onended = () => {
            oscillator.disconnect();
            gain.disconnect();
        };
    }
    catch {
        audioAvailable = false;
    }
}
function scheduleNoisePop(duration, volume, delay = 0) {
    const context = getPlayableAudioContext();
    if (!context || volume <= 0) {
        return;
    }
    try {
        const frameCount = Math.max(1, Math.floor(context.sampleRate * duration));
        const buffer = context.createBuffer(1, frameCount, context.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < frameCount; i += 1) {
            const fade = 1 - i / frameCount;
            data[i] = (Math.random() * 2 - 1) * fade;
        }
        const startAt = context.currentTime + delay;
        const source = context.createBufferSource();
        const filter = context.createBiquadFilter();
        const gain = context.createGain();
        source.buffer = buffer;
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(520, startAt);
        filter.Q.setValueAtTime(0.8, startAt);
        gain.gain.setValueAtTime(Math.max(0.0001, volume), startAt);
        gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
        source.connect(filter);
        filter.connect(gain);
        gain.connect(context.destination);
        source.start(startAt);
        source.stop(startAt + duration);
        source.onended = () => {
            source.disconnect();
            filter.disconnect();
            gain.disconnect();
        };
    }
    catch {
        audioAvailable = false;
    }
}
function playBounceSound(ball) {
    if (!canPlayBounceSound()) {
        return;
    }
    const speed = length(ball.vx, ball.vy);
    const pitch = clamp(180 + speed * 0.45, 220, 560) * randomBetween(0.93, 1.08);
    scheduleTone(pitch, pitch * 0.68, 0.04, 0.03 * getCrowdSoundScale(), "triangle");
}
function canPlayBounceSound() {
    const now = performance.now();
    if (now - bounceSoundWindowStart > BOUNCE_SOUND_WINDOW_MS) {
        bounceSoundWindowStart = now;
        bounceSoundCount = 0;
    }
    if (bounceSoundCount >= MAX_BOUNCE_SOUNDS_PER_WINDOW) {
        return false;
    }
    bounceSoundCount += 1;
    return true;
}
function playPickupSound(pickup) {
    const volume = 0.045 * getCrowdSoundScale();
    const base = 520 + pickup.factor * 42;
    scheduleTone(base, base * 1.32, 0.055, volume, "sine");
    scheduleTone(base * 1.5, base * 1.75, 0.06, volume * 0.92, "triangle", 0.055);
    scheduleTone(base * 2.05, base * 2.26, 0.065, volume * 0.82, "sine", 0.11);
}
function playDeathSound() {
    const now = performance.now();
    if (now - lastDeathSoundAt < 70) {
        return;
    }
    lastDeathSoundAt = now;
    const volume = 0.038 * getCrowdSoundScale();
    scheduleNoisePop(0.07, volume);
    scheduleTone(150, 74, 0.09, volume * 0.72, "sine");
}
function playSuccessSound() {
    scheduleTone(523.25, 529, 0.22, 0.04, "sine");
    scheduleTone(659.25, 666, 0.22, 0.034, "sine");
    scheduleTone(783.99, 792, 0.22, 0.032, "sine");
    scheduleTone(880, 988, 0.09, 0.04, "triangle", 0.08);
    scheduleTone(1174.66, 1318.51, 0.1, 0.035, "triangle", 0.15);
}
function playGameOverSound() {
    scheduleTone(196, 73.42, 0.36, 0.055, "sawtooth");
}
function ensureMusicElement() {
    if (musicLoadFailed) {
        return null;
    }
    if (musicElement) {
        return musicElement;
    }
    try {
        musicElement = new Audio("./assets/music.mp3");
        musicElement.loop = true;
        musicElement.volume = MUSIC_VOLUME;
        musicElement.preload = "auto";
        musicElement.addEventListener("error", () => {
            musicLoadFailed = true;
            updateUi();
        }, { once: true });
        return musicElement;
    }
    catch {
        musicLoadFailed = true;
        return null;
    }
}
function playMusic() {
    if (!musicEnabled) {
        return;
    }
    const track = ensureMusicElement();
    if (!track) {
        return;
    }
    track.volume = MUSIC_VOLUME;
    const playRequest = track.play();
    if (playRequest?.catch) {
        playRequest.catch(() => {
            musicLoadFailed = true;
            updateUi();
        });
    }
}
function pauseMusic() {
    if (musicElement) {
        musicElement.pause();
    }
}
function toggleSound() {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
        startAudioFromGesture();
    }
    updateUi();
}
function toggleMusic() {
    musicEnabled = !musicEnabled;
    if (musicEnabled) {
        musicLoadFailed = false;
        startAudioFromGesture();
    }
    else {
        pauseMusic();
    }
    updateUi();
}
function normalizeAngle(angle) {
    return ((angle % TAU) + TAU) % TAU;
}
function signedAngleDelta(angle, center) {
    return Math.atan2(Math.sin(angle - center), Math.cos(angle - center));
}
function isAngleInGap(angle, gapCenter, gapSize, padding = 0) {
    return Math.abs(signedAngleDelta(angle, gapCenter)) <= gapSize / 2 + padding;
}
function colorFromPalette(timeSeconds, offset = 0) {
    const phase = normalizeAngle((timeSeconds * 0.27 + offset + runVariant.colorOffset) * TAU) / TAU;
    const scaled = phase * currentPalette.length;
    const index = Math.floor(scaled) % currentPalette.length;
    const nextIndex = (index + 1) % currentPalette.length;
    const t = scaled - Math.floor(scaled);
    const a = hexToRgb(currentPalette[index]);
    const b = hexToRgb(currentPalette[nextIndex]);
    return `rgb(${Math.round(lerp(a.r, b.r, t))}, ${Math.round(lerp(a.g, b.g, t))}, ${Math.round(lerp(a.b, b.b, t))})`;
}
function hexToRgb(hex) {
    const value = hex.replace("#", "");
    return {
        r: parseInt(value.slice(0, 2), 16),
        g: parseInt(value.slice(2, 4), 16),
        b: parseInt(value.slice(4, 6), 16)
    };
}
function lerp(a, b, t) {
    return a + (b - a) * t;
}
function createPalette(colorOffset) {
    return BASE_NEON_COLORS.map((_, index) => sampleBasePalette(index / BASE_NEON_COLORS.length + colorOffset));
}
function sampleBasePalette(phase) {
    const normalized = normalizeAngle(phase * TAU) / TAU;
    const scaled = normalized * BASE_NEON_COLORS.length;
    const index = Math.floor(scaled) % BASE_NEON_COLORS.length;
    const nextIndex = (index + 1) % BASE_NEON_COLORS.length;
    const t = scaled - Math.floor(scaled);
    const a = hexToRgb(BASE_NEON_COLORS[index]);
    const b = hexToRgb(BASE_NEON_COLORS[nextIndex]);
    return rgbToHex(
        Math.round(lerp(a.r, b.r, t)),
        Math.round(lerp(a.g, b.g, t)),
        Math.round(lerp(a.b, b.b, t))
    );
}
function rgbToHex(r, g, b) {
    const toHex = (value) => Math.max(0, Math.min(255, value)).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
function createRunVariant(level, randomized = false) {
    const amount = randomized ? 1 : 0;
    const rand = (range) => (Math.random() * 2 - 1) * range * amount;
    return {
        colorOffset: level.colorOffset + rand(0.045),
        startVelocityOffset: rand(0.22),
        startSpeedScale: 1 + rand(0.08),
        pickupOffsets: level.pickups.map(() => ({
            angle: rand(0.07),
            radiusRatio: rand(0.018)
        }))
    };
}
function getLevel() {
    return LEVELS[levelIndex];
}
function createRings(level) {
    return level.rings.map((ring) => ({
        radius: ring.radiusRatio * geometry.outerRadius,
        lineWidth: geometry.ringLineWidth,
        gapCenterAngle: ring.gapCenterAngle,
        gapSizeAngle: ring.gapSizeAngle,
        baseGapCenterAngle: ring.gapCenterAngle,
        driftSpeed: ring.driftSpeed ?? level.gapDriftSpeed ?? 0,
        colorOffset: ring.colorOffset
    }));
}
function createPickups(level) {
    return level.pickups.map((pickupConfig, index) => {
        if (collectedPickupIds.has(index)) {
            return null;
        }
        const variant = runVariant.pickupOffsets[index] ?? { angle: 0, radiusRatio: 0 };
        const angle = pickupConfig.angle + variant.angle;
        const radiusRatio = clamp(pickupConfig.radiusRatio + variant.radiusRatio, 0.1, 0.86);
        const radius = radiusRatio * geometry.outerRadius;
        return {
            id: index,
            x: geometry.center.x + Math.cos(angle) * radius,
            y: geometry.center.y + Math.sin(angle) * radius,
            radius: geometry.pickupRadius,
            factor: pickupConfig.factor,
            label: `x${pickupConfig.factor}`,
            color: pickupConfig.color,
            radiusRatio,
            angle,
            collected: false
        };
    }).filter(Boolean);
}
function createBall(x, y, angle, speed, color = randomBallColor()) {
    return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: geometry.ballRadius,
        color,
        trail: TRAIL_MODE === "subtle" ? [{ x, y, age: 0 }] : [],
        alive: true,
        spin: Math.random() < 0.5 ? -1 : 1
    };
}
function randomBallColor() {
    return currentPalette[Math.floor(Math.random() * currentPalette.length)];
}
function resetLevel(nextState = "READY", randomized = false) {
    const level = getLevel();
    runVariant = createRunVariant(level, randomized);
    currentPalette = createPalette(runVariant.colorOffset);
    collectedPickupIds = new Set();
    rings = createRings(level);
    pickups = createPickups(level);
    particles = [];
    floatingTexts = [];
    collectedMultipliers = 0;
    elapsed = 0;
    runElapsed = 0;
    accumulator = 0;
    maxRadiusReached = 0;
    lastProgressElapsed = 0;
    shell.classList.remove("is-success-pulse");
    const startX = geometry.center.x + level.startOffset.x * geometry.outerRadius;
    const startY = geometry.center.y + level.startOffset.y * geometry.outerRadius;
    const startAngle = level.startVelocityAngle + runVariant.startVelocityOffset;
    const startSpeed = BALL_SPEED * geometry.unit * (level.startSpeedMultiplier ?? 1) * runVariant.startSpeedScale;
    balls = [createBall(startX, startY, startAngle, startSpeed, colorFromPalette(0, 0.62))];
    maxBallsReached = balls.length;
    state = nextState;
    if (state === "RUNNING") {
        spawnBurst(startX, startY, "#28f7ff", PARTICLE_COUNT, 1.15);
    }
    updateUi();
}
function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const oldGeometry = geometry;
    const width = Math.max(320, rect.width);
    const height = Math.max(568, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const outerRadius = Math.min(width * 0.425, height * 0.302);
    const unit = clamp(outerRadius / 215, 0.72, 1.22);
    const center = { x: width / 2, y: height * 0.515 };
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    geometry = {
        width,
        height,
        dpr,
        center,
        outerRadius,
        unit,
        ballRadius: BALL_RADIUS * unit,
        ringLineWidth: RING_LINE_WIDTH * unit,
        pickupRadius: 18 * unit,
        spikeHeight: 18 * unit
    };
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (oldGeometry.width > 0) {
        rescaleEntities(oldGeometry, geometry);
    }
    const previousRings = rings;
    rings = createRings(getLevel());
    rings.forEach((ring, index) => {
        if (previousRings[index]) {
            ring.gapCenterAngle = previousRings[index].gapCenterAngle;
        }
    });
    pickups = createPickups(getLevel());
    draw(performance.now() / 1000);
}
function rescaleEntities(oldGeometry, nextGeometry) {
    const scale = nextGeometry.outerRadius / oldGeometry.outerRadius;
    const movePoint = (point) => ({
        x: nextGeometry.center.x + (point.x - oldGeometry.center.x) * scale,
        y: nextGeometry.center.y + (point.y - oldGeometry.center.y) * scale
    });
    for (const ball of balls) {
        const moved = movePoint(ball);
        ball.x = moved.x;
        ball.y = moved.y;
        ball.vx *= scale;
        ball.vy *= scale;
        ball.radius = nextGeometry.ballRadius;
        ball.trail = ball.trail.map((point) => ({
            ...movePoint(point),
            age: point.age ?? 0
        }));
    }
    for (const particle of particles) {
        const moved = movePoint(particle);
        particle.x = moved.x;
        particle.y = moved.y;
        particle.vx *= scale;
        particle.vy *= scale;
        particle.size *= scale;
    }
}
function update(dt) {
    elapsed += dt;
    updateParticles(dt);
    updateFloatingTexts(dt);
    updateTrails(dt);
    if (state !== "RUNNING") {
        return;
    }
    runElapsed += dt;
    driftRingGaps(dt);
    const activeCountAtFrameStart = balls.length;
    for (let i = 0; i < activeCountAtFrameStart; i += 1) {
        const ball = balls[i];
        if (!ball?.alive) {
            continue;
        }
        updateBall(ball, dt);
    }
    compactAliveBalls();
    maxBallsReached = Math.max(maxBallsReached, balls.length);
    if (balls.length === 0 && state === "RUNNING") {
        state = "GAME OVER";
        playGameOverSound();
        spawnScreenConfetti(70, 0.45);
    }
    updateUi();
}
function compactAliveBalls() {
    let writeIndex = 0;
    for (let i = 0; i < balls.length; i += 1) {
        const ball = balls[i];
        if (ball?.alive) {
            balls[writeIndex] = ball;
            writeIndex += 1;
        }
    }
    balls.length = writeIndex;
}
function driftRingGaps(dt) {
    const stallBoost = getStallSeconds() > 8 ? 1.45 : 1;
    for (const ring of rings) {
        ring.gapCenterAngle = normalizeAngle(ring.gapCenterAngle + ring.driftSpeed * stallBoost * dt);
    }
}
function updateBall(ball, dt) {
    const dx = ball.x - geometry.center.x;
    const dy = ball.y - geometry.center.y;
    const dist = Math.max(1, length(dx, dy));
    const tangentX = -dy / dist;
    const tangentY = dx / dist;
    ball.vy += GRAVITY * geometry.unit * dt;
    ball.vx += tangentX * SWIRL_FORCE * ball.spin * dt;
    ball.vy += tangentY * SWIRL_FORCE * ball.spin * dt;
    applyAntiStallBias(ball, dx, dy, dist, dt);
    enforceSpeed(ball);
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;
    for (const ring of rings) {
        collideBallWithRing(ball, ring);
    }
    collectTouchedPickups(ball);
    resolveOuterBoundary(ball);
    recordRadiusProgress(ball);
    pushTrail(ball);
}
function applyAntiStallBias(ball, dx, dy, dist, dt) {
    if (runElapsed < STALL_OUTWARD_START) {
        return;
    }
    const stallSeconds = getStallSeconds();
    const ageHelp = clamp((runElapsed - STALL_OUTWARD_START) / 18, 0, 1);
    const stallHelp = clamp((stallSeconds - 5) / 11, 0, 1);
    const nearCenterHelp = dist < geometry.outerRadius * 0.34 ? 0.45 : 0;
    const help = Math.max(ageHelp * 0.38, stallHelp, nearCenterHelp);
    if (help <= 0) {
        return;
    }
    const nx = dx / dist;
    const ny = dy / dist;
    const bias = (14 + help * 46) * geometry.unit;
    ball.vx += nx * bias * dt;
    ball.vy += ny * bias * dt;
}
function recordRadiusProgress(ball) {
    if (!ball.alive) {
        return;
    }
    const dist = length(ball.x - geometry.center.x, ball.y - geometry.center.y);
    if (dist > maxRadiusReached + geometry.ballRadius * 0.55) {
        maxRadiusReached = dist;
        lastProgressElapsed = runElapsed;
    }
}
function getStallSeconds() {
    return Math.max(0, runElapsed - lastProgressElapsed);
}
function getOuterGapCenter() {
    const level = getLevel();
    return normalizeAngle(level.outerGapCenterAngle + (level.outerGapDriftSpeed ?? 0) * runElapsed);
}
function getOuterGapSize() {
    const level = getLevel();
    const ageBonus = Math.max(0, runElapsed - OUTER_GAP_WIDEN_START) * 0.022;
    const stallBonus = Math.max(0, getStallSeconds() - 8) * 0.024;
    return clamp(level.outerGapSizeAngle + ageBonus + stallBonus, level.outerGapSizeAngle, 1.78);
}
function enforceSpeed(ball) {
    const speed = length(ball.vx, ball.vy);
    if (speed < 0.001) {
        const angle = Math.random() * TAU;
        ball.vx = Math.cos(angle) * MIN_SPEED * geometry.unit;
        ball.vy = Math.sin(angle) * MIN_SPEED * geometry.unit;
        return;
    }
    const minSpeed = MIN_SPEED * geometry.unit;
    const maxSpeed = MAX_SPEED * geometry.unit;
    const clampedSpeed = clamp(speed, minSpeed, maxSpeed);
    if (Math.abs(speed - clampedSpeed) > 0.01) {
        ball.vx = (ball.vx / speed) * clampedSpeed;
        ball.vy = (ball.vy / speed) * clampedSpeed;
    }
}
function collideBallWithRing(ball, ring) {
    const dx = ball.x - geometry.center.x;
    const dy = ball.y - geometry.center.y;
    const dist = Math.max(0.001, length(dx, dy));
    const angle = Math.atan2(dy, dx);
    const angularPadding = ball.radius / ring.radius + 0.018;
    if (isAngleInGap(angle, ring.gapCenterAngle, ring.gapSizeAngle, angularPadding)) {
        return;
    }
    const collisionBand = ring.lineWidth / 2 + ball.radius;
    if (Math.abs(dist - ring.radius) > collisionBand) {
        return;
    }
    bounceBallOffRadialSurface(ball, dx, dy, dist, ring.radius, collisionBand);
}
function bounceBallOffRadialSurface(ball, dx, dy, dist, radius, collisionBand) {
    const nx = dx / dist;
    const ny = dy / dist;
    const radialVelocity = ball.vx * nx + ball.vy * ny;
    const side = dist < radius ? -1 : 1;
    const movingTowardRing = side < 0 ? radialVelocity > 0 : radialVelocity < 0;
    const targetDistance = radius + side * (collisionBand + 0.75 * geometry.unit);
    if (!movingTowardRing) {
        ball.x = geometry.center.x + nx * targetDistance;
        ball.y = geometry.center.y + ny * targetDistance;
        resetBallTrail(ball);
        return;
    }
    if (Math.abs(radialVelocity) < 4) {
        ball.vx += nx * VELOCITY_JITTER * geometry.unit * (Math.random() - 0.5);
        ball.vy += ny * VELOCITY_JITTER * geometry.unit * (Math.random() - 0.5);
    }
    ball.vx = (ball.vx - 2 * radialVelocity * nx) * BOUNCE_DAMPING;
    ball.vy = (ball.vy - 2 * radialVelocity * ny) * BOUNCE_DAMPING;
    ball.x = geometry.center.x + nx * targetDistance;
    ball.y = geometry.center.y + ny * targetDistance;
    const jitterAngle = Math.atan2(ball.vy, ball.vx) + randomBetween(-0.08, 0.08);
    const speed = length(ball.vx, ball.vy) + randomBetween(-VELOCITY_JITTER, VELOCITY_JITTER) * geometry.unit;
    ball.vx = Math.cos(jitterAngle) * speed;
    ball.vy = Math.sin(jitterAngle) * speed;
    enforceSpeed(ball);
    resetBallTrail(ball);
    playBounceSound(ball);
    if (particles.length < MAX_PARTICLES - 6 && Math.random() < getCollisionSparkChance()) {
        spawnBurst(ball.x, ball.y, ball.color, 3, 0.35);
    }
}
function getCollisionSparkChance() {
    if (balls.length > 120) {
        return 0.06;
    }
    if (balls.length > 60) {
        return 0.12;
    }
    return 0.24;
}
function collectTouchedPickups(ball) {
    for (let i = pickups.length - 1; i >= 0; i -= 1) {
        const pickup = pickups[i];
        const dist = length(ball.x - pickup.x, ball.y - pickup.y);
        if (dist > ball.radius + pickup.radius) {
            continue;
        }
        pickups.splice(i, 1);
        collectedPickupIds.add(pickup.id);
        collectedMultipliers += 1;
        playPickupSound(pickup);
        activateMultiplierPickup(ball, pickup);
        spawnBurst(pickup.x, pickup.y, pickup.color, PARTICLE_COUNT * 2, 1.25);
        lastProgressElapsed = runElapsed;
    }
}
function activateMultiplierPickup(source, pickup) {
    const liveBalls = balls.filter((ball) => ball.alive);
    const currentLiveBalls = liveBalls.length;
    const targetTotal = Math.min(MAX_BALLS, currentLiveBalls * pickup.factor);
    const ballsToAdd = Math.max(0, targetTotal - currentLiveBalls);
    spawnFloatingText(pickup.x, pickup.y, `${pickup.label} -> ${targetTotal} BALLS`, pickup.color);
    source.color = pickup.color;
    source.spin *= -1;
    for (let i = 0; i < ballsToAdd; i += 1) {
        const parent = liveBalls[Math.floor(Math.random() * liveBalls.length)] ?? source;
        const parentAngle = Math.atan2(parent.vy, parent.vx);
        const radialAngle = Math.atan2(parent.y - geometry.center.y, parent.x - geometry.center.x);
        const angle = parentAngle + randomBetween(-0.82, 0.82) + (Math.random() < 0.42 ? radialAngle * 0.08 : 0);
        const distance = geometry.ballRadius * randomBetween(1.6, 4.2);
        const offsetAngle = angle + randomBetween(-0.65, 0.65);
        const parentSpeed = clamp(length(parent.vx, parent.vy), MIN_SPEED * geometry.unit, MAX_SPEED * geometry.unit);
        const speed = clamp(parentSpeed * randomBetween(0.86, 1.2), MIN_SPEED * geometry.unit, MAX_SPEED * geometry.unit);
        const ball = createBall(
            parent.x + Math.cos(offsetAngle) * distance,
            parent.y + Math.sin(offsetAngle) * distance,
            angle,
            speed,
            colorFromPalette(elapsed, Math.random())
        );
        ball.spin = Math.random() < 0.5 ? -1 : 1;
        balls.push(ball);
    }
    const sourceSpeed = clamp(length(source.vx, source.vy), MIN_SPEED * geometry.unit, MAX_SPEED * geometry.unit);
    const sourceAngle = Math.atan2(source.vy, source.vx) + randomBetween(-0.28, 0.28);
    source.vx = Math.cos(sourceAngle) * sourceSpeed;
    source.vy = Math.sin(sourceAngle) * sourceSpeed;
    maxBallsReached = Math.max(maxBallsReached, balls.length);
}
function getOuterRingLineWidth() {
    return geometry.ringLineWidth * OUTER_RING_LINE_SCALE;
}
function resolveOuterBoundary(ball) {
    const dx = ball.x - geometry.center.x;
    const dy = ball.y - geometry.center.y;
    const dist = Math.max(0.001, length(dx, dy));
    const angle = Math.atan2(dy, dx);
    const outerLineWidth = getOuterRingLineWidth();
    const outerEdge = geometry.outerRadius + outerLineWidth / 2;
    const gapPadding = ball.radius / geometry.outerRadius + 0.018;
    if (isAngleInGap(angle, getOuterGapCenter(), getOuterGapSize(), gapPadding)) {
        if (dist + ball.radius > outerEdge) {
            triggerSuccess(ball);
        }
        return;
    }
    const collisionBand = outerLineWidth / 2 + ball.radius;
    if (Math.abs(dist - geometry.outerRadius) <= collisionBand) {
        bounceBallOffRadialSurface(ball, dx, dy, dist, geometry.outerRadius, collisionBand);
        return;
    }
    if (dist - ball.radius > outerEdge) {
        ball.alive = false;
        playDeathSound();
        spawnBurst(ball.x, ball.y, ball.color, PARTICLE_COUNT, 0.95);
    }
}
function triggerSuccess(ball) {
    if (state === "SUCCESS") {
        return;
    }
    state = "SUCCESS";
    playSuccessSound();
    const angle = Math.atan2(ball.y - geometry.center.y, ball.x - geometry.center.x);
    const edgeX = geometry.center.x + Math.cos(angle) * geometry.outerRadius;
    const edgeY = geometry.center.y + Math.sin(angle) * geometry.outerRadius;
    spawnBurst(edgeX, edgeY, "#ffffff", SUCCESS_CONFETTI, 1.65);
    spawnScreenConfetti(150, 1.0);
    spawnFloatingText(geometry.center.x, geometry.center.y - geometry.outerRadius * 0.34, "ESCAPE!", "#39ff88");
    shell.classList.remove("is-success-pulse");
    void shell.offsetWidth;
    shell.classList.add("is-success-pulse");
    window.setTimeout(() => shell.classList.remove("is-success-pulse"), 900);
    updateUi();
}
function pushTrail(ball) {
    if (TRAIL_MODE !== "subtle" || TRAIL_LENGTH <= 0) {
        ball.trail.length = 0;
        return;
    }
    const last = ball.trail[ball.trail.length - 1];
    if (last) {
        const dx = ball.x - last.x;
        const dy = ball.y - last.y;
        const minDistance = ball.radius * 0.42;
        if (dx * dx + dy * dy < minDistance * minDistance) {
            last.x = ball.x;
            last.y = ball.y;
            last.age = 0;
            return;
        }
    }
    ball.trail.push({ x: ball.x, y: ball.y, age: 0 });
    if (ball.trail.length > TRAIL_LENGTH) {
        ball.trail.splice(0, ball.trail.length - TRAIL_LENGTH);
    }
}
function resetBallTrail(ball) {
    ball.trail.length = 0;
    if (TRAIL_MODE === "subtle" && TRAIL_LENGTH > 0) {
        ball.trail.push({ x: ball.x, y: ball.y, age: 0 });
    }
}
function spawnBurst(x, y, color, count, power = 1) {
    const scaledCount = reserveParticleSlots(count);
    for (let i = 0; i < scaledCount; i += 1) {
        const angle = Math.random() * TAU;
        const speed = randomBetween(45, 260) * geometry.unit * power;
        particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: randomBetween(0.45, 1.08) * power,
            maxLife: randomBetween(0.65, 1.15) * power,
            size: randomBetween(2.2, 5.5) * geometry.unit * power,
            color: Math.random() < 0.72 ? color : randomBallColor(),
            shape: Math.random() < 0.34 ? "square" : Math.random() < 0.55 ? "triangle" : "circle"
        });
    }
}
function spawnScreenConfetti(count, power) {
    const scaledCount = reserveParticleSlots(count);
    for (let i = 0; i < scaledCount; i += 1) {
        const x = randomBetween(geometry.width * 0.12, geometry.width * 0.88);
        const y = randomBetween(geometry.height * 0.02, geometry.height * 0.28);
        const speed = randomBetween(80, 330) * geometry.unit * power;
        const angle = randomBetween(0.18 * Math.PI, 0.82 * Math.PI);
        particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: randomBetween(1.1, 2.6),
            maxLife: randomBetween(1.4, 2.8),
            size: randomBetween(2.5, 6.5) * geometry.unit,
            color: colorFromPalette(elapsed, Math.random()),
            shape: Math.random() < 0.5 ? "square" : "triangle"
        });
    }
}
function reserveParticleSlots(count) {
    const safeCount = Math.min(Math.max(0, Math.round(count)), MAX_PARTICLES);
    const overflow = particles.length + safeCount - MAX_PARTICLES;
    if (overflow > 0) {
        particles.splice(0, overflow);
    }
    return safeCount;
}
function spawnFloatingText(x, y, text, color) {
    floatingTexts.push({
        x,
        y,
        vy: -54 * geometry.unit,
        life: 1.05,
        maxLife: 1.05,
        text,
        color
    });
    if (floatingTexts.length > MAX_FLOATING_TEXTS) {
        floatingTexts.splice(0, floatingTexts.length - MAX_FLOATING_TEXTS);
    }
}
function updateParticles(dt) {
    let writeIndex = 0;
    for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        particle.life -= dt;
        if (particle.life <= 0) {
            continue;
        }
        particle.vy += 105 * geometry.unit * dt;
        particle.vx *= 0.992;
        particle.vy *= 0.992;
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particles[writeIndex] = particle;
        writeIndex += 1;
    }
    particles.length = writeIndex;
}
function updateFloatingTexts(dt) {
    let writeIndex = 0;
    for (let i = 0; i < floatingTexts.length; i += 1) {
        const item = floatingTexts[i];
        item.life -= dt;
        if (item.life <= 0) {
            continue;
        }
        item.y += item.vy * dt;
        item.vy *= 0.985;
        floatingTexts[writeIndex] = item;
        writeIndex += 1;
    }
    floatingTexts.length = writeIndex;
}
function updateTrails(dt) {
    if (TRAIL_MODE !== "subtle" || TRAIL_LENGTH <= 0) {
        for (const ball of balls) {
            ball.trail.length = 0;
        }
        return;
    }
    for (const ball of balls) {
        let writeIndex = 0;
        for (let i = 0; i < ball.trail.length; i += 1) {
            const point = ball.trail[i];
            point.age = (point.age ?? 0) + dt;
            if (point.age > TRAIL_POINT_TTL) {
                continue;
            }
            ball.trail[writeIndex] = point;
            writeIndex += 1;
        }
        ball.trail.length = writeIndex;
    }
}
function draw(timeSeconds) {
    drawBackground(timeSeconds);
    drawSpikes(timeSeconds);
    drawRings(timeSeconds);
    drawPickups(timeSeconds);
    drawTrails();
    drawBalls(timeSeconds);
    drawParticles();
    drawFloatingTexts();
    drawDebugOverlay();
}
function drawBackground(timeSeconds) {
    ctx.clearRect(0, 0, geometry.width, geometry.height);
    const bg = ctx.createRadialGradient(geometry.center.x, geometry.center.y, geometry.outerRadius * 0.1, geometry.center.x, geometry.center.y, geometry.outerRadius * 1.75);
    bg.addColorStop(0, "rgba(17, 20, 38, 0.94)");
    bg.addColorStop(0.46, "rgba(4, 5, 12, 0.98)");
    bg.addColorStop(1, "rgba(2, 2, 6, 1)");
    ctx.globalAlpha = clamp(BACKGROUND_FADE_ALPHA, 0, 1);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, geometry.width, geometry.height);
    ctx.globalAlpha = 1;
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.strokeStyle = colorFromPalette(timeSeconds, 0.15);
    ctx.lineWidth = 1;
    const spacing = 28 * geometry.unit;
    const offset = (timeSeconds * 10 * geometry.unit) % spacing;
    for (let x = -spacing + offset; x < geometry.width + spacing; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - geometry.height * 0.18, geometry.height);
        ctx.stroke();
    }
    ctx.restore();
    const halo = ctx.createRadialGradient(geometry.center.x, geometry.center.y, geometry.outerRadius * 0.6, geometry.center.x, geometry.center.y, geometry.outerRadius * 1.18);
    halo.addColorStop(0, "rgba(40, 247, 255, 0)");
    halo.addColorStop(0.72, "rgba(40, 247, 255, 0.075)");
    halo.addColorStop(1, "rgba(255, 75, 216, 0.04)");
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, geometry.width, geometry.height);
}
function drawSpikes(timeSeconds) {
    const baseRadius = geometry.outerRadius + geometry.ringLineWidth * 0.55;
    const tipRadius = geometry.outerRadius + geometry.spikeHeight;
    const step = TAU / SPIKE_COUNT;
    const gapCenter = getOuterGapCenter();
    const gapSize = getOuterGapSize();
    ctx.save();
    ctx.translate(geometry.center.x, geometry.center.y);
    ctx.globalAlpha = 0.82;
    ctx.shadowBlur = 0;
    for (let i = 0; i < SPIKE_COUNT; i += 1) {
        const angle = i * step;
        if (isAngleInGap(angle, gapCenter, gapSize + 0.26)) {
            continue;
        }
        const left = angle - step * 0.36;
        const right = angle + step * 0.36;
        const color = colorFromPalette(timeSeconds, i / SPIKE_COUNT);
        ctx.beginPath();
        ctx.moveTo(Math.cos(left) * baseRadius, Math.sin(left) * baseRadius);
        ctx.lineTo(Math.cos(angle) * tipRadius, Math.sin(angle) * tipRadius);
        ctx.lineTo(Math.cos(right) * baseRadius, Math.sin(right) * baseRadius);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }
    ctx.restore();
}
function drawRings(timeSeconds) {
    for (const ring of rings) {
        drawArcRing(ring, colorFromPalette(timeSeconds, ring.colorOffset), 1);
    }
    const outerRing = {
        radius: geometry.outerRadius,
        lineWidth: getOuterRingLineWidth(),
        gapCenterAngle: getOuterGapCenter(),
        gapSizeAngle: getOuterGapSize(),
        colorOffset: 0.98
    };
    drawArcRing(outerRing, colorFromPalette(timeSeconds, 0.98), 1.12);
    drawGapBeacon(outerRing, timeSeconds);
}
function drawArcRing(ring, color, glowScale) {
    const start = ring.gapCenterAngle + ring.gapSizeAngle / 2;
    const end = ring.gapCenterAngle - ring.gapSizeAngle / 2 + TAU;
    ctx.save();
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 18 * geometry.unit * glowScale;
    ctx.lineWidth = ring.lineWidth + 7 * geometry.unit;
    ctx.globalAlpha = 0.18;
    ctx.beginPath();
    ctx.arc(geometry.center.x, geometry.center.y, ring.radius, start, end);
    ctx.stroke();
    ctx.globalAlpha = 0.96;
    ctx.lineWidth = ring.lineWidth;
    ctx.beginPath();
    ctx.arc(geometry.center.x, geometry.center.y, ring.radius, start, end);
    ctx.stroke();
    ctx.globalAlpha = 0.92;
    ctx.strokeStyle = "rgba(255,255,255,0.68)";
    ctx.lineWidth = Math.max(1, ring.lineWidth * 0.26);
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(geometry.center.x, geometry.center.y, ring.radius, start, end);
    ctx.stroke();
    ctx.restore();
}
function drawGapBeacon(outerRing, timeSeconds) {
    const pulse = 0.5 + Math.sin(timeSeconds * 4.5) * 0.5;
    const left = outerRing.gapCenterAngle - outerRing.gapSizeAngle / 2;
    const right = outerRing.gapCenterAngle + outerRing.gapSizeAngle / 2;
    ctx.save();
    ctx.translate(geometry.center.x, geometry.center.y);
    ctx.strokeStyle = `rgba(255,255,255,${0.2 + pulse * 0.28})`;
    ctx.lineWidth = Math.max(1, 2.3 * geometry.unit);
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 13 * geometry.unit;
    for (const angle of [left, right]) {
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * (outerRing.radius - 10 * geometry.unit), Math.sin(angle) * (outerRing.radius - 10 * geometry.unit));
        ctx.lineTo(Math.cos(angle) * (outerRing.radius + 24 * geometry.unit), Math.sin(angle) * (outerRing.radius + 24 * geometry.unit));
        ctx.stroke();
    }
    ctx.restore();
}
function drawPickups(timeSeconds) {
    for (const pickup of pickups) {
        if (pickup.collected) {
            continue;
        }
        const pulse = 1 + Math.sin(timeSeconds * 5.2 + pickup.factor) * 0.055;
        const radius = pickup.radius * pulse;
        ctx.save();
        ctx.translate(pickup.x, pickup.y);
        ctx.fillStyle = "rgba(2, 2, 8, 0.82)";
        ctx.strokeStyle = pickup.color;
        ctx.lineWidth = 3 * geometry.unit;
        ctx.shadowColor = pickup.color;
        ctx.shadowBlur = 21 * geometry.unit;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, TAU);
        ctx.fill();
        ctx.stroke();
        ctx.globalAlpha = 0.34;
        ctx.lineWidth = 1.5 * geometry.unit;
        ctx.beginPath();
        ctx.arc(0, 0, radius + 7 * geometry.unit, 0, TAU);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 9 * geometry.unit;
        ctx.fillStyle = "#ffffff";
        ctx.font = `900 ${Math.round(15 * geometry.unit)}px Inter, ui-sans-serif, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(pickup.label, 0, 0.8 * geometry.unit);
        ctx.restore();
    }
}
function drawTrails() {
    if (TRAIL_MODE !== "subtle" || TRAIL_LENGTH <= 0) {
        return;
    }
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowBlur = 0;
    const trailAlpha = balls.length > 120 ? 0.035 : 0.055;
    const trailWidth = balls.length > 120 ? 0.34 : 0.48;
    for (const ball of balls) {
        if (ball.trail.length < 2) {
            continue;
        }
        const trail = ball.trail;
        ctx.strokeStyle = ball.color;
        for (let i = 1; i < trail.length; i += 1) {
            const previous = trail[i - 1];
            const point = trail[i];
            const ageFade = clamp(1 - (point.age ?? 0) / TRAIL_POINT_TTL, 0, 1);
            const segmentFade = i / (trail.length - 1);
            const alpha = trailAlpha * ageFade * segmentFade * segmentFade;
            if (alpha <= 0.002) {
                continue;
            }
            ctx.globalAlpha = alpha;
            ctx.lineWidth = Math.max(1, ball.radius * trailWidth * (0.45 + segmentFade * 0.55));
            ctx.beginPath();
            ctx.moveTo(previous.x, previous.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
        }
    }
    ctx.restore();
}
function drawBalls(timeSeconds) {
    ctx.shadowBlur = 0;
    const glowScale = BALL_GLOW_MODE === "cheap" ? 1 : 1.18;
    for (const ball of balls) {
        const pulse = 1 + Math.sin(timeSeconds * 7 + ball.x * 0.013) * 0.045;
        const radius = ball.radius * pulse;
        ctx.fillStyle = ball.color;
        ctx.globalAlpha = 0.13;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, radius * 2.35 * glowScale, 0, TAU);
        ctx.fill();
        ctx.globalAlpha = 0.24;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, radius * 1.55 * glowScale, 0, TAU);
        ctx.fill();
        ctx.globalAlpha = 0.98;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, radius, 0, TAU);
        ctx.fill();
        ctx.globalAlpha = 0.72;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(ball.x - radius * 0.33, ball.y - radius * 0.37, radius * 0.28, 0, TAU);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.lineWidth = Math.max(1, 1.2 * geometry.unit);
        ctx.strokeStyle = "rgba(255,255,255,0.72)";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, radius, 0, TAU);
        ctx.stroke();
    }
}
function drawParticles() {
    ctx.shadowBlur = 0;
    for (const particle of particles) {
        const alpha = clamp(particle.life / particle.maxLife, 0, 1);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        if (particle.shape === "circle") {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, TAU);
            ctx.fill();
        }
        else if (particle.shape === "square") {
            ctx.fillRect(particle.x - particle.size, particle.y - particle.size, particle.size * 2, particle.size * 2);
        }
        else {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y - particle.size * 1.3);
            ctx.lineTo(particle.x + particle.size * 1.2, particle.y + particle.size);
            ctx.lineTo(particle.x - particle.size * 1.2, particle.y + particle.size);
            ctx.closePath();
            ctx.fill();
        }
    }
    ctx.globalAlpha = 1;
}
function drawFloatingTexts() {
    for (const item of floatingTexts) {
        const progress = 1 - item.life / item.maxLife;
        const alpha = clamp(item.life / item.maxLife, 0, 1);
        const scale = 1 + Math.sin(progress * Math.PI) * 0.14;
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.scale(scale, scale);
        ctx.globalAlpha = alpha;
        ctx.font = `950 ${Math.round(17 * geometry.unit)}px Inter, ui-sans-serif, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.lineWidth = Math.max(3, 4 * geometry.unit);
        ctx.strokeStyle = "rgba(0,0,0,0.72)";
        ctx.shadowColor = item.color;
        ctx.shadowBlur = 18 * geometry.unit;
        ctx.strokeText(item.text, 0, 0);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(item.text, 0, 0);
        ctx.restore();
    }
}
function drawDebugOverlay() {
    if (!debugEnabled) {
        return;
    }
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(12, geometry.height - 156, 252, 138);
    ctx.fillStyle = "#ffffff";
    ctx.font = "12px ui-monospace, SFMono-Regular, Consolas, monospace";
    ctx.textBaseline = "top";
    ctx.fillText(`FPS: ${fps.toFixed(0)}`, 24, geometry.height - 144);
    ctx.fillText(`Balls: ${balls.length}/${MAX_BALLS}`, 24, geometry.height - 126);
    ctx.fillText(`Particles: ${particles.length}/${MAX_PARTICLES}`, 24, geometry.height - 108);
    ctx.fillText(`DPR: ${geometry.dpr.toFixed(2)} / Q: ${QUALITY}`, 24, geometry.height - 90);
    ctx.fillText(`Render: ${BALL_GLOW_MODE} / Trails: ${TRAIL_MODE}`, 24, geometry.height - 72);
    ctx.fillText(`Time: ${runElapsed.toFixed(1)}s`, 24, geometry.height - 54);
    ctx.fillText(`Level: ${getLevel().name}`, 24, geometry.height - 36);
    ctx.fillText(`Max radius: ${Math.round(maxRadiusReached)}`, 24, geometry.height - 18);
    ctx.restore();
}
function updateUi() {
    mapNameValue.textContent = getLevel().name;
    stateValue.textContent = state;
    ballCountValue.textContent = String(balls.length);
    pickupCountValue.textContent = String(collectedMultipliers);
    timeValue.textContent = `${runElapsed.toFixed(1)}s`;
    maxBallCountValue.textContent = String(maxBallsReached);
    actionButton.textContent = state === "READY" ? "Start" : "Restart";
    fullscreenButton.textContent = document.fullscreenElement ? "Exit Full" : "Fullscreen";
    soundButton.textContent = soundEnabled ? "Sound On" : "Sound Off";
    soundButton.setAttribute("aria-pressed", String(soundEnabled));
    musicButton.textContent = musicEnabled ? "Music On" : "Music Off";
    musicButton.setAttribute("aria-pressed", String(musicEnabled));
    musicButton.title = musicLoadFailed ? "Optional assets/music.mp3 was not loaded." : "Toggle background music.";
    if (state === "RUNNING") {
        centerMessage.classList.add("is-hidden");
        centerMessage.classList.remove("is-success", "is-game-over");
        return;
    }
    centerMessage.classList.remove("is-hidden");
    centerMessage.classList.toggle("is-success", state === "SUCCESS");
    centerMessage.classList.toggle("is-game-over", state === "GAME OVER");
    const title = centerMessage.querySelector("strong");
    const subtitle = centerMessage.querySelector("span");
    if (!title || !subtitle) {
        return;
    }
    title.textContent = state;
    if (state === "READY") {
        subtitle.textContent = "Click Start";
    }
    else if (state === "PAUSED") {
        subtitle.textContent = "Space to resume";
    }
    else if (state === "SUCCESS") {
        subtitle.textContent = `Final ${runElapsed.toFixed(1)}s - Max ${maxBallsReached} balls`;
    }
    else {
        subtitle.textContent = `Ended ${runElapsed.toFixed(1)}s - Max ${maxBallsReached} balls`;
    }
}
function startGame() {
    startAudioFromGesture();
    if (state !== "READY") {
        resetLevel("RUNNING");
        return;
    }
    state = "RUNNING";
    if (balls[0]) {
        spawnBurst(balls[0].x, balls[0].y, balls[0].color, PARTICLE_COUNT, 1.15);
    }
    updateUi();
}
function startNewRun() {
    startAudioFromGesture();
    resetLevel("RUNNING", true);
}
function nextMap() {
    startAudioFromGesture();
    levelIndex = (levelIndex + 1) % LEVELS.length;
    resetLevel("RUNNING");
}
function toggleFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen?.();
        return;
    }
    shell.requestFullscreen?.();
}
function togglePauseOrStart() {
    if (state === "READY") {
        startGame();
    }
    else if (state === "RUNNING") {
        state = "PAUSED";
        updateUi();
    }
    else if (state === "PAUSED") {
        startAudioFromGesture();
        state = "RUNNING";
        updateUi();
    }
    else {
        startAudioFromGesture();
        resetLevel("RUNNING");
    }
}
function loop(now) {
    const dt = Math.min((now - lastTime) / 1000, MAX_FRAME_DT);
    lastTime = now;
    fps = lerp(fps, 1 / Math.max(dt, 0.0001), 0.08);
    accumulator += dt;
    let steps = 0;
    while (accumulator >= FIXED_DT && steps < 8) {
        update(FIXED_DT);
        accumulator -= FIXED_DT;
        steps += 1;
    }
    if (steps >= 8) {
        accumulator = 0;
    }
    draw(now / 1000);
    requestAnimationFrame(loop);
}
actionButton.addEventListener("click", () => {
    startGame();
});
newRunButton.addEventListener("click", () => {
    startNewRun();
});
nextMapButton.addEventListener("click", () => {
    nextMap();
});
fullscreenButton.addEventListener("click", () => {
    toggleFullscreen();
});
soundButton.addEventListener("click", () => {
    toggleSound();
});
musicButton.addEventListener("click", () => {
    toggleMusic();
});
document.addEventListener("fullscreenchange", () => {
    updateUi();
});
window.addEventListener("keydown", (event) => {
    if (event.repeat) {
        return;
    }
    if (event.code === "Space") {
        event.preventDefault();
        togglePauseOrStart();
    }
    else if (event.key.toLowerCase() === "r") {
        startAudioFromGesture();
        resetLevel("RUNNING");
    }
    else if (event.key.toLowerCase() === "d") {
        debugEnabled = !debugEnabled;
    }
});
if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);
}
else {
    window.addEventListener("resize", resizeCanvas);
}
window.addEventListener("beforeunload", () => {
    resizeObserver?.disconnect();
});
resizeCanvas();
resetLevel("READY");
requestAnimationFrame(loop);
})();
