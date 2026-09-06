export interface InstalledApp {
	id: "letter-lerner" | "arithmetic";
	label: string;
	origin: string;
	entryPath: string;
	healthPath: string;
	bridgeVersion: 1;
}
export const APP_LABELS = {
	text: "Texten",
	math: "Rechnen",
	letters: "Schreibspiel",
} as const;
export type DesktopApp = keyof typeof APP_LABELS;
