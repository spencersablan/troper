import { Genders } from "../firebase/firebase-db";

const pronounsRegex = {
	he: /\bhe\b/gi,
	she: /\bshe\b/gi,
	him: /\bhim\b/gi,
	her: /\bher\b/gi,
	his: /\bhis\b/gi,
	hers: /\bhers\b/gi,
};

export const PronounService = {
	toDB(string: string, studentFirstName?: string): string {
		const firstNameRegex = new RegExp(`\\b${studentFirstName}`, "gi");

		string = string
			.replace(pronounsRegex.he, "{{he}}")
			.replace(pronounsRegex.she, "{{he}}")
			.replace(pronounsRegex.him, "{{him}}")
			.replace(pronounsRegex.her, "{{him}}")
			.replace(pronounsRegex.his, "{{his}}")
			.replace(pronounsRegex.hers, "{{his}}")
			.replace(firstNameRegex, "{{firstName}}");

		return string;
	},
	toClient(string: string, studentGender: string, studentFirstName?: string): string {
		const isMale = studentGender === Genders.male;
		string = string
			.replace(/{{he}}/g, isMale ? "he" : "she")
			.replace(/{{him}}/g, isMale ? "him" : "her")
			.replace(/{{his}}/g, isMale ? "his" : "hers")
			.replace(/{{firstName}}/g, studentFirstName);

		string = string.charAt(0).toUpperCase() + string.slice(1);

		return string;
	},
};
