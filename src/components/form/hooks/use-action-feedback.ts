import { useEffect, useRef } from "react";
import { type ActionState } from "../utils/to-action-state";

type OnArgs = {
  actionState: ActionState;
};

type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions
) => {
  // Track previous timestamp to avoid calling callbacks with the stale actionState value on options object recreation
  // (Forms - Debugging (Software Craftsmanship) lesson)
  const prevTimestamp = useRef(actionState.timestamp);

  useEffect(() => {
    if (prevTimestamp.current === actionState.timestamp) return;

    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }

    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }

    prevTimestamp.current = actionState.timestamp;
  }, [actionState, options]);
};

export { useActionFeedback };
