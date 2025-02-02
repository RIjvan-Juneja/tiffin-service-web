import Button from "@components/ui/Button/Button";
import * as Sentry from "@sentry/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const ErrorBoundary: React.FC<Props> = ({ children }) => {
  return (
    <Sentry.ErrorBoundary
      fallback={({ componentStack, resetError }) => (
        <React.Fragment>
          <div>
            <h2>Oops, we encountered an unexpected error</h2>
            <p>{Error.toString()}</p>
            <p>{componentStack}</p>
          </div>
          <Button
            appearance="filled"
            size="md"
            onClick={() => resetError()}
          >
            Filled Button
          </Button>
        </React.Fragment>
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};
