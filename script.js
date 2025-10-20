// ===========================
// THEME SWITCHER
// ===========================

// Get theme toggle button
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
}

// Group helper: the custom Enter is now a single unified key
function getEnterGroup() {
    const enterEl = document.querySelector('[data-key="Enter"]');
    return enterEl ? [enterEl] : [];
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update icon and save preference
    if (body.classList.contains('dark-mode')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// Ensure mouse interactions on the Enter key work correctly
(() => {
    const group = getEnterGroup();
    if (group.length >= 1) {
        group.forEach(el => {
            el.addEventListener('mousedown', () => group.forEach(g => g.classList.add('active')));
            el.addEventListener('mouseup', () => group.forEach(g => g.classList.remove('active')));
            el.addEventListener('mouseleave', () => group.forEach(g => g.classList.remove('active')));
        });
    }
})();

// ===========================
// KEYBOARD INTERACTION
// ===========================

// Get all keyboard keys
const keys = document.querySelectorAll('.key');

// Key mapping for special keys and symbols
const keyMap = {
    // Special keys
    ' ': ' ',
    'Escape': 'Escape',
    'Tab': 'Tab',
    'CapsLock': 'CapsLock',
    'Shift': 'ShiftLeft',
    'Control': 'ControlLeft',
    'Alt': 'AltLeft',
    'Meta': 'MetaLeft',
    'Enter': 'Enter',
    'Backspace': 'Backspace',
    'Delete': 'Delete',
    'Insert': 'Insert',
    'Home': 'Home',
    'End': 'End',
    'PageUp': 'PageUp',
    'PageDown': 'PageDown',
    'ArrowUp': 'ArrowUp',
    'ArrowDown': 'ArrowDown',
    'ArrowLeft': 'ArrowLeft',
    'ArrowRight': 'ArrowRight',
    'ContextMenu': 'ContextMenu',
    
    // Function keys
    'F1': 'F1', 'F2': 'F2', 'F3': 'F3', 'F4': 'F4',
    'F5': 'F5', 'F6': 'F6', 'F7': 'F7', 'F8': 'F8',
    'F9': 'F9', 'F10': 'F10', 'F11': 'F11', 'F12': 'F12',
    
    // Lock keys
    'NumLock': 'NumLock',
    'ScrollLock': 'ScrollLock',
    'Pause': 'Pause',
    'PrintScreen': 'PrintScreen',
    
    // Numpad
    'NumpadDivide': 'NumpadDivide',
    'NumpadMultiply': 'NumpadMultiply',
    'NumpadSubtract': 'NumpadSubtract',
    'NumpadAdd': 'NumpadAdd',
    'NumpadEnter': 'NumpadEnter',
    'NumpadDecimal': 'NumpadDecimal',
    'Numpad0': 'Numpad0',
    'Numpad1': 'Numpad1',
    'Numpad2': 'Numpad2',
    'Numpad3': 'Numpad3',
    'Numpad4': 'Numpad4',
    'Numpad5': 'Numpad5',
    'Numpad6': 'Numpad6',
    'Numpad7': 'Numpad7',
    'Numpad8': 'Numpad8',
    'Numpad9': 'Numpad9'
};

// Function to find key element by key code
function findKeyElement(keyCode) {
    // Direct match by data-key attribute
    let keyElement = document.querySelector(`[data-key="${keyCode}"]`);
    
    if (keyElement) {
        return keyElement;
    }
    
    // Try to find by key character (for letter and number keys)
    const key = keyCode.replace('Key', '').replace('Digit', '');
    keyElement = document.querySelector(`[data-key="${key}"]`);
    
    if (keyElement) {
        return keyElement;
    }
    
    // Handle special cases
    if (keyCode === 'Space') {
        return document.querySelector('[data-key=" "]');
    }
    
    // Handle shift keys
    if (keyCode === 'ShiftRight') {
        return document.querySelector('[data-key="ShiftRight"]');
    }
    if (keyCode === 'ShiftLeft') {
        return document.querySelector('[data-key="ShiftLeft"]');
    }
    
    // Handle control keys
    if (keyCode === 'ControlRight') {
        return document.querySelector('[data-key="ControlRight"]');
    }
    if (keyCode === 'ControlLeft') {
        return document.querySelector('[data-key="ControlLeft"]');
    }
    
    // Handle alt keys
    if (keyCode === 'AltRight') {
        return document.querySelector('[data-key="AltRight"]');
    }
    if (keyCode === 'AltLeft') {
        return document.querySelector('[data-key="AltLeft"]');
    }
    
    // Handle meta/win keys
    if (keyCode === 'MetaRight') {
        return document.querySelector('[data-key="MetaRight"]');
    }
    if (keyCode === 'MetaLeft') {
        return document.querySelector('[data-key="MetaLeft"]');
    }
    
    return null;
}

// Physical keyboard key press
document.addEventListener('keydown', (event) => {
    // Special handling: only the main Enter should highlight the ISO Enter key
    if (event.code === 'Enter') {
        getEnterGroup().forEach(el => el.classList.add('active'));
        return;
    }

    // Special handling for Windows (Meta) keys: some browsers/OS won't deliver keyup,
    // causing the key to remain highlighted. Flash it briefly instead.
    if (event.code === 'MetaLeft' || event.code === 'MetaRight') {
        const metaEl = findKeyElement(event.code);
        if (metaEl) {
            metaEl.classList.add('active');
            setTimeout(() => metaEl.classList.remove('active'), 150);
        }
        return;
    }

    const keyElement = findKeyElement(event.code);
    if (keyElement && !keyElement.classList.contains('active')) {
        keyElement.classList.add('active');
    }
    
    // Prevent default behavior for certain keys to avoid page scrolling/navigation
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.code)) {
        event.preventDefault();
    }
});

