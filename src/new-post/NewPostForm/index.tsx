import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addPost } from '../../api/me-post';
import { PostRequestDto } from '../../api/shared-dtos';
import { buildIndexPath } from '../../routes/path';
import Button from '../../shared/Button';
import { getErrorsArrayFromError } from '../../shared/error';
import Errors from '../../shared/Errors';
import Textarea from '../../shared/Textarea';
import './style.scss';

export interface NewPostFormProps {
  imageDataUri: string;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ imageDataUri }) => {
  const history = useHistory();

  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmitButtonClick = async () => {
    setIsLoading(true);

    const request: PostRequestDto = {
      imageDataUri,
      text: caption,
    };

    try {
      await addPost(request);

      history.push(buildIndexPath());
    } catch (e) {
      setErrors(getErrorsArrayFromError(e));

      setIsLoading(false);
    }
  };

  return (
    <div className='new-post-form'>
      <div className='new-post-form__caption-input'>
        <Textarea
          placeholder='Bildunterschrift verfassen ...'
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>

      <div className='new-post-form__image-preview-container'>
        <div className='new-post-form__image-preview-crop-size'>
          <img
            className='new-post-form__image-preview'
            src={imageDataUri}
            alt='selectedImagePreview'
          />
        </div>
      </div>

      <div className='new-post-form__bottom-section'>
        {errors.length > 0 && (
          <div className='new-post-form__errors'>
            <Errors errors={errors} />
          </div>
        )}

        <div className='new-post-form__submit-button'>
          <Button isLoading={isLoading} onClick={handleSubmitButtonClick}>
            Teilen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPostForm;
