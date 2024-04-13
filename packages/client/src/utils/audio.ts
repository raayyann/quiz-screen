const URL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000/";

export const sounds: Record<string, HTMLAudioElement> = {};

fetch(URL + "sounds").then((res) => {
  res.json().then((data) => {
    data.sounds.forEach((sound: string) => {
      sounds[sound] = new Audio(URL + "sounds/" + sound + ".mp3");
    });
  });
});
