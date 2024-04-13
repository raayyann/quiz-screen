const URL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000/";

const res = await fetch(URL + "sounds");
const data = await res.json();

export const sounds: Record<string, HTMLAudioElement> = {};

data.sounds.forEach((sound: string) => {
  sounds[sound] = new Audio(URL + "sound/" + sound);
});
