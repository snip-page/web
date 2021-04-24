import Snip from '.'
import getExtension from './extension'

const getLanguage = (snip: Snip) => {
	switch (getExtension(snip)) {
		case 'asm':
			return 45 // Assembly (NASM 2.14.02)
		case 'sh':
		case 'bash':
			return 46 // Bash (5.0.0)
		case 'sbl':
		case 'bas':
			return 47 // Basic (FBC 1.07.1)
		case 'c':
		case 'h':
		case 'ino':
			return 50 // C (GCC 9.2.0)
		case 'cs':
			return 51 // C# (Mono 6.6.0.161)
		case 'cpp':
		case 'c++':
		case 'cc':
		case 'cxx':
		case 'hpp':
		case 'h++':
		case 'hh':
		case 'hxx':
			return 54 // C++ (GCC 9.2.0)
		case 'cl':
		case 'lisp':
		case 'el':
			return 55 // Common Lisp (SBCL 2.0.0)
		case 'd':
			return 56 // D (DMD 2.089.1)
		case 'ex':
		case 'exs':
			return 57 // Elixir (1.9.4)
		case 'erl':
			return 58 // Erlang (OTP 22.2)
		case 'f':
		case 'for':
		case 'f77':
		case 'f90':
		case 'f95':
			return 59 // Fortran (GFortran 9.2.0)
		case 'go':
			return 60 // Go (1.13.5)
		case 'hs':
			return 61 // Haskell (GHC 8.8.1)
		case 'java':
			return 62 // Java (OpenJDK 13.0.1)
		case 'js':
			return 63 // JavaScript (Node.js 12.14.0)
		case 'lua':
			return 64 // Lua (5.3.5)
		case 'ml':
		case 'mli':
		case 'mll':
		case 'mly':
			return 65 // OCaml (4.09.0)
		case 'p':
		case 'pas':
			return 67 // Pascal (FPC 3.0.4)
		case 'php':
		case 'php3':
		case 'php4':
		case 'php5':
		case 'php7':
		case 'phtml':
			return 68 // PHP (7.4.1)
		case 'build':
		case 'bzl':
		case 'py':
		case 'pyw':
			return 71 // Python (3.8.1)
		case 'rb':
			return 72 // Ruby (2.7.0)
		case 'rs':
			return 73 // Rust (1.40.0)
		case 'ts':
			return 74 // TypeScript (3.7.4)
		case 'cob':
		case 'cpy':
			return 77 // COBOL (GnuCOBOL 2.2)
		case 'kt':
			return 78 // Kotlin (1.3.70)
		case 'm':
			return 79 // Objective-C (Clang 7.0.1)
		case 'r':
			return 80 // R (4.0.0)
		case 'scala':
			return 81 // Scala (2.13.2)
		case 'sql':
			return 82 // SQL (SQLite 3.27.2)
		case 'swift':
			return 83 // Swift (5.2.3)
		case 'vb':
		case 'cls':
			return 84 // Visual Basic.Net (vbnc 0.0.0.5943)
		case 'pl':
		case 'pm':
			return 85 // Perl (5.28.1)
		case 'clj':
		case 'cljc':
		case 'cljx':
			return 86 // Clojure (1.10.1)
		case 'fs':
			return 87 // F# (.NET Core SDK 3.1.202)
		case 'groovy':
		case 'gradle':
			return 88 // Groovy (3.0.3)
		default:
			return null
	}
}

export default getLanguage
