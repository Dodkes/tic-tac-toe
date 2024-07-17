import i18next from "i18next"
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		fallbackLng: 'en',
		resources: {
			en: {
				translation: {
					language: 'Language',
					en: 'English',
					sk: 'Slovak',
					gameName: 'Tic-Tac-Toe',
					player1: 'Player 1',
					player1Name: 'Username 1',
					player2: 'Player 2',
					player2Name: 'Username 2',
					submit: 'Submit',
					player1MinSymbol: 'Player 1 name must contain at least ',
					player2MinSymbol: 'Player 2 name must contain at least ',
					player1MaxSymbol: 'Player 1 name length exceeded',
					player2MaxSymbol: 'Player 2 name length exceeded',
					playerMatch: 'Usernames must not match',
					symbol: 'symbols',
					winner: 'Winner is',
					draw: 'Draw',
					turn: 'Next turn',
					playButton: 'Play again',
					scoreBoard: 'Current game',
					role: 'Role',
					player: 'Player',
					photo: 'Photo',
					delete: 'Delete',
					profile: 'profile',
					select: 'Select',
					play: 'Play'
				}
			},
			sk: {
				translation: {
					language: 'Jazyk',
					en: 'Anglický',
					sk: 'Slovenský',
					gameName: 'Piškôrky',
					player1: 'Hráč 1',
					player1Name: 'Meno hráča 1',
					player2: 'Hráč 2',
					player2Name: 'Meno hráča 2',
					submit: 'Potvrdiť',
					player1MinSymbol: 'Meno hráča 1 musí obsahovat aspoň ',
					player2MinSymbol: 'Meno hráča 2 musí obsahovat aspoň ',
					player1MaxSymbol: 'Meno hráča 1 presahuje',
					player2MaxSymbol: 'Meno hráča 2 presahuje',
					playerMatch: 'Mena hráčov sa nesmú zhodovať',
					symbol: 'symboly',
					winner: 'Víťaz',
					draw: 'Remíza',
					turn: 'Ďalší ťah',
					playButton: 'Nová hra',
					scoreBoard: 'Aktuálna hra',
					role: 'Rola',
					player: 'Hráč',
					photo: 'Fotka',
					delete: 'Vymazať',
					profile: 'profil',
					select: 'Vybrať',
					play: 'Hrať'
				}
			}
		}
	})