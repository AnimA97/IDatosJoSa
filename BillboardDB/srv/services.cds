using {cap.billboard as my} from '../db/schema';

service BillboardService {
	entity Song as projection on my.Song;
	entity SongName as select from my.Song {
	  track_id,
	  track,
	  artist,
	  album,
	  duration,
	  peak_rank,
	  weeks_on_board
	}
	group by track_id, track;
}