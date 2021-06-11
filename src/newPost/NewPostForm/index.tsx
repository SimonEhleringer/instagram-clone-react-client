import React from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../../config/store";
import Button from "../../shared/Button";
import Errors from "../../shared/Errors";
import Input from "../../shared/Input";
import "./style.scss";

// TODO: Make components for unnessecary double styles (suggestions has some styles that are exactly same)
const NewPostForm = () => {
  const selectedImageDataUrl = useSelector(
    (state: ReduxState) => state.newPostState.selectedImageDataUrl
  );

  return (
    <div className="new-post-form">
      <div className="new-post-form__caption-input-container">
        <textarea
          className="new-post-form__caption-input"
          placeholder="Bildunterschrift verfassen ..."
        />
      </div>

      <div className="new-post-form__image-preview-container">
        <div className="new-post-form__image-preview-crop-size">
          <img
            className="new-post-form__image-preview"
            src={selectedImageDataUrl}
            alt="selectedImagePreview"
          />
        </div>
      </div>

      <div className="new-post-form__bottom-section">
        <div className="new-post-form__errors">
          <Errors
            errors={[
              "Testslkdjf lksjdföl ksdfl ksjdlfk sf",
              "Testsdf lsdkf lskdfj lskdfjl ksdjfl ksjfdl ",
              "Tet",
            ]}
            testId="errors"
          />
        </div>

        <div className="new-post-form__submit-button">
          <Button loading={false}>Teilen</Button>
        </div>
      </div>
    </div>
  );
};

export default NewPostForm;
