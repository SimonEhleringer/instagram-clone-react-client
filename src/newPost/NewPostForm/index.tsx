import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addPost } from '../../api/mePost';
import { PostRequestDto } from '../../api/sharedDtos';
import { ReduxState } from '../../config/store';
import Button from '../../shared/Button';
import { getErrorsArrayFromError } from '../../shared/error';
import Errors from '../../shared/Errors';
import Input from '../../shared/Input';
import './style.scss';

// TODO: Make components for unnessecary double styles (suggestions has some styles that are exactly same)
const NewPostForm = () => {
  const history = useHistory();

  const selectedImageDataUrl = useSelector(
    (state: ReduxState) => state.newPostState.selectedImageDataUri
  );

  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmitButtonClick = async () => {
    setIsLoading(true);

    const request: PostRequestDto = {
      imageDataUri: selectedImageDataUrl,
      text: caption,
    };

    try {
      await addPost(request);

      history.push('/');
    } catch (e) {
      setErrors(getErrorsArrayFromError(e));

      setIsLoading(false);
    }
  };

  return (
    <div className='new-post-form'>
      <div className='new-post-form__caption-input-container'>
        <textarea
          className='new-post-form__caption-input'
          placeholder='Bildunterschrift verfassen ...'
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>

      <div className='new-post-form__image-preview-container'>
        <div className='new-post-form__image-preview-crop-size'>
          <img
            className='new-post-form__image-preview'
            src={selectedImageDataUrl}
            alt='selectedImagePreview'
          />
        </div>
      </div>

      <div className='new-post-form__bottom-section'>
        {errors.length > 0 && (
          <div className='new-post-form__errors'>
            <Errors errors={errors} testId='errors' />
          </div>
        )}

        <div className='new-post-form__submit-button'>
          <Button
            loading={isLoading}
            htmlInputProps={{ onClick: handleSubmitButtonClick }}
          >
            Teilen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPostForm;
