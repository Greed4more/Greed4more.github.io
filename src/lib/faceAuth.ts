import * as faceapi from 'face-api.js';

const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';

let modelsLoaded = false;
let loadingPromise: Promise<void> | null = null;

export async function loadFaceModels(): Promise<void> {
  if (modelsLoaded) return;
  if (loadingPromise) return loadingPromise;
  loadingPromise = (async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);
    modelsLoaded = true;
  })();
  return loadingPromise;
}

export async function getFaceDescriptor(
  video: HTMLVideoElement
): Promise<Float32Array | null> {
  const result = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 }))
    .withFaceLandmarks()
    .withFaceDescriptor();
  return result?.descriptor ?? null;
}

export function euclideanDistance(a: Float32Array, b: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const d = a[i] - b[i];
    sum += d * d;
  }
  return Math.sqrt(sum);
}

export type StoredUser = {
  email: string;
  name: string;
  descriptor: number[];
  createdAt: number;
};

const USERS_KEY = 'smartbin_face_users';
const SESSION_KEY = 'smartbin_face_session';

export function getUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveUser(user: StoredUser): void {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findMatch(
  descriptor: Float32Array,
  threshold = 0.5
): { user: StoredUser; distance: number } | null {
  const users = getUsers();
  let best: { user: StoredUser; distance: number } | null = null;
  for (const u of users) {
    const dist = euclideanDistance(descriptor, new Float32Array(u.descriptor));
    if (!best || dist < best.distance) best = { user: u, distance: dist };
  }
  if (best && best.distance <= threshold) return best;
  return null;
}

export function setSession(email: string): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email, at: Date.now() }));
}

export function getSession(): { email: string; at: number } | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
