import React from "react";
import { func, object } from "prop-types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const closeBtn = <FontAwesomeIcon icon={faTimes} size="2x" />;

function DeleteModal({ setShowDeleteModal, selectedTrack, setSelectedTrack }) {
  const { _id } = selectedTrack;

  const { handleSubmit } = useForm({
    mode: "onBlur",
  });

  function handleCloseBtn() {
    setShowDeleteModal(false);
    setSelectedTrack(null);
  }

  function onSubmit() {
    console.log(_id);
  }

  return (
    <article className="md:w-3/6 md:mx-auto left-0 right-0 bg-dark mt-40 rounded-md">
      <div className="relative h-10">
        <button
          className="absolute top-3 right-5"
          type="button"
          onClick={handleCloseBtn}
        >
          <i className="text-gray-400 hover:text-gray-100">{closeBtn}</i>
        </button>
      </div>
      <div>
        <form
          className="flex flex-col px-10 sm:px-20 py-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <h2 className="text-center text-xl font-semibold mb-8">
              Are you sure you want to delete the track?
            </h2>
            <div className="flex">
              <button
                type="submit"
                className="btn border-gray-400 border-2 rounded-full w-full py-3 text-xl font-semibold mr-3"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={handleCloseBtn}
                className="btn border-gray-400 border-2 rounded-full w-full py-3 text-xl font-semibold ml-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </article>
  );
}

DeleteModal.propTypes = {
  setShowDeleteModal: func.isRequired,
  selectedTrack: object.isRequired,
  setSelectedTrack: func.isRequired,
};

export default DeleteModal;