// Physical keyboard key release
document.addEventListener('keyup', (event) => {
    // Special handling for Enter group (main Enter only)
    if (event.code === 'Enter') {
        getEnterGroup().forEach(el => el.classList.remove('active'));
        return;
    }

    const keyElement = findKeyElement(event.code);
    if (keyElement) {
        keyElement.classList.remove('active');
    }
});

// Ensure no key remains highlighted if the window loses focus or the tab is hidden
function clearAllActiveKeys() {
    document.querySelectorAll('.key.active').forEach(k => k.classList.remove('active'));
}

window.addEventListener('blur', clearAllActiveKeys);
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') {
        clearAllActiveKeys();
    }
});

// ===========================
// MOUSE INTERACTION
// ===========================

// Mouse click on keys
keys.forEach(key => {
    // Click event - toggle active state
    key.addEventListener('mousedown', () => {
        key.classList.add('active');
    });
    
    key.addEventListener('mouseup', () => {
        key.classList.remove('active');
    });
    
    // Remove active state if mouse leaves while pressed
    key.addEventListener('mouseleave', () => {
        key.classList.remove('active');
    });
});

// ===========================
// PREVENT CONTEXT MENU ON KEYS
// ===========================
keys.forEach(key => {
    key.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

// ===========================
// FULLSCREEN ON DOUBLE CLICK
// ===========================

// Add fullscreen functionality when double-clicking the document
let lastClickTime = 0;
const doubleClickDelay = 300; // milliseconds

document.addEventListener('click', (event) => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime;
    
    if (timeDiff < doubleClickDelay && timeDiff > 0) {
        // Double click detected
        toggleFullscreen();
    }
    
    lastClickTime = currentTime;
});

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// ===========================
// ACCESSIBILITY
// ===========================

// Allow keyboard navigation for theme toggle
themeToggle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        themeToggle.click();
    }
});

// ===========================
// LOCK INDICATORS
// ===========================
const lockMap = {
    CapsLock: document.querySelector('.lock-indicator[data-lock="CapsLock"]'),
    NumLock: document.querySelector('.lock-indicator[data-lock="NumLock"]'),
    ScrollLock: document.querySelector('.lock-indicator[data-lock="ScrollLock"]')
};

function updateLockIndicators(e) {
    // Prefer modifier state when available
    const capsOn = e?.getModifierState ? e.getModifierState('CapsLock') : false;
    const numOn = e?.getModifierState ? e.getModifierState('NumLock') : false;
    const scrollOn = e?.getModifierState ? e.getModifierState('ScrollLock') : false;
    if (lockMap.CapsLock) lockMap.CapsLock.classList.toggle('active', !!capsOn);
    if (lockMap.NumLock) lockMap.NumLock.classList.toggle('active', !!numOn);
    if (lockMap.ScrollLock) lockMap.ScrollLock.classList.toggle('active', !!scrollOn);
}

// Initialize once on load using a synthetic event to query states
window.addEventListener('load', () => {
    // Create a dummy KeyboardEvent to call getModifierState safely
    const evt = new KeyboardEvent('keydown');
    updateLockIndicators(evt);
});

// Update on any key interaction
document.addEventListener('keydown', updateLockIndicators);
document.addEventListener('keyup', updateLockIndicators);

// ===========================
// CONSOLE MESSAGE
// ===========================
console.log('%c🎹 Interactive Keyboard Loaded! 🎹', 'color: #4a90e2; font-size: 16px; font-weight: bold;');
console.log('%cFeatures:', 'color: #2c3e50; font-size: 14px; font-weight: bold;');
console.log('✓ Physical keyboard interaction');
console.log('✓ Mouse click and hover effects');
console.log('✓ Light/Dark theme switcher');
console.log('✓ Fully responsive design');
console.log('✓ Double-click anywhere for fullscreen');
console.log('%cTip: Press any key on your keyboard to see it highlight!', 'color: #4a90e2; font-style: italic;');