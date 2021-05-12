import React from "react";
import Main from "../../layout/Main";

const SearchView = () => {
  return (
    <>
      <Main>
        <div className="container my-12 mx-auto px-4 md:px-12">
          <article className="pb-10">
            <h2 className="pb-2 font-semibold">Songs</h2>
            <hr className="border-gray-600 pb-2" />
            <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
              Search result
            </section>
          </article>
          <article className="pb-10">
            <h2 className="pb-2 font-semibold">Playlists</h2>
            <hr className="border-gray-600 pb-2" />
            <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
              Playlist result
            </section>
          </article>
          <article className="pb-10">
            <h2 className="pb-2 font-semibold">Artist</h2>
            <hr className="border-gray-600 pb-2" />
            <section className="flex flex-wrap justify-center sm:justify-start mx-1 lg:mx-4">
              Artist results
            </section>
          </article>
        </div>
      </Main>
    </>
  );
};

export default SearchView;
