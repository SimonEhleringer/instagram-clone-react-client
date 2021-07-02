import React from "react";
import NewPostForm from "../../newPost/NewPostForm";
import SlimPageLayout from "../../shared/SlimPageLayout";
import ResponsiveHeading from "../../shared/ResponsiveHeading";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";

export interface NewPostPageState {
  selectedImageDataUri: string;
}

export type NewPostPageType = React.FC<
  RouteComponentProps<{}, StaticContext, NewPostPageState>
>;

const NewPostPage: NewPostPageType = ({ location }) => {
  return (
    <SlimPageLayout>
      <ResponsiveHeading>Neuer Beitrag</ResponsiveHeading>

      <NewPostForm imageDataUri={location.state.selectedImageDataUri} />
    </SlimPageLayout>
  );
};

export default NewPostPage;
