import React, { useContext } from "react";
import PokemonContext from "../contexts/PokemonContext";

const BattleResults = () => {
  const { state } = useContext(PokemonContext); // Access the PokemonContext

  // Calculate total points
  let userPoints = 0;
  let computerPoints = 0;

  state.battleResults.forEach((result) => {
    if (result.result === "You win!") {
      userPoints += 10; // User gains 10 points for a win
      computerPoints -= 10; // Computer loses 10 points for the user's win
    } else if (result.result === "You lose!") {
      computerPoints += 10; // Computer gains 10 points for a win
      userPoints -= 10; // User loses 10 points for losing
    }
    // No points change for a tie
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Battle Results</h2>
      {state.battleResults.length === 0 ? (
        <p>No battle results yet.</p>
      ) : (
        <ul className="list-disc pl-5">
          {state.battleResults.map((result, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">{result.player}</span> vs{" "}
              <span className="font-semibold">{result.computer}</span>:{" "}
              <span
                className={`text-${
                  result.result === "You win!"
                    ? "green"
                    : result.result === "You lose!"
                    ? "red"
                    : "gray"
                }-600`}
              >
                {result.result}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Display Total Points */}
      <div className="mt-4">
        <h3 className="text-xl font-bold">Total Points</h3>
        <p className="font-semibold">User: {userPoints}</p>
        <p className="font-semibold">Computer: {computerPoints}</p>

        {/* Display Final Result */}
        <h3 className="text-xl font-bold mt-2">Final Result</h3>
        {userPoints > computerPoints ? (
          <p className="text-green-600">User is winning!</p>
        ) : userPoints < computerPoints ? (
          <p className="text-red-600">Computer is winning!</p>
        ) : (
          <p className="text-gray-600">It's a tie!</p>
        )}
      </div>
    </div>
  );
};

export default BattleResults;
