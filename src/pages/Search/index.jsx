import { Fragment, useState } from "react";
import axiosInstance from "../../redux/axiosInstance";
import Song from "../../components/Song";
import Playlist from "../../components/Playlist";
import { IconButton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./styles.module.scss";
import { useEffect } from "react";

const Search = () => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState({});
	const [songs, setSongs]= useState([]);
	const [isFetching, setIsFetching] = useState(false);

	useEffect(async () => {
		const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/songs`)
		setSongs(data.data)
		
	}, [])
	console.log(songs)
	const handleSearch = async ({ currentTarget: input }) => {
		setSearch(input.value);
		setResults({});
		try {
			setIsFetching(true);
			const url = process.env.REACT_APP_API_URL + `/?search=${input.value}`;
			const { data } = await axiosInstance.get(url);
			console.log(data)
			setResults(data);
			setIsFetching(false);
		} catch (error) {
			console.log(error);
			setIsFetching(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.search_input_container}>
				<IconButton>
					<SearchIcon />
				</IconButton>
				<input
					type="text"
					placeholder="Search for songs and playlists"
					onChange={handleSearch}
					value={search}
				/>
				<IconButton onClick={() => setSearch("")}>
					<ClearIcon />
				</IconButton>
			</div>
			{isFetching && (
				<div className={styles.progress_container}>
					<CircularProgress style={{ color: "#1ed760" }} size="5rem" />
				</div>
			)}
			{Object.keys(results).length !== 0 && (
				<div className={styles.results_container}>
					{results.songs.length !== 0 && (
						<div className={styles.songs_container}>
							{results.songs.map((song) => (
								<Fragment key={song._id}>
									<Song song={song} />
								</Fragment>
							))}
						</div>
					)}
					{results.playlists.length !== 0 && (
						<div className={styles.playlists_container}>
							<Playlist playlists={results.playlists} />
						</div>
					)}
				</div>
			)}
			<div className={styles.results_container}>
			{songs.length !== 0 && (
				<div className={styles.songs_container}>
					{songs.map((song) => (
						<Fragment key={song._id}>
							<Song song={song} />
						</Fragment>
					))}
				</div>
			)}
			</div>
		</div>
	);
};

export default Search;
