// Generate a simple device fingerprint for user identification
export function getDeviceFingerprint(): string {
  // Check if we already have a device ID
  const existingId = localStorage.getItem("device_id");
  if (existingId) return existingId;

  // Generate a new device ID based on browser properties
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  let canvasHash = "";

  if (ctx) {
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.fillText("fingerprint", 2, 2);
    canvasHash = canvas.toDataURL().slice(-50);
  }

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth,
    screen.width + "x" + screen.height,
    new Date().getTimezoneOffset(),
    canvasHash,
    Date.now(), // Add timestamp to make it unique
    Math.random(), // Add randomness
  ].join("|");

  // Create a simple hash
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  const deviceId = `device_${Math.abs(hash)}_${Date.now()}`;

  // Store it for future use
  localStorage.setItem("device_id", deviceId);

  return deviceId;
}

// Get stored player name for this device
export function getStoredPlayerName(): string | null {
  return localStorage.getItem("player_name");
}

// Store player name for this device
export function storePlayerName(name: string): void {
  localStorage.setItem("player_name", name);
}
