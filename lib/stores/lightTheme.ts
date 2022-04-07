import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const lightTheme = createSlice({
	name: "lightTheme",
	initialState: false,
	reducers: {
		toggleTheme: (state) => {
			const flipped = !state;
			localStorage.setItem("lightTheme", `${flipped}`);
			return flipped;
		},
		setLightTheme: (_, action: PayloadAction<boolean>) => action.payload,
	},
});

export const { toggleTheme, setLightTheme } = lightTheme.actions;

export default lightTheme;
