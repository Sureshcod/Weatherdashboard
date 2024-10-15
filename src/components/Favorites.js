import React from "react";

const Favorites = ({ favorites, deleteFavorite }) => {
  return (
    <div>
      <h2 class="mb-2 text-lg font-semibold text-black dark:text-black">
        Favorite City
      </h2>
      {favorites.length > 0 ? (
        <ul class="max-w-md space-y-1 m-2 text-black  list-inside dark:text-black list-none">
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              <h3>{favorite.name}</h3>
              <p>Temperature: {favorite.weatherData.main.temp}°C</p>
              <p>Description: {favorite.weatherData.weather[0].description}</p>
              <button
                class="text-black bg-white from-red-400 via-red-500 m-2 to-red-600 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={() => deleteFavorite(favorite.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default Favorites;
