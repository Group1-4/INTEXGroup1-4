import React from "react";

type CategoryFilterProps = {
  selected: string[];
  onChange: (newSelected: string[]) => void;
};

const allCategoryFields = [
  "action", "adventure", "animeSeriesInternationalTVShows", "britishTVShowsDocuseriesInternationalTVShows",
  "children", "comedies", "comediesDramasInternationalMovies", "comediesInternationalMovies",
  "comediesRomanticMovies", "crimeTVShowsDocuseries", "documentaries", "documentariesInternationalMovies",
  "docuseries", "dramas", "dramasInternationalMovies", "dramasRomanticMovies", "familyMovies", "fantasy",
  "horrorMovies", "internationalMoviesThrillers", "internationalTVShowsRomanticTVDramas",
  "kidsTV", "languageTVShows", "musicals", "natureTV", "realityTV", "spirituality", "tvAction",
  "tvComedies", "tvDramas", "talkShowsTVComedies", "thrillers"
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selected, onChange }) => {
  const toggleCategory = (category: string) => {
    const newSelected = selected.includes(category)
      ? selected.filter((c) => c !== category)
      : [...selected, category];
    onChange(newSelected);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4">
      {allCategoryFields.map((category) => (
        <label key={category} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selected.includes(category)}
            onChange={() => toggleCategory(category)}
          />
          <span className="capitalize">{category.replace(/([A-Z])/g, " $1")}</span>
        </label>
      ))}
    </div>
  );
};

export default CategoryFilter;
