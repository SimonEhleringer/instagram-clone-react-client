import React from "react";
import NewPostForm from "../../newPost/NewPostForm";
import AppLayout from "../../shared/AppLayout";
import SlimPageLayout from "../../shared/SlimPageLayout";
import ResponsiveHeading from "../../shared/ResponsiveHeading";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";

export interface NewPostPageState {
  selectedImageDataUri: string;
}

const NewPostPage: React.FC<
  RouteComponentProps<{}, StaticContext, NewPostPageState>
> = ({ location }) => {
  return (
    <AppLayout>
      <SlimPageLayout>
        <ResponsiveHeading>Neuer Beitrag</ResponsiveHeading>

        <NewPostForm imageDataUri={location.state.selectedImageDataUri} />
      </SlimPageLayout>
    </AppLayout>
  );
};

export default NewPostPage;
