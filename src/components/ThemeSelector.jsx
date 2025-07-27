// src/components/ThemeSelector.jsx
import { useTheme } from "../context/ThemeContext";
import { FaPalette, FaFont } from "react-icons/fa";

const ThemeSelector = () => {
  const { theme, toggleTheme, font, toggleFont } = useTheme();

  const fontOptions = [
    "Inter",
    "Roboto",
    "Open Sans",
    "Montserrat",
    "Poppins",
    "Lato",
    "Nunito",
    "Raleway",
    "Ubuntu",
    "Merriweather",
    "Playfair Display",
    "Work Sans",
    "Source Sans Pro",
    "DM Sans",
    "Fira Sans",
    "Titillium Web",
    "Noto Sans",
    "Quicksand",
    "Josefin Sans",
    "Rubik",
    "Karla",
    "Mulish",
    "Heebo",
    "Cabin",
    "Manrope",
    "PT Sans",
    "Oxygen",
    "Asap",
    "Assistant",
    "Barlow",
    "Exo 2",
    "Hind",
    "Signika",
    "IBM Plex Sans",
    "Mukta",
    "Tajawal",
    "Varela Round",
    "Catamaran",
    "Public Sans",
    "Cairo",
    "Spartan",
    "Overpass",
    "Questrial",
    "Be Vietnam Pro",
    "Lexend",
    "Anton",
    "Zilla Slab",
    "Arimo",
    "Prompt",
    "DM Serif Display",
    "Bebas Neue",
    "Teko",
    "Urbanist",
    "Archivo",
    "Arvo",
    "Lora",
    "Inconsolata",
    "Chivo",
    "M PLUS 1p",
    "Acme",
    "Saira",
    "Kanit",
    "Righteous",
    "Bitter",
    "Caveat",
    "Dosis",
    "Yanone Kaffeesatz",
    "Abel",
    "Crimson Text",
    "Sora",
    "Cormorant Garamond",
    "Barlow Condensed",
    "Dancing Script",
    "Pacifico",
    "Orbitron",
    "Indie Flower",
    "Frank Ruhl Libre",
    "Alata",
    "Amaranth",
    "Exo",
    "Vollkorn",
    "Tinos",
    "Kumbh Sans",
    "Raleway Dots",
    "Baloo 2",
    "Rajdhani",
    "Edu SA Beginner",
    "Candal",
    "Noto Serif",
    "Itim",
    "Balsamiq Sans",
    "Yantramanav",
    "Muli",
    "EB Garamond",
    "Fugaz One",
    "Patrick Hand",
    "Press Start 2P",
    "Special Elite",
    "Carter One",
    "Red Hat Display",
    "Amatic SC",
    "Unica One",
    "Chakra Petch",
    "Rokkitt",
    "Lobster",
    "Satisfy",
    "Great Vibes",
    "Cinzel"
  ];

  const themeOptions = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
    "caramellatte",
    "abyss",
    "silk"
  ];

  return (
    <div className="space-y-4">
      {/* Font Selector */}
      <div className="form-control">
        <label className="label">
          <span className="label-text flex items-center gap-2">
            <FaFont className="text-primary" />
            Font Family
          </span>
        </label>
        <select
          className="select select-bordered w-full"
          value={font}
          onChange={(e) => toggleFont(e.target.value)}
          style={{ fontFamily: font }}
        >
          {fontOptions.map((fontOption) => (
            <option 
              key={fontOption} 
              value={fontOption}
              style={{ fontFamily: fontOption }}
            >
              {fontOption}
            </option>
          ))}
        </select>
      </div>

      {/* Theme Selector */}
      <div className="form-control">
        <label className="label">
          <span className="label-text flex items-center gap-2">
            <FaPalette className="text-primary" />
            Theme
          </span>
        </label>
        <select
          className="select select-bordered w-full"
          value={theme}
          onChange={(e) => toggleTheme(e.target.value)}
        >
          {themeOptions.map((themeOption) => (
            <option key={themeOption} value={themeOption}>
              {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Theme Preview Grid (Optional) */}
      <div className="grid grid-cols-5 gap-2 mt-4">
        {themeOptions.slice(0, 10).map((themeOption) => (
          <button
            key={themeOption}
            onClick={() => toggleTheme(themeOption)}
            className="btn btn-xs capitalize"
            data-theme={themeOption}
            title={themeOption}
          >
            <span className="flex-1 text-xs">{themeOption.charAt(0)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;