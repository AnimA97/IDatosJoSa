using {cap.billboard as my} from '../db/schema';

service BillboardService {
	entity Song as projection on my.Song;
}