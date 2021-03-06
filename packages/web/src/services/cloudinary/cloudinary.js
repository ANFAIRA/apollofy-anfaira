import axios from "axios";

export const fileTypes = {
  AUDIO_FILE: "audio",
  IMAGE_FILE: "image",
};

export const getFileUrl = async ({ file, fileType, onUploadProgress }) => {
  const songUploadPreset = process.env.REACT_APP_CLOUDINARY_SONG_UPLOAD_PRESET;
  const imageUploadPreset =
    process.env.REACT_APP_CLOUDINARY_IMAGE_UPLOAD_PRESET;
  const unsignedCloudName = process.env.REACT_APP_CLOUDINARY_CLOUDNAME;

  const url = `https://api.cloudinary.com/v1_1/${unsignedCloudName}/upload`;

  const formData = new FormData();

  fileType === fileTypes.AUDIO
    ? formData.append("upload_preset", songUploadPreset)
    : formData.append("upload_preset", imageUploadPreset);

  formData.append("file", file);

  fileType === fileTypes.AUDIO
    ? formData.append("resource_type", "video")
    : formData.append("resource_type", "image");

  formData.append("public_id", file.name);
  formData.append("tags", "browser_upload");

  const config = {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "multipart/form-data",
    },
    // eslint-disable-next-line func-names
    onUploadProgress: onUploadProgress,
  };

  return axios.post(url, formData, config);
};
