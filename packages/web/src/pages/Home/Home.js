import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DeleteModal from "../../components/DeleteModal";
import PlaylistCard from "../../components/PlayListCard";
import SongCard from "../../components/SongCard";
import SongModal from "../../components/SongModal";
import Main from "../../layout/Main";
import { authSelector } from "../../redux/auth/auth-selectors";
import { fetchAllPlaylists } from "../../redux/playlist/playlist-actions";
import { fetchSong } from "../../redux/song/song-actions";
import { trackDeleteSelector } from "../../redux/trackDelete/trackDelete-selectors";
import { trackEditorSelector } from "../../redux/trackEditor/trackEditor-selectors";
import { uploaderSelector } from "../../redux/uploader/uploader-selectors";
import "./Home.scss";

export default function Home() {
  const { currentUser } = useSelector(authSelector);
  const { data } = useSelector((state) => state.song.songs);
  const { uploadSongSuccess } = useSelector(uploaderSelector);
  const { trackUpdateSuccess } = useSelector(trackEditorSelector);
  const { trackDeleteSuccess } = useSelector(trackDeleteSelector);
  const { ALL } = useSelector((state) => state.playlists.playlistIds);
  const { playlistByID } = useSelector((state) => state.playlists);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const [characters, updateCharacters] = useState(finalSpaceCharacters);
  console.log(characters);
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
    console.log(characters);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSong());
    dispatch(fetchAllPlaylists());
  }, [dispatch, uploadSongSuccess, trackUpdateSuccess, trackDeleteSuccess]);

  return (
    <>
      {showModal && (
        <section className="w-screen h-screen p-8 fixed z-20 bg-gray-900 bg-opacity-90">
          <SongModal
            setShowModal={setShowModal}
            setIsEditModal={setIsEditModal}
            isEditModal={isEditModal}
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack}
          />
        </section>
      )}
      {showDeleteModal && (
        <section className="w-screen h-screen p-8 fixed z-20 bg-gray-900 bg-opacity-90">
          <DeleteModal
            setShowDeleteModal={setShowDeleteModal}
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack}
          />
        </section>
      )}
      <Main>
        <h1 className="text-xl mb-4">Hello {currentUser?.data?.username}</h1>
        <div className="container my-12 mx-auto px-4 md:px-12">
          <article className="pb-10">
            <h2 className="pb-2 font-semibold">Songs</h2>
            <hr className="border-gray-600 pb-2" />
            <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
              {data?.map((song) => (
                <SongCard
                  key={song._id}
                  song={song}
                  setShowModal={setShowModal}
                  setShowDeleteModal={setShowDeleteModal}
                  setIsEditModal={setIsEditModal}
                  setSelectedTrack={setSelectedTrack}
                />
              ))}
            </section>
          </article>
          <article className="pb-10">
            <h2 className="pb-2 font-semibold">Playlists</h2>
            <hr className="border-gray-600 pb-2" />
            <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
              {ALL?.map((playlist) => (
                <PlaylistCard
                  key={playlistByID[playlist]._id}
                  playlist={playlistByID[playlist]}
                  location={`playlist/${playlistByID[playlist]._id}`}
                />
              ))}
            </section>
          </article>
        </div>
        <div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {characters.map(({ id, name, thumb }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(providedd) => (
                          <li
                            key={id}
                            ref={providedd.innerRef}
                            {...providedd.draggableProps}
                            {...providedd.dragHandleProps}
                          >
                            <div className="characters-thumb">
                              <p>
                                src={thumb} alt={`${name} Thumb`}
                              </p>
                            </div>
                            <p>{name}</p>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Main>
    </>
  );
}

const finalSpaceCharacters = [
  {
    id: "gary",
    name: "Gary Goodspeed",
    thumb: "/images/gary.png",
  },
  {
    id: "ed",
    name: "ed Goodspeed",
    thumb: "/images/gary.png",
  },
  {
    id: "ruf",
    name: "ruf Goodspeed",
    thumb: "/images/gary.png",
  },
];
