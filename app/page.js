"use client"; // Mark this as a Client Component

import { useState } from "react";

export default function Home() {
  // State variables to hold artist, title, lyrics, and modal visibility
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Fetch lyrics from the API
    try {
      const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
      const data = await res.json();
      
      if (data.lyrics) {
        setLyrics(data.lyrics);
        setShowModal(true); // Show the modal when lyrics are fetched
      } else {
        setLyrics('Lyrics not found. Please check the artist or song title.');
        setShowModal(true); // Show modal even for errors
      }
    } catch (error) {
      setLyrics('Error fetching lyrics. Please try again.');
      setShowModal(true);
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="header">Lyrics Finder</h1>
        <h3 className="subHeader">Using Lyrics.ovh API</h3>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="input"
            required
          />
          <input
            type="text"
            placeholder="Enter song title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
          <button className="button" type="submit">
            Search Lyrics
          </button>
        </form>

        {/* Modal Popup */}
        {showModal && (
          <div className="modal">
            <div className="modalContent">
              <span className="closeButton" onClick={closeModal}>
                &times;
              </span>
              <h2>Lyrics</h2>
              <pre className="lyricsContent">{lyrics}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
