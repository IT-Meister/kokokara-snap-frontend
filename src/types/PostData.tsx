// src/types/PostData.tsx
export interface PostData {
  id: number;
  user_id: number;
  url: string;
  title: string;
  prefecture: number;
  city_name: string;
  description: string;
  brand: string;
  camera_name: string;
  latitude: number;
  longitude: number;
  snap_time: string;
  angle: number;
  iso: string;
  shutter_speed: string;
  f_value: number;
}
