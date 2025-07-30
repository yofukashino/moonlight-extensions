import { MediaEngineStore } from "@moonlight-mod/wp/common_stores";

type VolumeRecord = { localVolumes: Record<string, number> };
type AudioContextSettings = Record<"user" | "stream", Record<string, { volume?: number }>>;

export function _cleanseVolumes(audioContextSettings: AudioContextSettings) {
  const userSettings: VolumeRecord = MediaEngineStore.getSettings("default");
  const streamSettings: VolumeRecord = MediaEngineStore.getSettings("stream");
  for (const userId in audioContextSettings.user) {
    const localUserVolume = userSettings.localVolumes[userId];
    if (localUserVolume > 199) {
      audioContextSettings.user[userId] ??= { volume: localUserVolume };
      audioContextSettings.user[userId].volume = localUserVolume;
    }
  }
  for (const userId in audioContextSettings.stream) {
    if (streamSettings.localVolumes[userId] > 199) {
      audioContextSettings.stream[userId] ??= {};
      audioContextSettings.stream[userId].volume = streamSettings.localVolumes[userId];
    }
  }
  return audioContextSettings;
}
