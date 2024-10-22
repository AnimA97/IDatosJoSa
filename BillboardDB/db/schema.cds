using {cuid, managed} from '@sap/cds/common';
namespace cap.billboard;

entity Song {
	track_id: Integer;
	artist: String(100);
	url_spotify: String(100);
	track: String(100);
	album: String(100);
	album_type: String(10);
	danceability: String(10);
	energy: String(10);
	musical_key: String(10);
	loudness: String(10);
	speechiness: String(10);
	acousticness: String(10);
	instrumentalness: String(10);
	liveness: String(10);
	valence: String(10);
	tempo: String(10);
	duration: Integer;
	url_youtube: String(100);
	date: Date;
	rank: Integer;
	last_week: Integer;
	peak_rank: Integer;
	weeks_on_board: Integer;
};