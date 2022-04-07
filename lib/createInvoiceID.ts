const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";

const createInvoiceID = () => {
	return Array.from({ length: 6 }, (_, index) => {
		if (index < 2) {
			return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
		} else {
			return NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
		}
	}).join("");
};

export default createInvoiceID;
