export interface ZodiacInfo {
  nameEn: string;
  nameNe: string;
  symbol: string;
  element: string;
  elementNe: string;
  gana: string;
  ganaNe: string;
  deity: string;
  deityNe: string;
  planet: string;
  planetNe: string;
  luckyColor: string;
  luckyColorNe: string;
  gemstone: string;
  gemstoneNe: string;
  luckyNumbers: number[];
  luckyDays: string[];
  luckyDaysNe: string[];
  traits: string[];
  traitsNe: string[];
  compatibility: string[];
  compatibilityNe: string[];
  direction: string;
  directionNe: string;
  metal: string;
  metalNe: string;
  flower: string;
  flowerNe: string;
}

export interface DrawerState {
  isOpen: boolean;
  selectedZodiac: string;
}